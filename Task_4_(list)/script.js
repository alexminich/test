'use strict';


var figures = new List();
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');


function Square(color, size) {
    this.color = color;
    this.size = size;
}
Square.prototype.toString = function() {
    return ('square: ' + this.color + this.size);
}


function Circle(color, size) {
    this.color = color;
    this.size = size;
}
Circle.prototype.toString = function() {
    return ('circle: ' + this.color + this.size);
}


function addSquare() {
    var color = prompt('Color?', 'blue');
    var size = prompt('Size?', 100);

    if (isNaN(size)) {
        alert('Введите число.');
        return;
    }
    if (size <= 1 || size > 1300) {
        alert('Размер может быть от 1 до 1300');
        return;
    }

    var a = new Square(color, +size);
    figures.add(a);
    drawList();
}


function addCircle() {
    var color = prompt('Color?', 'blue');
    var size = prompt('Size?', 100);

    if (isNaN(size)) {
        alert('Введите число.');
        return;
    }
    if (size <= 1 || size > 1300) {
        alert('Размер может быть от 1 до 1300');
        return;
    }

    var a = new Circle(color, +size);
    figures.add(a);
    drawList();
}


function deleteSquare() {
    var color = prompt('Color?', 'blue');
    var size = prompt('Size?', 100);

    if (isNaN(size)) {
        alert('Введите число.');
        return;
    }
    if (size <= 1 || size > 1300) {
        alert('Размер может быть от 1 до 1300');
        return;
    }

    var a = new Square(color, +size);
    figures.deleteByContext(a);
    drawList();
}


function deleteCircle() {
    var color = prompt('Color?', 'blue');
    var size = prompt('Size?', 100);

    if (isNaN(size)) {
        alert('Введите число.');
        return;
    }
    if (size <= 1 || size > 1300) {
        alert('Размер может быть от 1 до 1300');
        return;
    }

    var a = new Circle(color, +size);
    figures.deleteByContext(a);
    drawList();
}


function del() {
    var position = prompt('Position № ', 1);
    figures.delete(position);
    drawList();
}


// рисование списка
function drawList() {
    ctx.clearRect(0, 0, 1400, 3000);
    let x = 1;
    let y = 1;
    let yMax = 1;
    let line = 1;
    let elem = figures.start;
    while (elem !== null) {
        if (elem.data.size > 1350 - x) { // переход на новую строчку
            line = yMax + line;
            y = line;
            yMax = 1;
            x = 1;
        }
        if (elem.data instanceof Circle) {
            var radius = elem.data.size / 2;
            var gradient = ctx.createRadialGradient(x + radius, y + radius, radius, x + radius, y + radius, 0);
            gradient.addColorStop(0, '#F5FFFA');
            gradient.addColorStop(1, elem.data.color);
            gradient.addColorStop(0.7, elem.data.color);
        } else {
            var gradient = ctx.createLinearGradient(x, 0, x + elem.data.size, 0);
            gradient.addColorStop(0, '#F5FFFA');
            gradient.addColorStop(0.4, elem.data.color);
            gradient.addColorStop(0.6, elem.data.color);
            gradient.addColorStop(1, '#F5FFFA');
        }
        ctx.fillStyle = gradient;
        ctx.fillRect(x, y, elem.data.size, elem.data.size);
        ctx.strokeText(String(elem.data.size), x + elem.data.size / 2 - 10, y + elem.data.size / 2 + 2);

        if (elem.data.size + line > yMax) {
            yMax = elem.data.size + line;
        }
        x += elem.data.size;
        elem = elem.next;
    }
}
