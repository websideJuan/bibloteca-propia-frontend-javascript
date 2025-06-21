import {FormUtils} from "../utils/form.utils.js";
import {PopupUtils} from "../utils/popup.utils.js";
import { db } from "../DB/db.js";

export function loginPage() {

  return `
    <div class="container">
      <h1>
        Iniciar sesión

      </h1>
      <form id="login-form">
        <div class="form-group">
          <input type="text" id="username" name="username" placeholder=" " required />
          <label for="username">Username:</label>
          <span class="error-message" id="username-error"></span>
        </div>
        <div class="form-group">
          <input type="password" id="password" name="password" placeholder=" " required />
          <label for="password">Password:</label>
          <span class="error-message" id="password-error"></span>

        </div>
        <button type="submit">Login</button>
      </form>
      <p class="error-message" id="error-message"></p>
      <p class="form-link">
        Don't have an account? <a href="#/register">Register here</a>
      </p>
    </div>
  `;
}

loginPage.init = function handelSubmit() {
  const errorMessage = document.getElementById("error-message");
  const username = document.getElementById("username");
  const password = document.getElementById("password");
  const inputs = document.querySelectorAll(".form-group input");
  const form = document.getElementById("login-form");

  FormUtils.validateInput(username, (value) => {
    username.classList.remove("error");
  
    if (!value) {
      username.classList.add("error");
      throw new Error("Username is required.");
    }
    if (!/^[a-zA-Z0-9_]+$/.test(value)) {
      username.classList.add("error");
      throw new Error("Username can only contain letters, numbers, and underscores.");
    }
    if (value.length < 3) {
      username.classList.add("error");
      throw new Error("Username must be at least 3 characters long.");
    }
  });

  FormUtils.validateInput(password, (value) => {
    const regex = /^(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{6,}$/
    if (!regex.test(value)) {
      password.classList.add("error");
      throw new Error('Password must be at least 6 characters long, contain at least one uppercase letter and one special character.');
    }
    password.classList.remove("error");
  });

  FormUtils.handleFormSubmit(form, (data) => {
    try {
      const user = db.getUser(data.username);
      
      if (!user) {
        throw new Error("User not found. Please register.");
      }
      if (user.password !== data.password) {
        throw new Error("Incorrect password. Please try again.");
      }

      // If the user is found and the password matches, store the user data in localStorage
      localStorage.setItem("userActivated", JSON.stringify({ username: user.username }));

      
      
      PopupUtils.popup("Login successful!", "success", 1000);
      
      setTimeout(() => {
        // If login is successful, redirect to the home page
        location.hash = "/home";
        
        // Optionally, you can clear the form
        form.reset();
        
      },6000);
    } catch (error) {
  
      errorMessage.innerHTML = error.message;
      inputs.forEach((input) => input.classList.add("error"));
    }
  });
}
