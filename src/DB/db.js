class DB {
  constructor() {
    this.users = [];
  }

  addUser(user) {
    if (!user || !user.username || !user.password, !user.email) {
      throw new Error('Invalid user data');
    }

    try {
      
      const db = this.getAllUsers();
      if (db) {
        this.users = db
      } 
  
      this.users.push(user);
      localStorage.setItem('users', JSON.stringify(this.users));
    } catch (error) {
      this.errors = [];
      this.errors.push(error.message);
      console.error('Error adding user:', error);
    }

    
  }

  getUser(username) {
    const db = this.getAllUsers();
    if (!db) {
      return null;
    }

    return db.find(user => user.username === username);
  }

  getAllUsers() {
    return JSON.parse(localStorage.getItem('users'));
  }

  clearUsers() {
    this.users = [];
  }
}

export const db = new DB();