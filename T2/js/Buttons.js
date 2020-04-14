function deleteHandler(e) {
    const idDelete = e.target.id.match(/\d+/g);
    usersList.delete(idDelete);
    usersArray = usersList.get();
    id = 0;
    details.innerHTML = createUsersTable(usersArray);
    updateButtons();
}

function editHandler(e) {
    const idEdit = e.target.id.match(/\d+/g);
    const nameEdit = document.querySelector(`.name${idEdit}`);
    const lastNameEdit = document.querySelector(`.lastName${idEdit}`);
    const genderEdit = document.querySelector(`.gender${idEdit}`);
    let currentButtonEdit = document.querySelector(`#edit${idEdit}`);
    let currentButtonSave = document.querySelector(`#save${idEdit}`);
    usersArray = usersList.get();
    usersArray.map(function (obj) {
        if (obj.userId == idEdit) {
            nameEdit.innerHTML = `<input value = ${obj.firstName}>`;
            lastNameEdit.innerHTML = `<input value = ${obj.lastName}>`;
            genderEdit.innerHTML = `<input value = ${obj.gender}>`;
        }
    });
    currentButtonEdit.classList.add("hide");
    currentButtonSave.classList.remove("hide");
}

function saveHandler(e) {
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
}

function updateButtons() {
    let buttonsDelete = document.querySelectorAll(".buttonDelete");
    let buttonsEdit = document.querySelectorAll(".buttonEdit");
    let buttonsSave = document.querySelectorAll(".buttonSave");

    buttonsDelete.forEach(function (elem) {
        elem.addEventListener("click", deleteHandler);
    });

    buttonsEdit.forEach(function (elem) {
        elem.addEventListener("click", editHandler);
    });

    buttonsSave.forEach(function (elem) {
        elem.addEventListener("click", saveHandler);
    });
}

button.addEventListener("click", function (e) {
    const gender = document.querySelector('input[name="gender"]:checked').value;
    usersArray = usersList.get();
    let user = new User(name.value, lastname.value, gender, usersArray);
    addIfNotExist(user, usersList);
    usersArray = usersList.get();
    details.innerHTML = createUsersTable(usersArray);
    updateButtons();
    clearFields();
});

loadFileButton.addEventListener("click", function () {
    document.getElementById("error").innerHTML = "";
    const fileInput = document.getElementById("fileUsers");
    addUsersFromFile(fileInput);
});