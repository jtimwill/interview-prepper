// https://developers.google.com/web/updates/2014/01/Web-apps-that-talk-Introduction-to-the-Speech-Synthesis-API
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
// https://stackoverflow.com/questions/9778888/uncaught-typeerror-cannot-set-property-onclick-of-null
// https://stackoverflow.com/questions/15574305/setattributesrc-page-html-is-not-working


window.onload = function() {
  let images = [
    'http://i.imgur.com/1wbgdEe.gif',
    'https://www.shemazing.net/wp-content/uploads/2015/06/wtf2_zpsdf922240.gif'
  ];

  let hundreths = 0;
  let seconds = 0;
  let minutes = 0;
  let state = 'reset';
  let replay_button = document.getElementById("replay");
  let play_button = document.getElementById("play");
  let next_button = document.getElementById("next");

  let questions = [
    "Tell me about yourself",
    "Why do you want to work here?",
    "What are your strengths?"
  ];
  let total_questions = questions.length;

  let answered = 0;

  function randomIndex(len) {
    return Math.floor(Math.random() * len);
  }

  function remove_question(array, index) {
    return array.slice(0,index).concat(array.slice(index+1));
  }


  // Duplicate
  let random_index = randomIndex(questions.length);
  let msg = new SpeechSynthesisUtterance(questions[random_index]);
  answered = 0;
  questions = remove_question(questions, random_index);
  // Duplicate


  replay_button.onclick = function() {
    speechSynthesis.speak(msg);
  }

  next_button.onclick = function() {
    // Duplicate
    random_index = randomIndex(questions.length);
    msg = new SpeechSynthesisUtterance(questions[random_index]);
    questions = remove_question(questions, random_index);
    answered++;
    // Duplicate

    reset_timer();
    let element = document.getElementById('progress');
    element.innerHTML = "progress: " + ((answered/total_questions)*100).toPrecision(3) + "%";
    let gif = document.getElementById('img');
    gif.src = "";
  }


  function delay() {setTimeout(update_time, 10)};

  function update_time(){
    update_hundreths();
    output();
    if (state == 'playing') {
      delay();
    }
  }

  function update_hundreths(){
    if(hundreths == 99) {
      hundreths = 0;
      update_seconds();
    } else {
      hundreths++;
    }
  }

  function update_seconds() {
    if(seconds == 59) {
      seconds = 0;
      update_minutes();
    } else {
      seconds++;
    }
  }

  function update_minutes() {
    if(minutes == 59) {
      minutes = 0;
    } else {
      minutes++;
    }
  }

  function output(){
    let element = document.getElementById('timer');
    let text = d_digit_string(minutes) + ":" + d_digit_string(seconds) + ":" + d_digit_string(hundreths);
    element.innerHTML = text;
  }

  function d_digit_string(number){
    let string = number.toPrecision();
    if (string.length == 1) {
      string = "0" + string;
    }
    return string;
  }

  function reset_timer() {
    state = 'reset';
    hundreths = 0;
    seconds = 0;
    minutes = 0;
    output();
  }

  play_button.onclick = function () {
    let gif = document.getElementById('img');
    let element = document.getElementById('play');
    if (state == 'playing') {
      state = 'stopped'
      element.innerHTML = "Reset";
      gif.src = "";
    } else if (state == 'stopped') {
      state = 'reset';
      element.innerHTML = "Start";
      reset_timer();
      gif.src = "";
    } else if (state == 'reset') {
      state = 'playing';
      element.innerHTML = "Pause";
      gif.src = images[randomIndex(images.length)];
      delay();
    }
  }
};
