const button = document.getElementById("button");
const details = document.querySelector("#details");
const name = document.getElementById("name");
const lastname = document.getElementById("lastName");
const male = document.getElementById("male");
button.disabled = true;
let usersList = new Users();
const loadFileButton = document.getElementById("loadFileButton");

name.addEventListener("input", checkValid);
lastname.addEventListener("input", checkValid);

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
  let usersRows = "";
  let tableRows = `<tr>
      <th>No.</th>
      <th>First Name</th>
      <th>Last Name</th>
      <th>Gender</th>
      <th>Creation Date</th>
      <th></th>
    </tr>`;
  usersArray.map(function (user, id) {
    usersRows += user.displayDetails(id);
  });
  tableRows += usersRows;
  return tableRows;
}

function addIfNotExist(user, usersList) {
  try {
    if (usersList.checkIfExists(user)) {
      throw `User ${user.firstName} ${user.lastName} (${user.gender}) already exists!`;
    } else {
      usersList.add(user);
      document.getElementById("error").innerHTML += "";
    }
  } catch (err) {
    document.getElementById("error").innerHTML +=
      "<div>Error: " + err + ".</div>";
  }
}

function addUsersFromFile(fileInput) {
  let obj;
  let file = fileInput.files[0];
  if (file) {
    let reader = new FileReader();
    reader.readAsText(file);
    reader.onload = function (e) {
      obj = JSON.parse(e.target.result);
      for (user in obj.users) {
        usersArray = usersList.get();
        let date = new Date(obj.users[user].timestamp);
        gender = identifyGender(obj.users[user].gender);
        userJSON = new User(
          obj.users[user].firstName,
          obj.users[user].lastName,
          gender,
          usersArray,
          date
        );
        addIfNotExist(userJSON, usersList);
        usersArray = usersList.get();
        details.innerHTML = createUsersTable(usersArray);
        updateButtons();
        clearFields();
      }
    };
  } else {
    document.getElementById("error").innerHTML = "Error: Load file first!";
  }
}

function identifyGender(genderFromFile) {
  switch (genderFromFile) {
    case "F":
      return (gender = "female");
      break;
    case "M":
      return (gender = "male");
      break;
    case "O":
      return (gender = "other");
  }
}