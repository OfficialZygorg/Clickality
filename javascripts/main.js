//Script Packs
//Snackbar: https://github.com/mickelsonmichael/js-snackbar

//Libraries:
//break_eternity: https://github.com/Patashu/break_eternity.js

//Pre-Data Scripts

//Data
time = new Date();
lastUpdate = Date.now();
player = {
  clicks: new Decimal(0),
  clicksPerClick: new Decimal(1),
};
clicker = {
  upgradeCost: new Decimal(20),
  clickTime: new Decimal(1000),
  autoClickers: [],
  sum: new Decimal(0),
};

//Pre-Load Data
document.getElementById("clicksAmount").innerText =
  "You have clicked " + player.clicks + " time";
document.getElementById("clickButton").innerText =
  "+ " + player.clicksPerClick + " click";
document.getElementById("upgradeClicker").innerText =
  "+1 per " + clicker.upgradeCost + " clicks";

//Scripts

//Add Clicks
function clickButton(numClicks=1) {
  player.clicks = player.clicks.add(player.clicksPerClick.times(numClicks));
  document.getElementById("clicksAmount").innerText =
    "You have clicked " + player.clicks + " times";
  if (player.clicksPerClick.gt(1)) {
    document.getElementById("clickButton").innerText =
      "+ " + player.clicksPerClick + " clicks";
  }
}
//Clicker Upgrades

//Reveal Clicker Upgrades
function revealClickerUpgrades() {
  if (player.clicks.gte(20)) {
    showDiv("upgradeClicker");
    document.getElementById("upgradeClicker").innerText =
      "+1 per " + clicker.upgradeCost + " clicks";
  }
  for (let i = 99; i >= 0; i--) {
    if (
      player.clicks.gte(clicker.autoClickers[i].cost) &&
      !clicker.autoClickers[i].seen &&
      !clicker.autoClickers[i].bought
    ) {
      showDiv("autoClicker");
      document.getElementById("autoClicker").innerText =
        "Buy an autoclicker for " + clicker.autoClickers[i].cost;
      clicker.autoClickers[i].seen = true;
    }
  }
}
//Manual Clicker Upgrader
function upgradeClicker() {
  if (player.clicks.gte(clicker.upgradeCost)) { 
    player.clicks = player.clicks.minus(clicker.upgradeCost);
    player.clicksPerClick = player.clicksPerClick.add(1);
    clicker.upgradeCost = clicker.upgradeCost.times(10);
    document.getElementById("clicksAmount").innerText =
      "You have clicked " + player.clicks + " times";
    document.getElementById("clickButton").innerText =
      "+ " + player.clicksPerClick + " clicks";
    document.getElementById("upgradeClicker").innerText =
      "+1 per " + clicker.upgradeCost + " clicks";
  }
}
//If you can buy upgrades
function canYouBuyIt() { //Fixing
  if (player.clicks.gte(clicker.upgradeCost)) {
    document.getElementById("upgradeClicker").style.borderColor = "green";
  } else document.getElementById("upgradeClicker").style.borderColor = "red";
  for (let i = 99; i >= 0; i--) {
    if (
      player.clicks.gte(clicker.autoClickers[i].cost) &&
      !clicker.autoClickers[i].bought
    ) {
      document.getElementById("autoClicker").style.borderColor = "green";
    } else document.getElementById("autoClicker").style.borderColor = "red";
  }
}
//Make clickers
function makeClickers() {
  for (let i = 2; i < 102; i++) {
    let autoClicker = {
      cost: Math.pow(10, i),
      seen: false,
      bought: false,
    };
    clicker.autoClickers.push(autoClicker);
  }
}
makeClickers();
//Buy Autoclickers
function autoClicker() {
  if (clicker.sum.lt(100)) {
    let i = clicker.sum.toNumber();
    if (
      player.clicks.gte(clicker.autoClickers[i].cost) &&
      !clicker.autoClickers[i].bought
    ) {
      player.clicks = player.clicks.minus(clicker.autoClickers[i].cost);
      document.getElementById("clicksAmount").innerText =
      "You have clicked " + player.clicks + " times";
      document.getElementById("autoClicker").innerText =
      "Buy an autoclicker for " + clicker.autoClickers[i].cost;
      clicker.autoClickers[i].bought = true;
      clicker.sum = clicker.sum.add(1);//Add 1 to the autoclicker counter
      console.log(clicker.sum)
    }
  }
}
// Execute autoclickers
function autoClickerClick() {
  clickButton(clicker.sum);
}
setInterval(autoClickerClick, clicker.clickTime);

//Main Loop
function mainLoop() {
  var diff = (Date.now() - player.lastUpdate) / 1000;
  revealClickerUpgrades();
  canYouBuyIt();
  player.lastUpdate = Date.now();
}
setInterval(mainLoop, 50);