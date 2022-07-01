/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React,{useEffect} from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  Button,
  NativeModules,
  NativeEventEmitter,
} from 'react-native';

const {CalendarModule}=NativeModules;
const eventEmitter=new NativeEventEmitter(CalendarModule);

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  useEffect(()=>{
eventEmitter.addListener('EventCount',eventCount=>{
  console.log('EventCount: ',eventCount);
})

return()=>{
  eventEmitter.removeAllListeners()
}
  },[])

const createCalendarEventPromise = async()=>{
try{
 const result=await CalendarModule.createCalendarEventPromise();
 console.log("result",result)
}catch(e){
  const {message}=e;
  console.log("e",message)
}
}

  return (
    <SafeAreaView style={{flex:1, alignItems:'center',justifyContent:'center'}}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <Text>Hello</Text>
      <Button title='Calendar Event Promise' onPress={createCalendarEventPromise} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
