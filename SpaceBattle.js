//Your spaceship, the USS Assembly
let USSAssembly = {
    hull: 20,
    firepower: 5,
    accuracy: 0.7,
  };
  
  //Aliens Army
  // const numberOfShips = Math.round(Math.random() * (6 - 10) * 10);
  const numberOfShips = 6;
  let alienShips = [];
  
  // Alien Ship
  function createAlienShip() {
    const shipTemplate = {
      hull: Math.round(Math.random() * (6 - 3) + 3),
      firepower: Math.round(Math.random() * (4 - 2) + 2),
      accuracy: Math.round((Math.random() * (0.8 - 0.6) + 0.6) * 10) / 10,
    };
    return shipTemplate;
  }
  
  //Generate Aliens Army
  let yourName = "";
  
  //Get Name
  const readline = require("readline").createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  
  readline.question("What is your name?\n", (yourName) => {
    console.log(`Hello, ${yourName}!`);
    readline.close();
    startBattle();
  });
  
  function startBattle() {
    for (let i = 0; i < numberOfShips; i++) {
      alienShips.push(createAlienShip());
    }
    console.log(alienShips);
  
    //Checking continue game or game is over
    let youInTheGame = true;
    while (youInTheGame == true || alienShips.length !== 0) {
      youInTheGame = spaceBattle(USSAssembly, alienShips[0]);
      // Make function to check if you win or lose - arrow function
      if (youInTheGame == false) {
        console.log("Game Over");
        break;
      } else {
        // youInTheGame = checkGameOptions(alienShips, i);
        // Make function to check if you win or lose - arrow function
        if (youInTheGame == false) {
          console.log("Game Over");
          break;
        } else {
          alienShips.shift();
          if (alienShips.length == 0) {
            youInTheGame == true;
            break;
          } else {
            console.log("\n New attack is ready!");
          }
        }
      }
    }
    if (youInTheGame == true) {
      console.log("\nCongatulations! You have defeated the Aliens!\n");
      questionRestarBattle("\nThat was awesome! Do you want to play again?\n");
    } else {
      questionRestarBattle("\nDon't give up! Do you want to play again?\n");
    }
  }
  
  function spaceBattle(USSAssembly, alienShip) {
    //Add marks for each ship
    USSAssembly.side = "USSAssembly"; // Attacking ship
    alienShip.side = "alienShip"; // Victim ship
  
    // Battle ships
    let battleships = [];
    let sideOfDestroyedShip = "";
  
    battleships.push(USSAssembly, alienShip);
  
    let HitedShip = false;
    let destroyedShip = false;
    while (destroyedShip === false) {
      HitedShip = hitTarget(battleships);
      if (HitedShip == true) {
        battleships[1].hull -= battleships[0].firepower;
        destroyedShip = getResultOftheDamage(battleships);
        if (destroyedShip == true) {
          console.log("Ship " + battleships[1].side + " was destroyed");
          sideOfDestroyedShip = checkDestroyShip(battleships);
          break;
        } else {
          console.log(
            `Ship ${battleships[1].side} is still alive after ${battleships[0].firepower} damage and has ${battleships[1].hull} hull`,
          );
          if (battleships[0].side === "USSAssembly") {
            let dession = questionContinueBattle(
              "You want to continue the battle?\n",
            );
            if (dession === false) return false;
            break;
          } else {
            swapShips(battleships);
          }
        }
      } else {
        swapShips(battleships);
      }
    }
    if (sideOfDestroyedShip == "alienShip") {
      return true;
    } else {
      return false;
    }
  }
  
  function hitTarget(battleships) {
    //Determine if target was hit
    console.log("Attack " + battleships[0].side + " ship is running!");
    // Randomly creat accuracy
    let accuracy = Math.random();
    console.log(Math.round(accuracy * 100) + "% probability of missing!");
    // The hit is successful
    if (accuracy <= battleships[0].accuracy) {
      console.log(
        `Ship ${battleships[0].side} hit the target ${battleships[1].side} ship!. Currnet hull of ${battleships[1].side} is ${battleships[1].hull}`,
      );
      return true;
    }
    //The hit is unsuccessful
    else {
      console.log("Missed Target!");
      return false;
    }
  }
  
  function getResultOftheDamage(ship) {
    if (ship[1].hull <= 0) {
      return true;
    } else {
      return false;
    }
  }
  
  function checkDestroyShip(battleship) {
    if (battleship[1].side == "USSAssembly") {
      return "USSAssembly";
    } else {
      return "alienShip";
    }
  }
  
  function swapShips(battleship) {
    let temp = battleship[0];
    battleship[0] = battleship[1];
    battleship[1] = temp;
  }
  
  function questionRestarBattle(question) {
    const readline = require("readline").createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    readline.question(question, (restartBattle) => {
      if (restartBattle.toLowerCase() === "yes") {
        readline.close();
        startBattle();
      } else {
        readline.close();
        console.log("\nThank you for playing! See you next time!");
      }
    });
  }
  
  function questionContinueBattle(question) {
    const readline = require("readline").createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    readline.question(question, (restartBattle) => {
      if (restartBattle.toLowerCase() === "yes") {
        readline.close();
        return true;
      } else {
        readline.close();
        console.log("\nThank you for playing! See you next time!");
        return false;
      }
    });
  }
  