import {FormUtils} from "../utils/form.utils.js";
import { db } from "../DB/db.js";

export function loginPage() {
  window.addEventListener("DOMContentLoaded", () => handelSubmit());
  return `
    <div class="login-container">
      <h1>Login Page</h1>
      <form id="login-form">
        <div class="form-group">
          <input type="text" id="username" name="username" placeholder=" "  />
          <label for="username">Username:</label>
          <span class="error-message" id="username-error"></span>
        </div>
        <div class="form-group">
          <input type="password" id="password" name="password" placeholder=" "  />
          <label for="password">Password:</label>
          <span class="error-message" id="password-error"></span>

        </div>
        <button type="submit">Login</button>
      </form>
      <p class="error-message" id="error-message"></p>
      <p class="form-link">
        Don't have an account? <a href="/register">Register here</a>
      </p>
    </div>
  `;
}

function handelSubmit() {
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

      // If login is successful, redirect to the home page
      window.location.href = "/";
      
      // Optionally, you can clear the form
      form.reset();
      
    } catch (error) {
  
      errorMessage.innerHTML = error.message;
      inputs.forEach((input) => input.classList.add("error"));
    }
  });
}
