
console.log('main.js loaded');

function getAnswer() {
  return $("input[name='answer']:checked").val();
}

function resetCheckedOption() {
  for (let i = 1; i <= 6; i++) {
    $(`#answer${i}`).prop("checked", false);
  }
  $("#none-selected").prop("checked", true);
}


const answerTally = {
  foundation: 0,
  krypton: 0,
  mandalorian: 0,
  ringsOfPower: 0,
  expanse: 0,
  westworld: 0
}


$("#submit-answer-button").on("click", function() {
  
  const answer = getAnswer();

  if (answer === "none-selected") {
    console.error("No answer selected!");
    return;
  }
  
  if (answerTally[answer] !== undefined) {
    answerTally[answer]++;
  } else {
    console.error(`Unknown answer: ${answer}`);
  }
  console.log(answerTally);

  renderQuestion();

});

const movies = {
  foundation: 1
}

var currentQuestion = 0;


function renderQuestion() {
  if (currentQuestion >= questions.length) {
    console.error("No more questions!");
    return;
  }

  const question = questions[currentQuestion++];
  const questionText = question.prompt;
  const questionId = question.id;
  // const answers = question.answers;

  // set question
  $("#question-text").text(questionText);
  
  // reset checked option

  $("input[name='answer']:checked").checked = false;
  resetCheckedOption();
  $("#none-selected").checked = true;

  // randomize order of answers!!
  question.answers.shuffle();

  // set answers
  let option = 1;
  question.answers.forEach(function(answer) {
    const answerKey = answer.key;
    const answerText = answer.value;
    

    $(`#answer${option}`).val(answerKey);

    const innerHtml =  answerText === ""
      ? `<img class="answer-label-image" src="assets/images/${answerKey}/${questionId}.jpg" />`
      : `<p class="answer-label-text">${answerText}</p>`;

    $(`#answer${option}-label`).empty();
    $(`#answer${option}-label`).append(innerHtml);

    option++;

  });
}

Array.prototype.shuffle = function() {
  if (this.length < 2) return;

  let swaps = this.length;

  while (swaps > 0) {
    const index1 = Math.floor(Math.random() * this.length);
    const index2 = Math.floor(Math.random() * this.length);

    const temp = this[index1];
    this[index1] = this[index2];
    this[index2] = temp;

    swaps--;
  }
}


// questions

const questions = [
  {
    id: 1,
    prompt: "Which image most resonates with you?",
    answers: [
      {
        key: "foundation",
        value: "",
      },
      {
        key: "krypton",
        value: "",
      },
      {
        key: "mandalorian",
        value: "",
      },
      {
        key: "ringsOfPower",
        value: "",
      },
      {
        key: "expanse",
        value: "",
      },
      {
        key: "westworld",
        value: "",
      }
    ]
  },
  {
    id: 2,
    prompt: "Which image most resonates with you?",
    answers: [
      {
        key: "foundation",
        value: "",
      },
      {
        key: "krypton",
        value: "",
      },
      {
        key: "mandalorian",
        value: "",
      },
      {
        key: "ringsOfPower",
        value: "",
      },
      {
        key: "expanse",
        value: "",
      },
      {
        key: "westworld",
        value: "",
      }
    ]
  },
  {
    id: 3,
    prompt: "Which image most resonates with you?",
    answers: [
      {
        key: "foundation",
        value: "",
      },
      {
        key: "krypton",
        value: "",
      },
      {
        key: "mandalorian",
        value: "",
      },
      {
        key: "ringsOfPower",
        value: "",
      },
      {
        key: "expanse",
        value: "",
      },
      {
        key: "westworld",
        value: "",
      }
    ]
  },
  {
    id: 4,
    prompt: "Which image most resonates with you?",
    answers: [
      {
        key: "foundation",
        value: "",
      },
      {
        key: "krypton",
        value: "",
      },
      {
        key: "mandalorian",
        value: "",
      },
      {
        key: "ringsOfPower",
        value: "",
      },
      {
        key: "expanse",
        value: "",
      },
      {
        key: "westworld",
        value: "",
      }
    ]
  },
  {
    id: 5,
    prompt: "Which image most resonates with you?",
    answers: [
      {
        key: "foundation",
        value: "",
      },
      {
        key: "krypton",
        value: "",
      },
      {
        key: "mandalorian",
        value: "",
      },
      {
        key: "ringsOfPower",
        value: "",
      },
      {
        key: "expanse",
        value: "",
      },
      {
        key: "westworld",
        value: "",
      }
    ]
  },
  {
    id: 6,
    prompt: "Which image most resonates with you?",
    answers: [
      {
        key: "foundation",
        value: "",
      },
      {
        key: "krypton",
        value: "",
      },
      {
        key: "mandalorian",
        value: "",
      },
      {
        key: "ringsOfPower",
        value: "",
      },
      {
        key: "expanse",
        value: "",
      },
      {
        key: "westworld",
        value: "",
      }
    ]
  }
  ,{
    id: 7,
    prompt: "Which image most resonates with you?",
    answers: [
      {
        key: "foundation",
        value: "",
      },
      {
        key: "krypton",
        value: "",
      },
      {
        key: "mandalorian",
        value: "",
      },
      {
        key: "ringsOfPower",
        value: "",
      },
      {
        key: "expanse",
        value: "",
      },
      {
        key: "westworld",
        value: "",
      }
    ]
  }
  ,{
    id: 8,
    prompt: "Which image most resonates with you?",
    answers: [
      {
        key: "foundation",
        value: "",
      },
      {
        key: "krypton",
        value: "",
      },
      {
        key: "mandalorian",
        value: "",
      },
      {
        key: "ringsOfPower",
        value: "",
      },
      {
        key: "expanse",
        value: "",
      },
      {
        key: "westworld",
        value: "",
      }
    ]
  }
]
