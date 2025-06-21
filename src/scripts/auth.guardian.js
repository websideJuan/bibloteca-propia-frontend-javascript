import { db } from "../DB/db.js";

class AuthGuardian {
  static #instance = null;

  constructor(dbInstance = db) {

    if (AuthGuardian.#instance) {
      return AuthGuardian.#instance;
    }

    this.db = dbInstance;
    AuthGuardian.#instance = this;
  }

  static getInstance() {
    if (!AuthGuardian.#instance) {
      AuthGuardian.#instance = new AuthGuardian();
    }
    return AuthGuardian.#instance;
  }

  async isAuthenticated() {
    const user = JSON.parse(localStorage.getItem('userActivated')) || null;
    const dbUser = this.db.getUser(user?.username); // Ensure user exists in the database


    // si existe el userActive almacenar datos del usuario en window para acceso global

    if (dbUser) {
      await window.cookieStore.set('user', JSON.stringify(dbUser || {})); 
      localStorage.removeItem('userActivated');
    }

    const userWindow = await window.cookieStore.get('user') 
    if (!userWindow || !userWindow.value) {
      return false;
    }
    
    
    return true
  }
}

export const authGuardian = AuthGuardian.getInstance();
export function isAuthenticated() {
  return authGuardian.isAuthenticated();
}