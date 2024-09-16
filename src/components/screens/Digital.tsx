//import liraries
import React, {Component, useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  FlatList,
  Pressable,
  Alert,
  SafeAreaView,
} from 'react-native';
import Separator from './Seperator';


const Digital = ({navigation}: any) => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const renderList = ({item}: any) => {
    return (
      <Pressable onPress={() => navigation.navigate('SinglePerson', {personDetailsId: item.id})}>
        <Text style={{fontSize: 24, color: '#000'}}>{item.name}</Text>
      </Pressable>
    );
  };

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(res => res.json())
      .then(res => {
        setData(res);
        setIsLoading(false);
      })
      .catch(error => {
        console.log(error, 'error');
      });
  }, []);


  return (
    <SafeAreaView>
      <View style={styles.container}>
        {isLoading ? (
          <ActivityIndicator color="blue" size="large" />
        ) : (
          <>
            <FlatList
              data={data}
              contentContainerStyle={{
                paddingVertical: 20,
              }}
              keyExtractor={item => item.id}
              ItemSeparatorComponent={Separator}
              renderItem={renderList}
            />
          </>
        )}
      </View>
    </SafeAreaView>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

//make this component available to the app
export default Digital;
