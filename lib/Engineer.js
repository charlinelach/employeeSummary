// TODO: Write code to define and export the Engineer class.  HINT: This class should inherit from Employee.

class Engineer {

    constructor(name, id, email, gitHub) {
        // Grabs joint info from Employee class
        super(name, id, email);
        // Don't forget this is GitHub username AND will make a link!
        this.gitHub = gitHub;
    }

    getGitHub() {
        return this.gitHub;
    }

    getRole() {
        return "Engineer";
    }

}

module.exports = Engineer;