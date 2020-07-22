import React, { Component } from 'react';
import { View, StyleSheet, Button } from 'react-native';
import { Input, CheckBox } from 'react-native-elements';
import * as Securestore from 'expo-secure-store';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: '',
            password: '',
            rememberMe: false
        };
    }

    static navigationOptions = {
        title: 'Login'
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
            <View>
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
                <View>
                    <Button title='Login'
                        onPress={() => this.handleLogin()}
                        color='#5637DD' />
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        margin: 20
    },
    formIcon: {
        marginRight: 10
    },
    formInput: {
        padding: 10
    },
    formCheckbox: {
        margin: 10,
        backgroundColor: null
    },
    formButton: {
        margin: 40
    }
});

export default Login;
