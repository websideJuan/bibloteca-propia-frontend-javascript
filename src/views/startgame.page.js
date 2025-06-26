let modeSelected;
let progress;
let currentQuestionIndex = 0;

(function () {
  const getModeSelected = async () => {
    const modeSelectedCookie = await cookieStore.get("modeSelected");
    const progressData = JSON.parse(localStorage.getItem("progress"));

    if (modeSelectedCookie) {
      modeSelected = JSON.parse(modeSelectedCookie.value);
    } else {
      modeSelected = JSON.parse(localStorage.getItem("modeSelected"));
    }

    if (progressData) {
      progress = progressData;

    } else {

      progress = {
        currentQuestionIndex: 0,
        score: 0,
        correctAnswer: false,
        failedTimes: 0,
        lastNivel: {},
      };
      
    }
  };
  getModeSelected();
})();

export function startGamePage() {
  return `
    <main>
      <div class="main-container">
        <audio id="background-music" src="./music_fondo.mp3" mute></audio>
        <div class="glass-effect">
          <h1 class="text-color-iluminated" id="titleIlumination">
            ${modeSelected?.subject} - ${modeSelected?.difficulty}
          </h1>
          
          <h4 class="card-title" style="color: white; text-align: center; width: 150px; margin: 0 auto;">
            Responde la siguiente pregunta:
          </h4>
          <div id="frame-start-game" class="card card-bg-board">
            <div class="card" id="game-frame" style="background-color:rgb(43, 57, 69);>
              <div class="card-body">
                <p class="card-text" style="text-align: center;">
                  ${modeSelected.data[currentQuestionIndex].pregunta}

                </p>
                <ul class="list-group list-group-flush">
                  ${`
                    <li class="list-group-item" style="color: white; text-align: center;">
                    ${modeSelected.data[currentQuestionIndex].opciones
                      .map(
                        (option, optionIndex) => `
                    
                        <p class="option" data-option="${optionIndex}" >
                          <span class="option-index">${
                            ["A", "B", "C", "D"][optionIndex]
                          }:.</span>
                          <span class="option-text">${option}</span>
                        </p>
                      `
                      )
                      .join("")}
                    </li>
                    `}
                </ul> 
              </div>
            </div>
            <div class="form-group" style="margin-top: 20px; text-align: center; style="width: 100%;">
              <input type="text" class="form-answer" placeholder="Respuesta " data-answer="answer"/>
            </div>
          
            <button id="action-button" data-action="score" class="btn-verify" style="width: 100%; padding: 10px 20px; font-size: .9rem;">
              Verificar respuesta.
            </button>
          </div>
        </div>
      </div>
    </main>
  `;
}

startGamePage.init = () => {
  const actionButton = document.getElementById("action-button");
  const answerInput = document.querySelector(".form-answer");

  renderQuestionsData();

  actionButton.addEventListener("click", () => renderData(answerInput.value));
};

const renderQuestionsData = () => {
  modeSelected = JSON.parse(localStorage.getItem("modeSelected"));
  const frameStartGame = document.getElementById("frame-start-game");
  const titleIlumination = document.getElementById("titleIlumination");
  
  currentQuestionIndex = progress.currentQuestionIndex || 0;

  if (!frameStartGame || !modeSelected.data[currentQuestionIndex]) return;

  titleIlumination.innerHTML = `
    ${modeSelected.subject} - ${modeSelected.difficulty}
  `;
  frameStartGame.innerHTML = `
      <div class="card-body">
          <p class="card-text" style="color: white; text-align: center;">
              ${modeSelected.data[currentQuestionIndex].pregunta}

          </p>
          <ul class="list-group list-group-flush">
            ${`
              ${modeSelected.data[currentQuestionIndex].opciones
                .map(
                  (option, optionIndex) => `
                  <li class="list-group-item" style="color: white; text-align: center;">
                  <p class="option" data-option="${optionIndex}" >

                    <span class="option-index">${
                      ["A", "B", "C", "D"][optionIndex]
                    }:.</span>
                    <span class="option-text">${option}</span>
                  </p>
                  </li>
                `
                )
                .join("")}
              `}
          </ul>
      `;
};

const renderData = (answer) => {
  if (!answer || answer.trim() === "") {
    alert("Por favor, ingresa una respuesta.");
    return;
  }

  if (
    modeSelected.subject === "Matemáticas" &&
    isNaN(answer) &&
    answer.trim() !== ""
  ) {
    alert("Por favor, ingresa un número válido.");
    return;
  }

  const findedQuestion = modeSelected.data[currentQuestionIndex];
  const correctAnswer = findedQuestion.respuesta_correcta;
  
  
  if (answer.trim().toLowerCase() !== correctAnswer.toLowerCase()) {
    progress.failedTimes += 1;
    progress.score -= 5 && progress.failedTimes <  3 ? 5 : 0;
    alert(
      `Respuesta incorrecta. La respuesta correcta era: ${correctAnswer}. Has fallado ${progress.failedTimes} veces.`
    );
    return;
  }

  progress.currentQuestionIndex = currentQuestionIndex + 1;

  
  localStorage.setItem("progress", JSON.stringify(progress));
  renderQuestionsData();
  progress.score += 10;
  if (modeSelected.data.length <= progress.currentQuestionIndex) {
    alert(
      "¡Has completado todas las preguntas! Tu puntuación final es: " +
        progress.score
    );
    localStorage.removeItem("modeSelected");
    const process = JSON.parse(localStorage.getItem("progress"));

    const lastNivel = {}
    lastNivel[modeSelected.subject] = {
      score: progress.score,
      correctAnswer: progress.correctAnswer,
      failedTimes: progress.failedTimes,
      subject: modeSelected.subject,
      difficulty: modeSelected.difficulty,
    }
    
    console.log(process.lastNivel);
    
    progress.lastNivel =  {
      ...process.lastNivel, 
      ...lastNivel
    };

    progress.currentQuestionIndex = 0;
    progress.score = 0;
    progress.correctAnswer = false;
    progress.failedTimes = 0;
    localStorage.setItem("progress", JSON.stringify(progress));
    location.hash = "#/home";
  } else {
    alert("Respuesta correcta. ¡Siguiente pregunta!");
  }
};

const verifyData = () => {
  let progressData = JSON.parse(localStorage.getItem("progress"));

  if (progressData) {
    return progressData;
  }

  progressData = {
    score: 0,
    correctAnswer: false,
    failedTimes: 0,
    currentQuestionIndex: 0,
  };
  localStorage.setItem("progress", JSON.stringify(progressData));

  return progressData;
};
