import React, { Component } from 'react';
import { View, StyleSheet, ScrollView, Image } from 'react-native';
import { Input, CheckBox, Button, Icon } from 'react-native-elements';
import * as Securestore from 'expo-secure-store';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import { createBottomTabNavigator, createTabNavigator } from 'react-navigation';
import { baseUrl } from '../shared/baseUrl';

class LoginTab extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: '',
            password: '',
            rememberMe: false
        };
    }

    static navigationOptions = {
        title: 'Login',
        tabBarIcon: ({ tintColor }) => (
            <Icon
                type='font-awesome'
                name='sign-in'
                iconStyle={{ color: tintColor }}
            />
        )
    }

    handleLogin() {
        console.log(JSON.stringify(this.state));
        if (this.state.rememberMe) {
            Securestore.setItemAsync('userInfo', JSON.stringify({
                user: this.state.userName,
                pwd: this.state.password
            }))
                .catch(Error => console.log('Error setting the data in secure store', Error));
        } else {
            Securestore.deleteItemAsync('userInfo')
                .catch(Error => console.log('Error deleting key-value from secure store', Error));
        }

    }
    componentDidMount() {
        Securestore.getItemAsync('userInfo')
            .then(userData => {
                const userInfo = JSON.parse(userData);
                if (userInfo) {
                    this.setState({ userName: userInfo.user });
                    this.setState({ password: userInfo.pwd });
                    this.setState({ rememberMe: true })
                }
            });
    }

    render() {
        return (
            <View style={styles.container}>
                <Input value={this.state.userName}
                    onChangeText={user => this.setState({ userName: user })}
                    placeholder='User Name'
                    leftIcon={{ type: 'font-awesome', name: 'user-o' }}
                    containerStyle={styles.formInput}
                    leftIconContainerStyle={styles.formIcon} />
                <Input value={this.state.password}
                    onChangeText={passwrd => this.setState({ password: passwrd })}
                    placeholder='Password'
                    leftIcon={{ type: 'font-awesome', name: 'key' }}
                    containerStyle={styles.formInput}
                    leftIconContainerStyle={styles.formIcon} />
                <CheckBox onPress={() => this.setState({ rememberMe: !this.state.rememberMe })}
                    checked={this.state.rememberMe}
                    center
                    title='Remember Me'
                    containerStyle={styles.formCheckbox}
                />
                <View style={styles.formButton}>
                    <Button title='Login'
                        onPress={() => this.handleLogin()}
                        icon={
                            <Icon
                                name='sign-in'
                                type='font-awesome'
                                color='#fff'
                                iconStyle={{ marginRight: 10 }}
                            />
                        }
                        buttonStyle={{ backgroundColor: '#5637DD' }}
                    />
                </View>
                <View style={styles.formButton}>
                    <Button title='Register'
                        onPress={() => this.props.navigation.navigate('Register')}
                        type='clear'
                        icon={
                            <Icon
                                name='user-plus'
                                type='font-awesome'
                                color='blue'
                                iconStyle={{ marginRight: 10 }}
                            />
                        }
                        titleStyle={{ color: 'blue' }}
                    />
                </View>
            </View>
        )
    }
}

class RegisterTab extends Component {
    constructor(props) {
        super(props);

        this.state = {
            userName: '',
            password: '',
            firstname: '',
            lastname: '',
            email: '',
            rememberMe: false,
            imageUrl: baseUrl + 'images/logo.png'
        };
    }
    static navigationOptions = {
        title: 'Register',
        tabBarIcon: ({ tintColor }) => (
            <Icon
                type='font-awesome'
                name='user-plus'
                iconStyle={{ color: tintColor }}
            />
        )

    }

    getImagefromCamera = async () => {
        const cameraPermissions = await Permissions.askAsync(Permissions.CAMERA);
        const cameraRollPermissions = await Permissions.askAsync(Permissions.CAMERA_ROLL);

        if (cameraPermissions.status === 'granted' && cameraRollPermissions.status === 'granted') {
            const imagePicker = await ImagePicker.launchCameraAsync({
                allowsEditing: true,
                aspect: [1, 1]
            })
            if (!imagePicker.cancelled) {
                console.log(imagePicker);
                this.setState({
                    imageUrl: imagePicker.uri
                })
            }
        }
    }

    handleRegister() {
        console.log(JSON.stringify(this.state));
        if (this.state.rememberMe) {
            Securestore.setItemAsync('userInfo', JSON.stringify({
                user: this.state.userName,
                pwd: this.state.password
            }))
                .catch(Error => console.log('Error setting the data in secure store', Error));
        } else {
            Securestore.deleteItemAsync('userInfo')
                .catch(Error => console.log('Error deleting key-value from secure store', Error));
        }
    }

    render() {
        return (
            <ScrollView>
                <View styles={styles.container}>
                    <View style={styles.imageContainer}>
                        <Image
                            source={{ uri: this.state.imageUrl }}
                            loadingIndicatorSource={require('./images/logo.png')}
                            style={styles.image}
                        />
                        <Button
                            title='Camera'
                            onPress={this.getImagefromCamera} />
                    </View>
                    <Input
                        placeholder='Username'
                        leftIcon={{ type: 'font-awesome', name: 'user-o' }}
                        onChangeText={userName => this.setState({ userName })}
                        value={this.state.username}
                        containerStyle={styles.formInput}
                        leftIconContainerStyle={styles.formIcon}
                    />
                    <Input
                        placeholder='Password'
                        leftIcon={{ type: 'font-awesome', name: 'key' }}
                        onChangeText={password => this.setState({ password })}
                        value={this.state.password}
                        containerStyle={styles.formInput}
                        leftIconContainerStyle={styles.formIcon}
                    />
                    <Input
                        placeholder='First Name'
                        leftIcon={{ type: 'font-awesome', name: 'user-o' }}
                        onChangeText={firstname => this.setState({ firstname })}
                        value={this.state.firstname}
                        containerStyle={styles.formInput}
                        leftIconContainerStyle={styles.formIcon}
                    />
                    <Input
                        placeholder='Last Name'
                        leftIcon={{ type: 'font-awesome', name: 'user-o' }}
                        onChangeText={lastname => this.setState({ lastname })}
                        value={this.state.lastname}
                        containerStyle={styles.formInput}
                        leftIconContainerStyle={styles.formIcon}
                    />
                    <Input
                        placeholder='Email'
                        leftIcon={{ type: 'font-awesome', name: 'envelope-o' }}
                        onChangeText={email => this.setState({ email })}
                        value={this.state.email}
                        containerStyle={styles.formInput}
                        leftIconContainerStyle={styles.formIcon}
                    />
                    <CheckBox
                        title='Remember Me'
                        center
                        checked={this.state.rememberMe}
                        onPress={() => this.setState({ rememberMe: !this.state.rememberMe })}
                        containerStyle={styles.formCheckbox}
                    />
                    <View style={styles.formButton}>
                        <Button
                            onPress={() => this.handleRegister()}
                            title='Register'
                            icon={
                                <Icon
                                    name='user-plus'
                                    type='font-awesome'
                                    color='#fff'
                                    iconStyle={{ marginRight: 10 }}
                                />
                            }
                            buttonStyle={{ backgroundColor: '#5637DD' }}
                        />
                    </View>
                </View>
            </ScrollView>
        )
    }
}

const Login = createBottomTabNavigator(
    {
        Login: LoginTab,
        Register: RegisterTab

    },
    {
        tabBarOptions: {
            activeBackgroundColor: '#5637DD',
            inactiveBackgroundColor: '#CEC8FF',
            activeTintColor: '#fff',
            inactiveTintColor: '#808080',
            labelStyle: { fontSize: 16 }
        }

    }
)

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        margin: 10
    },
    formIcon: {
        marginRight: 10
    },
    formInput: {
        padding: 8
    },
    formCheckbox: {
        margin: 8,
        backgroundColor: null
    },
    formButton: {
        margin: 20,
        marginRight: 40,
        marginLeft: 40
    },
    imageContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        margin: 10
    },
    image: {
        width: 60,
        height: 60
    }
});

export default Login;
