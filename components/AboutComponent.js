import React, { Component } from 'react';
import { Text, ScrollView, FlatList } from 'react-native';
import { Card, ListItem } from 'react-native-elements';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl'
import { partners } from '../redux/partners';
import Loading from './LoadingComponent';

const mapStateToProps = (state) => {
    return {
        partners: state.partners
    };
}
//creating mission component 
function Mission() {
    return (
        <Card title="Mission">
            <Text>
                We present a curated database of the best campsites in the vast woods and backcountry of the World Wide Web Wilderness.
                We increase access to adventure for the public while promoting safe and respectful use of resources.
                The expert wilderness trekkers on our staff personally verify each campsite to make sure that they are up to our standards.
                We also present a platform for campers to share reviews on campsites they have visited with each other.
            </Text>
        </Card>
    )
}
//creating renderPartner component that renders each partner. Here we used object destructuring and sent item as a parameter
function renderPartner({ item }) {
    return (
        <ListItem title={item.name}
            subtitle={item.description}
            leftAvatar={{ source: { uri: baseUrl + item.image } }}
        />
    )
}
//About component that renders the above defined two components.
//Including AboutUs as title for navigationOptions
//FlatList is react-Native elememnt to render list of data, the keyExtractor prop of Flatlist is for setting unique id for each item in the list(as we did for react)
//also used card component of react-native-elements
class About extends Component {
    static navigationOptions = {
        title: 'About Us'
    }
    render() {
        if (this.props.partners.isLoading) {
            return (
                <ScrollView>
                    <Mission />
                    <Card title="Community Partners">
                        <Loading />
                    </Card>
                </ScrollView>
            )
        }
        if (this.props.partners.errMess) {
            return (
                <ScrollView>
                    <Mission />
                    <Card title="Community Partners">
                        <Text>{this.props.partners.errMess}</Text>
                    </Card>
                </ScrollView>
            )
        }
        return (
            <ScrollView>
                <Mission />
                <Card title="Community Partners">
                    <FlatList data={this.props.partners.partners}
                        keyExtractor={item => item.id.toString()}
                        renderItem={renderPartner}
                    />
                </Card>
            </ScrollView>
        )
    }
}
//exporting About as default
export default connect(mapStateToProps)(About);
