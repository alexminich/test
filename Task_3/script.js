var start = document.getElementsByClassName('start');
var content = '  ||||Added text, wow! ';

function myAppend(content) {
    for (var i = 0; i < start.length; i++) {
        start[i].append(content);
    }
}
