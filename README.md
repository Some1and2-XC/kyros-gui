<h1>
	<img src="https://raw.githubusercontent.com/Some1and2-XC/Kyros-in-rust/8474631c3133c2e1b6317daa9db659940828b447/logo.svg" height="200" width="200">
	 GUI
</h1>

A pretty GUI wrapper for [kyros-core](https://github.com/some1and2-XC/kyros-core)
## Purpose
The purpose of this application is to make it easier for users to interact with the CLI functionality of the [kyros-core](https://github.com/some1and2-XC/kyros-core) program. 
## Getting Started
If no releases exist, the only way of running this program is to compile it yourself.
To do so there are a few prerequisites that are needed. Note that any command must be run within the context of the root directory of the application. 

### Compiler & runtime requirements
1. The [rust compiler](https://www.rust-lang.org/tools/install)
2. [NodeJS](https://nodejs.org/en/download)
### Package requirements
To install all the packages required, run the following. 
1. `npm install`
### Running the application
 - For fast initialization, use the `npm run tauri dev` command. 
 - For creating a build (might take a few minutes) use the `npm run tauri build` command. 
## Status
This project is currently in development with no stable releases yet.
## Future Development
 - Adding a confirmation section for images generated over 1000px to be bound to image display.
 - Adding a toggle for making a preview image on image display.
 - The `rate of color change` section of the UI isn't bound to anything yet, adding this has to be done in core first.
 - Adding a `background color` section with bit depth selection.
 - Patching the size of some of the icons for the displays.
 - Adding the logic for the saved images section.
 - Adding an implimentation for donations.
## Tech Stack
 - Tauri (Backend)
 - React (Frontend)

