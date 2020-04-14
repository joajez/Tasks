class Users {
    constructor() {
        this.userList = [];
    }

    add(User) {
        this.userList.push(User);
    }

    delete(userId) {
        let filtered = this.userList.filter(function (el) {
            return el.userId != userId;
        });
        this.userList = filtered;
    }
    update(id, firstname, lastname, gender) {
        let objIndex = this.userList.findIndex((obj) => obj.userId == id);
        this.userList[objIndex].firstName = firstname;
        this.userList[objIndex].lastName = lastname;
        this.userList[objIndex].gender = gender;
    }

    get() {
        return this.userList;
    }

    checkIfExists(user) {
        let exist = this.userList.some(
            (e) =>
            e.firstName === user.firstName &&
            e.lastName === user.lastName &&
            e.gender === user.gender
        );
        return exist;
    }
}