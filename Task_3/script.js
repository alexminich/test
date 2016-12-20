var start = document.getElementsByClassName('start');
var content = ' <b> ||||Added text, wow! </b> ';
var clName = 'bigFont';

function myAppend(content) {
    for (var i = 0; i < start.length; i++) {
        start[i].append(content);
    }
}

function myAddClass(clName) {
    for (var i = 0; i < start.length; i++) {
        start[i].classList.add(clName);
    }
}

function myHtml(content) {
    if (content) {
        for (var i = 0; i < start.length; i++) {
            start[i].insertAdjacentHTML('beforeend', content);
        }
    } else {
        for (var i = 0; i < start.length; i++) {
            start[i].replaceWith(start[i].outerHTML);
        }
    }
}
