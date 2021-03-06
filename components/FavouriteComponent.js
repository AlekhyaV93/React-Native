import React, { Component } from 'react';
import { FlatList, View, Text, Alert } from 'react-native';
import { ListItem } from 'react-native-elements';
import { favourite } from '../redux/favourite';
import { Loading } from './LoadingComponent';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import { deleteFavourite } from '../redux/ActionCreators';
import Swipeout from 'react-native-swipeout';
import * as Animatable from 'react-native-animatable';

const mapStateToProps = (state) => {
    return {
        favourite: state.favourite,
        campsites: state.campsites
    }
}

const mapDispatchToProps = {
    deleteFavourite: campsiteId => (deleteFavourite(campsiteId))
};

class Favourite extends Component {
    static navigationOptions = {
        title: 'Favourites'
    }

    render() {
        const { navigate } = this.props.navigation;
        const renderCampsites = ({ item }) => {
            const rightButton = [
                {
                    text: 'Delete',
                    type: 'delete',
                    onPress: () => {
                        Alert.alert(
                            "Delete Campsite?",
                            "On clicking 'Ok' you will delete the " + item.name + " from favourites",
                            [{
                                text: 'Cancel',
                                onPress: () => console.log(item.name + 'Not Deleted'),
                                style: ' cancel'
                            },
                            {
                                text: 'OK',
                                onPress: () => this.props.deleteFavourite(item.id)

                            }],
                            { cancelable: false }
                        )
                    }
                }
            ];
            return (
                <Swipeout right={rightButton} autoClose={true}>
                    <Animatable.View animation='fadeInRightBig' duration={2000}>
                        <ListItem
                            title={item.name}
                            subtitle={item.description}
                            leftAvatar={{ source: { uri: baseUrl + item.image } }}
                            onPress={() => navigate('CampsiteInfo', { campsiteId: item.id })}
                        />
                    </Animatable.View>
                </Swipeout>
            );

        }
        if (this.props.campsites.isLoading) {
            return <Loading />;
        }
        if (this.props.campsites.errMess) {
            return (
                <View>
                    <Text>{this.props.campsites.errMess}</Text>
                </View>
            );
        }
        return (
            <FlatList
                data={this.props.campsites.campsites.filter(camp => this.props.favourite.includes(camp.id))}
                renderItem={renderCampsites}
                keyExtractor={item => item.id.toString()}
            />
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Favourite);