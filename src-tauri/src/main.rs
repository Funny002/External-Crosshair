#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

mod utils;

use crate::{
  utils::{set_window_shadow}
};

fn main() {
      tauri::Builder::default()
          .setup(|app| {
            set_window_shadow(app);
            Ok(())
          })
          .invoke_handler(tauri::generate_handler![])
          .run(tauri::generate_context!())
          .expect("error while running tauri application");
}
