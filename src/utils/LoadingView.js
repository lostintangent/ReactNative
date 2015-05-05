var React = require("react-native");
var { ActivityIndicatorIOS, Component, StyleSheet } = React;

class LoadingView extends Component {
    render() {
        return <ActivityIndicatorIOS
                color="blue" 
                size="large"
                style={styles.spinner} />;
    }
}

var styles = StyleSheet.create({
    spinner: {
        alignItems: "center",
        flex: 1,
        justifyContent: "center",
    }
});

module.exports = LoadingView;