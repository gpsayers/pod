



var Player = {
    Id: generateUUID(),
    totalCycles: 0,
    totalClicks: 0,
    totalPower: 109,
    playerHealth: 100,
    playerHunger: 50,
    playerThirst: 50,
    podTemp: 43.1,
    playerTemp: 98.4,
    podOxygen: 16.9,
    playerOxygen: 95,
    podFilterLevel: 20,

    playerFood: 100,
    playerWater: 100,

    podTime: 5.10,

    messages: [],

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
    engageNavigation: false,
    engageLanding: false,
    engageSubsystems: false,
    random: 0
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

        Player.podTime = Player.podTime + 0.01;

        lastTime = currentTime - (delta % interval);

        displayIntro();

        checkCycle(Player.totalCycles);

        game.random = (Math.random() * (.05 - .01) + .01).toFixed(2);


    }

    checkEvents();

    updateDisplay();

}

function checkEvents(myEvent) {
    myEvent = myEvent || 0;

    switch (myEvent) {
        case 1:
            Player.totalPower--;
            displayText("Light fills the cabin and reveals a control panel of buttons.");
            var r = $('<button/>',
                {
                    text: 'Heat',
                    id: 'btn_2',
                    click: function() {
                        game.engageHeat = true;
                        checkEvents(2);
                    }
                });
            $("#cell12").append(r);
            break;
    case 2:
            Player.totalPower--;
            displayText("The cabin warms around you.");
            break;
    default:

    }
}

function checkCycle(cycle) {


    if ((cycle % 3) === 0) {
        checkTemp(Player.playerTemp, Player.podTemp);
        checkOxygen(Player.playerOxygen, Player.podOxygen);

        Player.podOxygen = Player.podOxygen - (.1 + parseFloat(game.random));
        Player.podTemp = Player.podTemp - (.5 + parseFloat(game.random));
    }


    if ((cycle % 6) === 0) {



        
    }


    if ((cycle % 12) === 0) {



    }

}

function checkOxygen(player, pod) {

    if (pod > 16) {

        //player rises or stays green
        if (Player.playerOxygen < 64) {
            Player.playerOxygen = 64;
        }


        if (pod > 20) {          

            Player.playerOxygen = Player.playerOxygen + .50;
        }
        else if (pod > 18) {
            Player.playerOxygen = Player.playerOxygen + .25;
        }
        else {
            Player.playerOxygen = Player.playerOxygen + .10;
        }



        if (Player.playerOxygen > 95) {
            Player.playerOxygen = 95;
        }


    }
    else {
        //player drops

        if (pod < 6) {
            Player.playerOxygen--;
        }
        else if (pod < 10) {
            Player.playerOxygen = Player.playerOxygen - 0.5;
        }
        else {
            Player.playerOxygen = Player.playerOxygen - 0.20;
        }

        if (Player.playerOxygen < 52) {
            Player.playerOxygen = 52;
        }
    }

}

function checkTemp(player, pod) {

    if (pod <= 64) {

        if (pod < 32) {
            Player.playerTemp--;
        }
        else if (pod < 45) {
            Player.playerTemp = Player.playerTemp - .3;
        }
        else if (pod < 55) {
            Player.playerTemp = Player.playerTemp - .05;
        } else {
            Player.playerTemp = Player.playerTemp - .01;
        }
    }

    if (pod >= 77) {
        if (pod > 110) {
            Player.playerTemp++;
        }
        else if (pod > 90) {
            Player.playerTemp = Player.playerTemp + .3;
        }
        else if (pod > 80) {
            Player.playerTemp = Player.playerTemp + .05;
        } else {
            Player.playerTemp = Player.playerTemp + .01;
        }
    }



    if (pod > 64 && pod < 77) {
        if (Player.playerTemp < 98.6) {
            Player.playerTemp++;
            if (Player.playerTemp > 98.6) {
                Player.playerTemp = 98.6;
            }
        }

        if (Player.playerTemp > 98.6) {
            Player.playerTemp = Player.playerTemp - 0.5;
            if (Player.playerTemp < 98.6) {
                Player.playerTemp = 98.6;
            }
        }

    }

}

function displayIntro() {

    if (Player.totalCycles === 1) {

        displayText("You wake up confined to a dark compartment with some flashing lights infront of you.");

        var r = $('<button/>', {
            text: 'Lights', 
            id: 'btn_1',
            click: function () { game.engageLights = true; checkEvents(1) }
        });
        $("#cell11").append(r);


    }

    if (Player.totalCycles % 3 === 0) {
        //displayText("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque pharetra leo in ex tristique placerat. Sed feugiat auctor massa sed convallis. Duis at viverra est, congue scelerisque sapien. Sed ut lobortis eros. Sed porttitor laoreet accumsan.");
    }


}

function updateDisplay() {

    $("#gameTime").text(Player.podTime.toFixed(2));

    $("#podTemp").text(Player.podTemp.toFixed(1));

    $("#podOxy").text(Player.podOxygen.toFixed(1));

    $("#playerTemp").text(Player.playerTemp.toFixed(1));

    $("#playerOxy").text(Player.playerOxygen.toFixed(1));

    $("#podPower").text(Player.totalPower);

    $('#player').text(JSON.stringify(game));
}

function displayText(message) {

    var text = $('<div>').addClass('notification').css('opacity', '0').text(message).prependTo('div#gameText');
    text.animate({ opacity: 1 }, 500, 'linear', function () {
        // Do this every time we add a new message, this way we never have a large backlog to iterate through. Keeps things faster.
       // Notifications.clearHidden();
    });

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


