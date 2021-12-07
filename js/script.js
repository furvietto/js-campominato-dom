// Consegna
// Copiamo la griglia fatta ieri nella nuova repo e aggiungiamo la logica del gioco (attenzione: non bisogna copiare tutta la cartella dell'esercizio ma solo l'index.html, e le cartelle js/ css/ con i relativi script e fogli di stile, per evitare problemi con l'inizializzazione di git). L'utente indica un livello di difficoltà in base al quale viene generata una griglia di gioco quadrata, in cui ogni cella contiene un numero tra quelli compresi in un range:
// con difficoltà 1 => tra 1 e 100
// con difficoltà 2 => tra 1 e 81
// con difficoltà 3 => tra 1 e 49
// Il computer deve generare 16 numeri casuali nello stesso range della difficoltà prescelta: le bombe. :bomba:
// I numeri nella lista delle bombe non possono essere duplicati.
// In seguito l'utente clicca su una cella: se il numero è presente nella lista dei numeri generati - abbiamo calpestato una bomba - la cella si colora di rosso e la partita termina, altrimenti la cella cliccata si colora di azzurro e l'utente può continuare a cliccare sulle altre celle. La partita termina quando il giocatore clicca su una bomba o raggiunge il numero massimo possibile di numeri consentiti. Al termine della partita il software deve comunicare il punteggio, cioè il numero di volte che l’utente ha cliccato su una cella che non era una b.
// BONUS:
// 1- quando si clicca su una bomba e finisce la partita, evitare che si possa cliccare su altre celle
// 2- quando si clicca su una bomba e finisce la partita, il software scopre tutte le bombe nascoste
// Consigli del giorno: :party_wizard:
// Scriviamo prima cosa vogliamo fare passo passo in italiano, dividiamo il lavoro in micro problemi.
// Ad esempio:
// Di cosa ho bisogno per generare i numeri? Proviamo sempre prima con dei console.log() per capire se stiamo ricevendo i dati giusti. Le validazioni e i controlli possiamo farli anche in un secondo momento.
// Buon lavoro, ci becchiamo coi tickets dalle 15 alle 18






function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
  }

  /**
   * 
   * @param {*} min numero minimo
   * @param {*} max numero massimo
   * @returns array di 16 numeri casuali
   */

function createRandomNumbers(min,max) {
    const bombs = []

    while (bombs.length < 16) {
        let randBomb = getRndInteger(min,max)
        while (bombs.includes(randBomb)) {
            randBomb = getRndInteger(min,max)
        }
        bombs.push(randBomb)
    }

    return bombs
}



const buttton = document.querySelector("button")

    buttton.addEventListener("click" , function () {
        
        const main_cont = document.querySelector(".container-main");
        main_cont.innerHTML = ""

        const grid = document.createElement("div");
        grid.classList.add("square-container");
        main_cont.append(grid);

       

        const level = document.getElementById("level");
        const levelSelected = level.value;

        let cellNumber;
        let cellPerSide;

        switch (levelSelected) {
            default:
            case "easy":
                cellNumber = 100
                cellPerSide = 10
                break;
            case "medium":
                cellNumber = 81
                cellPerSide = 9
                break;
            case "hard":
                cellNumber = 49
                cellPerSide = 7
        }

        const bombArray = createRandomNumbers(1 , cellNumber)
       console.log(bombArray);
       let clicked = 0;
       const winner = cellNumber - 16
        for (let i = 0; i < cellNumber; i++) {
            const square = document.createElement("div")
            square.classList.add("square");

            // come cambiare proprietà di una variabile
            // document.documentElement.style.setProperty(`--cell-length`,cellPerSide)

            // oppure anche cosi
            square.style = `--cell-length : ${cellPerSide}`;                     
            grid.append(square);
            const text = square.innerText = i
            
            function checkbomb() {
                   
                if ( clicked != winner) {
                    const result = document.querySelector(".square-container");
                    if (bombArray.includes(text)) {
                        const squaresBomb = document.querySelectorAll(".square")
                        
                        for (let x = 0; x < squaresBomb.length; x++) {
                            const squaresIndex =parseInt(squaresBomb[x].innerText)
                            
                            if (bombArray.includes(squaresIndex)) {
                                squaresBomb[x].classList.add("bomb") 
                            }
                            squaresBomb[x].removeEventListener("click", checkbomb)
                        }
                        result.innerHTML += `hai perso, hai fatto ${clicked} punti`
                    }else {
                        this.removeEventListener("click", checkbomb)
                        this.classList.add("safe")
                        clicked++
                        if (clicked == winner) {
                            result.innerHTML += `hai vinto, hai fatto ${clicked} punti`
                        }
                    }
                }
            }

            square.addEventListener("click", checkbomb)
        }


    })
    



  




