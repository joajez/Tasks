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
}
// To do:
// Show user details

const button = document.getElementById("button");
const details = document.querySelector("#details ul");

button.addEventListener("click", function() {
  const genderButtons = document.getElementsByName("gender");
  for (i = 0; i < genderButtons.length; i++) {
    if (genderButtons[i].checked) gender = genderButtons[i].value;
  }
  const user = new User(
    document.getElementById("name").value,
    document.getElementById("lastName").value,
    gender
  );
  let usersList = new Users();
  usersList.add(user);
  usersArray = usersList.get();
  for (i = 0; i < usersArray.length; i++) {
    details.innerHTML += "<li>" + usersArray[i].displayDetails() + "</li>";
  }
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
