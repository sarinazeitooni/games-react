var StatusPerson = [0, 0, 0, 0, 0, 0, 0];
var StatusBoat = 0;
var BoatX = 0;
var BoatX0 = 100;
var BoatX1 = 600;
var BoatY = -188;
var PersonNumber = 0;
var PersonY = 135;
var PersonX = [0, 0, 60, 120, 180, 240, 300];
var PersonInBoatY = BoatY + 230;
var PersonInBoatX = [0, 43, 80, 120, 150, 190, 230];
var Passengers = 0;
var NumberOfMoves = 0;

function addStyle(element, styles, callback) {
    // Apply the styles to the element
    for (var prop in styles) {
      element.style[prop] = styles[prop];
    }
  
    // Call the callback function if it is provided
    if (typeof callback === 'function') {
      callback.call(element);
    }
  }

document.addEventListener('DOMContentLoaded', function () {
    init();
    var persons = document.getElementsByClassName('Person');
    for (var i = 0; i < persons.length; i++) {
        persons[i].addEventListener('click', function () {
            console.log('clicked person');
            var Temp = this.getAttribute('id');
            PersonNumber = Temp.replace('Person', '');
            if ((Passengers < 2) && ((StatusPerson[PersonNumber] == 0 && StatusBoat == 0) || (StatusPerson[PersonNumber] == 2 && StatusBoat == 1))) { //Put person in boat
                this.style.zIndex = '10';
                var bottomVal = PersonInBoatY + 'px';
                var leftVal = (BoatX + PersonInBoatX[PersonNumber]) + 'px';
                addStyle(this, { 'bottom': bottomVal, 'left': leftVal }, 1000);
                Passengers += 1;
                StatusPerson[PersonNumber] = 1;
            } else if (StatusPerson[PersonNumber] == 1) {
                TakePersonOutOfBoat(PersonNumber);
            }
        });
    }

    var boat = document.getElementById('Boat');
    boat.addEventListener('click', function () {
        if (Passengers > 0 && Passengers != 99) {
            if (StatusBoat == 0) {
                BoatX = BoatX1;
            } else {
                BoatX = BoatX0;
            };
            addStyle(this, { 'left': BoatX + 'px' }, 1000);
            StatusBoat = (StatusBoat + 1) % 2;
            for (var i = 1; i <= 6; i++) {
                if (StatusPerson[i] == 1) {
                    var person = document.getElementById('Person' + i);
                    addStyle(person, { 'left': (BoatX + PersonInBoatX[i]) + 'px' }, 1000);
                }
            }
            NumberOfMoves += 1;
            document.getElementById('Feedback').innerHTML = "<p>Number of crossings: " + NumberOfMoves + "</p>";
            CheckTheNewSituation();
        }
    });

    var button1 = document.getElementById('Button1');
    button1.addEventListener('click', function () {
        init();
    });
});

function init() {
    document.getElementById('Feedback').innerHTML = "<p>Click monsters or munchkins to put them in the boat then click the boat to cross the river</p>";
    document.getElementById("Trophybutton").style.visibility = "hidden";
    NumberOfMoves = 0;
    BoatX = BoatX0;
    StatusBoat = 0;
    Passengers = 0;
    var boat = document.getElementById('Boat');
    boat.style.left = BoatX + 'px';
    boat.style.bottom = BoatY + 'px';
    boat.style.zIndex = '20';
    for (var i = 1; i <= 6; i++) {
        var person = document.getElementById('Person' + i);
        person.style.left = PersonX[i] + 'px';
        person.style.bottom = PersonY + 'px';
        person.style.zIndex = '1';
        StatusPerson[i] = 0;
    }
}
function TakePersonOutOfBoat(p) {
    if (Passengers != 99) {
        var person = document.getElementById('Person' + p);
        addStyle(person, { 'bottom': PersonY + 'px', 'left': (PersonX[p] + StatusBoat * 630) + 'px' }, 1000, function () {
            this.style.zIndex = '1';
        });
        Passengers -= 1;
        if (StatusBoat == 0) {
            StatusPerson[p] = 0;
        } else {
            StatusPerson[p] = 2;
        };
        CheckToSeeIfFinished();
    }
}

function CheckTheNewSituation() {
    var NumberOfMonsters = 0;
    var NumberOfMunchkins = 0;
    for (var i = 1; i <= 3; i++) {
        if (StatusPerson[i] == 0 || (StatusBoat == 0 && StatusPerson[i] == 1)) {
            NumberOfMonsters += 1;
        }
        if (StatusPerson[i + 3] == 0 || (StatusBoat == 0 && StatusPerson[i + 3] == 1)) {
            NumberOfMunchkins += 1;
        }
    }
    if (NumberOfMonsters > NumberOfMunchkins && NumberOfMunchkins != 0) {
        Disaster();
    }

    NumberOfMonsters = 0;
    NumberOfMunchkins = 0;
    for (var i = 1; i <= 3; i++) {
        if (StatusPerson[i] == 2 || (StatusBoat == 1 && StatusPerson[i] == 1)) {
            NumberOfMonsters += 1;
        }
        if (StatusPerson[i + 3] == 2 || (StatusBoat == 1 && StatusPerson[i + 3] == 1)) {
            NumberOfMunchkins += 1;
        }
    }
    if (NumberOfMonsters > NumberOfMunchkins && NumberOfMunchkins != 0) {
        Disaster();
    }
}

function CheckToSeeIfFinished() {
    var NumberOfMonsters = 0;
    var NumberOfMunchkins = 0;
    for (var i = 1; i <= 3; i++) {
        if (StatusPerson[i] == 2) {
            NumberOfMonsters += 1;
        }
        if (StatusPerson[i + 3] == 2) {
            NumberOfMunchkins += 1;
        }
    }
    if (NumberOfMonsters == 3 && NumberOfMunchkins == 3) {
        Finished();
    }
}

function Disaster() {
    document.getElementById('Feedback').innerHTML = "<p>The number of monsters outnumbers the number of munchkins on a riverbank</p><p>Click the 'start again' button.</p>";
    // addStyle('#Feedback', { "-webkit-box-shadow": "0px 0px 20px red", "-moz-box-shadow": "0px 0px 20px red", "box-shadow": "0px 0px 20px red" }, 1500, function () {
    //     $('#Feedback').css({ "-webkit-box-shadow": "none", "-moz-box-shadow": "none", "box-shadow": "none" });
    // });
    Passengers = 99;
}

function Finished() {
    if (NumberOfMoves > 11) {
        document.getElementById('Feedback').innerHTML = "<p>Well done. You completed the challenge in " + NumberOfMoves + " crossings.</p><p>Try to do it in a smaller number of crossings.</p>";
    } else {
        document.getElementById('Feedback').innerHTML = "<p>Congratulations. You have completed the challenge in the smallest number of crossings.</p>";
        document.getElementById("Trophybutton").style.visibility = "visible";
        var script = document.createElement('script');
        script.src = '/include/Celebrate/Celebrate.js';
        document.head.appendChild(script);
    }
}

function ClaimTrophy(form) {
    form.submit();
}
