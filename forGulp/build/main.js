'use strict';

var array = ['Chris', 'Bob', 'Mark', 'Paul'];

// Arrow function syntax
array.forEach(function (e, i, a) {
    var elem = document.createElement('p');
    elem.textContent = i + 1 + '. ' + e;
    document.body.appendChild(elem);
});

fetch('style.css').then(function (response) {
    return response.text().then(function (text) {
        var para = document.createElement("p");
        para.textContent = text;
        document.body.appendChild(para);
    });
});