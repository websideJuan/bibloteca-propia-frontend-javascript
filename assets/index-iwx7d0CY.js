var q=Object.defineProperty;var L=a=>{throw TypeError(a)};var T=(a,e,r)=>e in a?q(a,e,{enumerable:!0,configurable:!0,writable:!0,value:r}):a[e]=r;var g=(a,e,r)=>T(a,typeof e!="symbol"?e+"":e,r),y=(a,e,r)=>e.has(a)||L("Cannot "+r);var m=(a,e,r)=>(y(a,e,"read from private field"),r?r.call(a):e.get(a)),w=(a,e,r)=>e.has(a)?L("Cannot add the same private member more than once"):e instanceof WeakSet?e.add(a):e.set(a,r),v=(a,e,r,t)=>(y(a,e,"write to private field"),t?t.call(a,r):e.set(a,r),r),S=(a,e,r)=>(y(a,e,"access private method"),r);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))t(s);new MutationObserver(s=>{for(const o of s)if(o.type==="childList")for(const n of o.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&t(n)}).observe(document,{childList:!0,subtree:!0});function r(s){const o={};return s.integrity&&(o.integrity=s.integrity),s.referrerPolicy&&(o.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?o.credentials="include":s.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function t(s){if(s.ep)return;s.ep=!0;const o=r(s);fetch(s.href,o)}})();class A{constructor(){this.routes={},this.currentRoute=null,this.init()}addRoute({path:e,component:r,callback:t,redirectTo:s}){if(typeof e!="string"||!e.startsWith("/"))throw new Error('Path must be a string starting with "/"');if(r&&typeof r!="function")throw new Error("Component must be a function");if(t&&typeof t!="function")throw new Error("Callback must be a function");if(s&&typeof s!="string")throw new Error("RedirectTo must be a string");this.routes[e]={component:r,callback:t,redirectTo:s}}async navigate({path:e}){var s;const r=e.replace(/\/$/,"")||"/",t=this.routes[r];if(this.currentRoute=r,!t){this.renderContent('<h1>404 - Not Found</h1> <p>The page you are looking for does not exist.</p> <a href="#/home">Go to Home</a>');return}if(await(t==null?void 0:t.callback)&&await((s=t==null?void 0:t.callback)==null?void 0:s.call(t))===!1){this.navigate({path:"/login"});return}if(t!=null&&t.redirectTo){console.log(`Redirecting to: ${t.redirectTo}`),this.navigate({path:t.redirectTo});return}setTimeout(()=>{try{if(t&&typeof t.component=="function"){const o=t.component();this.renderContent(o),location.hash=r}}catch(o){console.error(o.message)}},0)}init(){window.addEventListener("load",()=>{const e=location.hash.slice(1)||"/";this.navigate({path:e})}),window.addEventListener("hashchange",()=>{const e=location.hash.slice(1);this.navigate({path:e})})}renderContent(e){var t,s;const r=document.getElementById("app");if(!r)throw new Error("App element not found");r.innerHTML=e,typeof((t=this.routes[this.currentRoute])==null?void 0:t.component.init)=="function"&&((s=this.routes[this.currentRoute].component)==null||s.init())}attachiLinkHandlers(){document.querySelectorAll('a[href^="#/"]').forEach(e=>{e.addEventListener("click",r=>{r.preventDefault();const t=e.getAttribute("href").slice(1);location.hash=t})})}}class ${constructor(){this.users=[]}addUser(e){if(!e||!e.username||e.password,!e.email)throw new Error("Invalid user data");try{const r=this.getAllUsers();r&&(this.users=r),this.users.push(e),localStorage.setItem("users",JSON.stringify(this.users))}catch(r){this.errors=[],this.errors.push(r.message),console.error("Error adding user:",r)}}getUser(e){const r=this.getAllUsers();return r?r.find(t=>t.username===e):null}getAllUsers(){return JSON.parse(localStorage.getItem("users"))}clearUsers(){this.users=[]}}const p=new $;let l=null;(async()=>{const a=await B();l=JSON.parse((a==null?void 0:a.value)||null),console.log("Usuario:",l)})();console.log(l);async function B(){return await window.cookieStore.get("user")}function P(){return`
  <nav class="navbar">
    <div class="logo">
      <a href="#/home">MyApp</a>
    </div>

  <div class="search-bar">
    <input type="text" placeholder="Search..." name="searchInput" />
  </div>
  ${l?`<div class="user-container" style="display: flex; flex-direction: column; align-items: center; justify-self: start;">
    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQcOVhU4ztr2rdwJFbSFenvGPN2AXEnsd9MAA&s" width="30" height="30" alt="User Avatar" class="user-avatar" />
    <span class="user-name" style="font-size: 13px;">${l.username}</span>
    <div class="user-menu">
      <a href="#/profile">Profile</a>
      <a href="#/settings">Settings</a>
      <a href="#/logout" class="log-out">Log Out</a>
    </div>
  </div>`:""}

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
  `}P.init=function(){const e=document.getElementById("userActivate");if(l){const r=p.getUser(l.username);r?e.innerHTML=`El usuario activo es ${r.username}, y su email es: ${r.email}!`:console.error("User not found in the database.")}else console.warn("No user is currently activated.");document.querySelector(".container").addEventListener("click",async r=>{r.target.classList.contains("log-out")&&(await window.cookieStore.delete("user"),location.hash="#/login")})};class u{static handleFormSubmit(e,r){e.addEventListener("submit",t=>{t.preventDefault();const s=new FormData(t.target),o=Object.fromEntries(s.entries());if(e.querySelectorAll(".error-message").forEach(n=>{!n.textContent===""||o[n.id.replace("-error","")].length!==0||(console.log(n.textContent===""),n.textContent=`this ${n.id.replace("-error","")} is required`)}),!!this.stateOfValidation.isValid){this.stateBtn=!0;try{this.stateBtn&&(e.querySelector("button[type='submit']").disabled=!0,e.querySelector("button[type='submit']").innerHTML='<p class="spinner"></p>'),r(o)}catch(n){throw new Error(`Error processing form: ${n}`)}finally{this.stateBtn=!1}}})}static validateInput(e,r){const t=document.getElementById(`${e.name}-error`);e.addEventListener("input",()=>{const s=e.value;try{r(s),t.textContent="",this.stateOfValidation.isValid=!0}catch(o){t.textContent=o.message,this.stateOfValidation.isValid=!1}})}static clearForm(e){const r=document.getElementById(e);r?(r.reset(),r.querySelectorAll(".error-message").forEach(s=>s.textContent="")):console.error(`Form with ID ${e} not found.`)}}g(u,"stateOfValidation",{isValid:!1,stateBtn:!1});class M{static popup(e,r="info",t=6e3){const s=document.createElement("div");s.className=`notification notification-${r}`,s.textContent=e,document.body.appendChild(s),setTimeout(()=>{s.remove()},t)}}function I(){return`
    <div class="container">
      <h1>
        Iniciar sesión

      </h1>
      <form id="login-form">
        <div class="form-group">
          <input type="text" id="username" name="username" placeholder=" " required />
          <label for="username">Username:</label>
          <span class="error-message" id="username-error"></span>
        </div>
        <div class="form-group">
          <input type="password" id="password" name="password" placeholder=" " required />
          <label for="password">Password:</label>
          <span class="error-message" id="password-error"></span>

        </div>
        <button type="submit">Login</button>
      </form>
      <p class="error-message" id="error-message"></p>
      <p class="form-link">
        Don't have an account? <a href="#/register">Register here</a>
      </p>
    </div>
  `}I.init=function(){const e=document.getElementById("error-message"),r=document.getElementById("username"),t=document.getElementById("password"),s=document.querySelectorAll(".form-group input"),o=document.getElementById("login-form");u.validateInput(r,n=>{if(r.classList.remove("error"),!n)throw r.classList.add("error"),new Error("Username is required.");if(!/^[a-zA-Z0-9_]+$/.test(n))throw r.classList.add("error"),new Error("Username can only contain letters, numbers, and underscores.");if(n.length<3)throw r.classList.add("error"),new Error("Username must be at least 3 characters long.")}),u.validateInput(t,n=>{if(!/^(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{6,}$/.test(n))throw t.classList.add("error"),new Error("Password must be at least 6 characters long, contain at least one uppercase letter and one special character.");t.classList.remove("error")}),u.handleFormSubmit(o,n=>{try{const d=p.getUser(n.username);if(!d)throw new Error("User not found. Please register.");if(d.password!==n.password)throw new Error("Incorrect password. Please try again.");localStorage.setItem("userActivated",JSON.stringify({username:d.username})),M.popup("Login successful!","success",1e3),setTimeout(()=>{location.hash="/home",o.reset()},6e3)}catch(d){e.innerHTML=d.message,s.forEach(O=>O.classList.add("error"))}})};var f,U;class b{static createUser({username:e,password:r,email:t}){try{return S(this,f,U).call(this,{username:e,password:r,email:t})?{id:Math.random(1,1e6),username:e,password:r,email:t}:this.errors}catch(s){console.log(s),this.errors.push(s.message)}}}f=new WeakSet,U=function({username:e,password:r,email:t}){return typeof e!="string"||e.trim()===""?(this.errors.push("Username must be a non-empty string"),!1):typeof r!="string"||r.length<6?(this.errors.push("Password must be a string with at least 6 characters"),!1):t&&(typeof t!="string"||!t.includes("@"))?(this.errors.push("Email must be a valid email address"),!1):!0},w(b,f),g(b,"errors",[]);function C(){return`
    <div class="container">
      <h1>Registrate</h1>
      <form id="register-form" class="register-form" >
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
      

  `}C.init=function(){const e=document.getElementById("error-message"),r=document.querySelectorAll(".form-group input"),t=document.getElementById("register-form");new A,r.forEach(s=>{u.validateInput(s,o=>{if(s.classList.remove("error"),!o)throw s.classList.add("error"),new Error(`${s.name.charAt(0).toUpperCase()+s.name.slice(1)} is required.`);if(s.name==="username"&&o.length<3)throw s.classList.add("error"),new Error("Username must be at least 3 characters long.");if(s.name==="email"&&!/\S+@\S+\.\S+/.test(o))throw s.classList.add("error"),new Error("Email must be a valid email address.");if(s.name==="password"&&!/^(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{6,}$/.test(o))throw s.classList.add("error"),new Error("Password must be at least 6 characters long, contain at least one uppercase letter and one special character.")})}),u.handleFormSubmit(t,s=>{try{const o=b.createUser({username:s.username,password:s.password,email:s.email});o.errors?(e.innerHTML=o.errors.join(", "),r.forEach(n=>n.classList.add("error"))):(e.innerHTML="",r.forEach(n=>n.classList.remove("error")),t.reset()),p.addUser(o),location.hash="/login"}catch(o){e.innerHTML=`Error processing form: ${o.message}`,r.forEach(n=>n.classList.add("error"))}})};var c;const i=class i{constructor(e=p){if(m(i,c))return m(i,c);this.db=e,v(i,c,this)}static getInstance(){return m(i,c)||v(i,c,new i),m(i,c)}async isAuthenticated(){const e=JSON.parse(localStorage.getItem("userActivated"))||null,r=this.db.getUser(e==null?void 0:e.username);r&&(await window.cookieStore.set("user",JSON.stringify(r||{})),localStorage.removeItem("userActivated"));const t=await window.cookieStore.get("user");return!(!t||!t.value)}};c=new WeakMap,w(i,c,null);let E=i;const R=E.getInstance();function x(){return R.isAuthenticated()}const h=new A;h.addRoute({path:"/",redirectTo:"/home",callback:async()=>await x()});h.addRoute({path:"/home",component:P,callback:async()=>await x()});h.addRoute({path:"/login",component:I});h.addRoute({path:"/register",component:C});const N=location.hash.slice(1)||"/";h.navigate({path:N});
