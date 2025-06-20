var y=Object.defineProperty;var h=a=>{throw TypeError(a)};var v=(a,e,r)=>e in a?y(a,e,{enumerable:!0,configurable:!0,writable:!0,value:r}):a[e]=r;var d=(a,e,r)=>v(a,typeof e!="symbol"?e+"":e,r),L=(a,e,r)=>e.has(a)||h("Cannot "+r);var f=(a,e,r)=>e.has(a)?h("Cannot add the same private member more than once"):e instanceof WeakSet?e.add(a):e.set(a,r);var g=(a,e,r)=>(L(a,e,"access private method"),r);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))s(t);new MutationObserver(t=>{for(const o of t)if(o.type==="childList")for(const n of o.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&s(n)}).observe(document,{childList:!0,subtree:!0});function r(t){const o={};return t.integrity&&(o.integrity=t.integrity),t.referrerPolicy&&(o.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?o.credentials="include":t.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function s(t){if(t.ep)return;t.ep=!0;const o=r(t);fetch(t.href,o)}})();class p{constructor(){this.routes={},this.currentRoute=null,this.init()}addRoute({path:e,component:r,callback:s,redirectTo:t}){if(typeof e!="string"||!e.startsWith("/"))throw new Error('Path must be a string starting with "/"');if(r&&typeof r!="function")throw new Error("Component must be a string");if(s&&typeof s!="function")throw new Error("Callback must be a function");if(t&&typeof t!="string")throw new Error("RedirectTo must be a string");this.routes[e]={component:r,callback:s,redirectTo:t}}navigate({path:e}){var s,t,o,n;if(!this.routes[e]){this.renderContent('<h1>404 Not Found</h1> <a href="#/home">Go to Home</a>'),console.error(`Route not found: ${e}`);return}if((s=this.routes[e])!=null&&s.callback&&this.routes[e].callback()===!1){this.navigate({path:"/login"});return}if((t=this.routes[e])!=null&&t.redirectTo){this.navigate({path:(o=this.routes[e])==null?void 0:o.redirectTo});return}const r=(n=this.routes[e])!=null&&n.component?this.routes[e].component():"";this.renderContent(r)}getCurrentRoute(){return this.currentRoute}init(){window.addEventListener("hashchange",()=>this.handleHashChange()),window.addEventListener("load",()=>this.handleHashChange())}handleHashChange(){const e=window.location.hash.slice(1)||"/";console.log(e),this.navigate({path:e})}renderContent(e){const r=document.getElementById("app");if(!r)throw new Error("App element not found");r.innerHTML=e,this.attachiLinkHandlers()}attachiLinkHandlers(){document.querySelectorAll('a[href^="#/"]').forEach(e=>{e.addEventListener("click",r=>{r.preventDefault();const s=e.getAttribute("href").slice(1);location.hash=s})})}}function A(){return window.addEventListener("DOMContentLoaded",()=>{}),`
    <h1>Home Page</h1>
    <p>Welcome to the home page!</p>
  `}class i{static handleFormSubmit(e,r){e.addEventListener("submit",s=>{s.preventDefault();const t=new FormData(s.target),o=Object.fromEntries(t.entries());if(e.querySelectorAll(".error-message").forEach(n=>{!n.textContent===""||o[n.id.replace("-error","")].length!==0||(console.log(n.textContent===""),n.textContent=`this ${n.id.replace("-error","")} is required`)}),!!this.stateOfValidation.isValid)try{r(o)}catch(n){throw new Error(`Error processing form: ${n}`)}})}static validateInput(e,r){const s=document.getElementById(`${e.name}-error`);e.addEventListener("input",()=>{const t=e.value;try{r(t),s.textContent="",this.stateOfValidation.isValid=!0}catch(o){s.textContent=o.message,this.stateOfValidation.isValid=!1}})}static clearForm(e){const r=document.getElementById(e);r?(r.reset(),r.querySelectorAll(".error-message").forEach(t=>t.textContent="")):console.error(`Form with ID ${e} not found.`)}}d(i,"stateOfValidation",{isValid:!1});class C{constructor(){this.users=[]}addUser(e){if(!e||!e.username||!e.password)throw new Error("Invalid user data");const r=this.getAllUsers();r&&(this.users=r),this.users.push(e),localStorage.setItem("users",JSON.stringify(this.users))}getUser(e){const r=this.getAllUsers();return r?r.find(s=>s.username===e):null}getAllUsers(){return JSON.parse(localStorage.getItem("users"))}clearUsers(){this.users=[]}}const u=new C;function U(){return window.addEventListener("DOMContentLoaded",()=>S()),`
    <div class="login-container">
      <h1>Login Page</h1>
      <form id="login-form">
        <div class="form-group">
          <input type="text" id="username" name="username" placeholder=" "  />
          <label for="username">Username:</label>
          <span class="error-message" id="username-error"></span>
        </div>
        <div class="form-group">
          <input type="password" id="password" name="password" placeholder=" "  />
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
  `}function S(){const a=document.getElementById("error-message"),e=document.getElementById("username"),r=document.getElementById("password"),s=document.querySelectorAll(".form-group input"),t=document.getElementById("login-form");i.validateInput(e,o=>{if(e.classList.remove("error"),!o)throw e.classList.add("error"),new Error("Username is required.");if(!/^[a-zA-Z0-9_]+$/.test(o))throw e.classList.add("error"),new Error("Username can only contain letters, numbers, and underscores.");if(o.length<3)throw e.classList.add("error"),new Error("Username must be at least 3 characters long.")}),i.validateInput(r,o=>{if(!/^(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{6,}$/.test(o))throw r.classList.add("error"),new Error("Password must be at least 6 characters long, contain at least one uppercase letter and one special character.");r.classList.remove("error")}),i.handleFormSubmit(t,o=>{try{const n=u.getUser(o.username);if(!n)throw new Error("User not found. Please register.");if(n.password!==o.password)throw new Error("Incorrect password. Please try again.");localStorage.setItem("userActivated",JSON.stringify({username:n.username})),window.location.href="/",t.reset()}catch(n){a.innerHTML=n.message,s.forEach(m=>m.classList.add("error"))}})}var c,E;class w{constructor(){d(this,"errors",[])}static createUser({username:e,password:r,email:s}){try{return g(this,c,E).call(this,{username:e,password:r,email:s})?{id:Math.random(1,1e6),username:e,password:r,email:s}:this.errors}catch(t){console.log(t),this.errors.push(t.message)}}}c=new WeakSet,E=function({username:e,password:r,email:s}){if(typeof e!="string"||e.trim()==="")throw errors.push("Username must be a non-empty string"),new Error("Username must be a non-empty string");if(typeof r!="string"||r.length<6)throw errors.push("Password must be a string with at least 6 characters"),new Error("Password must be a string with at least 6 characters");if(s&&(typeof s!="string"||!s.includes("@")))throw errors.push("Email must be a valid email address"),new Error("Email must be a valid email address");return!0},f(w,c);function I(){return window.addEventListener("DOMContentLoaded",()=>{P()}),`
    <div>
      <h1>Register Page</h1>
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
  `}function P(){const a=document.getElementById("error-message"),e=document.querySelectorAll(".form-group input"),r=document.getElementById("register-form");new p,e.forEach(s=>{i.validateInput(s,t=>{if(s.classList.remove("error"),!t)throw s.classList.add("error"),new Error(`${s.name.charAt(0).toUpperCase()+s.name.slice(1)} is required.`);if(s.name==="username"&&t.length<3)throw s.classList.add("error"),new Error("Username must be at least 3 characters long.");if(s.name==="email"&&!/\S+@\S+\.\S+/.test(t))throw s.classList.add("error"),new Error("Email must be a valid email address.");if(s.name==="password"&&!/^(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{6,}$/.test(t))throw s.classList.add("error"),new Error("Password must be at least 6 characters long, contain at least one uppercase letter and one special character.")})}),i.handleFormSubmit(r,s=>{try{const t=w.createUser({username:s.username,password:s.password,email:s.email});t.errors?(a.innerHTML=t.errors.join(", "),e.forEach(o=>o.classList.add("error"))):(a.innerHTML="",e.forEach(o=>o.classList.remove("error")),r.reset()),u.addUser(t),window.location.href="/login"}catch(t){a.innerHTML=`Error processing form: ${t.message}`,e.forEach(o=>o.classList.add("error"))}})}const l=new p;l.addRoute({path:"/",redirectTo:"/home",callback:()=>b()});l.addRoute({path:"/home",component:A,callback:()=>b()});l.addRoute({path:"/login",component:U});l.addRoute({path:"/register",component:I});function b(){let a=!1;const e=localStorage.getItem("userActivated");return e?(u.getUser(e),a=!0):a=!1,console.log(a),a}const O=location.hash.slice(1)||"/";l.navigate({path:O});
