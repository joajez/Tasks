class Users {
  constructor() {
    this.userList = [];
  }

  add(User) {
    this.userList.push(User);
  }

  delete(userId) {
    let filtered = this.userList.filter(function(el) {
      return el.userId != userId;
    });
    this.userList = filtered;
  }
  update(id, firstname, lastname, gender) {
    let objIndex = this.userList.findIndex(obj => obj.userId == id);
    this.userList[objIndex].firstName = firstname;
    this.userList[objIndex].lastName = lastname;
    this.userList[objIndex].gender = gender;
  }

  get() {
    return this.userList;
  }
  checkIfExists(user) {
    let exist = this.userList.some(
      e =>
        e.firstName === user.firstName &&
        e.lastName === user.lastName &&
        e.gender === user.gender
    );
    return exist;
  }
}

class User {
  firstName;
  lastName;
  gender;

  constructor(firstName, lastName, gender, usersList) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.gender = gender;
    this.creationDate = new Date();
    this.userId =
      usersList[usersList.length - 1] !== undefined
        ? usersList[usersList.length - 1].userId + 1
        : 1;
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
// To do:
// Show user details
const button = document.getElementById("button");
let buttonsDelete = document.querySelectorAll(".buttonDelete");
let buttonsEdit = document.querySelectorAll(".buttonEdit");
let buttonsSave = document.querySelectorAll(".buttonSave");
const details = document.querySelector("#details");
const name = document.getElementById("name");
const lastname = document.getElementById("lastName");
const male = document.getElementById("male");
button.disabled = true;
let usersList = new Users();

function checkValid() {
  button.disabled = !User.validateName(name.value, lastname.value);
}
function clearFields() {
  name.value = "";
  lastname.value = "";
  male.checked = true;
  checkValid();
}

function createUsersTable(usersArray) {
  let tableRows = `<tr>
      <th>No.</th>
      <th>First Name</th>
      <th>Last Name</th>
      <th>Gender</th>
      <th>Creation Date</th>
      <th></th>
    </tr>`;
  tableRows += usersArray.map(writeDetails);
  return tableRows;
}

function writeDetails(user, id) {
  let usersRows = "";
  usersRows += user.displayDetails(id);
  return usersRows;
}

function updateButtons() {
  buttonsDelete = document.querySelectorAll(".buttonDelete");
  buttonsEdit = document.querySelectorAll(".buttonEdit");
  buttonsSave = document.querySelectorAll(".buttonSave");
  buttonsDelete.forEach(function(elem) {
    elem.addEventListener("click", function(e) {
      e.preventDefault();
      const idDelete = e.target.id.match(/\d+/g);
      usersList.delete(idDelete);
      usersArray = usersList.get();
      id = 0;
      details.innerHTML = createUsersTable(usersArray);
      updateButtons();
    });
  });

  for (let i = 0; i < buttonsEdit.length; i++) {
    buttonsEdit[i].addEventListener("click", function(e) {
      e.preventDefault();
      const idEdit = e.target.id.match(/\d+/g);
      const nameEdit = document.querySelector(`.name${idEdit}`);
      const lastNameEdit = document.querySelector(`.lastName${idEdit}`);
      const genderEdit = document.querySelector(`.gender${idEdit}`);
      let currentButtonEdit = document.querySelector(`#edit${idEdit}`);
      let currentButtonSave = document.querySelector(`#save${idEdit}`);
      usersArray = usersList.get();
      usersArray.map(function(obj) {
        if (obj.userId == idEdit) {
          nameEdit.innerHTML = `<input value = ${obj.firstName}>`;
          lastNameEdit.innerHTML = `<input value = ${obj.lastName}>`;
          genderEdit.innerHTML = `<input value = ${obj.gender}>`;
        }
      });
      currentButtonEdit.classList.add("hide");
      currentButtonSave.classList.remove("hide");
    });
  }

  for (let i = 0; i < buttonsSave.length; i++) {
    buttonsSave[i].addEventListener("click", function(e) {
      e.preventDefault();
      idEdit = e.target.id.match(/\d+/g);
      currentButtonEdit = document.querySelector(`#edit${idEdit}`);
      currentButtonSave = document.querySelector(`#save${idEdit}`);
      usersList.update(
        idEdit,
        document.querySelector(`.name${idEdit} input`).value,
        document.querySelector(`.lastName${idEdit} input`).value,
        document.querySelector(`.gender${idEdit} input`).value
      );
      usersArray = usersList.get();
      details.innerHTML = createUsersTable(usersArray);
      updateButtons();
      currentButtonEdit.classList.remove("hide");
      currentButtonSave.classList.add("hide");
    });
  }
}

name.addEventListener("input", checkValid);
lastname.addEventListener("input", checkValid);

button.addEventListener("click", function(e) {
  e.preventDefault();
  const gender = document.querySelector('input[name="gender"]:checked').value;
  usersArray = usersList.get();
  const user = new User(name.value, lastname.value, gender, usersArray);

  try {
    if (usersList.checkIfExists(user)) {
      throw "User already exists!";
    } else {
      usersList.add(user);
      document.getElementById("error").innerHTML = "";
    }
  } catch (err) {
    document.getElementById("error").innerHTML = "Error: " + err + ".";
  }

  usersArray = usersList.get();
  details.innerHTML = createUsersTable(usersArray);
  updateButtons();
  clearFields();
});
