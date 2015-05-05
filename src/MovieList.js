var LoadingView = require("./utils/LoadingView");
var MovieListRow = require("./MovieListRow");
var MovieStore = require("./MovieStore");
var React = require("react-native");
var RefreshableListView = require("./utils/RefreshableListView");
var ViewFooter = require("./utils/ViewFooter");

var globalStyles = require("./Styles");
var { movieSelected, reloadMovies } = require("./Actions");
var { Component, ListView, Text, View } = React;

class MovieList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            dataSource: new ListView.DataSource({
                rowHasChanged: (r1, r2) => r1.id !== r2.id
            }),
            loading: true
        };
    }

    _storeChanged(data) {
      var movies = data.get("favoriteMovies");
      var dataSource = this.state.dataSource.cloneWithRows(movies);

      this.setState({
        dataSource: dataSource, 
        loading: false
      });
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

      var movies = this.state.dataSource;
      var movieCount = movies.getRowCount();

      return (
        <View style={globalStyles.container}>
          <RefreshableListView 
            dataSource={movies}
            onRefresh={reloadMovies}
            renderRow={(movie) => <MovieListRow movie={movie} /> } />
          <ViewFooter>
            <Text>{movieCount} movies</Text>
          </ViewFooter>
        </View>
      );
    }
}

module.exports = MovieList;