//Your spaceship, the USS Assembly
let USSAssembly = {
    hull: 20,
    firepower: 5,
    accuracy: 0.7,
  };
  
  //Aliens Army
  // const numberOfShips = Math.round(Math.random() * (6 - 10) * 10);
  const numberOfShips = 6; // Number of ships
  let alienShips = [];
  
  // Generate Alien Ship randomly
  function createAlienShip() {
    const shipTemplate = {
      hull: Math.round(Math.random() * (6 - 3) + 3),
      firepower: Math.round(Math.random() * (4 - 2) + 2),
      accuracy: Math.round((Math.random() * (0.8 - 0.6) + 0.6) * 10) / 10,
      side: "alienShip", // Mark for battle
    };
    return shipTemplate;
  }
  
  /*Attacking */
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
  
  /* Ship was destryoed (true) or not (false) */
  function getShipcondition(ship) {
    if (ship[1].hull <= 0) {
      console.log("\nShip " + ship[1].side + " was destroyed\n");
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
  
  /*Battle between two ships */
  function spaceBattle(USSAssembly, alienShip, yourName) {
    // Array of to battle ship where battleships[0] - always attack, battleships[1] - victim
    let battleships = [];
    battleships.push(USSAssembly, alienShip);
    let destroyedShip = false;
  
    while (destroyedShip === false) {
      let HitedShip = hitTarget(battleships);
  
      if (HitedShip === true) {
        battleships[1].hull -= battleships[0].firepower;
        destroyedShip = getShipcondition(battleships);
        //ship was destroyed
        if (destroyedShip === true) {
          // battleships[1].condition = "destroyed";
          break;
        }
        // // ship alive
        else if (battleships[0].side === yourName) {
          console.log("STOOOP");
          break;
        } else swapShips(battleships);
      }
      // If Missed - Ships swap and other side ship will be attack next
      else {
        swapShips(battleships);
      }
    }
    return battleships;
  }
  
  // START GAME
  function startBattle(USSAssembly, alienShips, yourName) {
    USSAssembly.side = yourName;
    let gameStatus = "play";
    //Battle
    while (alienShips.length !== 0 || gameStatus === "") {
      let battleResult = spaceBattle(USSAssembly, alienShips[0], yourName);
      USSAssembly = battleResult.find(({ side }) => side === yourName);
      alienShips[0] = battleResult.find(({ side }) => side === "alienShip");
      if (USSAssembly.hull <= 0) {
        console.log("You lost the battle!");
  
        return (gameStatus = "stopGame");
      } else if (alienShips[0].hull <= 0) {
        alienShips.shift();
        if (alienShips.length === 0) {
          console.log("You won the battle!");
          gameStatus = "stopGame";
          return (gameStatus = "stopGame");
        }
      } else if (alienShips[0].hull !== 0 && USSAssembly.hull !== 0) {
        console.log("Repeating attack?");
        gameStatus = "repeatAttack";
        return (gameStatus = "repeatAttack");
      } else {
        console.log("\n New attack is ready!");
      }
    }
  }
  
  for (let i = 0; i < numberOfShips; i++) {
    alienShips.push(createAlienShip());
  }
  
  console.log(alienShips);
  console.log("Welcome to the Space Battle!");
  
  let yourName = "";
  var prompt = require("prompt-sync")();
  yourName = prompt("Name? ");
  
  let gamestatus = "repeatAttack";
  
  // let gamestatus = startBattle(USSAssembly, alienShips, yourName);
  // console.log(gamestatus);
  
  while (gamestatus === "repeatAttack") {
    gamestatus = startBattle(USSAssembly, alienShips, yourName);
    if (gamestatus !== "repeatAttack") {
      break;
    } else {
      let questionRepeatGame = "";
      // var prompt = require("prompt-sync")();
      questionRepeatGame = prompt("\nRepeat Attack? yes / no\n");
      if (questionRepeatGame.toLowerCase() === "yes") {
        console.log("\nStart Attack!\n");
        gamestatus = "repeatAttack";
        startBattle(USSAssembly, alienShips, yourName);
      } else {
        console.log("Thank you for playing!");
        break;
      }
    }
  }
  console.log("Game Over");