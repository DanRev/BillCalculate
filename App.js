import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { StyleSheet, View, Button, Alert, ScrollView } from 'react-native';
import FieldCalc from './components/FieldCalc';
import numeral from 'numeral';

const typesOfBill = ['50000','20000','10000','5000','2000','1000','500','100','50'];


export default function App() {
  const [valueFinal,setValueFinal] = useState({});

  function reportValueOfChild(quantity,typeOfBill) {
      var total = quantity * typeOfBill;
      valueFinal[typeOfBill] = total;
  }

  function formatNumber(value) {
    return numeral(value).format('0,0');
  }

  function calculateValue(){
    var fullValue = Object.values(valueFinal);
    var sum = 0;
    for (var i = 0; i < fullValue.length; i++){
        sum = sum + fullValue[i];
    }
    Alert.alert(
      "Confirm",
      `El total es: ${formatNumber(sum)}`,  
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "OK", onPress: () => console.log("OK Pressed") }
      ],
      { cancelable: false }
    );
    }

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.container__scroll} showsVerticalScrollIndicator={false}>
        {typesOfBill.map((value, index)=>{
          return <FieldCalc value={value} key={index} reportValue={reportValueOfChild} formatterPeso={formatNumber}/>
        })}
        <Button
          title="Calcular"
          style={styles.container__button}
          onPress={calculateValue}
        />
        <StatusBar style="auto" />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container__button:{
    marginBottom:'20%',
  },
  container__scroll:{
    alignItems: 'center',
    marginTop:'20%',
  },
});
