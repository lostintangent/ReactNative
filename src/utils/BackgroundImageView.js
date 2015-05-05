var React = require("react-native");
var { Component, Image, StyleSheet, View } = React;

class BackgroundImageView extends Component {
    render() {
        return (
            <View style={[styles.container, this.props.style]}>
                <Image style={styles.backgroundImage} source={{ uri: this.props.uri }} />
                <View style={styles.contentContainer}>
                    {this.props.children}
                </View>
            </View>
        );
    }
}

var styles = StyleSheet.create({
     backgroundImage: {
        bottom: 0,
        left: 0,
        opacity: 0.2,
        position: "absolute",
        right: 0,
        top: 0
    },
    container: {
        flex: 1
    },
    contentContainer: {
        backgroundColor: "rgba(0,0,0,0)",
        flex: 1
    }
});

module.exports = BackgroundImageView;