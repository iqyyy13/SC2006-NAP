import React, { useEffect, useState } from "react";
import { SafeAreaView, View, Text, StyleSheet, Image, TextInput, TouchableOpacity, FlatList, Alert, ActivityIndicator} from "react-native";
import Logo from '../../assets/naplogo.png';
import { useNavigation } from "@react-navigation/native";
import axios from "axios";

const ViewSavedCL = () =>{
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [carparkData, setCarparkData] = useState([]);

  const { BASE_URL } = require('../../server/config.js')

  useEffect(() => {
    fetchCarparkLotData();
  }, []);

  const fetchCarparkLotData = async() => {
    try{
        const response = await axios.get(`${BASE_URL}/carparklot/retrieve`);
        const data = response.data;
        console.log(data);
        console.log(response);
        console.warn(data);
        console.log(data);
        setCarparkData(data);
        setLoading(false);
    }catch (error) {
        console.error("error fetching data from server", error);
        console.log(error);
        setError(error);
        setLoading(false);
    }
  };

  if(loading){
    return <ActivityIndicator size = "large" color = "#0000ff" />;
  }

  if(error){
    return <Text> Error: {error.message}</Text>;
  }

  //const keyExtractor = (item) => `${item.carparkId}_${item.carparkLot}_${item.remarks}`;

  console.log(carparkData);

    return (
        <SafeAreaView style = {{ flex: 1, backgroundColor: '#e8ecf4'}}>
            <View style = {styles.container}>
                <View style = {styles.header}>
                    <Image
                        source = {Logo}
                        style = {styles.headerImg}
                    />
                </View>

                <FlatList
                    data = {carparkData}
                    renderItem= {({item}) => (
                        <View style = {styles.item}>
                            <Text style = {styles.label}>Carpark Id:</Text>
                            <Text style = {styles.value}>{item.carparkId}</Text>

                            <Text style = {styles.label}>Carpark Lot:</Text>
                            <Text style = {styles.value}>{item.carparkLot}</Text>

                            <Text style = {styles.label}>Remarks:</Text>
                            <Text style = {styles.value}>{item.remarks}</Text>
                        </View>
                    )}
                />
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
  },

  value: {
    marginBottom: 10,
  },

  item: {
    backgroundColor: '#fff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  }
});

export default ViewSavedCL;