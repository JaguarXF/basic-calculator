## Instruction Version Number
Version number: 5b8d0fd276b6d288905ed2f63a934e057e8feca2 
# Requirements
- Browser e.g Google Chrome
- Nodejs - v14.x.x, 16.x.x or 18.x.x
- Angular CLI

# Angular Version
This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.0.3.

# Setup and Installation on local computer
# Install nodejs
- These instructions will work for a Windows Operation System
1. Follow instruction on this link to install node.js (https://nodejs.org/en/download)
2. Open a Command Prompt/terminal window by typing CMD in the Windows search
3. Install Angular CLI by running 'npm install -g @angular/cli' without the quotes

# Running the application
1. Download the folder containing the project
2. In the command prompt, navigate to the root of the folder at the level that contains a file named package.json file.
3. Run the command 'npm install --legacy-peer-deps' (without quotes). This will install the required dependencies. Wait for this process to complete
**IMPORTANT: If you get a list of errors, ensure that you run the command with legacy peer deps, i.e 'npm install --legacy-peer-deps'
4. Then, run 'ng serve' to view the application in the browser. 
5. Open a broswer application e.g Chrome and enter http://localhost:4200/ in the address bar
6. Application will load in the browser window

## Development server
Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

# How it works
1. Type on the keyboard or mouse clicks to utilise the calculator.
2. Numeric keys (0 - 9): Used for inputing digits for operands
3. Special function keys:
        M+ : Adds the current expression to memory
        MR : Loads the current expression from memory into the calucation
        CM : Clears the contents of the memory
        CE : Clears the screen only
        DEL: Acts as backspace to delete last input character
        [+, -, /, *] : Math Operators used for computation

## Build
Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests
Run `ng test` to execute the unit tests via [Karma]



