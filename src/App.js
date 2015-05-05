var Movie = require("./Movie/Movie");
var MovieList = require("./MovieList/MovieList");
var React = require("react-native");

var globalStyles = require("./Styles");
var { movieSelected, unfavoriteMovie } = require("./Actions");
var { AppRegistry, Component, NavigatorIOS } = React;

class App extends Component {
  componentDidMount() {
    movieSelected.listen((movie) => {
      this.navigator.push({
        component: Movie,
        title: movie.title
      });
    });

    unfavoriteMovie.listen(() => {
      this.navigator.pop();
    });
  }

  render() {
    var initialRoute = {
      component: MovieList,
      title: "Favorite movies"
    };

    return (
      <NavigatorIOS
        initialRoute={initialRoute}
        ref={(nav) => this.navigator = nav}
        style={globalStyles.container} />
    );
  }
}

AppRegistry.registerComponent("MovieApp", () => App);