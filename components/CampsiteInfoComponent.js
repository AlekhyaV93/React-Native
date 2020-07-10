import React, { Component } from 'react';
import { Text, View, ScrollView, FlatList } from 'react-native';
import { Card, Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import { postFavourite } from '../redux/ActionCreators'
import { favourite } from '../redux/favourite';


const mapStateToProps = (state) => {
    return {
        campsites: state.campsites,
        comments: state.comments,
        favourite: state.favourite
    };
}
const mapDispatchToProps = {   
        postFavourite : campsiteId => postFavourite(campsiteId)
}

function RenderCampsite(props) {
    const { campsite } = props
    if (campsite) {
        return (
            <Card
                featuredTitle={campsite.name}
                image={{ uri: baseUrl + campsite.image }}>
                <Text style={{ margin: 10 }}>
                    {campsite.description}
                </Text>
                <Icon
                    type="font-awesome"
                    name={props.favourite ? 'heart' : 'heart-o'}
                    raised
                    reverse
                    color='#f50'
                    onPress={() => props.favourite ?
                        console.log('Already marked favourite') : props.onMarkFavourite()}
                />

            </Card>
        );
    }
    return <View />;
}

function RenderComments({ comments }) {

    const renderCommentItem = ({ item }) => {
        return (
            <View style={{ margin: 10 }}>
                <Text style={{ fontSize: 14 }}>{item.text}</Text>
                <Text style={{ fontSize: 12 }}>{item.rating} Stars</Text>
                <Text style={{ fontSize: 12 }}>{`---${item.author},${item.date}`}</Text>
            </View>
        )
    }
    return (
        <Card title="Comments">
            <FlatList data={comments}
                renderItem={renderCommentItem}
                keyExtractor={item => item.id.toString()} />
        </Card>
    )
}

class CampsiteInfo extends Component {

    static navigationOptions = {
        title: 'Campsite Information'
    };

    onMarkFavourite = (campsiteId) => {
        this.props.postFavourite(campsiteId);
    }

    render() {
        const campsiteId = this.props.navigation.getParam('campsiteId');
        const campsite = this.props.campsites.campsites.filter(campsite => campsite.id === campsiteId)[0];
        const comments = this.props.comments.comments.filter(com => com.campsiteId === campsiteId);
        return (
            <ScrollView>
                <RenderCampsite campsite={campsite} favourite={this.props.favourite.includes(campsiteId)} onMarkFavourite={() => this.onMarkFavourite(campsiteId)} />
                <RenderComments comments={comments} />
            </ScrollView>
        );
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(CampsiteInfo);
