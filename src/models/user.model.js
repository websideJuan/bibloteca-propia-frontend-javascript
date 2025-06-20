export class User {

  errors = [];

  static #validateUserData({ username, password, email }) {
    if (typeof username !== 'string' || username.trim() === '') {
      errors.push('Username must be a non-empty string');
      throw new Error('Username must be a non-empty string');
    }
    if (typeof password !== 'string' || password.length < 6) {
      errors.push('Password must be a string with at least 6 characters');
      throw new Error('Password must be a string with at least 6 characters');
    }
    if (email && (typeof email !== 'string' || !email.includes('@'))) {
      errors.push('Email must be a valid email address');
      throw new Error('Email must be a valid email address');
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
        id: Math.random(
          1, 1000000
          
        ), // Simulating an ID for the user
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