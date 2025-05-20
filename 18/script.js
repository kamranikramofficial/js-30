document.getElementById("calculateBtn").addEventListener("click", function () {
    var input = document.getElementById("timeInput").value;
    var timeStrings = input.split("\n");
    var totalSeconds = 0;
    for (var i = 0; i < timeStrings.length; i++) {
        var timeStr = timeStrings[i].trim();
        if (timeStr === "") {
            continue;
        }
        var parts = timeStr.split(":");
        var minutes = parseInt(parts[0]);
        var seconds = parseInt(parts[1]);
        if (isNaN(minutes) || isNaN(seconds)) {
            continue;
        }
        totalSeconds += minutes * 60 + seconds;
    }
    var totalMinutes = Math.floor(totalSeconds / 60);
    var remainingSeconds = totalSeconds % 60;
    var formatted =
        (totalMinutes < 10 ? "0" : "") + totalMinutes + ":" +
        (remainingSeconds < 10 ? "0" : "") + remainingSeconds;
    document.getElementById("result").textContent = "Total Time: " + formatted;
});
