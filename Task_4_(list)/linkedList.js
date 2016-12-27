'use strict';

function List() {
    this.start = null;
    this.end = null;
    this.length = 0;
}


List.prototype.makeElement = function() {
    return {
        data: null,
        next: null,
        previous: null
    };
}


// вставка в конец списка
List.prototype.add = function(data) {
    // если список пуст
    if (this.start === null) {
        this.start = this.makeElement();
        this.end = this.start;
    }
    // если список не пуст
    else {
        this.end.next = this.makeElement();
        let temp = this.end;
        this.end = this.end.next;
        this.end.previous = temp;
    }
    this.end.data = data;
    this.length++;
    return this;
}


// вставка в начало списка
List.prototype.addAsFirst = function(data) {
    // если список пуст
    if (this.start === null) {
        this.start = this.makeElement();
        this.end = this.start;
    }
    // если список не пуст
    else {
        this.start.previous = this.makeElement();
        let temp = this.start;
        this.start = this.start.previous;
        this.start.next = temp;
    }
    this.start.data = data;
    this.length++;
    return this;
}


// удаление элемента по его содержимому
List.prototype.deleteByContext = function(data) {
    var element = this.start;
    while (element !== null) {
        if (element.data.toString() === data.toString()) {
            if (element === this.start) { // если первый элемент
                if (this.length === 1) { // если он единственный
                    this.start = null;
                    this.end = null;
                    this.length--;
                    return this;
                }
                element.next.previous = null;
                this.start = element.next;
                this.length--;
                return this;
            }
            if (element === this.end) { // если последний
                element.previous.next = null;
                this.end = element.previous;
                this.length--;
                return this;
            }
            element.previous.next = element.next; // если в середине
            element.next.previous = element.previous;
            this.length--;
            return this;
        }
        element = element.next;
    }
    alert('Таких элементов нет в списке');
    return this;
}

// удаление на выбранной позиции
List.prototype.delete = function(position) {
    if (this.length === 0) {
        alert('Список пуст. Нечего удалять.');
        return this;
    } else {
        if (isNaN(position)) {
            alert('Введите число.');
            return this;
        } else {
            if ((position ^ 0) !== +position) {
                alert('Число должно быть целым.');
                return this;
            }
            if (position > 0 && position <= this.length) {

                if (+position === 1) { // если первый элемент
                    if (this.length === 1) { // если он единственный
                        this.start = null;
                        this.end = null;
                        this.length--;
                        return this;
                    }
                    let temp = this.start.next;
                    this.start.next.previous = null;
                    this.start = temp;
                    this.length--;
                    return this;
                }

                if (+position === this.length) { // если последний
                    let temp = this.end.previous;
                    this.end.previous.next = null;
                    this.end = temp;
                    this.length--;
                    return this;
                }

                let element = this.start; // если элемент в середине
                for (var i = 0; i < position - 1; i++) {
                    element = element.next;
                }
                console.log(element);
                element.next.previous = element.previous;
                element.previous.next = element.next;
                this.length--;
                return this;

            } else if (position < 1) {
                alert('Число должно быть в диапазоне от 1 до ' + this.length);
                return this;
            } else {
                alert('В списке меньше элементов. Число должно быть в диапазоне от 1 до ' + this.length);
                return this;
            }
        }
    }
}
