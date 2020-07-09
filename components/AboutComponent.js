import React, { Component } from 'react';
import { Text, ScrollView, FlatList} from 'react-native';
import { Card, ListItem } from 'react-native-elements';
import { PARTNERS } from '../shared/partners.js';

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
            leftAvatar={{ source: require('./images/bootstrap-logo.png') }}
        />
    )
}
//About component that renders the above defined two components.
//Including AboutUs as title for navigationOptions
//FlatList is react-Native elememnt to render list of data, the keyExtractor prop of Flatlist is for setting unique id for each item in the list(as we did for react)
//also used card component of react-native-elements
class About extends Component {
    constructor(props) {
        super(props)
        this.state = {
            partners: PARTNERS
        }
    }
    static navigationOptions = {
        title: 'About Us'
    }
    render() {
        return (
            <ScrollView>
                <Mission />
                <Card title="Community Partners">
                <FlatList data={this.state.partners}
                keyExtractor={item=>item.id.toString()}
                renderItem={renderPartner}
                /> 
                </Card>
            </ScrollView>
        )
    }
}
//exporting About as default
export default About
