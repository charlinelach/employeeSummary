// TODO: Write code to define and export the Engineer class.  HINT: This class should inherit from Employee.

class Engineer {

    constructor(name, id, email, gitHub) {
        this.name = name;
        this.id = id;
        this.email = email;
        this.gitHub = gitHub;
    }

    getName() {
        return this.name;
    }

    getID() {
        return this.id;
    }

    getEmail() {
        return this.email;
    }

    getGitHub() {
        return this.gitHub;
    }

    getRole() {
        return `Engineer`;
    }

}

module.exports = Engineer;