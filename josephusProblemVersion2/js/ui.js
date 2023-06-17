// every thing related to the HTML UI
class UI {
    showInputFields() { }
    sleep(milliseconds) {
        return new Promise(resolve => setTimeout(resolve, milliseconds))
    }
    // print a message in DOM
    showMessage(message, className) {
        // create a <div> tag to show message 
        const div = document.createElement("div")
        // add classes
        div.classList = `alert alert-center ${className}`
        // insert message in <div> tag 
        div.appendChild(document.createTextNode(message))
        // append created <div> tag to html form 
        document.querySelector("#show-message").appendChild(div)
        // remove message after 2 secounds
        setTimeout(() => {
            formData.reset()
            document.querySelector(".alert").remove()
        }, 2000);
    }

    showPlayers(population) {
        for (let i = 1; i <= population; i++) {

            let div = document.createElement("div")

            div.classList.add("players", "alive")

            div.setAttribute("person-id", i)

            div.appendChild(document.createTextNode(i))

            document.querySelector("#display-game").appendChild(div)
        }
    }

    async displayKills(id) {
        const players = document.querySelectorAll(".players")

        for (let i = 0; i < players.length; i++) {
            let person = players[i];

            if (person.getAttribute("person-id") == id) {
                person.classList.remove("alive");
                person.classList.add("dead");
            }
            await this.sleep(500);
        }
    }
}