class Users {
  constructor() {
    this.userList = [];
  }

  add(User) {
    this.userList.push(User);
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

  constructor(firstName, lastName, gender) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.gender = gender;
  }

  displayDetails() {
    // todo: Add implementation
    // Return a string 'My name is <first name> <last name> and I'm a <gender>
    return `My name is <b> ${this.firstName} ${this.lastName} </b> and I'm a ${this.gender}`;
  }
  static validateName(firstname, lastname) {
    const reg = /[a-zA-Z]{3,}/;
    return reg.test(firstname) && reg.test(lastname);
  }
}
// To do:
// Show user details
const button = document.getElementById("button");
const details = document.querySelector("#details ul");
const name = document.getElementById("name");
const lastname = document.getElementById("lastName");
const male = document.getElementById("male");
button.disabled = true;
let usersList = new Users();

function checkValid() {
  if (User.validateName(name.value, lastname.value)) {
    button.disabled = false;
  } else {
    button.disabled = true;
  }
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

  details.innerHTML = "";
  const gender = document.querySelector('input[name="gender"]:checked').value;
  const user = new User(name.value, lastname.value, gender);
  usersArray = usersList.get();

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
  function writeDetails(user) {
    details.innerHTML += `<li>${user.displayDetails()}</li>`;
  }
  clearFields();

  // To do:
  // create an object User
  // In the <div id="details"> display data from the form
  // tip: get string with details from user.displayDetails()
});

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
