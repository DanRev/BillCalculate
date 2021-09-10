import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { StyleSheet, View, Button, Alert } from 'react-native';
import FieldCalc from './fieldCalc';

const typesOfBill = ['50000','20000','10000','5000','2000','1000','500','200','100','50'];


export default function App() {
  const [valueFinal,setValueFinal] = useState([]);

  const formatterPeso = new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0
  })

  function reportValueOfChild(quantity,typeOfBill) {
    var total = quantity * typeOfBill;
    setValueFinal([...valueFinal,total]);
  }

  function calculateValue(){
    const reducer = (previousValue, currentValue) => previousValue + currentValue;
    var fullValue = valueFinal.reduce(reducer);
    console.log('El total es: ',formatterPeso.format(fullValue));
  }


  return (
    <View style={styles.container}>
      {typesOfBill.map((value, index)=>{
        return <FieldCalc value={value} key={index} reportValue={reportValueOfChild} formatterPeso = {formatterPeso}/>
      })}
      <Button
        title="Calcular"
        onPress={calculateValue}
      />
      <StatusBar style="auto" />
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
});
