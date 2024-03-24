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
  
  //START GAME
  const readline = require("readline").createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  
  readline.question("What is your name?\n", (yourName) => {
    console.log(`Hello, ${yourName}!`);
    readline.close();
    startBattle(yourName);
  });
  
  function startBattle(yourName) {
    for (let i = 0; i < numberOfShips; i++) {
      alienShips.push(createAlienShip());
    }
    console.log(alienShips);
  
    //Checking continue game or game is over
    let youInTheGame = true;
  
    while (alienShips.length !== 0) {
      youInTheGame = spaceBattle(USSAssembly, alienShips[0], yourName);
      // Make function to check if you win or lose - arrow function
      if (youInTheGame === false) {
        console.log("Game Over");
        break;
      } else {
        // youInTheGame = checkGameOptions(alienShips, i);
        // Make function to check if you win or lose - arrow function
        if (youInTheGame === false) {
          console.log("Game Over");
          break;
        } else {
          alienShips.shift();
          if (alienShips.length === 0) {
            youInTheGame == true;
            break;
          } else {
            console.log("\n New attack is ready!");
          }
        }
      }
    }
    if (youInTheGame === true) {
      console.log("\nCongatulations! You have defeated the Aliens!\n");
      questionRestartBattle("\nThat was awesome! Do you want to play again?\n");
    } else {
      questionRestartBattle("\nDon't give up! Do you want to play again?\n");
    }
  }
  
  function spaceBattle(USSAssembly, alienShip, yourName) {
    //Add marks for each ship
    USSAssembly.side = yourName; // Attacking ship
    alienShip.side = "alienShip"; // Victim ship
    // Battle ships
    let battleships = [];
    battleships.push(USSAssembly, alienShip);
  
  
    let HitedShip = false;
    let destroyedShip = false;
    while (destroyedShip === false) {
      HitedShip = hitTarget(battleships);
      if (HitedShip === true) {
        battleships[1].hull -= battleships[0].firepower;
        destroyedShip = getShipcondition(battleships);
        if (destroyedShip === true) {
          break;
        } else if (battleships[0].side === yourName) {
          askContinueBattle("Do You want to attack again?");
          // let decision = askContinueBattle("Do You want to attack again?");
          // switch (decision){
          //   case "yes": swapShips(battleships);
          //   case "no": break} 
        }
          else {
          swapShips(battleships);
        }
      }
    }
      if (battleships[1].side === "alienShip") {
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
        `Ship ${battleships[0].side} hit the target ${battleships[1].side} ship!`,
      );
      return true;
    }
    //The hit is unsuccessful
    else {
      console.log("Missed Target!");
      return false;
    }
  }
  
  // Ship was destryoed (true) or not (false)
  function getShipcondition(ship) {
    if (ship[1].hull <= 0) {
      console.log("Ship " + ship[1].side + " was destroyed");
      return true;
    } else {
      console.log(
        `Ship ${ship[1].side} is still alive after ${ship[0].firepower} damage and has ${ship[1].hull} hull`,
      );
      return false;
    }
  }
  
  function swapShips(battleship) {
    let temp = battleship[0];
    battleship[0] = battleship[1];
    battleship[1] = temp;
  }
  
  function askContinueBattle(question) {
      let answer = prompt(question + " (yes or no)");
      if (answer.toLowerCase() === "yes") {
        return true;
      } else if (answer.toLowerCase() === "no") {
        return false;
      } else {
        // If the user enters an invalid response, prompt again
        alert("Please enter 'yes' or 'no'");
        return askContinueBattle(question);
      }
    }
  
  
  function questionRestartBattle(question) {
    const readline = require("readline").createInterface({
      input: process.stdin,
      output: process.stdout,
    });
  
    readline.question(question, (restartBattle) => {
      if (restartBattle.toLowerCase() === "yes") {
        readline.close();
        startBattle(yourName);
      } else {
        readline.close();
        console.log("\nThank you for playing! See you next time!");
      }
    });
  }
  