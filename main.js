
console.log('main.js loaded');

const state = {
  questions: [],
  currentQuestion: 0,
  answerTally: {
    foundation: 0,
    krypton: 0,
    mandalorian: 0,
    ringsOfPower: 0,
    expanse: 0,
    westworld: 0
  }
}

// load data from assets/data/questions.json
$.getJSON("assets/data/questions.json", function(data) {
  console.log(data);
  state.questions = data;
  state.questions.shuffle();
  renderQuestion();
});








function getAnswer() {
  return $("input[name='answer']:checked").val();
}

function resetCheckedOption() {
  for (let i = 1; i <= 6; i++) {
    $(`#answer${i}`).prop("checked", false);
  }
  $("#none-selected").prop("checked", true);
}





$("#submit-answer-button").on("click", function() {
  
  const answer = getAnswer();

  if (answer === "none-selected") {
    console.error("No answer selected!");
    return;
  }
  
  if (state.answerTally[answer] !== undefined) {
    state.answerTally[answer]++;
  } else {
    console.error(`Unknown answer option: ${answer}`);
  }
  console.log(state.answerTally);

  renderQuestion();

});


function renderQuestion() {
  if (state.currentQuestion >= state.questions.length) {
    tallyResults();
    console.error("No more questions!");
    return;
  }

  const question = state.questions[state.currentQuestion++];
  const questionText = question.prompt;
  const questionId = question.id;
  // const answers = question.answers;

  // set question
  $("#question-text").text(questionText);

  // if last question, change button text
  // to "submit"
  $("#submit-answer-button").text(state.currentQuestion === state.questions.length ? "Submit" : "Next");
  
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
      ? `<img class="answer-label-image" src="assets/data/images/${answerKey}/${questionId}.jpg" />`
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

function tallyResults() {
  console.log("tallying results");

  const results = Object.entries(state.answerTally);
  results.sort(function(a, b) {
    return b[1] - a[1];
  });

  console.log(results);

  const topResult = results[0];
  const topResultKey = topResult[0];
  const topResultValue = topResult[1];

  const secondResult = results[1];
  const secondResultKey = secondResult[0];
  const secondResultValue = secondResult[1];

  const thirdResult = results[2];
  const thirdResultKey = thirdResult[0];
  const thirdResultValue = thirdResult[1];

  $("#result-1").text(`${topResultKey}: ${topResultValue}`);
  $("#result-2").text(`${secondResultKey}: ${secondResultValue}`);
  $("#result-3").text(`${thirdResultKey}: ${thirdResultValue}`);

  $("#results").show();
}

