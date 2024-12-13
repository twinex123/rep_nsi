//MENU, CREDITS MANAGEMENT

console.log(`
╔══════════════════════════════════════════════════════════════════════════════╗
║  NSI 2024 - CRISIS                                                           ║
║  Bon jeu !                                                                   ║
║  Si vous êtes assez curieux pour lire ce message, appuyez sur m et z en      ║
║  même temps sur la page d'accueil du jeu.                                    ║
╚══════════════════════════════════════════════════════════════════════════════╝
`);

//inits

const credits = document.querySelector(".credits");
const card = document.querySelector(".card_hero");
const splash_screen = document.querySelector(".splash_screen");
const splash_menu = document.querySelector(".splash_menu");
const splash_shadow = document.querySelector(".splash_shadow");

localStorage.removeItem("start");
localStorage.removeItem('launch_fainting');

let debug_credits_value = 0;

//LAUNCH GAME

function creditsStart() {

    start_fullscreen = true;

    if(debug_credits_value == 1){
        splash_screen.style.display = "none";
        splash_shadow.style.display = "none";
        splash_menu.style.display = "none";
        credits.style.display = "block";

        const credits_audio = new Audio('assets/sounds/soundtrack.mp3');
        credits_audio.loop = true;

        credits_audio.play();

        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen()
                .catch(err => {
                    console.log(`Erreur lors de la tentative de passage en plein écran: ${err.message}`);
                });
        }

        showNextCredit(credits_audio);
    }else {
        splash_screen.style.display = "none";
        splash_shadow.style.display = "none";
        splash_menu.style.display = "none";
    }
}

const creditsTexts = [
    "Vous travaillez en tant qu'ingénieur de sécurité informatique pour la \nNSA, l'agence de sécurité nationale américaine",
    "Votre équipe est actuellement sur un dossier top-secret lié à une surveillance nationale",
    "Personne ne doit accéder à ces fichiers classés Secrets Défense",
    "Suivez les intructions de Mr. Loyd, votre patron",
    "Vos coéquipiers comptent sur vous",
    "",
    "<span style='font-family: Henny Penny; font-size: 3.5em;'>CRISIS</span>"
];

let currentTextIndex = 0;
const creditsElement = document.querySelector('.credits_text');

function showNextCredit(audio) {
    creditsElement.style.opacity = 0; 

    setTimeout(() => {
        creditsElement.innerHTML = creditsTexts[currentTextIndex];
        creditsElement.style.opacity = 1; 

        currentTextIndex++;

        if (currentTextIndex < creditsTexts.length) {
            setTimeout(() => showNextCredit(audio), 4500);
        } else {
            fadeOutAudioAndText(audio);
        }
    }, 1000); 
}

function fadeOutAudioAndText(audio) {
    const fadeOutInterval = setInterval(() => {
        if (audio.volume > 0.05) {
            audio.volume -= 0.05;
            creditsElement.style.opacity -= 0.05; 
        } else {
            audio.volume = 0;
            audio.pause();
            creditsElement.style.opacity = 0; 
            clearInterval(fadeOutInterval);

            const ambient_audio = new Audio('assets/sounds/ambiance.mp3');
            ambient_audio.loop = true;
            ambient_audio.volume = 0.2;
            ambient_audio.play();

            const ringing_audio = new Audio('assets/sounds/effects/ringing.mp3');
            ringing_audio.play();

            setTimeout(() => {
                launchScene(); 
            }, 5000);
        }
    }, 250); 
}


//TUTORIAL

function launchScene() {
    let opacity = 1;
    const fadeOutInterval = setInterval(() => {
        if (opacity > 0) {
            opacity -= 0.05;
            credits.style.opacity = opacity;
        } else {
            clearInterval(fadeOutInterval);
            credits.style.display = "none";
        }
    }, 100);

    let tuto_voice = new Audio('assets/sounds/tutorial/tuto_voice1.mp3');
    tuto_voice.play();

    setTimeout(() => {
        tuto_voice.pause();
        tuto_voice = new Audio('assets/sounds/tutorial/tuto_voice2.mp3');
        tuto_voice.play();

        setTimeout(() => {
            tuto_voice.pause();
            tuto_voice = new Audio('assets/sounds/tutorial/tuto_voice3.mp3');
            tuto_voice.play();

            setTimeout(() => {
                tuto_voice.pause();
                tuto_voice = new Audio('assets/sounds/tutorial/tuto_voice4.mp3');
                tuto_voice.play();

                setTimeout(() => {
                    tuto_voice.pause();
                    tuto_voice = new Audio('assets/sounds/tutorial/tuto_voice5.mp3');
                    tuto_voice.play();
                }, 15000);
            }, 18000);
        }, 10000);
    }, 6000);

}

//FULL CREDITS

const credits_screen = document.querySelector(".full_credits");
const fullcredits_audio = new Audio("assets/sounds/credits.mp3");

function openFullCredits(){

    credits_screen.style.display = "flex";
    fullcredits_audio.play();

    createRandomHalo();

    setInterval(createRandomHalo, 3000);

    setInterval(() => {
        for (let halo_time = 0; halo_time < 10; halo_time++) {
            createRandomHalo()
        }
    }, 10000);

}

function closeFullCredits(){

    fullcredits_audio.pause();
    fullcredits_audio.currentTime = 0;
    credits_screen.style.display = "none";

}

function createRandomHalo() {
    const halo = document.createElement("div");
    halo.classList.add("halo");

    const x = Math.random() * window.innerWidth;
    const y = Math.random() * window.innerHeight;
    halo.style.left = `${x}px`;
    halo.style.top = `${y}px`;

    credits_screen.appendChild(halo);

    halo.addEventListener("animationend", () => {
        halo.remove();
    });
}

const menu = document.querySelector(".menu");
const close_menu = document.querySelector(".close_menu");
let menu_opened = 0;

document.addEventListener('keydown', function(event) {
    if (event.key === 'Control') { 

        event.preventDefault();

        if(menu_opened === 1){menu.style.display = "none"; menu_opened = 0;}
        else {menu.style.display = "block"; menu_opened = 1;}
    }
});

close_menu.addEventListener('click', () => {
    menu.style.display = "none";
    menu_opened = 0;
});

function toggleMenuCtrl(){
    if(menu_opened === 1){menu.style.display = "none"; menu_opened = 0;}
    else {menu.style.display = "block"; menu_opened = 1;} 
}

//MESSAGES FROM OTHER WINDOWS

window.addEventListener('message', (event) => {
    const message = event.data;
    if (message.type === 'toggleMenuCtrl') {
        toggleMenuCtrl();
    } 
});

//EPILEPSY WARNING

localStorage.setItem("show_epilepsy_warning", 0);
localStorage.setItem("addprogress", "0");

setInterval(() => {
    if (localStorage.getItem("show_epilepsy_warning") === "1") {
        showEpilepsyWarning();
        localStorage.setItem("show_epilepsy_warning", "0");
    } 
}, 1000);

function showEpilepsyWarning(){
    var epilepsy_warning = document.createElement("div");
    epilepsy_warning.classList.add("epilepsy_warning");
    epilepsy_warning.innerHTML = "<strong>Avertissement épilepsie</strong><br>Des flashs lumineux vont apparaître.";
    document.body.appendChild(epilepsy_warning);

    setTimeout(() => {
        document.body.removeChild(epilepsy_warning);
    }, 10000);
}

//TIME SPENT

function formatTemps(secondes) {
    const heures = Math.floor(secondes / 3600);
    const minutes = Math.floor((secondes % 3600) / 60);
    return `${heures} heure${heures > 1 ? 's' : ''} ${minutes} minute${minutes > 1 ? 's' : ''}`;
}

let timeSpent = parseInt(localStorage.getItem('timeSpent')) || 0;

setInterval(() => {
    timeSpent++;
    localStorage.setItem('timeSpent', timeSpent);
    
    const timeFormat = formatTemps(timeSpent);
    
    document.getElementById('timeSpent').textContent = `Temps de jeu : ${timeFormat}`;

}, 1000);

//OPTIONS

const options_page = document.querySelector(".options_page");
const options_overlay = document.querySelector(".options_overlay");

function openOptions(){
    options_page.style.display = "block";
    options_overlay.style.display = "block";
}
function closeOptions(){
    options_page.style.display = "none";
    options_overlay.style.display = "none";
}

//MAIN ARROWS

const menuButtons = document.querySelectorAll('.options button');
let currentButtonIndex = 0;

menuButtons[currentButtonIndex].style.backgroundColor = 'white';
menuButtons[currentButtonIndex].style.color = 'black';

document.addEventListener('keydown', (event) => {
    menuButtons[currentButtonIndex].style.backgroundColor = 'transparent';
    menuButtons[currentButtonIndex].style.color = 'white';
    
    if (event.key === 'ArrowUp') {
        currentButtonIndex = (currentButtonIndex - 1 + menuButtons.length) % menuButtons.length;
    } else if (event.key === 'ArrowDown') {
        currentButtonIndex = (currentButtonIndex + 1) % menuButtons.length;
    } else if (event.key === 'Enter') {
        switch(currentButtonIndex) {
            case 0: 
                creditsStart();
                break;
            case 1:
                openOptions();
                break;
            case 2:
                openFullCredits();
                break;
        }
    } else if (event.key === 'Escape') {
        event.preventDefault();
        closeFullCredits();
        closeOptions();
    }
    
    menuButtons[currentButtonIndex].style.backgroundColor = 'white';
    menuButtons[currentButtonIndex].style.color = 'black';
});


//PROGRESSION //////////////////////////////////////////////////////////////////////////

localStorage.setItem("addprogress", 0);

setInterval(() => {
    if (localStorage.getItem("addprogress") == "1") {
        localStorage.setItem("addprogress", "0");
        addProgress();
    }
}, 1000);

const objectives = [
    { name: "Regarder la vidéo de Mr. Loyd" },
    { name: "Trouver l'adresse IP de l'attaquant" },
    { name: "Éteindre les machines" },
    { name: "Appeler le numéro de téléphone" }
];

let currentObjectiveIndex = 0; 
let totalObjectives = objectives.length;
let completedObjectives = 0;
let nb_update = 0;

updateObjective();
updateProgressBar();

function addProgress() {
    completedObjectives += 1;

    if (currentObjectiveIndex < totalObjectives - 1) {
        currentObjectiveIndex += 1;
        updateObjective();
    } else {
        updateObjective(true);
    }

    updateProgressBar();
}


function updateProgressBar() {
    const progressBar = document.getElementById("progressBar");
    const progressText = document.getElementById("progressText");

    const progressPercent = (completedObjectives / totalObjectives) * 100;

    if(nb_update!=0){progressBar.style.color="black"}else{progressBar.style.color="white"};
    nb_update+=1;

    progressBar.style.width = `${progressPercent}%`;
    progressBar.textContent = `${Math.round(progressPercent)}%`;
    //progressText.textContent = `${completedObjectives}/${totalObjectives}`;
}

function updateObjective(isCompleted = false) {
    const objectiveText = document.getElementById("objectiveText");

    if (!isCompleted && currentObjectiveIndex < objectives.length) {
        const currentObjective = objectives[currentObjectiveIndex];
        objectiveText.textContent = `Objectif : ${currentObjective.name}`;
    } else {
        objectiveText.textContent = "Tous les objectifs sont terminés !";
    }
}


//SAUVEGARDE

function loadBackup(){
    document.getElementById("fileInput").click(); 
};
document.getElementById("saveBackup").addEventListener("click", () => {
    saveBackup();
});

function saveBackup(){
    
    let get_username = localStorage.getItem("username") || "Joueur";
    let get_progress = nb_update;

    let userData = {
        username: get_username,
        progress: get_progress
    };

    const dataStr = JSON.stringify(userData, null, 2); 
    const blob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(blob); 

    const link = document.createElement("a");
    link.href = url;
    link.download = "sauvegarde_"+get_username+".json"; 
    link.click();

    URL.revokeObjectURL(url); 

    alert("Progression bien sauvegardé!")
}

function handleFileChange(event){
    const file = event.target.files[0]; 

    if (file) {
        const reader = new FileReader();

        reader.onload = (e) => {
            try {
                const loadedData = JSON.parse(e.target.result); 
                userData = loadedData; 
                console.log("Data loaded from backup :", userData);

                handleBackup(userData.progress, userData.username);
            } catch (err) {
                console.error("Error occured while loading backup :", err);
                alert("Invalid file. Please retry.");
            }
        };

        reader.readAsText(file); 
    }
};

//HANDLE BACKUP

function handleBackup(progress, username){

    localStorage.setItem("username", username);
    localStorage.setItem("progress", progress);

    switch (progress){
        case 4:
            addProgress();
        case 3:
            addProgress();
        case 2:
            addProgress();
        case 1:
            addProgress();
    }

}

//FAINTING

setInterval(() => {
    if(localStorage.getItem("launch_fainting")){
        console.log("launched fainting");

        const faintingOverlay = document.createElement("div");
        faintingOverlay.style.position = "absolute";
        faintingOverlay.style.zIndex = "1000";
        faintingOverlay.style.top = 0;
        faintingOverlay.style.left = 0;
        faintingOverlay.style.width = "100vw";
        faintingOverlay.style.height = "100vh";
        faintingOverlay.style.backgroundColor = "rgba(0, 0, 0, 0)";

        document.body.appendChild(faintingOverlay);

        let opacity = 0;
        const fadeInInterval = setInterval(() => {
            opacity += 0.01;  
            faintingOverlay.style.backgroundColor = `rgba(0, 0, 0, ${opacity})`;

            if (opacity >= 1) {
                clearInterval(fadeInInterval);
            }
        }, 50);  


    }
}, 1000);


//EASTER EGG
let isMPressed = false;

document.addEventListener('keydown', function(event) {
    if (event.key === "m") {
        isMPressed = true;
    }

    if (isMPressed) {
        
        if (event.key === "b"){
            const videoElement = document.createElement('video');

            videoElement.autoplay = true; 
            videoElement.controls = false; 
            videoElement.style.position = "absolute";
            videoElement.style.top = 0;
            videoElement.style.left = 0;
            videoElement.style.zIndex = 2000;
            videoElement.style.marginLeft = "50%";
            videoElement.style.transform = "translate(-50%, 0)";

            const sourceElement = document.createElement('source');
            sourceElement.src = 'assets/video/mat.mp4'; 
            sourceElement.type = 'video/mp4';

            videoElement.appendChild(sourceElement);

            document.body.appendChild(videoElement);
        }
        else if (event.key === "z") {
            let matImage = document.createElement("img");
            matImage.src = "assets/images/mat.png"; 
            matImage.style.width = "100vw";
            matImage.style.height = "100vh";
            matImage.style.position = "absolute";
            matImage.style.top = "calc(100vh - 2)"; 
            matImage.style.left = "0";
            matImage.style.zIndex = 2000;
        
            document.body.appendChild(matImage);
        
            let topPosition = 100;  

            const animateUp = () => {
                if (topPosition > 45) {  
                    topPosition--; 
                    matImage.style.top = `${topPosition}vh`; 
                    setTimeout(animateUp, 10);  
                } else {
                    setTimeout(animateDown, 3000); 
                }
            };

            const animateDown = () => {
                if (topPosition < 100) {  
                    topPosition++; 
                    matImage.style.top = `${topPosition}vh`; 
                    setTimeout(animateDown, 10);
                } else {
                    matImage.style.top = "calc(100vh - 2)";
                    animateUp();  
                }
            };

            animateUp();  

            const createRandomImages = () => {
                let randomImage = document.createElement("img");
                randomImage.src = "assets/images/tloz.jpg"; 
                randomImage.style.width = `${Math.random() * 10 + 5}vw`; 
                randomImage.style.height = `${Math.random() * 10 + 5}vh`; 
                randomImage.style.position = "absolute";
                randomImage.style.top = `${Math.random() * 100}vh`;
                randomImage.style.left = `${Math.random() * 100}vw`; 
                randomImage.style.zIndex = 1000; 
                document.body.appendChild(randomImage);
                
            };

            imageInterval = setInterval(createRandomImages, 50);

            setTimeout(() => {
                let images = document.querySelectorAll("img, video");
                images.forEach(img => {
                    img.remove();
                });
            
                let timeInterval = 2000; 
            
                const createImage = () => {
                    let matImage = document.createElement("img");
                    matImage.src = "assets/images/mat.png"; 
                    matImage.style.width = "100vw";
                    matImage.style.height = "100vh";
                    matImage.style.position = "absolute";
                    matImage.style.top = "100vh"; 
                    matImage.style.left = "0";
                    matImage.style.zIndex = 2000;
            
                    document.body.appendChild(matImage);
            
                    let topPosition = 100; 
            
                    const animate = () => {
                        if (topPosition > -100) {
                            topPosition--; 
                            matImage.style.top = `${topPosition}vh`;
                            setTimeout(animate, 10);
                        } else {
                            matImage.style.top = "-100vh";
                        }
                    };
            
                    animate(); 
                };
            
                const startCreatingImages = () => {
                    let matImageInterval = setInterval(() => {
                        createImage();
            
                        if (timeInterval > 100) {
                            timeInterval -= 200; 
                            clearInterval(matImageInterval); 
                            startCreatingImages(); 
                        }
                    }, timeInterval); 
                };
            
                startCreatingImages();
            
                setTimeout(() => {
                    let images = document.querySelectorAll("img, video");
                    images.forEach(img => {
                        img.remove();
                    });
                }, 10000); 
            
            }, 10000); 
            
           
        }
    }
});

document.addEventListener('keyup', function(event) {
    if (event.key === "m") {
        isMPressed = false;
    }
});

