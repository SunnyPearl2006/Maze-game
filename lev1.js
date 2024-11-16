const homeButton = document.getElementById('home');
homeButton.disabled = true;
homeButton.style.border = 'transparent';
homeButton.style.color = 'transparent';
homeButton.addEventListener('click',function(){
  location.assign('LevelPage.html#true-true');
});




var maze = [
  ["W", "W", "W", "W", "W", "W", "W", "W", "W", "W", "F", "W", "W", "W", "W"],
  ["W", "W", "W", "W", "W", "W", "W", "W", "W", "W", "P", "W", "W", "W", "W"],
  ["W", "W", "W", "H", "P", "P", "W", "P", "P", "P", "P", "W", "W", "W", "W"],
  ["W", "W", "W", "W", "W", "P", "W", "P", "W", "W", "P", "W", "W", "W", "W"],
  ["W", "W", "W", "W", "W", "P", "P", "P", "W", "W", "P", "P", "W", "W", "W"],
  ["W", "W", "W", "W", "W", "W", "W", "W", "W", "W", "W", "P", "W", "W", "W"],
  ["W", "W", "W", "W", "W", "W", "W", "W", "W", "W", "W", "P", "W", "W", "W"],
  ["W", "W", "W", "W", "W", "W", "W", "W", "W", "W", "W", "P", "W", "W", "W"],
  ["W", "W", "W", "W", "W", "W", "P", "P", "P", "W", "P", "P", "W", "W", "W"],
  ["W", "W", "W", "W", "P", "P", "P", "W", "P", "W", "P", "W", "W", "W", "W"],
  ["W", "W", "W", "W", "P", "W", "W", "W", "P", "W", "P", "W", "W", "W", "W"],
  ["W", "W", "W", "W", "P", "W", "W", "W", "P", "P", "P", "W", "W", "W", "W"],
  ["W", "W", "W", "W", "P", "P", "P", "W", "W", "W", "W", "W", "W", "W", "W"],
  ["W", "W", "W", "W", "W", "W", "P", "W", "W", "W", "W", "W", "W", "W", "W"],
  ["W", "W", "W", "W", "W", "W", "S", "W", "W", "W", "W", "W", "W", "W", "W"],

];
var buttons = [];
var userPos;
var chancesLeft = 30;

// Creates the buttons by appedning them to the grid div in html while adding them to the buttons array at the same time. It assigns the cords of the start button to the userPos variable and colors the start button white.
function setUp(){
  const grid = document.getElementById('grid');
  for (var x = 0; x < 15; x++) {
    for (var y = 0; y < 15; y++) {
      const button = document.createElement('button');
      button.id = x + "-" + y;
      grid.appendChild(button);
      buttons.push(button);
    }
  }
  for(var x = 0; x < maze.length; x++){
    for(var y = 0; y < maze.length; y++){
      if(maze[y][x] == "S"){
        buttons[y * maze.length + x].style.backgroundColor = "white";
        userPos = [x, y];
      }   
    }
  }
}

// It holds the diffent 'endings' of the maze. Depending on whether the user has won, lost, or fell into the holer, it will display a different message for the info div.
function gameOverScreens(event){
  var x = parseInt(event.target.id.split("-")[1]);
  var y = parseInt(event.target.id.split("-")[0]);
  if(chancesLeft < 0){
    document.getElementById('info').querySelector('h3').innerHTML = 'Better luck next time!';
    document.getElementById('info').querySelector('h2').innerHTML = 'Game over';

  }
  if(maze[y][x] === "H"){
    event.target.style.backgroundColor = "black";
    document.getElementById('info').querySelector('h3').innerHTML = 'Tough luck... you fell into a hole...';
    document.getElementById('info').querySelector('h2').innerHTML = 'Misses left: in a hole';
  }
  if(maze[y][x] === "F"){
    event.target.style.backgroundColor = "gold";
    document.getElementById('info').querySelector('h3').innerHTML = 'You did it! You escaped!';
    document.getElementById('info').querySelector('h2').innerHTML = 'Misses left: ' + chancesLeft;
  }
}

// simply checks if the 'move' is valid
function validMove(event){
  var clickPos = event.target.id;
  var x = parseInt(clickPos.split("-")[1]);
  var y = parseInt(clickPos.split("-")[0]);
  var xDiff = Math.abs(userPos[0] - x);
  var yDiff = Math.abs(userPos[1] - y);
  if(maze[y][x] === "W"){
    return false;
  }
  if((xDiff === 1 && yDiff === 0) || (xDiff === 0 && yDiff === 1)){
    return true;
  } 

  return false;
  /*
  if(userPos[1] - y == 0 && userPos[0] - y < 2 && userPos[0] - y > 0){
    validSide = true;
  }
  */

}

// simply checks if the game is over
function isGameOver(event){
  var xLoc = parseInt(event.target.id.split("-")[1]);
  var yLoc = parseInt(event.target.id.split("-")[0]);
  if(chancesLeft < 0){
    return true;
  }
  if(maze[yLoc][xLoc] === 'F'){
    return true;
  }
  if(maze[yLoc][xLoc] === 'H'){
    return true;
  }
  return false;
}

// This is the function that gets called when a button is clicked. Its like the cpu. This is where the rest of the functions are called. 
function move(event){
  if(validMove(event)){
      event.target.style.backgroundColor = "white";
        userPos = [parseInt(event.target.id.split("-")[1]), parseInt(event.target.id.split("-")[0])];

  } else {
    var x = event.target.id.split("-")[1];
    var y = event.target.id.split("-")[0];
    //userPos = [parseInt(x), parseInt(y)];
    if(maze[y][x] === 'W'){
      event.target.style.backgroundColor = "lightgrey";
    }
    chancesLeft--;
    const chances = document.getElementById('info').querySelector('h2');
    chances.innerHTML = 'Misses left: ' + chancesLeft;
  }
  if(isGameOver(event)){
    homeButton.disabled = false;
    homeButton.style.color = 'white';
    homeButton.style.border = '4px solid gold';
    homeButton.style.backgroundColor = 'transparent';
    gameOverScreens(event);
  }
}

setUp();


// I simply sent the event instead of event.target.id because then gameOverScreens can change the finish and hole button to the correct color instead of changing to white regardless
addEventListener("click", (event) => {move(event)});

