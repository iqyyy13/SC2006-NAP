import React, { useState } from "react";
import { SafeAreaView, View, Text, StyleSheet, Image, TextInput, TouchableOpacity, Alert, useWindowDimensions} from "react-native";
import Logo from '../../assets/naplogo.png';
import { useNavigation } from "@react-navigation/native";
import axios from "axios";

const Registration = () =>{
  const navigation = useNavigation();
  const{height} = useWindowDimensions();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { BASE_URL } = require('../../server/config.js')
  const [isSecureEntry, setSecureEntry] = useState(true);
  const onLogInPressed = () => {
    console.warn("Log In");

    navigation.navigate('Login'); 
  }

  const onSignUpPressed = () => {
    navigation.navigate('Home');
  }
  
   
  return (
    <SafeAreaView style = {{ flex: 1, backgroundColor: '#e8ecf4'}}>
      <View style = {styles.container}>
        <View style = {styles.header}>
          <Image
            source = {Logo} 
            style = {styles.headerImg}
          />
        </View>
                
          <Text style = {styles.title} > Register </Text>

        <View style = {styles.form}>
          <View style = {styles.input}>
            <Text style = {styles.inputLabel}> Email Address </Text>

            <TextInput
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType= 'email-address'
              style = {styles.inputControl}
              placeholder = 'Email'
              placeholderTextColor = '#6b7280'
              value = {email}
              onChangeText={newEmail => setEmail(newEmail)}
            />
          </View>

          <View style = {styles.input}>
            <Text style = {styles.inputLabel}> Password </Text>

            <TextInput
              secureTextEntry = {isSecureEntry}
              style = {styles.inputControl}
              placeholder = 'Password'
              placeholderTextColor = '#6b7280'
              value = {password}
              onChangeText={newpassword => setPassword(newpassword)}
            />

            <TouchableOpacity 
              onPress = {() => {
                setSecureEntry(!isSecureEntry) ;
              }}
            >
              <Text style = {styles.showText}> {isSecureEntry ? "Show password" : "Hide password"}</Text>
            </TouchableOpacity>
          </View>

          <View style ={styles.formAction}>
            <TouchableOpacity 
              onPress={() => {
                //handle onPress
                axios.post(`${BASE_URL}/auth/signup`, {
                  username: email,
                  password: password,
                  email: email,
                })
                .then(function (response) {
                  console.log(response)
                  Alert.alert('Successfully registered an account!', '', [
                  {
                    text: 'OK',
                    onPress: () => {
                      navigation.navigate('Home');
                    }
                  }
                  ]);
                })
                .catch(function (error) {
                  console.warn(error.message);

                  if(error.response)
                  {
                    //console.warn("Error status code: " + error.response.status);

                    if(error.response.status === 400) {
                      console.warn("Validation input error")
                      Alert.alert(
                        "Verify your email address and/or password",
                        "Password > 8 characters, contain an uppercase letter and a number",
                        [
                          {
                            text:'OK',
                            onPress: () => navigation.navigate('Registration'),
                          },
                        ],
                        {cancelable : false}
                      );
                    } else if(error.response.status === 404) {
                      console.warn("User not found")
                      Alert.alert(
                        "Account not found in database",
                        "Please register an account",
                        [
                          {
                            text:'OK',
                            onPress: () => navigation.navigate('Registration'),
                          },
                        ],
                        {cancelable : false}
                      );
                    } else if(error.response.status === 409) {
                      console.warn("User already in database")
                      Alert.alert(
                        "Account has already been registered with this email address",
                        "Please login again",
                        [
                          {
                            text:'OK',
                            onPress: () => navigation.navigate('Login'),
                          },
                        ],
                        {cancelable : false}
                      );
                    }
                  }
                });

                /*Alert.alert('Successfully registered an account!', '', [
                  {
                    text: 'OK',
                    onPress: () => {
                      navigation.navigate('Home');
                    }
                  }
                ]);*/
            }}>
              <View style = {styles.button}>
                <Text style = {styles.buttonText}>Sign Up </Text>
              </View>
            </TouchableOpacity>
          </View>

            <View style = {styles.formFooter}> 
              <Text style = {styles.bottomtext}>Already have an account?{' '}</Text>
              <TouchableOpacity 
                //style={{marginTop : 'auto'}}
                onPress={onLogInPressed}>
                  <Text style = {styles.signUp}>
                    Login
                  </Text>
              </TouchableOpacity>
            </View>

        </View>         
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 24,
    flex: 1,
  },
  header: {
    marginVertical: 36
  },
  headerImg: {
    width: 400,
    height: 150,
    alignSelf: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1e1e1e',
    marginBottom: 20,
    textAlign: 'center',
  },

  input:{
    marginBottom: 20,
  },

  inputLabel: {
    fontSize: 20,
    fontWeight: '600',
    color: '#222',
    marginBottom: 10
  },
  inputControl: {
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 15,
    fontWeight: '500',
    color: '#222',
  },
   
  form: {
    marginBottom: 24,
    flex: 1,
  },

  formAction: {
    marginVertical: 24,
  },

  formFooter: {
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
  },

  button: {
    backgroundColor: '#1C1C1C',
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#1C1C1C',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
  },

  buttonText:{
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
  },

  signUp:{
    fontSize : 18,
    color: 'blue',
    fontWeight: '600',
    textDecorationLine: 'underline',
  },

  bottomtext:{
    fontSize: 18,
    fontWeight: '600',
  },

  showText: {
    paddingTop: 10,
    fontSize: 16,
    fontWeight: 'bold',
    zIndex: -1
  },
});

export default Registration;