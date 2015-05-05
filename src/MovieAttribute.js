var React = require("react-native");
var { Component, StyleSheet, Text, View } = React;

class MovieAttribute extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.label}>{this.props.name}:</Text>
                <Text>{this.props.value}</Text>
            </View>
        );
    }
}

var styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        marginTop: 10
    },
    label: {
        fontWeight: "bold",
        marginRight: 5
    }
});

module.exports = MovieAttribute;