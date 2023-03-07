/*
Consegna
L'utente clicca su un bottone che genererà una griglia di gioco quadrata.
Ogni cella ha un numero progressivo, da 1 a 100.
Ci saranno quindi 10 caselle per ognuna delle 10 righe.
Quando l'utente clicca su ogni cella, la cella cliccata si 
colora di azzurro ed emetto un messaggio in console con il numero 
della cella cliccata.
*/


// inizializzo il contenitore degli square, il bottone che lo andrà a generare, il bottone per cancellare tutto e il risultato in pagina
let gridContainerEl = document.getElementById("grid-container");
let playButtonEl = document.getElementById("play-button");
let clearButtonEl = document.getElementById("clear-button");
let resultEl = document.getElementById("result");

let chooseDifficultInputEl;

let bodyEl = document.querySelector("body");

// inizializzo un array vuoto per inserirgli, tramite una funzione 16 numeri generati automaticamente
let haveIt = [];

// inizializzo due variabili, una per il gameOver che inizializzo a false che fa continuare tutto, e un contatore che inizializzo
// a zero per aiutarmi a gestire quante caselle con classe black vengono cliccate
let isGameOver = false;
let isWin = 0;


// aggiungo funzione al click del bottone che genera la grigli in base al livello di difficoltà scelto
playButtonEl.addEventListener("click", function() {

    // inizializzo il controllo della difficoltà all'interno della funzione CLICK così da non stamparla immediatamente al lancio del programma
    let chooseDifficultInputEl = document.getElementById("choose-difficult").value;
    // inizializzo un contatore vuoto
    let cellNumber;

    // difficoltà facile
    if (chooseDifficultInputEl === "0") {


        // STYLE
        gridContainerEl.style.backgroundImage = "url(./img/minecraft.jpg)";
        gridContainerEl.style.backgroundRepeat = "no-repeat";
        gridContainerEl.style.backgroundSize = "cover";
        gridContainerEl.style.color = "white";
        bodyEl.style.backgroundImage = "url(./img/minecraftbg.jpg)";
        bodyEl.style.backgroundRepeat = "no-repeat";
        bodyEl.style.backgroundSize = "cover";
        // /STYLE


        // ciclo for per generare solo 16 numeri all'interno dell'array
        for (i = 0; i < 8; i++) {

            randomNumberUnique(100);

        }

        gridContainerEl.style.width = "calc(70px * 10)";

        // in facile gli square devono essere 100
        cellNumber = 100;

        // funzione bella
        howManySquare(cellNumber);

    // difficoltà normale
    } else if (chooseDifficultInputEl === "1") {

        // STYLE
        gridContainerEl.style.backgroundImage = "url(./img/warzone.jpg)";
        gridContainerEl.style.backgroundRepeat = "no-repeat";
        gridContainerEl.style.backgroundSize = "cover";
        gridContainerEl.style.color = "white";
        gridContainerEl.style.backgroundPosition = "bottom";
        bodyEl.style.backgroundImage = "url(./img/warzonebg.jpg)";
        bodyEl.style.backgroundRepeat = "no-repeat";
        bodyEl.style.backgroundSize = "cover";
        // /STYLE


        // ciclo for per generare solo 16 numeri all'interno dell'array
        for (i = 0; i < 8; i++) {

            randomNumberUnique(81);

        }

        gridContainerEl.style.width = "calc(70px * 9)";

        // in normale gli square devono essere 81
        cellNumber = 81;

        // funzione bella
        howManySquare(cellNumber);

    // difficoltà difficile
    } else if (chooseDifficultInputEl === "2") {

        // STYLE
        gridContainerEl.style.backgroundImage = "url(./img/soulslike.jpg)"
        gridContainerEl.style.backgroundRepeat = "no-repeat";
        gridContainerEl.style.backgroundSize = "cover";
        gridContainerEl.style.color = "white";
        bodyEl.style.backgroundImage = "url(./img/soulslikebg.jpg)"
        bodyEl.style.backgroundRepeat = "no-repeat";
        bodyEl.style.backgroundSize = "cover";
        // /STYLE


        // ciclo for per generare solo 16 numeri all'interno dell'array
        for (i = 0; i < 8; i++) {

            randomNumberUnique(49);

        }

        gridContainerEl.style.width = "calc(70px * 7)";

        // in difficile gli square devono essere 49
        cellNumber = 49;

        // funzione bella
        howManySquare(cellNumber);
    }

    // disabilito il pulsante
    playButtonEl.disabled = true;

});


// aggiungo funzione al click del bottone che svuota la griglia
clearButtonEl.addEventListener("click", function() {
    
    // svuoto il contenuto in pagina
    gridContainerEl.innerHTML = "";
    
    // riabilito il pulsante
    playButtonEl.disabled = false;
    
    // svuoto l'array ogni volta che si clicca sul pulsante CLEAR
    haveIt = [];

    // rimuovo il risultato in pagina
    resultEl.innerText = "";

    // setto di nuovo la variabile al suo valore iniziale
    isGameOver = false;

    // riporto il punteggio a 0
    isWin = 0;

    
    // STYLE
    bodyEl.style.backgroundImage = "url(./img/mhhh.jpg)";
    bodyEl.style.backgroundSize = "no-repeat";
    bodyEl.style.repeat = "no-repeat";
    // /STYLE
});




// FUNCTION //

// funzione per capire quanti square generare in base alla difficoltà, e come dividere le righe.
function howManySquare(cellNumber) {

    for (let i = 0; i < cellNumber; i++) {
        
        // creo square con innertext il numero della cella
        let newSquareEl = createSquare(i + 1);

        // al click dello square questo:
        newSquareEl.addEventListener("click", function() {

            // se isGameOver è false allora continua
            if (isGameOver) {
                return;
            }

            // se l'array contiene lo stesso numero che ha una determinata cella allora:
            if (haveIt.includes(parseInt(newSquareEl.innerText))) {

                let allSquareEl = document.querySelectorAll(".square");
                for (let j = 0; j < allSquareEl.length; j++) {

                    if (haveIt.includes(parseInt(allSquareEl[j].innerText))) {
                        allSquareEl[j].classList.add("red");
                    }
                }

                // se è true ferma tutto
                isGameOver = true;

                // risultato in pagina GAME OVER
                resultEl.innerText = "Hai perso!";

            } else {

                // aggiungo background-color AZZURRO alle celle normali
                newSquareEl.classList.add("black");
                console.log(i + 1);

                // incremento il contatore solo se la casella non è già stata selezionata
                if (!newSquareEl.classList.contains("selected")) {

                    isWin++;
                    newSquareEl.classList.add("selected");
                    resultEl.innerText = "Punteggio: " + isWin;

                }

                // se ho selezionato tutte le caselle black, emetto il messaggio di vittoria
                if (isWin === (cellNumber - haveIt.length)) {
                    resultEl.innerText = "Hai vinto!";

                }

            }

        })

        // appendiamolo al genitore
        gridContainerEl.append(newSquareEl);
    }

}


// funzione che genera un elemento, gli assegna una classe "square"
function createSquare(text) {

    // creare un elemento
    let newEl = document.createElement("div");
    // dargli una classe
    newEl.classList.add("square");

    // dirgli cosa visualizzare in pagina
    newEl.innerText = text ;

    // cosa deve tornare questa variabile quando viene chiamata
    return newEl;

}


// numero random del computer
function randomNumberUnique(maxNr) {

    // genero numero random con parametro che darà in base alla difficoltà escluso lo 0
    let random = Math.floor(Math.random() * maxNr) + 1;
    
    // se non include tale numero, allora pushalo dentro l'array
    if(!haveIt.includes(random)) {

        haveIt.push(random);
        return random;

    // altrimenti restarta la funzione dall'inizio fin quando non si arriva alla lunghezza massima dell'array = 16
    } else {
            
        if(haveIt.length < maxNr) {
    
            return  randomNumberUnique(maxNr);

        }
    }

}

// /FUNCTION