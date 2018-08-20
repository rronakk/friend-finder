var path = require('path');
var friendsData = require("../data/friends");

// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function(app){


	app.get('/api/friends', function(req, res){
		res.json(friendsData);
	});


	app.post('/api/friends', function(req, res){

		// Note the code here. Our "server" will respond to requests and let users know if they have a table or not.
		// It will do this by sending out the value "true" have a table
			// console.log(friendsData);
			// res.json(req.body); // KEY LINE

			var newAns = req.body.scores;
			console.log('newAns: ', newAns);
;

			function calcScore(inputProfile, allProfiles){
				var check = inputProfile.map(function(item, index){
					return Math.abs(allProfiles[index] - item)		
				});
				const reducer = (accumulator, currentValue) => accumulator + currentValue;
				return check.reduce(reducer);
			}

			console.log("----------------------");
			var scorecard = [];
			for (var eachScore in friendsData){
				scorecard.push(calcScore(newAns,friendsData[eachScore].scores));
			}
			console.log("Scorecard" , scorecard);
			console.log(scorecard.indexOf(Math.min(...scorecard)));
			var matchingProfileIndex = scorecard.indexOf(Math.min(...scorecard));
			friendsData.push(req.body);
			console.log()
        	res.json(friendsData[matchingProfileIndex]);
    });


	app.post('/api/clear', function(req, res){
		// Empty out the arrays of data
		tableData = [];
		waitListData = [];

		console.log(tableData);
	})
};