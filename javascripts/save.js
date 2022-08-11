//Save code from Antimatter Dimensions
//Save Function
function delete_save(){
    localStorage.removeItem("materialityRebornSave");
    localStorage.removeItem("materialityRebornTestSave");
    location.reload();
  }

var currentSave = 0;
var saves = {
  0: null,
  1: null,
  2: null
};
  
function set_save(name, saveId, value) {
  saves[saveId] = value;
  localStorage.setItem(name, btoa(JSON.stringify(getRootSaveObject(), function(k, v) { return (v === Infinity) ? "Infinity" : v; })));
}
  
function get_save(name) {
  try {
    return JSON.parse(atob(localStorage.getItem(name)), function(k, v) { return (v === Infinity) ? "Infinity" : v; });
  } catch(e) { console.log("Fuck IE", e); }
}
  
function getRootSaveObject() {
  return {
    current: currentSave,
    saves: saves
  };
}

function load_game(root) {
  if (!root) {
    if (window.location.href.split("//")[1].length > 20) var root = get_save('materialityRebornTestSave');
    else var root = get_save('materialityRebornSave');
    }
  
  // Start: Migration for old save format
  if (root && !root.saves) {
    var _root = getRootSaveObject();
    _root.saves[currentSave] = root;
    root = _root;
  
    player = root.saves[currentSave];
    save_game();
  }
  // End: Migration
  
  // If there's no save, insert default root object
  if (!root) root = getRootSaveObject();
  
  currentSave = root.current;
  saves = root.saves;
  
  if (saves[currentSave]) player = saves[currentSave];
} 
load_game();

function save_game(changed, silent) {
  SnackBar({message:"Game saved",status: "success"})
  if (window.location.href.split("//")[1].length > 20) set_save('materialityRebornTestSave', currentSave, player);
  else set_save('materialityRebornSave', currentSave, player);
}setInterval(save_game, 30000);