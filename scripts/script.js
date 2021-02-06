const scissors = 1;
const paper = 2;
const rock = 3;

const buttons = document.querySelectorAll("button");
const newGameButton = document.getElementById("new-game-button");




function computerPlay(){

    //clear computer image

    const rockPaperScissor = [1, 2, 3];
    const randomPlay = rockPaperScissor[Math.floor(Math.random() * rockPaperScissor.length)];
    
    if(randomPlay === scissors){
        // display scissors
    } else if(randomPlay === paper){
        //display paper
    } else if (randomPlay === rock){
        //display rock
    }
    
    return randomPlay;
}

function userPlay(play){

    //clear user image

    if(play === scissors){
        // play scissors
    } else if(play === paper){
        //play paper
    } else if (play === rock){
        //play rock
    }
}

function startNewGame(){
    const inputValue = document.getElementById("rounds").value;
    const roundValue = document.getElementById("round-input")
    const compScore = document.getElementById("computer-input");
    const userScore = document.getElementById("your-input");

    roundValue.textContent = "";
    compScore.textContent = "";
    userScore.textContent = "";

    playNewGame(inputValue);
 
}

async function playNewGame(rounds){
    let userScore = 0;
    let compScore = 0;
    let round = 0;

    const roundElement = document.getElementById("round-input")

    for(let i = 0; i<rounds; i++){
        round++;
        roundElement.textContent = round;

         let myPromise = new Promise((resolve, reject) => {
            buttons.forEach(button => {
                button.addEventListener("click",(e) => {
                if(parseInt(e.target.value) === 5){
                    reject(Error("Game Cancelled"));
                }
                resolve(parseInt(e.target.value))
                })
            });
        })
        
        await myPromise.then(userAction => {
            playRound(userAction, computerPlay());
        }, () => i = rounds-1)
    }

}

newGameButton.addEventListener("click", () => {
    startNewGame()
})


    buttons.forEach(button => {
        button.addEventListener("click",(e) => {
        return parseInt(e.target.value)
        })
    });




function playRound(userSelection, computerSelection){    
 //   userPlay(userSelection);
console.log(userSelection);
console.log(computerSelection);
/*     switch(true){
        case compPlay === playerPlay:
            return null
        break
        case compPlay === "ROCK" && playerPlay === "PAPER":
            return true
        break
        case compPlay === "ROCK" && playerPlay === "SCISSOR":
            return false
        break
        case compPlay === "PAPER" && playerPlay === "SCISSOR":
            return true
        break
        case compPlay === "PAPER" && playerPlay === "ROCK":
            return false
        break
        case compPlay === "SCISSOR" && playerPlay === "ROCK":
            return true
        break
        case compPlay === "SCISSOR" && playerPlay === "PAPER":
            return false
        break
        
        default:
            return "Incorrect input"
        break */
   // }

}

