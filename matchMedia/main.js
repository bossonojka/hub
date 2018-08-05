var mq = matchMedia('(min-width:400px)');

mq.addListener(function(){
    if(mq.matches){
        console.log("Width more then 400px");
    } else {
        console.log("Width less then 400px");
    }
});