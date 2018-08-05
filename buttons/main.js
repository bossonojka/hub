var btn = document.querySelector("#btn");
btn.onkeydown = function(e){
    if(e.keyCode === 13){
        e.target.click();
    }
};

btn.onclick = function(e){
    console.log(e.target);
}