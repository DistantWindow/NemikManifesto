/*
Karis Nemik's Manifesto Firware
Created by Diego J. Arevalo.
2023 v 1.1
*/
var _initialized = false;
var _running = false;

const offsetCookieName = 'offset';
const offsetDefaultValue = 100;

var _zoomValue = 100;
const zoomCookieName = 'zoom';
const zoomDefaultValue = 100;
const zoomMaxValue = 195;
const zoomMinValue = 5;
const zoomIncrement = 3;

const AudioLanguage = {
    English: 0,
    Spanish: 1,
}
var _audioLanguage = "";
const audioLanguageDefaultValue = AudioLanguage.English;
const englishAudioID = "English.mp3";
const spanishAudioID = "Spanish.mp3";
const audioLanguageCookieName = 'audioLanguage';

function setup() {
    _initialized = true;
    setupZoom();
    setupDivManifestoOffset();
    createBars('bars', 'bar');
    createBars('barsDown', 'barDown');
    setupTableSymbol('black');
    document.getElementById('ManifestoMarqueeText').style.color = 'black';
    getAudioLanguage();
    setupAudioLanguage();
    pause();
}

function createBars(divTagName, innerDivTagName) {
    let divBars = document.getElementById(divTagName);
    for (let index = 0; index < 45; ++index) {
        let divBar = document.createElement("div");
        divBar.className = innerDivTagName;
        divBars.appendChild(divBar);
    }
}

function setupAudioLanguage() {
    let url = "audio" + getAudioLanguageID();
    nemiksManifestoAudioSource = document.getElementById('NemiksManifestoAudioSource');
    nemiksManifestoAudioSource.src = url;
    nemiksManifestoAudio = document.getElementById('NemiksManifestoAudio');
    nemiksManifestoAudio.load();
}

function getAudioLanguageID() {
    let audioLanguageID;
    if (_audioLanguage == AudioLanguage.English) {
        audioLanguageID = englishAudioID;
    }
    else if (_audioLanguage == AudioLanguage.Spanish) {
        audioLanguageID = spanishAudioID;
    }
    return audioLanguageID;
}

function pause() {
    stopAnimation();
    document.getElementById('NemiksManifestoAudio').pause();
}

const baseVolume = 1.0
let currVolume = baseVolume

function changeVolume() {
	if (currVolume>=baseVolume) {
	currVolume = 0
	} else {
	currVolume = currVolume + 0.2
	}
	let audioElem = document.getElementById('NemiksManifestoAudio');
	audioElem.volume=currVolume
}

function setupTableSymbol(backgroundColor) {
    let tableSymbol = document.getElementById('TableSymbolA');
    tableSymbol.style.backgroundColor = backgroundColor;
    tableSymbol = document.getElementById('TableSymbolB');
    tableSymbol.style.backgroundColor = backgroundColor;
}

function setupDivManifestoOffset() {
    let divManifestoOffset = document.getElementById('DivManifestoOffset');
    offsetValue = getOffset();
    divManifestoOffset.style.marginTop = offsetValue + "px";
}

function startStop() {
    if (!_running) { start(); }
    else { pause(); }
}

function start() {
    let color = 'rgb(145, 240, 249)';
    let manifestoMarqueeText = document.getElementById('ManifestoMarqueeText');
    manifestoMarqueeText.style.color = color;
    manifestoMarqueeText.start();
    document.getElementById('NemiksManifestoAudio').play();
    if (!_initialized)
        startAnimation();
    else
        setTimeout(startAnimation, 500);
    setupTableSymbol(color);
    _running = true;
    _initialized = false;
}

let fastColors = ["red", "black", "white","green"]
let slowColors = ["red", "black"]

function startAnimation() {
    let color = 'rgb(145, 240, 249)';
    document.getElementById('TableThinWindowCellDown').style.backgroundColor = color;
    let bars = document.getElementsByClassName("bars");
    for (let index = 0; index < bars.length; ++index) {
        bars[index].style.display = 'block';
	fastColors = ["red", "black", "white","green"]
	slowColors = ["red", "black"]
    tableFlasher();
    tableSlowFlasher();
    }
}

function stopAnimation() {
    document.getElementById('ManifestoMarqueeText').stop();
    document.getElementById('TableThinWindowCellDown').style.backgroundColor = 'black';
    let bars = document.getElementsByClassName("bars");
    for (let index = 0; index < bars.length; ++index) {
        bars[index].style.display = 'none';
    }
    _running = false;
	fastColors = ["black"]
	slowColors = ["black"]
}

function reset() {
    if (!_running) { window.location.reload(); }
}

function setupZoom() {
    _zoomValue = getZoom();
    if (_zoomValue > zoomMaxValue) { _zoomValue = zoomMaxValue; }
    if (_zoomValue < zoomMinValue) { _zoomValue = zoomMinValue; }
    setZoomValue();
}

function getZoom() {
    let defaultZoomValue = zoomDefaultValue;
    let zoomValue = getCookie(zoomCookieName);
    if (zoomValue === "") { zoomValue = defaultZoomValue; }
    return zoomValue;
}

function zoomOut() {
    _zoomValue += zoomIncrement;
    if (_zoomValue > zoomMaxValue) { _zoomValue = zoomMaxValue; }
    setZoomValue();
    saveZoom();
}

function zoomIn() {
    _zoomValue -= zoomIncrement;
    if (_zoomValue < zoomMinValue) { _zoomValue = zoomMinValue; }
    setZoomValue();
    saveZoom();
}

function setZoomValue() {
    let zoomValue = _zoomValue + "%";
    document.getElementById('zoom').innerText = zoomValue;
    document.body.style.zoom = zoomValue;
}

function saveZoom() { setCookie(zoomCookieName, _zoomValue, 365); }

function loadSetup() {
    loadOffsetSetup();
    loadAudioLanguageSetup();
}

function loadOffsetSetup() {
    let offsetValue = getOffset();
    let offsetInput = document.getElementById(offsetCookieName);
    offsetInput.value = offsetValue;
}

function saveOffset() {
    let offsetInput = document.getElementById(offsetCookieName);
    let offsetValue = offsetInput.value;
    setCookie(offsetCookieName, offsetValue, 365);
}

function resetOffset() {
    let offsetInput = document.getElementById(offsetCookieName);
    offsetInput.value = offsetDefaultValue;
    setCookie(offsetCookieName, offsetDefaultValue, 365);
}

function getOffset() {
    let defaultOffsetValue = offsetDefaultValue;
    let offsetValue = getCookie(offsetCookieName);
    if (offsetValue === "") { offsetValue = defaultOffsetValue; }
    return offsetValue;
}

function loadAudioLanguageSetup() {
    getAudioLanguage();
    let audioLanguageSelect = document.getElementById(audioLanguageCookieName);
    audioLanguageSelect.value = _audioLanguage;
}

function getAudioLanguage() {
    _audioLanguage = getCookie(audioLanguageCookieName);
    if (_audioLanguage === "") { _audioLanguage = AudioLanguage.English; }
}

function saveAudioLanguage() {
    let audioLanguageSelect = document.getElementById(audioLanguageCookieName);
    _audioLanguage = audioLanguageSelect.value;
    setCookie(audioLanguageCookieName, _audioLanguage, 365);
}

function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let list = decodedCookie.split(';');
    for (let index = 0; index < list.length; index++) {
        let char = list[index];
        while (char.charAt(0) == ' ') {
            char = char.substring(1);
        }
        if (char.indexOf(name) == 0) {
            return char.substring(name.length, char.length);
        }
    }
    return "";
}

function setCookie(cname, cvalue, exdays) {
    const date = new Date();
    date.setTime(date.getTime() + (exdays * 24 * 60 * 60 * 1000));
    let expires = "expires=" + date.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}
function getRandomInterval(min, max) {
      return Math.random() * (max - min) + min;
    }

function tableFlasher() {
      const cell = document.getElementById("TableFlasherCell");
      let count = 0;
      const maxCount = 20;
      const intervalDuration = 3000; // 5 seconds in milliseconds

      function flashCell() {
        if (count >= maxCount) {
          cell.style.backgroundColor = "black"; // Reset the background color after the last flash
          count = 0; // Reset the count to start again
          setTimeout(flashCell, intervalDuration);
        } else {
          const randomInterval = getRandomInterval(35, 1200); // Random interval between 0.1 to 1.2 seconds
          setTimeout(function () {
            cell.style.backgroundColor = getColorByCount(count);
            count++;
            flashCell();
          }, randomInterval);
        }
      }

      function getColorByCount(count) {
        let colors = fastColors;
        return colors[count % colors.length];
      }

      flashCell();
    }

function tableSlowFlasher() {
      const slowCell = document.getElementById("TableFlasherCellSlow");
      let count = 0;
      const maxCount = 125;
      const intervalDuration = 10000; // 10 seconds in milliseconds

      function flashSlowCell() {
        if (count >= maxCount) {
          slowCell.style.backgroundColor = "black"; // Reset the background color after the last flash
          count = 0; // Reset the count to start again
          setTimeout(flashCell, intervalDuration);
        } else {
          const randomInterval = getRandomInterval(1500, 4000); // Random interval between 1.5 to 4 seconds
          setTimeout(function () {
            slowCell.style.backgroundColor = getSlowColorByCount(count);
            count++;
            flashSlowCell();
          }, randomInterval);
        }
      }

      function getSlowColorByCount(count) {
        const colors = slowColors;
        return colors[count % colors.length];
      }

      flashSlowCell();
    }
	
let rotateChoice = 1;
function rotateColors() {
		if (rotateChoice >= 3) {
			rotateChoice=1
			} else {
			rotateChoice = rotateChoice+1
		}
		switch(rotateChoice) {
		case 1:
			fastColors = ["red", "black", "white","green"];
			slowColors = ["red", "black"];
			break;
		case 2:
			fastColors = ["red"];
			slowColors = ["red"];		
			break;
		case 3:
			fastColors = ["black"];
			slowColors = ["black"];
			break;		
		
	}
	}
