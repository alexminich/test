function $(str) {
    if (str[0] == '#') {
        var elem = document.getElementById(str.substring(1)),
            customElem = new CustomJqureyElem(elem);
        return customElem;

    } else if (str[0] == '.') {
        var elem = document.getElementsByClassName(str.substring(1)),
        customElem = new CustomJqureyElem(elem);
        return customElem;

    } else if (str == str.toUpperCase()) {
        var elem = document.getElementsByTagName('div'),
        customElem = new CustomJqureyElem(elem);
        return customElem;
    }

}

function CustomJqureyElem(elem) {
    this.elem = elem;
}

CustomJqureyElem.prototype.myAppend = function(content) {
    for (var i = 0; i < this.elem.length; i++) {
        this.elem[i].append(content);
    }
    return this;
}

CustomJqureyElem.prototype.myAddClass = function(clName) {
    for (var i = 0; i < this.elem.length; i++) {
        this.elem[i].classList.add(clName);
    }
    return this;
}

CustomJqureyElem.prototype.myHtml = function(content) {
    if (content) {
        for (var i = 0; i < this.elem.length; i++) {
            this.elem[i].insertAdjacentHTML('beforeend', content);
        }
    } else {
        for (var i = 0; i < this.elem.length; i++) {
            this.elem[i].replaceWith(this.elem[i].outerHTML);
        }
    }
    return this;
}

CustomJqureyElem.prototype.myAttr = function(attrName, value) {
    if (value !== undefined) {
        for (var i = 0; i < this.elem.length; i++) {
            this.elem[i].setAttribute(attrName, 'changed attribute | ');
        }
    } else {
        for (var i = 0; i < this.elem.length; i++) {
            this.elem[i].append(' ' + this.elem[i].getAttribute(attrName));
        }
    }
    return this;
}

CustomJqureyElem.prototype.myChildren = function() {
    var elementChildren = this.elem[0].children;
    for (var i = 0; i < elementChildren.length; i++) {
        elementChildren[i].append('  -I\'m child №' + (i + 1));
    }
    return this;
}

CustomJqureyElem.prototype.myCss = function(styleName, styleValue) {
    if (styleValue) {
        this.elem[0].style[styleName] = styleValue;
    } else {
        alert(getComputedStyle(this.elem[0])[styleName]);
    }
    return this;
}
