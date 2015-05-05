var { reloadMovies, movieSelected, unfavoriteMovie } = require("./Actions");
var Immutable = require("immutable");
var Reflux = require("reflux");

var apiKey = "12597eed88c253c3e73b378f44aa0d56";
var baseUri = "https://api.themoviedb.org/3";

var sessionId;

var MovieStore = Reflux.createStore({
    currentState: Immutable.fromJS({
        favoriteMovies: [],
        selectedMovie: null,
        user: {
            accessToken: null,
            sessionId: null
        },
    }),

    init: function() {
        this.listenTo(reloadMovies, () => this.reloadFavoriteMovies());
        this.listenTo(movieSelected, (movie) => {
            Promise.all([
                retreiveMovie(movie.id),
                retreiveCast(movie.id),
                retreiveSimilar(movie.id)
            ])
            .then(([m, cast, similar]) => {
                m.cast = cast.cast;
                m.crew = cast.crew;
                m.similar = similar.results;

                this.currentState = this.currentState.set("selectedMovie", m);
                this.trigger(this.currentState);
            });
        });

        this.listenTo(unfavoriteMovie, (movie) => {
            _unfavoriteMovie(movie.id)
            .then(f => {
                this.currentState = this.currentState.set("selectedMovie", null);
                this.reloadFavoriteMovies();
            })
        });

        retreiveAccessToken()
            .then(authenticateUser)
            .then(retreiveSessionId)
            .then((sessionId) => {
                this.reloadFavoriteMovies = this.reloadFavoriteMovies.bind(this, sessionId);
                this.reloadFavoriteMovies();
            });
    },

    reloadFavoriteMovies: function (sessionId) {
        retreiveFavoriteMovies(sessionId)
            .then(m => {
                this.currentState = this.currentState.set("favoriteMovies", m.sort((a, b) => a.title.localeCompare(b.title)));
                this.trigger(this.currentState);
            });
    }
});

function fetchJson(uri, propertyName) {
    var promise = fetch(`${baseUri}/${uri}`)
           .then(r => r.json());

           if (propertyName) {
           promise = promise.then(r => r[propertyName]);
       }

       return promise;
}

function retreiveAccessToken() {
    return fetchJson(`authentication/token/new?api_key=${apiKey}`, "request_token");
}

function authenticateUser(token) {
    return fetchJson(`authentication/token/validate_with_login?api_key=${apiKey}&request_token=${token}&username=lostintangent&password=6parts7!`, "request_token");
}

function retreiveSessionId(token) {
    return fetchJson(`authentication/session/new?api_key=${apiKey}&request_token=${token}`, "session_id");
}

function retreiveFavoriteMovies(_sessionId) {
    sessionId = _sessionId;
    return fetchJson(`account/lostintangent/favorite/movies?api_key=${apiKey}&session_id=${sessionId}`, "results");
}

function _unfavoriteMovie(movieId) {
    var body = {
        media_type: "movie",
        media_id: movieId,
        favorite: false
    };

    return fetch(`${baseUri}/account/lostintangent/favorite?api_key=${apiKey}&session_id=${sessionId}`, { method: "post", body: JSON.stringify(body), headers:{
        "Content-Type":"application/json"
    } });

}

function retreiveMovie(id) {
    return fetchJson(`movie/${id}?api_key=${apiKey}`);
}

function retreiveCast(id) {
    return fetchJson(`movie/${id}/credits?api_key=${apiKey}`);
}

function retreiveSimilar(id) {
    return fetchJson(`movie/${id}/similar?api_key=${apiKey}`);
}

module.exports = MovieStore;