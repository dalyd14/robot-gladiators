// Game States
// "Win" - Player robot has defeated all enemy-robots
//      * Fight all enemy-robots
//      * Defeat each enemy-robot
// "Lose" - Player robot's health is zero or less

var fight = function(enemy) {
    window.alert(
        "In one corner we have " + enemy.name + " [" + enemy.health + " HP] and in the other corner, we have " + playerInfo.name + " [" + playerInfo.health + " HP]!"
    );
    while(enemy.health > 0 && playerInfo.health > 0) {
         // Ask players if they would like to fight or skip
        var promptFight = window.prompt("Would you like to FIGHT or SKIP this battle? Enter FIGHT or SKIP to choose.")

        if (promptFight.toUpperCase() === "SKIP") {
            var confirmSkip = confirm("Are you sure you want to skip the fight? You will lose " + skipPenalty + " coins. You currently have " + playerInfo.money + " coins in your purse!")

            if (confirmSkip) {
                playerInfo.money = Math.max(0, playerInfo.money - skipPenalty);
                window.alert(playerInfo.name + " has chosen to skip the fight! " + playerInfo.name + " has lost "
                    + skipPenalty + " coins, and has " + playerInfo.money + " remaining!");  
                break;
            }
        }

        //Subtract the value of `playerInfo.attack` from the value of `enemyHealth` 
        //and use that result to update the value in the `enemyHealth` variable
        var enemyDamage = randomNumber(playerInfo.attack - attackRange, playerInfo.attack)
        enemy.health = Math.max(0, enemy.health - enemyDamage);
        playerInfo.increaseDamagePoints(enemyDamage);
        // Log a resulting message to the console so we know that it worked.
        console.log(
            playerInfo.name + " ["+ playerInfo.health +" HP] attacked " + enemy.name + " [" + enemy.health + " HP]! " + playerInfo.name + " dealt "
            + enemyDamage + " damage, now " + enemy.name + " is left with " + enemy.health + " health!"
        );

        //check enemies health
        if (enemy.health <= 0) {
            // award the player money for the win
            playerInfo.money += rewardMoney;            
            
            window.alert(
                enemy.name + " has died! " + playerInfo.name + " has " + playerInfo.health + " health remaining. " + playerInfo.name + " recieved " + rewardMoney + 
                " for winning this fight, you now have " + playerInfo.money + " coins!"
            );

            // leave loop because enemy is dead
            break;
        } else {
            window.alert(
                playerInfo.name + " ["+ playerInfo.health +" HP] attacked " + enemy.name + " [" + (enemy.health + enemyDamage) + " HP]! " + playerInfo.name + " dealt "
                + enemyDamage + " damage, now " + enemy.name + " is left with " + enemy.health + " health!"
            )
        }

        // Subtract the value of `enemyAttack` from the value of `playerInfo.health` 
        //and use that result to update the value in the `playerInfo.health` variable.
        var playerDamage = randomNumber(enemy.attack - attackRange, enemy.attack);
        playerInfo.health = Math.max(0, playerInfo.health - playerDamage);
        // Log a resulting message to the console so we know that it worked.
        console.log(
            enemy.name + " ["+ enemy.health +" HP] attacked " + playerInfo.name + " [" + (playerInfo.health + playerDamage) + " HP]! " + enemy.name + " dealt "
            + playerDamage + " damage, now " + playerInfo.name + " is left with " + playerInfo.health + " health!"
        )
        
        if (playerInfo.health <= 0) {
            window.alert("Oh no! " + playerInfo.name + " has died!");
            break;
        } else {
            window.alert(
                enemy.name + " ["+ enemy.health +" HP] attacked " + playerInfo.name + " [" + (playerInfo.health + playerDamage) + " HP]! " + enemy.name + " dealt "
                + playerDamage + " damage, now " + playerInfo.name + " is left with " + playerInfo.health + " health!"
            )
        }
    }
};

var startGame = function() {

    for (var i = 0; i < enemyInfo.length; i++) {
    
        if (playerInfo.health > 0) {
            window.alert("Welcome to Robot Gladiators! Round " + (i + 1) );

            var pickedEnemyObj = enemyInfo[i];

            // Set current enemies health
            pickedEnemyObj.health = randomNumber(enemyHealthMin + (i * 5), enemyHealthMax)

            fight(pickedEnemyObj)

            if (playerInfo.health > 0 && i < enemyInfo.length - 1) {
                var enterShopConfirm = confirm("Would you like to go shopping?");
                if (enterShopConfirm) {
                    shop();                    
                }
            }

        } else {
            window.alert("You have lost your robot in battle! Game Over!");
            break;
        }
    }
    endGame();
}

var endGame = function() {
    if (playerInfo.health > 0) {
        window.alert("Great job, you survived the game! You have a score of " + (Math.ceil(playerInfo.totalDamageGiven/2) + playerInfo.money) + ".\nCalculated by (Total Damage Given / 2) + (Totaly Coins in Purse)");
    } else {
        window.alert("You have lost your robot in battle!");
    }

    var playAgainConfirm = window.confirm("Would you like to play again?");

    if (playAgainConfirm) {
        // Reset player
        playerInfo.resetStats();
        // Restart game
        startGame();
    } else {
        window.alert("Thank you for playing Robot Gladiators! Come back soon!");
    }
}

var shop = function() {
    var shopOptionPrompt = window.prompt(
        "Would you like to REFILL your health, UPGRADE your attack, or LEAVE the store?" +
        "Please enter one: REFILL, UPGRADE, or LEAVE to make a choice."
    )

    switch(shopOptionPrompt.toUpperCase()) {
        case "REFILL":
            playerInfo.refillHealth()
            break;
        case "UPGRADE":
            playerInfo.upgradeAttack()
            break;
        case "LEAVE":
            window.alert("Leaving the store.")
            break;
        default:
            window.alert("You did not pick a valid option. Try again.");
            // call shop() again to force player to pick a valid option
            shop();
            break;
    }
}

var randomNumber = function(min, max) {

    var value = Math.floor(Math.random() * ((max - min) + 1)) + min;

    return value
}

var getPlayerName = function() {
    var name = ""
    
    while (name === "" || name === null) {
        name = window.prompt("What is your robot's name?")
    }

    console.log("Your robot's name is " + name);
    return name;
}

// Setting up a playerInfo object to be used for the game
var playerInfo = {
    name: getPlayerName(),
    totalDamageGiven: 0,
    health: 100,
    attack: 10,
    money: 10,
    resetStats: function() {
        this.totalDamageGiven = 0,
        this.health = 100,
        this.attack = 10,
        this.money = 10
    },
    increaseDamagePoints: function(damageGiven) {
        this.totalDamageGiven += damageGiven;
    },
    refillHealth: function() {
        if (this.money >= 7) {
            this.health += 20;
            this.money -= 7;
            window.alert("Refilling your health from " + (this.health - 20) + " to " + this.health + 
                " for 7 coins. You have " + this.money + " coins remaining!")
        } else {
            window.alert("You don't have enough coins to puchase this health refill!");
        }

    },
    upgradeAttack: function() {
        if (this.money >= 7) {
            this.attack += 6;
            this.money -= 7;
            attackRange += 2;
            window.alert("Upgrading your attack from " + (this.attack - 6) + " to " + this.attack + 
                " for 7 coins. You have " + this.money + " coins remaining!")
        } else {
            window.alert("You don't have enough coins to puchase this attack upgrade!")
        }   
    }
};
// Player attack range, this number is subtracted from the playerInfo.attack value
var attackRange = 3;

// Setting the range of enemy attack values possible
var enemyAttackMin = 10;
var enemyAttackMax = 14
// Enemy Health Statistics 
var enemyHealthMin = 40;
var enemyHealthMax = 60;

// Setting up the enemies that will be fighting the player
var enemyInfo = [
    {
        name: "Roborto", 
        attack: randomNumber(enemyAttackMin, enemyAttackMax)
    },
    {
        name: "Amy Android",
        attack: randomNumber(enemyAttackMin + 1, enemyAttackMax)
    },
    {
        name: "Robo Trumble",
        attack: randomNumber(enemyAttackMin + 2, enemyAttackMax)
    }
];

// Coin penalty to skip a fight
var skipPenalty = 10;

// Coin reward when a fight is won by the player
var rewardMoney = 20;

// start game when page loads
startGame();