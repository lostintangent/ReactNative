var React = require("react-native");
var { Component, StyleSheet, View } = React;

class ViewFooter extends Component {
    render() {
        return (
            <View style={styles.footer}>
                {this.props.children}
            </View>
        );
    }
}

var styles = StyleSheet.create({
    footer: {
        alignItems: "center",
        backgroundColor: "#eee",
        borderTopWidth: 1,
        borderTopColor: "#ddd",
        height: 40,
        justifyContent: "center"
    }
});

module.exports = ViewFooter;