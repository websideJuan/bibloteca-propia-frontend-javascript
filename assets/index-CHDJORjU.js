var H=Object.defineProperty;var B=a=>{throw TypeError(a)};var J=(a,e,t)=>e in a?H(a,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):a[e]=t;var E=(a,e,t)=>J(a,typeof e!="symbol"?e+"":e,t),S=(a,e,t)=>e.has(a)||B("Cannot "+t);var v=(a,e,t)=>(S(a,e,"read from private field"),t?t.call(a):e.get(a)),I=(a,e,t)=>e.has(a)?B("Cannot add the same private member more than once"):e instanceof WeakSet?e.add(a):e.set(a,t),L=(a,e,t,r)=>(S(a,e,"write to private field"),r?r.call(a,t):e.set(a,t),t),P=(a,e,t)=>(S(a,e,"access private method"),t);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))r(s);new MutationObserver(s=>{for(const o of s)if(o.type==="childList")for(const n of o.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&r(n)}).observe(document,{childList:!0,subtree:!0});function t(s){const o={};return s.integrity&&(o.integrity=s.integrity),s.referrerPolicy&&(o.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?o.credentials="include":s.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function r(s){if(s.ep)return;s.ep=!0;const o=t(s);fetch(s.href,o)}})();class O{constructor(){this.routes={},this.currentRoute=null,this.init()}addRoute({path:e,component:t,callback:r,redirectTo:s}){if(typeof e!="string"||!e.startsWith("/"))throw new Error('Path must be a string starting with "/"');if(t&&typeof t!="function")throw new Error("Component must be a function");if(r&&typeof r!="function")throw new Error("Callback must be a function");if(s&&typeof s!="string")throw new Error("RedirectTo must be a string");this.routes[e]={component:t,callback:r,redirectTo:s}}async navigate({path:e}){var s;console.log("initial navegate",e);const t=e.replace(/\/$/,"")||"/",r=this.routes[t];if(this.currentRoute=t,!r){this.renderContent('<h1>404 - Not Found</h1> <p>The page you are looking for does not exist.</p> <a href="#/home">Go to Home</a>');return}if(await(r==null?void 0:r.callback)&&await((s=r==null?void 0:r.callback)==null?void 0:s.call(r))===!1){this.navigate({path:"/login"});return}if(r!=null&&r.redirectTo){this.navigate({path:r.redirectTo});return}setTimeout(()=>{try{if(r&&typeof r.component=="function"){console.log(`Renderizando: ${t}`);const o=r.component();this.renderContent(o),location.hash=t,console.log("component renderizado: ",t)}}catch(o){console.error(o.message)}},0)}init(){window.addEventListener("load",()=>{const e=location.hash.slice(1)||"/";this.navigate({path:e})}),window.addEventListener("hashchange",()=>{const e=location.hash.slice(1)||"/";console.log(`Navigating to: ${e}`),this.navigate({path:e})})}renderContent(e){var r;const t=document.getElementById("app");if(!t)throw new Error("App element not found");t.innerHTML=e,console.log("se renderizo el contenido: ",e),typeof((r=this.routes[this.currentRoute])==null?void 0:r.component.init)=="function"&&setTimeout(()=>{var s;return(s=this.routes[this.currentRoute].component)==null?void 0:s.init()},0)}attachiLinkHandlers(){const e=document.querySelectorAll("a[href^='#']")||[];if(e.length===0){console.warn("No links found with href starting with '#'");return}e.forEach(t=>{t.addEventListener("click",r=>{r.preventDefault();const s=t.getAttribute("href").slice(1);location.hash=s})})}}let g;(async()=>{try{const e=await fetch("./trivia.json");if(!e.ok)throw new Error("Network response was not ok");g=await e.json()}catch(e){console.error("There has been a problem with your fetch operation:",e)}})();function N(){return`
    <main>
      <div class="main-container">
        <audio id="background-music" src="./music_fondo.mp3" autoplay loop></audio>
        <div class="glass-effect" style="height: 100%; scrollbar-width: none; overflow-y: auto; padding: 25px 0;">
          <h1 class="text-color-iluminated" id="titleIlumination">Adventure </h1>

          <div class="text-title">
            <h4 class="title" style="color: white; text-align: center;">
              Select your subjects
            </h4>
          </div>

          <div class="subjects-container" style="display: grid; grid-template-columns: repeat(4, minmax(60vw, 1fr));  overflow-y: auto;scrollbar-width: none; scroll-snap-type: x mandatory; scroll-snap-points-x: repeat(4); padding: 0 2.5rem; ">
            
            ${Object.keys(g.materias).map((a,e)=>`
            <div class="subject" data-index="${e}" data-color="${g.materias[a].bg}" style=" opacity: .5; scroll-snap-align: center; transition: transform 0.3s ease; display: flex; justify-content: center; align-items: center;"> 
              <div class="card glass-effect"  style="position:relative; width:60vw; height: 70px;">
                <img src="${g.materias[a].imagen}" alt="${a}" class="subject-image" style="color: red; position: absolute; inset: 0px; width: 100%; height: 100%; margin: auto; border-radius: 5px; object-fit: cover; z-index: -1;">
                <div class="overlay overlay-${g.materias[a].bg}" >

                  <h3 class="subject-title" style="color: white; font-size: 1.8rem;">${g.materias[a].nombre}</h3>
                
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
              <select class="difficulty-select" style="width: 100%;">
                <option value="facil">Easy</option>
                <option value="media">Medium</option>
                <option value="dificil">Hard</option>
              </select>
            </div>

          </div>

          <div class="buttons-container" style="padding: 0 2rem; display: flex; justify-content: center; margin-top: 20px;">
            <button style="width: 100%; padding: 10px 20px; font-size: .9rem; background: 
              linear-gradient(to right,rgb(255, 86, 44),rgb(244, 255, 92))
            ; border: none; border-radius: 5px;" id="start-game-button">
            <span id="icon-animation">
              🚀
            </span>  
            Listo para jugar?
            </button>
          </div>

          <div class="footer" style="text-align: center; margin-top: 20px; color: white; padding: 0 30px  ;">
            <p style="font-size: 0.8rem;">© 2023 Aprende Jugando. All rights reserved.</p>
          </div>

      

          <div style="position: fixed; bottom: 10px; right: 10px; display: flex; align-items: center; justify-content: center; background-color: rgba(0, 0, 0, 0.5); padding: 10px; border-radius: 5px;">
            <span id="audio-icon" style="font-size: 18px; color: white; cursor: pointer;">
              🔇
            </span>
          </div>  
        </div>
      </div>
    </main>
            
  `}N.init=function(){const e=document.querySelector(".subjects-container"),t=document.getElementById("titleIlumination"),r=document.getElementById("background-music"),s=document.querySelector(".difficulty-select"),o=document.getElementById("start-game-button"),n=document.getElementById("audio-icon");r.volume=.1;const i={difficulty:"easy",subject:""},x=new IntersectionObserver(u=>{u.forEach(d=>{const y=d.target.querySelector(".subject-title");e.querySelectorAll(".subject").forEach((C,k)=>{k>parseInt(d.target.dataset.index)&&C.classList.add("origin-left"),k<parseInt(d.target.dataset.index)&&C.classList.add("origin-right")}),d.isIntersecting?(d.target.style.opacity="1",d.target.style.transform="scale(1)",d.target.style.transition="transform 0.3s ease, opacity 0.3s ease, background-color 0.3s ease",t.textContent=t.textContent.split(" ")[0]+" "+y.textContent,d.target.classList.remove("origin-left"),d.target.classList.remove("origin-right"),i.subject=y.textContent):(d.target.style.opacity="0.5",d.target.style.transform="scale(.6)",d.target.style.transition="transform 0.3s ease, opacity 0.3s ease, background-color 0.3s ease")})},{threshold:.5});e.querySelectorAll(".subject").forEach(u=>{x.observe(u)}),n.addEventListener("click",()=>{r.paused?(r.play().catch(u=>{console.error("Error playing background music:",u)}),n.textContent="🔊"):(r.pause(),n.textContent="🔇")}),s.addEventListener("change",u=>{i.difficulty=u.target.value,i.data=g.materias[i.subject]||{},i.answers=i.data[u.target.value]}),o.addEventListener("click",async()=>{if(i.subject===""){alert("Please select a subject before starting the game.");return}if(i.difficulty===""){alert("Please select a difficulty before starting the game.");return}const u=g.materias[i.subject];i.difficulty=s.value,i.subject=i.subject.trim(),i.data=u[i.difficulty];const d=JSON.stringify(i);await cookieStore.set("modeSelected",d),localStorage.setItem("modeSelected",d);const y=document.getElementById("icon-animation");y.classList.add("animate__animated","animate__bounce"),setTimeout(()=>{y.classList.remove("animate__animated","animate__bounce"),y.style.display="none"},1.6*1e3),setTimeout(()=>{window.location.hash="#/startgame"},1.9*1e3)})};class w{static handleFormSubmit(e,t){e.addEventListener("submit",r=>{r.preventDefault();const s=new FormData(r.target),o=Object.fromEntries(s.entries());e.querySelectorAll(".error-message").forEach(i=>{!i.textContent===""||o[i.id.replace("-error","")].length!==0||(console.log(i.textContent===""),i.textContent=`this ${i.id.replace("-error","")} is required`)});const n=JSON.parse(localStorage.getItem("userActivated"));!this.stateOfValidation.isValid||!n?this.stateBtn=!1:this.stateBtn=!0;try{this.stateBtn&&(e.querySelector("button[type='submit']").disabled=!0,e.querySelector("button[type='submit']").innerHTML='<p class="spinner"></p>'),t(o)}catch(i){throw new Error(`Error processing form: ${i}`)}finally{this.stateBtn=!1}})}static validateInput(e,t){const r=document.getElementById(`${e.name}-error`);e.addEventListener("input",()=>{const s=e.value;try{t(s),r.textContent="",this.stateOfValidation.isValid=!0}catch(o){r.textContent=o.message,this.stateOfValidation.isValid=!1}})}static clearForm(e){const t=document.getElementById(e);t?(t.reset(),t.querySelectorAll(".error-message").forEach(s=>s.textContent="")):console.error(`Form with ID ${e} not found.`)}}E(w,"stateOfValidation",{isValid:!1,stateBtn:!1});class z{static popup(e,t="info",r=6e3){const s=document.createElement("div");s.className=`notification notification-${t}`,s.textContent=e,document.body.appendChild(s),setTimeout(()=>{s.remove()},r)}}class Q{constructor(){this.users=[]}addUser(e){if(!e||!e.username||e.password,!e.email)throw new Error("Invalid user data");try{const t=this.getAllUsers();t&&(this.users=t),this.users.push(e),localStorage.setItem("users",JSON.stringify(this.users))}catch(t){this.errors=[],this.errors.push(t.message),console.error("Error adding user:",t)}}getUser(e){const t=this.getAllUsers();return t?t.find(r=>r.username===e):null}getAllUsers(){return JSON.parse(localStorage.getItem("users"))}clearUsers(){this.users=[]}}const j=new Q;function U(){return`
    <main>
      <h4>
        Iniciar sesión
      </h4>
      <form id="login-form" class="glass-effect" >
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
      <span class="form-link">
        Don't have an account? <a href="#/register">Register here</a>
      </span>
    <main>
  `}U.init=function(){const e=document.getElementById("error-message"),t=document.getElementById("username"),r=document.getElementById("password"),s=document.querySelectorAll(".form-group input"),o=document.getElementById("login-form");w.validateInput(t,n=>{if(t.classList.remove("error"),!n)throw t.classList.add("error"),new Error("Username is required.");if(!/^[a-zA-Z0-9_]+$/.test(n))throw t.classList.add("error"),new Error("Username can only contain letters, numbers, and underscores.");if(n.length<3)throw t.classList.add("error"),new Error("Username must be at least 3 characters long.")}),w.validateInput(r,n=>{if(!/^(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{6,}$/.test(n))throw r.classList.add("error"),new Error("Password must be at least 6 characters long, contain at least one uppercase letter and one special character.");r.classList.remove("error")}),w.handleFormSubmit(o,n=>{try{const i=j.getUser(n.username);if(!i)throw new Error("User not found. Please register.");if(i.password!==n.password)throw new Error("Incorrect password. Please try again.");localStorage.setItem("userActivated",JSON.stringify({username:i.username})),z.popup("Login successful!","success",1e3),setTimeout(()=>{location.hash="/home",o.reset()},1e3)}catch(i){e.innerHTML=i.message,s.forEach(x=>x.classList.add("error"))}})};var b,q;class ${static createUser({username:e,password:t,email:r}){try{return P(this,b,q).call(this,{username:e,password:t,email:r})?{id:window.crypto.randomUUID(),lives:3,score:0,username:e,password:t,email:r}:this.errors}catch(s){console.log(s),this.errors.push(s.message)}}}b=new WeakSet,q=function({username:e,password:t,email:r}){return typeof e!="string"||e.trim()===""?(this.errors.push("Username must be a non-empty string"),!1):typeof t!="string"||t.length<6?(this.errors.push("Password must be a string with at least 6 characters"),!1):r&&(typeof r!="string"||!r.includes("@"))?(this.errors.push("Email must be a valid email address"),!1):!0},I($,b),E($,"errors",[]);function R(){return`
    <main>
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

  </main>
      

  `}R.init=function(){const e=document.getElementById("error-message"),t=document.querySelectorAll(".form-group input"),r=document.getElementById("register-form");new O,t.forEach(s=>{w.validateInput(s,o=>{if(s.classList.remove("error"),!o)throw s.classList.add("error"),new Error(`${s.name.charAt(0).toUpperCase()+s.name.slice(1)} is required.`);if(s.name==="username"&&o.length<3)throw s.classList.add("error"),new Error("Username must be at least 3 characters long.");if(s.name==="email"&&!/\S+@\S+\.\S+/.test(o))throw s.classList.add("error"),new Error("Email must be a valid email address.");if(s.name==="password"&&!/^(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{6,}$/.test(o))throw s.classList.add("error"),new Error("Password must be at least 6 characters long, contain at least one uppercase letter and one special character.")})}),w.handleFormSubmit(r,s=>{try{const o=$.createUser({username:s.username,password:s.password,email:s.email});o.errors?(e.innerHTML=o.errors.join(", "),t.forEach(n=>n.classList.add("error"))):(e.innerHTML="",t.forEach(n=>n.classList.remove("error")),r.reset()),j.addUser(o),location.hash="/login"}catch(o){e.innerHTML=`Error processing form: ${o.message}`,t.forEach(n=>n.classList.add("error"))}})};let c,l,f=0;(function(){(async()=>{const e=await cookieStore.get("modeSelected");e?c=JSON.parse(e.value):c=JSON.parse(localStorage.getItem("modeSelected")),l={currentQuestionIndex:0,score:0,correctAnswer:!1,failedTimes:0}})()})();function M(){return`
    <main>
      <div class="main-container">
        <audio id="background-music" src="./music_fondo.mp3" mute></audio>
        <div class="glass-effect" style="height: 100%; scrollbar-width: none; overflow-y: auto;">
          <h1 class="text-color-iluminated" id="titleIlumination">
            ${c==null?void 0:c.subject} - ${c==null?void 0:c.difficulty}
          </h1>
          
          <h4 class="card-title" style="color: white; text-align: center; width: 150px; margin: 0 auto;">
            Responde la siguiente pregunta:
          </h4>
          <div id="frame-start-game" >
            <div class="card" id="game-frame" style="background-color:rgb(43, 57, 69);>
        <div class="card-body">
          <p class="card-text" style="color: white; text-align: center;">
            ${c.data[f].pregunta}

          </p>
          <ul class="list-group list-group-flush">
            ${`
              <li class="list-group-item" style="color: white; text-align: center;">
              ${c.data[f].opciones.map((a,e)=>`
               
                  <p class="option" data-option="${e}" >
                    <span class="option-index">${["A","B","C","D"][e]}:.</span>
                    <span class="option-text">${a}</span>
                  </p>
                `).join("")}
              </li>
              `}
          </ul>
            
          </div>
          </div>
            <div class="form-group" style="margin-top: 20px; text-align: center; style="width: 100%;">
              <input type="text" class="form-answer" placeholder="Respuesta " data-answer="answer" style="width: calc(100% - 30px); max-width: 400px;"/>
            </div>
          
            <button id="action-button" data-action="score" class="btn" style="width: 100%; padding: 10px 20px; font-size: .9rem;">
              Verificar respuesta.
            </button>
          </div>


      
        </div>
      </div>

    </main>
  `}M.init=()=>{const a=document.getElementById("action-button"),e=document.querySelector(".form-answer");D(),a.addEventListener("click",()=>V(e.value))};const D=()=>{c=JSON.parse(localStorage.getItem("modeSelected"));const a=document.getElementById("frame-start-game"),e=document.getElementById("titleIlumination");f=l.currentQuestionIndex||0,!(!a||!c.data[f])&&(e.innerHTML=`
    ${c.subject} - ${c.difficulty}
  `,a.innerHTML=`
      <div class="card-body">
          <p class="card-text" style="color: white; text-align: center;">
              ${c.data[f].pregunta}

          </p>
          <ul class="list-group list-group-flush">
            ${`
              ${c.data[f].opciones.map((t,r)=>`
                  <li class="list-group-item" style="color: white; text-align: center;">
                  <p class="option" data-option="${r}" >

                    <span class="option-index">${["A","B","C","D"][r]}:.</span>
                    <span class="option-text">${t}</span>
                  </p>
                  </li>
                `).join("")}
              `}
          </ul>
      `)},V=a=>{if(!a||a.trim()===""){alert("Por favor, ingresa una respuesta.");return}if(c.subject==="Matemáticas"&&isNaN(a)&&a.trim()!==""){alert("Por favor, ingresa un número válido.");return}const t=c.data[f].respuesta_correcta;if(a.trim().toLowerCase()!==t.toLowerCase()){l.failedTimes+=1,l.score-=l.failedTimes<3?5:0,alert(`Respuesta incorrecta. La respuesta correcta era: ${t}. Has fallado ${l.failedTimes} veces.`);return}if(l.currentQuestionIndex=f+1,localStorage.setItem("progress",JSON.stringify(l)),D(),l.score+=10,c.data.length<=l.currentQuestionIndex){alert("¡Has completado todas las preguntas! Tu puntuación final es: "+l.score),localStorage.removeItem("modeSelected");const r=JSON.parse(localStorage.getItem("progress")),s={};s[c.subject]={score:l.score,correctAnswer:l.correctAnswer,failedTimes:l.failedTimes,subject:c.subject,difficulty:c.difficulty},l.lastNivel={...r.lastNivel,...s},l.currentQuestionIndex=0,l.score=0,l.correctAnswer=!1,l.failedTimes=0,localStorage.setItem("progress",JSON.stringify(l)),location.hash="#/home"}else alert("Respuesta correcta. ¡Siguiente pregunta!")};var p;const m=class m{constructor(e=j){if(v(m,p))return v(m,p);this.db=e,L(m,p,this)}static getInstance(){return v(m,p)||L(m,p,new m),v(m,p)}async isAuthenticated(){const e=JSON.parse(localStorage.getItem("userActivated"))||null,t=this.db.getUser(e==null?void 0:e.username);t&&(await window.cookieStore.set("user",JSON.stringify(t||{})),localStorage.removeItem("userActivated"));const r=await window.cookieStore.get("user");return!(!r||!r.value)}};p=new WeakMap,I(m,p,null);let A=m;const F=A.getInstance();function T(){return F.isAuthenticated()}const h=new O;h.addRoute({path:"/",redirectTo:"/home",callback:async()=>await T()});h.addRoute({path:"/home",component:N,callback:async()=>await T()});h.addRoute({path:"/login",component:U});h.addRoute({path:"/register",component:R});h.addRoute({path:"/startgame",component:M,callback:async()=>await T()});h.addRoute({path:"/logout",redirectTo:"/login",callback:async()=>{await window.cookieStore.delete("user"),window.localStorage.removeItem("modeSelected")}});const _=location.hash.slice(1)||"/";h.navigate({path:_});
