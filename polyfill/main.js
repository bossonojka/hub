if (checkBrowser()){
    main();
} else {
    loadPolyfill("es6-promise.js");
    loadPolyfill("fetch.js");
}

function loadPolyfill(src){
    var script = document.createElement("script");

    script.src = src;

    script.onload = function(){
        main();
    }

    script.onerror = function(){
        return new Error("Failed to load script " + src);
    }

    document.head.appendChild(script);
}

function checkBrowser(){
    return window.fetch && window.Promise;
}

function main(){
    var myImage = document.querySelector(".my-image");

    fetch("flowers.jpg").then(function(response){
        return response.blob();
    }).then(function(blob){
        var url = URL.createObjectURL(blob);
        myImage.src = url;
    });
}