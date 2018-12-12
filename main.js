//XXXXXXXXXXXXXXXXXXXXXXXXXX GET ALL REQUEST XXXXXXXXXXXXXXXXXXXXXXXXXX

let url = "https://watchmanager.herokuapp.com/student/";
let getUsers = document.querySelector(".getUsers");
let usersList = document.querySelector(".usersList");
let newUser = document.querySelector('.newUser');

let displayUsers = (data) => {
    console.log(data);

    while (usersList.hasChildNodes()) {
        usersList.removeChild(usersList.firstChild)
    };

    data.map((user) => {
        console.log(user.studentName);
        let li = document.createElement("li");
        li.innerHTML = /*html*/ `
        <p>Student Name: ${user.studentName}</p>
        <p>Watch subject: ${user.nextWatchSubject}</p>
        <p>Next Watch: ${user.nextWatchDate}</p>
        <p>User ID: ${user._id}</p>
        `
        usersList.appendChild(li);
    })
}

let showUsers = () => {
    fetch(url)
        .then(response => response.json())
        .then(parsedData => displayUsers(parsedData))
        .catch((error) => console.warn(error))
}

getUsers.addEventListener("click", showUsers)

//XXXXXXXXXXXXXXXXXXXXXXXXXX GET BY ID REQUEST XXXXXXXXXXXXXXXXXXXXXXXXXX

let getUserById = document.querySelector(".getUserById");
let singleUser = document.querySelector(".singleUser");

let displaySingleUser = (data) => {
    while (singleUser.hasChildNodes()) {
        singleUser.removeChild(singleUser.firstChild)
    };

    let li = document.createElement("li");
    li.innerHTML = /*html*/ `
        <p>Student Name: ${data.studentName}</p>
        <p>Watch subject: ${data.nextWatchSubject}</p>
        <p>Next Watch: ${data.nextWatchDate}</p>
        <p>User ID: ${data._id}</p>
        `
    singleUser.appendChild(li);
}

let showUsersParam = (id) => {

    fetch(`${url}${id}`)
        .then(response => response.json())
        .then(parsedData => displaySingleUser(parsedData))
        .catch((error) => console.warn(error));
    singleUser.value = "";
}

getUserById.addEventListener("click", function (inputValue) {
    inputValue = document.querySelector(".inputID").value;
    showUsersParam(inputValue)
});

//XXXXXXXXXXXXXXXXXXXXXXXXXX POST REQUEST XXXXXXXXXXXXXXXXXXXXXXXXXX

let postNew = document.querySelector(".postNew");

let enterPost = () => {
    fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "studentName": newUser.value,
        })
    })
    newUser.value = "";
}

postNew.addEventListener("click", enterPost)

//XXXXXXXXXXXXXXXXXXXXXXXXXX UPDATE REQUEST XXXXXXXXXXXXXXXXXXXXXXXXXX

let updateUser = document.querySelector('.updateUser');
let changeDate = document.querySelector('.changeDate');
let changeSubject = document.querySelector('.changeSubject');

const addChange = () => {
    let idToChange = document.querySelector('.idToChange');

    fetch(`${url}${idToChange.value}`, {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "studentName": "Lily",
            "nextWatchDate": changeDate.value,
            "nextWatchSubject": changeSubject.value
        })
    });
    idToChange.value = "";
    changeDate.value = "";
    changeSubject.value = "";
}

updateUser.addEventListener('click', addChange);

//XXXXXXXXXXXXXXXXXXXXXXXXXX DELETE REQUEST XXXXXXXXXXXXXXXXXXXXXXXXXX

let deleteUserById = document.querySelector('.deleteUserById');

const eraseUser = () => {
    let idToDelete = document.querySelector('.idToDelete');
    fetch(`${url}${idToDelete.value}`, {
            method: 'DELETE',
        })
        .then(response => response.json())
        .then(parsedData => console.log(parsedData))
        .catch((error) => console.warn(error));
    idToDelete.value = "";
}

deleteUserById.addEventListener('click', eraseUser)