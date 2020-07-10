import React, { Component } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { Card } from 'react-native-elements';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import Loading from './LoadingComponent';

const mapStateToProps = (state) => {
    return {
        campsites: state.campsites,
        promotions: state.promotions,
        partners: state.partners
    };
}
function RenderItem(prop) {
    const {item} = prop
    if(prop.isLoading)
    {
        return <Loading />
    }
    if(prop.errMess){
        return(
            <View>
                <Text>{prop.errMess}</Text>
            </View>
        )
    }
    if (item) {
        return (
            <Card
                featuredTitle={item.name}
                image={{ uri: baseUrl + item.image }}>
                <Text
                    style={{ margin: 10 }}>
                    {item.description}
                </Text>
            </Card>
        );
    }
    return <View />;
}

class Home extends Component {

    static navigationOptions = {
        title: 'Home'
    }
    render() {
       
        //FlatList or ScrollView can be used for veiwing a list of items. The difference is that Flatlist uses LazyLoading.
        return (
            <ScrollView>
                <RenderItem
                    item={this.props.campsites.campsites.filter(campsite => campsite.featured)[0]} errMess={this.props.campsites.errMess} isLoading={this.props.campsites.isLoading} />
                <RenderItem
                    item={this.props.promotions.promotions.filter(promotion => promotion.featured)[0]} errMess={this.props.promotions.errMess} isLoading={this.props.promotions.isLoading} />
                <RenderItem
                    item={this.props.partners.partners.filter(partner => partner.featured)[0]} errMess={this.props.partners.errMess} isLoading={this.props.partners.isLoading}/>
            </ScrollView>
        );
    }
}

export default connect(mapStateToProps)(Home);