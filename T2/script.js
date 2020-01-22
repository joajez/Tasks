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
        return `My name is ${this.firstName} ${this.lastName} and I'm a ${this.gender}`;
    }
};
// To do:
// Show user details

const button = document.getElementById('button');
const details = document.getElementById('details');

button.addEventListener("click", function () {
    const genderButtons = document.getElementsByName('gender');
    for (i = 0; i < genderButtons.length; i++) {
        if (genderButtons[i].checked)
            gender = genderButtons[i].value;
    }
    let user = new User(document.getElementById('name').value, document.getElementById('lastName').value, gender)
    details.innerHTML = user.displayDetails();
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