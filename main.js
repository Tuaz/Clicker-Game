$(document).ready(function() { 
    var heroName = prompt("Please enter your Hero name","Bobby");   
    $("#hero-name").html(heroName);
    

    Game.Hero();
    Game.Enemy();
    
    Game.Update();
    
    $("#enemy").click(function() {
        Game.ememyCurrentHp -= Game.clickpower;
        $("#enemy-health").html(Game.ememyCurrentHp);
        var enemyHpPercent = Game.ememyCurrentHp / Game.ememyMaxHp *100;
        var hpBarWidth = $("#enemy-health").width() * enemyHpPercent;
        $("#enemy-health").css("width", enemyHpPercent +"%");
        
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
    this.ememyCurrentHp = 10;
    this.ememyMaxHp = 10;
    $("#enemy-health").html(this.ememyCurrentHp); 
    $("#enemy-health").css("width", 100 +"%");
}

Game.Update = function(){
    
    if (Game.ememyCurrentHp == 0){
        $("#hero-exp").html(++Game.heroExp);
        Game.Enemy();
        }
    
    setTimeout(Game.Update, 1000 / Game.fps);
}