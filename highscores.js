var restartBtn = document.querySelector("button.restartBtn"),
    clearBtn = document.querySelector("button.clearBtn"),
    highScores = JSON.parse(localStorage.getItem("highScores") || "[]"),
    scoreList = document.getElementById("score-list");

// high to low sorting
highScores.sort(function (a, b) {
    return b.score - a.score
})
// score display
for (var s = 0; s < highScores.length; s++) {
    var newLi = document.createElement("li")
    newLi.textContent = highScores[s].name + " - " + highScores[s].score
    scoreList.appendChild(newLi)
}
// EventListener(s) for restart and clear score buttons
clearBtn.addEventListener("click", function () {
    localStorage.clear();
    history.back()
});
restartBtn.addEventListener("click", function () {
    history.back();
});