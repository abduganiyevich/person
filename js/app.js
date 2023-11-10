const name = document.getElementById("name");
const age = document.getElementById("age");
const email = document.getElementById("email");
const btn = document.getElementById("btn");
const table = document.getElementById("table");

const validation = () => {
  if (!name.value.trim()) {
    name.style.outlineColor = "red";
    name.focus();
    return false;
  }
  if (!email.value.trim()) {
    email.style.outlineColor = "red";
    email.focus();
    return false;
  }
  return true;
};

function createSave() {
  if (!validation()) {
    return;
  }

  let dataLocalStorage = localStorage.getItem('users');
  let data = [];

  if (dataLocalStorage) {
    data = JSON.parse(dataLocalStorage);
  }

  let user = {
    id: Date.now(),
    name: name.value,
    age: age.value,
    email: email.value
  };

  data.push(user);

  localStorage.setItem('users', JSON.stringify(data));

  
  updateTable();
}

function createRow(user, index) {
  let strRow = `<tr>
    <td>${index + 1}</td>
    <td>${user.name}</td>
    <td>${user.email}</td>
    <td>${user.age}</td>
    <td>
      <span class="delete" onclick="deleteUser(${user.id})">delete</span>
      <span class="update" onclick="updateUser(${user.id})">update</span>
    </td>
  </tr>`;

  table.innerHTML += strRow;
}

function updateTable() {
 
  table.innerHTML = "";

  let data = localStorage.getItem('users') ? JSON.parse(localStorage.getItem('users')) : [];

  if (data.length) {
    data.forEach((user, index) => {
      createRow(user, index);
    });
  }
}

function deleteUser(userId) {
  let data = localStorage.getItem('users') ? JSON.parse(localStorage.getItem('users')) : [];

  let userIndex = data.findIndex(user => user.id === userId);

  if (userIndex !== -1) {
    data.splice(userIndex, 1);

    localStorage.setItem('users', JSON.stringify(data));

    updateTable();
  }
}

function updateUser(userId) {
  name.value = "";
  age.value = "";
  email.value = "";

  
  let data = localStorage.getItem('users') ? JSON.parse(localStorage.getItem('users')) : [];

  let userToUpdate = data.find(user => user.id === userId);

  if (userToUpdate) {
    name.value = userToUpdate.name;
    age.value = userToUpdate.age;
    email.value = userToUpdate.email;
  }
}

btn.addEventListener("click", () => {
  createSave();
  form.reset();
});

window.onload = function () {
  updateTable();
}
