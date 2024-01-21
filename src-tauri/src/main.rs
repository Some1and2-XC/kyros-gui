// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(
    not(debug_assertions),
    windows_subsystem = "windows")
]

use std::process::Command;

#[tauri::command]
fn kyros(
        julia: bool,
        measurement: &str,
        formula: &str,
        resolution: &str,
        _rate_of_color_change: &str,
        max_i: &str,
        color_style: &str,
    ) -> String {

    // Initializes Command Arguments
    let mut command_args = vec![
        "-p", resolution,
        "-i", max_i,
        "-f", formula,
        "--color", color_style,
        "--save-method", "B64",
        "-y"
    ];

    if julia { command_args.push("-j") }
    if measurement == "TD" { command_args.push("--travel-distance") }

    // Sets and calls executable
    let filename = "./bins/kyros.exe";
    let child = Command::new(filename)
        .args(command_args)
        .output();

    return match child {
        Ok(image) => format!("data:image/png;base64,{}", String::from_utf8(image.stdout).unwrap()),
        Err(error) => format!("Threw Error: {:?}", error),
    }
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![kyros])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
