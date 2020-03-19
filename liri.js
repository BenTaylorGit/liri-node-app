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


if (process.argv[2] == "concert-this"){
concertForBand("circa survive");
}