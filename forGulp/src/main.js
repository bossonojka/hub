var array = ['Chris', 'Bob', 'Mark', 'Paul'];

// Arrow function syntax
array.forEach((e, i, a) => {
   var elem = document.createElement('p');
   elem.textContent = (i + 1) + '. ' + e;
   document.body.appendChild(elem);
});

fetch('style.css').then(response => {
    return response.text().then((text) => {
        let para = document.createElement("p");
        para.textContent = text;
        document.body.appendChild(para);
    })
});