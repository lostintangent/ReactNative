var React = require("react-native");
var { ActivityIndicatorIOS, ListView, StyleSheet, View } = React;

var STARTING_SCROLL_POSITION= -65;
var SCROLL_REFRESH_THRESHOLD = -140;

class RefreshableListView extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      dataReceived: true,
      showLoading: false
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ dataReceived: true });
  }

  handleScroll(e) {
    var yPosition = e.nativeEvent.contentOffset.y;

    if (yPosition <= SCROLL_REFRESH_THRESHOLD && !this.state.showLoading) {
      this.props.onRefresh && this.props.onRefresh();
      this.setState({ dataReceived: false, showLoading: true });
      return;
    }

    if (yPosition >= STARTING_SCROLL_POSITION && this.state.showLoading && this.state.dataReceived) {
      this.setState({ showLoading: false })
    }
  }

  renderHeader() {
    var spinner = null;

    if (this.state.showLoading) {
      spinner = <ActivityIndicatorIOS color="blue" />;
    }

    return <View style={styles.header}>{spinner}</View>;
  }

  render() {
    return (
        <ListView 
          dataSource={this.props.dataSource}
          onScroll={this.handleScroll.bind(this)}
          renderHeader={this.renderHeader.bind(this)}
          renderRow={this.props.renderRow}
          style={[styles.listView, this.props.style]} />
    );
  }
}

var HEADER_HEIGHT = 20;

var styles = StyleSheet.create({
  listView: {
    flex: 1,
    marginTop: -HEADER_HEIGHT
  },
  header: {
    alignItems: "center",
    flex: 1,
    height: HEADER_HEIGHT,
    justifyContent: "center"
  }
});

module.exports = RefreshableListView;