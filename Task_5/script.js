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
}


function doRequest(request) {
    var xhr = new XMLHttpRequest();

    if (nextPageToken === 0) {
        var params = 'part=' + 'snippet' +
            '&key=' + "AIzaSyAqDkjeDHD6SK9PN-eun3NZR0Fzws8qgAQ" +
            '&maxResults=' + 15 +
            '&q=' + request +
            '&type=' + 'video';
    } else {
        var params = 'part=' + 'snippet' +
            '&key=' + "AIzaSyAqDkjeDHD6SK9PN-eun3NZR0Fzws8qgAQ" +
            '&maxResults=' + 15 +
            '&q=' + request +
            '&type=' + 'video' +
            '&pageToken=' + nextPageToken;
    }

    xhr.open('GET', 'https://www.googleapis.com/youtube/v3/search?' + params, true);

    xhr.onload = function() {
        if (nextPageToken === 0) {
            createList(this.responseText);
        } else {
            var response = JSON.parse(this.responseText);
            nextPageToken = response.nextPageToken;
            appendItems(response);
        }
    }

    xhr.onerror = function() {
        alert('ошибка ' + this.status);
        return 0;
    }

    xhr.send();
}


function createList(serverResponse) {
    if (document.body.contains(document.getElementsByClassName('wrap')[0])) {
        document.body.removeChild(document.getElementsByClassName('wrap')[0]);
    }

    var response = JSON.parse(serverResponse);
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
        scrollLeft(list);
    };
    rightButton.onclick = function() {
        scrollRight(list);
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


function resize(wrap, leftButton, rightButton) {
    wrap.style.width = document.documentElement.clientWidth + 'px';
    let elementWidth = document.getElementsByClassName('resultElem')[0].offsetWidth + 10;
    let countVisibleElements = Math.floor((wrap.clientWidth - leftButton.offsetWidth - rightButton.offsetWidth) / elementWidth);
    console.log(countVisibleElements);
    let wrapWidth = countVisibleElements * elementWidth + leftButton.offsetWidth + rightButton.offsetWidth;
    wrap.style.width = wrapWidth + 'px';
}


// добавляем видео в результаты поиска
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

        let channel = document.createElement('p'); // cahnnel title creation
        channel.innerHTML = 'Channel: <b>' + '<a href="https://www.youtube.com/channel/' + response.items[i].snippet.channelId + '" target=_blank>' + response.items[i].snippet.channelTitle + '</a></b><br><br>';

        let description = document.createElement('div'); // description and date creation
        var date = new Date(response.items[i].snippet.publishedAt);
        description.className = "description";
        description.innerHTML = response.items[i].snippet.description + '<br><br>' + '<b>опубликовано:</b> ' + date.toLocaleString("ru", {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        }) + '<br><br>';

        getStatistics(response.items[i].id.videoId, elem);

        linkBlock.appendChild(thumbnail);
        linkBlock.appendChild(title);
        link.appendChild(linkBlock);

        elem.appendChild(link);
        elem.appendChild(channel);
        elem.appendChild(description);

        list.appendChild(elem);
        itemsCount++;
    }
}


// получение количества просмотров и лайков
function getStatistics(videoId, elem) {
    var xhr = new XMLHttpRequest();

    var params = 'part=' + 'statistics' +
        '&key=' + "AIzaSyAqDkjeDHD6SK9PN-eun3NZR0Fzws8qgAQ" +
        '&id=' + videoId;

    xhr.open('GET', 'https://www.googleapis.com/youtube/v3/videos?' + params, true);

    xhr.onload = function() {
        var response = JSON.parse(this.responseText);
        let statistics = document.createElement('div');
        statistics.className = "statistics";
        let watchesIcon = document.createElement('i');
        watchesIcon.className = "fa fa-eye";
        let likeIcon = document.createElement('i');
        likeIcon.className = "fa fa-thumbs-up";
        let dislikeIcon = document.createElement('i');
        dislikeIcon.className = "fa fa-thumbs-down";
        statistics.appendChild(watchesIcon);
        var formatter = new Intl.NumberFormat("ru");
        statistics.innerHTML += ' : <b>' + formatter.format(response.items[0].statistics.viewCount) + '</b><br>';
        statistics.appendChild(likeIcon);
        statistics.innerHTML += formatter.format(response.items[0].statistics.likeCount) + ' ';
        statistics.appendChild(dislikeIcon);
        statistics.innerHTML += formatter.format(response.items[0].statistics.dislikeCount);
        elem.appendChild(statistics);
    }

    xhr.onerror = function() {
        alert('ошибка ' + this.status);
        return 0;
    }

    xhr.send();
}
