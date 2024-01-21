// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use std::process::Command;

#[tauri::command]
fn kyros() -> String {

    let filename = "./bins/kyros.exe";

    let output = Command::new(filename)
        .args([
              "--save-method", "B64",
              "-y"
        ])
        .output();

    return match output {
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
