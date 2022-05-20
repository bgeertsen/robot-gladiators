

// console.log(enemyNames);

// console.log(enemyNames[0]);

// console.log(enemyNames[1]);

// console.log(enemyNames[2]);

// console.log(enemyNames.length);

// for(var i = 0; i < enemyNames.length; i++) {
//     console.log(enemyNames[i]);
//     console.log(i);
//     console.log(enemyNames[i] + " is at " + i + " index");
// }

var enemyHealth = 50;

var enemyAttack = 12;

var fightOrSkip = function() {
    // ask player if they'd like to fight or skip using fightOrSkip function
    var promptFight = window.prompt('Would you like to FIGHT or SKIP this battle? Enter "FIGHT" or "SKIP" to choose.');

    // Conditional Recursive Function Call
    if (promptFight === "" || promptFight === null) {
        window.alert("You need to provide a valid answer! Please try again.");
        return fightOrSkip();
    }
    promptFight = promptFight.toLowerCase();

    // if player picks "skip" confirm and then stop the loop
    if (promptFight === "skip") {
        // confirm player wants to skip
        var confirmSkip = window.confirm("Are you sure you'd like to quit?");

        // if yes (true), leave fight
        if (confirmSkip) {
        window.alert(playerInfo.name + " has decided to skip this fight. Goodbye!");
        // subtract money from playerMoney for skipping
        playerInfo.playerMoney = playerInfo.money - 10;
        
        return true;
        }
    }
    return false;
}

var fight = function(enemy) {
    // keep track of who goes first
    var isPlayerTurn = true;
    if (Math.random() > 0.50) {
        isPlayerTurn = false;
    }

    while(enemy.health > 0 && playerInfo.health > 0){
        if (isPlayerTurn) {
            //ask the player if they'd like to fight or run
            if (fightOrSkip()) {
                //if true, leave fight by breaking loop
                break;
            }
            // remove enemy's health by subtracting the amount set in the playerInfo.attack variable
            var damage = randomNumber(playerInfo.attack - 3, playerInfo.attack);
            enemy.health = Math.max(0, enemy.health - damage);
            console.log(
                playerInfo.name + " attacked " + enemy.name + ". " + enemy.name + " now has " + enemy.health + " health remaining."
            );
  
            // check enemy's health
            if (enemy.health <= 0) {
                window.alert(enemy.name + " has died!");
                //award player money for winning
                playerInfo.money = playerInfo.money + 20;
                //leave the while() loop since enemy is dead
                break;
            } else {
                window.alert(enemy.name + " still has " + enemy.health + " health left.");
            }
        } else {
            // remove player's health by subtracting the amount set in the enemyInfo.attack variable
            var damage = randomNumber(enemy.attack - 3, enemy.attack);
            playerInfo.health = Math.max(0, playerInfo.health - damage);
            console.log(
                enemy.name + " attacked " + playerInfo.name + ". " + playerInfo.name + " now has " + playerInfo.health + " health remaining."
            );
  
            // check player's health
            if (playerInfo.health <= 0) {
                window.alert(playerInfo.name + " has died!");
                //leace the while() loop is player is dead
                break;
            } else {
                window.alert(playerInfo.name + " still has " + playerInfo.health + " health left.");
            }
        }
        isPlayerTurn = !isPlayerTurn;
    }
};  

var startGame = function () {
    //reset player stats
    playerInfo.reset();

    for(var i = 0; i < enemyInfo.length; i ++) {
        if (playerInfo.health > 0) {
            //let player know what round they are in, remember that arrays start at 0 so it needs to have 1 added to it
            window.alert("welcome to Robot Gladiators! Round " + (i + 1) );
            //debugger;

            //pick new enemy to fight based on the index of the enemyNames array
            var pickedEnemyObj = enemyInfo[i];

            //reset anemyHealth before starting new fight
            pickedEnemyObj.health = randomNumber(40, 60);

            //use debugger to pause script from running and check what's going on at the moment in the code


            //pass the pickedEnemyName variable's value into the fight function, where it will assume the value of the enemyName parameter.
            fight(pickedEnemyObj);

            if (playerInfo.health > 0 && i < enemyInfo.length - 1) {
                var storeConfirm = window.confirm("The fight is over, visit the store before the next round?");
                if (storeConfirm) {
                    shop();
                }
            }
        }
        else {
            window.alert("You have lost your robot in battle! Game Over!")
            break;
        }
    }
    // after the loop ends, player is either out of health or enemies to fight, so run the endGame function
    endGame();
}

var endGame = function() {
    //if player is still alive, player wins!
    if (playerInfo.health > 0 ) {
        window.alert("Great job, you've survived the game! You now have a score of " + playerInfo.money + ".");
    }

    else {
        window.alert("You've lost your robot in battle.")
    }
    //ask player if they'd like to play again
    var playAgainConfirm = window.confirm("Would you like to play again?");
    if (playAgainConfirm) {
        //restart the game
        startGame();
    }

    else {
        window.alert("Thank you for playing Robot Gladiators! come back soon!")
    }
}

var shop = function() {
    // ask play what they'd like to do
    var shopOptionPrompt = window.prompt(
        "Would you like to REFILL your health, UPGRADE your attack, or LEAVE the store? Please enter one: 1 for REFILL, 2 for UPGRADE, 3 for LEAVE."
    )
    shopOptionPrompt = parseInt(shopOptionPrompt);
    switch (shopOptionPrompt) {
        case 1:
            playerInfo.refillHealth();
            break;

        case 2:
            playerInfo.upgradeAttack();
            break;

        case 3:
            window.alert("Leaving the store.");
            break;

        default:
            window.alert("You did not pick a valid option. Try again.");

            shop();

    }
};

//function to generate a random numeric value
var randomNumber = function(min, max) {
    var value = Math.floor(Math.random() * (max - min + 1)) + min;
    return value;
}

var getPlayerName = function() {
    var name = "";

    //Loop here
    while (name === "" || name === null) {
        name = prompt("What is your robot's name?");
    }

    console.log("Your Robot's name is " + name);
    return name;

}

var playerInfo = {
    name: getPlayerName(),
    health: 100,
    attack: 10,
    money: 10,
    reset: function() {
        this.health = 100;
        this.money = 10;
        this.attack = 10;
    },
    refillHealth: function() {
        if (this.money >= 7) {
            window.alert("Refilling player's health by 20 for 7 dollars.")
            this.health += 20;
            this.money -+ 7;
        }
        else {
            window.alert("You don't have enough money!");
        }
    },
    upgradeAttack: function() {
        if(this.money >= 7) {
            window.alert("Upgrading player's attack by 6 for 7 dollars.");
            this.attack += 6;
            this.money -+ 7;
        }
        else {
            window.alert("You don't have enough money!");
        }
    }

};

console.log(playerInfo.name, playerInfo.attack, playerInfo.health);

var enemyInfo = [
    {
        name: "Roborto",
        attack: randomNumber(10, 14)
     },
     {
         name: "Amy Android",
         attack: randomNumber(10, 14)
     },
     {
         name: "Robo Trumble",
         attack: randomNumber(10, 14)
     }
    ];

startGame();