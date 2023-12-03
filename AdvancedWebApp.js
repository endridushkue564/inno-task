/* 
   Filename: AdvancedWebApp.js
   Description: This code demonstrates an advanced web application that includes 
                dynamic content generation, event handling, API calls, and data manipulation.
*/


// Global variables
let nameInput;
let ageInput;
let submitButton;
let userList;
let users = [];


// Function to add a user to the list
function addUser(name, age) {
  users.push({ name, age });
  renderUserList();
}


// Function to remove a user from the list
function removeUser(index) {
  users.splice(index, 1);
  renderUserList();
}


// Function to render the user list
function renderUserList() {
  userList.innerHTML = "";

  for (let i = 0; i < users.length; i++) {
    const userDiv = document.createElement("div");
    userDiv.className = "user";
    
    const userInfo = document.createElement("p");
    userInfo.textContent = `${users[i].name}, ${users[i].age} years old`;

    const removeButton = document.createElement("button");
    removeButton.textContent = "Remove";
    removeButton.addEventListener("click", () => removeUser(i));

    userDiv.append(userInfo, removeButton);
    userList.appendChild(userDiv);
  }
}


// Function to fetch user data from an API
async function fetchUsers() {
  try {
    const response = await fetch("https://api.example.com/users");
    const data = await response.json();

    for (let i = 0; i < data.length; i++) {
      const { name, age } = data[i];
      addUser(name, age);
    }
  } catch (error) {
    console.error("Error fetching users:", error);
  }
}


// Function to handle form submission
function handleFormSubmit(event) {
  event.preventDefault();
  const name = nameInput.value.trim();
  const age = parseInt(ageInput.value, 10);

  if (name && !isNaN(age)) {
    addUser(name, age);
    nameInput.value = "";
    ageInput.value = "";
  }
}


// Function to initialize the application
function initializeApp() {
  nameInput = document.getElementById("name-input");
  ageInput = document.getElementById("age-input");
  submitButton = document.getElementById("submit-button");
  userList = document.getElementById("user-list");

  submitButton.addEventListener("click", handleFormSubmit);

  fetchUsers();
  renderUserList();
}


// Entry point of the application
window.addEventListener("DOMContentLoaded", initializeApp);