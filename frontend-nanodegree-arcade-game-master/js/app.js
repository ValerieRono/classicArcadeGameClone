//Enemies our player must avoid
class Enemy {
    constructor(x, y, movement){
        // Variables applied to each of our instances go here,
        this.sprite = 'images/enemy-bug.png';
        this.x = x;
        this.y = y;
        this.movement = movement;
    }

    // Update the enemy's position, required method for game
    // Parameter: dt, a time delta between ticks
    update(dt){
        if(this.x < 500){
            //multiply any movement by the dt parameter
            // which will ensure the game runs at the same speed for
            // all computers.
            this.x += this.movement * dt;
        } else {
            this.x = -2;
            this.y = Math.random() * 184 + 50;
        }

        //upon collision(if distance between player and enemy is <= 50)
        //reset player
        //in addition, reset score and level if player was above level 1
        if (Math.abs(player.x - this.x) <= 50) {
            if (Math.abs(player.y - this.y) <= 50) {
                if(level == 1){
                    player.x = 202;
                    player.y = 405;
                } else {
                    level--;
                    addScore(level);
                    addLevel(level);
                    allEnemies.pop(enemy);
                    player.x = 202;
                    player.y = 405;
                }
            }
        }
            
    }

    // Draw the enemy on the screen
    render(){
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
}

//Player class
class Player {
    // constructor object
    constructor(x,y){
        this.x = x;
        this.y = y;
        this.player = 'images/char-boy.png';
    }

    update(dt){

    }

    // Draw the player on the screen
    render(){
        ctx.drawImage(Resources.get(this.player), this.x, this.y);
    }

    //handle user input
    handleInput(play){
        //move left
        //restrict player from moving off screen to the left
        if (play === 'left' && this.x > 0){
            this.x -= 102;
        }
        //move right
        //restrict player from moving off screen to the right
        else if (play === 'right' && this.x < 405){
            this.x += 102;
        }
        //move up
        else if (play === 'up'){
            //win
            //add level/reset game
            if (this.y < 50){
                if(confirm("congratulations on finishing the Level! Level up?")){
                    level++;
                    reset();
                    addScore(level);
                }else{
                    level = 1;
                    addScore(level);
                    reset();
                }
            } else {
                this.y -= 50;
            }
        }
        //move down
        //restrict player from moving off screen to the bottom
        else if (play === 'down' && this.y < 405){
            this.y += 83;;
        }
    }
}

//reset game
function reset(){
    addEnemy(level);
    addLevel(level);
    setTimeout (function (){
        player.x = 202;
        player.y = 405;
    }, 500);
}

//add enemies on screen as level goes up
function addEnemy(a){
    allEnemies.length = 0;
    for (var i = 0; i <a; i++) {
        //instantiate new Enemy
        //push into all Enemies array
        var enemy = new Enemy(0, Math.random() * 184 + 50, Math.random() * 256);
        allEnemies.push(enemy);
    }
};

//instantiate new Player
const player = new Player(202, 405);

//initiate level to 1 and score to 0
var level = 1;
var score = 0;

//update level on screen
function addLevel(b){
    var levelUp = document.getElementById("levels");
    levelUp.textContent = b;
}

//update score on screen
function addScore(c){
    var scoreUp = document.getElementById("score");
    scoreUp.textContent = (c-1) * 10;
}

//Place all enemy objects in an array called allEnemies
const allEnemies = [];

//instantiate new Enemy
const enemy = new Enemy(0, Math.random() * 184 + 50, Math.random() * 256);
allEnemies.push(enemy);

//This listens for key presses and sends the keys to your
// Player.handleInput() method.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});


