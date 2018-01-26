var keys = require('./keys.js');
var Twitter = require('twitter');
var spotify = require('node-spotify-api');
var request = require('request');
var fs = require('fs');

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
var spotify = new spotify({
	id: "edcde29d61ef43daba71d498fdd034d4",
	secret: "0b861981342e4d058c40f815b743851b"
});

var getArtist = function(artist) {
	return artist.name;
}
var getSpotify = function(songName) {
	if (songName === undefined) {
		songName = "Walk the Line";
	}
	spotify.search(
	{
		type: "track",
		query:songName
	},
	function(err, data) {
		if (err) {
			console.log("Error:" + err);
			return;
		}
	
		var songs = data.tracks.items;
		for(var i=0; i<songs.length; i++) {
			console.log(i);
			console.log('artist: ' + songs[i].artists.map(
				getArtist));
			console.log('song name: ' + songs[i].name);
			console.log('preview song: ' + songs[i].preview_url); 
			console.log('album: ' + songs[i].album.name);
			console.log('-------------------------------------');
		}
	}
	);
};

var getMovie = function(movieName) {

var movieUrl = 'http://www.omdbapi.com/?t=' + movieName + '&y=&plot=short&r=json&apikey=e113db9e';
request(movieUrl, function(error, response, body) {
	if (!error && response.statusCode === 200) {
			
			var jsonData = JSON.parse(body);

			console.log('Title:' + jsonData.Title);
			console.log('Year:' + jsonData.Year);
			console.log('Rated:' + jsonData.Rated);
			console.log('IMDB Rating:' + jsonData.imdbRating);
			console.log('Country:' + jsonData.Country);
			console.log('Language:' + jsonData.Language);
			console.log('Plot:' + jsonData.Plot);
			console.log('Actors:' + jsonData.Actors);
		
		}
	});
}

var doWhatItSays = function() {
fs.readFile('random.txt', 'utf8', function (err, data) {
	console.log(data);
 var dataArr = data.split(',');
 if (dataArr.length == 2) {
 	pick(dataArr[0], dataArr[1]);
 } else if (dataArr.length ==1) {
 	pick(dataArr[0]);
 }
}); 
}
var pick = function(caseData, functionData) {
	switch(caseData) {
		case 'my-tweets' :
		tweetMe();
		break;
		case 'spotify-this-song' :
		getSpotify(functionData);
		break;
		case 'movie-this' : 
		getMovie(functionData);
		break;
		case 'do-what-it-says' :
		doWhatItSays();
		break;
		default:
		console.log("I don't understand that!");
	}
}
var runThis = function(argOne, argTwo) {
	pick(argOne, argTwo);
};

runThis(process.argv[2], process.argv[3]);