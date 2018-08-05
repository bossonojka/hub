var input = document.querySelector("#yourText");
var btn = document.querySelector("#yourBtn");
var form = document.querySelector("form");
var ol = document.querySelector("ol");

btn.addEventListener("click", function(){
    let value = input.value;
    let para = document.createElement("p");
    let deleteBtn = document.createElement("button");
    let li = document.createElement("li");

    para.textContent = value;
    deleteBtn.textContent = "Delete";
    para.style.display = "inline";
    para.style.marginRight = 20 + "px";

    deleteBtn.onclick = function(e){
        e.target.parentElement.remove();
    }

    li.appendChild(para);
    li.appendChild(deleteBtn);
    ol.appendChild(li);
});
