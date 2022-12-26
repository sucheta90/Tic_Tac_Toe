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
let header1 = document.getElementById('p1-header');
let header2 = document.getElementById('p2-header');
 
// let colorArray = ['#4FE6F1','#5EDBEE','#6CD1EB','#7BC6E8','#89BBE4','#98B1E1','#A6A6DE'];

/*setInterval((()=>{

}), 1000)*/

let clickCounter = 0; // keeps a track of the clicks.

// Combos is an array of winning combination of id's. 
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

// Variables below stores players name and track winner and the runner up.
let player1;
let player2;
let winner;
let runner;

//To keep a track of rounds, I am maintaining an array.
let roundTracker = [];

//Function trackround


// By Default the Game Board is disabled and will not register click events. The default value changes by Clicking Start Button  */
document.getElementById('game-board').style.pointerEvents = 'none';
document.getElementById('play-again').setAttribute('disabled', '');
document.getElementById('play-again').style.opacity = '.6';

// This Function validated the player names. The function is called on click event by Start button.
function validation(){
    if (document.getElementById('p1-name').value.length===0||document.getElementById('p2-name').value.length===0){
        showMsg.innerText = 'Please enter names';
        showMsg.style.color ='red';
    }
    else{
        if(p1.value && p2.value && p1.value.toUpperCase() === p2.value.toUpperCase()){
            showMsg.innerText = 'Game needs two different players';
            showMsg.style.color ='red';
        }
        else{
            player1 = p1.value;
            player1 = p1.value;
            player2 = p2.value;
            header1.innerText = player1;
            header2.innerText = player2;
            showMsg.style.color ='green';
            showMsg.innerText = `${player1}'s turn`
            startBtn.setAttribute('disabled', '');
            p1.setAttribute('disabled', '');
            p2.setAttribute('disabled', '');
            startBtn.style.opacity = '.6';
            document.getElementById('game-board').style.pointerEvents = 'auto';
            document.getElementById('play-again').removeAttribute('disabled');
            document.getElementById('play-again').style.opacity = '1';
            
        }
    }
    
}

// Start-btn - on 'click' event starts the player validation process. Once successfully validated, will enable the game board for click events and enables Play Again -btn.
startBtn.addEventListener('click', (e)=>{
    e.preventDefault();
    validation();
    
})



// Show a mesage - Announces Winner and disables the game board to avoid unnecessary click events.
function winnerAnnounce(data){
    if(data == 'X'){
        showMsg.innerText = `${player1} is the winner!`;
        winner = player1;
        runner = player2
    }
    else{
        console.log('checking else')
       showMsg.innerText = `${player2} is the winner! `;
       winner = player2;
       runner = player1;
    }
    document.getElementById('game-board').style.pointerEvents = 'none';
}
    
// This function updates the score board and keeps a track of the rounds
function updateScoreBoard(winner){
    if(roundTracker.length <= 5){
        if(winner){
            roundTracker.push(winner);
            if(winner == player1){
                //document.getElementById(`p1r${roundTracker.length}`).innerText = '✓';
                document.getElementById(`p1r${roundTracker.length}`).innerHTML = '&#10003;';
                document.getElementById(`p2r${roundTracker.length}`).innerHTML = '&#10060;';
            }
            else{
                document.getElementById(`p2r${roundTracker.length}`).innerHTML = '&#10003;';
                document.getElementById(`p1r${roundTracker.length}`).innerHTML = '&#10060;';
            }
        }
        else{
            roundTracker.push('');
            document.getElementById(`p1r${roundTracker.length}`).innerText = 'D';
            document.getElementById(`p2r${roundTracker.length}`).innerText = 'D'; 
            
        }
        if(roundTracker.length == 5){
            console.log('inside > 5')
            showMsg.innerText = 'GAME OVER'
            document.getElementById('play-again').setAttribute('disabled', '');
            document.getElementById('play-again').style.opacity = '.6';
        }
    }
    
}
        
            


// Game Board 
gameBoard.addEventListener('click', (e)=>{
   
    clickCounter++;
    if(!e.target.innerText){
        if(clickCounter % 2 === 0){
            e.target.innerText = 'O';
            if(clickCounter< 9){
                showMsg.innerText = `${player1}'s turn`

            }
            
        }
        else{
            e.target.innerText = 'X';
            if(clickCounter < 9){
                showMsg.innerText = `${player2}'s turn`
            }
            
        } 
        if(clickCounter == 9){
            showMsg.innerText = 'It\'s a Draw!!!';
            showMsg.style.color = 'blue';
            document.getElementById('game-board').style.pointerEvents = 'none';
            updateScoreBoard(winner);
           
            
        }
        
        if(clickCounter >= 5){
            for(let i = 0; i < combos.length; i++) {
                if (document.getElementById(combos[i][0]).innerText && 
                    document.getElementById(combos[i][0]).innerText == document.getElementById(combos[i][1]).innerText &&
                    document.getElementById(combos[i][0]).innerText == document.getElementById(combos[i][2]).innerText) {
                        document.getElementById(combos[i][0]).style.backgroundColor= '#ffcfd2'
                        document.getElementById(combos[i][1]).style.backgroundColor= '#ffcfd2'
                        document.getElementById(combos[i][2]).style.backgroundColor= '#ffcfd2'
                        winnerAnnounce(document.getElementById(combos[i][0]).innerText); 
                        updateScoreBoard(winner);
                       
                    }
            }   
        }
        
        
    } 
    
    else{
        clickCounter--;
    }
    
    
})


// This is a common fucntion used in Play-again and Reset buttons. 
function gameBoardReset(){
    allSquares.forEach(square=>{ 
        square.innerText = '';
        square.style.backgroundColor= 'inherit';
    });
    clickCounter = 0;
    showMsg.style.color= 'green';
}


// Play Again only resets the game board and allows the same players to continue playing
playAgain.addEventListener('click', (e)=>{
    
    gameBoardReset();
    document.getElementById('game-board').style.pointerEvents = 'auto';
    if(winner){
        player1 = winner;
        player2 = runner;
        showMsg.innerText = `${winner} plays first`;
    }
    else{
        showMsg.innerText = `${player1}'s turn`;
    }
    
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
    runner = '';
    roundTracker = [];
    showMsg.innerText = '';
    document.getElementById('game-board').style.pointerEvents = 'none';
    document.getElementById('play-again').setAttribute('disabled', '');
    document.getElementById('play-again').style.opacity = '.6';
    p1.removeAttribute('disabled');
    p2.removeAttribute('disabled');
    startBtn.removeAttribute('disabled');
    startBtn.style.opacity = '1'
    // Below code clears the table data on Reset.
    document.querySelectorAll('td').forEach(td=>{
        return td.innerHTML = '';
    })
    document.getElementById('p1-header').innerText = 'Player 1';
    document.getElementById('p2-header').innerText = 'Player 2';

})
/* End of reset */

