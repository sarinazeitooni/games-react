// variables
const formData = document.querySelector("#form-data");
let htmlUi = new UI(),
  people = [],
  sortedPeople = [],
  person, surviver;

// event listeners
eventListeners();
function eventListeners() {
  document.addEventListener("DOMContentLoaded", () => {
    // showing input fields on load
    htmlUi.showInputFields();
  });
  formData.addEventListener("submit", () => {
    const population = document.querySelector("#population").value,
      start = document.querySelector("#start").value,
      userGuess = document.querySelector("#user-guess").value;
    if (population == "" || start == "" || userGuess == "") {
      htmlUi.showMessage(
        "Please fill all the fields with a valid number ",
        "alert-danger"
      );
    } else {

      htmlUi.showPlayers(population)
        // formData.reset()
      for(let i = 1 ; i <= population; i++){
        person = new Person(i, false)
        people.push(person)
      }

      person.sortForStart(start)

      person.whoWillSurvive(sortedPeople)

      person.checkWinner(surviver,userGuess)
    }
  });
}

// functions
