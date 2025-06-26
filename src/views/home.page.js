let trivia;

(() => {
  const fetchData = async () => {
    try {
      const response = await fetch(`./trivia.json`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      trivia = data;
    } catch (error) {
      console.error(
        "There has been a problem with your fetch operation:",
        error
      );
    }
  };
  fetchData();
})();

export function homePage() {
  return `
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

          <div class="subjects-container" style="display: grid; grid-template-columns: repeat(4, minmax(100%, 1fr));  overflow-y: auto;scrollbar-width: none; scroll-snap-type: x mandatory; scroll-snap-points-x: repeat(4); padding: 0 2.5rem; ">
            
            ${Object.keys(trivia.materias)
              .map(
                (subject, i) => `
            <div class="subject" data-index="${i}" data-color="${trivia.materias[subject].bg}" style=" scroll-snap-align: center; transition: transform 0.3s ease; display: flex; justify-content: center; align-items: center;"> 
              <div class="card glass-effect"  style="position:relative; width:100%; height: 70px;">
                <img src="${trivia.materias[subject].imagen}" alt="${subject}" class="subject-image" style="color: red; position: absolute; inset: 0px; width: 100%; height: 100%; margin: auto; border-radius: 5px; object-fit: cover; z-index: -1;">
                <div class="overlay overlay-${trivia.materias[subject].bg}" >

                  <h3 class="subject-title" style="color: white; font-size: 1.8rem;">${trivia.materias[subject].nombre}</h3>
                
                </div>
              </div>
            </div>
            `
              )
              .join("")}
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
            
  `;
}

homePage.init = function handelHomePage() {
  const subjectsContainer = document.querySelector(".subjects-container");
  const titleIlumination = document.getElementById("titleIlumination");
  const backgroundMusic = document.getElementById("background-music");
  const selectDifficulty = document.querySelector(".difficulty-select");
  const startGameButton = document.getElementById("start-game-button");
  const audioIcon = document.getElementById("audio-icon");
  // Set the volume to a lower level
  backgroundMusic.volume = 0.1; // Adjust the volume as needed

  const modeSelected = {
    difficulty: "easy",
    subject: "",
  };

  const intersectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const subjectTitle = entry.target.querySelector(".subject-title");
        
        if (entry.isIntersecting) {
          titleIlumination.textContent =
            titleIlumination.textContent.split(" ")[0] +
            " " +
            subjectTitle.textContent;
          modeSelected.subject = subjectTitle.textContent;
          entry.target.classList.remove("origin-left", "origin-right")

          
          entry.target.style.opacity = "1";
          entry.target.style.transform = "scale(1)";
          entry.target.style.transition =
            "transform 0.3s ease, opacity 0.3s ease, background-color 0.3s ease";

        } else {
          entry.target.style.opacity = "0.5";
          entry.target.style.transform = "scale(.6)";
        }


        subjectsContainer.querySelectorAll(".subject").forEach((subject, i) => {
          subject.classList.remove("origin-left", "origin-right");

          
          
          if (parseInt(entry.target.dataset.index) < i) {
            
           
            subject.classList.add("origin-left")
          }

          
          if (parseInt(entry.target.dataset.index) > i) subject.classList.add("origin-right");
        });

      });
    },
    { threshold: 0.9 } // Adjust threshold and root as needed
  );

  subjectsContainer.querySelectorAll(".subject").forEach((subject) => {
    intersectionObserver.observe(subject);
  });

  audioIcon.addEventListener("click", () => {
    if (backgroundMusic.paused) {
      backgroundMusic.play().catch((error) => {
        console.error("Error playing background music:", error);
      });
      audioIcon.textContent = "🔊"; // Change icon to indicate sound is on
    } else {
      backgroundMusic.pause();
      audioIcon.textContent = "🔇"; // Change icon to indicate sound is off
    }
  });

  selectDifficulty.addEventListener("change", (event) => {
    modeSelected.difficulty = event.target.value;
    modeSelected.data = trivia.materias[modeSelected.subject] || {};
    modeSelected.answers = modeSelected.data[event.target.value];
  });

  startGameButton.addEventListener("click", async () => {
    if (modeSelected.subject === "") {
      alert("Please select a subject before starting the game.");
      return;
    }
    if (modeSelected.difficulty === "") {
      alert("Please select a difficulty before starting the game.");
      return;
    }

    const dataTrivia = trivia.materias[modeSelected.subject];
    modeSelected.difficulty = selectDifficulty.value;
    modeSelected.subject =  modeSelected.subject.trim();
    modeSelected.data = dataTrivia[modeSelected.difficulty];

    const parseMode = JSON.stringify(modeSelected);

    await cookieStore.set("modeSelected", parseMode);
    localStorage.setItem("modeSelected", parseMode);

    const iconAnimation = document.getElementById("icon-animation");
    iconAnimation.classList.add("animate__animated", "animate__bounce");

    setTimeout(() => {
      iconAnimation.classList.remove("animate__animated", "animate__bounce");
      iconAnimation.style.display = "none"; // Hide the icon after animation
    }, 1.6 * 1000); // Adjust the duration to match your animation duration

    setTimeout(() => {
      window.location.hash = "#/startgame";
    }, 1.9 * 1000); // Redirect to start game page after the animation
  });
};
