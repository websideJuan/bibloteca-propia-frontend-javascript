import "./style.css";
import Routing from "./routing/routing.js";
import { homePage } from "./views/home.page.js";
import { loginPage } from "./views/login.page.js";
import { registerPage } from "./views/register.page.js";
import { db } from "./DB/db.js";

const routing = new Routing();

routing.addRoute({
  path: "/",
  redirectTo: "/home",
  callback: () => isAuthenticated(),
});

routing.addRoute({
  path: "/home",
  component: homePage,
  callback: () => isAuthenticated(),
});

routing.addRoute({
  path: "/login",
  component: loginPage
});

routing.addRoute({
  path: "/register",
  component: registerPage,
});

const path = location.hash.slice(1) || '/';
routing.navigate({ path });


function isAuthenticated() {
  let isValid = false;
  const userActivated = localStorage.getItem("userActivated");
  
  
  if (userActivated ) {
    const user = db.getUser(userActivated);
    isValid = true; // User is authenticated
  } else {
    isValid = false; // User is not authenticated
  }

  return isValid
  ; // User is not authenticated
}