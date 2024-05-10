# **Battling Alien Spaceships Game - JavaScript Project**

## **Overview**

Earth has been attacked by a horde of aliens! As the captain of the USS Assembly, your mission is to destroy every last alien ship to save the planet. This game is built using JavaScript and focuses on utilizing arrays, objects, and methods to simulate a space battle with alien ships.

The game's logic and flow are designed to be straightforward, yet engaging, providing an interactive learning experience in JavaScript programming.

Ready to Battle? [Space Battle: The Zorbian Siege](https://htmlpreview.github.io/?https://github.com/Katterina71/JSSpaceBattle/blob/main/index.html).

## **Example**
![](https://github.com/Katterina71/JSSpaceBattle/blob/main/info/Battle.gif)

## **Game Mechanics**

The game operates on a turn-based system where you, as the captain of the USS Assembly, battle against a series of alien ships. The aliens have a tactical disadvantage; they attack one at a time, allowing you to take down their fleet ship by ship.

### **Gameplay Round**

1. **Your Attack**: You launch an attack against the first alien ship.
2. **Alien Counterattack**: If the alien ship survives, it counterattacks.
3. **Repeat**: This cycle continues until either the alien ship is destroyed or it destroys you.
4. **Next Steps**: Upon destroying an alien ship, you can choose to attack the next ship or retreat.
    - **Retreat**: The game ends.
    - **Destroy All**: You win the game if you manage to destroy all alien ships.
    - **Get Destroyed**: You lose the game if your ship is destroyed.

### **Ship Properties**

- **Hull**: Acts as hitpoints. A ship is destroyed when the hull reaches 0 or less.
- **Firepower**: Determines the damage done to the opponent's hull upon a successful hit.
- **Accuracy**: The chance (between 0 and 1) that the ship's attack will hit its target.

## **The USS Assembly Specifications**

- **Hull**: 20
- **Firepower**: 5
- **Accuracy**: 0.7

## **Alien Ships Specifications**

Each alien ship has properties that are determined randomly within the following ranges:

- **Hull**: 3 to 6
- **Firepower**: 2 to 4
- **Accuracy**: 0.6 to 0.8

You will encounter six unique alien ships, each with different values for hull, firepower, and accuracy.

## **Game Flowchart**

To better understand the game's logic and flow, a flowchart is included, outlining the main decision points and actions within the game. This visual representation helps in grasping the game mechanics and the sequence of events.

![image](https://github.com/Katterina71/JSSpaceBattle/assets/161891975/87cb04de-36cd-4256-a20a-c9d5604a28c1)


*Note: To view the flowchart, ensure that you have access to the repository or document where the flowchart image is stored.*

## **Goal**

The primary objective of this project is to learn and practice JavaScript, focusing on arrays, objects, and methods through the development of an interactive game.

## **Get Started**

To embark on this mission to save Earth:

Open the [Space Battle: The Zorbian Siege](https://htmlpreview.github.io/?https://github.com/Katterina71/JSSpaceBattle/blob/main/index.html) file in a web browser to start the game.
Use the JavaScript console to issue commands and make decisions based on the game prompts.

Good luck, Captain! The fate of Earth rests in your hands.
