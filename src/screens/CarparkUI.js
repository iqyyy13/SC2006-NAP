import React, { useState } from "react";
import { SafeAreaView, View, Text, StyleSheet, Image, TextInput, TouchableOpacity, Alert, useWindowDimensions, Switch} from "react-native";
import Logo from '../../assets/naplogo.png';
import { useNavigation } from "@react-navigation/native";

const CarparkUI = () =>{
  const navigation = useNavigation();
   
  const onSavePressed = () => {
    console.warn("Save Carpark"); 
    navigation.navigate("CarparkSave")
  }

  const onViewPressed = () => {
    console.warn("View Saved Carpark");
    navigation.navigate("ViewSavedCarpark")
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
                
          <Text style = {styles.title} > Carpark </Text>

        <View style = {styles.form}>
          <View style ={styles.formAction}>
            <TouchableOpacity 
              onPress={onSavePressed}>
              <View style = {styles.button}>
                <Text style = {styles.buttonText}>Save Carpark </Text>
              </View>
            </TouchableOpacity>
          </View>

          <View style = {styles.forgetPassword}>
            <TouchableOpacity
              onPress={onViewPressed}>
              <View style = {styles.button}>
                <Text style = {styles.buttonText}>View Saved Carpark </Text>
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
});

export default CarparkUI;