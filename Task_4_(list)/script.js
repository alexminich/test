'use strict';


var figures = new List();
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

function Square(color, side) {
    this.color = color;
    this.side = side;
}
Square.prototype.toString = function() {
    return ('square: ' + this.color + this.side);
}

function Circle(color, size) {
    this.color = color;
    this.size = size;
}
Circle.prototype.toString = function() {
    return ('circle: ' + this.color + this.side);
}

function addSquare() {
    var color = prompt('Color?', 'blue');
    //  var side = prompt('Size?', 10);
    var a = new Square(color, 150); //  var a = new Square(color, side);
    figures.add(a);
    drawList();
}

function addCircle() {
    var color = prompt('Color?', 'blue');
    var a = new Circle(color, 150);
    figures.add(a);
    drawList();
}

function deleteSquare() {
    var color = prompt('Color?', 'blue');
    //  var side = prompt('Size?', 10);
    var a = new Square(color, 150); //  var a = new Square(color, side);
    figures.delete(a);
    drawList();
}

function deleteCircle() {
    var color = prompt('Color?', 'blue');
    var a = new Circle(color, 150);
    figures.delete(a);
    drawList();
}

// рисование списка
function drawList() {
    ctx.clearRect(0, 0, 1400, 3000);
    let x = 1;
    let y = 1;
    let elem = figures.start;
    while (elem !== null) {
        if (elem.data instanceof Circle) {
            var gradient = ctx.createRadialGradient(x + 75, y + 75, 75, x + 75, y + 75, 0);
            gradient.addColorStop(0, '#F5FFFA');
            gradient.addColorStop(1, elem.data.color);
            gradient.addColorStop(0.7, elem.data.color);
        } else {
            var gradient = ctx.createLinearGradient(x, 0, x + 150, 0);
            gradient.addColorStop(0, '#F5FFFA');
            gradient.addColorStop(0.4, elem.data.color);
            gradient.addColorStop(0.6, elem.data.color);
            gradient.addColorStop(1, '#F5FFFA');
        }
        ctx.fillStyle = gradient;
        ctx.fillRect(x, y, 150, 150);

        x += 153;
        if (x > 1200) {
            x = 1;
            y += 153;
        }
        elem = elem.next;
    }
}
