$(function() {
  $('.marquee').marquee({

    //If you wish to always animate using jQuery
    allowCss3Support: true,
    //works when allowCss3Support is set to true - for full list see http://www.w3.org/TR/2013/WD-css3-transitions-20131119/#transition-timing-function
    css3easing: 'linear',
    //requires jQuery easing plugin. Default is 'linear'
    easing: 'linear',
    //pause time before the next animation turn in milliseconds
    delayBeforeStart: 1000,
    //'left', 'right', 'up' or 'down'
    direction: 'left',
    //true or false - should the marquee be duplicated to show an effect of continues flow
    duplicated: false,
    //speed in milliseconds of the marquee in milliseconds
    duration: 20000,
    //gap in pixels between the tickers
    gap: 20,
    //on cycle pause the marquee
    pauseOnCycle: false,
    //on hover pause the marquee - using jQuery plugin https://github.com/tobia/Pause
    pauseOnHover: false,
    //the marquee is visible initially positioned next to the border towards it will be moving
    startVisible: false
  });
});

var button = 0;
var iImage = -1;
var iTexto = -1;
var encoder = 0;
var encoder2 = 0;
var oldreading = 0;
var oldreading2 = 0;
var textos;


function setup() {

  callEncoderAPI();
  callEncoder2API();
  changerimage(1);
  changertexte(1);
  noCanvas();
}

function draw() {}

function callEncoderAPI() {
  var url = 'https://api.particle.io/v1/devices/1e0030000247353137323334/encodervalue?access_token=b303a5bd3e3d83f7eb559ef56730c7bef81a845d'
  loadJSON(url, parseEncoderData);
}

function callEncoder2API() {
  var url = 'https://api.particle.io/v1/devices/330024001347343438323536/encodervalue?access_token=b303a5bd3e3d83f7eb559ef56730c7bef81a845d'
  loadJSON(url, parseEncoder2Data);
}





function parseEncoderData(data) {

  encoder = data.result;
  //console.log("Encoder:" + encoder);

  //call API every 1000 milliseconds
  setTimeout(callEncoderAPI(), 100);
  // $("img").css("width", pot2 * 10);
  if (encoder > oldreading) {

    changerimage(-1);
    //changermenos();
  } else if (encoder < oldreading) {

    changerimage(1);

  } else if (encoder == oldreading) {
    // console.log('rien faire');
  }

  if (oldreading != encoder) {
    console.log("Encoder:" + encoder);
    oldreading = encoder;
  }


}

function parseEncoder2Data(data) {

  encoder2 = data.result;
  // console.log("Encoder2:" + encoder2);

  //call API every 500 milliseconds
  setTimeout(callEncoder2API(), 100);

  if (encoder2 > oldreading2) {

    changertexte(-1);

  } else if (encoder2 < oldreading2) {
    changertexte(1)

  } else if (encoder2 == oldreading2) {
    // console.log('rien faire');

  }
  if (oldreading2 != encoder2) {
    console.log("Encoder2:" + encoder2);
    oldreading2 = encoder2;
  }


}



function changerimage(direction) {
  var imgs = $("img");

  // Change l'image courante
  iImage = (iImage + direction + imgs.length) % imgs.length;
  console.log("new image: " + iImage);

  // ça cache toutes les images
  imgs.css("display", "none");

  // Afficher l'image courante
  $(imgs[iImage]).css("display", "block");

}

// function changermenos(){
//   var imgs = $("img");
//
//   // Change l'image courante
//   iImage = --iImage % imgs.length;
//
//   // ça cache toutes les images
//   imgs.css("display","none");
//
//   // Afficher l'image courante
//   $(imgs[iImage]).css("display","block");
//
// }

function changertexte(direction) {
  var textos = $("p");

  // Change texte courante
  iTexto = (iTexto + direction + textos.length) % textos.length;
  console.log("new text: " + iTexto);

  // ça cache toutes les images
  textos.css("display", "none");

  // Afficher l'image courante
  $(textos[iTexto]).css("display", "block");

}
// function changertextemenos(){
//   var textos = $("p");
//
//   // Change texte courante
//   iTexto = --iTexto % textos.length;
//
//   // ça cache toutes les images
//   textos.css("display","none");
//
//   // Afficher l'image courante
//   $(textos[iTexto]).css("display","block");
//
// }

var final_transcript = '';
var recognizing = false;
var ignore_onend;
var start_timestamp;

var grammar = '#JSGF V1.0; grammar wordsToFind; public <wordsToFind> = print | prince | train | trains | friend | friends';

// cherche les * car l'API remplace les insultes par des "***********"
var wordsToFind = ["print", "prince", "train", "trains", "friend", "friends"];


if ('webkitSpeechRecognition' in window) {


  var recognition = new webkitSpeechRecognition();
  recognition.lang = "en-US";
  recognition.continuous = true;
  recognition.interimResults = true;


  // Set grammar parameters
  var speechRecognitionList = new webkitSpeechGrammarList();
  speechRecognitionList.addFromString(grammar, 1);
  recognition.grammars = speechRecognitionList;
  // ne montre pas les résultats intermédiaires mais du coup prend plus de temps à afficher le résultat final
  // recognition.interimResults = false;
  recognition.maxAlternatives = 1;

  // affiche la variable grammar
  console.log(speechRecognitionList[0].src);

  recognition.onstart = function() {
    recognizing = true;
  };

  // permet de redémarrer la recognition quand elle s'arrête
  recognition.onend = function() {
    // recognizing = true;
    // console.log("je me suis arrêté");
    startButton(event);
  };



  recognition.onresult = function(event) {

    var interim_transcript = '';
    var last = event.results.length - 1;

    var foundWords = event.results[last][0].transcript;

    for (var i = 0; i < wordsToFind.length; i++) {

      var maRegex = new RegExp(wordsToFind[i], "gi");

      var monTableau;

      // Tant que l'on trouve un des mots de la liste dans les foundWords
      if ((monTableau = maRegex.exec(foundWords)) !== null) {
        console.log("il a dit " + maRegex + " !!!");

        window.print();



        // $("h2").append(foundWords);
      }
    }
    console.log("foundWords " + foundWords);
  };
}


function startButton(event) {

  recognition.stop();

  final_transcript = '';
  recognition.start();
}
