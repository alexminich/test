'use strict';

function request() {
    var xhr = new XMLHttpRequest();

    var params = 'part=' + encodeURIComponent('snippet') +
        '&key=' + encodeURIComponent("AIzaSyAqDkjeDHD6SK9PN-eun3NZR0Fzws8qgAQ") +
        '&maxResults=' + encodeURIComponent(2) +
        '&q=' + encodeURIComponent('dog') +
        '&type=' + encodeURIComponent('video');

    xhr.open('GET', 'https://www.googleapis.com/youtube/v3/search?' + params, true);

    xhr.onload = function() {
        alert(this.responseText);
    }

    xhr.onerror = function() {
        alert('ошибка ' + this.status);
    }

    xhr.send();
}