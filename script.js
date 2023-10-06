let host = "http://localhost:8080/users";

fetch(host)
  .then((res) => res.json())
  .then((res) => reload(res));

let ul = document.querySelector("ul");
let add_button = document.querySelector("button");

add_button.onclick = () => {
  let firstName = prompt("First name?");
  let lastName = prompt("Last name?");
  if (firstName.length > 0 && lastName.length > 0) {
    fetch(host, {
      method: "post",
      body: JSON.stringify({ firstName: firstName, lastName: lastName }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => adding_users(res));
  }
};

function reload(arr) {
  ul.innerHTML = "";

  for (let item of arr) {
    let li = document.createElement("li");
    let editButton = document.createElement("button");
    let deleteButton = document.createElement("button");

    li.innerHTML = "";

    let nameSpan = document.createElement("span");
    nameSpan.innerText = item.firstName + " " + item.lastName;

    deleteButton.innerHTML = "Delete";
    editButton.innerHTML = "edit";

    ul.append(li);
    li.append(nameSpan);
    li.append(editButton, deleteButton);

    deleteButton.onclick = () => {
      fetch("http://localhost:8080/users/" + item.id, {
        method: "delete",
      }).then((res) => {
        if (res.status === 200 || res.status === 201) {
          li.remove();
        }
      });
    };
    editButton.onclick = () => {
      let newFirstName = prompt("New first name?");
      let newLastName = prompt("New last name?");

      if (newFirstName.length > 0 && newLastName.length > 0) {
        fetch("http://localhost:8080/users/" + item.id, {
          method: "put",
          body: JSON.stringify({
            firstName: newFirstName,
            lastName: newLastName,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((res) => res.json())
          .then(() => {
            nameSpan.innerHTML = `${newName.newFirstName} ${newName.newLastName}`;
          });
      }
    };
  }
}

function adding_users(res) {
  let li = document.createElement("li");
  let deleteButton = document.createElement("button");
  let addButton = document.createElement("button");

  li.innerHTML = res.firstName + " " + res.lastName;
  deleteButton.innerHTML = "Delete";
  editButton.innerHTML = "edit";

  ul.append(li);
  li.append(deleteButton);

  deleteButton.onclick = () => {
    fetch("http://localhost:8080/users/" + res.id, {
      method: "delete",
    }).then((res) => {
      if (res.status === 200 || res.status === 201) {
        li.remove();
      }
    });
  };
}
