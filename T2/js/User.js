class User {
    firstName;
    lastName;
    gender;

    constructor(
        firstName,
        lastName,
        gender,
        usersList,
        creationDate = new Date()
    ) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.gender = gender;
        this.creationDate = creationDate;
        this.userId =
            usersList[usersList.length - 1] !== undefined ?
            usersList[usersList.length - 1].userId + 1 :
            1;
    }

    // displayDetails() {
    //   // todo: Add implementation
    //   // Return a string 'My name is <first name> <last name> and I'm a <gender>
    //   return `My name is <b> ${this.firstName} ${this.lastName} </b> and I'm a ${this.gender}`;
    // }
    displayDetails(id) {
        id = id + 1;
        return `<tr><td class ="id${this.userId}">${id}</td>
      <td class ="name${this.userId}" >${this.firstName}</td>
      <td class ="lastName${this.userId}">${this.lastName}</td>
      <td class ="gender${this.userId}">${this.gender}</td>
      <td class ="date${this.userId}" >${moment(this.creationDate).format(
        "DD/MM/YYYY HH:mm:ss"
      )}</td>
      <td><button class="buttonEdit" id ="edit${this.userId}">Edit</button>
      <button class="buttonSave hide" id ="save${
        this.userId
      }">Save</button><button class="buttonDelete" id ="delete${
        this.userId
      }" >Delete</button></td>
    </tr>`;
    }

    edit(name, lastname, gender) {
        this.firstName = name;
        this.lastName = lastname;
        this.gender = gender;
    }

    static validateName(firstname, lastname) {
        const reg = /[a-zA-Z]{3,}/;
        return reg.test(firstname) && reg.test(lastname);
    }
}