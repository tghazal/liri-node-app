require("dotenv").config();
var request = require("request");
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var fs = require("fs");
var keys=require("./keys");







//if the user input my-tweets 
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
    count: 20,
    result_type: 'recent',
    lang: 'en'
  }

client.get('statuses/user_timeline', params, function(error, tweets, response) {
  if (!error) {
    for(var i=0;i<20;i++){
    console.log("Tweet Number "+(i+1) +" is: " )
    console.log("TWEET -- "+ tweets[i].text);
    console.log("DATE -- "+ tweets[i].created_at);
    console.log(".............................")
  }

  }
});

}


if(process.argv[2]==="spotify-this-song")
{
 
  var  song = process.argv.slice(3).join(" ");

if (!song)
{
  song="The sign";
}
console.log(song)

  var spotify = new Spotify({
    id: keys.spotify.id,
    secret: keys.spotify.secret
  });
   
  spotify.search({ type: 'track', query: song }, function(err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }
   
 console.log("\nArtist: "+ data.tracks.items[0].artists[0].name +"\n"); 
 console.log("Url: "+ data.tracks.items[0].external_urls.spotify+"\n")
 console.log("Song Name: "+data.tracks.items[0].name+"\n")
 console.log("Album: "+data.tracks.items[0].album.name+"\n")

  });



}

if(process.argv[2]==="movie-this")
{

 var  movieName = process.argv.slice(3).join(" ");

if (!movieName)
{
   movieName="Mr. Nobody";
}


request("http://www.omdbapi.com/?t="+movieName+"&y=&plot=short&apikey=trilogy", function(error, response, body) {

  // If the request is successful (i.e. if the response status code is 200)
  if (!error && response.statusCode === 200) {

    // Parse the body of the site and recover he data 
   
    console.log("\nTITLE : " + JSON.parse(body).Title+"\n");
    console.log("YEAR : " + JSON.parse(body).Year+"\n");
     console.log("RATING : " + JSON.parse(body).imdbRating+"\n");
     //serach for rotten tomatoes rating source throgh rating array 
     for(var i =0;i<JSON.parse(body).Ratings.length;i++)
     {
       if( JSON.parse(body).Ratings[i].Source==="Rotten Tomatoes")
       {
        console.log("Rotten Tomatoes RATING is: " + JSON.parse(body).Ratings[i].Value+"\n");
       }
     }
     
     console.log("COUNTRY :  " + JSON.parse(body).Country+"\n");
     console.log("LANGUAGE : " + JSON.parse(body).Language+"\n");
     console.log("PLOT : " + JSON.parse(body).Plot+"\n");
     console.log("ACTOR :  " + JSON.parse(body).Actors+"\n");
     
  }
  else console.log("error")
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
     var command=dataArr[0];
    // We will then re-display the content as an array for later use.
   
   
    var songs = data.split('"');
    
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
   
    });
  
  
  });
  

}