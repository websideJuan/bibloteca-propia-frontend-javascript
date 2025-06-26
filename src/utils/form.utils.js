export class FormUtils {
  static stateOfValidation = {
    isValid: false,
    stateBtn: false,
  };

  static handleFormSubmit(form, callback) {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const formData = new FormData(event.target);
      const data = Object.fromEntries(formData.entries());
      
      form.querySelectorAll(".error-message").forEach((msg) => {
        if (
          !msg.textContent === "" ||
          data[msg.id.replace("-error", "")].length !== 0
        ) {
          return;
        }
        
        console.log(msg.textContent === "");
        
        msg.textContent = `this ${msg.id.replace("-error", "")} is required`;
      });

      const userActivated = JSON.parse(localStorage.getItem("userActivated"));

      if (!this.stateOfValidation.isValid || !userActivated) {
        this.stateBtn = false; // Reset state if validation fails
      } else {
        this.stateBtn = true; // Set state to true if validation passes
      }
      
 
      try {
        if (this.stateBtn) {
          form.querySelector("button[type='submit']").disabled = true; // Disable button to prevent multiple submissions
          form.querySelector("button[type='submit']").innerHTML = '<p class="spinner"></p>' // Change button text to indicate submission
        }
        callback(data);
      } catch (error) {
        throw new Error(`Error processing form: ${error}`);
        // Handle error, e.g., show error message to user
      } finally {
        this.stateBtn = false; // Reset state after submission
      }
    });
  }

  static validateInput(input, validationFn) {
    const errorMessageElement = document.getElementById(`${input.name}-error`);

    input.addEventListener("input", () => {
      const value = input.value;
      try {
        validationFn(value);
        errorMessageElement.textContent = ""; // Clear error message
        this.stateOfValidation.isValid = true; // Set valid state
      } catch (error) {
        errorMessageElement.textContent = error.message; // Show error message
        this.stateOfValidation.isValid = false; // Set invalid state
      }
    });
  }

  static clearForm(formId) {
    const formElement = document.getElementById(formId);
    if (formElement) {
      formElement.reset();
      const errorMessages = formElement.querySelectorAll(".error-message");
      errorMessages.forEach((msg) => (msg.textContent = ""));
    } else {
      console.error(`Form with ID ${formId} not found.`);
    }
  }
}
