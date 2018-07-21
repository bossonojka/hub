var form = document.createElement("form");
var input = document.createElement("input");
var output = document.createElement("p");
var array;

output.style.display = "block";
input.placeholder = "Input numbers in spaces";

document.body.appendChild(form);
form.appendChild(input);

input.oninput = function(){
    form.appendChild(output);
    let str = input.value;

    array = str.split(' ');

    for(var i = 0; i < array.length; i++){
        array[i] = parseInt(array[i]);
        if(isNaN(array[i])){
            array[i] = "";
        }
    }
    output.textContent = Sort(array);
}

function Sort(array){
    for(var i = 0; i < array.length; i++){
        for(var j = i + 1; j < array.length; j++){
            if (array[i] < array[j]){
                let temp = array[j];
                array[j] = array[i];
                array[i] = temp;
            }
        }
    }
    return array.join(" ");
}