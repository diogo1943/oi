function currentTime() {
    var date = new Date(); /* creating object of Date class */
    var day = date.getMonth();
    var hour = date.getHours();
    var min = date.getMinutes();
    var sec = date.getSeconds();
    var midday = "AM";
    midday = (hour >= 12) ? "PM" : "AM"; /* assigning AM/PM */
    hour = (hour == 0) ? 12 : ((hour > 12) ? (hour - 12) : hour); /* assigning hour in 12-hour format */
    hour = updateTime(hour);
    min = updateTime(min);
    sec = updateTime(sec);
    var d = new Date();
    var n = d.toLocaleString("es-US");
    document.getElementById("clock").innerText = n;
    var t = setTimeout(currentTime, 1000); /* setting timer */
}

function updateTime(k) {
    /* appending 0 before time elements if less than 10 */
    if (k < 10) {
        return "0" + k;
    } else {
        return k;
    }
}

currentTime();