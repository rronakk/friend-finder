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
			res.json(req.body); // KEY LINE

			var newAns = req.body.scores;
			console.log('newAns: ', newAns);
			var newArray = [ 5, 1, 4, 4, 5, 1, 2, 5, 4, 1 ];
			console.log(calcScore(newAns, newArray));
			// var check = newAns.map(function(item, index){
			// 	return Math.abs(newArray[index] - item)		
			// })

			// console.log('check: ', check);
			// const reducer = (accumulator, currentValue) => accumulator + currentValue;
			// check.reduce(reducer);
			// console.log(check.reduce(reducer));
			// calcScore(newAns, newArray);

			function calcScore(inputProfile, allProfiles){
				var check = inputProfile.map(function(item, index){
					return Math.abs(allProfiles[index] - item)		
				})

				// console.log('check: ', check);
				const reducer = (accumulator, currentValue) => accumulator + currentValue;
				console.log(check.reduce(reducer));
				return check.reduce(reducer);
			}

			console.log("----------------------");
			function getMatchingProfile(){
				var maxScore = 0;
				var matchingProfile;
				for (var eachScore in friendsData){
					if (calcScore(newAns,friendsData[eachScore].scores) > maxScore){
						maxScore = calcScore(newAns,friendsData[eachScore].scores)
						matchingProfile = friendsData[eachScore]
					}
				}
				// console.log(maxScore);
				return matchingProfile;
			};
			console.log(getMatchingProfile());
			friendsData.push(req.body);


	});


	app.post('/api/clear', function(req, res){
		// Empty out the arrays of data
		tableData = [];
		waitListData = [];

		console.log(tableData);
	})
}