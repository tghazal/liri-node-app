require("dotenv").config();
var request = require("request");
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var fs = require("fs");
var keys=require("./keys");



if(process.argv[2]==="my-tweets")
{
  var client = new Twitter({
    consumer_key: keys.twitter.consumer_key,
    consumer_secret: keys.twitter.consumer_secret,
    access_token_key: keys.twitter.access_token_key,
    access_token_secret: keys.twitter.access_token_secret
  });
  var params = {
    q: 'from:name ',
    count: 5,
    result_type: 'recent',
    lang: 'en'
  }

client.get('statuses/user_timeline', params, function(error, tweets, response) {
  if (!error) {
    for(var i=0;i<5;i++){
    console.log(tweets[i].text);
    console.log(tweets[i].created_at);
  }

  }
});

}


if(process.argv[2]==="spotify-this-song")
{
var song=process.argv[3];
  var spotify = new Spotify({
    id: keys.spotify.id,
    secret: keys.spotify.secret
  });
   
  spotify.search({ type: 'track', query: song }, function(err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }
   
 console.log("artist: "+ data.tracks.items[0].artists[0].name); 
 console.log("url: "+ data.tracks.items[0].external_urls.spotify)
 console.log("song name: "+data.tracks.items[0].name)
 console.log("album: "+data.tracks.items[0].album.name)
 console.log(JSON.parse(data))
  });



}

if(process.argv[2]==="movie-this")
{
var movieName=process.argv[3];
request("http://www.omdbapi.com/?t="+movieName+"&y=&plot=short&apikey=trilogy", function(error, response, body) {

  // If the request is successful (i.e. if the response status code is 200)
  if (!error && response.statusCode === 200) {

    // Parse the body of the site and recover just the imdbRating
    // (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it).
   
    console.log("Title of the movie " + JSON.parse(body).Title);
    console.log("Title of the movie " + JSON.parse(body).Year);
     console.log("The movie's rating is: " + JSON.parse(body).imdbRating);
     console.log("The movie's rating is: " + JSON.parse(body).Ratings[1].Value);
     console.log("The Country: " + JSON.parse(body).Country);
     console.log("The Language: " + JSON.parse(body).Language);
     console.log("The Plot: " + JSON.parse(body).Plot);
     console.log("The Actors: " + JSON.parse(body).Actors);
     
     

     
   // console.log( JSON.parse(body))
  }
});


}


if(process.argv[2]==="do-what-it-says")
{

  fs.readFile("random.txt", "utf8", function(error, data) {

    // If the code experiences any errors it will log the error to the console.
    if (error) {
      return console.log(error);
    }
  
    // We will then print the contents of data
    console.log(data);
  
    // Then split it by commas (to make it more readable)
    var dataArr = data.split(",");
  
    // We will then re-display the content as an array for later use.
   
   
    var songs = data.split('"');
    console.log(songs[1]);
     var command=dataArr[0];
    var song=songs[1];
 console.log("command is = " +command);
 console.log("song is : "+ song)
    var spotify = new Spotify({
      id: keys.spotify.id,
      secret: keys.spotify.secret
    });
     
    spotify.search({ type: 'track', query: song }, function(err, data) {
      if (err) {
        return console.log('Error occurred: ' + err);
      }
     
   console.log("artist: "+ data.tracks.items[0].artists[0].name); 
   console.log("url: "+ data.tracks.items[0].external_urls.spotify)
   console.log("song name: "+data.tracks.items[0].name)
   console.log("album: "+data.tracks.items[0].album.name)
   console.log(JSON.parse(data))
    });
  
  
  });
  

}