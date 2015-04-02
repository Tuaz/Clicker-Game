$(document).ready(function() { 
    var heroName = prompt("Please enter your Hero name","Bobby");   
    $("#hero-name").html(heroName);
    
    Game.Enemy();
    
    $("#enemy").click(function() {
    Game.enemyHealth --;
        $("#enemy-health").html(Game.enemyHealth);
        if (Game.enemyHealth == 0){
            Game.Enemy();
        }
});
});

Game = {};


Game.Enemy = function (){
    this.enemyHealth = 10;
    this.enemyIsAlive = true;
    $("#enemy-health").html(this.enemyHealth);
    
    
}


