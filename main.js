$(document).ready(function() { 
//    var heroName = prompt("Please enter your Hero name","Bobby");   
    $("#hero-name").html("heroName");
    

    Game.Hero();
    Game.Enemy();
    
    Game.Update();
    
    $("#enemy").click(function() {
        Game.ememyCurrentHp -= Game.clickpower;
        
        
    });
});


Game = {};

Game.fps = 30;


Game.Hero = function (){
    this.heroExp = 0;
    this.clickpower = 1;
    this.dps = 2;
    this.heroLvl = 1;
    this.expToLvl = 10;
    
    $("#hero-level").html(this.heroLvl+ "")
    $("#hero-exp").html(this.heroExp + " / "+ Game.expToLvl);
    
    $(".hero").css("height", "auto");
}

Game.CalculateHeroDps = function(){
    if(Game.dps > 0){
        Game.ememyCurrentHp -= Game.dps / 1000 * Game.fps;
        var i = Math.round(Game.ememyCurrentHp);
        $("#enemy-health").html(i);
    }
}

Game.Enemy = function (){
    this.ememyCurrentHp = 10;
    this.ememyMaxHp = 10;
    $("#enemy-health").html(this.ememyCurrentHp); 
    $("#enemy-health").css("width", 100 +"%");
}

Game.RollItem = function () {
    
    var roll = Math.floor(Math.random() * 1001);
    if(roll == 500){
        alert(roll);
    }

}

Game.Update = function(){
    
    
    Game.UpdateGUI();    
    
    Game.CalculateHeroDps();
    
    if (Game.ememyCurrentHp <= 0){
        Game.heroExp++;
//        Game.RollItem();
        Game.Enemy();
        }
    
    if(Game.heroExp == Game.expToLvl){
        Game.heroLvl++;
        Game.heroExp = 0;
    }
    
    setTimeout(Game.Update, 1000 / Game.fps);
}

Game.UpdateGUI = function(){
    
    
    $("#enemy-health").html(Game.ememyCurrentHp);
    var enemyHpPercent = Game.ememyCurrentHp / Game.ememyMaxHp *100;
    $("#enemy-health").css("width", enemyHpPercent +"%");
    
    $("#hero-level").html(Game.heroLvl);
    $("#hero-exp").html(Game.heroExp + " / "+ Game.expToLvl);
}