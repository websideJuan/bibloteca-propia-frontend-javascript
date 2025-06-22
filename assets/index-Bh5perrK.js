var q=Object.defineProperty;var x=o=>{throw TypeError(o)};var j=(o,e,t)=>e in o?q(o,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):o[e]=t;var f=(o,e,t)=>j(o,typeof e!="symbol"?e+"":e,t),g=(o,e,t)=>e.has(o)||x("Cannot "+t);var m=(o,e,t)=>(g(o,e,"read from private field"),t?t.call(o):e.get(o)),y=(o,e,t)=>e.has(o)?x("Cannot add the same private member more than once"):e instanceof WeakSet?e.add(o):e.set(o,t),w=(o,e,t,r)=>(g(o,e,"write to private field"),r?r.call(o,t):e.set(o,t),t),L=(o,e,t)=>(g(o,e,"access private method"),t);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))r(s);new MutationObserver(s=>{for(const a of s)if(a.type==="childList")for(const n of a.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&r(n)}).observe(document,{childList:!0,subtree:!0});function t(s){const a={};return s.integrity&&(a.integrity=s.integrity),s.referrerPolicy&&(a.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?a.credentials="include":s.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function r(s){if(s.ep)return;s.ep=!0;const a=t(s);fetch(s.href,a)}})();class S{constructor(){this.routes={},this.currentRoute=null,this.init()}addRoute({path:e,component:t,callback:r,redirectTo:s}){if(typeof e!="string"||!e.startsWith("/"))throw new Error('Path must be a string starting with "/"');if(t&&typeof t!="function")throw new Error("Component must be a function");if(r&&typeof r!="function")throw new Error("Callback must be a function");if(s&&typeof s!="string")throw new Error("RedirectTo must be a string");this.routes[e]={component:t,callback:r,redirectTo:s}}async navigate({path:e}){var s;const t=e.replace(/\/$/,"")||"/",r=this.routes[t];if(this.currentRoute=t,!r){this.renderContent('<h1>404 - Not Found</h1> <p>The page you are looking for does not exist.</p> <a href="#/home">Go to Home</a>');return}if(await(r==null?void 0:r.callback)&&await((s=r==null?void 0:r.callback)==null?void 0:s.call(r))===!1){this.navigate({path:"/login"});return}if(r!=null&&r.redirectTo){console.log(`Redirecting to: ${r.redirectTo}`),this.navigate({path:r.redirectTo});return}setTimeout(()=>{try{if(r&&typeof r.component=="function"){const a=r.component();this.renderContent(a),location.hash=t}}catch(a){console.error(a.message)}},0)}init(){window.addEventListener("load",()=>{const e=location.hash.slice(1)||"/";this.navigate({path:e})}),window.addEventListener("hashchange",()=>{const e=location.hash.slice(1);this.navigate({path:e})})}renderContent(e){var r,s;const t=document.getElementById("app");if(!t)throw new Error("App element not found");t.innerHTML=e,typeof((r=this.routes[this.currentRoute])==null?void 0:r.component.init)=="function"&&((s=this.routes[this.currentRoute].component)==null||s.init())}attachiLinkHandlers(){document.querySelectorAll('a[href^="#/"]').forEach(e=>{e.addEventListener("click",t=>{t.preventDefault();const r=e.getAttribute("href").slice(1);location.hash=r})})}}let d;(async()=>{try{const e=await fetch("./trivia.json");if(!e.ok)throw new Error("Network response was not ok");d=await e.json()}catch(e){console.error("There has been a problem with your fetch operation:",e)}})();function I(){return`
    <main>
      <div class="glass-effect" style="height: 100%; scrollbar-width: none; overflow-y: auto; padding: 25px 0;">
        <h1 class="text-color-iluminated" id="titleIlumination">Adventure </h1>

        <div class="text-title">
          <h4 class="title" style="color: white; text-align: center;">
            Select your subjects
          </h4>
        </div>

        <div class="subjects-container" style="display: grid; grid-template-columns: repeat(4, minmax(93vw, 1fr));  overflow-y: auto;scrollbar-width: none; scroll-snap-type: x mandatory; scroll-behavior: smooth;">
          
          ${Object.keys(d.materias).map((o,e)=>`
          <div class="subject" data-color="${d.materias[o].bg}" style="transform:${e!==0?"scale(.8)":"scale(1)"}; opacity: .5; scroll-snap-align: center; transition: transform 0.3s ease; display: flex; justify-content: center; align-items: center;"> 
            <div class="card glass-effect"  style="position:relative; width:60vw; height: 70px;">
              <img src="${d.materias[o].imagen}" alt="${o}" class="subject-image" style="color: red; position: absolute; inset: 0px; width: 100%; height: 100%; margin: auto; border-radius: 5px; object-fit: cover; z-index: -1;">
              <div class="overlay overlay-${d.materias[o].bg}" >

                <h3 class="subject-title" style="color: white; font-size: 1.8rem;">${d.materias[o].nombre}</h3>
               
              </div>
            </div>
          </div>
          `).join("")}
        </div>

        <div class="difficulty-container" style="padding: 0 2rem; display: flex; justify-content: center; align-items: center; flex-direction: column; margin-top: 20px;"
        >
          <p class="difficulty-text" style="color: rgb(244, 255, 92); font-size: 1.2rem; text-align: center;">
            Select the difficulty
          </p>
          <div class="form-group">
            <select class="difficulty-select">
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>

        </div>

        <div class="buttons-container" style="padding: 0 2rem; display: flex; justify-content: center; margin-top: 20px;">
          <button style="width: 100%; padding: 10px 20px; font-size: .9rem; background: 
            linear-gradient(to right,rgb(255, 86, 44),rgb(244, 255, 92))
          ; border: none; border-radius: 5px;">
          🚀  
          Listo para jugar?
          </button>
        </div>

        <div class="footer" style="text-align: center; margin-top: 20px; color: white; padding: 0 30px  ;">
          <p style="font-size: 0.8rem;">© 2023 Aprende Jugando. All rights reserved.</p>
        </div>
       
      </div>
    </main>
            
  `}I.init=function(){const e=document.querySelector(".subjects-container"),t=document.getElementById("titleIlumination"),r={difficulty:"easy",subject:""},s=new IntersectionObserver(a=>{a.forEach(n=>{n.target.getAttribute("data-color");const i=n.target.querySelector(".subject-title");console.log(i),n.isIntersecting?(n.target.style.opacity="1",n.target.style.transform="scale(1)",n.target.style.transition="transform 0.3s ease, opacity 0.3s ease, background-color 0.3s ease",t.textContent=t.textContent.split(" ")[0]+" "+i.textContent,r.subject=i.textContent.toLowerCase(),console.log(r)):(n.target.style.opacity="0.5",n.target.style.transform="scale(.6)",n.target.style.transition="transform 0.3s ease, opacity 0.3s ease, background-color 0.3s ease")})},{threshold:.5});e.querySelectorAll(".subject").forEach(a=>{s.observe(a)}),console.log("Home Page Initialized")};class u{static handleFormSubmit(e,t){e.addEventListener("submit",r=>{r.preventDefault();const s=new FormData(r.target),a=Object.fromEntries(s.entries());if(e.querySelectorAll(".error-message").forEach(n=>{!n.textContent===""||a[n.id.replace("-error","")].length!==0||(console.log(n.textContent===""),n.textContent=`this ${n.id.replace("-error","")} is required`)}),!!this.stateOfValidation.isValid){this.stateBtn=!0;try{this.stateBtn&&(e.querySelector("button[type='submit']").disabled=!0,e.querySelector("button[type='submit']").innerHTML='<p class="spinner"></p>'),t(a)}catch(n){throw new Error(`Error processing form: ${n}`)}finally{this.stateBtn=!1}}})}static validateInput(e,t){const r=document.getElementById(`${e.name}-error`);e.addEventListener("input",()=>{const s=e.value;try{t(s),r.textContent="",this.stateOfValidation.isValid=!0}catch(a){r.textContent=a.message,this.stateOfValidation.isValid=!1}})}static clearForm(e){const t=document.getElementById(e);t?(t.reset(),t.querySelectorAll(".error-message").forEach(s=>s.textContent="")):console.error(`Form with ID ${e} not found.`)}}f(u,"stateOfValidation",{isValid:!1,stateBtn:!1});class O{static popup(e,t="info",r=6e3){const s=document.createElement("div");s.className=`notification notification-${t}`,s.textContent=e,document.body.appendChild(s),setTimeout(()=>{s.remove()},r)}}class T{constructor(){this.users=[]}addUser(e){if(!e||!e.username||e.password,!e.email)throw new Error("Invalid user data");try{const t=this.getAllUsers();t&&(this.users=t),this.users.push(e),localStorage.setItem("users",JSON.stringify(this.users))}catch(t){this.errors=[],this.errors.push(t.message),console.error("Error adding user:",t)}}getUser(e){const t=this.getAllUsers();return t?t.find(r=>r.username===e):null}getAllUsers(){return JSON.parse(localStorage.getItem("users"))}clearUsers(){this.users=[]}}const E=new T;function A(){return`
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
  `}A.init=function(){const e=document.getElementById("error-message"),t=document.getElementById("username"),r=document.getElementById("password"),s=document.querySelectorAll(".form-group input"),a=document.getElementById("login-form");u.validateInput(t,n=>{if(t.classList.remove("error"),!n)throw t.classList.add("error"),new Error("Username is required.");if(!/^[a-zA-Z0-9_]+$/.test(n))throw t.classList.add("error"),new Error("Username can only contain letters, numbers, and underscores.");if(n.length<3)throw t.classList.add("error"),new Error("Username must be at least 3 characters long.")}),u.validateInput(r,n=>{if(!/^(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{6,}$/.test(n))throw r.classList.add("error"),new Error("Password must be at least 6 characters long, contain at least one uppercase letter and one special character.");r.classList.remove("error")}),u.handleFormSubmit(a,n=>{try{const i=E.getUser(n.username);if(!i)throw new Error("User not found. Please register.");if(i.password!==n.password)throw new Error("Incorrect password. Please try again.");localStorage.setItem("userActivated",JSON.stringify({username:i.username})),O.popup("Login successful!","success",1e3),setTimeout(()=>{location.hash="/home",a.reset()},6e3)}catch(i){e.innerHTML=i.message,s.forEach($=>$.classList.add("error"))}})};var p,C;class v{static createUser({username:e,password:t,email:r}){try{return L(this,p,C).call(this,{username:e,password:t,email:r})?{id:window.crypto.randomUUID(),lives:3,score:0,username:e,password:t,email:r}:this.errors}catch(s){console.log(s),this.errors.push(s.message)}}}p=new WeakSet,C=function({username:e,password:t,email:r}){return typeof e!="string"||e.trim()===""?(this.errors.push("Username must be a non-empty string"),!1):typeof t!="string"||t.length<6?(this.errors.push("Password must be a string with at least 6 characters"),!1):r&&(typeof r!="string"||!r.includes("@"))?(this.errors.push("Email must be a valid email address"),!1):!0},y(v,p),f(v,"errors",[]);function P(){return`
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
      

  `}P.init=function(){const e=document.getElementById("error-message"),t=document.querySelectorAll(".form-group input"),r=document.getElementById("register-form");new S,t.forEach(s=>{u.validateInput(s,a=>{if(s.classList.remove("error"),!a)throw s.classList.add("error"),new Error(`${s.name.charAt(0).toUpperCase()+s.name.slice(1)} is required.`);if(s.name==="username"&&a.length<3)throw s.classList.add("error"),new Error("Username must be at least 3 characters long.");if(s.name==="email"&&!/\S+@\S+\.\S+/.test(a))throw s.classList.add("error"),new Error("Email must be a valid email address.");if(s.name==="password"&&!/^(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{6,}$/.test(a))throw s.classList.add("error"),new Error("Password must be at least 6 characters long, contain at least one uppercase letter and one special character.")})}),u.handleFormSubmit(r,s=>{try{const a=v.createUser({username:s.username,password:s.password,email:s.email});a.errors?(e.innerHTML=a.errors.join(", "),t.forEach(n=>n.classList.add("error"))):(e.innerHTML="",t.forEach(n=>n.classList.remove("error")),r.reset()),E.addUser(a),location.hash="/login"}catch(a){e.innerHTML=`Error processing form: ${a.message}`,t.forEach(n=>n.classList.add("error"))}})};var l;const c=class c{constructor(e=E){if(m(c,l))return m(c,l);this.db=e,w(c,l,this)}static getInstance(){return m(c,l)||w(c,l,new c),m(c,l)}async isAuthenticated(){const e=JSON.parse(localStorage.getItem("userActivated"))||null,t=this.db.getUser(e==null?void 0:e.username);t&&(await window.cookieStore.set("user",JSON.stringify(t||{})),localStorage.removeItem("userActivated"));const r=await window.cookieStore.get("user");return!(!r||!r.value)}};l=new WeakMap,y(c,l,null);let b=c;const B=b.getInstance();function U(){return B.isAuthenticated()}const h=new S;h.addRoute({path:"/",redirectTo:"/home",callback:async()=>await U()});h.addRoute({path:"/home",component:I,callback:async()=>await U()});h.addRoute({path:"/login",component:A});h.addRoute({path:"/register",component:P});const R=location.hash.slice(1)||"/";h.navigate({path:R});
