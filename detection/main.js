function checkFeature(callback){
    var feature = prompt('What feature would you like to check?');
    callback(feature in window || feature in document.createElement('html').style || feature in document.createElement('canvas'));
}

checkFeature(function(result){
    console.log(result);
});