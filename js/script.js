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

// ---------!!!!!!!!!!!!------- con function

// const button = document.querySelector("button");

// button.addEventListener("click" ,function () {
    
//     const select = document.getElementById("difficulty");
    
//     let easy = 100;
//     let medium = 81;
//     let hard = 49;
//     let easyclass = "easy"
//     let mediumClass = "medium";
//     let hardClass = "hard"

//     function addSquare(cont, difficulty) {
//         const active = document.querySelector(".active");
//         const squareCont = document.querySelector(".square-container");
//         squareCont.innerHTML = ""
//         active.classList.add("block");
//         for (let i = 0; i < cont; i++) {
//             const div = document.createElement("div");
//             div.classList.add(difficulty);
//             squareCont.append(div);
//             div.append(i + 1);  
            
//             div.addEventListener("click" , function () {
//                 this.classList.add("color-blue")
//             })
//         }
//     }

//     // easy

//     if (select.value == "easy") {
//         addSquare(easy,easyclass);
        
//     // medium

//     } else if (select.value == "medium"){
//         addSquare(medium,mediumClass);

//     // hard

//     } else {
//         addSquare(hard,hardClass);
//     }
    
// })




// --------!!!!!!!!------- normale
function getRndInteger(min, max) {
    let bomb = []

    for (let i = 0; i < 16; i++) {
        min = Math.ceil(min);
        max = Math.floor(max)

        let element = bomb[i];
        element =  Math.floor(Math.random() * (max - min + 1) ) + min;
        
        while (bomb.includes(element)) {
            element =  Math.floor(Math.random() * (max - min + 1) ) + min;
        }
        bomb.push(element)
    }
    return bomb
  }



  
const button = document.querySelector("button");
const select = document.getElementById("difficulty");
const active = document.querySelector(".active");
const squareCont = document.querySelector(".square-container");


button.addEventListener("click" ,function () {

    const easyBomb = getRndInteger(1,100);
    const mediumBomb = getRndInteger(1,81);
    const hardBomb = getRndInteger(1,49);
    

    if (select.value == "easy") {
        squareCont.innerHTML = ""
        active.classList.add("block");
        for (let i = 0; i < 100; i++) {
            const div = document.createElement("div");
            div.classList.add("easy");
            squareCont.append(div);
            div.append(i + 1);  
            
             div.addEventListener("click" , function () {
                if (easyBomb.includes(i + 1)) {
                    for (let x = 0; x < 100; x++) {
                        const red = document.querySelectorAll(".easy");
                        if (easyBomb.includes(x + 1)) {
                            red[x].classList.add("bomb");                          
                        }
                        squareCont.replaceChild(red[x].cloneNode(true), red[x]); 
                    }

                } else {
                    this.classList.add("color-blue");
                }
            })
           
        }

    
        
    // medium

    } else if (select.value == "medium"){
        squareCont.innerHTML = ""
        active.classList.add("block");
        for (let i = 0; i < 81; i++) {
            const div = document.createElement("div");
            div.classList.add("medium");
            squareCont.append(div);
            div.append(i + 1);  
            
            div.addEventListener("click" , function () {
                if (mediumBomb.includes(i + 1)) {
                    for (let x = 0; x < 81; x++) {
                        const red = document.querySelectorAll(".medium");
                        if (mediumBomb.includes(x + 1)) {
                            red[x].classList.add("bomb");                          
                        }
                        squareCont.replaceChild(red[x].cloneNode(true), red[x]); 
                    }

                } else {
                    this.classList.add("color-blue");
                }
            })
        }

    // hard

    } else {
        squareCont.innerHTML = ""
        active.classList.add("block");
        for (let i = 0; i < 49; i++) {
            const div = document.createElement("div");
            div.classList.add("hard");
            squareCont.append(div);
            div.append(i + 1);  
            
            div.addEventListener("click" , function () {
                if (hardBomb.includes(i + 1)) {
                    for (let x = 0; x < 49; x++) {
                        const red = document.querySelectorAll(".hard");
                        if (hardBomb.includes(x + 1)) {
                            red[x].classList.add("bomb");                          
                        }
                        squareCont.replaceChild(red[x].cloneNode(true), red[x]); 
                    }

                } else {
                    this.classList.add("color-blue");
                }
            })
        }
    }
    
})