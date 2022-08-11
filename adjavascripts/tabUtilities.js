//OpenTab
function openTab(evt, idName) {
var i, tabName, tablinks;
tabName = document.getElementsByClassName("tabName");
for (i = 0; i < tabName.length; i++) {
    tabName[i].style.display = "none";
}
tablinks = document.getElementsByClassName("tablinks");
for (i = 0; i < tablinks.length; i++) {
    tablinks[i].classList.remove("active");
}
document.getElementById(idName).style.display = "block";
evt.currentTarget.classList.add("active")
}