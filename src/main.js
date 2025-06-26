import "./style.css";
import Routing from "./routing/routing.js";
import { homePage } from "./views/home.page.js";
import { aboutPage } from "./views/about.page.js";
import { loginPage } from "./views/login.page.js";
import { registerPage } from "./views/register.page.js";
import { startGamePage } from "./views/startgame.page.js";
import { isAuthenticated } from "./scripts/auth.guardian.js"

const routing = new Routing();

routing.addRoute({
  path: "/",
  redirectTo: "/home",
  callback: async () => await isAuthenticated()
});

routing.addRoute({
  path: "/home",
  component: homePage,
  callback: async () => await isAuthenticated()
});

routing.addRoute({
  path: "/about",
  component: aboutPage,
  callback: async () => await isAuthenticated()
});

routing.addRoute({
  path: "/login",
  component: loginPage
});

routing.addRoute({
  path: "/register",
  component: registerPage,
});

routing.addRoute({
  path: "/startgame",
  component: startGamePage,
  callback: async () => await isAuthenticated()
});

routing.addRoute({
  path: "/logout",
  redirectTo: "/login",
  callback: async () => {
    await window.cookieStore.delete("user"); 
    window.localStorage.removeItem("modeSelected");
  }
});

const path = location.hash.slice(1) || '/';
routing.navigate({ path });


// testing.crateMilUsers();