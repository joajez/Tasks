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
      usersList[usersList.length - 1] != undefined
        ? usersList[usersList.length - 1].userId + 1
        : 1;
    console.log(usersList);
  }

  // displayDetails() {
  //   // todo: Add implementation
  //   // Return a string 'My name is <first name> <last name> and I'm a <gender>
  //   return `My name is <b> ${this.firstName} ${this.lastName} </b> and I'm a ${this.gender}`;
  // }
  displayDetails(id) {
    id = id + 1;
    return `<tr>
    <td>${id}</td>
    <td>${this.firstName}</td>
    <td>${this.lastName}</td>
    <td>${this.gender}</td>
    <td>${moment(this.creationDate).format("DD/MM/YYYY HH:mm:ss")}</td>
    <td class="parentDelete"><button class="buttonDelete" id ="${
      this.userId
    }" >Delete</button></td>
  </tr>`;
  }

  static validateName(firstname, lastname) {
    const reg = /[a-zA-Z]{3,}/;
    return reg.test(firstname) && reg.test(lastname);
  }
}
// To do:
// Show user details
const button = document.getElementById("button");
const buttonDelete = document.getElementsByClassName("buttonDelete");
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

name.addEventListener("input", checkValid);
lastname.addEventListener("input", checkValid);

button.addEventListener("click", function(e) {
  e.preventDefault();

  details.innerHTML = `<tr>
  <th>No.</th>
  <th>First Name</th>
  <th>Last Name</th>
  <th>Gender</th>
  <th>Creation Date</th>
  <th></th>
</tr>`;
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
  usersArray.map(writeDetails);

  clearFields();

  // To do:
  // create an object User
  // In the <div id="details"> display data from the form
  // tip: get string with details from user.displayDetails()
});

// buttonDelete.addEventListener("click", function(e) {
//   e.preventDefault();
// });

document.getElementById("details").addEventListener("click", function(event) {
  if (event.target.className === "buttonDelete") {
    console.log(event.target.id);

    usersList.delete(event.target.id);
    usersArray = usersList.get();
    id = 0;
    details.innerHTML = `<tr>
  <th>No.</th>
  <th>First Name</th>
  <th>Last Name</th>
  <th>Gender</th>
  <th>Creation Date</th>
  <th></th>
</tr>`;
    usersArray.map(writeDetails);
  }
});

function writeDetails(user, id) {
  details.innerHTML += user.displayDetails(id);
}
// Tips:
// To get the gender value You will need to find checked radio button
// Knowledge base
// Button type radio
// https://www.w3schools.com/jsref/prop_radio_checked.asp
// Object creation
//

// TODO
// 1. Change the name of button to "Add user"
// 2. Create class Users.
// properties of class: list (Array of User objects)
// methods:
// - add(user) -> should add user to the list (push to the existing list)
// - get() -> should return list of all users
// 3. Change the behavior of "Add user" button click event
// - create User (done already)
// - add created user to Users list
// - display the list in <div id="details"> users.get() (tip: list is an array, you need to iterate)
// You can play with html and CSS to get better view :)

// TODO
// 1. Disable "Add User" button
// 2. Add simple validation:
// - first name, last name - required fields, min 3 chars (only letters), please be aware about whitespaces
// 3. Enable "Add User" button when first and last name fields mets expectations
// 5. On "Add User" button:
// - check if given user with given first, last name and gender already exist in the list
// - if user doesn't exist in the list add it to the list and show (already done)
// - if user exist in the list do not add it to the list and show error message (below form)
// 4. After "Add user" button clicked clear fields value in the form
