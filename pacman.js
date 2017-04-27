// Setup initial game stats
var score = 0;
var lives = 2;
var pellet = 4;

var inky = { name: "Inky", menu_option: 1, color: 'red', character: 'shadow', edible: false};
var blinky = { name: "Blinky", menu_option: 2, color: 'cyan', character: 'speedy', edible: false};
var pinky = { name: "Pinky", menu_option: 3, color: 'pink', character: 'bashful', edible: false};
var clyde = { name: "Clyde", menu_option: 4, color: 'orange', character: 'poky', edible: false};

function eatGhost(ghost) {

  switch (ghost.edible) {
    case false:
      gameOver();
      console.log('\nPacMan lost a life!');
      lives --;
      break;

    default:
      console.log("\n" + ghost.name + " has been devoured!")
      score += 100;
  }
}

function isEdible(ghost) {
  if (ghost.edible === true)
    return " (edible)"
  else {
    return " (inedible)"
  }
}

function eatPowerPellet() {
  if (pellet > 0) {

    score += 50
    pellet --
    inky.edible = true
    blinky.edible = true
    pinky.edible = true
    clyde.edible = true
  }
}

function gameOver() {
  if (lives < 1) {
    console.log(" Game Over");
    process.exit();
  }

}


// replace this comment with your four ghosts setup as objects


// Draw the screen functionality
function drawScreen() {
  clearScreen();
  setTimeout(function() {
    displayStats();
    displayMenu();
    displayPrompt();
  }, 10);
}

function clearScreen() {
  console.log('\x1Bc');
}

function displayStats() {
  console.log('Score: ' + score + '     Lives: ' + lives + "\n\nPower Pellets: " + pellet);
}

function displayMenu() {
  console.log('\n\nSelect Option:\n');  // each \n creates a new line
  console.log('(d) Eat Dot');
  if (pellet > 0) {
    console.log('(p) Eat Pellet');

  }
  console.log('(q) Quit');
  console.log('(1) Eat Inky' + isEdible(inky));
  console.log('(2) Eat Blinky' + isEdible(blinky));
  console.log('(3) Eat Pinky' + isEdible(pinky));
  console.log('(4) Eat Clyde' + isEdible(clyde));
  // console.log("Debug: inky edible is " + inky.edible)
}

function displayPrompt() {
  // process.stdout.write is similar to console.log except it doesn't add a new line after the text
  process.stdout.write('\nWaka Waka :v '); // :v is the Pac-Man emoji.
}


// Menu Options
function eatDot() {
  console.log('\nChomp!');
  score += 10;
}


// Process Player's Input
function processInput(key) {
  switch(key) {
    case '\u0003': // This makes it so CTRL-C will quit the program
    case 'q':
      process.exit();
      break;
    case 'p':
      eatPowerPellet();
      break;
    case 'd':
      eatDot();
      break;
    case '1':
      eatGhost(inky);
      break;
    case '2':
      eatGhost(blinky);
      break;
    case '3':
      eatGhost(pinky);
      break;
    case '4':
      eatGhost(clyde);cd
      break;

    default:
      console.log('\nInvalid Command!');
  }
}


//
// YOU PROBABLY DON'T WANT TO CHANGE CODE BELOW THIS LINE
//

// Setup Input and Output to work nicely in our Terminal
var stdin = process.stdin;
stdin.setRawMode(true);
stdin.resume();
stdin.setEncoding('utf8');

// Draw screen when game first starts
drawScreen();

// Process input and draw screen each time player enters a key
stdin.on('data', function(key) {
  process.stdout.write(key);
  processInput(key);
  setTimeout(drawScreen, 300); // The command prompt will flash a message for 300 milliseoncds before it re-draws the screen. You can adjust the 300 number to increase this.
});

// Player Quits
process.on('exit', function() {
  console.log('\n\nGame Over!\n');
});
