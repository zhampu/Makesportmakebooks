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

    function getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max));
    };

    changerimage(getRandomInt(20));
    changertexte(getRandomInt(20));
    // window.addEventListener("load", startButton(event));

    noCanvas();
}


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
    //call API every 100 milliseconds
    setTimeout(callEncoderAPI(), 100);
    if (encoder > oldreading) {
        changerimage(-1);

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
    //call API every 100 milliseconds
    setTimeout(callEncoder2API(), 100);
    if (encoder2 > oldreading2) {
        changertexte(-1);
    } else if (encoder2 < oldreading2) {
        changertexte(1);
    } else if (encoder2 == oldreading2) {
        // console.log('rien faire');
    }
    if (oldreading2 != encoder2) {
        console.log("Encoder2:" + encoder2);
        oldreading2 = encoder2;
    }
}

function changerimage(direction) {
    // var imgs = $("img");
    const imgs = document.querySelectorAll("img");
    // Change l'image courante
    iImage = (iImage + direction + imgs.length) % imgs.length;
    for (let i = 0; i < imgs.length; i++) {
        imgs[i].style.display = "none";
    }
    imgs[iImage].style.display = "block";
}

function changertexte(direction) {
    const textos = document.querySelectorAll("p");
    // Change texte courante
    iTexto = (iTexto + direction + textos.length) % textos.length;
    for (let i = 0; i < textos.length; i++) {
        textos[i].style.display = "none";
    }
    textos[iTexto].style.display = "block";
}

// var final_transcript = '';
// var recognizing = false;
// var grammar = '#JSGF V1.0; grammar wordsToFind; public <wordsToFind> = print | train | trains | friend | friends';
// var wordsToFind = ["print","train", "trains", "friend", "friends"];
// if ('webkitSpeechRecognition' in window) {
//     var recognition = new webkitSpeechRecognition();
//     recognition.lang = "en-US";
//     recognition.continuous = true;
//     recognition.interimResults = true;
//     // Set grammar parameters
//     var speechRecognitionList = new webkitSpeechGrammarList();
//     speechRecognitionList.addFromString(grammar, 1);
//     recognition.grammars = speechRecognitionList;
//     recognition.maxAlternatives = 1;
//     // affiche la variable grammar
//     console.log(speechRecognitionList[0].src);
//     recognition.onstart = function () {
//         recognizing = true;
//     };
//     // permet de redémarrer la recognition quand elle s'arrête
//     recognition.onend = function () {
//         recognizing = true;
//         console.log("je me suis arrêté");
//         startButton(event);
//     };
//     recognition.onresult = function (event) {
//
//         var last = event.results.length - 1;
//         var foundWords = event.results[last][0].transcript;
//         for (var i = 0; i < wordsToFind.length; i++) {
//             var maRegex = new RegExp(wordsToFind[i], "gi");
//             var monTableau;
//             // Tant que l'on trouve un des mots de la liste dans les foundWords
//             if ((monTableau = maRegex.exec(foundWords)) !== null) {
//                 console.log("he said " + maRegex + " !!!");
//                 window.print();
//                 // $("h2").append(foundWords);
//             }
//         }
//         console.log("foundWords " + foundWords);
//     };
// }
//
// function startButton(event) {
//     recognition.stop();
//     final_transcript = '';
//     recognition.start();
// }


if (annyang) {
    var commands = {
        'print': function () {
            window.print();
        }
    };
    annyang.addCommands(commands);
    annyang.start();
}

// Key pressed to change images

document.addEventListener("keydown", function (event) {
    event.preventDefault();
    const key = event.key; // "ArrowRight", "ArrowLeft", "ArrowUp", or "ArrowDown"
    console.log(key);
    switch (key) { // change to event.key to key to use the above variable
        case "ArrowLeft":
            // Left pressed
            changertexte(-1)
            break;
        case "ArrowRight":
            // Right pressed
            changertexte(1);
            break;
        case "ArrowUp":
            // Up pressed
            changerimage(1);
            break;
        case "ArrowDown":
            // Down pressed
            changerimage(-1);
            break;
    }
});


