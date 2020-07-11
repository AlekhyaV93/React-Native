import React, { Component } from 'react';
import { Text, View, ScrollView, FlatList, Modal, Button, StyleSheet, TextInput } from 'react-native';
import { Card, Icon, Rating, Input } from 'react-native-elements';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import { postFavourite, postComment } from '../redux/ActionCreators'
import { favourite } from '../redux/favourite';


const mapStateToProps = (state) => {
    return {
        campsites: state.campsites,
        comments: state.comments,
        favourite: state.favourite
    };
}
const mapDispatchToProps = {
    postFavourite: campsiteId => postFavourite(campsiteId),
    postComment: (campsiteId, rating, author, text) => postComment(campsiteId, rating, author, text)
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
                <View style={styles.cardRow}>
                    <Icon
                        type="font-awesome"
                        name={props.favourite ? 'heart' : 'heart-o'}
                        raised
                        reverse
                        color='#f50'
                        onPress={() => props.favourite ?
                            console.log('Already marked favourite') : props.onMarkFavourite()}
                    />
                    <Icon
                        type="font-awesome"
                        name='pencil'
                        raised
                        reverse
                        color="#5637DD"
                        onPress={() => props.onShowModal()}
                        style={styles.cardItem}
                    />
                </View>

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
                <Rating 
                startingValue={item.rating}
                readonly
                imageSize={10}
                style={{alignItems:'flex-start', paddingVertical:'5%'}}
                />
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

    constructor(props) {
        super(props);
        this.state = {
            show: false,
            rating: 5,
            author: '',
            comment: ''
        }
    }
    static navigationOptions = {
        title: 'Campsite Information'
    };

    onMarkFavourite = (campsiteId) => {
        this.props.postFavourite(campsiteId);
    }

    toggleModal() {
        this.setState({
            show: !this.state.show
        })
    }

    onShowModal() {
        this.toggleModal();
    }

    handleComment = (campsiteId, rating, author, text) => {
        this.props.postComment(campsiteId, rating, author, text);   
    }

    resetForm() {
        this.setState({
            show: false,
            rating: 5,
            author: '',
            comment: ''
        })
    }

    render() {
        const campsiteId = this.props.navigation.getParam('campsiteId');
        const campsite = this.props.campsites.campsites.filter(campsite => campsite.id === campsiteId)[0];
        const comments = this.props.comments.comments.filter(com => com.campsiteId === campsiteId);
        return (
            <ScrollView>
                <RenderCampsite campsite={campsite} favourite={this.props.favourite.includes(campsiteId)} onMarkFavourite={() => this.onMarkFavourite(campsiteId)} onShowModal={() => this.onShowModal()} />
                <RenderComments comments={comments} />
                <Modal animationType={'slide'}
                    transparent={false}
                    visible={this.state.show}
                    onRequestClose={() => this.toggleModal()}>
                    <View style={styles.modal}>
                        <Rating
                            showRating
                            startingValue={this.state.rating}
                            imageSize={40}
                            onFinishRating={(rating) => this.setState({ rating: rating })}
                            style={{ paddingVertical: 10 }}
                        />
                        <Input
                            placeholder='Author'
                            leftIcon={{ type: 'font-awesome', name: 'user-o' }}
                            leftIconContainerStyle={{ paddingRight: 10 }}
                            onChangeText={(author) => this.setState({ author: author })}
                            value={this.state.author}
                        />
                        <Input
                            placeholder='Comment'
                            leftIcon={{ type: 'font-awesome', name: 'comment-o' }}
                            leftIconContainerStyle={{ paddingRight: 10 }}
                            onChangeText={(comment) => this.setState({ comment: comment })}
                            value={this.state.comment}
                        />
                        <View style={{ margin: 10 }}>
                            <Button title='Submit' color="#5637DD"
                                onPress={() => {
                                    this.toggleModal();
                                    this.resetForm();
                                    this.handleComment(campsiteId,this.state.rating,this.state.author,this.state.comment);
                                }}
                            />
                        </View>
                        <View style={{ margin: 10 }}>
                            <Button title='cancel' color='#808080'
                                onPress={
                                    () => {
                                        this.toggleModal();
                                        this.resetForm()
                                    }
                                }
                            />
                        </View>
                    </View>
                </Modal>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    cardRow: {
        alignItems: 'center',
        alignContent: 'center',
        flex: 1,
        flexDirection: 'row',
        margin: 20
    },
    cardItem: {
        flex: 1,
        margin: 10
    },
    modal: {
        justifyContent: 'center',
        margin: 20
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(CampsiteInfo);
