/*http://ejohn.org/blog/javascript-getters-and-setters/*/

const MAXBOARDPOSITION = 30

/*There is no map in JS instead use object literals..*/
var snake_and_ladder = {};
snake_and_ladder[27] = 1;
snake_and_ladder[11] = 26;
snake_and_ladder[3] = 22;
snake_and_ladder[21] = 9;
snake_and_ladder[17] = 4;
snake_and_ladder[5] = 8;
snake_and_ladder[19] = 7;
snake_and_ladder[20] = 29;


/*Player*/
function Player (name) {
	this.name = name;
	this.position = 0;
}


/*
Player.prototype.set_postiion = function(value) {
	this.position = value;
};

Player.prototype.get_postiion = function() {
	return this.position;
};
*/

/*object syntax for that.*/
/*
Player.prototype = {
	get Position(){
		return this.position;
	}, 
	set Position(value){
		this.position = value;
	}, 
	get Name(){
		return this.name;
	}
}
*/


/*Classical Model */
Player.prototype.__defineGetter__("Position",function(){
	return this.position;
});

Player.prototype.__defineSetter__("Position", function(value){
	 this.position = value;
});

Player.prototype.__defineGetter__("Name", function(){
	 return this.name;
});


//Array of players..
var players = [new Player("Vimlesh"), new Player("Computer"), new Player("SuperComputer")]

var throwDice = function(min , max){
	return Math.floor(Math.random() * (max - min)) + min;
}

var play_game = function(players){
	loop: {
		while (true){
			
			//for (var player in players){} return index
			for (var player of players){    //of return value
					var dice_Value = throwDice(1,6);
					var next_position = player.Position + dice_Value;

					switch (true){
						case next_position > MAXBOARDPOSITION:
							document.write( player.Name + " can't proceed... waiting for " + (MAXBOARDPOSITION - player.position));
							document.write("<br>");
						break;

						case next_position < MAXBOARDPOSITION:
							var snl_position = snake_and_ladder[next_position];
							player.Position = next_position
							if (snl_position) {
								document.write(" Gotcha for player " + player.Name + " @ " + next_position + " Moving from " + next_position + " -> " + snl_position);
								document.write("<br>");
								next_position = snl_position;							
								player.position = next_position;
							}
							document.write(player.Name + " is at new position " +  player.Position + " and rolled " + dice_Value );
							document.write("<br>");
						break;

    					case next_position == MAXBOARDPOSITION:
							player.Position = next_position;
							document.write(player.Name + " is at new position " + player.Position + " and rolled is " + dice_Value + " and wins <----");
							document.write("<br>");
							break loop;
						break;

					}
			}
		}	
	}	 
}


function Start() {
	play_game(players)
}