var React = require("react-native");

var globalStyles = require("../Styles");
var { Component, Image, Text, StyleSheet, View } = React;

var IMAGE_PROPERTY_NAME = "profile_path";

class MovieSectionList extends Component {
    render() {
        var list = this.props.dataSource.slice(0, this.props.itemCount || 3);
        var filteredList = list.filter((item) => item[IMAGE_PROPERTY_NAME]);

        if (filteredList.length == 0) {
            return null;
        }

        var sectionList = filteredList.map((listItem) => {
            var imageSource = {
                uri: `http://image.tmdb.org/t/p/original${listItem[IMAGE_PROPERTY_NAME]}`
            };

            return (
                <View style={styles.listItem}>
                    <Image style={styles.thumbnail} source={imageSource} />
                    <Text style={globalStyles.container}>{listItem.name} ({listItem.character || listItem.job})</Text>
                </View>
            );
        });

        return (
            <View>
                <Text style={styles.heading}>{this.props.heading}:</Text>
                {sectionList}
            </View>
        );
    }
}

var styles = StyleSheet.create({
    heading: {
        fontWeight: "bold",
        marginTop: 10
    },
    listItem: {
        flexDirection: "row",
        marginTop: 10
    },
    thumbnail: {
        borderRadius: 8,
        height: 50,
        marginRight: 10,
        width: 50
    }
});

module.exports = MovieSectionList;