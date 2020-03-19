require("dotenv").config();
var Spotify = require("node-spotify-api");
var keys = require("./keys.js");
var axios = require("axios");
var moment = require("moment");
var fs = require("fs");
var spotify = new Spotify(keys.spotify);


var concertForBand = function(artist) {
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

if (process.argv[2] == "concert-this"){
concertForBand("circa survive");
} else if (process.argv[2] == "spotify-this-song"){
spotifySearch("Everyway")
}