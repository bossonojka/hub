var images = ["flowers.jpg","nothing.jpg"];
var loaded = [];
var notLoaded = [];

function loadImg(src){
    return new Promise(function(resolve, reject){
        let xhr = new XMLHttpRequest();
        xhr.open("GET", src);
        xhr.responseType = "blob";
        xhr.send();

        xhr.onload = function(){
            if (xhr.status == 200){
                resolve([xhr.response,src]);
            } else {
                reject(src);
            }
        };

        xhr.onerror = function(){
            reject(new Error("Network error"));
        };
    });
}

function showImg(){
    images.map(loadImg).map(function(element){
        element.then(function(array){
            let img = document.createElement("img");
            img.src = URL.createObjectURL(array[0]);
            img.width = 400;
            document.body.appendChild(img);
            loaded.push(array[1]);
        }, function(src){
            notLoaded.push(src);
        });
    });
}

showImg();