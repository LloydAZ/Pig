/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLOBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/


/*
YOUR 3 CHALLENGES
Change the game to follow these rules:

1. A player looses his ENTIRE score when he rolls two 6 in a row. After that, it's the next player's turn. (Hint: Always save the previous dice roll in a separate variable)
2. Add an input field to the HTML where players can set the winning score, so that they can change the predefined score of 100. (Hint: you can read that value with the .value property in JavaScript. This is a good oportunity to use google to figure this out :)
3. Add another dice to the game, so that there are two dices now. The player looses his current score when one of them is a 1. (Hint: you will need CSS to position the second dice, so take a look at the CSS code for the first one.)
*/

var scores, roundScore, activePlayer, gamePlaying, prevDie;

init();

document.querySelector('.btn-roll').addEventListener('click', function () {
    if (gamePlaying) {
        // 1. Random Number
        var die1 = Math.floor((Math.random() * 6) + 1);
        var die2 = Math.floor((Math.random() * 6) + 1);
        
        console.log(die1, die2);
        
        // 2. Display the result
        var diceDOM1 = document.getElementById('dice-1');
        diceDOM1.style.display = 'block';
        diceDOM1.src = 'dice-' + die1 + '.png';
        
        var diceDOM2 = document.getElementById('dice-2');
        diceDOM2.style.display = 'block';
        diceDOM2.src = 'dice-' + die2 + '.png';
        
        // Challenge #3 - Checking both dice values to see if either one of them is a six
        // and a previous value was a six.  I also added the rule that if both die have a
        // six, then you lose your full score as well.
        if (((die1 === 6) && (die2 === 6)) || ((prevDie === 6) && ((die1 === 6) || (die2 === 6)))) {
            // If the player rolls two sixes in a row, they lose their entire score.
            scores[activePlayer] = 0;
            document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
            nextPlayer();
        } else if ((die1 !== 1) && (die2 !== 1)) {
            // 3. Update the round score if the rolled number is NOT a 1
            // Add score
            // Challenge #3 - Add the value of both dice to the roundScore.
            roundScore += (die1 + die2);
            
            // If either of the two dice contains a 6, set the value of prevDie to 6.
            // Otherwise, just set the value of prevDie to the value of the first die.
            if ((die1 === 6) || (die2 === 6)) {
                prevDie = 6;
            } else {
                prevDie = die1;
            }
            
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
        } else {
            nextPlayer();
        }
    }
});

document.querySelector('.btn-hold').addEventListener('click', function () { 
    if(gamePlaying) {
        // Add CURRENT score to GLOBAL score
        scores[activePlayer] += roundScore;

        // Update the UI
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
        
        var input = document.querySelector('.final-score').value;
        var winningScore;
        
        // Undefined, 0, null, or "" are COERCED to false.
        // Anything else is COERCED to true.
        // NOTE: This is the instructors original solution, which only works if the value put into
        // the input text box is a number.  If the value put in is alphabetic, the value of winningScore
        // will never evaluate correctly with the test to see if the player won.  The game will continue
        // indefinitely, unless someone changes the value to a numeric value.
        //if(input) {
        //    winningScore = input;
        //} else {
        //    winningScore = 100;
        //}        
        
        // My solution is to parse the string from the input and see if it is an int.  If it's not,
        // then it will instead use the value of 100 for the winning score.
        winningScore = parseInt(input) || 100;

        // Check if player won the game
        if (scores[activePlayer] >= winningScore) {
            document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            gamePlaying = false;
            
            hideDice();

        } else {
            // Next player
            nextPlayer();
        }
    }
});

document.querySelector('.btn-new').addEventListener('click', init);

function init() {
    scores = [0, 0];
    activePlayer = 0;
    roundScore = 0;
    gamePlaying = true;
    prevDie = 0;
    
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
    
    hideDice();
}

function nextPlayer() {
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;
    prevDie = 0;

    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

    hideDice();
}

function hideDice() {
    document.getElementById('dice-1').style.display = 'none';
    document.getElementById('dice-2').style.display = 'none';
}