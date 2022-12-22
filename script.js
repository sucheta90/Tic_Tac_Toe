const gameBoard = document.querySelector('.game-board');
const allSquares = document.querySelectorAll('.square');
const resetBtn= document.querySelector('#reset');
const playAgain = document.getElementById('play-again')
const allPlayers = document.querySelector('.players');
const body = document.getElementsByTagName('body');
const startBtn = document.getElementById('start-btn');
const showMsg = document.getElementById('show-msg')
let p1 = document.getElementById('p1-name');
let p2 = document.getElementById('p2-name');

let colorArray = ['#4FE6F1','#5EDBEE','#6CD1EB','#7BC6E8','#89BBE4','#98B1E1','#A6A6DE'];

setInterval((()=>{

}), 1000)

let clickCounter = 0;
const combos = [
    ['r1c1', 'r1c2','r1c3'], 
    ['r2c1','r2c2','r2c3'],
    ['r3c1','r3c2','r3c3'], 
    ['r1c1','r2c2','r3c3'],
    ['r1c3','r2c2','r3c1'],
    ['r1c1','r2c1','r3c1'],
    ['r1c2','r2c2','r3c2'],
    ['r1c3','r2c3', 'r3c3']
]
let player1;
let player2;
let winner;

/* By Default the Game Board is disabled and will not register click events. The default value changes by Clicking Start Button  */
document.getElementById('game-board').style.pointerEvents = 'none';
document.getElementById('play-again').style.pointerEvents = 'none';
document.getElementById('play-again').style.opacity = '.6';

/* This Function validated the player names. The function is called on click event by Start button*/
function validation(){
    if (document.getElementById('p1-name').value.length===0||document.getElementById('p2-name').value.length===0){
        showMsg.innerText = 'Please enter names';
        showMsg.style.color ='red';
    }
    else{
        if(p1.value && p2.value && p1.value === p2.value){
            showMsg.innerText = 'Game needs two different players';
            showMsg.style.color ='red';
        }
        else{
            player1 = p1.value;
            player1 = p1.value;
            player2 = p2.value;
            showMsg.style.color ='green';
            showMsg.innerText = `${player1}'s turn`
            document.getElementById('game-board').style.pointerEvents = 'auto';
            document.getElementById('play-again').style.pointerEvents = 'auto';
            document.getElementById('play-again').style.opacity = '1';
        }
    }
    
}

/* */
startBtn.addEventListener('click', (e)=>{
    console.log('clicked')
    e.preventDefault();
    validation();
    
})




function winnerAnnounce(data){
    if(data == 'X'){
        showMsg.innerText = `${player1} is the winner!`;
        winner = player1;
    }
    else{
        console.log('checking else')
       showMsg.innerText = `${player2} is the winner! `;
       winner = player2;
    }
    document.getElementById('game-board').style.pointerEvents = 'none';
}
    





gameBoard.addEventListener('click', (e)=>{
   
    clickCounter++;
    if(!e.target.innerText){
        if(clickCounter % 2 === 0){
            e.target.innerText = 'O';
            if(!clickCounter< 9){
                showMsg.innerText = `${player1}'s turn`

            }
            
        }
        else{
            e.target.innerText = 'X';
            if(!clickCounter<9){
                showMsg.innerText = `${player2}'s turn`
            }
            
        } 
        if(clickCounter == 9){
            showMsg.innerText = 'It\'s a Draw!!!';
            showMsg.style.color = 'blue';
            document.getElementById('game-board').style.pointerEvents = 'none';
        }

        
        if(clickCounter >= 5){
            for(let i = 0; i < combos.length; i++) {
                if (document.getElementById(combos[i][0]).innerText && 
                    document.getElementById(combos[i][0]).innerText == document.getElementById(combos[i][1]).innerText &&
                    document.getElementById(combos[i][0]).innerText == document.getElementById(combos[i][2]).innerText) {
                        document.getElementById(combos[i][0]).style.backgroundColor= '#FCD4B7'
                        document.getElementById(combos[i][1]).style.backgroundColor= '#FCD4B7'
                        document.getElementById(combos[i][2]).style.backgroundColor= '#FCD4B7'
                        winnerAnnounce(document.getElementById(combos[i][0]).innerText); 
                    }
            }   
        }
        
        
    } 
    
    else{
        alert('wrong box')
        clickCounter--;
    }
    
    
})

function gameBoardReset(){
    allSquares.forEach(square=>{ 
        square.innerText = '';
        square.style.backgroundColor= 'inherit';
    });
    clickCounter = 0;
    showMsg.style.color= 'green';
}


/* Play Again only resets the game board and allows the same players to continue playing*/
playAgain.addEventListener('click', (e)=>{
    gameBoardReset();
    document.getElementById('game-board').style.pointerEvents = 'auto';
    showMsg.innerText = `${winner} plays first`;
});
/* */


/* On click event Resets the gameboard */
resetBtn.addEventListener('click', (e)=>{
    gameBoardReset();
    player1 = '';
    player2 ='';
    p1.value ='';
    p2.value= '';
    winner = '';
    showMsg.innerText = '';
    document.getElementById('play-again').style.pointerEvents = 'none';
    document.getElementById('play-again').style.opacity = '.6';
})
/* End of reset */

