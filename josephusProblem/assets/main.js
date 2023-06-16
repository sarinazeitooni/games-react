var inputControl = false;
const guess = $('#inputGuess');
const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
}
function josephProblemJs(l, d, controlVal) {
    let people = [];
    let deathPeople = [];
    var homosapiensSpace = 360 / controlVal;
    for (let i = 1; i <= l; i++) {
        people.push(i);
    }
    const addPeople = async (callback) => {
        var yazdir = 1;
        for (let peopleSvg = 1; peopleSvg < 360; peopleSvg += homosapiensSpace) {
            $('.cloneLine').clone().removeClass('cloneLine d-none').appendTo("#ekle").attr('transform', "rotate(" + (peopleSvg + 10) + ", 500, 500)");
            if (yazdir < 10) {
                $('#ekle g:nth-child(' + yazdir + ') text[text-anchor]').attr('x', '35')
            } else {
                $('#ekle g:nth-child(' + yazdir + ') text[text-anchor]').attr('x', '30')
            }
            $('#ekle g:nth-child(' + yazdir + ') text[text-anchor]').text(yazdir)
            yazdir = yazdir + 1;
            await sleep(20)
        }
        callback();
    }

    while (people.length !== 1) {
        for (let i = 1; i < d; i++) {
            people.push(people.shift());
            $('#ekle g:nth-child(' + i + ') text[text-anchor]').text(i)
        }
        deathPeople.push(people.shift());
    }

    var time = 3000;
    const removePeople = async (callback) => {
        for (var i = 0; i < deathPeople.length; i++) {
            await sleep(time)
            $('#ekle g:nth-child(' + deathPeople[i] + ')').addClass("line-delete removeElement")
            time = 200;
        }
        callback();
    }

    addPeople(removePeople);

    const wonPerson = async (callback) => {
        await sleep(1000)
        $('#ekle g:nth-child(' + people[0] + ')').addClass('g-won');
        $('#ekle g:nth-child(' + people[0] + ') ellipse').addClass('g-won').attr('cx', '300')
        $('#ekle g:nth-child(' + people[0] + ') line').addClass('line-won')
        $('#ekle g:nth-child(' + people[0] + ') text[text-anchor]').addClass('line-won').attr('x', '295').attr('transform', 'rotate(213  300, 500)')
        $('#peopleRange').removeAttr('disabled');
        callback();
    }

    removePeople(wonPerson);
    let result = '';
    if (guess.val() == people[0]) result = 'congratulations. you would win!'
    else result = 'sorry. you would die!'
    $('#result').html(`<span>${result}</span>`);;
    return people[0];
}
$('.josephBtn').click(function () {
    $('#ekle').html('')
    var inputControl = $('#inputJoseph').val();
    josephProblemJs(inputControl, 2, inputControl)
})