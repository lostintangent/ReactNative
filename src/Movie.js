var BackgroundImageView = require("./utils/BackgroundImageView");
var LoadingView = require("./utils/LoadingView");
var MovieAttribute = require("./MovieAttribute");
var MovieSectionList = require("./MovieSectionList");
var MovieStore = require("./MovieStore");
var React = require("react-native");
var ViewFooter = require("./utils/ViewFooter");
var { unfavoriteMovie } = require("./Actions");

var {
    ActivityIndicatorIOS,
    AlertIOS,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableHighlight,
    View
} = React;

class Movie extends React.Component {
    constructor() {
        super();

        this.state = {
            loading: true,
            movie: null
        }
    }

    _storeChanged(data) {
        var movie = data.get("selectedMovie");

        this.setState({
            loading: false,
            movie: movie
        });
    }

    _unfavoriteMovie() {
        AlertIOS.alert("Unfavorite confirmation", "Is the <3 truly gone?", [
            { text: "Never!" },
            { text: "Yes :(", onPress: () => {
                unfavoriteMovie(this.state.movie);
            }}
        ]);
    }

    componentDidMount() {
        this.unsubscribe = MovieStore.listen(this._storeChanged.bind(this));
    }

    componentWillUnmount() {
      this.unsubscribe();
    }

    render() {
        if (this.state.loading) {
            return <LoadingView />;
        }

        var movie = this.state.movie;
        var posterUri = `http://image.tmdb.org/t/p/original${movie.backdrop_path}`;

        var genres = movie.genres
                     .map(g => g.name)
                     .reduce((prev, cur) => `${prev}, ${cur}`);

        var formatCurrency = (str) => "$" + str.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');

        return (
            <BackgroundImageView uri={posterUri}>
                <ScrollView bounces={false} style={styles.content}>
                    <Text>{movie.overview}</Text>
                    <MovieAttribute
                        name="Genres"
                        value={genres} />
                    <MovieAttribute
                        name="Production budget"
                        value={formatCurrency(movie.budget)} />
                    <MovieAttribute
                        name="Box office revenue"
                        value={formatCurrency(movie.revenue)} />
                    <MovieAttribute
                        name="Runtime"
                        value={`${movie.runtime} minutes`} />
                    <MovieSectionList
                        dataSource={movie.cast}
                        heading="Cast (order of appearance)"
                        itemCount={5} />
                    <MovieSectionList
                        dataSource={movie.crew}
                        heading="Crew"
                        itemCount={3} />
                </ScrollView>
                <ViewFooter>
                    <TouchableHighlight onPress={this._unfavoriteMovie.bind(this)}>
                        <Text>Unfavorite</Text>
                    </TouchableHighlight>
                </ViewFooter>
            </BackgroundImageView>
        );
    }
}

var styles = StyleSheet.create({
    content: {
        flex: 1,
        padding: 10
    },
    posterThumbnail: {
        borderRadius: 8,
        height: 50,
        marginRight: 10,
        width: 50
    }
});

module.exports = Movie;