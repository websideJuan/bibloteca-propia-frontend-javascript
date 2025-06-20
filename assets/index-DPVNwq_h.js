var A=Object.defineProperty;var h=n=>{throw TypeError(n)};var S=(n,e,r)=>e in n?A(n,e,{enumerable:!0,configurable:!0,writable:!0,value:r}):n[e]=r;var u=(n,e,r)=>S(n,typeof e!="symbol"?e+"":e,r),U=(n,e,r)=>e.has(n)||h("Cannot "+r);var f=(n,e,r)=>e.has(n)?h("Cannot add the same private member more than once"):e instanceof WeakSet?e.add(n):e.set(n,r);var g=(n,e,r)=>(U(n,e,"access private method"),r);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))s(t);new MutationObserver(t=>{for(const o of t)if(o.type==="childList")for(const a of o.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&s(a)}).observe(document,{childList:!0,subtree:!0});function r(t){const o={};return t.integrity&&(o.integrity=t.integrity),t.referrerPolicy&&(o.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?o.credentials="include":t.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function s(t){if(t.ep)return;t.ep=!0;const o=r(t);fetch(t.href,o)}})();class p{constructor(){this.routes={},this.currentRoute=null,this.init()}addRoute({path:e,component:r,callback:s,redirectTo:t}){if(typeof e!="string"||!e.startsWith("/"))throw new Error('Path must be a string starting with "/"');if(r&&typeof r!="function")throw new Error("Component must be a string");if(s&&typeof s!="function")throw new Error("Callback must be a function");if(t&&typeof t!="string")throw new Error("RedirectTo must be a string");this.routes[e]={component:r,callback:s,redirectTo:t}}navigate({path:e}){var r,s,t,o;if(!this.routes[e]){this.renderContent('<h1>404 Not Found</h1> <a href="#/home">Go to Home</a>'),console.error(`Route not found: ${e}`);return}if((r=this.routes[e])!=null&&r.callback&&this.routes[e].callback()===!1){this.navigate({path:"/login"});return}if((s=this.routes[e])!=null&&s.redirectTo){this.navigate({path:(t=this.routes[e])==null?void 0:t.redirectTo});return}if(this.routes[e]){const a=(o=this.routes[e])!=null&&o.component?this.routes[e].component():"";this.renderContent(a),typeof this.routes[e].component.init=="function"&&this.routes[e].component.init()}}getCurrentRoute(){return this.currentRoute}init(){window.addEventListener("hashchange",()=>this.handleHashChange()),window.addEventListener("load",()=>this.handleHashChange())}handleHashChange(){const e=window.location.hash.slice(1)||"/";console.log(e),this.navigate({path:e})}renderContent(e){const r=document.getElementById("app");if(!r)throw new Error("App element not found");r.innerHTML=e,this.attachiLinkHandlers()}attachiLinkHandlers(){document.querySelectorAll('a[href^="#/"]').forEach(e=>{e.addEventListener("click",r=>{r.preventDefault();const s=e.getAttribute("href").slice(1);location.hash=s})})}}function C(){return window.addEventListener("DOMContentLoaded",()=>{}),`
    <h1>Home Page</h1>
    <p>Welcome to the home page!</p>
  `}class l{static handleFormSubmit(e,r){e.addEventListener("submit",s=>{s.preventDefault();const t=new FormData(s.target),o=Object.fromEntries(t.entries());if(e.querySelectorAll(".error-message").forEach(a=>{!a.textContent===""||o[a.id.replace("-error","")].length!==0||(console.log(a.textContent===""),a.textContent=`this ${a.id.replace("-error","")} is required`)}),!!this.stateOfValidation.isValid)try{r(o)}catch(a){throw new Error(`Error processing form: ${a}`)}})}static validateInput(e,r){const s=document.getElementById(`${e.name}-error`);e.addEventListener("input",()=>{const t=e.value;try{r(t),s.textContent="",this.stateOfValidation.isValid=!0}catch(o){s.textContent=o.message,this.stateOfValidation.isValid=!1}})}static clearForm(e){const r=document.getElementById(e);r?(r.reset(),r.querySelectorAll(".error-message").forEach(t=>t.textContent="")):console.error(`Form with ID ${e} not found.`)}}u(l,"stateOfValidation",{isValid:!1});class I{constructor(){this.users=[]}addUser(e){if(!e||!e.username||!e.password)throw new Error("Invalid user data");const r=this.getAllUsers();r&&(this.users=r),this.users.push(e),localStorage.setItem("users",JSON.stringify(this.users))}getUser(e){const r=this.getAllUsers();return r?r.find(s=>s.username===e):null}getAllUsers(){return JSON.parse(localStorage.getItem("users"))}clearUsers(){this.users=[]}}const m=new I;function w(){return`
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
  `}w.init=function(){const e=document.getElementById("error-message"),r=document.getElementById("username"),s=document.getElementById("password"),t=document.querySelectorAll(".form-group input"),o=document.getElementById("login-form");l.validateInput(r,a=>{if(r.classList.remove("error"),!a)throw r.classList.add("error"),new Error("Username is required.");if(!/^[a-zA-Z0-9_]+$/.test(a))throw r.classList.add("error"),new Error("Username can only contain letters, numbers, and underscores.");if(a.length<3)throw r.classList.add("error"),new Error("Username must be at least 3 characters long.")}),l.validateInput(s,a=>{if(!/^(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{6,}$/.test(a))throw s.classList.add("error"),new Error("Password must be at least 6 characters long, contain at least one uppercase letter and one special character.");s.classList.remove("error")}),l.handleFormSubmit(o,a=>{try{const i=m.getUser(a.username);if(!i)throw new Error("User not found. Please register.");if(i.password!==a.password)throw new Error("Incorrect password. Please try again.");localStorage.setItem("userActivated",JSON.stringify({username:i.username})),window.location.hash="#/home",o.reset()}catch(i){e.innerHTML=i.message,t.forEach(L=>L.classList.add("error"))}})};var d,b;class E{constructor(){u(this,"errors",[])}static createUser({username:e,password:r,email:s}){try{return g(this,d,b).call(this,{username:e,password:r,email:s})?{id:Math.random(1,1e6),username:e,password:r,email:s}:this.errors}catch(t){console.log(t),this.errors.push(t.message)}}}d=new WeakSet,b=function({username:e,password:r,email:s}){if(typeof e!="string"||e.trim()==="")throw errors.push("Username must be a non-empty string"),new Error("Username must be a non-empty string");if(typeof r!="string"||r.length<6)throw errors.push("Password must be a string with at least 6 characters"),new Error("Password must be a string with at least 6 characters");if(s&&(typeof s!="string"||!s.includes("@")))throw errors.push("Email must be a valid email address"),new Error("Email must be a valid email address");return!0},f(E,d);function y(){return window.addEventListener("DOMContentLoaded",()=>{handelSubmit()}),`
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
  `}y.init=function(){const e=document.getElementById("error-message"),r=document.querySelectorAll(".form-group input"),s=document.getElementById("register-form");new p,r.forEach(t=>{l.validateInput(t,o=>{if(t.classList.remove("error"),!o)throw t.classList.add("error"),new Error(`${t.name.charAt(0).toUpperCase()+t.name.slice(1)} is required.`);if(t.name==="username"&&o.length<3)throw t.classList.add("error"),new Error("Username must be at least 3 characters long.");if(t.name==="email"&&!/\S+@\S+\.\S+/.test(o))throw t.classList.add("error"),new Error("Email must be a valid email address.");if(t.name==="password"&&!/^(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{6,}$/.test(o))throw t.classList.add("error"),new Error("Password must be at least 6 characters long, contain at least one uppercase letter and one special character.")})}),l.handleFormSubmit(s,t=>{try{const o=E.createUser({username:t.username,password:t.password,email:t.email});o.errors?(e.innerHTML=o.errors.join(", "),r.forEach(a=>a.classList.add("error"))):(e.innerHTML="",r.forEach(a=>a.classList.remove("error")),s.reset()),m.addUser(o),window.location.hash="#/login"}catch(o){e.innerHTML=`Error processing form: ${o.message}`,r.forEach(a=>a.classList.add("error"))}})};const c=new p;c.addRoute({path:"/",redirectTo:"/home",callback:()=>v()});c.addRoute({path:"/home",component:C,callback:()=>v()});c.addRoute({path:"/login",component:w});c.addRoute({path:"/register",component:y});function v(){let n=!1;const e=localStorage.getItem("userActivated");return e?(m.getUser(e),n=!0):n=!1,console.log(n),n}const P=location.hash.slice(1)||"/";c.navigate({path:P});
