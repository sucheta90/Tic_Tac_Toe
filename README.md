# Tic_Tac_Toe

Our childhood would have been incomplete without a game like this - 'Tic_Tac_Toe'. The app is build using technologies like HTML, CSS and JavaScript.

### About the Game

- When the page loads, the **Game Board** and **Play Again** button will be disabled.
- To start the game, players must enter their names and click **Start** button. A validation process takes place to check
- 1. Names are filled.
- 2. Players have different names.
- Only on successful validation of the player's name, the Game board will be enabled.
- Each time the game starts, Player 1 plays first until there is a winner. After which, whoever wins the current round, gets to play first on the next round of the game.
- Play Again resets the Game Board only. So the same players can continue to play the game.
- To reset the game _Reset_ button should be used. This clears the game board and clears player's name. Reset disables _Play Again_ and the game board. Allows players to start a new game.

### How I solved the problem

Below snippet shows how I have stored the combinations of different winning senarios. I have created an array of arrays that contain the id's of different squares in the game board.

```
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
```

I created a variable _clickCounter_ that helped me keep a track of the click events. Based on which I started checking for the winnig combination.

```
let clickCounter = 0; // keeps a track of the clicks.
```

To be exact, when the clickCounter = 5 , with the help of a _For Loop_ , I am searching for the winning combination that satisty the below conditions:

1. The Squares should not return blank sting.
2. All three squares should have the same innerText.

```
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
```

When the clickCounter is 9, the match is declared draw.

### Technical Details

I have disabled and enabled differnt sections of this game based on click events.

```
document.getElementById('game-board').style.pointerEvents = 'none'; // Disabled
document.getElementById('game-board').style.pointerEvents = 'auto'; //Enabled

```

The snippet below shows an example of the DOM manipulation.

```
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
```

### Future implementation as planned

- Players can select upto 10 rounds from a drop down menu.
- A Scoreboard to track rounds and winners of each round.
- A drop down menu to toggle between Single and Double player game.
