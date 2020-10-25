var playerName = window.prompt("What is your robot's name?");
var playerHealth = 100;
var playerAttack = 10;
var playerMoney = 10;

console.log(playerName, playerAttack, playerHealth);

var enemyName = "Roberto";
var enemyHealth = 50;
var enemyAttack = 12;

var skipPenalty = 2;

var fight = function() {

    // Ask players if they would like to fight or skip
    var promptFight = window.prompt("Would you like to FIGHT or SKIP this battle? Enter FIGHT or SKIP to choose.")
    console.log(promptFight);

    if (promptFight.toUpperCase() === "FIGHT") {
        // Alert players that they are starting the round
        window.alert("Welcome to Robot Gladiators!");

        //Subtract the value of `playerAttack` from the value of `enemyHealth` 
        //and use that result to update the value in the `enemyHealth` variable
        enemyHealth -= playerAttack;
        // Log a resulting message to the console so we know that it worked.
        console.log(playerName + " attacked " + enemyName + "! " + playerName + " dealt "
            + playerAttack + " damage, now " + enemyName + " is left with " + enemyHealth + " health points!")

        if (enemyHealth <= 0) {
            window.alert(enemyName + " has died!");
        }
        else {
            window.alert(enemyName + " still has " + enemyHealth + " health left.")
        }

        // Subtract the value of `enemyAttack` from the value of `playerHealth` 
        //and use that result to update the value in the `playerHealth` variable.
        playerHealth -= enemyAttack;
        // Log a resulting message to the console so we know that it worked.
        console.log(enemyName + " attacked " + playerName + "! " + enemyName + " dealt "
            + enemyAttack + " damage, now " + playerName + " is left with " + playerHealth + " health points!")
        
        if (playerHealth <= 0) {
            window.alert(playerName + " has died!")
        } else {
            window.alert(playerName + " still has " + playerHealth + " health left.")
        }
    } else if (promptFight.toUpperCase() === "SKIP") {
        var confirmSkip = confirm("Are you sure you want to skip the fight? You will lose " + skipPenalty + " coins.")
        if (confirmSkip) {
            playerMoney -= skipPenalty;
            window.alert(playerName + " has chosen to skip the fight! " + playerName + " has lost "
             + skipPenalty + " coins, and has " + playerMoney + " remaining!");            
        } else {
            fight();
        }
        
    } else {
        window.alert("You did not respond with either \"FIGHT\" or \"SKIP\"");
    }
};

fight();