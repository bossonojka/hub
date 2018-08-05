var SauceLabs = require("saucelabs");

var account = new SauceLabs({
    username: 'bossonojka',
    password: '0eb8ff1f-2dd2-4ddc-9459-ad32cbb707dd'
});

account.getAccountDetails(function(err, res){
    console.log("1: " + res);
    account.getServiceStatus(function(err, res){
        console.log("2: " + res);
        account.getJobs(function(err, jobs){
            console.log("3: " + jobs);
            for (var k in jobs){
                if (jobs.hasOwnProperty(k)){
                    account.showJob(jobs[k].id, function(err, res){
                        var str = res.id + ": Status: " + res.status;
                        if (res.error){
                            str += "\033[31m Error: " + res.error + " \033[0m";
                        }
                        console.log("4: " + str); 
                    });
                }
               
            }
        })
    });
})