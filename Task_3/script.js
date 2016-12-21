var content = ' <b> ||||Added text, wow! </b> ';
var clName = 'bigFont';
var attrName = 'title';
var value = 'changed attribute';
var styleName = 'background-color';
var styleValue = 'green';




function zzAppend(content) {
    $('.start').myAppend(content);
}

function zzAddClass(clName) {
    $('.start').myAddClass(clName);
}

function zzHtml(content) {
    $('.start').myHtml(content);
}

function zzAttr(attrName, value) {
    $('.start').myAttr(attrName, value);
}

function zzChildren() {
    $('DIV').myChildren();
}

function zzCss(styleName, styleValue) {
    $('DIV').myCss(styleName, styleValue);
}

function zzAddAndBigFont(content, clName) {
    $('.start').myHtml(content).myAddClass(clName);
}
