var request = require('request');

var bsUser = "vladimir781";
var bsKey = "8sGpQBzMe4agh6Z1yAXc";
var baseUrl = "https://" + bsUser + ":" + bsKey + "@www.browserstack.com/automate/";

function getPlanDetails(){
    request({uri: baseUrl + "plan.json"}, function(err, res, body){
        console.log(JSON.parse(body));
    });
}

function getBuilds(){
    request({uri: baseUrl + "builds.json"}, function(err, res, body){
        console.log(JSON.parse(body));
    });
}

function getSessionsInBuild(build){
	var buildId = build.automation_build.hashed_id;
	request({uri: baseUrl + "builds/" + buildId + "/sessions.json"}, function(err, res, body){
		console.log(JSON.parse(body));
    });
}
    
function getSessionDetails(session){
    var sessionId = session.automation_session.hashed_id;
    request({uri: baseUrl + "sessions/" + sessionId + ".json"}, function(err, res, body){
        console.log(JSON.parse(body));
    });
}

getPlanDetails();