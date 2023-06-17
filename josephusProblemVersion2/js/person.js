
class Person {
  constructor(id, isDead) {
    this.id = id,
      this.isDead = isDead
  }

  sortForStart(startnumber) {

    people.forEach(human => {
      if (human.id >= startnumber) {
        sortedPeople.push(human)
      }
    });

    people.forEach(human => {
      if (human.id < startnumber) {

        sortedPeople.push(human)
      }
    });

  }

  killPeople(persons) {
    let survived;

    if (persons.length == 2) {
      let lastOne = persons[0].id
      setTimeout(() => {

        htmlUi.displayKills(lastOne)
      }, 1000);

      survived = persons.pop()
    } else {

      persons.forEach((human, index) => {
        if (index % 2 != 0) {
          human.isDead = true;
          setInterval(() => {
            htmlUi.displayKills(human.id)
          }, 1000);
        }
      });

      survived = persons.filter(human => human.isDead == false)
    }
    return survived
  }

  whoWillSurvive(persons) {
    let survived = this.killPeople(persons)
    if (survived.length > 1) {
      this.whoWillSurvive(survived)
    } else {
      surviver = survived.id
    }

  }

  checkWinner(winner, userGuess) {
    if (winner == userGuess) {
      document.getElementById('result').innerText = ("you win !");
    } else {
      document.getElementById('result').innerText = ("you lose!");
    }
  }
}