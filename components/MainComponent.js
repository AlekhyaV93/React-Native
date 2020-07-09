import React, { Component } from 'react';
import Directory from './DirectoryComponent';
import CampsiteInfo from './CampsiteInfoComponent';
import { View, Platform } from 'react-native';
import Home from './HomeComponent';
import { createStackNavigator, createDrawerNavigator } from 'react-navigation';
import About from './AboutComponent';
import Contact from './ContactComponent';

//creating stack navigator for Directory component here initial Route is Directory on clicking a image it is navigated to CampsiteInfo component
const DirectoryNavigator = createStackNavigator(
    {
        Directory: { screen: Directory },
        CampsiteInfo: { screen: CampsiteInfo }        
    },
    {
        initialRouteName: 'Directory',
        navigationOptions: {
            headerStyle: {
                backgroundColor: '#5637DD'
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                color: '#fff'
            }
        }
    }
);
//creating stack navigator for Home component
const HomeNavigator = createStackNavigator(
    {
        Home:{screen:Home}       
    },
    {
        navigationOptions: {
            headerStyle: {
                backgroundColor: '#5637DD'
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                color: '#fff'
            }
        }
    }
);
//creating stack navigator for About component
const AboutNavigator = createStackNavigator(
    {
        About:{screen:About}       
    },
    {
        navigationOptions: {
            headerStyle: {
                backgroundColor: '#5637DD'
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                color: '#fff'
            }
        }
    }
);
//creating stack navigator for Contact component
const ContactNavigator = createStackNavigator(
    {
        Contact:{screen:Contact}       
    },
    {
        navigationOptions: {
            headerStyle: {
                backgroundColor: '#5637DD'
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                color: '#fff'
            }
        }
    }
);
//creating drawer navigator with options to different components it shows to navigate
const MainNavigator = createDrawerNavigator(
    {
        Home : {screen: HomeNavigator},
        Directory:{screen : DirectoryNavigator},
        About:{screen : AboutNavigator},
        Contact:{screen : ContactNavigator}
    },
    {
        drawerBackgroundColor: '#CEC8FF'
    }
    )
//rendering MainNavigator within Main Component
class Main extends Component {
    render() {
        return (
            <View style={{ flex: 1, paddingTop: Platform.OS === 'ios' ? 0 : Expo.Constants.statusBarHeight }}>
                <MainNavigator />
            </View>
        )
    }
}

//exporting Main component as default
export default Main;