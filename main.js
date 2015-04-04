$(document).ready(function() { 
//    var heroName = prompt("Please enter your Hero name","Bobby");   
    $("#hero-name").html("heroName");
    

    Game.Hero();
    Game.Enemy();
    
    Game.Update();
    Game.Autosave();
    
    $("#enemy").click(function() {
        Game.ememyCurrentHp -= Game.clickpower;
        
        
    });

    $(".tabs .tab-links a").on("click", function(e) {
        e.preventDefault();
        var tabID = e.target.getAttribute("href");
        $(".tabs " + tabID).show().siblings().hide();
        $(this).parent("li").addClass("active").siblings().removeClass("active");
    });

});


Game = {};

Game.fps = 30;


Game.Hero = function (){
    var savedata = Game.Load();
    // Use data from savedata otherwise use default values
    this.heroExp = savedata.heroExp || 0;
    this.clickpower = savedata.clickpower || 1;
    this.dps = savedata.dps || 2;
    this.heroLvl = savedata.heroLvl || 1;
    this.expToLvl = savedata.expToLvl || 10;
    
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

Game.LevelUp = function() {
    Game.heroLvl++;
    Game.heroExp = 0;
    Game.Save();
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
        Game.LevelUp();
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

Game.Load = function() {
    // Get save data from localStorage or return an empty object
    return JSON.parse(localStorage.getItem("hero")) || {};
}

Game.Save = function() {
    var hero = {
        heroExp: Game.heroExp,
        clickpower: Game.clickpower,
        dps: Game.dps,
        heroLvl: Game.heroLvl,
        expToLvl: Game.expToLvl
    };
    // Store Hero values as JSON in localStorage
    localStorage.setItem("hero", JSON.stringify(hero));
}

Game.Autosave = function() {
    Game.Save();
    // Autosave every 60 seconds
    Game.savetimer = setTimeout(Game.Autosave, 1000 * 60);
}
