'use strict';


var squares = new List();
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
ctx.strokeStyle = 'black';

function Square(color, side) {
    this.color = color;
    this.side = side;
}
Square.prototype.toString = function() {
    return (this.color + this.side);
}

function addSquare() {
    var color = prompt('Color?', 'white');
    //  var side = prompt('Size?', 10);
    var a = new Square(color, 150); //  var a = new Square(color, side);
    squares.add(a);
    drawList();
}

function deleteSquare() {
    var color = prompt('Color?', 'white');
    //  var side = prompt('Size?', 10);
    var a = new Square(color, 150); //  var a = new Square(color, side);
    squares.delete(a);
    drawList();
}

// рисование списка
function drawList() {
    ctx.clearRect(0, 0, 1400, 3000);
    let x = 1;
    let y = 1;
    let elem = squares.start;
    while (elem !== null) {
        ctx.fillStyle = elem.data.color;
        ctx.fillRect(x, y, 150, 150);
        ctx.strokeRect(x, y, 150, 150);
        x += 153;
        if (x > 1200) {
            x = 1;
            y += 153;
        }
        elem = elem.next;
    }
}
