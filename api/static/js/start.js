function blue() {
    localStorage.setItem("color", [1,"b"]);
    //redirect to /game
    window.location.href = "/game";
}
function red() {    
    localStorage.setItem("color", [0,"r"]);
    window.location.href = "/game";
}