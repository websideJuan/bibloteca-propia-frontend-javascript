import { db } from "../DB/db.js";

var cookieUser = await getCookieStore();
var user = JSON.parse(cookieUser?.value || null);

async function getCookieStore() {
  const userCookie = await window.cookieStore.get("user");
  return userCookie;
}

export function homePage() {
  return `
  <nav class="navbar">
    <div class="logo">
      <a href="#/home">MyApp</a>
    </div>

  <div class="search-bar">
    <input type="text" placeholder="Search..." name="searchInput" />
  </div>
  ${
    user
      ? `<div class="user-container" style="display: flex; flex-direction: column; align-items: center; justify-self: start;">
    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQcOVhU4ztr2rdwJFbSFenvGPN2AXEnsd9MAA&s" width="30" height="30" alt="User Avatar" class="user-avatar" />
    <span class="user-name" style="font-size: 13px;">${user.username}</span>
    <div class="user-menu">
      <a href="#/profile">Profile</a>
      <a href="#/settings">Settings</a>
      <a href="#/logout" class="log-out">Log Out</a>
    </div>
  </div>`
      : ""
  }

  <div class="hamburger-menu">
    <button class="hamburger">☰</button>
  </div>

  
    <ul>
      <li><a href="#/home">Home</a></li>
      <li><a href="#/profile">Profile</a></li>
      <li><a href="#/settings">Settings</a></li>
      <li><a href="#/about">About</a></li>
      <li><a href="#/contact">Contact</a></li>
    </ul>
  </nav>
    
    <main class="container">
      <header class="header">
        <h1>Welcome to the Home Page</h1>
        <p>This is the home page of our application.</p>
      </header>
      <div class="main">
        <p>Here you can find various features and information.</p>
        <p>Feel free to explore!</p>
        <p class="form-link">
          <a href="#/login">Login</a> | <a href="#/register">Register</a>
        </p>

        <p class="form-link">
          <a href="#/profile">Profile</a> | <a href="#/settings">Settings</a>
        </p>

        <p class="form-link">
          <a href="#/about">About</a> | <a href="#/contact">Contact</a>
        </p>

        <p class="form-link" id="userActivate"></p>
      </div>
      <button class="log-out">Log Out</button>
    </main>
  `;
}

homePage.init = function handelHomePage() {
  const userActivateElement = document.getElementById("userActivate");

  if (user) {
    const userDatabese = db.getUser(user.username);
    if (userDatabese) {
      userActivateElement.innerHTML = `El usuario activo es ${userDatabese.username}, y su email es: ${userDatabese.email}!`;
    } else {
      console.error("User not found in the database.");
    }
  } else {
    console.warn("No user is currently activated.");
  }

  document.querySelector(".container").addEventListener("click", async (event) => {
    if (event.target.classList.contains("log-out")) {
      await window.cookieStore.delete("user");
      location.hash = "#/login"; // Redirect to login page after logout
    }
  });
};
