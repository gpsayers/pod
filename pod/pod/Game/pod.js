




﻿
﻿

var Player = {
    Id: generateUUID(),
    totalCycles: 0,
    totalClicks: 0,
    totalPower: 100,
    playerHealth: 100,
    podTemp: 43.1,
    playerTemp: 98.6,
    podOxygen: 95,
    playerOxygen: 95,
    podFilterLevel: 20,

    playerFood: 100,
    playerWater: 100,

    podTime: 5.10,

};

var game = {
    Player: Player,
    engageLights: false,
    engageHeat: false,
    engageRation: false,
    engageRationCount: 0,
    engageFilter: false,
    engageFilterCount: 0,
    engagePanel: false,
    engagePanelCount: 0,

};

var fps = .5,
    interval = 1000 / fps,
    lastTime = (new Date()).getTime(),
    currentTime = 0,
    delta = 0;

function gameLoop() {

    window.requestAnimationFrame(gameLoop);

    currentTime = (new Date()).getTime();
    delta = (currentTime - lastTime);

    if (delta > interval) {

        Player.totalCycles++;

        Player.podTime = Player.podTime + 0.10;

        $('#player').text(JSON.stringify(game));


        lastTime = currentTime - (delta % interval);

        display();
    }


}
function checkCycle(cycle) {



if ((cycle % 6) == 0) {
checkOxygen();


}


if ((cycle % 12) == 0) {



}

}

function checkOxygen(player, pod) {

var oDiff = player - pod;

if (oDiff < 0)
{



}
else
{



}

}

function display() {

    if (Player.totalCycles == 1) {

        displayText("Here is the first text");
    }

    if (Player.totalCycles % 3 == 0) {
        displayText("Here is the second text");
    }

    $('#podTime').text(("Time: " + Player.podTime.toFixed(2)));
}

function displayText(text) {

    var tempText = $('#gameText').val();
    $('#gameText').val(Player.podTime.toFixed(2) + ": " + text + "\n\n" + tempText);
}

function generateUUID() { // Public Domain/MIT
    var d = new Date().getTime();
    if (typeof performance !== 'undefined' && typeof performance.now === 'function') {
        d += performance.now(); //use high-precision timer if available
    }
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
}

gameLoop();


