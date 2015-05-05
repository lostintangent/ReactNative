var Reflux = require("reflux");

var Actions = Reflux.createActions([
    "movieSelected",
    "movieUnfavorited",
    "reloadMovies",
    "unfavoriteMovie"
]);

module.exports = Actions;