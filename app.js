const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

let employeeArray = []
let firstEmployee = true;
let createTeam = true;

function newEmployee() {
    return inquirer.prompt([
        {
            type: "list",
            name: "role",
            message: "What is the role of this employee?",
            choices: [
                "Intern",
                "Engineer",
                "Manager"
            ]
        }
    ]
    ).then(function (response) {
        switch (response.role) {
            case "Manager":
                return createManager()
            case "Engineer":
                return createEngineer()
            case "Intern":
                return createIntern()

            default:
                break;
        }
    })
}

function createManager() {
    return inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "What is the manager's first and last name?"
        },
        {
            type: "input",
            name: "id",
            message: "What is the employee's id?"
        },
        {
            type: "input",
            name: "email",
            message: "What is the employee's email?"
        },
        {
            type: "input",
            name: "phone",
            message: "What is this manager's phone number?"
        }
    ]).then(function (response) {
        employee = new Manager(response.name, response.id, response.email, response.phone)
        employeeArray.push(employee);
    })
}

function createEngineer() {
    return inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "What is the employee's first and last name?"
        },
        {
            type: "input",
            name: "id",
            message: "What is the employee's id?"
        },
        {
            type: "input",
            name: "email",
            message: "What is the employee's email?"
        },
        {
            type: "input",
            name: "github",
            message: "What is the employee's github username?"
        }

    ]).then(function (response) {
        employee = new Engineer(response.name, response.id, response.email, response.github);
        employeeArray.push(employee)
    })
}
function createIntern() {
    return inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "What is the employee's first and last name?"
        },
        {
            type: "input",
            name: "id",
            message: "What is the employee's id?"
        },
        {
            type: "input",
            name: "email",
            message: "What is the employee's email?"
        },
        {
            type: "input",
            name: "school",
            message: "What school does this intern attend?"
        }

    ]).then(function (response) {
        employee = new Intern(response.name, response.id, response.email, response.school);
        employeeArray.push(employee)
    })

}
async function mainFunction() {
    // Conditions to create team
    while (createTeam == true) {
        if (firstEmployee == true) {
            // Creates first manager
            await createManager()
            // Sets first employee to false to give the option to add other types of employees later on
            firstEmployee = false;
        }
        else {
            // Asks if you want to add more team members
            await inquirer.prompt([
                {
                    type: "list",
                    message: "Would you like to add another team member?",
                    name: "newMember",
                    choices: [
                        "yes",
                        "no"
                    ]
                }
            ]).then(async function (res) {
                // If yes, loops through process until user says no
                if (res.newMember == "yes") {
                    await newEmployee()
                }
                else {
                    createTeam = false
                }
            })
        }

    }
    // Stores array values in html
    const html = render(employeeArray);
    // Check to see if directory exists
    if (!fs.existsSync(OUTPUT_DIR)) {
        // Makes a directory if it does not exist
        fs.mkdirSync(OUTPUT_DIR);
    }
    // Writes data to file and creates team.html where data will appear
    fs.writeFile(outputPath, html, function (err) {
        if (err) throw err;
        console.log("Successfully created team directory!")
    })
}

// Calls Main Function to run 
mainFunction()