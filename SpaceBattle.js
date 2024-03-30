//Your spaceship, the USS Assembly
const USSAssemblyDefault = {
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
    side: "Alien", // Mark for battle
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
    console.log("%cMissed Target!", "background:#E5E5E5; color:#716C6C");
    return false;
  }
}

/* Ship was destryoed (true) or not (false) */
function getShipcondition(ship) {
  if (ship[1].hull <= 0) {
    console.log(`%c \n${ship[1].side}'s ship was destroyed!\n`, `color:red;`);
    return true;
  } else {
    console.log(
      `%c  ${ship[1].side}'s ship is still alive after ${ship[0].firepower} damage and has ${ship[1].hull} hull`, 'color:#970744; font-size:14px'
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
function spaceBattle(USSAssembly, alienShip, playerName) {
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
      else if (battleships[0].side === playerName) {
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
function startBattle(USSAssembly, alienShips, playerName) {
  USSAssembly.side = playerName;
  let gameStatus = "play";
  console.log(`\n Attack is ready! Only ${alienShips.length} ships left!\n`);
  //Battle
  while (alienShips.length !== 0 || gameStatus === "") {
    let battleResult = spaceBattle(USSAssembly, alienShips[0], playerName);
    USSAssembly = battleResult.find(({ side }) => side === playerName);
    alienShips[0] = battleResult.find(({ side }) => side === "Alien");
    if (USSAssembly.hull <= 0) {
      console.log("%c The USS Assembly has been destroyed. Game over.", "color:red;");

      return (gameStatus = "stopGame");
    } else if (alienShips[0].hull <= 0) {
      alienShips.shift();
      if (alienShips.length === 0) {
        console.log(`%c \nCongratulations, Captain ${playerName}! You've defeated the alien fleet.`, `color:green; font-size: 16px`);
        gameStatus = "stopGame";
        return (gameStatus = "stopGame");
      }
    } else if (alienShips[0].hull !== 0 && USSAssembly.hull !== 0) {
      console.log(`%cGood job! You almost destroyed the alien ship. Try again!`, `color:1C303E; font-size: 16px`);
      gameStatus = "repeatAttack";
      return (gameStatus = "repeatAttack"); }
    //  else {
    //   console.log("\n New attack is ready!");
    // }
  }
}

function gameSpaceBattle(playerName, USSAssemblyDefault) {
  let gamestatus = "repeatAttack";
  let USSAssembly = USSAssemblyDefault;
while (gamestatus === "repeatAttack") {
  gamestatus = startBattle(USSAssembly, alienShips, playerName);
  if (gamestatus !== "repeatAttack") {
    break;
  } else {

    let questionRepeatGame = confirm("\nDo you want to repeat attack?\n");
    if (questionRepeatGame) {
      console.log("%c Repeat Attack!\n","font-size:16px; color:blue");

    } else {
      console.log("Thank you for playing!");
      break;
    }
  }
}
}


function alienFleet(numberOfShips){

  console.log("Generating the Zorbian fleet with random attributes for each ship.\n");
  for (let i = 0; i < numberOfShips; i++) {
    alienShips.push(createAlienShip());
  }
  
  console.log("The Zorbian fleet: ");
  alienShips.forEach((obj) => {
    console.log(obj);
  });
  console.log(`\Zorbian fleet is ready!\n`);
  
  return alienShips;
  }


console.log(
  "%c Starting the battle between the USS Assembly and Zorbian fleet!\n",
  "font-size: 20px; background:#1C303E; color:white",
);
alienFleet(numberOfShips);
console.log(`%cClick on webpage and Press "s" button on your keyboard to START!\n`, `font-size: 18px; background: azure;`);
document.addEventListener('keydown', function(event) {
  if (event.key === 's') {
      console.log('Game started!');    
let playerName = "";

// var prompt = require("prompt-sync")();
playerName = prompt("What is your name, Captain?  ");
console.log(`\%cWelcome, Captain ${playerName}! Prepare for battle.`, `color:#1C303E ; font-size: 16px`);
console.log(`\nBE READY! The battle starts now!\n`);
gameSpaceBattle(playerName,USSAssemblyDefault);
let questionRestartGame = true;
while (questionRestartGame === true) {
questionRestartGame = confirm("\nThe Zorbian fleet is regrouping. Do you want to reload and engage in another battle?");
if (questionRestartGame) {
  alienFleet(numberOfShips);
  console.log("%c Restarting the game...\n","font-size:16px; color:blue");   
  gameSpaceBattle(playerName,USSAssemblyDefault); 
  
}
else {
  questionRestartGame = false;
  console.log("Game over. The universe is safe for now...");}
}
}});