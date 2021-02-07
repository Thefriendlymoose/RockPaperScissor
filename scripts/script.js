const scissors = 1;
const paper = 2;
const rock = 3;

const buttons = document.querySelectorAll("button");
const newGameButton = document.getElementById("new-game-button");

const compImgContainer = document.getElementById("computer-played");
const userImgContainer = document.getElementById("user-played");
const banner = document.getElementById("announcement");
const roundValue = document.getElementById("round-input")
const compScore = document.getElementById("computer-input");
const userScore = document.getElementById("your-input");

const cancelButton = document.getElementById("cancel-button");

let totalUserScore = 0;
let totalCompScore = 0;



function computerPlay(){
    const rockPaperScissor = [1, 2, 3];
    const randomPlay = rockPaperScissor[Math.floor(Math.random() * rockPaperScissor.length)];
    
    return randomPlay;
}

function computerDisplay(play){
    if(compImgContainer.firstChild){
        compImgContainer.removeChild(compImgContainer.firstChild);
    }
    
    let img = document.createElement("img");
    img.classList.add("played-images");
    if(play === scissors){
        img.src="images/scissors.png"
        compImgContainer.appendChild(img);
    } else if(play === paper){
        img.src="images/paper.png"
        compImgContainer.appendChild(img);
    } else if (play === rock){
        img.src="images/rock.png"
        compImgContainer.appendChild(img);
    }
}

function userDisplay(play){
    if(userImgContainer.firstChild){
        userImgContainer.removeChild(userImgContainer.firstChild);
    }
    
    let img = document.createElement("img");
    img.classList.add("played-images");
    if(play === scissors){
        img.src="images/scissors.png"
        userImgContainer.appendChild(img);
    } else if(play === paper){
        img.src="images/paper.png"
        userImgContainer.appendChild(img);
    } else if (play === rock){
        img.src="images/rock.png"
        userImgContainer.appendChild(img);
    }
}

function startNewGame(){
    const inputValue = document.getElementById("rounds").value;
    
    resetGame();
    playNewGame(inputValue, compScore, userScore, roundValue);
    
 
}

async function playNewGame(rounds, compScoreElement, userScoreElement, roundElement){

    let round = 0;

    for(let i = 0; i<rounds; i++){
        round++;
        roundElement.textContent = `${round}/${rounds}`;

         let myPromise = new Promise((resolve, reject) => {
            buttons.forEach(button => {
                button.addEventListener("click",(e) => {
                if(parseInt(e.target.value) === 5 || parseInt(e.target.value) === 4) {
                    reject(parseInt(e.target.value));
                }
                resolve(parseInt(e.target.value))
                })
            });
        })
        
        await myPromise.then(userAction => {
            playRound(userAction, computerPlay());
        }, (userAction) => {
            i = rounds-1
            if(userAction === 4){
                startNewGame()
            } 
            })
        compScoreElement.textContent = totalCompScore;
        userScoreElement.textContent = totalUserScore;
    }
    
    checkWinner()
}

newGameButton.addEventListener("click", () => {
    startNewGame()
    document.getElementById("rounds").value = "";
})

function playRound(userSelection, computerSelection){    
    computerDisplay(computerSelection);
    userDisplay(userSelection);

    switch(true){
        case computerSelection === userSelection:
            
        break
        case computerSelection === 3 && userSelection === 2:
            totalUserScore += 1;
        break
        case computerSelection === 3 && userSelection === 1:
            totalCompScore += 1;
        break
        case computerSelection === 2 && userSelection === 1:
            totalUserScore += 1;
        break
        case computerSelection === 2 && userSelection === 3:
            totalCompScore += 1;
        break
        case computerSelection === 1 && userSelection === 3:
            totalUserScore += 1;
        break
        case computerSelection === 1 && userSelection === 2:
            totalCompScore += 1;
        break
        
        default:
            return "Incorrect input"
        break
    }

}

cancelButton.addEventListener("click", () => {
    resetGame();
});

function checkWinner(){
    if(totalCompScore===totalUserScore){
        banner.textContent = "Equal Score: No Winner"
    } else if(totalCompScore>totalUserScore){
        banner.textContent = "Computer Wins!"
    } else if(totalCompScore<totalUserScore){
        banner.textContent = "You Win!"
    }
}

function resetGame(){
    roundValue.textContent = "";
    compScore.textContent = "";
    userScore.textContent = "";
    banner.textContent = "";
    if(userImgContainer.firstChild){
        userImgContainer.removeChild(userImgContainer.firstChild);
    }
    if(compImgContainer.firstChild){
        compImgContainer.removeChild(compImgContainer.firstChild);
    }

    totalUserScore = 0;
    totalCompScore = 0;
}