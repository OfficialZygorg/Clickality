function showDiv(divId) {
var x = document.getElementById(divId);
if (x.style.display === "none") {
    x.style.display = "block";
}
}

function hideDiv(divId) {
var x = document.getElementById(divId);
if (x.style.display === "block") {
    x.style.display = "none";
}
}

function show(id){
document.getElementById(id).removeAttribute("hidden");
}

function hide(id){
document.getElementById(id).setAttribute("hidden");
}