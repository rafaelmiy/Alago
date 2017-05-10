$(function() {
    var canvas = document.getElementById("wave3");
    var graphics = canvas.getContext("2d");
    graphics.fillStyle = "rgba(16, 31, 128, 0.30)";

    var W = 100;
    var sw = canvas.offsetWidth;
    var sh = canvas.offsetHeight;
    var level = 60;
    setInterval(wave, 1000 / 30);
    function wave() {
        var oldX = 0;
        var oldY = 100;
        graphics.clearRect(0, 0, sw, sh);
        graphics.beginPath();
        graphics.moveTo(0, sh);
        graphics.lineTo(0, sh / 2);

        for (var x = 0; x <= W; x++) {
        var xx = x * (sw / W);
        var yy = f(x) * level + sh / 2;
        var cx = oldX + (xx - oldX) / 2;
        var cy = oldY + (yy - oldY) / 2;
        graphics.quadraticCurveTo(cx, cy, xx, yy);
        oldX = xx;
        oldY = yy;
        }
        graphics.lineTo(sw, sh);
        graphics.lineTo(0, sh);
        graphics.closePath();
        graphics.fill();
    }

    var k = 0;
    function f(t) {
        var ret = 0;
        var n = 5;
        k += 0.001;
        for (var i = 1; i < n; i++) {
        ret += (-2/i) * (Math.pow(-1, i)) * Math.sin(i * t * Math.PI / 180 + k);
        }
        return ret;
    }
});