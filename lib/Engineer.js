// TODO: Write code to define and export the Engineer class.  HINT: This class should inherit from Employee.

const Employee = require("./Employee");

class Engineer extends Employee{

    constructor(name, id, email, gitHub) {
        // Grabs joint info from Employee class
        super(name, id, email);
        // Don't forget this is GitHub username AND will make a link!
        this.gitHub = gitHub;
    }

    getGithub() {
        return this.gitHub;
    }

    getRole() {
        return "Engineer";
    }

}

module.exports = Engineer;