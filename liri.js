var keys = require('./keys.js');
var Twitter = require('twitter');
var tweetMe = function(){

	var client = new Twitter(keys.twitterKeys);
	var params = {screen_name: 'Rusty Shackleford'};
	client.get('statuses/user_timeline', params, function(error, tweets, response) {
		if (!error) {

			for(var i=0; i<tweets.length; i++) {
				console.log(tweets[i].created_at);
				console.log(' ');
				console.log(tweets[i].text);
			}
		}
	});
}

var pick = function(caseData, functionData) {
	switch(caseData) {
		case 'my-tweets' :
		tweetMe();
		break;
		default:
		console.log("I don't understand that!");
	}
}
var runThis = function(argOne, argTwo) {
	pick(argOne, argTwo);
};

runThis(process.argv[2], process.argv[3]);