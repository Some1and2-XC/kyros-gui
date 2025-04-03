// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(
    not(debug_assertions),
    windows_subsystem = "windows"
)]

// extern crate sqlite;

mod schema;

use std::{error::Error, process::Command};
// use std::os::windows::process::CommandExt;

// use crate::schema::{SQL_DBNAME, SQL_SCHEMA};

// https://stackoverflow.com/a/60958546/15474643
// Flag for not creating an extra window for CLI commands on windows
const CREATE_NO_WINDOW: u32 = 0x08000000;

/// Initializes Database Schema
/*
use std::error::Error;
fn db_init() -> Result<(), Box<dyn Error>> {
    let connection = sqlite::open(SQL_DBNAME).unwrap();
    connection.execute(SQL_SCHEMA).unwrap();

    Ok(())
}
*/

#[tauri::command]
async fn kyros(
        julia: bool,
        measurement: &str,
        formula: &str,
        resolution: &str,
        rate_of_color_change: &str,
        max_i: &str,
        color_style: &str,
        background: &str,
        foreground: &str,
        factor_x: &str,
        factor_y: &str,
        offset_x: &str,
        offset_y: &str,
    ) -> Result<String, String> {


    let parameters_for_debuging = format!(
        r#"julia: {julia}
measurement: {measurement}
formula: {formula}
resolution: {resolution}
rate_of_color_change: {rate_of_color_change}
max_i: {max_i}
color_style: {color_style}
background: {background}
foreground: {foreground}
factor_x: {factor_x}
factor_y: {factor_y}
offset_x: {offset_x}
offset_y: {offset_y}"#);

    println!("Here are the parameters:\n{}", parameters_for_debuging);

    let format_colors = |data: &str| {
        data.chars().filter(|&v| v != '#').collect::<String>()
    };

    // Ensures the colors can be parsed (the # being removed is needed because of a CLI
    // regression).
    let background = format_colors(background);
    let foreground = format_colors(foreground);

    // Initializes Command Arguments
    let mut command_args = vec![
        "-p", resolution,
        "-i", max_i,
        "-f", formula,
        "--color", color_style,
        "--rate-of-color-change", rate_of_color_change,
        "--background", &background,
        "--foreground", &foreground,
        "--save-method", "B64",
        "--factor-x", factor_x,
        "--factor-y", factor_y,
        "--offset-x", offset_x,
        "--offset-y", offset_y,
        "-y"
    ];

    println!("Here are the command arguments: {:?}", command_args);

    if julia { command_args.push("-j") }
    if measurement == "TD" { command_args.push("--travel-distance") }

    // Sets and calls executable
    let filename = "./bins/kyros";

    let child = Command::new(filename)
        .args(&command_args)
        // .creation_flags(CREATE_NO_WINDOW)
        .output()
        .map(|v| String::from_utf8(v.stdout).expect("Failed to parse utf8!"))
        ;

    command_args.push("--gpu");

    let _gpu_exec = Command::new(filename)
        .args(&command_args)
        .output()
        ;

    return match child {
        Ok(image) => {
            println!("Generated `{}` bytes of data!", image.len());
            Ok(format!("data:image/png;base64,{}", image))
        },
        Err(e) => {
            let error_msg = format!("Failed to generate image! With arguments: {:?}. Error: `{}`", command_args, e.to_string());
            println!("Error: {}", error_msg);
            Err(error_msg)
        },
        // Err(error) => Err(format!("Threw Error: {:?}", error)),
    }
}

#[tauri::command]
fn save() {

}

pub fn main() {
    // db_init().unwrap();
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![
            kyros,
            save
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
