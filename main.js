
function getAnswer() {
  return $("input[name='answer']:checked").val();
}

function resetCheckedOption() {
  for (let i = 1; i <= 6; i++) {
    $(`#answer${i}`).prop("checked", false);
  }
  $("#none-selected").prop("checked", true);
}


class State {
  constructor() {
    this.questions = [];
    this.currentQuestion = 0;
    this.answerCounts = {
      foundation: 0,
      krypton: 0,
      mandalorian: 0,
      ringsOfPower: 0,
      expanse: 0,
      westworld: 0
    };

    this.METADATA = {
      foundation: {
        name: "Foundation",
        description: "The Foundation series is a science fiction series by Isaac Asimov. It is set in a far future Galactic Empire, where the Foundation is a think tank dedicated to preserving the knowledge of the past and preventing the fall of the Empire. The series is set in the fictional galaxy of the Foundation universe, and is a prequel to Asimov's Robot series. The Foundation series is notable for its use of psychohistory, a fictional science of predicting the future based on the study of large-scale statistical data. The series is also notable for its use of the psychohistorian Hari Seldon, who is the protagonist of the first three books, and the Foundation itself, which is the setting of the first four books. The series is also notable for its use of the psychohistorian Hari Seldon, who is the protagonist of the first three books, and the Foundation itself, which is the setting of the first four books.",
        url: "https://tv.apple.com/us/show/foundation/umc.cmc.5983fipzqbicvrve6jdfep4x3?mttn3pid=Google%20AdWords&mttnagencyid=a5e&mttncc=US&mttnsiteid=143238&mttnsubad=OUS2019859_1-562857103871-c&mttnsubkw=104006946180__btoBqYLG",
        image: "assets/data/images/foundation/index.jpg"
      },
      krypton: {
        name: "Krypton",
        description: "Krypton is a misadventure about the upheavals on the planet of Krypton (surprise!) in the lead-up to superman's involuntary excursion to Earth",
        url: "https://www.syfy.com/krypton/watch",
        image: "assets/data/images/krypton/index.jpg"
      },
      mandalorian: {
        name: "The Mandalorian",
        description: "The Mandalorian is an American space Western web television series created by Jon Favreau and produced by Lucasfilm. The series is set five years after the fall of the Galactic Empire and follows the travails of a lone gunfighter in the outer reaches of the galaxy far from the authority of the New Republic. The Mandalorian is the first live-action Star Wars television series. The series premiered on Disney+ on November 12, 2019, and is produced by Lucasfilm and Favreau's production company, Favreau Films.",
        url: "https://www.disneyplus.com/welcome/the-mandalorian-season-3?cid=DSS-Search-Google-71700000059616279-&s_kwcid=AL!8468!3!649147814760!e!!g!!watch%20the%20mandalorian&gclid=CjwKCAjwitShBhA6EiwAq3RqA3LYYxMq1M-DSjB0QXoBrVXwgIkVQTl9K24cKlfuWfUS57W61cQRPxoC4eQQAvD_BwE&gclsrc=aw.ds",
        image: "assets/data/images/mandalorian/index.jpg"
      },
      ringsOfPower: {
        name: "Rings of Power",
        description: "Set thousands of years before the events of J.R.R. Tolkien’s The Lord of the Rings, this epic drama follows an ensemble cast of characters, both familiar and new, as they confront the long-feared re-emergence of evil to Middle-earth.",
        url: "https://www.amazon.com/dp/B09QH98YG1/?ref=dvm_us_dl_sl_go_ROPLAU22_mkw_sj0o8kGXy-dc&mrntrk=pcrid_618715577187_slid__pgrid_144239414607_pgeo_1021873_x__adext__ptid_kwd-1717316791436&gclid=CjwKCAjwitShBhA6EiwAq3RqAwHy_TQ2MqOA2UTYS_FdI05v5jxP2N7f0oR_FjLj1XDElJ46qVo2oRoCHEQQAvD_BwE",
        image: "assets/data/images/ringsOfPower/index.jpg"
      },
      expanse: {
        name: "The Expanse",
        description: "The disappearance of rich-girl-turned-political-activist Julie Mao links the lives of Ceres detective Joe Miller (Thomas Jane), accidental ship captain James Holden (Steven Strait) and U.N. politician Chrisjen Avasarala (Shohreh Aghdashloo). Amidst political tension between Earth, Mars and the Belt, they unravel the single greatest conspiracy of all time.",
        url: "https://www.amazon.com/gp/video/detail/B08B48L4CQ/ref=atv_dp_season_select_s1",
        image: "assets/data/images/expanse/index.jpg"
      },
      westworld: {
        name: "Westworld",
        description: "Westworld is an American science fiction western thriller television series created by Jonathan Nolan and Lisa Joy for HBO. The series is based on the 1973 film of the same name, which was written and directed by American novelist Michael Crichton. Jonathan Nolan and Lisa Joy serve as executive producers along with J. J. Abrams, Jerry Weintraub, Bryan Burk, and Richard J. Lewis. The series premiered on October 2, 2016, and concluded on December 15, 2020, after three seasons and thirty episodes. The series is set in a fictional, technologically advanced Wild West-themed amusement park populated by android hosts.",
        url: "https://www.hbo.com/westworld",
        image: "assets/data/images/westworld/index.jpg"
      },
    }

    // load data from assets/data/questions.json
    $.getJSON("assets/data/questions.json", (data) => {
      console.log(data);
      this.questions = data;
      this.questions.shuffle();
      this.next();
    });
  }

  next() {

    if (this.currentQuestion >= this.questions.length) {
      this.tally();
      console.error("No more questions!");

      toggleResults();
      return;
    }

    $("#progress-bar-fill").css("width", `${(this.currentQuestion / this.questions.length) * 100}%`);
  
    const question = this.questions[this.currentQuestion++];
    const questionText = question.prompt;
    const questionId = question.id;

    console.log(`question ID: ${question.id}`)
    // set question
    $("#question-text").text(questionText);
  
    // if last question, change button text to "submit"
    $("#submit-answer-button").text(this.currentQuestion === this.questions.length ? "Submit" : "Next");
    
    // reset checked option
    resetCheckedOption();
  
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

  reset() {
    this.currentQuestion = 0;
    this.answerCounts = {
      foundation: 0,
      krypton: 0,
      mandalorian: 0,
      ringsOfPower: 0,
      expanse: 0,
      westworld: 0
    };
    this.questions.shuffle();
    this.next();
  }

  tally() {
    console.log("tallying results");
  
    const results = Object.entries(this.answerCounts);
    results.sort(function(a, b) {
      return b[1] - a[1];
    });
  
    console.log(results);

    const res = [];
    results.forEach((result) => {
      res.push(result[0]);
    });
      
  
    const topResult = this.METADATA[results[0][0]];
    var topResultKey = topResult.name;
    const topResultValue = results[0][1];
  
    const secondResult = this.METADATA[results[1][0]];
    var secondResultKey = secondResult.name;
    const secondResultValue = results[1][1];
  
    const thirdResult = this.METADATA[results[2][0]];
    var thirdResultKey = thirdResult.name;
    const thirdResultValue = results[2][1];

    
  
    $("#results-tagline").text(`Watch (or re-watch) ${topResultKey}. The Oracle has spoken.`);
    $("#result1").text(`${topResultKey}: ${topResultValue}`);
    $("#result2").text(`${secondResultKey}: ${secondResultValue}`);
    $("#result3").text(`${thirdResultKey}: ${thirdResultValue}`);
  
    $("#results").show();
  }
}



Array.prototype.shuffle = function() {
  if (this.length >= 2) {
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
}

console.log('main.js loaded');
const state = new State();


main();


function main() {
  
  $.ajaxSetup({ async: false });

  state.next();
 
  $("#submit-answer-button").on("click", () => {
  
    const answer = getAnswer();
  
    if (answer === "none-selected") {
      console.error("No answer selected!");
      return;
    }
    
    if (state.answerCounts[answer] !== undefined) {
      const weight = state.questions[state.currentQuestion - 1].weight;
      state.answerCounts[answer] += weight;
    } else {
      console.error(`Unknown answer option: ${answer}`);
    }
  
    state.next();
  });

  $("#restart-button").on("click", () => {
    state.reset();
    // state.next();
  });

  $("#results-background").hide();
  $("#results-background").on("click", () => {
    state.reset();
    $("#results-background").hide();
  });
}

function toggleResults() {
  $("#results-background").show();
}

