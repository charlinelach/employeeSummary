const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
// Everything above was already written

const teamMembers = [];
const idArray = [];

function teamCreation() {

    // Get manager info
    function manager() { // Only one manager per team
        inquirer.prompt([
            // Questions
            {
                type: "input",
                name: "managerName",
                message: "What is the manager's name?",
                validate: answer => {
                    if (answer !== "") {
                        return true;
                    }
                    return "At least one character please.";
                }
            }, {
                type: "input",
                name: "managerId",
                message: "What is the manager's ID?",
                validate: answer => {
                    const proper = answer.match(
                        /^[1-9]+$/
                    );
                    if (proper > 0) {
                        return true;
                    }
                    return "At least one positive number.";
                }
            }, {
                type: "input",
                name: "managerEmail",
                message: "What is the manager's email address?",
                validate: answer => {
                    const proper = answer.match(
                        /\S+@\S+\.\S+/
                    );
                    if (proper) {
                        return true;
                    }
                    return "Please use a proper email format.";
                }
            }, {
                type: "input",
                name: "managerOfficeNumber",
                message: "What is the manager's office number?",
                validate: answer => {
                    const office = answer.match(
                        /^[1-9]+$/
                    );
                    if (office > 0) {
                        return true;
                    }
                    return "At least one positive number.";
                }
            }
        ]).then(answers => {
            const manager = new Manager(answers.managerName, answers.managerId, answers.managerEmail, answers.managerOfficeNumber);
            teamMembers.push(manager);
            idArray.push(answers.managerId);
            nonManagers();
        });
    }
    // Figure out which type of team member to add
    function nonManagers() {
        inquirer.prompt([
            {
                type: "list",
                name: "employeeArray",
                message: "Which employee type shall be added?",
                choices: ["Engineer", "Intern", "No more"]
            }
        ]).then(selection => {
            switch (selection.employeeArray) {
                case "Engineer": engineerNew();
                    break;
                case "Intern": internNew();
                    break;
                default: teamCompletion();
            }

        })
    }

    // If adding a new engineer
    function engineerNew() {
        inquirer.prompt([
            {
                type: "input",
                name: "engineerName",
                message: "What is the engineer's name?",
                validate: answer => {
                    if (answer !== "") {
                        return true;
                    }
                    return "At least one character please.";
                }
            }, {
                type: "input",
                name: "engineerId",
                message: "What is the engineer's ID?",
                validate: answer => {
                    const proper = answer.match(
                        /^[1-9]+$/
                    );
                    if (proper > 0) {
                        return true;
                    }
                    return "At least one positive number.";
                }
            }, {
                type: "input",
                name: "engineerEmail",
                message: "What is the engineer's email address?",
                validate: answer => {
                    const proper = answer.match(
                        /\S+@\S+\.\S+/
                    );
                    if (proper) {
                        return true;
                    }
                    return "Please use a proper email format.";
                }
            }, {
                type: "input",
                name: "engineerGH",
                message: "What is the employee's GitHub username?",
                validate: answer => {
                    if (answer !== 0) {
                        return true;
                    }
                    return "At least one character.";
                }
            }
        ]).then(answers => {
            const engineer = new Engineer(answers.engineerName, answers.engineerId, answers.engineerEmail, answers.engineerGithub);
            teamMembers.push(engineer);
            idArray.push(answers.engineerId);
            nonManagers();
        })
    }

    function internNew() {
        inquirer.prompt([
            {
                type: "input",
                name: "internName",
                message: "What is the intern's name?",
                validate: answer => {
                    if (answer !== "") {
                        return true;
                    }
                    return "At least one character please.";
                }
            }, {
                type: "input",
                name: "internId",
                message: "What is the intern's ID?",
                validate: answer => {
                    const proper = answer.match(
                        /^[1-9]+$/
                    );
                    if (proper > 0) {
                        return true;
                    }
                    return "At least one positive number.";
                }
            }, {
                type: "input",
                name: "internEmail",
                message: "What is the intern's email address?",
                validate: answer => {
                    const proper = answer.match(
                        /\S+@\S+\.\S+/
                    );
                    if (proper) {
                        return true;
                    }
                    return "Please use a proper email format.";
                }
            }, {
                type: "input",
                name: "internSchool",
                message: "What is the intern's school?",
                validate: answer => {
                    if (answer !== 0) {
                        return true;
                    }
                    return "At least one character.";
                }
            }
        ]).then(answers => {
            const intern = new Intern(answers.internName, answers.internId, answers.internEmail, answers.internSchool);
            teamMembers.push(intern);
            idArray.push(answers.internId);
            nonManagers();
        })
    }


    function teamCompletion() {
        if (!fs.existsSync(OUTPUT_DIR)) {
            fs.mkdirSync(OUTPUT_DIR)
        }
        fs.writeFileSync(outputPath, render(teamMembers), "utf-8");

    }


    manager();
}

teamCreation();


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