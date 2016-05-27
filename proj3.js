
var GAME_WIDTH = 720; //720 , 1600
var GAME_HEIGHT = 500; //500, 1600
var GAME_SCALE = 1;



var gameport = document.getElementById("gameport");

var renderer = PIXI.autoDetectRenderer(GAME_WIDTH, GAME_HEIGHT, {backgroundColor: 0x99D5FF});
gameport.appendChild(renderer.view);

var stage = new PIXI.Container();
stage.scale.x = GAME_SCALE;
stage.scale.y = GAME_SCALE;

// scene obj to get loaded in ready fnc
var player;
var start_X;
var start_Y;
var world;
var key;
var guard_1;
var guard_2;


// Character movement constants:
var MOVE_LEFT = 1;
var MOVE_RIGHT = 2;
var MOVE_UP = 3;
var MOVE_DOWN = 4;
var MOVE_NONE = 0;

// The move function starts or continues movement
function move() {
  if (player.direction == MOVE_NONE) {
    player.moving = false;
    console.log("current x: " + player.x);
	console.log("current y: " + player.y);
    return;
  }
  player.moving = true;
  console.log("move");
  
  var next_x_r = player.position.x + 32;
  var next_x_l = player.position.x - 32;
  var next_y_u = player.position.y - 32;
  var next_y_d = player.position.y + 32;
 
 /**
  if(bounds_check(player.x, player.y)){ // if next pos is out of bounds, then dont update pos
		  player.moving = false;
		  return;
  }**/
  
  if (player.direction == MOVE_LEFT && game_on) {
	  // check next position
	  if(bounds_check(next_x_l, player.y)){
		  player.moving = false;
		  return;
	  }
	  
	  else createjs.Tween.get(player).to({x: next_x_l}, 275).call(move);
  }
  if (player.direction == MOVE_RIGHT && game_on){
	  // check next position
	  if(bounds_check(next_x_r, player.y)){
		  player.moving = false;
		  return;
	  }
	  
    else createjs.Tween.get(player).to({x: next_x_r}, 275).call(move);
  }
  if (player.direction == MOVE_UP && game_on){
	  // check next position
	  if(bounds_check(player.x, next_y_u)){
		  player.moving = false;
		  return;
	  }
	  
	else createjs.Tween.get(player).to({y: next_y_u}, 275).call(move);
  }
  if (player.direction == MOVE_DOWN && game_on){
	  // check next position
	  if(bounds_check(player.x, next_y_d)){
		  player.moving = false;
		  return;
	  }
	  
	else createjs.Tween.get(player).to({y: next_y_d}, 275).call(move);
  }
}

// global variable to store starting location of the stage
var stage_x = stage.x;
var stage_y = stage.y;


var have_key = false; // if player has key, let them end the game

// returns true if player is out of bounds, takes in player coords
function bounds_check(x, y){
	
	console.log("next x: " + x);
	console.log("next y: " + y);
	
	//check if still inside the map
	if(y > 1600) return true; // bottom edge
	if(y < 548) return true; // top edge
	if(x > 1150) return true; // right edge
	if(x < 120) return true; // left edge
	
	
	// check sides of main path
	if(x < 550 && x > 385 && y > 1080) return true; // bot left side
	if(x > 705 && x < 890 && y > 1080) return true; // bot right side
	
	if(x < 550 && x > 385 && y < 980) return true; // top left
	if(x > 705 && x < 890 && y < 980) return true; // top right

	// check right room
	if(x > 870 && x < 1125 && y < 860) return true; // top left room
	if(x > 870 && x < 1125 && y > 1190) return true; // bot left room

	// check left room
	if(x > 120 && x < 390 && y < 870) return true; // top right room
	if(x > 120 && x < 390 && y > 1120) return true; // bot right room
	
	
	
	if(player.y < 600){ // player is in the "end zone" display text from guards telling player to go get the key
			"Sorry, can't let you go with out the key"
	}
	
	
	return false; // im still inbounds
}

function collision(){
	// check if player is at the end door
	if(player.x == 639.5 && player.y == 575.75){
		
		if(have_key){ // player has the key 
			// So display the end game container
			
			// make sure other containers are set to invisible
			closeAllScreens();
	
			//play victory sound
			//select_sound.play();
	
			// show end game container
			end_game_container.alpha = 1;
			end_game_on = true;
			activate_buttons();
			
			// change the stage screen to view the end game container
			stage.x = stage_x;
			stage.y = stage_y;
		}
	}
	// check if player hits the key
	if(player.x == 159.5 && player.y == 991.75){
		have_key = true;
		key.alpha = 0;
	}
	

	// check if player hits lava patches, if so, then reset the player
	
	// lava patch left middle
	if(player.x > 195 && player.x < 315 && player.y > 930 && player.y < 1085){
		
		// make sure other containers are set to invisible
		closeAllScreens();
	
		//play sound
		//select_sound.play();
	
		// make game visible
		death_container.alpha = 1;
		death_on = true;
		activate_buttons();
		
		// change the stage screen to view the end game container
		stage.x = stage_x;
		stage.y = stage_y;
		
		
	}
	
	// lava patch left corner
	if(player.x < 150 && player.y < 920){
		// make sure other containers are set to invisible
		closeAllScreens();
	
		//play sound
		//select_sound.play();
	
		// make game visible
		death_container.alpha = 1;
		death_on = true;
		activate_buttons();
		
		// change the stage screen to view the end game container
		stage.x = stage_x;
		stage.y = stage_y;
	}
	// lava patch right
	if(player.x > 900 && player.x < 1115 && player.y > 865 && player.y < 1180){
		// make sure other containers are set to invisible
		closeAllScreens();
	
		//play sound
		//select_sound.play();
	
		// make game visible
		death_container.alpha = 1;
		death_on = true;
		activate_buttons();
		
		// change the stage screen to view the end game container
		stage.x = stage_x;
		stage.y = stage_y;
		
	}
}

function reset_player (){
	player.x = 607.5;
	player.y = 1535.75;
}

// Keydown events start movement
window.addEventListener("keydown", function (e) {
  e.preventDefault();
  if (!player) return;
  if (player.moving) return;
  if (e.repeat == true) return;
  
  player.direction = MOVE_NONE;

  if(e.keyCode == 27 && game_on){// user presses escape when game is running
	// make sure other containers are set to invisible
	closeAllScreens();
	
	//play sound
	//select_sound.play();
	
	// set up game
	pause_container.alpha = 1;
	pause_on = true;
	activate_buttons();
	
	// change the stage screen to view the pause container
	stage.x = stage_x;
	stage.y = stage_y;
	
  }
  
  if (e.keyCode == 87 && game_on)
    player.direction = MOVE_UP;
  else if (e.keyCode == 83 && game_on)
    player.direction = MOVE_DOWN;
  else if (e.keyCode == 65 && game_on)
    player.direction = MOVE_LEFT;
  else if (e.keyCode == 68 && game_on)
    player.direction = MOVE_RIGHT;

  console.log(e.keyCode);
  move();
});

// Keyup events end movement
window.addEventListener("keyup", function onKeyUp(e) {
  e.preventDefault();
  if (!player) return;
  player.direction = MOVE_NONE;
});

PIXI.SCALE_MODES.DEFAULT = PIXI.SCALE_MODES.NEAREST;

// Title screen container ////////////////////////////////////////////////////////////////////////
//

var title_container = new PIXI.Container();
title_container.position.x = 360; // 360
title_container.position.y = 250; // 250
title_container.alpha = 1;
stage.addChild(title_container);
title_container.scale.x = GAME_SCALE;
title_container.scale.y = GAME_SCALE;
var title_on = true;

// add title screen background
	var title_screen = new PIXI.Sprite(PIXI.Texture.fromImage("title.png"));
	title_container.addChild(title_screen);
	title_screen.anchor.x = .5;
	title_screen.anchor.y = .5;
	title_screen.position.x = 0;
	title_screen.position.y = 0;
	
	// add play
	var play_button = new PIXI.Sprite(PIXI.Texture.fromImage("play.png"));
	title_container.addChild(play_button);
	play_button.anchor.x = .5;
	play_button.anchor.y = .5;
	play_button.position.x = 0;
	play_button.position.y = 28;
	
	// add tutorial
	var tutorial_button = new PIXI.Sprite(PIXI.Texture.fromImage("tutorial.png"));
	title_container.addChild(tutorial_button);
	tutorial_button.anchor.x = .5;
	tutorial_button.anchor.y = .5;
	tutorial_button.position.x = -3;
	tutorial_button.position.y = 94;

	// add credits
	var credits_button = new PIXI.Sprite(PIXI.Texture.fromImage("credits.png"));
	title_container.addChild(credits_button);
	credits_button.anchor.x = .5;
	credits_button.anchor.y = .5;
	credits_button.position.x = -2;
	credits_button.position.y = 159;
	

//
// end Title screen container ////////////////////////////////////////////////////////////////////




// Tutorial screen container /////////////////////////////////////////////////////////////////////
//

var tutorial_container = new PIXI.Container();
tutorial_container.position.x = 360;
tutorial_container.position.y = 250;
tutorial_container.alpha = 0;
var tutorial_on = false;
stage.addChild(tutorial_container);

	// add tutorial background
	var tutorial_background = new PIXI.Sprite(PIXI.Texture.fromImage("tutorial background.png"));
	tutorial_container.addChild(tutorial_background);
	tutorial_background.anchor.x = .5;
	tutorial_background.anchor.y = .5;
	tutorial_background.position.x = 0;
	tutorial_background.position.y = 0;
	
	// add play button
	var play_button_2 = new PIXI.Sprite(PIXI.Texture.fromImage("play.png"));
	tutorial_container.addChild(play_button_2);
	play_button_2.anchor.x = .5;
	play_button_2.anchor.y = .5;
	play_button_2.position.x = 0;
	play_button_2.position.y = 28;
	
	// add back button
	var back_button = new PIXI.Sprite(PIXI.Texture.fromImage("back.png"));
	tutorial_container.addChild(back_button);
	back_button.anchor.x = .5;
	back_button.anchor.y = .5;
	back_button.position.x = 0;
	back_button.position.y = 96;
	
	
//
// end Tutorial screen container /////////////////////////////////////////////////////////////////


// Credits screen container //////////////////////////////////////////////////////////////////////
//

var credits_container = new PIXI.Container();
credits_container.position.x = 360;
credits_container.position.y = 250;
credits_container.alpha = 0;
var credits_on = false;
stage.addChild(credits_container);

	// add credits background 
	var credits_background = new PIXI.Sprite(PIXI.Texture.fromImage("credits background.png"));
	credits_container.addChild(credits_background);
	credits_background.anchor.x = .5;
	credits_background.anchor.y = .5;
	credits_background.position.x = 0;
	credits_background.position.y = 0;
	
	// add back button
	var back_button2 = new PIXI.Sprite(PIXI.Texture.fromImage("back.png"));
	credits_container.addChild(back_button2);
	back_button2.anchor.x = .5;
	back_button2.anchor.y = .5;
	back_button2.position.x = 0;
	back_button2.position.y = 95;

//
// end Credits screen container //////////////////////////////////////////////////////////////////



// end_game container ////////////////////////////////////////////////////////////////////////////
//

var end_game_container = new PIXI.Container();
end_game_container.position.x = 360;
end_game_container.position.y = 250;
end_game_container.alpha = 0;
var end_game_on = false;
stage.addChild(end_game_container);

	// add end game background 
	var end_background = new PIXI.Sprite(PIXI.Texture.fromImage("end game screen.png"));
	end_game_container.addChild(end_background);
	end_background.anchor.x = .5;
	end_background.anchor.y = .5;
	end_background.position.x = 0;
	end_background.position.y = 0;
	
	// add main menu button
	var back_button3 = new PIXI.Sprite(PIXI.Texture.fromImage("main menu.png"));
	end_game_container.addChild(back_button3);
	back_button3.anchor.x = .5;
	back_button3.anchor.y = .5;
	back_button3.position.x = -5;
	back_button3.position.y = 75;
	
	// add play again button
	var play_button_3 = new PIXI.Sprite(PIXI.Texture.fromImage("play again.png"));
	end_game_container.addChild(play_button_3);
	play_button_3.anchor.x = .5;
	play_button_3.anchor.y = .5;
	play_button_3.position.x = -5;
	play_button_3.position.y = 165;
	

//
// end end_game container ////////////////////////////////////////////////////////////////////////


// pause container ///////////////////////////////////////////////////////////////////////////////
//

var pause_container = new PIXI.Container();
pause_container.position.x = 360;
pause_container.position.y = 250;
pause_container.alpha = 0;
var pause_on = false;
stage.addChild(pause_container);

	// add end game background 
	var pause_background = new PIXI.Sprite(PIXI.Texture.fromImage("pause screen.png"));
	pause_container.addChild(pause_background);
	pause_background.anchor.x = .5;
	pause_background.anchor.y = .5;
	pause_background.position.x = 0;
	pause_background.position.y = 0;

	// add play button
	var play_button_4 = new PIXI.Sprite(PIXI.Texture.fromImage("continue.png"));
	pause_container.addChild(play_button_4);
	play_button_4.anchor.x = .5;
	play_button_4.anchor.y = .5;
	play_button_4.position.x = 0;
	play_button_4.position.y = 95;
	
	// add main menu button
	var back_button4 = new PIXI.Sprite(PIXI.Texture.fromImage("main menu.png"));
	pause_container.addChild(back_button4);
	back_button4.anchor.x = .5;
	back_button4.anchor.y = .5;
	back_button4.position.x = -5;
	back_button4.position.y = -5;

//
// end pause container ///////////////////////////////////////////////////////////////////////////

// Death container ///////////////////////////////////////////////////////////////////////////////
//

var death_container = new PIXI.Container();
death_container.position.x = 360;
death_container.position.y = 250;
death_container.alpha = 0;
var death_on = false;
stage.addChild(death_container);

	// add death background 
	var death_background = new PIXI.Sprite(PIXI.Texture.fromImage("death.png"));
	death_container.addChild(death_background);
	death_background.anchor.x = .5;
	death_background.anchor.y = .5;
	death_background.position.x = 0;
	death_background.position.y = 0;
	
	// add play again button
	var play_button_5 = new PIXI.Sprite(PIXI.Texture.fromImage("play again.png"));
	death_container.addChild(play_button_5);
	play_button_5.anchor.x = .5;
	play_button_5.anchor.y = .5;
	play_button_5.position.x = -5;
	play_button_5.position.y = 165;
	
	// add main menu button
	var back_button5 = new PIXI.Sprite(PIXI.Texture.fromImage("main menu.png"));
	death_container.addChild(back_button5);
	back_button5.anchor.x = .5;
	back_button5.anchor.y = .5;
	back_button5.position.x = -5;
	back_button5.position.y = -5;
	
//
// end Death container ///////////////////////////////////////////////////////////////////////////////

// initialize titlescreen buttons
play_button.interactive = true;
play_button.on('mousedown', mouseHandlerPlay);
tutorial_button.interactive = true;
tutorial_button.on('mousedown', mouseHandlerTutorial);
credits_button.interactive = true;
credits_button.on('mousedown', mouseHandlerCredits);

// initialize tutorial buttons
play_button_2.interactive = false;
play_button_2.on('mousedown', mouseHandlerPlay);
back_button.interactive = false;
back_button.on('mousedown', mouseHandlerMainMenu);

// initialize credits buttons
back_button2.interactive = false;
back_button2.on('mousedown', mouseHandlerMainMenu);

// initialize game over buttons
play_button_3.interactive = false;
play_button_3.on('mousedown', mouseHandlerPlay);
back_button3.interactive = false;
back_button3.on('mousedown', mouseHandlerMainMenu);

// initialize pause buttons
play_button_4.interactive = false;
play_button_4.on('mousedown', mouseHandlerContinue);
back_button4.interactive = false;
back_button4.on('mousedown', mouseHandlerMainMenu);

// initialize death buttons
play_button_5.interactive = false;
play_button_5.on('mousedown', mouseHandlerPlay);
back_button5.interactive = false;
back_button5.on('mousedown', mouseHandlerMainMenu);



// turns all screens invisible and sets all booleans to false, also deactivates all buttons for all screens
function closeAllScreens(){
	// set screens to false
	title_on = false;
	game_on = false;
	tutorial_on = false;
	credits_on = false;
	pause_on = false;
	end_game_on = false;
	death_on = false;
	
	
	// make all screens invisible
	title_container.alpha = 0;
	world.alpha = 0;
	tutorial_container.alpha = 0;
	credits_container.alpha = 0;
	pause_container.alpha = 0;
	end_game_container.alpha = 0;
	death_container.alpha = 0;
	
	de_activate_buttons();
}

function de_activate_buttons(){ // turns off all buttons
	
	// buttons for title screen
	play_button.interactive = false;
	tutorial_button.interactive = false;
	credits_button.interactive = false;
	
	// buttons for tutorial
	play_button_2.interactive = false;
	back_button.interactive = false;

	// buttons for credits
	back_button2.interactive = false;
	
	// buttons for game over
	play_button_3.interactive = false;
	back_button3.interactive = false;
	
	// buttons for pause
	play_button_4.interactive = false;
	back_button4.interactive = false;
	
	// buttons for death
	play_button_5.interactive = false;
	back_button5.interactive = false;

}

// turns on the correct buttons
function activate_buttons(){
	
	if(title_on){ // if title screen is on then activate buttons for it
		play_button.interactive = true;
		tutorial_button.interactive = true;
		credits_button.interactive = true;
	}
	
	if(tutorial_on){ // tutorial is on
		play_button_2.interactive = true;
		back_button.interactive = true;
	}
	
	if(credits_on){// credits are on
		back_button2.interactive = true;
	}
	
	if(end_game_on){// game over is on
		play_button_3.interactive = true;
		back_button3.interactive = true;
	}
	
	if(pause_on){// pause is on
		play_button_4.interactive = true;
		back_button4.interactive = true;
	}
	
	if(death_on){// death is on
		play_button_5.interactive = true;
		back_button5.interactive = true;
	}
}

// mouse handler events /////////////////////////////////////////////////////////////////////////////////////
function mouseHandlerPlay(e){ // if user hits the play button
	// make sure other containers are set to invisible
	closeAllScreens();
	
	//play sound
	//select_sound.play();
	
	// set up game
	world.alpha = 1;
	game_on = true;
	// make sure key is visible
	key.alpha = 1;
	
	// make sure player is back to starting position
	player.x = start_X;
	player.y = start_Y;
	
}

function mouseHandlerContinue(e){ // if user hits the continue button on pause screen
	// make sure other containers are set to invisible
	closeAllScreens();
	
	//play sound
	//select_sound.play();
	
	// make game visible
	world.alpha = 1;
	game_on = true;
	
	
}

function mouseHandlerTutorial(e){ // if user hits the tutorial button
	// make sure other containers are set to invisible.
	closeAllScreens();
	
	//play sound
	//select_sound.play();
	
	
	// show tutorial screen
	tutorial_container.alpha = 1;
	tutorial_on = true;
	activate_buttons()
}
function mouseHandlerCredits(e){ // if user hits the credits button
	// make sure other containers are set to invisible.
	closeAllScreens();
	
	//play sound
	//select_sound.play();
	
	// show credits screen
	credits_container.alpha = 1;
	credits_on = true;
	activate_buttons()
}
function mouseHandlerMainMenu(e){ // if user hits the main menu button go to title screen
	// make sure other containers are set to invisible
	closeAllScreens();
	
	//play sound
	//select_sound.play();
	
	// display titlescreen
	title_container.alpha = 1;
	title_on = true;
	activate_buttons();
}

// end mouse handler events ///////////////////////////////////////////////////////////////////////////////////



var game_on = false;

PIXI.loader
  .add('map_json', 'map.json')
  .add('tileset', 'tileset.png')
  .add('p_fw', 'p fw.png')
  .add('key_img', 'key.png')
  .add('guard', 'guard.png')
  .load(ready);

function ready() {
  var tu = new TileUtilities(PIXI);
  world = tu.makeTiledWorld("map_json", "tileset.png");
  world.alpha = 0;
  stage.addChild(world);

  var start = world.getObject("start");
  player = new PIXI.Sprite(PIXI.loader.resources.p_fw.texture);
  player.x = start.x;
  player.y = start.y;
  // save start pos for later
  start_X = start.x;
  start_Y = start.y;
  player.anchor.x = 0.0;
  player.anchor.y = 1.0;
  
  
  var key_start = world.getObject("get_key");
  key = new PIXI.Sprite(PIXI.loader.resources.key_img.texture);
  key.x = key_start.x;
  key.y = key_start.y;
  key.anchor.x = 0.0;
  key.anchor.y = 1.0;
  
  
  // add guards to door
  var guard1_start = world.getObject("guard 1"); 
  var guard2_start = world.getObject("guard 2");
  guard_1 = new PIXI.Sprite(PIXI.loader.resources.guard.texture);
  guard_2 = new PIXI.Sprite(PIXI.loader.resources.guard.texture);
  
  guard_1.x = guard1_start.x;
  guard_1.y = guard1_start.y;
  guard_2.x = guard2_start.x;
  guard_2.y = guard2_start.y;
  
  guard_1.anchor.x = 0.0;
  guard_1.anchor.y = 1.0;
  guard_2.anchor.x = 0.0;
  guard_2.anchor.y = 1.0;
  
 
  console.log(player.x);
  console.log(player.y);
  // Find the entity layer
  var entity_layer = world.getObject("Entities");
  entity_layer.addChild(player);
  entity_layer.addChild(key);
  entity_layer.addChild(guard_1);
  entity_layer.addChild(guard_2);

  
  animate();
}


function animate(timestamp) {
  requestAnimationFrame(animate);
  if(game_on){
	update_camera();
	collision();
  }
  renderer.render(stage);
}

function update_camera() {
  stage.x = -player.x*GAME_SCALE + GAME_WIDTH/2 - player.width/2*GAME_SCALE;
  stage.y = -player.y*GAME_SCALE + GAME_HEIGHT/2 + player.height/2*GAME_SCALE;
  stage.x = -Math.max(0, Math.min(world.worldWidth*GAME_SCALE - GAME_WIDTH, -stage.x));
  stage.y = -Math.max(0, Math.min(world.worldHeight*GAME_SCALE - GAME_HEIGHT, -stage.y));
}
