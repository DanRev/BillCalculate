import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { StyleSheet, Text, View, TextInput, SafeAreaView } from 'react-native';

export default function FieldCalc(props) {
  const [quantity, setQuantity] = useState(0);
  
  function onChangeNumber ( e ) {
    setQuantity(e);
    props.reportValue(e,props.value);
  }

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.container__safeArea}>
        <Text style={styles.safeArea__text}>{props.formatterPeso.format(props.value)}</Text>
        <TextInput
          style={styles.input}
          onChangeText={onChangeNumber}
          placeholder="0"
          keyboardType="numeric"
        />
        </SafeAreaView>
        <Text>{props.formatterPeso.format(quantity*props.value)}</Text>
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
    width: '50%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  container__safeArea:{
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: '5%',
  },
  safeArea__text:{
    marginRight: '5%',
  }
});