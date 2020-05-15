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
    console.log("new employee is running")
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
        console.log(response.role)
        switch (response.role) {
            case "Manager":
                console.log("creating a manager")
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
    
    ]).then(function(response){
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

]).then(function(response){
    employee = new Intern(response.name, response.id, response.email, response.school);
    employeeArray.push(employee)
})

}
async function mainFunction() {
    while (createTeam == true) {
        if (firstEmployee == true) {
            await createManager()
            firstEmployee = false;
        }
        else {
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
                if (res.newMember == "yes") {
                    await newEmployee()
                }
                else {
                    createTeam = false
                }
            })
        }

    }
    const html = render(employeeArray);

    if (!fs.existsSync(OUTPUT_DIR)) {
        fs.mkdirSync(OUTPUT_DIR);
    }
    console.log(employeeArray)
    fs.writeFile(outputPath, html, function (err) {
        if (err) throw err;
        console.log("success!")
    })
}

mainFunction()

       // {
        //     type: "input",
        //     name: "name",
        //     message: "What is the employee's first and last name?"
        // },
        // {
        //     type: "input",
        //     name: "id",
        //     message: "What is the employee's id?"
        // },
        // {
        //     type: "input",
        //     name: "email",
        //     message: "What is the employee's email?"
        // },
        // // Interns only question
        // {
        //     type: "input",
        //     name: "school",
        //     message: "What school is this intern associated with? (press ENTER to skip if n/a)"
        // },
        // // Manager only question 
        // {
        //     type: "input",
        //     name: "phone",
        //     message: "What is this manager's phone number? (press ENTER to skip if n/a)"
        // },
        // // Engineer only question 
        // {
        //     type: "input",
        //     name: "GitHubUser",
        //     message: "What is this Engineer's github username? (press ENTER to skip if n/a)"

        // },
        // 

// if (response.role ==="Manager") {
//     employee = new Manager(response.role, response.name, response.id, response.email, response.phone)
// }
// else if (response.role === "Engineer") {
//     employee = new Engineer(response.role, response.name, response.id, response.email, response.GitHubUser)
// }
// else {
//     employee = new Intern(response.role, response.name, response.id, response.email, response.school)
// }