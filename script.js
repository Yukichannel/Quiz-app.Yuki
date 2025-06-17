const questions = [
  {
    question: "Америкт хамгийн түгээмэл хоол юу вэ?",
    answers: [
      { text: "Сүши", score: 0 },
      { text: "Бургер", score: 4 },
      { text: "Гоймон", score: 1 },
      { text: "Тако", score: 2 }
    ]
  },
  {
    question: "Та чөлөөт цагаараа юу хийх дуртай вэ?",
    answers: [
      { text: "Аялах", score: 2 },
      { text: "Америк кино үзэх", score: 4 },
      { text: "Урлаг судлах", score: 1 },
      { text: "Гудамжаар алхах", score: 0 }
    ]
  },
  {
    question: "Та ямар спорт сонирхдог вэ?",
    answers: [
      { text: "Америк хөлбөмбөг", score: 4 },
      { text: "Сагсан бөмбөг", score: 3 },
      { text: "Бөх", score: 1 },
      { text: "Морин уралдаан", score: 0 }
    ]
  },
  {
    question: "Та өглөө ямар уух зүйл уудаг вэ?",
    answers: [
      { text: "Кофе", score: 4 },
      { text: "Цай", score: 1 },
      { text: "Жүүс", score: 2 },
      { text: "Сүү", score: 3 }
    ]
  },
  {
    question: "Та ямар хөгжмийн урсгал сонсох дуртай вэ?",
    answers: [
      { text: "Поп", score: 3 },
      { text: "Хип Хоп", score: 4 },
      { text: "Уламжлалт хөгжим", score: 0 },
      { text: "Рок", score: 2 }
    ]
  },
  {
    question: "Та ямар машин унахыг хүсдэг вэ?",
    answers: [
      { text: "Ford Mustang", score: 4 },
      { text: "Toyota Prius", score: 1 },
      { text: "Tesla", score: 3 },
      { text: "Lada", score: 0 }
    ]
  },
  {
    question: "Та ямар баярыг илүү тэмдэглэдэг вэ?",
    answers: [
      { text: "Thanksgiving", score: 4 },
      { text: "Halloween", score: 3 },
      { text: "Шинэ жил", score: 2 },
      { text: "Цагаан сар", score: 0 }
    ]
  },
  {
    question: "Та хэр их fast food иддэг вэ?",
    answers: [
      { text: "Долоо хоногт 3+ удаа", score: 4 },
      { text: "Долоо хоногт 1-2 удаа", score: 3 },
      { text: "Сардаа 1 удаа", score: 1 },
      { text: "Бараг иддэггүй", score: 0 }
    ]
  },
  {
    question: "Та ямар хэл дээр ихэнх мэдээллээ авдаг вэ?",
    answers: [
      { text: "Англи хэл", score: 4 },
      { text: "Орос хэл", score: 1 },
      { text: "Монгол хэл", score: 0 },
      { text: "Солонгос хэл", score: 2 }
    ]
  },
  {
    question: "Та ямар хувцасны хэв маягт дуртай вэ?",
    answers: [
      { text: "Street style", score: 4 },
      { text: "Business casual", score: 3 },
      { text: "Уламжлалт хувцас", score: 0 },
      { text: "Casual", score: 2 }
    ]
  }
];

let currentQuestion = 0;
let selectedScore = null;

const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const nextBtn = document.getElementById("next-btn");
const resultBox = document.getElementById("result-box");
const resultText = document.getElementById("result-text");
const quizBox = document.getElementById("quiz-box");

let userScore = 0;

function showQuestion() {
  selectedScore = null;
  nextBtn.disabled = true;

  const q = questions[currentQuestion];
  questionEl.textContent = q.question;
  optionsEl.innerHTML = "";

  q.answers.forEach((answer) => {
    const btn = document.createElement("button");
    btn.textContent = answer.text;
    btn.classList.add("option-btn");

    btn.addEventListener("click", () => {
      // Unselect other buttons
      const allButtons = document.querySelectorAll("#options button");
      allButtons.forEach(b => b.classList.remove("selected"));

      // Select this one
      btn.classList.add("selected");
      selectedScore = answer.score;
      nextBtn.disabled = false;
    });

    optionsEl.appendChild(btn);
  });
}

function showResult() {
  quizBox.style.display = "none";
  resultBox.style.display = "block";

  const percent = Math.round((userScore / (questions.length * 4)) * 100);
  let message = "";

  if (percent >= 80) {
    message = "Та 100% Америк хүнтэй их төстэй юм, магадгүй та америк хүн юм биш биз?";
  } else if (percent >= 60) {
    message = "Та Америк life style-ийг дагадаг юм байна";
  } else if (percent >= 40) {
    message = "Та Америк хүн шиг амьдрах гэж оролддог юм байна зөв үү?";
  } else {
    message = "Та Америк хүн шиг биш юм байна";
  }

  const result = `${percent}% - ${message}`;
  resultText.textContent = result;
  localStorage.setItem("quizResult", percent);

  // Show Facebook share button
  const fbBtn = document.getElementById("fb-share-btn");
  fbBtn.style.display = "inline-block";
  fbBtn.onclick = function () {
    const shareText = `Миний тестийн дүн: ${result}`;
    const quizUrl = "https://your-quiz-url.com"; // ✅ Replace this with your actual live quiz URL

    const fbUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(quizUrl)}&quote=${encodeURIComponent(shareText)}`;
    window.open(fbUrl, "_blank");
  };
}

nextBtn.addEventListener("click", () => {
  if (selectedScore === null) return;

  userScore += selectedScore;
  currentQuestion++;

  if (currentQuestion < questions.length) {
    showQuestion();
  } else {
    showResult();
  }
});

function restartQuiz() {
  currentQuestion = 0;
  userScore = 0;
  resultBox.style.display = "none";
  quizBox.style.display = "block";
  showQuestion();
}

showQuestion();
