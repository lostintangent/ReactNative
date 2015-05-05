var React = require("react-native");
var { movieSelected } = require("../Actions");

var {
    Component,
    Image,
    StyleSheet,
    Text,
    TouchableHighlight,
    View
} = React;

class MovieListRow extends Component {
    render() {
        var movie = this.props.movie;
        var ratingColor = (rating) => rating >= 7 ? "green" : "red"; 

        return (
            <TouchableHighlight
                onPress={() => movieSelected(movie)}
                underlayColor="#ddd">
                <View style={styles.container}>
                    <Image
                        source={{ uri: `http://image.tmdb.org/t/p/w500${movie.poster_path}` }}
                        style={styles.posterThumbnail} />
                    <View style={styles.contentContainer}>
                        <Text style={styles.title}>
                            {movie.title}
                        </Text>
                        <Text style={styles.releaseDate}>
                            ({movie.release_date})
                        </Text>
                        <Text style={[styles.rating, {color: ratingColor(movie.vote_average)}]}>
                            {movie.vote_average}/10
                        </Text>
                    </View>
                </View>
            </TouchableHighlight>
        );
    }
};

var styles = StyleSheet.create({
    container: {
        borderBottomColor: "#ddd",
        borderBottomWidth: 1,
        flexDirection: "row",
        padding: 10
    },
    contentContainer: {
        flex: 1
    },
    posterThumbnail: {
        borderRadius: 8,
        height: 80,
        marginRight: 10,
        width: 80
    },
    rating: {
        fontSize: 20,
        fontWeight: "bold",
        marginTop: 5
    },
    releaseDate: {
        color: "#656565",
        fontSize: 12,
        fontStyle: "italic",
        marginTop: 3
    },
    title: {
        color: "black",
        fontSize: 20,
        fontWeight: "bold"
    }
});

module.exports = MovieListRow;