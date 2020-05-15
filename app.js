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
    ]
    ).then(function (response) {
        console.log(response.role)
        switch (response.role) {
            case "Manager":
                console.log("creating a manager")
                return createManager()
            // case "Engineer":
            //     return createEngineer()
            // case "Intern": 
            //     return createIntern()

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
        employee = new Manager(response.name, response.email, response.id, response.phone)
        employeeArray.push(employee);
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

// let response;
// employeeArray.push(employee);

// response = await newEmployee();
// let employee;

// Push info to an array
// if newMember == true -> run again if not move on
// If engineer, manager, intern -> use appropriate class ect..
// render html

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```


// if (response.role ==="Manager") {
//     employee = new Manager(response.role, response.name, response.id, response.email, response.phone)
// }
// else if (response.role === "Engineer") {
//     employee = new Engineer(response.role, response.name, response.id, response.email, response.GitHubUser)
// }
// else {
//     employee = new Intern(response.role, response.name, response.id, response.email, response.school)
// }