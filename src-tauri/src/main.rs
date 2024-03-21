// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(
    not(debug_assertions),
    windows_subsystem = "windows"
)]

extern crate sqlite;

mod schema;

use std::process::Command;
use std::os::windows::process::CommandExt;
use std::error::Error;

use crate::schema::{SQL_DBNAME, SQL_SCHEMA};

// https://stackoverflow.com/a/60958546/15474643
// Flag for not creating an extra window for CLI commands on windows
const CREATE_NO_WINDOW: u32 = 0x08000000;

/// Initializes Database Schema
fn db_init() -> Result<(), Box<dyn Error>> {
    let connection = sqlite::open(SQL_DBNAME).unwrap();
    connection.execute(SQL_SCHEMA).unwrap();

    Ok(())
}

#[tauri::command]
fn kyros(
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
    ) -> String {

    // Initializes Command Arguments
    let mut command_args = vec![
        "-p", resolution,
        "-i", max_i,
        "-f", formula,
        "--color", color_style,
        "--rate-of-color-change", rate_of_color_change,
        "--background", background,
        "--foreground", foreground,
        "--save-method", "B64",
        "--factor-x", factor_x,
        "--factor-y", factor_y,
        "--offset-x", offset_x,
        "--offset-y", offset_y,
        "-y"
    ];

    if julia { command_args.push("-j") }
    if measurement == "TD" { command_args.push("--travel-distance") }

    // Sets and calls executable
    let filename = "./bins/kyros.exe";
    let child = Command::new(filename)
        .args(command_args)
        .creation_flags(CREATE_NO_WINDOW)
        .output();

    return match child {
        Ok(image) => format!("data:image/png;base64,{}", String::from_utf8(image.stdout).unwrap()),
        Err(error) => format!("Threw Error: {:?}", error),
    }
}

#[tauri::command]
fn save() {

}

fn main() {
    db_init().unwrap();
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![
            kyros,
            save
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
