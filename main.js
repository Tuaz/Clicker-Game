$(document).ready(function() { 
    var heroName = prompt("Please enter your Hero name","Bobby");   
    $("#hero-name").html(heroName);
    
    Game.Enemy();
    Game.Hero();
    Game.Update();
    
    $("#enemy").click(function() {
        Game.enemyHealth -= Game.clickpower;
        $("#enemy-health").html(Game.enemyHealth);      
    });
});


Game = {};

Game.fps = 30;

Game.Hero = function (){
    this.heroExp = 0;
    this.clickpower = 1;
    
    $("#hero-exp").html(this.heroExp);
}

Game.Enemy = function (){
    this.enemyHealth = 10;
    $("#enemy-health").html(this.enemyHealth); 
}

Game.Update = function(){
    
    if (Game.enemyHealth == 0){
        $("#hero-exp").html(Game.heroExp++);
        Game.Enemy();
        }
    
    setTimeout(Game.Update, 1000 / Game.fps);
}