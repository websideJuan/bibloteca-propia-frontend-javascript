var b=Object.defineProperty;var m=a=>{throw TypeError(a)};var v=(a,e,r)=>e in a?b(a,e,{enumerable:!0,configurable:!0,writable:!0,value:r}):a[e]=r;var d=(a,e,r)=>v(a,typeof e!="symbol"?e+"":e,r),L=(a,e,r)=>e.has(a)||m("Cannot "+r);var h=(a,e,r)=>e.has(a)?m("Cannot add the same private member more than once"):e instanceof WeakSet?e.add(a):e.set(a,r);var g=(a,e,r)=>(L(a,e,"access private method"),r);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))t(s);new MutationObserver(s=>{for(const o of s)if(o.type==="childList")for(const n of o.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&t(n)}).observe(document,{childList:!0,subtree:!0});function r(s){const o={};return s.integrity&&(o.integrity=s.integrity),s.referrerPolicy&&(o.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?o.credentials="include":s.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function t(s){if(s.ep)return;s.ep=!0;const o=r(s);fetch(s.href,o)}})();class f{constructor(){this.routes={},this.currentRoute=null,this.init()}addRoute({path:e,component:r,callback:t,redirectTo:s}){if(typeof e!="string"||!e.startsWith("/"))throw new Error('Path must be a string starting with "/"');if(r&&typeof r!="function")throw new Error("Component must be a string");if(t&&typeof t!="function")throw new Error("Callback must be a function");if(s&&typeof s!="string")throw new Error("RedirectTo must be a string");this.routes[e]={component:r,callback:t,redirectTo:s}}navigate({path:e}){var r,t,s;if((r=this.routes[e])!=null&&r.callback&&this.routes[e].callback()===!1){setInterval(()=>{this.navigate({path:"/login"}),window.location.href="/login"},2e3);return}if((t=this.routes[e])!=null&&t.redirectTo){this.navigate({path:(s=this.routes[e])==null?void 0:s.redirectTo});return}this.routes[e]?(this.currentRoute=e,document.getElementById("app").innerHTML=this.routes[e].component()):(document.getElementById("app").innerHTML='<h1>404 Not Found</h1> <a href="./home">Go to Home</a>',console.error(`Route not found: ${e}`))}getCurrentRoute(){return this.currentRoute}init(){window.addEventListener("hashchange",()=>this.handleHashChange()),window.addEventListener("load",()=>this.handleHashChange()),document.querySelectorAll("a").forEach(e=>{e.addEventListener("click",r=>{r.preventDefault();const t=e.getAttribute("href");history.pushState({},"",t),this.navigate({path:t})})})}handleHashChange(){const e=window.location.hash.slice(1)||"/";this.navigate({path:e})}}function I(){return window.addEventListener("DOMContentLoaded",()=>{}),`
    <h1>Home Page</h1>
    <p>Welcome to the home page!</p>
  `}class i{static handleFormSubmit(e,r){e.addEventListener("submit",t=>{t.preventDefault();const s=new FormData(t.target),o=Object.fromEntries(s.entries());if(e.querySelectorAll(".error-message").forEach(n=>{!n.textContent===""||o[n.id.replace("-error","")].length!==0||(console.log(n.textContent===""),n.textContent=`this ${n.id.replace("-error","")} is required`)}),!!this.stateOfValidation.isValid)try{r(o)}catch(n){throw new Error(`Error processing form: ${n}`)}})}static validateInput(e,r){const t=document.getElementById(`${e.name}-error`);e.addEventListener("input",()=>{const s=e.value;try{r(s),t.textContent="",this.stateOfValidation.isValid=!0}catch(o){t.textContent=o.message,this.stateOfValidation.isValid=!1}})}static clearForm(e){const r=document.getElementById(e);r?(r.reset(),r.querySelectorAll(".error-message").forEach(s=>s.textContent="")):console.error(`Form with ID ${e} not found.`)}}d(i,"stateOfValidation",{isValid:!1});class S{constructor(){this.users=[]}addUser(e){if(!e||!e.username||!e.password)throw new Error("Invalid user data");const r=this.getAllUsers();r&&(this.users=r),this.users.push(e),localStorage.setItem("users",JSON.stringify(this.users))}getUser(e){const r=this.getAllUsers();return r?r.find(t=>t.username===e):null}getAllUsers(){return JSON.parse(localStorage.getItem("users"))}clearUsers(){this.users=[]}}const u=new S;function U(){return window.addEventListener("DOMContentLoaded",()=>A()),`
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
        Don't have an account? <a href="/register">Register here</a>
      </p>
    </div>
  `}function A(){const a=document.getElementById("error-message"),e=document.getElementById("username"),r=document.getElementById("password"),t=document.querySelectorAll(".form-group input"),s=document.getElementById("login-form");i.validateInput(e,o=>{if(e.classList.remove("error"),!o)throw e.classList.add("error"),new Error("Username is required.");if(!/^[a-zA-Z0-9_]+$/.test(o))throw e.classList.add("error"),new Error("Username can only contain letters, numbers, and underscores.");if(o.length<3)throw e.classList.add("error"),new Error("Username must be at least 3 characters long.")}),i.validateInput(r,o=>{if(!/^(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{6,}$/.test(o))throw r.classList.add("error"),new Error("Password must be at least 6 characters long, contain at least one uppercase letter and one special character.");r.classList.remove("error")}),i.handleFormSubmit(s,o=>{try{const n=u.getUser(o.username);if(!n)throw new Error("User not found. Please register.");if(n.password!==o.password)throw new Error("Incorrect password. Please try again.");localStorage.setItem("userActivated",JSON.stringify({username:n.username})),window.location.href="/",s.reset()}catch(n){a.innerHTML=n.message,t.forEach(y=>y.classList.add("error"))}})}var c,w;class p{constructor(){d(this,"errors",[])}static createUser({username:e,password:r,email:t}){try{return g(this,c,w).call(this,{username:e,password:r,email:t})?{id:Math.random(1,1e6),username:e,password:r,email:t}:this.errors}catch(s){console.log(s),this.errors.push(s.message)}}}c=new WeakSet,w=function({username:e,password:r,email:t}){if(typeof e!="string"||e.trim()==="")throw errors.push("Username must be a non-empty string"),new Error("Username must be a non-empty string");if(typeof r!="string"||r.length<6)throw errors.push("Password must be a string with at least 6 characters"),new Error("Password must be a string with at least 6 characters");if(t&&(typeof t!="string"||!t.includes("@")))throw errors.push("Email must be a valid email address"),new Error("Email must be a valid email address");return!0},h(p,c);function C(){return window.addEventListener("DOMContentLoaded",()=>{P()}),`
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
        Already have an account? <a href="/login">Login here</a>
      </p>
    </div>
  `}function P(){const a=document.getElementById("error-message"),e=document.querySelectorAll(".form-group input"),r=document.getElementById("register-form");new f,e.forEach(t=>{i.validateInput(t,s=>{if(t.classList.remove("error"),!s)throw t.classList.add("error"),new Error(`${t.name.charAt(0).toUpperCase()+t.name.slice(1)} is required.`);if(t.name==="username"&&s.length<3)throw t.classList.add("error"),new Error("Username must be at least 3 characters long.");if(t.name==="email"&&!/\S+@\S+\.\S+/.test(s))throw t.classList.add("error"),new Error("Email must be a valid email address.");if(t.name==="password"&&!/^(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{6,}$/.test(s))throw t.classList.add("error"),new Error("Password must be at least 6 characters long, contain at least one uppercase letter and one special character.")})}),i.handleFormSubmit(r,t=>{try{const s=p.createUser({username:t.username,password:t.password,email:t.email});s.errors?(a.innerHTML=s.errors.join(", "),e.forEach(o=>o.classList.add("error"))):(a.innerHTML="",e.forEach(o=>o.classList.remove("error")),r.reset()),u.addUser(s),window.location.href="/login"}catch(s){a.innerHTML=`Error processing form: ${s.message}`,e.forEach(o=>o.classList.add("error"))}})}const l=new f;l.addRoute({path:"/",component:"",redirectTo:"/home",callback:()=>E()});l.addRoute({path:"/home",component:I,callback:()=>E()});l.addRoute({path:"/login",component:U});l.addRoute({path:"/register",component:C});function E(){let a=!1;const e=localStorage.getItem("userActivated");return e?(u.getUser(e),a=!0):a=!1,console.log(a),a}const O=location.hash.slice(1)||"/";l.navigate(O);
