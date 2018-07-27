var request = require('request');

var bsUser = "vladimir781";
var bsKey = "8sGpQBzMe4agh6Z1yAXc";
var baseUrl = "https://" + bsUser + ":" + bsKey + "@www.browserstack.com/automate/";

function getPlanDetails(){
    request({uri: baseUrl + "plan.json"}, function(err, res, body){
        console.log(JSON.parse(body));
    });
}

getPlanDetails();