const redLight = document.getElementById("redLight");
const greenLight = document.getElementById("greenLight");
const player = document.querySelector("img");

const greenLightSound = new Audio("./sounds/start.mp3");
const redLightSound = new Audio("./sounds/stop.mp3");

const finishLine = document.querySelector("hr");

redLight.style.backgroundColor = "rgba(89, 87, 87, 0.746)";

let yOffset = 0;
let isRedLight = true;
let playing = true;

function changeLight() {
    if (!isRedLight) {
        redLightSound.currentTime = 0;
        redLightSound.play();

        redLight.style.backgroundColor = "red";
        greenLight.style.backgroundColor = "rgba(89, 87, 87, 0.746)";
        isRedLight = true;
    } 
    
    else {
        greenLightSound.currentTime = 0;
        greenLightSound.play();

        greenLight.style.backgroundColor = "green";
        redLight.style.backgroundColor = "rgba(89, 87, 87, 0.746)";
        isRedLight = false;
    }

    setTimeout(changeLight, Math.floor(Math.random() * 3001) + 1000);
}

document.addEventListener("keydown", event => {
    event.preventDefault();

    if (event.repeat) return;

    if (!playing) return;

    if (isRedLight && (["Enter", "Return"].includes(event.key))) {
        playing = false;
        yOffset = 0;
        window.alert("You lost!");

        redLight.style.backgroundColor = "rgba(89, 87, 87, 0.746)";
        greenLight.style.backgroundColor = "green";
    }

    const playerRect = player.getBoundingClientRect();
    const finishLineRect = finishLine.getBoundingClientRect();

    if (playerRect.bottom <= finishLineRect.top) {
        playing = false;
        
        redLight.style.backgroundColor = "rgba(89, 87, 87, 0.746)";
        greenLight.style.backgroundColor = "rgba(89, 87, 87, 0.746)";

        window.alert("You won!");
    }

    if (event.key === "ArrowUp") {
        yOffset -= 10;
    } 
    
    else if (event.key === "ArrowDown") {
        yOffset += 10;
    }

    player.style.transform = `translateY(${yOffset}px)`;
});

changeLight();
