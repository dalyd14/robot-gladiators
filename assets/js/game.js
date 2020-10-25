// Game States
// "Win" - Player robot has defeated all enemy-robots
//      * Fight all enemy-robots
//      * Defeat each enemy-robot
// "Lose" - Player robot's health is zero or less

var playerName = window.prompt("What is your robot's name?");
var playerHealth = 100;
var playerAttack = 10;
var playerMoney = 10;

var enemyNames = ["Roborto", "Amy Android", "Robo Trumble"];
var enemyHealth = 50;
var enemyAttack = 12;

var skipPenalty = 10;

var fight = function(enemyName) {
    while(enemyHealth > 0 && playerHealth > 0) {
         // Ask players if they would like to fight or skip
        var promptFight = window.prompt("Would you like to FIGHT or SKIP this battle? Enter FIGHT or SKIP to choose.")

        if (promptFight.toUpperCase() === "SKIP") {
            var confirmSkip = confirm("Are you sure you want to skip the fight? You will lose " + skipPenalty + " coins.")
            if (confirmSkip) {
                playerMoney -= skipPenalty;
                window.alert(playerName + " has chosen to skip the fight! " + playerName + " has lost "
                    + skipPenalty + " coins, and has " + playerMoney + " remaining!");  
                break;
            }
        }

        //Subtract the value of `playerAttack` from the value of `enemyHealth` 
        //and use that result to update the value in the `enemyHealth` variable
        enemyHealth -= playerAttack;
        // Log a resulting message to the console so we know that it worked.
        console.log(
            playerName + " attacked " + enemyName + "! " + playerName + " dealt "
            + playerAttack + " damage, now " + enemyName + " is left with " + enemyHealth + " health points!"
        );

        //check enemies health
        if (enemyHealth <= 0) {
            window.alert(enemyName + " has died!");

            // award the player money for the win
            playerMoney =+ 20;

            // leave loop because enemy is dead
            break;
        } else {
            window.alert(enemyName + " still has " + enemyHealth + " health left.")
        }

        // Subtract the value of `enemyAttack` from the value of `playerHealth` 
        //and use that result to update the value in the `playerHealth` variable.
        playerHealth -= enemyAttack;
        // Log a resulting message to the console so we know that it worked.
        console.log(
            enemyName + " attacked " + playerName + "! " + enemyName + " dealt "
            + enemyAttack + " damage, now " + playerName + " is left with " + playerHealth + " health points!"
        )
        
        if (playerHealth <= 0) {
            window.alert(playerName + " has died!")
            break;
        } else {
            window.alert(playerName + " still has " + playerHealth + " health left.")
        }
    }
};

var startGame = function() {
    // reset player stats
    playerHealth = 100;
    playerAttack = 10;
    playerMoney = 10; 

    for (var i = 0; i < enemyNames.length; i++) {
    
        if (playerHealth > 0) {
            window.alert("Welcome to Robot Gladiators! Round " + (i + 1) );
            var pickedEnemyName = enemyNames[i];
            enemyHealth = 50;

            fight(pickedEnemyName)
        } else {
            window.alert("You have lost your robot in battle! Game Over!");
            break;
        }
    }

    endGame();
}

var endGame = function() {
    if (playerHealth > 0) {
        window.alert("Great job, you survived the game! You have a score of " + playerMoney + ".");
    } else {
        window.alert("You have lost your robot in battle!");
    }

    var playAgainConfirm = window.confirm("Would you like to play again?");

    if (playAgainConfirm) {
        startGame();
    } else {
        window.alert("Thank you for playing Robot Gladiators! Come back soon!");
    }
}

// start game when page loads
startGame();

