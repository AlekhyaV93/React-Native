import React, { Component } from 'react';
import { Text, View, ScrollView, Switch, Picker, Button, StyleSheet, Modal, Alert } from 'react-native';
import DatePicker from 'react-native-datepicker';
import * as Animatable from 'react-native-animatable';

//reservation class component
class Reservation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            campers: 1,
            hikein: false,
            date: '',
        }
    }

    //Popping an alert with reserve campsite data on clicking search
    handleSearch() {
        console.log(JSON.stringify(this.state));
        Alert.alert(
            'Begin Search?',
            'Number Of Campers: ' + this.state.campers +'\r\n\n' + ' Hike-in? ' + this.state.hikein + '\r\n\n' + 'Date: ' + this.state.date ,
            [
                {
                    text: 'Cancel',
                    style: 'cancel',
                    onPress: () => { this.resetForm() }
                },
                {
                    text: 'OK',
                    onPress: () => { this.resetForm() }
                }
            ],
            {cancelable:false}

        )
    }

    //resetting state to its default values
    resetForm() {
        this.setState({
            campers: 1,
            hikein: false,
            date: '',
        })
    }
    //including reserve campsite to stacknavigator
    static navigationOptions = {
        title: 'Reserve Campsite'
    }

    render() {
        return (
            <Animatable.View animation='zoomIn' duration={2000} delay={1000}>
                <View style={styles.formRow}>
                    <Text style={styles.formLabel}>Number of Campers</Text>
                    <Picker selectedValue={this.state.campers.toString()}
                        onValueChange={(itemValue) => this.setState({ campers: itemValue })}
                        style={styles.formItem}>
                        <Picker.Item label='1' value='1' />
                        <Picker.Item label='2' value='2' />
                        <Picker.Item label='3' value='3' />
                        <Picker.Item label='4' value='4' />
                        <Picker.Item label='5' value='5' />
                        <Picker.Item label='6' value='6' />
                    </Picker>
                </View>
                <View style={styles.formRow}>
                    <Text style={styles.formLabel}>Hike-in?</Text>
                    <Switch value={this.state.hikein}
                        trackColor={{ true: '#5637DD', false: null }}
                        onValueChange={(value) => this.setState({ hikein: value })}
                        style={styles.formItem} />
                </View>
                <View style={styles.formRow}>
                    <Text style={styles.formLabel}>Select a Date</Text>
                    <DatePicker
                        style={{ flex: 2, marginRight: 20 }}
                        date={this.state.date}
                        format='YYYY-MM-DD'
                        mode='date'
                        placeholder='Select Date'
                        minDate={new Date().toISOString()}
                        confirmBtnText='Confirm'
                        cancelBtnText='Cancel'
                        customStyles={{
                            dateIcon: {
                                position: 'absolute',
                                left: 0,
                                top: 4,
                                marginLeft: 0
                            },
                            dateInput: {
                                marginLeft: 36
                            }
                        }}
                        onDateChange={date => { this.setState({ date: date }) }}
                    />
                </View>
                <View style={styles.formRow}>
                    <Button title="Search"
                        onPress={() => this.handleSearch()}
                        color='#5637DD'
                        accessibilityLabel='Tap me to search for available campsites to reserve' />
                </View>
            </Animatable.View>
        )
    }
}

//creating some custom styles
const styles = StyleSheet.create({
    formRow: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        flexDirection: 'row',
        margin: 20
    },
    formLabel: {
        fontSize: 18,
        flex: 2
    },
    formItem: {
        flex: 1
    },
    modal: {
        justifyContent: 'center',
        margin: 20
    },
    modalTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        backgroundColor: '#5637DD',
        textAlign: 'center',
        color: '#fff',
        marginBottom: 20
    },
    modalText: {
        fontSize: 18,
        margin: 10
    }
});

//exporting reservartion module as default 
export default Reservation;