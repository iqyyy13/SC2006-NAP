import React, { useEffect, useState } from "react";
import { SafeAreaView, View, Text, StyleSheet, Image, TextInput, TouchableOpacity, FlatList, Alert, ActivityIndicator} from "react-native";
import Logo from '../../assets/naplogo.png';
import { useNavigation } from "@react-navigation/native";
import axios from "axios";

const ViewSavedCL = () =>{
  const navigation = useNavigation();
  const [carparkData, setCarparkData] = useState([]);
  const [carparkID, setCarparkID] = useState("");
  const [carparkLot, setCarparkLot] = useState("");
  const [remarks, setRemarks] = useState("");
  const [loading, setLoading] = useState(true);

  const { BASE_URL } = require('../../server/config.js')

  useEffect(() => {
    fetchCarparkLotData();
  }, []);

  const fetchCarparkLotData = async() => {
    try{
        const response = await axios.get(`${BASE_URL}/carparklot/retrieve`);
        const data = response.data;
        console.log(response);
        console.warn(data["carparkId"]);
        //console.log(data);
        console.log(data["carparkId"]);
        setCarparkID(data["carparkId"]);
        setCarparkLot(data["carparkLot"]);
        setRemarks(data["remarks"]);
        setLoading(false);
    }catch (error) {
        console.error("error fetching data from server", error);
        console.log(error);
        setLoading(false);
    }
  };

  const onDeletePressed = () => {
    console.warn("Delete");
    showDeleteAlert();  
  };

  const confirmDeletion = () => {
    axios.post(`${BASE_URL}/carparklot/remove`, {
    })
    .then(function (response) {
      console.log(response)
      navigation.navigate('Home');
    })
    .catch(function (error) {
      console.log(error);
      console.warn("No carpark lot record to be deleted");
      carparkError();
    });  
  }

  const showDeleteAlert = () => {
    Alert.alert(
      "Are you sure you want to delete this?",
      "The saved carpark lot will be successfully deleted.",
      [
        {
          text:'OK',
          onPress: () => confirmDeletion(),
        },
        {
            text: 'Cancel',
            onPress: () => navigation.navigate('ViewSavedCL'),
        },
      ],
      {cancelable : false}
    );
  };

  const carparkError = () => {
    Alert.alert(
      "No carpark lot record found",
      "Please save a carpark lot record",
      [
        {
          text:'OK',
          onPress: () => navigation.navigate('CarparkLot'),
        },
      ],
      {cancelable : false}
    );
  };

  const onBackPressed = () => {
    console.warn("Ok");

    navigation.navigate('CarparkLot');
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

                  <Text style = {styles.label}>Carpark ID : </Text>
                  <Text style = {styles.value}>{carparkID} </Text>

                  <Text style = {styles.label}>Carpark Lot : </Text>
                  <Text style = {styles.value}>{carparkLot} </Text>

                  <Text style = {styles.label}>Remarks : </Text>
                  <Text style = {styles.value}>{remarks} </Text>
                </>
              )}

              <View style ={styles.formAction}>
                <TouchableOpacity 
                  onPress={onDeletePressed}>
                  <View style = {styles.button}>
                    <Text style = {styles.buttonText}>Delete Saved Carpark Lot? </Text>
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

export default ViewSavedCL;