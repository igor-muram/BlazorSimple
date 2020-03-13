var canvas, ctx;

function init()
{
    canvas = document.getElementById('canvas');
    if (canvas === null) { console.log("null"); return; }
    ctx = canvas.getContext('2d');
}

function clear() {
    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(0, 0, 1000, 1000);
}

function drawPoint(clientX, clientY)
{
    let rect = canvas.getBoundingClientRect();
    let x = clientX - rect.left;
    let y = clientY - rect.top; 

    ctx.fillStyle = "#FF0000";
    ctx.fillRect(x, y, 4, 4);
}

function drawLine(clientX1, clientY1, clientX2, clientY2)
{
//    clear();
    let rect = canvas.getBoundingClientRect();
    let x1 = clientX1 - rect.left;
    let y1 = clientY1 - rect.top; 
    let x2 = clientX2 - rect.left;
    let y2 = clientY2 - rect.top; 

    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.strokeStyle = '#00FF00';
    ctx.stroke();
    ctx.lineWidth = 1;

}
