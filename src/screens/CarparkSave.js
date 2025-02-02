import React, { useState } from "react";
import { SafeAreaView, View, Text, StyleSheet, Image, TextInput, TouchableOpacity, Alert, useWindowDimensions, Switch} from "react-native";
import Logo from '../../assets/naplogo.png';
import { useNavigation } from "@react-navigation/native";
import axios from "axios";

const CarparkSave = () =>{
  const navigation = useNavigation();
  const [carparkID, setcarparkID] = useState('');
  const { BASE_URL } = require('../../server/config.js')
   
  const onSavePressed = () => {
    console.warn("Sign In");

    axios.post(`${BASE_URL}/carpark/save`, {
        carparkId : carparkID,
    })
    .then(function (response) {
      console.log(response)
      console.warn("Carpark Saved")
      Alert.alert(
        "Carpark Saved",
        "Your carpark Id has been saved",
        [
          {
            text:'OK',
            onPress: () => navigation.navigate('CarparkUI'),
          },
        ],
        {cancelable : false}
      );
    })
    .catch(function (error) {
      console.log(error);
      console.warn("wrong input")
      console.warn(error);

      if(error.response)
      {
        //console.warn("Error status code: " + error.response.status);

        if(error.response.status === 404) {
          Alert.alert(
            "Carpark Not Found",
            "Please enter a valid Carpark Id",
            [
              {
                text:'OK',
                onPress: () => navigation.navigate('CarparkSave'),
              },
            ],
            {cancelable : false}
          );
        } else if(error.response.status === 400) {
          Alert.alert(
            "Carpark Id has already been saved",
            "Please enter another Carpark Id",
            [
              {
                text:'OK',
                onPress: () => navigation.navigate('CarparkUI'),
              },
            ],
            {cancelable : false}
          );
        }
      }
    });    
  }

  const onBackPressed = () => {
    console.warn("Ok");

    navigation.navigate('CarparkUI');
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

        <Text style = {styles.title} > Save Carpark </Text>

        <View style = {styles.form}>
          <View style = {styles.input}>
            <TextInput
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType= 'email-address'
              style = {styles.inputControl}
              placeholder = 'Carpark ID'
              placeholderTextColor = '#6b7280'
              value = {carparkID}
              onChangeText={newcarparkID => setcarparkID(newcarparkID)}
            />
          </View>

          <View style ={styles.formAction}>
            <TouchableOpacity 
              onPress={onSavePressed}>
              <View style = {styles.button}>
                <Text style = {styles.buttonText}> Save </Text>
              </View>
            </TouchableOpacity>
          </View>

          <View style = {styles.forgetPassword}>
            <TouchableOpacity onPress={onBackPressed}>
              <View style = {styles.button2}>
                <Text style = {styles.buttonText2}> Go Back </Text>
              </View>
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

  forgetPassword:{

  },

  button2: {
    backgroundColor: '#fff',
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#1C1C1C',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
  },

  buttonText2:{
    fontSize: 18,
    fontWeight: '600',
    color: '#1C1C1C',
  },
});

export default CarparkSave;