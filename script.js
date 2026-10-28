
const questions = [
  {
    category: "THE UNKNOWN",
    symbol: "✧",
    title: "You discover a mysterious door in an abandoned forest. What do you do?",
    answers: [
      { text: "Open it before the moment passes.", type: "explorer" },
      { text: "Imagine all the worlds behind it.", type: "dreamer" },
      { text: "Search for clues before touching it.", type: "observer" },
      { text: "Wonder who left it there and why.", type: "moon" }
    ]
  },
  {
    category: "YOUR SANCTUARY",
    symbol: "☾",
    title: "Which place feels like somewhere your soul could belong?",
    answers: [
      { text: "A hidden city nobody has mapped.", type: "explorer" },
      { text: "A floating garden beneath the stars.", type: "dreamer" },
      { text: "An ancient library full of secrets.", type: "observer" },
      { text: "A quiet beach beneath a silver moon.", type: "moon" }
    ]
  },
  {
    category: "THE LITTLE THINGS",
    symbol: "✦",
    title: "You find a strange object with no explanation. What interests you most?",
    answers: [
      { text: "Where it might take me.", type: "explorer" },
      { text: "The story I could invent about it.", type: "dreamer" },
      { text: "How it works and where it came from.", type: "observer" },
      { text: "Who owned it and what it meant to them.", type: "moon" }
    ]
  },
  {
    category: "YOUR INSTINCTS",
    symbol: "◇",
    title: "Your carefully planned day suddenly changes. You...",
    answers: [
      { text: "Turn it into an unexpected adventure.", type: "explorer" },
      { text: "Follow whatever possibility appears.", type: "dreamer" },
      { text: "Pause, rethink, and make a new plan.", type: "observer" },
      { text: "Notice how the change affects everyone.", type: "moon" }
    ]
  },
  {
    category: "ANOTHER WORLD",
    symbol: "☄",
    title: "You can bring one extraordinary thing back from another world. What is it?",
    answers: [
      { text: "A map to places still undiscovered.", type: "explorer" },
      { text: "A seed that grows into any dream.", type: "dreamer" },
      { text: "A book containing the universe's secrets.", type: "observer" },
      { text: "A memory that lets you relive a beautiful moment.", type: "moon" }
    ]
  },
  {
    category: "YOUR GIFT",
    symbol: "∞",
    title: "If you could have one unusual ability, which would you choose?",
    answers: [
      { text: "Travel anywhere in the blink of an eye.", type: "explorer" },
      { text: "Turn imagination into reality.", type: "dreamer" },
      { text: "Recognize hidden patterns in everything.", type: "observer" },
      { text: "Understand the feelings behind every silence.", type: "moon" }
    ]
  },
  {
    category: "THE FINAL DOOR",
    symbol: "✧",
    title: "One mystery in the universe will finally be revealed. Which would you choose?",
    answers: [
      { text: "What lies beyond the edge of the known world.", type: "explorer" },
      { text: "Why we dream of places we have never seen.", type: "dreamer" },
      { text: "What holds the universe together.", type: "observer" },
      { text: "Why certain people change our lives forever.", type: "moon" }
    ]
  }
];

const personalities = {
  explorer: {
    title: "The Fearless Explorer",
    tagline: "Your soul belongs to the unknown.",
    description:
      "You are drawn to possibility, discovery and the thrill of what comes next. The unfamiliar doesn't simply frighten you; it invites you to find out more. Your world grows whenever you dare to step beyond its edges.",
    trait: "Curiosity",
    element: "The Horizon",
    quote: "“Some doors exist only for those brave enough to open them.”"
  },
  dreamer: {
    title: "The Dream Architect",
    tagline: "You see worlds within worlds.",
    description:
      "Your imagination is a place where ordinary things become extraordinary. You find possibilities where others see limits, and stories where others see silence. Your gift is the ability to imagine what has not yet been.",
    trait: "Imagination",
    element: "Stardust",
    quote: "“Every impossible thing began as someone's quiet thought.”"
  },
  observer: {
    title: "The Silent Observer",
    tagline: "You notice what others overlook.",
    description:
      "You are fascinated by patterns, hidden details and the questions beneath the obvious. You prefer understanding something deeply to accepting it at first glance. The world is full of clues, and you love connecting them.",
    trait: "Insight",
    element: "The Cosmos",
    quote: "“The smallest detail can unlock the greatest mystery.”"
  },
  moon: {
    title: "The Moonlit Soul",
    tagline: "You find meaning beneath the surface.",
    description:
      "You are drawn to meaningful moments, quiet beauty and the stories people carry inside them. You notice the atmosphere around a moment, not just the moment itself. To you, connection can make even ordinary life feel extraordinary.",
    trait: "Sensitivity",
    element: "Moonlight",
    quote: "“Some of the deepest things are felt before they are understood.”"
  }
};

const welcome = document.getElementById("welcome");
const quiz = document.getElementById("quiz");
const result = document.getElementById("result");

const startBtn = document.getElementById("startBtn");
const nextBtn = document.getElementById("nextBtn");
const backBtn = document.getElementById("backBtn");
const restartBtn = document.getElementById("restartBtn");
const shareBtn = document.getElementById("shareBtn");
const homeLink = document.getElementById("homeLink");

let currentQuestion = 0;
let chosenAnswers = [];

function startGame() {
  currentQuestion = 0;
  chosenAnswers = [];

  result.hidden = true;
  welcome.hidden = true;
  quiz.hidden = false;

  renderQuestion();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function renderQuestion() {
  const item = questions[currentQuestion];

  document.getElementById("stepLabel").textContent =
    `QUESTION ${String(currentQuestion + 1).padStart(2, "0")} / ${String(questions.length).padStart(2, "0")}`;

  document.getElementById("questionSymbol").textContent = item.symbol;
  document.getElementById("questionCategory").textContent = item.category;
  document.getElementById("questionTitle").textContent = item.title;

  document.getElementById("progressFill").style.width =
    `${(currentQuestion / questions.length) * 100}%`;

  const grid = document.getElementById("answerGrid");
  grid.innerHTML = "";

  item.answers.forEach((answer, index) => {
    const button = document.createElement("button");
    button.className = "answer";
    button.type = "button";

    const mark = document.createElement("span");
    mark.className = "answer-mark";
    mark.textContent = String.fromCharCode(65 + index);

    const label = document.createElement("span");
    label.textContent = answer.text;

    button.append(mark, label);

    if (chosenAnswers[currentQuestion] === index) {
      button.classList.add("selected");
      button.setAttribute("aria-pressed", "true");
    } else {
      button.setAttribute("aria-pressed", "false");
    }

    button.addEventListener("click", () => {
      chosenAnswers[currentQuestion] = index;

      grid.querySelectorAll(".answer").forEach((option) => {
        option.classList.remove("selected");
        option.setAttribute("aria-pressed", "false");
      });

      button.classList.add("selected");
      button.setAttribute("aria-pressed", "true");

      nextBtn.disabled = false;
      document.getElementById("answerStatus").textContent = "ANSWER SELECTED";
      nextBtn.innerHTML =
        currentQuestion === questions.length - 1
          ? 'Reveal my world <span>✦</span>'
          : 'Continue <span>→</span>';
    });

    grid.appendChild(button);
  });

  backBtn.disabled = currentQuestion === 0;
  nextBtn.disabled = chosenAnswers[currentQuestion] === undefined;

  document.getElementById("answerStatus").textContent =
    chosenAnswers[currentQuestion] === undefined
      ? "CHOOSE ONE ANSWER"
      : "ANSWER SELECTED";

  nextBtn.innerHTML =
    currentQuestion === questions.length - 1
      ? 'Reveal my world <span>✦</span>'
      : 'Continue <span>→</span>';
}

function goNext() {
  if (chosenAnswers[currentQuestion] === undefined) return;

  if (currentQuestion < questions.length - 1) {
    currentQuestion++;
    renderQuestion();
  } else {
    showResult();
  }
}

function goBack() {
  if (currentQuestion > 0) {
    currentQuestion--;
    renderQuestion();
  }
}

function showResult() {
  const scores = {
    explorer: 0,
    dreamer: 0,
    observer: 0,
    moon: 0
  };

  chosenAnswers.forEach((answerIndex, questionIndex) => {
    const type = questions[questionIndex].answers[answerIndex].type;
    scores[type]++;
  });

  const highestScore = Math.max(...Object.values(scores));

  const tiedTypes = Object.keys(scores).filter(
    (type) => scores[type] === highestScore
  );

  // If tied, use the player's final answer to break the tie.
  const lastType =
    questions[questions.length - 1]
      .answers[chosenAnswers[questions.length - 1]].type;

  const winner = tiedTypes.includes(lastType)
    ? lastType
    : tiedTypes[0];

  const personality = personalities[winner];
  const alignment = Math.round((scores[winner] / questions.length) * 100);

  document.getElementById("resultTitle").textContent = personality.title;
  document.getElementById("resultTagline").textContent = personality.tagline;
  document.getElementById("resultDescription").textContent =
    personality.description;
  document.getElementById("strongestTrait").textContent = personality.trait;
  document.getElementById("innerElement").textContent = personality.element;
  document.getElementById("scoreText").textContent =
    `${scores[winner]} / ${questions.length} · ${alignment}%`;
  document.getElementById("resultQuote").textContent = personality.quote;

  document.getElementById("scoreFill").style.width = `${alignment}%`;
  document.getElementById("progressFill").style.width = "100%";
  document.getElementById("shareStatus").textContent = "";

  quiz.hidden = true;
  result.hidden = false;

  window.scrollTo({ top: 0, behavior: "smooth" });
}

async function shareResult() {
  const title = document.getElementById("resultTitle").textContent;
  const tagline = document.getElementById("resultTagline").textContent;
  const message =
    `I discovered my inner archetype: ${title} — "${tagline}" Take The Hidden Self quiz and discover yours!`;

  const status = document.getElementById("shareStatus");

  try {
    if (navigator.share) {
      await navigator.share({
        title: "The Hidden Self",
        text: message
      });
      status.textContent = "Your result is ready to share.";
    } else {
      await navigator.clipboard.writeText(message);
      status.textContent = "Your result has been copied!";
    }
  } catch (error) {
    if (error.name !== "AbortError") {
      status.textContent =
        "Sharing isn't available here. You can copy your result text manually.";
    }
  }
}

startBtn.addEventListener("click", startGame);
nextBtn.addEventListener("click", goNext);
backBtn.addEventListener("click", goBack);
restartBtn.addEventListener("click", startGame);
shareBtn.addEventListener("click", shareResult);

homeLink.addEventListener("click", (event) => {
  event.preventDefault();
  welcome.hidden = false;
  quiz.hidden = true;
  result.hidden = true;
  currentQuestion = 0;
  chosenAnswers = [];
  window.scrollTo({ top: 0, behavior: "smooth" });
});
