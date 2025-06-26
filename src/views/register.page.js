import { FormUtils } from "../utils/form.utils.js";
import { User } from "../models/user.model.js";
import { db } from "../DB/db.js";
import Route from "../routing/routing.js";

export function registerPage() {

  return `
    <main>
        <h4 style="font-size:34px; text-align: center; margin: 30px 0;">
           Registrate! 📋
        </h4>
        <div class="glass-effect" style="height: auto; padding: 50px 25px;">
          <form id="register-form" class="form-register" >
            <div class="form-group">
              <input type="text" id="username" name="username" placeholder=" " required />
              <label for="username">Username:</label>
              <span class="error-message" id="username-error"></span>
            </div>
            <div class="form-group">
              <input type="email" id="email" name="email" placeholder=" " required />
              <label for="email">Email:</label>
              <span class="error-message" id="email-error"></span>
            </div>
            <div class="form-group">
              <input type="password" id="password" name="password" placeholder=" " required />
              <label for="password">Password:</label>
              <span class="error-message" id="password-error"></span>
            </div>
            <button type="submit" class="btn-register">Register</button>
          </form>
          <p class="error-message" id="error-message"></p>
          <p class="form-link">
            Already have an account? <a href="#/login">Login here</a>
          </p>
        </div>

        <div class="container">
          <h2>Terms and Conditions</h2>
          <p>
            By registering, you agree to our <a href="#/terms">Terms and Conditions</a> and <a href="#/privacy">Privacy Policy</a>.
          </p>
          <p>
            Please read our <a href="#/terms">Terms of Service</a> and <a href="#/privacy">Privacy Policy</a> carefully before registering.
          </p>
          <p>
            If you have any questions, please contact us at <a href="mailto:example@gmail.com">
          </p>
        </div>
      </div>
    </main>
      

  `;

  
}


registerPage.init = function handelSubmit() {
  const errorMessage = document.getElementById("error-message");
  const inputs = document.querySelectorAll(".form-group input");
  const form = document.getElementById("register-form");
  const route = new Route();

  inputs.forEach((input) => {
    FormUtils.validateInput(input, (value) => {
      input.classList.remove("error");
      if (!value) {
        input.classList.add("error");
        throw new Error(`${input.name.charAt(0).toUpperCase() + input.name.slice(1)} is required.`);
      }
      if (input.name === "username" && value.length < 3) {
        input.classList.add("error");
        throw new Error("Username must be at least 3 characters long.");
      }
      if (input.name === "email" && !/\S+@\S+\.\S+/.test(value)) {
        input.classList.add("error");
        throw new Error("Email must be a valid email address.");
      }
      if (input.name === "password") {
        const regex = /^(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{6,}$/;
        if (!regex.test(value)) {
          input.classList.add("error");
          throw new Error("Password must be at least 6 characters long, contain at least one uppercase letter and one special character.");
        }
      }
    });
  });

  FormUtils.handleFormSubmit(form, (data) => {
    try {
      const userCreated = User.createUser({
        username: data.username,
        password: data.password,
        email: data.email
      });

      if (userCreated.errors) {
        errorMessage.innerHTML = userCreated.errors.join(", ");
        inputs.forEach((input) => input.classList.add("error"));
      } else {
        errorMessage.innerHTML = "";
        inputs.forEach((input) => input.classList.remove("error"));
        form.reset();
      }

      db.addUser(userCreated);
      
      location.hash = "/login"; 
      
    } catch (error) {
      errorMessage.innerHTML = `Error processing form: ${error.message}`;
      inputs.forEach((input) => input.classList.add("error"));
    }
  })
}
