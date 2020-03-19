require("dotenv").config();
var Spotify = require("node-spotify-api");
var keys = require("./keys.js");
var axios = require("axios");
var moment = require("moment");
var fs = require("fs");
var spotify = new Spotify(keys.spotify);


var concertSearch = function(artist) {
  var queryURL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";

  axios.get(queryURL).then(
    function(response) {
      var axiosInfo = response.data;

      console.log("Upcoming concerts for " + artist + ":");

      for (var i = 0; i < axiosInfo.length; i++) {
        var show = axiosInfo[i];

        console.log(
          show.venue.name + " in " + show.venue.city + ", " + (show.venue.country) + " on " + moment(show.datetime).format("MM/DD/YYYY")
        );
      }
    }
  );
};


var spotifySearch = function(songName) {
    if (songName === undefined) {
      songName = "The Sign";
    }
  
    spotify.search(
      {
        type: "track",
        query: songName
      },
      function(err, data) {
        if (err) {
          console.log("Error occurred: " + err);
          return;
        }
  
        var songList = data.tracks.items;
  
        for (var i = 0; i < songList.length; i++) {
          console.log(i);
          console.log("artist(s): " + songList[i].artists);
          console.log("song name: " + songList[i].name);
          console.log("preview song: " + songList[i].preview_url);
          console.log("album: " + songList[i].album.name);
          console.log("-------");
        }
      }
    );
  };

  var movieSearch = function(movieName) {
    if (movieName === undefined) {
      movieName = "Mr Nobody";
    }
  
    var queryURL = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=full&tomatoes=true&apikey=trilogy";
  
    axios.get(queryURL).then(
      function(response) {
        var axiosData = response.data;
  
        console.log("Title: " + axiosData.Title);
        console.log("Year: " + axiosData.Year);
        console.log("IMDB Rating: " + axiosData.imdbRating);
        console.log("Rotten Tomatoes Rating: " + axiosData.Ratings[1].Value);
        console.log("Country: " + axiosData.Country);
        console.log("Language: " + axiosData.Language);
        console.log("Plot: " + axiosData.Plot);
        console.log("Actors: " + axiosData.Actors);
        
      }
    );
  };


  var justDoIt = function() {
    fs.readFile("random.txt", "utf8", function(error, data) {
      console.log(data);
  
      var dataArr = data.split(",");

    if (dataArr.length === 2) {
      functionChooser(dataArr[0], dataArr[1]);
    } else if (dataArr.length === 1) {
      functionChooser(dataArr[0]);
    }
  });
};


var functionChooser = function(commandType, functionSearch) {
  switch (commandType) {
  case "concert-this":
    concertSearch(functionSearch);
    break;
  case "spotify-this-song":
    spotifySearch(functionSearch);
    break;
  case "movie-this":
    movieSearch(functionSearch);
    break;
  case "do-what-it-says":
    justDoIt();
    break;
  default:
    console.log("Uh oh try again with one of these commands concert-this, spotify-this-song, movie-this. do-what-it-says");
  }
};


var liriStart = function(liriCommand, userSearch) {
  functionChooser(liriCommand, userSearch);
};

liriStart(process.argv[2], process.argv.slice(3).join(" "));