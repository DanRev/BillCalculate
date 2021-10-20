import { StatusBar } from 'expo-status-bar';
import React, {useState , useEffect} from 'react';
import * as SecureStore from 'expo-secure-store';
import { StyleSheet, View, Button, Alert, ScrollView } from 'react-native';
import FieldCalc from './components/FieldCalc';
import numeral from 'numeral';

const typesOfBill = ['50000','20000','10000','5000','2000','1000','500','200','100','50','1'];


export default function App() {
  const [valueFinal,setValueFinal] = useState({});
  const [value, setValue] = React.useState('');

  /**
   * Method in charge of report value for everyone child
   * @param {*} quantity quantity of bills has taken
   * @param {*} typeOfBill type of bill has his child
   */
  function reportValueOfChild(quantity,typeOfBill) {
      var total = quantity * typeOfBill;
      valueFinal[typeOfBill] = total;
  }

  /**
   * Format number with col indication
   * @param {*} value 
   * @returns value of format
   */
  function formatNumber(value) {
    return numeral(value).format('0,0');
  }

  /**
   * Calculate the total of theirs bills
   */
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

  async function saveDate(key, value){
    var key = 'date';
    var date = new Date();
    await SecureStore.setItemAsync(key , date.toDateString());
  }

  async function getValueFor(key) {
    let result = await SecureStore.getItemAsync(key);
    if (result) {
      setValue(result);
      console.log(result);
    } else {
      alert('error date not found');
    }
  }  
  
  useEffect(async() => {
    var data = await getValueFor('key');
    setValue(data);
  },[]);

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.container__scroll} showsVerticalScrollIndicator={false}>
        {typesOfBill.map((value, index)=>{
          return <FieldCalc value={value} key={index} reportValue={reportValueOfChild} formatterPeso={formatNumber}/>
        })}
        {value!=='' && <View>{"La fecha del ultimo cuadre fue "+value}</View>}
        <View style={styles.container__buttons}>
          <Button
            title="Calcular"
            style={styles.container__buttonItem}
            onPress={calculateValue}
          />
          <Button
            title="Guardar"
            style={styles.container__buttonItem}
            onPress={saveDate}
          />   
        </View>
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
  container__buttons:{
    display:'flex',
    flexDirection: 'row',
    width: '100%',
    display: 'flex',
    justifyContent: 'space-around',
  },
  container__buttonItem:{
    marginBottom:'20%',
    marginRight: '1em',
  },
  container__scroll:{
    alignItems: 'center',
    marginTop:'20%',
  },
});
