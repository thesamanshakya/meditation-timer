var displayArea = document.getElementById('timer'),
btnAction = document.getElementById('btn-action'),
wrapper = document.getElementById('wrapper'),
bodyElem = document.getElementsByTagName('body')[0],
menuOpener = document.getElementById('menu-opener'),
navContainer = document.getElementById('nav-container'),
isRunning = false,
intervalSwitch = document.getElementById('switch'),
intervalLabel = document.getElementById('interval-label'),
settingCog = document.getElementById('setting-cog'),
instructionCheck = document.getElementById('instruction-check'),
customAudioCheck = document.getElementById('instruction-custom'),
instructionDropdown = document.getElementById('dropdown-instruction'),
customAudioFile = document.getElementById('current-audio'), 
customPlayingElem = document.getElementById('c-playing'),
customAudioTxt = document.getElementById('custom-audio-text'),
    // postInstructionCheck = document.getElementById('post-instruction-check'),
    myTimer,
    myPresets = {
        duration: 10,
        extraTime: 0,
        intervalBell: false,
        instructionAudio: false,
        instructionType: 0,
        customAudio: false,
        // postInstructionAudio: false,
        bell: 0
    },
    totalTime = myPresets.duration * 60,
    colorTheme = [
    "purple",
    "red",
    "blue",
    "pink",
    "green"
    ],
    customAudioFileName,
    bellSound,
    customSound,
    instructionSound,
    instructionType,
    // postInstructionSound,
    n = 0,
    bellSoundList = [
    "gong-1",
    "gong-2",
    "gong-3",
    "sn-goenka"
    ],
    instructionsList = [
    "anapan-goenka-1",
    "anapan-goenka-2"
    ];

    setBellSound(n);
    function setBellSound(n) {
        bellSound = new Audio('media/bell/' + bellSoundList[n] + '.mp3');
        myPresets.bell = n;
    }
    function setInstructionAudio(n) {
        //check if custom audio - currently set as 100 value
        if(n == 100) {
            myPresets.customAudio = true;
        } else {
            instructionSound = new Audio('media/instructions/' + instructionsList[n] + '.mp3');            
        }
        myPresets.instructionType = n;
    }
// function setPostInstructionAudio() {
//     postInstructionSound = new Audio('media/instructions/mangal-maitri.mp3');
// }
colorTheme = colorTheme[Math.floor(Math.random() * colorTheme.length)];
bodyElem.classList.add(colorTheme);
// nosleep js begin
var noSleep = new NoSleep();
var wakeLockEnabled = false;

var intervalTxtArea = document.getElementById('int-bell');

var quotesList = [
'\"If you can breathe, you can meditate.\"<span>- Ajah Chah</span>',
'\"Peace comes from within. Do not seek it without.\"<span> - The Buddha</span>',
'\"Calmness of mind is one of the beautiful jewels of wisdom.\"<span> - James Allen</span>',
'\"Whatever is fluid, soft, and yielding will overcome whatever is rigid and hard. What is soft is strong.\"<span> - Lao Tzu</span>',
'\"When meditation is mastered, the mind is unwavering like the flame of a candle in a windless place.\"<span> - Bhagavad Gita</span>',
'\"The best meditation is effortless. The best meditation is a gentle awareness.\"<span> - Maxime Lagacé</span>',
'\"Inward calm cannot be maintained unless physical strength is constantly and intelligently replenished.\"<span> - The Buddha</span>',
'\"Learn to be calm and you will always be happy.\"<span> - Paramahansa Yogananda</span>',
'\"You will always be getting praise and blame, but do not let either affect the poise of the mind.\"<span> - The Buddha</span>',
'\"Do not dwell in the past, do not dream of the future, concentrate the mind on the present moment.\"<span> -  The Buddha</span>',
'\"Feelings come and go like clouds in a windy sky. Conscious breathing is my anchor.\"<span> - Thich Nhat Hahn</span>',
'\"To understand the immeasurable, the mind must be extraordinarily quiet, still.\"<span> - Jiddu Krishnamurti</span>',
'\"Meditation is like a gym in which you develop the powerful mental muscles of calm and insight.\"<span> - Ajahn Brahm</span>',
'\"The act of meditation is being spacious.\"<span> - Sogyal Rinpoche</span>',
'\"We must experience the Truth in a direct, practical and real way. This is only possible in the stillness and silence of the mind; and this is achieved by means of meditation.\"<span> - Samael Aun Weor</span>',
'\"If the mind falls asleep, awaken it. Then if it starts wandering, make it quiet. If you reach the state where there is neither sleep nor movement of mind, stay still in that, the natural (real) state.\"<span> - Ramana Maharshi</span>',
'\"The more regularly and the more deeply you meditate, the sooner you will find yourself acting always from a center of peace.\"<span> - J. Donald Walters</span>',
'\"The trouble is, you think you have time.\"<span> - The Buddha</span>',
'\"Believe nothing, no matter where you read it, or who said it, no matter if I have said it, unless it agrees with your own reason and your own common sense.\"<span> - The Buddha</span>',
'\"No one saves us but ourselves. No one can and no one may. We ourselves must walk the path.\"<span> - The Buddha</span>',
'\"The root of suffering is attachment.\"<span> - The Buddha</span>',
'\"Your goal is not to battle with the mind, but to witness the mind.\"<span> - Swami Muktananda</span>',
'\"To understand the immeasurable, the mind must be extraordinarily quiet, still. \"<span> - Jiddu Krishnamurti</span>',
'\"Learn this from water: loud splashes the brook but the oceans depth are calm.\"<span> - The Buddha</span>',
'\"You only lose what you cling to.\"<span> - The Buddha</span>',
'\"The past is already gone, the future is not yet here. There’s only one moment for you to live.\"<span> - The Buddha</span>',
'\"Holding onto anger is like drinking poison and expecting the other person to die.\"<span> - The Buddha</span>',
'\"What you think, you become. What you feel, you attract. What you imagine, you create.\"<span> - The Buddha</span>',
'\"No one saves us but ourselves. No one can and no one may. We ourselves must walk the path.\"<span> - The Buddha</span>',
'\"If you are quiet enough, you will hear the flow of the universe. You will feel its rhythm. Go with this flow. Happiness lies ahead. Meditation is key.\"<span> - The Buddha</span>',
'\"To conquer oneself is a greater task than conquering others.\"<span> - The Buddha</span>',
'\"Purity or impurity depends on oneself. No one can purify another.\"<span> - The Buddha</span>',
'\"Work out your own salvation. Do not depend on others.\"<span> - The Buddha</span>',
'\"Your worst enemy cannot harm you as much as your own unguarded thoughts.\"<span> - The Buddha</span>',
'\"You will not be punished for your anger, you will be punished by your anger.\"<span> - The Buddha</span>',
'\"Nothing is permanent.\"<span> - The Buddha</span>',
'\"Thousands of candles can be lit from a single candle, and the life of the candle will not be shortened. Happiness never decreases by being shared.\"<span> - The Buddha</span>',
'\"There is no path to happiness. Happiness is the path.\"<span> - The Buddha</span>',
'\"Happiness does not depend on what you have or who you are. It solely relies on what you think.\"<span> - The Buddha</span>',
'\"Happiness is not having a lot. Happiness is giving a lot.\"<span> - The Buddha</span>',
'\"If you truly loved yourself, you could never hurt another.\"<span> - The Buddha</span>',
'\"There is no path to happiness. Happiness is the path.\"<span> - The Buddha</span>'
];

function startTimer(duration, display) {
    var timer = duration,
    hours, minutes, seconds;
    myTimer = setInterval(function () {
        hours = parseInt((timer / 60) / 60);
        minutes = parseInt(timer / 60);
        seconds = parseInt(timer % 60);
        minutes = minutes >= 60 ? parseInt(minutes % 60) : minutes;
        hours = hours < 10 ? "0" + hours : hours;
        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;
        setDisplayArea(hours, minutes, seconds);
        //interval bell at half time
        if (myPresets.intervalBell && timer == (duration / 2)) {
            //if goenka. change the interval bell
            if (myPresets.bell == 3) {
                setBellSound(0);
                playbellSound();
                //when finished playing interval, set again to goenka sound
                setBellSound(1);
            } else {
                playbellSound();
            }
        }
        if (--timer < 0) completedAction();
    }, 1000);
}
function setDisplayArea(hours, minutes, seconds) {
    if (hours > 0) {
        displayArea.innerText = hours + ":" + minutes + ":" + seconds;
    }
    else {
        displayArea.innerText = minutes + ":" + seconds;
    }
}
function completedAction() {
    if (!!instructionSound) {
        instructionSound.pause();
        instructionSound.currentTime = 0;
    }
    if(myPresets.customAudio) {
        stopCustomAudio();
    }
    wrapper.classList.remove("running");
    bodyElem.classList.add(colorTheme);
    playbellSound();
    clearInterval(myTimer);
    displayArea.innerText = "Meditation completed!";
    displayArea.classList.add("animate__pulse");
    displayArea.classList.add("complete");
    btnAction.innerHTML = "<i class='icon-play-button'></i>";
    btnAction.classList.add('animate__pulse');
    isRunning = false;
    noSleep.disable();
    setTimeout(function () {
        timerParser(totalTime);
        displayArea.classList.remove("complete");
    }, 10000);
    // if(myPresets.postInstructionAudio){
    //     //if goenka bhavatu sabba mangalam, then wait
    //     if(myPresets.bell == 3){
    //         setTimeout(function(){
    //             postInstructionSound.play();
    //         }, 25000);            
    //     } else {
    //         setTimeout(function(){
    //             postInstructionSound.play();
    //         }, 5000);            
    //     }
    // }
}
function playbellSound() {
    bellSound.pause();
    bellSound.currentTime = 0;
    bellSound.play();
}
btnAction.addEventListener('click', function () {
    if(instructionCheck.checked && customAudioCheck.checked && customAudioFile.innerText == '') {
        alert('Please select your audio file first.');
        setTimeout(function(){
            settingCog.classList.add('active');
        }, 500);
        return;
    }    
    if (isRunning) {
        stopMeditationTimer();
    } else {
        startMeditationTimer();
    }
});

function startMeditationTimer() {
    // play button clicked
    wrapper.classList.add("running");
    bodyElem.className = '';
    //play instruction audio
    if (myPresets.instructionAudio) {       
        customPlayingElem.style.display = 'block';
        getInstructionType();
        if(myPresets.customAudio) { 
            playCustomAudio();
        } else {
            instructionSound.play();
        }
        // 100 = custom audio
        if(myPresets.instructionType !== 100) {
            customAudioTxt.innerHTML = myPresets.instructionType == 0 ? 'Anapana Meditation ENGLISH - S.N Goenka' : 'Anapana Meditation HINDI - S.N Goenka';
        } else {
            //show audio filename currently playing
            customAudioTxt.innerHTML = customAudioFileName;
        } 
    } else {
        //if not sn goenka play nothing in the beginning
        if (myPresets.bell == 3) {
            setBellSound(0);
            playbellSound();
                //when finished playing interval, set again to goenka sound
                setBellSound(1);
            } else {
                playbellSound();
            }
        }
        // if (!!postInstructionSound) {
        //     postInstructionSound.pause();
        //     postInstructionSound.currentTime = 0;
        // }
        startTimer(totalTime, displayArea);
        btnAction.innerHTML = "<i class='icon-stop-button'></i>";
        btnAction.classList.add('animate__pulse');
        isRunning = true;
        noSleep.enable(); // keep the screen on!
        setPreset();
    }
    function stopMeditationTimer() {
        //stop button clicked
        wrapper.classList.remove("running");
        customPlayingElem.style.display = 'none';
        bodyElem.classList.add(colorTheme);
        bellSound.pause();
        bellSound.currentTime = 0;
        if (!!instructionSound) {            
            instructionSound.pause();
            instructionSound.currentTime = 0;
        }
        if(myPresets.customAudio) {            
            stopCustomAudio();
        }
        timerParser(totalTime);
        clearInterval(myTimer);
        btnAction.innerHTML = "<i class='icon-play-button'></i>";
        btnAction.classList.remove('animate__pulse');
        isRunning = false;
        noSleep.disable();
    }
    function getInstructionType() {
        let instructionTypeArray = document.querySelectorAll(".instruction-type");
        instructionTypeArray.forEach(function (elem) {        
            if (elem.checked) {
            // 100 value is for Custom Audio
            if(parseInt(elem.value) !== 100) {
                myPresets.customAudio = false;
            }
            myPresets.instructionType = parseInt(elem.value);
            setInstructionAudio(parseInt(elem.value));
        }
    });
    }
//check click outside
document.addEventListener('click', function (event) {
    var isClickInside = settingCog.contains(event.target);
    if (!isClickInside) {
        //the click was outside the specifiedElement, do something
        settingCog.classList.remove("active");
    }
});
let presetsArray = document.querySelectorAll(".presets a");
let soundsArray = document.querySelectorAll(".bell-sound a");
let extraTimeArray = document.querySelectorAll(".presets i");
presetsArray.forEach(function (elem) {
    elem.addEventListener("click", function () {
        myPresets.extraTime = 0;
        myPresets.duration = parseInt(this.getAttribute("data-time"));
        document.querySelectorAll(".presets li.active")[0].classList.remove('active');
        this.parentNode.classList.add("active");
        totalTime = myPresets.duration * 60;
        timerParser(totalTime);

        //for interval bells
        if (myPresets.intervalBell) {
            intervalTxtArea.innerText = 'at ' + Math.floor(((totalTime / 60) / 2)) + ' mins';
        }
    });
});
soundsArray.forEach(function (elem, i) {
    elem.addEventListener("click", function () {
        bellSound.pause();
        bellSound.currentTime = 0;
        document.querySelectorAll(".bell-sound li.active")[0].classList.remove('active');
        this.parentNode.classList.add("active");
        setBellSound(i);
    });
});
//timeparser in seconds
function timerParser(totalTime) {
    var parsedTime = new Date(totalTime * 1000).toISOString();
    if ((totalTime / 60) < 60) {
        parsedTime = parsedTime.substr(14, 5);
    } else {
        parsedTime = parsedTime.substr(11, 8);
    }
    displayArea.innerText = parsedTime;
}
extraTimeArray.forEach(function (elem) {
    elem.addEventListener("click", function () {
        var setExtraTime = this.getAttribute("data-extra");
        myPresets.extraTime += parseInt(setExtraTime);
        totalTime = ((myPresets.extraTime + myPresets.duration) * 60);
        timerParser(totalTime);

        if (myPresets.intervalBell) {
            intervalTxtArea.innerText = 'at ' + Math.floor(((totalTime / 60) / 2)) + ' mins';
        }
    });
});
var quoteArea = document.getElementById("q-list");
quoteArea.innerHTML = quotesList[Math.floor(Math.random() * quotesList.length)];

// battery level
if (navigator.battery) getBatteryLevels(navigator.battery); else if (navigator.getBattery) navigator.getBattery().then(getBatteryLevels);
function getBatteryLevels(b) {
    readBattery(b);
    setInterval(function () {
        readBattery(b);
    }, 120000);
}
function readBattery(b) {
    document.getElementById('batt').style.opacity = "1";
    battery = b || battery;
    var percentage = parseFloat((battery.level * 100).toFixed(2)) + '%';
    document.getElementById('b-level').innerText = percentage;
    document.querySelector(".battery>span").style.width = percentage;
}
var isMenuOpen = false;
menuOpener.addEventListener('click', function (evt) {
    menuOpenClose(evt);
});
function menuOpenClose(evt) {
    if (!isMenuOpen) {
        navContainer.classList.add("active");
        isMenuOpen = true;
    } else {
        navContainer.classList.remove("active");
        isMenuOpen = false;
    }
}

//remember all settings
function setPreset() {
    if (typeof (Storage) !== "undefined") {
        localStorage.setItem("mypreset", JSON.stringify(myPresets));
    }
}
//Get Local Storage presets
if (typeof (Storage) !== "undefined") {
    var localPresets = JSON.parse(localStorage.getItem("mypreset"));
    if (!!localPresets) {
        setTimeout(function () {
            applyStoragePresets();
        }, 300);
    } else {
        applyDefaultPresets();
    }
} else {
    applyDefaultPresets();
}
function applyDefaultPresets() {
    document.querySelectorAll(".bell-sound li")[0].classList.add('active');
    document.querySelectorAll(".presets li")[0].classList.add('active');
    timerParser(totalTime);
}
function applyStoragePresets() {
    myPresets = localPresets;
    setBellSound(localPresets.bell);
    //set start end bells 
    document.querySelectorAll(".bell-sound li")[myPresets.bell].classList.add('active');

    //set total time
    totalTime = (localPresets.duration + localPresets.extraTime) * 60;
    var pos = localPresets.duration == 30 ? 1 : localPresets.duration == 60 ? 2 : 0;
    document.querySelectorAll(".presets li")[pos].classList.add('active');
    timerParser(totalTime);

    //interval bell
    intervalSwitch.checked = localPresets.intervalBell == true ? true : false;
    setIntervalBellOnOff(intervalSwitch);

    //audio instruction
    instructionCheck.checked = localPresets.instructionAudio == true ? true : false;
    setInstructionAudioOnOff(instructionCheck, localPresets.instructionType);
    // if (localPresets.instructionAudio) {
    //     setInstructionAudio(localPresets.instructionType);
    // }
    let instructioncheckArray = document.querySelectorAll(".instruction-type");
    if(localPresets.instructionAudio) {
        instructioncheckArray.forEach(function (elem, i) {
            if(elem.value == localPresets.instructionType) {
                elem.checked = true;
            }
        });
    }

    //post audio instruction - mangal maitri
    // postInstructionCheck.checked = localPresets.postInstructionAudio == true ? true : false;
    // setPostInstructionAudioOnOff(postInstructionCheck);
}

intervalSwitch.addEventListener('change', function (evt) {
    setIntervalBellOnOff(this);
});
settingCog.addEventListener('click', function (evt) {
    this.classList.toggle('active');
});
instructionCheck.addEventListener('change', function (evt) {
    setInstructionAudioOnOff(this);
});
// postInstructionCheck.addEventListener('change', function (evt) {
//     setPostInstructionAudioOnOff(this);
// });
function setInstructionAudioOnOff(evt, n = 0) {
    if (evt.checked) {
        myPresets.instructionAudio = true;
        instructionDropdown.classList.add('active');
        setInstructionAudio(n);
    } else {
        myPresets.instructionAudio = false;
        instructionDropdown.classList.remove('active');
    }
}
// function setPostInstructionAudioOnOff(evt) {
//     if (evt.checked) {
//         myPresets.postInstructionAudio = true;
//         setPostInstructionAudio();
//     } else {
//         myPresets.postInstructionAudio = false;
//     }
// }
function setIntervalBellOnOff(evt) {
    if (evt.checked) {
        myPresets.intervalBell = true;
        intervalTxtArea.innerText = 'at ' + Math.floor(((totalTime / 60) / 2)) + ' mins';
    } else {
        myPresets.intervalBell = false;
        intervalTxtArea.innerText = 'is currently OFF';
    }
}
if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    //pwa prompt
    let deferredPrompt;
    var installPrompt = document.querySelector('.install');
    var buttonInstall = document.getElementById('install-add');
    window.addEventListener('beforeinstallprompt', (e) => {
        // Prevent the mini-infobar from appearing on mobile
        e.preventDefault();
        // Stash the event so it can be triggered later.
        deferredPrompt = e;
        // Update UI notify the user they can install the PWA
        installPrompt.style.display = 'block';
    });
    buttonInstall.addEventListener('click', (e) => {
        // Hide the app provided install promotion
        installPrompt.remove();
        // Show the install prompt
        deferredPrompt.prompt();
        // Wait for the user to respond to the prompt
        deferredPrompt.userChoice.then((choiceResult) => {
            if (choiceResult.outcome === 'accepted') {
                console.log('User accepted the install prompt');
            } else {
                console.log('User dismissed the install prompt');
            }
        });
    });
    window.addEventListener('appinstalled', (evt) => {
        gtag('event', 'appInstall');
        setTimeout(function () {
            alert("The Meditation Timer app has been installed successfully. Now you can access it via homescreen and also runs offline.");
        }, 7000);
    });
}

// playCustomAudio JS https://codepen.io/blackjacques/pen/LLQKKJ
var customPlayer = document.getElementById('custom-audio-elem'),
customAudioNode = document.getElementById('custom-audio');
function playCustomAudio() {
    if (customPlayer.src) {
        customPlayer.play();
    }
}
function stopCustomAudio() {
    if (customPlayer.src) {
        customPlayer.currentTime = 0;
        customPlayer.pause();
    }
}
function playSelectedFile(event) {
    var file = this.files[0],
    type = file.type,
    canPlay = customPlayer.canPlayType(type);
    if (canPlay){
        customPlayer.src = URL.createObjectURL(file);
        customAudioFile.innerText = file.name;
        customAudioFileName = file.name;
    }
    else {
        stopCustomAudio();
        alert("Sorry, this file cannot be played!");
    }
}
customAudioNode.addEventListener('change', playSelectedFile, false);