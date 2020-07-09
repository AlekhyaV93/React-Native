import React, {Component} from 'react';
import {View, Text, ScrollView} from 'react-native';
import { Card } from 'react-native-elements';

//creating contact component
class Contact extends Component{
    static navigationOptions = {
        title:'Contact Us'
    }
    render(){
    return(
        <View>
            <ScrollView>
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
                    </Card>
                </ScrollView>
        </View>
    )
    }
}
//exporting Contact component as default
export default Contact