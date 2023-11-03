import React, { useEffect, useState } from "react";
import { SafeAreaView, View, Text, StyleSheet, Image, TextInput, TouchableOpacity, FlatList, Alert, ActivityIndicator} from "react-native";
import Logo from '../../assets/naplogo.png';
import { useNavigation } from "@react-navigation/native";
import axios from "axios";

const ViewSavedCarpark = () =>{
  const navigation = useNavigation();
  const [carparkID, setCarparkID] = useState([]);
  const [loading, setLoading] = useState(true);

  const { BASE_URL } = require('../../server/config.js')

  useEffect(() => {
    fetchCarparkLotData();
  }, []);

  const fetchCarparkLotData = async() => {
    try{
        const response = await axios.get(`${BASE_URL}/carpark/retrieve/account`);
        const data = response.data;
        const carparkIDArray = [];

        console.log(response);
        //console.log(data);
        console.log(data[0]["carparkId"]);

        for(index = 0; index < data.length; index++)
        {
            carparkIDArray.push(data[index]["CarparkId"]);
        }

        setCarparkID(carparkIDArray);
        console.warn(data[0]["carparkId"]);
        console.warn(data[1]["carparkId"]);
        console.warn(data[2]["carparkId"]);
        setLoading(false);
    }catch (error) {
        console.error("error fetching data from server", error);
        console.log(error);
        setLoading(false);
    }
  };

  const onDeletePressed = () => {
    console.warn("Delete");

    axios.post(`${BASE_URL}/carpark/remove`, {
    })
    .then(function (response) {
      console.log(response)
      showDeleteAlert();
      //navigation.navigate('Home');
    })
    .catch(function (error) {
      console.log(error);
    });    
  };

  const showDeleteAlert = () => {
    Alert.alert(
      "Carpark Record Deleted",
      "The record has been successfully deleted.",
      [
        {
          text:"OK",
          onPress: () => {
            navigation.navigate('Home');
          },
        },
      ],
      {cancelable : false}
    );
  };


    return (
        <SafeAreaView style = {{ flex: 1, backgroundColor: '#e8ecf4'}}>
            <View style = {styles.container}>
                <View style = {styles.header}>
                    <Image
                        source = {Logo}
                        style = {styles.headerImg}
                    />
                </View>

                {loading ? ( 
                  <ActivityIndicator size = "large" color = "#0000ff" />
                ) : ( 
                <>
                    
 
                </>
              )}

              <View style ={styles.formAction}>
                <TouchableOpacity 
                  onPress={onDeletePressed}>
                  <View style = {styles.button}>
                    <Text style = {styles.buttonText}>Delete Saved Carpark? </Text>
                  </View>
                </TouchableOpacity>
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

  label: {
    fontWeight: 'bold',
    fontSize: 40,
  },

  value: {
    marginBottom: 20,
    fontSize: 35,
  },

  item: {
    backgroundColor: '#fff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
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


});

export default ViewSavedCarpark;