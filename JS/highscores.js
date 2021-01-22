var restartBtn = document.querySelector("button.restartBtn"),
    clearBtn = document.querySelector("button.clearBtn"),
    scoreList = document.getElementById("score-list")
    highScores = JSON.parse(localStorage.getItem("highScores") || "[]");
    
// high to low sorting
highScores.sort(function (a, b) {
    return b.score - a.score
})
// score display
for (var i = 0; i < highScores.length; i++) {
    var hsLi = document.createElement("li")
    hsLi.textContent = highScores[i].name + " - " + highScores[i].score
    scoreList.appendChild(hsLi)
}
// EventListener(s) for restart and clear score buttons
clearBtn.addEventListener("click", function () {
    localStorage.clear();
    history.back()
});
restartBtn.addEventListener("click", function () {
    history.back();
});