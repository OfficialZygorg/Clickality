//Script Packs
//Snackbar: https://github.com/mickelsonmichael/js-snackbar

//Libraries:
//break_eternity: https://github.com/Patashu/break_eternity.js

//Scripts:
//tabUtilities.js: Some code from Antimatter Dimensions
//save.js: Save some code from Antimatter Dimensions
//utilities.js: My code
//main.js My code (Except the main loop, idk if it was from Antimatter Dimensions or a tutorial video)

//Pre-Data Scripts

//Data
time = new Date();
lastUpdate = Date.now();
player = {
  clicks: new Decimal(0),
  clicksPerClick: new Decimal(1),
  numClicks: new Decimal(1),
};
clicker = {
  upgradeCost: new Decimal(20),
  clickTime: new Decimal(1000),
  autoClickers: [],
  sum: new Decimal(0),
  ammount: new Decimal(0),
};

//Pre-Load Data
document.getElementById("clicksAmount").innerText = "You have clicked " + player.clicks + " time"; //Sets the player clicks on the screen
document.getElementById("clickButton").innerText = "+ " + player.clicksPerClick + " clicks"; //Sets how many clicks you will gain per click on screen
document.getElementById("upgradeClicker").innerText = "+1 per " + clicker.upgradeCost + " clicks"; //Sets the cost of the manual clicker upgrade

//Scripts

//Add Clicks
function clickButton() {
  player.clicks = player.clicks.add(player.clicksPerClick.times(player.numClicks)); //Add player.clicksPerClick multiplied by player.numClicks to player.clicks
  document.getElementById("clicksAmount").innerText = "You have clicked " + player.clicks + " times"; //Sets the player clicks on the screen
}

//Clicker Upgrades

//Reveal Clicker Upgrades
function revealClickerUpgrades() {
  if (player.clicks.gte(20)) {
    showDiv("upgradeClicker"); //Unhides the div with the id "upgradeClicker"
    document.getElementById("upgradeClicker").innerText = "+1 per " + clicker.upgradeCost + " clicks"; //Sets the upgrade cost of the manual clicker on screen
  }
  for (let i = 99; i >= 0; i--) { //Checking for the smaller number in this array instead of the biggest
    if (player.clicks.gte(clicker.autoClickers[i].cost) && !clicker.autoClickers[i].seen && !clicker.autoClickers[i].bought) { //If player.clicks is greater or equal to clicker.autoclickers.cost and if its been seen and it hasn't been bought
      showDiv("autoClicker"); //Unhides the div with the id "autoClicker"
      document.getElementById("autoClicker").innerText = "Buy an autoclicker for " + clicker.autoClickers[i].cost; //Sets the buying cost of the autoclicker on screen
      clicker.autoClickers[i].seen = true; //Sets that autoclicker to "seen" for it to not be shown anymore
    }
  }
}
//Manual Clicker Upgrader
function upgradeClicker() {
  if (player.clicks.gte(clicker.upgradeCost)) { //If player.clicks is greater or equal to clicker.upgradeCost
    player.clicks = player.clicks.minus(clicker.upgradeCost); //Removes the cost of clicker.upgradeCost from player.clicks
    player.clicksPerClick = player.clicksPerClick.add(1); //Adds +1 to player.clicksPerClick
    clicker.upgradeCost = clicker.upgradeCost.times(10); //Multiply the cost of clicker.upgradeCost by 10
    document.getElementById("clicksAmount").innerText = "You have clicked " + player.clicks + " time"; //Sets the player clicks on the screen
    document.getElementById("clickButton").innerText = "+ " + player.clicksPerClick + " clicks"; //Sets how many clicks you will gain per click on screen
    document.getElementById("upgradeClicker").innerText = "+1 per " + clicker.upgradeCost + " clicks"; //Sets the cost of the manual clicker upgrade
  }
}
//If you can buy upgrades
function canYouBuyIt() {
  if (player.clicks.gte(clicker.upgradeCost)) { //If player.clicks is greater or equal to clicker.upgradeCost
    document.getElementById("upgradeClicker").style.borderColor = "green"; //Sets the button green
  } else document.getElementById("upgradeClicker").style.borderColor = "red"; //Sets the button red
  if (clicker.sum.lt(100)) { //If clicker.sum is less than 100
    let i = clicker.sum.toNumber(); //Set the variable "i" to be clicker.sum and converts the string to a number
    if (player.clicks.gte(clicker.autoClickers[i].cost) && !clicker.autoClickers[i].bought) { //If player.clicks is greater or equal to clicker.autoClickers[i].cost and its not been bought
      document.getElementById("autoClicker").style.borderColor = "green"; //Sets the button green
    } else document.getElementById("autoClicker").style.borderColor = "red"; //Sets the button red
  }
}
//Make clickers
function makeClickers() {
  for (let i = 2; i < 102; i++) { //Loop from 2 to 102 (100 entries) and add +1 to the variable "i" per cycle
    let autoClicker = {
      cost: Math.pow(10, i), //10^i
      seen: false, //If its been seen
      bought: false, //If its been bought
    };
    clicker.autoClickers.push(autoClicker); //Push variable "autoClicker" to be "clicker.autoClickers"
  }
}
makeClickers();
//Buy Autoclickers
function autoClicker() {
  if (clicker.sum.lt(100)) { //If clicker.sum is less than 100
    let i = clicker.sum.toNumber(); //Sets the variable "i" to be clicker.sum and converts the string to a number
    if (player.clicks.gte(clicker.autoClickers[i].cost) && !clicker.autoClickers[i].bought) { //If player.clicks is greater or equal to clicker.autoClickers[i].cost and its not been bought
      player.clicks = player.clicks.minus(clicker.autoClickers[i].cost); //Removes the cost of clicker.autoClickers[i].cost from player.clicks
      document.getElementById("clicksAmount").innerText = "You have clicked " + player.clicks + " times"; //Sets the player clicks on the screen
      clicker.autoClickers[i].bought = true; //Sets the autoclicker to have been bought
      clicker.sum = clicker.sum.add(1); //Add 1 to the autoclicker counter
      document.getElementById("autoClicker").innerText = "Buy an autoclicker for " + clicker.autoClickers[i].cost; //Sets the buying cost of the autoclicker on screen
    }
  }
}
//Update Autoclicker Cost
function updateACCost() {
  if (clicker.sum.lt(100)) { //If clicker.sum is less than 100
    let i = clicker.sum.toNumber(); //Sets the variable "i" to be clicker.sum and converts the string to a number
    {
      document.getElementById("autoClicker").innerText = "Buy an autoclicker for " + clicker.autoClickers[i].cost; //Sets the buying cost of the autoclicker on screen
    }
  }
}
//Execute autoclickers
function autoClickerClick() {
  if (clicker.sum.gt(0)) { //If clicker.sum is greater than 0
    clickButton(clicker.sum); //Execute "clickButton" function with the ammount of "clicker.sum"
  }
}
setInterval(autoClickerClick, clicker.clickTime); //Sets a repetition interval for "autoClickerClick" with a timer "clicker.clickTime"

//Prestiges

//2000 Clicks (P1)
function prestigeOne() {
  if (player.clicks.gte(2000)) { //If player.clicks is greater or equal to 2000
  }
}

//Main Loop
function mainLoop() {
  var diff = (Date.now() - player.lastUpdate) / 1000;
  revealClickerUpgrades();
  canYouBuyIt();
  updateACCost();
  player.lastUpdate = Date.now();
}
setInterval(mainLoop, 50);
