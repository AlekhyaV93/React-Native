import React, { Component } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { Card, Button, Icon } from 'react-native-elements';
import * as Animatable from 'react-native-animatable';
import * as MailComposer from 'expo-mail-composer';

//creating contact component
class Contact extends Component {
    static navigationOptions = {
        title: 'Contact Us'
    }

    sendEmail() {
        MailComposer.composeAsync({
            recipients: ['campsite@nucamp.co'],
            subject: 'inquiry',
            body: 'To whom it may concern'
        })
    }
    render() {
        return (
            <View>
                <ScrollView>
                    <Animatable.View animation='fadeInDown' duration={2000} delay={1000}>
                        <Card title="Contact Information" wrapperStyle={{ margin: 10 }}>
                            <Text>
                                1 NuCamp Way
                        </Text>
                            <Text>
                                Seattle, WA 98001
                        </Text>
                            <Text style={{ marginBottom: 10 }}>
                                U.S.A.
                        </Text>

                            <Text>
                                Phone: 1-206-555-1234
                        </Text>
                            <Text>
                                Email: campsites@nucamp.co
                        </Text>
                            <Button
                                title="Send Email"
                                buttonStyle={{ backgroundColor: '#5637DD', margin: 40 }}
                                icon={<Icon
                                    name='envelope-o'
                                    type='font-awesome'
                                    color='#fff'
                                    iconStyle={{ marginRight: 10 }}
                                />}
                                onPress={() => this.sendEmail()} />
                        </Card>
                    </Animatable.View>
                </ScrollView>
            </View>
        )
    }
}
//exporting Contact component as default
export default Contact 