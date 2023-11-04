import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button, Alert, TouchableOpacity, Image, Animated, Modal } from 'react-native';
import MapView, {Marker, Circle, Callout } from 'react-native-maps';
import axios from 'axios';
import proj4 from 'proj4';
import data from '../../assets/hdb_carpark.json';
import { useNavigation } from "@react-navigation/native";
import imageicon from '../../assets/adaptive-icon.png'
import Icon from "react-native-vector-icons/FontAwesome";
import Icon1 from "react-native-vector-icons/Fontisto";


//import Geolocation from '@react-native-community/geolocation';

proj4.defs([
  [
    'SVY21',
    "+proj=tmerc +lat_0=1.366666666666667 +lon_0=103.8333333333333 +k=1 +x_0=28001.642 +y_0=38744.572 +a=6378137 +rf=298.257223563 +units=m +no_defs"],
  [
    'WGS84',
    "+title=WGS 84 (long/lat) +proj=longlat +ellps=WGS84 +datum=WGS84 +units=degrees"
  ]
]);

const URA_API_URL = 'https://www.ura.gov.sg/uraDataService/insertNewToken.action';
const govsgurl = 'https://api.data.gov.sg/v1/transport/carpark-availability';
const accessKey = '098ecd87-27d6-414e-adc6-e8e7f3e65207'; // Use the provided access key
const { BASE_URL } = require('../../server/config.js')
const Home = () => {
  
  const[searchedMarkerCarParkNo, setSearchedMarkedCarParkNo] = useState(null);

  const handleSaveMarker = () => {
    if(searchMarker) {

      Alert.alert('Marker Saved');
      console.warn(searchedMarkerCarParkNo)
      axios.post(`${BASE_URL}/carpark/save`, {
        carparkId : searchedMarkerCarParkNo,
      })
      .then(function (response) {
        console.log(response)
        console.warn("Carpark Saved")
      })
      .catch(function (error) {
        console.log(error);
        console.warn("wrong input")
      });    
    }
  };

  const navigation = useNavigation();
  const [markers, setMarkers] = useState([]);
  const [carparkData, setCarparkData] = useState([]);
  const [carparkData2, setCarparkData2] = useState([]);
  const [region, setRegion] = useState({
    latitude: 1.3303110584045954, // Default latitude
    longitude: 103.85885005071715, // Default longitude
    latitudeDelta: 0.02,
    longitudeDelta: 0.02,
  });

  const[draggableMarkerCoord, setDraggableMarkerCoord] = useState({
    longitude: 1.3303110584045954, 
    latitude: 103.85885005071715,
  });

  const [icon_1] = useState(new Animated.Value(40));
  const [icon_2] = useState(new Animated.Value(40));
  const [icon_3] = useState(new Animated.Value(40));

  const [pop, setPop] = useState(false);

  const popIn = () => {
    setPop(true);
    Animated.timing(icon_1, {
      toValue: 130,
      duration: 500,
      useNativeDriver: false,
    }).start();
    Animated.timing(icon_2, {
      toValue: 130,
      duration: 500,
      useNativeDriver: false,
    }).start();
    Animated.timing(icon_3, {
      toValue: 130,
      duration: 500,
      useNativeDriver: false,
    }).start();
  }
  
  const popOut = () => {
    setPop(false);
    Animated.timing(icon_1, {
      toValue: 40,
      duration: 500,
      useNativeDriver: false,
    }).start();
    Animated.timing(icon_2, {
      toValue: 40,
      duration: 500,
      useNativeDriver: false,
    }).start();
    Animated.timing(icon_3, {
      toValue: 40,
      duration: 500,
      useNativeDriver: false,
    }).start();
  }

  const handleMarkerDrag = (e) => {
    // Update the region based on the marker's new position
    const { latitude, longitude } = e.nativeEvent.coordinate;
    setDraggableMarkerCoord(e.nativeEvent.coordinate);
    setRegion({ ...region, latitude, longitude });
  };

  
  useEffect(() => {


    const fetchCarparkData = async () => {
      try {
        const response = await axios.get(URA_API_URL, {
          headers: {
            service: 'Car_Park_Availability',
            AccessKey: accessKey,
          },
        });

        const token = response.data.Result;

        const availabilityApiUrl = `https://www.ura.gov.sg/uraDataService/invokeUraDS?service=Car_Park_Availability`;

        const availabilityResponse = await axios.get(availabilityApiUrl, {
          headers: {
            AccessKey: accessKey,
            Token: token,
          },
        });

        const govsgresponse = await axios.get(govsgurl,{
          headers:{
            service: 'carpark_info'
          }
        })
        const govsgdata = govsgresponse.data.items[0].carpark_data;
        setCarparkData2(govsgdata);

        console.log(`${BASE_URL}/carpark/retrieve`)
        const testAPI = await axios.get(`${BASE_URL}/carpark/retrieve` , {
          headers: {}
        })
        
        console.log(testAPI)
        
  


        const carparkData = availabilityResponse.data.Result;
        //for(let i = 0;i<carparkData2.length;i++){
          //console.log(carparkData2[i], i,"/",carparkData2.length)
        //}
        setCarparkData(carparkData);
        
        // Find the coordinates of the first carpark and set the region
        if (carparkData.length > 0) {
          const firstCarpark = carparkData[0];
          const svy21Coordinates = firstCarpark.geometries[0].coordinates;
          const x = parseFloat(svy21Coordinates.split(',')[0]);
          const y = parseFloat(svy21Coordinates.split(',')[1]);
      
          const converted = proj4('SVY21', 'WGS84', [x,y]);

          const x1 = parseFloat(String(converted).split(',')[0]);
          const y1 = parseFloat(String(converted).split(',')[1]);
          
          


        }
      } catch (error) {
        console.error('Error fetching carpark data:', error);
      }
    };

    
    fetchCarparkData();
    

  }, []);

    

    
    for(i=0;i<carparkData2.length;i++){
      data.map(carpark => {
          if (carpark.car_park_no == carparkData2[i].carpark_number)
            {
              
              
              //console.log("matched",carpark.car_park_no,carpark.x_coor,carpark.y_coor,carparkData2[i].carpark_info[0].lots_available,"/",carparkData2[i].carpark_info[0].total_lots,carpark.x_coor,carpark.y_coor,j)
              if (markers.findIndex(marker => marker.key === carpark.car_park_no) === -1) {
                const floatxcoor = parseFloat(carpark.x_coor)
                const floatycoor = parseFloat(carpark.y_coor)
                markers.push(
                <Marker
                  key={carpark.car_park_no}
                  coordinate={{
                    latitude : floatxcoor,
                    longitude : floatycoor,}}
                    title={carpark.car_park_no}
                    description={carparkData2[i].carpark_info[0].lots_available}
                />)
              } 
            }
        })
    }
  



  for (let i = 0; i < carparkData.length; i++) {
    const carpark = carparkData[i];
    for (let j = 0; j < carpark.geometries.length; j++) {
      const geometry = carpark.geometries[j];
      const number = String(carpark.carparkNo)
      const x1 = parseFloat(geometry.coordinates.split(',')[0])
      const y1 = parseFloat(geometry.coordinates.split(',')[1])
      //console.log(number);

      const longitude = String(proj4('SVY21', 'WGS84', [x1,y1])).split(',')[0];
      const latitude = String(proj4('SVY21', 'WGS84', [x1,y1])).split(',')[1];

      const floatlong = parseFloat(longitude);
      const floatlat = parseFloat(latitude);
      if (markers.findIndex(marker => marker.key === carpark.carparkNo) === -1) {
  markers.push(
        <Marker
          key={carpark.carparkNo}
          coordinate={{
            latitude : floatlat,
            longitude : floatlong,
          }}
            title={carpark.carparkNo}
            description={carpark.lotsAvailable}
            //onPress={() => handleMarkerPress(carpark)}
        ></Marker>
       );
      };
    };
  };

  function searchAddressInJSON(address) {
    try {
     
      console.log(address);
      const foundMarker = markers.find((marker) => marker.key === address);
      console.log('found marker:',foundMarker);
      if (foundMarker){
      
      console.log('Found marker coordinates:', foundMarker.props.coordinate);
      return foundMarker
      }
      else{
        console.log('Marker not found');
        
      }
      const filteredData = data.filter((carpark) =>
        carpark.address.toLowerCase().includes(address.toLowerCase()) ||
        carpark.car_park_no.toLowerCase().includes(address.toLowerCase())
      );
  
      //Extract "x_coord" and "y_coord" values from the filtered data.
      const coords = filteredData.map((carpark) => ({
        x_coor: carpark.x_coor,
        y_coor: carpark.y_coor,
        car_park_no: carpark.car_park_no
     }));
  
    //  console.log('filtered data:',filteredData);

      return coords;
    } catch (error) {
      console.error('Error reading or parsing the JSON file:', error);
      return [];
    }
  }

  const [searchText, setSearchText] = useState('');
  const [searchMarker, setSearchMarker] = useState({
    latitude: 1.3303110584045954, // Default latitude
    longitude: 103.85885005071715, // Default longitude
    latitudeDelta: 0.02,
    longitudeDelta: 0.02,
  });

  const [searchMarkerColor, setSearchMarkerColor] = useState('#0000ff');

  const handleSearchTextChange = (text) => {
    setSearchText(text);
    // You can perform your search logic here based on the text input
    // Update markers or region accordingly
  };



  const handleSearchButtonPress = () => {
    const coordinates = searchAddressInJSON(searchText);
    if (coordinates == undefined){
      return null;
    }
    console.log(coordinates.coordinate);

    console.log('received coordinates: ', coordinates,'length:',coordinates.length);
    var firstCoordinate = 0;
    
    if(coordinates.length == undefined){
      console.log(coordinates.props.coordinate.latitude,coordinates.props.coordinate.longitude)

      const newRegion2 = {
        latitude: coordinates.props.coordinate.latitude,
        longitude: coordinates.props.coordinate.longitude,
        latitudeDelta: 0.02, // Adjust these values as needed
        longitudeDelta: 0.02,
      };
      console.log('new region set')
      setSearchMarker(newRegion2)
      setRegion(newRegion2)
    }
    else{
      console.log('marker not found')
    }
        
    // You can now use the coordinates array to update your map view or perform any other actions as needed.
    // For example, if you want to center the map on the first result, you can do something like this:
  
    if (coordinates.length > 0) {
      var length = 0;

      do{
        firstCoordinate = coordinates[length];
        var markerIndex = markers.findIndex(marker => marker.key === String(firstCoordinate.car_park_no));
        length++;
        console.log('first marker not found, next', markerIndex)

      } while(markerIndex == -1);

      console.log(markerIndex)

    }
    else{
      console.log("else");
      firstCoordinate = coordinates;
    }
    var x,y;
      console.log(firstCoordinate.y_coor,firstCoordinate.x_coor)
      console.log(firstCoordinate.latitude,firstCoordinate.longitude)
      if(firstCoordinate.y_coor == undefined){
        y = firstCoordinate.latitude;
        x = firstCoordinate.longitude;
      }
      else{
        y = firstCoordinate.y_coor;
        x = firstCoordinate.x_coor;
      }

      const newRegion = {
        latitude: x,
        longitude: y,
        latitudeDelta: 0.02, // Adjust these values as needed
        longitudeDelta: 0.02,
      };
      
      console.log(firstCoordinate.car_park_no,x,y)

      setSearchedMarkedCarParkNo(firstCoordinate.car_park_no);

      if (markerIndex !== -1) 
      {
        console.log("changing color")
        // Update the color of the found marker to green
        setSearchMarkerColor('#03030F')
        console.log(newRegion)
        setSearchMarker(newRegion)
        setRegion(newRegion)
      }
    };

  const clickHandler = () => {
    console.warn("Button pressed")
  };

  const showSaveAlert = () => {
    Alert.alert(
      "Are you sure you want to save this carpark?",
      "The saved carpark will be stored into your saved carpark lists",
      [
        {
          text:'OK',
          onPress: () => handleSaveMarker(searchMarker),
        },
        {
            text: 'Cancel',
            onPress: () => navigation.navigate('Home'),
        },
      ],
      {cancelable : false}
    );
  };

  return (
    
    <View style={styles.container}>
      <TextInput
        style={styles.searchBar}
        placeholder="Search for a location..."
        value={searchText}
        onChangeText={handleSearchTextChange}
        backgroundColor = "#FFFFFF"
      />
      <Button
          title="Search"
          onPress={handleSearchButtonPress}  
      />

      <Animated.View style = {[styles.TouchableOpacity, { bottom : icon_1, opacity: pop ? 1 : 0},]}>
        <TouchableOpacity
          onPress = {() => navigation.navigate('CarparkLot')}
        >
          <Icon1 
            name = "save" size = {25} color = '#FFFF'     
          />
        </TouchableOpacity>
      </Animated.View>
      <Animated.View style = {[styles.TouchableOpacity, { bottom : icon_2, right: icon_2, opacity: pop ? 1 : 0},]}>
        <TouchableOpacity
          onPress = {() => navigation.navigate('CarparkUI')}
        >
          <Icon1 
            name = "save-1" size = {25} color = '#FFFF' 
          />
        </TouchableOpacity>
      </Animated.View>
      <Animated.View style = {[styles.TouchableOpacity, { right : icon_3, opacity: pop ? 1 : 0},]}>
        <TouchableOpacity
          onPress = {() => navigation.navigate('ForgotPassword')}
        >
          <Icon 
            name = "street-view" size = {25} color = '#FFFF' 
          />
        </TouchableOpacity>
      </Animated.View>
      <TouchableOpacity
        style = {styles.TouchableOpacity}
        zIndex = {2}
        onPress = {() => {
          clickHandler();
          pop === false ? popIn() : popOut();
        }}
      >
        <Icon name = "plus" size = {25} color = '#FFFF' />
      </TouchableOpacity>      

      {carparkData.length > 0 ? (
        <View style = {styles.mapContainer}>
          <MapView style={styles.map} region={region}>
            <Marker
              //image={markericon}
              //style = {{ width: 5, height: 5 }}
              pinColor = 'green'
              coordinate = {searchMarker}
              zIndex={2}
            >
              <Callout tooltip onPress = {() => showSaveAlert()}>
                <View style = {styles.calloutButtonsContainer}>
                  <Text style = {{color : 'black', alignItems: 'center'}}>Save</Text>
                </View>
              </Callout>
            </Marker>

            <Marker
              draggable
              pinColor='#0000ff'
              coordinate={region}
              onDragEnd={handleMarkerDrag}
            ></Marker>

            <Circle
              center = {searchMarker}
              radius = {1000}
              strokeColor='green'
              strokeWidth={5}
            />

            {markers}
      
          </MapView>
        </View>
      ) : (
        <Text>Loading carpark data...</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
    zIndex: -2
  },
  searchBar: {
    width: '100%', // Adjust the width to your preference (e.g., 80% of the screen width)
    height: 60,
    borderWidth: 1,
    borderColor: 'gray',
    paddingLeft: 10,
    paddingTop: 10,
  },

  TouchableOpacity: {
    position: 'absolute',
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    right: 30,
    bottom: 50,
    backgroundColor: 'red',
    borderRadius: 50,
  },

  floatingButton: {
    resizeMode: 'contain',
    width: 50,
    height: 40,
  },

  mapContainer: {
    ...StyleSheet.absoluteFillObject,
    zIndex: -3,
  },

  calloutButtonsContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    width: 150,
    padding: 15,
    borderWidth: 0.5,
    alignSelf: 'flex-start'
  },

});


export default Home;