'use strict';


var nextPageToken = 0;
var request = "";
var itemsCount = 0;
var list;

function doSearch() {
    nextPageToken = 0;
    var form = document.forms.search;
    var searchRequest = form.elements.searchRequest.value;
    request = searchRequest;
    doRequest(request);
    //  createList(doRequest(searchRequest));

    // console.log(a);
    // var a = doRequest(searchRequest);
    // console.log(a);
    // createList(a);
}


function doRequest(request) {
    var xhr = new XMLHttpRequest();


    var params = 'part=' + 'snippet' +
        '&key=' + "AIzaSyAqDkjeDHD6SK9PN-eun3NZR0Fzws8qgAQ" +
        '&maxResults=' + 15 +
        '&q=' + request +
        '&type=' + 'video';

    xhr.open('GET', 'https://www.googleapis.com/youtube/v3/search?' + params, true);

    xhr.send();

    xhr.onload = function() {
        createList(this.responseText);
        // return this.responseText;
    }

    xhr.onerror = function() {
        alert('ошибка ' + this.status);
        return 0;
    }

    // xhr.onreadystatechange = function() {
    //   if (this.readyState != 4) return;
    //
    //   if (this.status != 200) {
    //     // обработать ошибку
    //     alert( 'ошибка: ' + (this.status ? this.statusText : 'запрос не удался') );
    //     return;
    //   }
    //   var a = this.responseText;
    //   return a;

    // var timerId = setInterval(function() {
    //   xhr.onload = function() {
    //       var a = this.responseText;
    //       return a;
    //       clearInterval(timerId);
    //     }
    //
    //     xhr.onerror = function() {
    //       alert('ошибка ' + this.status);
    //       return 0;
    //     }
    // }, 200);


    // }
}


function createList(resp) {
    if (document.body.contains(document.getElementsByClassName('wrap')[0])) {
        document.body.removeChild(document.getElementsByClassName('wrap')[0]);
    }

    var response = JSON.parse(resp);
    console.log(response);
    nextPageToken = response.nextPageToken;

    var wrap = document.createElement('div');
    wrap.className = "wrap";
    list = document.createElement('div');
    list.className = "resultList";

    // кнопки лево\право
    var leftButton = document.createElement('button');
    var rightButton = document.createElement('button');
    leftButton.className = "leftButton";
    rightButton.className = "rightButton";
    leftButton.onclick = function() {
        scrollLeft(list)
    };
    rightButton.onclick = function() {
        scrollRight(list)
    };

    appendItems(response);

    wrap.appendChild(leftButton);
    wrap.appendChild(list);
    wrap.appendChild(rightButton);
    document.body.appendChild(wrap);

    //задать начальный размер wrap
    resize(wrap, leftButton, rightButton);

    window.onresize = function() {
        resize(wrap, leftButton, rightButton)
    };
    return list;
}


function scrollLeft(list) {
    list.scrollLeft -= list.clientWidth;
}


function scrollRight(list) {
    list.scrollLeft += list.clientWidth;
}


function resize(wrap, leftButton, rightButton, previousWidth) {
    wrap.style.width = document.documentElement.clientWidth + 'px';
    let elementWidth = document.getElementsByClassName('resultElem')[0].offsetWidth + 10;
    let countVisibleElements = Math.floor((wrap.clientWidth - leftButton.offsetWidth - rightButton.offsetWidth) / elementWidth);
    console.log(countVisibleElements);
    let wrapWidth = countVisibleElements * elementWidth + leftButton.offsetWidth + rightButton.offsetWidth;
    wrap.style.width = wrapWidth + 'px';
}

// подгрузка элементов
function loadItems() {
    if (nextPageToken === 0) {
        return
    };

    var xhr = new XMLHttpRequest();

    var params = 'part=' + 'snippet' +
        '&key=' + "AIzaSyAqDkjeDHD6SK9PN-eun3NZR0Fzws8qgAQ" +
        '&maxResults=' + 15 +
        '&q=' + request +
        '&type=' + 'video' +
        '&pageToken=' + nextPageToken;

    xhr.open('GET', 'https://www.googleapis.com/youtube/v3/search?' + params, true);

    xhr.send();

    xhr.onload = function() {
        var response = JSON.parse(this.responseText);
        nextPageToken = response.nextPageToken;
        appendItems(response);
        // return this.responseText;
    }

    xhr.onerror = function() {
        alert('ошибка ' + this.status);
        return 0;
    }
}

function appendItems(response) {
    for (var i = 0; i < 15; i++) {
        let elem = document.createElement('div'); // element block creation
        elem.className = "resultElem";

        let link = document.createElement('a'); // youtube link creation
        link.className = "link";
        link.href = "https://youtube.com/watch?v=" + response.items[i].id.videoId;
        link.target = "_blank";

        let title = document.createElement('h4'); // video title creation
        title.className = "title";
        title.innerHTML = response.items[i].snippet.title;

        let thumbnail = document.createElement('img'); // thumbnail creation
        thumbnail.className = "thumbnail";
        thumbnail.src = response.items[i].snippet.thumbnails.medium.url;
        thumbnail.alt = "Prewiew";

        let linkBlock = document.createElement('div'); // link Block creation
        linkBlock.className = "linkBlock";

        let description = document.createElement('div'); // description and date creation
        var date = new Date(response.items[i].snippet.publishedAt);
        var options = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric'
        }
        description.className = "description";
        description.innerHTML = response.items[i].snippet.description + '<br><br>' + '<b>опубликовано:</b> ' + date.toLocaleString("ru", options);

        linkBlock.appendChild(thumbnail);
        linkBlock.appendChild(title);
        link.appendChild(linkBlock);

        elem.appendChild(link);
        elem.appendChild(description);
        list.appendChild(elem);
        itemsCount++;
    }
}
