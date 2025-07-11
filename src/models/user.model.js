
export class User {

  static errors = [];

  static #validateUserData({ username, password, email }) {
    if (typeof username !== 'string' || username.trim() === '') {
      this.errors.push('Username must be a non-empty string');
      return false;
    }
    if (typeof password !== 'string' || password.length < 6) {
      this.errors.push('Password must be a string with at least 6 characters');
      return false;
    }
    if (email && (typeof email !== 'string' || !email.includes('@'))) {
      this.errors.push('Email must be a valid email address');
      return false;
    }
    return true;
  }

  static createUser({ username, password, email }) {
    try {
      const valid = this.#validateUserData({ username, password, email });
      if (!valid) {
        return this.errors;
      }
      // Here you would typically save the user to a database
      const userCreated = {
        id: window.crypto.randomUUID(), // Simulating an ID for the user
        lives: 3, // Default lives for a new user
        score: 0, // Default score for a new user
        username,
        password, // In a real application, you should hash the password before storing it
        email
      };
      
      // Simulate user creation
      return userCreated;
      
    } catch (error) {
      console.log(error);
      
      this.errors.push(error.message);
    }
  }


}