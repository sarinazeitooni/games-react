let StatusPerson = [0, 0, 0, 0, 0, 0, 0];
let StatusBoat = 0;
let BoatX = 0;
let BoatX0 = 100;
let BoatX1 = 600;
let BoatY = -188;
let PersonNumber = 0;
let PersonY = 135;
let PersonX = [0, 0, 60, 120, 180, 240, 300];
let PersonInBoatY = BoatY + 230;
let PersonInBoatX = [0, 43, 80, 120, 150, 190, 230];
let Passengers = 0;
let NumberOfMoves = 0;
let boat = document.getElementById('Boat');

function addStyle(element, styles, callback) {
    for (let prop in styles) {
        element.style[prop] = styles[prop];
    }
    if (typeof callback === 'function') {
        callback.call(element);
    }
}

document.addEventListener('DOMContentLoaded', function () {
    init();
    let persons = document.getElementsByClassName('Person');
    for (let i = 0; i < persons.length; i++) {
        persons[i].addEventListener('click', function () {
            console.log('clicked person');
            let Temp = this.getAttribute('id');
            PersonNumber = Temp.replace('Person', '');
            if ((Passengers < 2) && ((StatusPerson[PersonNumber] == 0 && StatusBoat == 0) || (StatusPerson[PersonNumber] == 2 && StatusBoat == 1))) { //Put person in boat
                this.style.zIndex = '10';
                let bottomVal = PersonInBoatY + 'px';
                let leftVal = (BoatX + PersonInBoatX[PersonNumber]) + 'px';
                addStyle(this, { 'bottom': bottomVal, 'left': leftVal }, 1000);
                Passengers += 1;
                StatusPerson[PersonNumber] = 1;
            } else if (StatusPerson[PersonNumber] == 1) {
                TakePersonOutOfBoat(PersonNumber);
            }
        });
    }

    boat.addEventListener('click', function () {
        if (Passengers > 0 && Passengers != 99) {
            if (StatusBoat == 0) {
                BoatX = BoatX1;
            } else {
                BoatX = BoatX0;
            };
            addStyle(this, { 'left': BoatX + 'px' }, 1000);
            StatusBoat = (StatusBoat + 1) % 2;
            for (let i = 1; i <= 6; i++) {
                if (StatusPerson[i] == 1) {
                    let person = document.getElementById('Person' + i);
                    addStyle(person, { 'left': (BoatX + PersonInBoatX[i]) + 'px' }, 1000);
                }
            }
            NumberOfMoves += 1;
            document.getElementById('Feedback').innerHTML = "<p>Number of crossings: " + NumberOfMoves + "</p>";
            CheckTheNewSituation();
        }
    });

    let button1 = document.getElementById('Button1');
    button1.addEventListener('click', function () {
        init();
    });
});

function init() {
    document.getElementById('Feedback').innerHTML = "<p>Click monsters or Humans to put them in the boat then click the boat to cross the river</p>";
    document.getElementById("Trophybutton").style.visibility = "hidden";
    NumberOfMoves = 0;
    BoatX = BoatX0;
    StatusBoat = 0;
    Passengers = 0;
    let boat = document.getElementById('Boat');
    boat.style.left = BoatX + 'px';
    boat.style.bottom = BoatY + 'px';
    boat.style.zIndex = '20';
    for (let i = 1; i <= 6; i++) {
        let person = document.getElementById('Person' + i);
        person.style.left = PersonX[i] + 'px';
        person.style.bottom = PersonY + 'px';
        person.style.zIndex = '1';
        StatusPerson[i] = 0;
    }
}
function TakePersonOutOfBoat(p) {
    if (Passengers != 99) {
        let person = document.getElementById('Person' + p);
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
    let NumberOfMonsters = 0;
    let NumberOfHumans = 0;
    for (let i = 1; i <= 3; i++) {
        if (StatusPerson[i] == 0 || (StatusBoat == 0 && StatusPerson[i] == 1)) {
            NumberOfMonsters += 1;
        }
        if (StatusPerson[i + 3] == 0 || (StatusBoat == 0 && StatusPerson[i + 3] == 1)) {
            NumberOfHumans += 1;
        }
    }
    if (NumberOfMonsters > NumberOfHumans && NumberOfHumans != 0) {
        Disaster();
    }

    NumberOfMonsters = 0;
    NumberOfHumans = 0;
    for (let i = 1; i <= 3; i++) {
        if (StatusPerson[i] == 2 || (StatusBoat == 1 && StatusPerson[i] == 1)) {
            NumberOfMonsters += 1;
        }
        if (StatusPerson[i + 3] == 2 || (StatusBoat == 1 && StatusPerson[i + 3] == 1)) {
            NumberOfHumans += 1;
        }
    }
    if (NumberOfMonsters > NumberOfHumans && NumberOfHumans != 0) {
        Disaster();
    }
}

function CheckToSeeIfFinished() {
    let NumberOfMonsters = 0;
    let NumberOfHumans = 0;
    for (let i = 1; i <= 3; i++) {
        if (StatusPerson[i] == 2) {
            NumberOfMonsters += 1;
        }
        if (StatusPerson[i + 3] == 2) {
            NumberOfHumans += 1;
        }
    }
    console.log({ StatusPerson }, { NumberOfMonsters });
    if (NumberOfMonsters == 3 && NumberOfHumans == 3) {
        Finished();
    }
}

function Disaster() {
    document.getElementById('Feedback').innerHTML = "<p>lost the number of monsters are more than humans</p><p>Click the 'start again' button.</p>";
    addStyle('#Feedback', { "-webkit-box-shadow": "0px 0px 20px red", "-moz-box-shadow": "0px 0px 20px red", "box-shadow": "0px 0px 20px red" }, 1500, function () {
        $('#Feedback').css({ "-webkit-box-shadow": "none", "-moz-box-shadow": "none", "box-shadow": "none" });
    });
    Passengers = 99;
}

function Finished() {
    if (NumberOfMoves > 15) {
        document.getElementById('Feedback').innerHTML = "<p>win in " + NumberOfMoves + " crossings.</p><p>Try to do it in a smaller number of crossings.</p>";
    } else {
        document.getElementById('Feedback').innerHTML = "<p>Congratulations</p>";
        document.getElementById("Trophybutton").style.visibility = "visible";
        let script = document.createElement('script');
        script.src = '/include/Celebrate/Celebrate.js';
        document.head.appendChild(script);
    }
}