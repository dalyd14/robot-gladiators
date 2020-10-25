// Game States
// "Win" - Player robot has defeated all enemy-robots
//      * Fight all enemy-robots
//      * Defeat each enemy-robot
// "Lose" - Player robot's health is zero or less

var fight = function(enemy) {
    while(enemy.health > 0 && playerInfo.health > 0) {
         // Ask players if they would like to fight or skip
        var promptFight = window.prompt("Would you like to FIGHT or SKIP this battle? Enter FIGHT or SKIP to choose.")

        if (promptFight.toUpperCase() === "SKIP") {
            var confirmSkip = confirm("Are you sure you want to skip the fight? You will lose " + skipPenalty + " coins.")
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
        // Log a resulting message to the console so we know that it worked.
        console.log(
            playerInfo.name + " attacked " + enemy.name + "! " + playerInfo.name + " dealt "
            + enemyDamage + " damage, now " + enemy.name + " is left with " + enemy.health + " health points!"
        );

        //check enemies health
        if (enemy.health <= 0) {
            window.alert(enemy.name + " has died!");

            // award the player money for the win
            playerInfo.money =+ rewardMoney;

            // leave loop because enemy is dead
            break;
        } else {
            window.alert(enemy.name + " still has " + enemy.health + " health left.")
        }

        // Subtract the value of `enemyAttack` from the value of `playerInfo.health` 
        //and use that result to update the value in the `playerInfo.health` variable.
        var playerDamage = randomNumber(enemy.attack - attackRange, enemy.attack)
        playerInfo.health = Math.max(0, playerInfo.health - playerDamage);
        // Log a resulting message to the console so we know that it worked.
        console.log(
            enemy.name + " attacked " + playerInfo.name + "! " + enemy.name + " dealt "
            + playerDamage + " damage, now " + playerInfo.name + " is left with " + playerInfo.health + " health points!"
        )
        
        if (playerInfo.health <= 0) {
            window.alert(playerInfo.name + " has died!")
            break;
        } else {
            window.alert(playerInfo.name + " still has " + playerInfo.health + " health left.")
        }
    }
};

var startGame = function() {
    // reset player stats
    playerInfo.reset();

    for (var i = 0; i < enemyInfo.length; i++) {
    
        if (playerInfo.health > 0) {

            window.alert("Welcome to Robot Gladiators! Round " + (i + 1) );
            var pickedEnemyObj = enemyInfo[i];
            pickedEnemyObj.health = randomNumber(enemyHealthMin, enemyHealthMax);

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
        window.alert("Great job, you survived the game! You have a score of " + playerInfo.money + ".");
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

var checkMoney = function(itemCost) {
    if (playerInfo.money < itemCost) {
        return false;
    } else {
        return true;
    }
}

var randomNumber = function(min, max) {
    var value = Math.floor(Math.random() * ((max - min) + 1)) + min;

    return value
}

// Setting up a playerInfo object to be used for the game
var playerInfo = {
    name: window.prompt("What is your robot's name?"),
    health: 100,
    attack: 10,
    money: 10,
    reset: function() {
        this.health = 100,
        this.attack = 10,
        this.money = 10
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

// Setting up the enemies that will be fighting the player
debugger;
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

// Enemy Health Statistics 
var enemyHealthMin = 40;
var enemyHealthMax = 60;

// Coin penalty to skip a fight
var skipPenalty = 10;

// Coin reward when a fight is won by the player
var rewardMoney = 20;

// start game when page loads
startGame();