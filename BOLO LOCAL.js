
"use strict";

const $ = (selector) => document.querySelector(selector);

const languageSelect = $("#language");
const levelSelect = $("#level");
const scenarioSelect = $("#scenario");
const chatWindow = $("#chatWindow");
const messageInput = $("#messageInput");
const chatForm = $("#chatForm");
const voiceStatus = $("#voiceStatus");

const languages = {
  hi: {
    name: "Hindi",
    speechCode: "hi-IN",
    phrases: [
      ["नमस्ते", "Hello / Greetings"],
      ["धन्यवाद", "Thank you"],
      ["कृपया", "Please"],
      ["माफ़ कीजिए", "Excuse me / Sorry"]
    ],
    cultureTitle: "Respect starts with how you address someone.",
    cultureText: "Use “आप” with strangers, elders and in formal situations. “तुम” is more familiar, while “तू” can sound disrespectful depending on the relationship and region."
  },
  raj: {
    name: "Rajasthani",
    speechCode: "hi-IN",
    phrases: [
      ["खम्मा घणी", "A traditional respectful greeting"],
      ["पधारो म्हारे देस", "Welcome to my land"],
      ["थांरो नाम काई है?", "What is your name?"],
      ["घणो आभार", "Many thanks"]
    ],
    cultureTitle: "A warm greeting opens doors.",
    cultureText: "“खम्मा घणी” is a well-known traditional Rajasthani greeting. Usage and wording differ across Rajasthan's dialects, so follow the local community's way of speaking."
  },
  en: {
    name: "English",
    speechCode: "en-IN",
    phrases: [
      ["Excuse me", "A polite way to get attention"],
      ["Could you please help me?", "A courteous request"],
      ["Thank you very much", "Expressing gratitude"],
      ["Would you mind?", "A polite way to ask"]
    ],
    cultureTitle: "Tone matters as much as words.",
    cultureText: "In formal situations, phrases such as “Could you please…” and “Would you mind…” often sound more considerate than direct commands. With friends, simpler language is natural."
  }
};

const scenarios = {
  travel: {
    title: "Travel & directions",
    note: "You need directions to the railway station.",
    opening: {
      hi: ["नमस्ते! बताइए, मैं आपकी क्या मदद कर सकता हूँ?", "Hello! Tell me, how can I help you?"],
      raj: ["खम्मा घणी सा! किणी जगह जाणो है?", "Greetings! Where would you like to go?"],
      en: ["Hello there! Where would you like to go?", "Hello! Where do you need to go?"]
    },
    replies: {
      hi: [
        ["मुझे रेलवे स्टेशन जाना है।", "I need to go to the railway station.", "station"],
        ["यहाँ से बस स्टैंड कितनी दूर है?", "How far is the bus stand from here?", "bus"],
        ["कृपया रास्ता बता दीजिए।", "Please tell me the way.", "directions"]
      ],
      raj: [
        ["म्हाने रेलवे स्टेशन जाणो है।", "I need to go to the railway station.", "station"],
        ["बस स्टैंड कितरो दूर है?", "How far is the bus stand?", "bus"],
        ["म्हाने रस्तो बता द्यो सा।", "Please show me the way.", "directions"]
      ],
      en: [
        ["I need to go to the railway station.", "I need to go to the railway station.", "station"],
        ["How far is the bus stand?", "How far is the bus stand?", "bus"],
        ["Could you please show me the way?", "Please tell me the way.", "directions"]
      ]
    },
    responses: {
      station: ["सीधे जाइए, फिर बाईं ओर मुड़िए।", "Go straight, then turn left."],
      bus: ["बस स्टैंड यहाँ से लगभग पाँच मिनट की दूरी पर है।", "The bus stand is about five minutes away."],
      directions: ["ज़रूर! मैं आपको रास्ता समझा देता हूँ।", "Of course! Let me explain the route."]
    },
    followUp: "क्या आपको पैदल जाना है या ऑटो लेना है?",
    followUpEnglish: "Would you like to walk or take an auto-rickshaw?",
    tip: "When asking strangers for directions, begin with a greeting and “कृपया” (please)."
  },

  shopping: {
    title: "Shopping & bargaining",
    note: "You're buying something at a local market.",
    opening: {
      hi: ["नमस्ते! आपको क्या चाहिए?", "Hello! What are you looking for?"],
      raj: ["खम्मा घणी! काई लेणो है?", "Greetings! What would you like to buy?"],
      en: ["Hello! What are you looking for today?", "Hello! What would you like to buy?"]
    },
    replies: {
      hi: [
        ["यह कितने का है?", "How much does this cost?", "price"],
        ["क्या थोड़ा कम कर सकते हैं?", "Could you lower the price a little?", "discount"],
        ["मैं बस देख रहा हूँ, धन्यवाद।", "I'm just looking, thank you.", "looking"]
      ],
      raj: [
        ["ई कितरो को है?", "How much does this cost?", "price"],
        ["थोड़ो कम कर द्यो सा।", "Please lower the price a little.", "discount"],
        ["म्हूं बस देख रियो हूं, आभार।", "I'm just looking, thank you.", "looking"]
      ],
      en: [
        ["How much does this cost?", "How much does this cost?", "price"],
        ["Could you offer a better price?", "Could you lower the price?", "discount"],
        ["I'm just looking, thank you.", "I'm just looking, thank you.", "looking"]
      ]
    },
    responses: {
      price: ["इसके 500 रुपये हैं।", "It costs 500 rupees."],
      discount: ["आपके लिए 450 रुपये कर देता हूँ।", "I can make it 450 rupees for you."],
      looking: ["बिल्कुल, आराम से देखिए।", "Of course. Take your time."]
    },
    followUp: "क्या आप इसे खरीदना चाहेंगे?",
    followUpEnglish: "Would you like to buy it?",
    tip: "A friendly tone makes bargaining more pleasant. Ask rather than demand a discount."
  },

  college: {
    title: "College life",
    note: "You're meeting a classmate on campus for the first time.",
    opening: {
      hi: ["नमस्ते! आप किस विभाग में पढ़ते हैं?", "Hello! Which department do you study in?"],
      raj: ["खम्मा घणी! थां किणी विभाग में पढ़ो हो?", "Hello! Which department do you study in?"],
      en: ["Hi! Which department are you studying in?", "Hello! Which department do you study in?"]
    },
    replies: {
      hi: [
        ["मैं कंप्यूटर साइंस में पढ़ता हूँ।", "I study computer science.", "department"],
        ["क्या आप मुझे लाइब्रेरी का रास्ता बता सकते हैं?", "Could you show me the library?", "library"],
        ["क्या हम साथ में पढ़ाई कर सकते हैं?", "Can we study together?", "study"]
      ],
      raj: [
        ["म्हूं कंप्यूटर साइंस में पढ़ूं हूं।", "I study computer science.", "department"],
        ["लाइब्रेरी रो रस्तो बता द्यो सा।", "Please tell me the way to the library.", "library"],
        ["आपां साथ में पढ़ सकां?", "Can we study together?", "study"]
      ],
      en: [
        ["I'm studying computer science.", "I study computer science.", "department"],
        ["Could you show me where the library is?", "Could you show me the library?", "library"],
        ["Would you like to study together?", "Can we study together?", "study"]
      ]
    },
    responses: {
      department: ["बहुत अच्छा! आपको कौन-सा विषय पसंद है?", "That's great! What's your favourite subject?"],
      library: ["लाइब्रेरी उस इमारत की दूसरी मंज़िल पर है।", "The library is on the second floor of that building."],
      study: ["ज़रूर! हम क्लास के बाद मिल सकते हैं।", "Sure! We can meet after class."]
    },
    followUp: "आप किस विषय में सबसे ज़्यादा रुचि रखते हैं?",
    followUpEnglish: "Which subject interests you the most?",
    tip: "In college, a friendly greeting and an open-ended question are good ways to start a conversation."
  },

  emergency: {
    title: "Emergency help",
    note: "You need help finding a nearby hospital.",
    opening: {
      hi: ["नमस्ते, क्या आपको किसी मदद की ज़रूरत है?", "Hello, do you need any help?"],
      raj: ["काई मदद चावै हो सा?", "Do you need any help?"],
      en: ["Hello, do you need some help?", "Hello, do you need help?"]
    },
    replies: {
      hi: [
        ["मुझे नज़दीकी अस्पताल जाना है।", "I need to get to the nearest hospital.", "hospital"],
        ["कृपया पुलिस को बुलाइए।", "Please call the police.", "police"],
        ["मुझे मदद की ज़रूरत है।", "I need help.", "help"]
      ],
      raj: [
        ["म्हाने नजदीकी अस्पताल जाणो है।", "I need to go to the nearest hospital.", "hospital"],
        ["पुलिस ने बुलाओ सा।", "Please call the police.", "police"],
        ["म्हाने मदद री जरूरत है।", "I need help.", "help"]
      ],
      en: [
        ["I need the nearest hospital.", "I need the nearest hospital.", "hospital"],
        ["Please call the police.", "Please call the police.", "police"],
        ["I need help, please.", "I need help.", "help"]
      ]
    },
    responses: {
      hospital: ["मैं आपको अस्पताल का रास्ता बताता हूँ। ज़रूरत हो तो आपातकालीन सेवा को कॉल करें।", "I'll help you find the hospital. Contact emergency services if needed."],
      police: ["मैं पुलिस को संपर्क करने में आपकी मदद करता हूँ।", "I'll help you contact the police."],
      help: ["बताइए क्या हुआ? अगर तुरंत खतरा है, तो स्थानीय आपातकालीन सेवा को कॉल करें।", "Tell me what happened. If there is immediate danger, call local emergency services."]
    },
    followUp: "क्या आप अभी सुरक्षित जगह पर हैं?",
    followUpEnglish: "Are you somewhere safe right now?",
    tip: "In an emergency, use short, clear sentences. Contact real emergency services; this practice app cannot dispatch help."
  },

  social: {
    title: "Meeting people",
    note: "You're being introduced to someone at a social gathering.",
    opening: {
      hi: ["नमस्ते! आपसे मिलकर अच्छा लगा।", "Hello! It's nice to meet you."],
      raj: ["खम्मा घणी सा! थांसे मिलकर घणो अच्छो लाग्यो।", "Greetings! It's lovely to meet you."],
      en: ["Hi! It's lovely to meet you.", "Hello! Nice to meet you."]
    },
    replies: {
      hi: [
        ["आपसे मिलकर भी अच्छा लगा।", "Nice to meet you too.", "meet"],
        ["आप कहाँ से हैं?", "Where are you from?", "origin"],
        ["आपका दिन कैसा जा रहा है?", "How is your day going?", "day"]
      ],
      raj: [
        ["म्हाने भी थांसे मिलकर अच्छो लाग्यो।", "Nice to meet you too.", "meet"],
        ["थां कठै रा हो?", "Where are you from?", "origin"],
        ["थांरो दिन कैसो जा रियो है?", "How is your day going?", "day"]
      ],
      en: [
        ["It's nice to meet you too.", "Nice to meet you too.", "meet"],
        ["Where are you from?", "Where are you from?", "origin"],
        ["How has your day been?", "How is your day going?", "day"]
      ]
    },
    responses: {
      meet: ["धन्यवाद! आप क्या करते हैं?", "Thank you! What do you do?"],
      origin: ["मैं जयपुर से हूँ। आप वहाँ कभी गए हैं?", "I'm from Jaipur. Have you ever visited?"],
      day: ["मेरा दिन अच्छा जा रहा है, पूछने के लिए धन्यवाद।", "My day is going well, thanks for asking."]
    },
    followUp: "आप खाली समय में क्या करना पसंद करते हैं?",
    followUpEnglish: "What do you enjoy doing in your free time?",
    tip: "Start with light, friendly questions. Avoid personal or sensitive topics until you know someone better."
  }
};

const culturalRules = {
  hi: {
    formal: "Formal: “क्या आप मेरी मदद कर सकते हैं?” Informal: “मेरी मदद करोगे?” Choose based on familiarity and context."
  },
  raj: {
    formal: "Respectful forms such as “सा” are used in many Rajasthani-speaking communities. The exact form varies by dialect and relationship."
  },
  en: {
    formal: "Formal: “Could you please help me?” Informal: “Can you help me?” Both are correct; the situation determines the best fit."
  }
};

const quizQuestions = [
  {
    question: "How would you politely address an unfamiliar adult in Hindi?",
    options: ["तू", "आप", "ए भाई", "कोई भी शब्द"],
    answer: 1,
    explanation: "“आप” is generally respectful when addressing an unfamiliar adult."
  },
  {
    question: "Which phrase politely asks for a lower price?",
    options: [
      "Give it to me now.",
      "That's too much!",
      "Could you offer a better price?",
      "I don't care."
    ],
    answer: 2,
    explanation: "A polite request makes bargaining friendlier and less confrontational."
  },
  {
    question: "What is a sensible first step when asking a stranger for directions?",
    options: [
      "Interrupt loudly",
      "Start with a polite greeting",
      "Give an order",
      "Walk away without asking"
    ],
    answer: 1,
    explanation: "A greeting helps establish a respectful interaction."
  },
  {
    question: "What should you do if someone doesn't understand your phrase?",
    options: [
      "Repeat it angrily",
      "Use simpler words and clarify",
      "Stop communicating",
      "Blame their accent"
    ],
    answer: 1,
    explanation: "Simpler wording, patience and clarification help resolve misunderstandings."
  }
];

let turns = 0;
let correctTurns = 0;
let phrasesLearned = new Set();
let currentQuiz = 0;
let quizAnswered = false;
let recognition = null;
let listening = false;

function currentLanguage() {
  return languageSelect.value;
}

function currentScenario() {
  return scenarios[scenarioSelect.value];
}

function speechCode() {
  return languages[currentLanguage()].speechCode;
}

function getLevel() {
  return levelSelect.value;
}

function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  })[character]);
}

function makeMessage(text, translation, isUser = false, options = {}) {
  const row = document.createElement("div");
  row.className = `message-row${isUser ? " user-row" : ""}`;

  const message = document.createElement("div");
  message.className = `message${isUser ? " user-message" : ""}`;

  const label = document.createElement("span");
  label.className = "speaker-label";
  label.textContent = isUser ? "YOU" : "LOCAL GUIDE";

  const content = document.createElement("p");
  content.textContent = text;

  const translated = document.createElement("span");
  translated.className = "translation";
  translated.textContent = translation || "";

  message.append(label, content, translated);

  if (!isUser) {
    const speakButton = document.createElement("button");
    speakButton.className = "speak-button";
    speakButton.type = "button";
    speakButton.textContent = "▶ Listen to phrase";
    speakButton.addEventListener("click", () => speak(text));
    message.appendChild(speakButton);
  }

  if (options.feedback) {
    const feedback = document.createElement("span");
    feedback.className = "translation";
    feedback.textContent = options.feedback;
    message.appendChild(feedback);
  }

  if (!isUser) {
    const avatar = document.createElement("div");
    avatar.className = "speaker-avatar";
    avatar.textContent = "BL";
    row.append(avatar, message);
  } else {
    row.appendChild(message);
  }

  chatWindow.appendChild(row);
  chatWindow.scrollTop = chatWindow.scrollHeight;
}

function resetConversation() {
  turns = 0;
  correctTurns = 0;
  phrasesLearned = new Set();
  chatWindow.replaceChildren();
  updateProgress();

  const scenario = currentScenario();
  const lang = currentLanguage();
  const greeting = scenario.opening[lang];

  $("#scenarioTitle").textContent = scenario.title;
  $("#scenarioNote").textContent = scenario.note;

  makeMessage(greeting[0], greeting[1]);

  const level = getLevel();
  const suggestions = scenario.replies[lang];
  const count = level === "beginner" ? 3 : level === "intermediate" ? 3 : 2;

  $("#suggestions").replaceChildren();

  suggestions.slice(0, count).forEach(([phrase, translation, key]) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "suggestion-chip";
    button.textContent = phrase;
    button.addEventListener("click", () => sendAnswer(phrase, key, translation));
    $("#suggestions").appendChild(button);
  });

  updateCulture();
  renderPhrasebook();
}

function updateCulture() {
  const lang = currentLanguage();
  const level = getLevel();
  const scenario = currentScenario();

  $("#cultureTitle").textContent = languages[lang].cultureTitle;
  $("#cultureText").textContent =
    level === "advanced"
      ? culturalRules[lang].formal + " " + scenario.tip
      : languages[lang].cultureText + " " + scenario.tip;

  $("#cultureTag").textContent = level.toUpperCase() + " CULTURE TIP";
}

function renderPhrasebook() {
  const list = $("#phrasebook");
  list.replaceChildren();

  languages[currentLanguage()].phrases.forEach(([phrase, meaning]) => {
    const item = document.createElement("div");
    item.className = "phrase-item";

    const speakButton = document.createElement("button");
    speakButton.type = "button";
    speakButton.textContent = "▶";
    speakButton.setAttribute("aria-label", `Listen to ${phrase}`);
    speakButton.addEventListener("click", () => speak(phrase));

    const title = document.createElement("strong");
    title.textContent = phrase;

    const description = document.createElement("span");
    description.textContent = meaning;

    item.append(speakButton, title, description);
    list.appendChild(item);
  });
}

function normalise(text) {
  return text
    .toLocaleLowerCase()
    .normalize("NFKC")
    .replace(/[.,!?।؟'"“”‘’\-]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function similarity(a, b) {
  const left = normalise(a);
  const right = normalise(b);

  if (!left || !right) return 0;
  if (left === right) return 1;
  if (left.includes(right) || right.includes(left)) return 0.85;

  const wordsA = new Set(left.split(" "));
  const wordsB = new Set(right.split(" "));
  let shared = 0;

  wordsA.forEach((word) => {
    if (wordsB.has(word)) shared++;
  });

  return shared / Math.max(wordsA.size, wordsB.size);
}

function findMatchingReply(text) {
  const replies = currentScenario().replies[currentLanguage()];
  let best = null;
  let bestScore = 0;

  replies.forEach(([phrase, translation, key]) => {
    const score = similarity(text, phrase);
    if (score > bestScore) {
      bestScore = score;
      best = { phrase, translation, key, score };
    }
  });

  return best;
}

function sendAnswer(text, selectedKey = null, knownTranslation = null) {
  const answer = text.trim();
  if (!answer) return;

  const scenario = currentScenario();
  const lang = currentLanguage();
  const match = selectedKey
    ? {
        key: selectedKey,
        phrase: answer,
        translation: knownTranslation,
        score: 1
      }
    : findMatchingReply(answer);

  makeMessage(answer, "Your response", true);
  turns++;

  let responseText;
  let responseTranslation;
  let feedback;

  if (match && match.score >= 0.5 && scenario.responses[match.key]) {
    correctTurns++;
    phrasesLearned.add(match.key);
    [responseText, responseTranslation] = scenario.responses[match.key];

    feedback = match.score === 1
      ? "Good choice — you used a phrase from this lesson."
      : "Your response resembles a lesson phrase. This is a text-match score, not a pronunciation score.";
  } else {
    responseText = getLevel() === "beginner"
      ? "अच्छा प्रयास! एक सुझाया हुआ वाक्य चुनकर फिर कोशिश करें।"
      : "Good attempt. Try a suggested phrase or rephrase your response.";
    responseTranslation = "Try one of the suggested responses below.";
    feedback = "This practice version matches predefined phrases; it does not understand every free-form sentence.";
  }

  makeMessage(responseText, responseTranslation, false, { feedback });
  updateProgress();

  if (turns % 2 === 0) {
    const followUp = getLevel() === "advanced"
      ? scenario.followUp
      : scenario.followUpEnglish;

    makeMessage(
      followUp,
      getLevel() === "advanced" ? scenario.followUpEnglish : "Keep the conversation going."
    );
  }

  if (lang === "raj" && match) {
    $("#voiceStatus").textContent =
      "Rajasthani examples use Hindi speech playback when a suitable voice is available.";
  }
}

function updateProgress() {
  const score = turns === 0 ? 0 : Math.round((correctTurns / turns) * 100);
  $("#scoreValue").textContent = score;
  $("#progressFill").style.width = `${score}%`;
  $("#turnCount").textContent = turns;
  $("#phraseCount").textContent = phrasesLearned.size;
}

function speak(text) {
  if (!("speechSynthesis" in window)) {
    voiceStatus.textContent = "Speech playback isn't supported by this browser.";
    return;
  }

  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = speechCode();
  utterance.rate = getLevel() === "beginner" ? 0.8 : 0.95;

  utterance.onstart = () => {
    voiceStatus.textContent = "Playing phrase…";
  };

  utterance.onend = () => {
    voiceStatus.textContent = "Phrase playback finished.";
  };

  utterance.onerror = () => {
    voiceStatus.textContent = "Couldn't play this phrase. Check your browser's voices.";
  };

  window.speechSynthesis.speak(utterance);
}

function startListening() {
  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;

  if (!SpeechRecognition) {
    voiceStatus.textContent =
      "Voice input isn't available here. Type your answer instead.";
    return;
  }

  if (listening && recognition) {
    recognition.stop();
    return;
  }

  recognition = new SpeechRecognition();
  recognition.lang = speechCode();
  recognition.interimResults = false;
  recognition.maxAlternatives = 3;

  recognition.onstart = () => {
    listening = true;
    $("#micBtn").innerHTML = "<span>■</span> Stop listening";
    voiceStatus.textContent = "Listening… speak clearly.";
  };

  recognition.onresult = (event) => {
    const result = event.results[0][0];
    messageInput.value = result.transcript;
    voiceStatus.textContent =
      `Recognised: "${result.transcript}" — confidence ${Math.round(result.confidence * 100)}%.`;

    // Recognition confidence describes the speech recogniser's estimate.
    // It is not a pronunciation-quality score.
  };

  recognition.onerror = (event) => {
    voiceStatus.textContent = event.error === "not-allowed"
      ? "Microphone permission was denied. Allow access in your browser."
      : `Voice input unavailable: ${event.error}. You can type instead.`;
  };

  recognition.onend = () => {
    listening = false;
    $("#micBtn").innerHTML = "<span>🎙</span> Speak your answer";
  };

  try {
    recognition.start();
  } catch (error) {
    voiceStatus.textContent = "Couldn't start the microphone. Please try again.";
  }
}

function renderQuiz() {
  const item = quizQuestions[currentQuiz];
  quizAnswered = false;

  $("#quizQuestion").textContent = item.question;
  $("#quizFeedback").textContent = "";
  $("#nextQuizBtn").textContent = "Next question →";
  $("#nextQuizBtn").disabled = false;

  const options = $("#quizOptions");
  options.replaceChildren();

  item.options.forEach((option, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "quiz-option";
    button.textContent = option;

    button.addEventListener("click", () => {
      if (quizAnswered) return;
      quizAnswered = true;

      const buttons = [...options.querySelectorAll("button")];
      buttons.forEach((candidate, i) => {
        candidate.disabled = true;
        if (i === item.answer) candidate.classList.add("correct");
      });

      if (index !== item.answer) {
        button.classList.add("incorrect");
      }

      $("#quizFeedback").textContent =
        (index === item.answer ? "Correct! " : "Not quite. ") +
        item.explanation;

      $("#nextQuizBtn").textContent =
        currentQuiz === quizQuestions.length - 1
          ? "Start quiz again ↻"
          : "Next question →";
    });

    options.appendChild(button);
  });
}

chatForm.addEventListener("submit", (event) => {
  event.preventDefault();
  sendAnswer(messageInput.value);
  messageInput.value = "";
  messageInput.focus();
});

$("#startBtn").addEventListener("click", () => {
  resetConversation();
  $("#scenarioTitle").scrollIntoView({ behavior: "smooth", block: "nearest" });
});

$("#micBtn").addEventListener("click", startListening);

$("#nextQuizBtn").addEventListener("click", () => {
  currentQuiz = (currentQuiz + 1) % quizQuestions.length;
  renderQuiz();
});

[languageSelect, levelSelect, scenarioSelect].forEach((control) => {
  control.addEventListener("change", resetConversation);
});

document.addEventListener("click", (event) => {
  const button = event.target.closest("[data-speak]");
  if (button) speak(button.dataset.speak);
});

resetConversation();
renderQuiz();
