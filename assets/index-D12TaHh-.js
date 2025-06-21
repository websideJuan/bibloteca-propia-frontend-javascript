var q=Object.defineProperty;var L=a=>{throw TypeError(a)};var O=(a,e,r)=>e in a?q(a,e,{enumerable:!0,configurable:!0,writable:!0,value:r}):a[e]=r;var p=(a,e,r)=>O(a,typeof e!="symbol"?e+"":e,r),g=(a,e,r)=>e.has(a)||L("Cannot "+r);var m=(a,e,r)=>(g(a,e,"read from private field"),r?r.call(a):e.get(a)),w=(a,e,r)=>e.has(a)?L("Cannot add the same private member more than once"):e instanceof WeakSet?e.add(a):e.set(a,r),y=(a,e,r,t)=>(g(a,e,"write to private field"),t?t.call(a,r):e.set(a,r),r),S=(a,e,r)=>(g(a,e,"access private method"),r);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))t(s);new MutationObserver(s=>{for(const o of s)if(o.type==="childList")for(const n of o.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&t(n)}).observe(document,{childList:!0,subtree:!0});function r(s){const o={};return s.integrity&&(o.integrity=s.integrity),s.referrerPolicy&&(o.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?o.credentials="include":s.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function t(s){if(s.ep)return;s.ep=!0;const o=r(s);fetch(s.href,o)}})();class I{constructor(){this.routes={},this.currentRoute=null,this.init()}addRoute({path:e,component:r,callback:t,redirectTo:s}){if(typeof e!="string"||!e.startsWith("/"))throw new Error('Path must be a string starting with "/"');if(r&&typeof r!="function")throw new Error("Component must be a function");if(t&&typeof t!="function")throw new Error("Callback must be a function");if(s&&typeof s!="string")throw new Error("RedirectTo must be a string");this.routes[e]={component:r,callback:t,redirectTo:s}}async navigate({path:e}){var s;const r=e.replace(/\/$/,"")||"/",t=this.routes[r];if(this.currentRoute=r,!t){this.renderContent('<h1>404 - Not Found</h1> <p>The page you are looking for does not exist.</p> <a href="#/home">Go to Home</a>');return}if(await(t==null?void 0:t.callback)&&await((s=t==null?void 0:t.callback)==null?void 0:s.call(t))===!1){this.navigate({path:"/login"});return}if(t!=null&&t.redirectTo){console.log(`Redirecting to: ${t.redirectTo}`),this.navigate({path:t.redirectTo});return}setTimeout(()=>{try{if(t&&typeof t.component=="function"){const o=t.component();this.renderContent(o),location.hash=r}}catch(o){console.error(o.message)}},0)}init(){window.addEventListener("load",()=>{const e=location.hash.slice(1)||"/";this.navigate({path:e})}),window.addEventListener("hashchange",()=>{const e=location.hash.slice(1);this.navigate({path:e})})}renderContent(e){var t,s;const r=document.getElementById("app");if(!r)throw new Error("App element not found");r.innerHTML=e,typeof((t=this.routes[this.currentRoute])==null?void 0:t.component.init)=="function"&&((s=this.routes[this.currentRoute].component)==null||s.init())}attachiLinkHandlers(){document.querySelectorAll('a[href^="#/"]').forEach(e=>{e.addEventListener("click",r=>{r.preventDefault();const t=e.getAttribute("href").slice(1);location.hash=t})})}}let d;(async()=>{try{const e=await fetch("./trivia.json");if(!e.ok)throw new Error("Network response was not ok");d=await e.json(),console.log(d)}catch(e){console.error("There has been a problem with your fetch operation:",e)}})();function P(){return`
    <main style="height: calc(100dvh - 50px);">
      <div class="glass-effect" style="height: 100%; scrollbar-width: none; overflow-y: auto; padding: 15px 0;">
        <h1 class="text-color-iluminated">Adventure ${d.materias.lenguaje.dificil[0].respuesta_correcta}</h1>

        <div class="text-title">
          <h2 class="title" style="color: white; text-align: center;">
            Select your subjects
          </h2>
        </div>

        <div class="subjects-container" style="display: grid; grid-template-columns: repeat(4, minmax(70vw, 1fr)); gap: 20px; overflow-y: auto;scrollbar-width: none; padding-left: 20px; ">
          
          ${Object.keys(d.materias).map(a=>`
          <div class="subject"> 
            <div class="card glass-effect">
              <img src="./src/assets/img/subjects/${d.materias[a].imagen}" alt="${a}" class="subject-image">
              <h3 class="subject-title">${d.materias[a].nombre}</h3>
            </div>
          </div>
          `).join("")}
        </div>
            
  `}P.init=function(){console.log("Home Page Initialized")};class u{static handleFormSubmit(e,r){e.addEventListener("submit",t=>{t.preventDefault();const s=new FormData(t.target),o=Object.fromEntries(s.entries());if(e.querySelectorAll(".error-message").forEach(n=>{!n.textContent===""||o[n.id.replace("-error","")].length!==0||(console.log(n.textContent===""),n.textContent=`this ${n.id.replace("-error","")} is required`)}),!!this.stateOfValidation.isValid){this.stateBtn=!0;try{this.stateBtn&&(e.querySelector("button[type='submit']").disabled=!0,e.querySelector("button[type='submit']").innerHTML='<p class="spinner"></p>'),r(o)}catch(n){throw new Error(`Error processing form: ${n}`)}finally{this.stateBtn=!1}}})}static validateInput(e,r){const t=document.getElementById(`${e.name}-error`);e.addEventListener("input",()=>{const s=e.value;try{r(s),t.textContent="",this.stateOfValidation.isValid=!0}catch(o){t.textContent=o.message,this.stateOfValidation.isValid=!1}})}static clearForm(e){const r=document.getElementById(e);r?(r.reset(),r.querySelectorAll(".error-message").forEach(s=>s.textContent="")):console.error(`Form with ID ${e} not found.`)}}p(u,"stateOfValidation",{isValid:!1,stateBtn:!1});class T{static popup(e,r="info",t=6e3){const s=document.createElement("div");s.className=`notification notification-${r}`,s.textContent=e,document.body.appendChild(s),setTimeout(()=>{s.remove()},t)}}class B{constructor(){this.users=[]}addUser(e){if(!e||!e.username||e.password,!e.email)throw new Error("Invalid user data");try{const r=this.getAllUsers();r&&(this.users=r),this.users.push(e),localStorage.setItem("users",JSON.stringify(this.users))}catch(r){this.errors=[],this.errors.push(r.message),console.error("Error adding user:",r)}}getUser(e){const r=this.getAllUsers();return r?r.find(t=>t.username===e):null}getAllUsers(){return JSON.parse(localStorage.getItem("users"))}clearUsers(){this.users=[]}}const E=new B;function U(){return`
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
  `}U.init=function(){const e=document.getElementById("error-message"),r=document.getElementById("username"),t=document.getElementById("password"),s=document.querySelectorAll(".form-group input"),o=document.getElementById("login-form");u.validateInput(r,n=>{if(r.classList.remove("error"),!n)throw r.classList.add("error"),new Error("Username is required.");if(!/^[a-zA-Z0-9_]+$/.test(n))throw r.classList.add("error"),new Error("Username can only contain letters, numbers, and underscores.");if(n.length<3)throw r.classList.add("error"),new Error("Username must be at least 3 characters long.")}),u.validateInput(t,n=>{if(!/^(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{6,}$/.test(n))throw t.classList.add("error"),new Error("Password must be at least 6 characters long, contain at least one uppercase letter and one special character.");t.classList.remove("error")}),u.handleFormSubmit(o,n=>{try{const l=E.getUser(n.username);if(!l)throw new Error("User not found. Please register.");if(l.password!==n.password)throw new Error("Incorrect password. Please try again.");localStorage.setItem("userActivated",JSON.stringify({username:l.username})),T.popup("Login successful!","success",1e3),setTimeout(()=>{location.hash="/home",o.reset()},6e3)}catch(l){e.innerHTML=l.message,s.forEach($=>$.classList.add("error"))}})};var f,x;class v{static createUser({username:e,password:r,email:t}){try{return S(this,f,x).call(this,{username:e,password:r,email:t})?{id:window.crypto.randomUUID(),lives:3,score:0,username:e,password:r,email:t}:this.errors}catch(s){console.log(s),this.errors.push(s.message)}}}f=new WeakSet,x=function({username:e,password:r,email:t}){return typeof e!="string"||e.trim()===""?(this.errors.push("Username must be a non-empty string"),!1):typeof r!="string"||r.length<6?(this.errors.push("Password must be a string with at least 6 characters"),!1):t&&(typeof t!="string"||!t.includes("@"))?(this.errors.push("Email must be a valid email address"),!1):!0},w(v,f),p(v,"errors",[]);function A(){return`
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
      

  `}A.init=function(){const e=document.getElementById("error-message"),r=document.querySelectorAll(".form-group input"),t=document.getElementById("register-form");new I,r.forEach(s=>{u.validateInput(s,o=>{if(s.classList.remove("error"),!o)throw s.classList.add("error"),new Error(`${s.name.charAt(0).toUpperCase()+s.name.slice(1)} is required.`);if(s.name==="username"&&o.length<3)throw s.classList.add("error"),new Error("Username must be at least 3 characters long.");if(s.name==="email"&&!/\S+@\S+\.\S+/.test(o))throw s.classList.add("error"),new Error("Email must be a valid email address.");if(s.name==="password"&&!/^(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{6,}$/.test(o))throw s.classList.add("error"),new Error("Password must be at least 6 characters long, contain at least one uppercase letter and one special character.")})}),u.handleFormSubmit(t,s=>{try{const o=v.createUser({username:s.username,password:s.password,email:s.email});o.errors?(e.innerHTML=o.errors.join(", "),r.forEach(n=>n.classList.add("error"))):(e.innerHTML="",r.forEach(n=>n.classList.remove("error")),t.reset()),E.addUser(o),location.hash="/login"}catch(o){e.innerHTML=`Error processing form: ${o.message}`,r.forEach(n=>n.classList.add("error"))}})};var c;const i=class i{constructor(e=E){if(m(i,c))return m(i,c);this.db=e,y(i,c,this)}static getInstance(){return m(i,c)||y(i,c,new i),m(i,c)}async isAuthenticated(){const e=JSON.parse(localStorage.getItem("userActivated"))||null,r=this.db.getUser(e==null?void 0:e.username);r&&(await window.cookieStore.set("user",JSON.stringify(r||{})),localStorage.removeItem("userActivated"));const t=await window.cookieStore.get("user");return!(!t||!t.value)}};c=new WeakMap,w(i,c,null);let b=i;const R=b.getInstance();function C(){return R.isAuthenticated()}const h=new I;h.addRoute({path:"/",redirectTo:"/home",callback:async()=>await C()});h.addRoute({path:"/home",component:P,callback:async()=>await C()});h.addRoute({path:"/login",component:U});h.addRoute({path:"/register",component:A});const M=location.hash.slice(1)||"/";h.navigate({path:M});
