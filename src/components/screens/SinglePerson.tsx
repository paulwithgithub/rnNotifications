//import liraries
import React, { Component, useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';

// create a component
const SignlePerson = ({route}: any) => {
      const params = route.params || {};
      const {personDetailsId, personId} = params;
    console.log(params, 'params')
      const [data, setData] = useState([]);
      const [isLoading, setIsLoading] = useState(true);

      useEffect(() => {
        if (personId) {
          fetch(`https://jsonplaceholder.typicode.com/users/${personId}`)
            .then(res => res.json())
            .then(res => {
              const fetchedDetails: any = [];

              Object.keys(res).forEach(key => {
                fetchedDetails.push({key, value: `${res[key]}`});
              });
              setData(fetchedDetails);
              setIsLoading(false);
            })
            .catch(error => {
              console.log(error);
            });
        } else {
          fetch(`https://jsonplaceholder.typicode.com/users/${personDetailsId}`)
            .then(res => res.json())
            .then(res => {
              const fetchedDetails:any = [];

              Object.keys(res).forEach(key => {
                fetchedDetails.push({key, value: `${res[key]}`});
              });

              setData(fetchedDetails);
              setIsLoading(false);
            })
            .catch(error => {
              console.log(error);
            });
        }
      }, []);

    return (
      <View style={styles.container}>
        {isLoading ? (
          <ActivityIndicator color="blue" size="large" />
        ) : (
          <View style={{paddingTop: 10, paddingHorizontal: 10}}>

            <Text>hi</Text>
            {data.map((person: any) => (
              <Text
                style={{fontSize: 24, paddingBottom: 2}}
                key={person.key}>{`${person.key}: ${person.value}`}</Text>
            ))}
          </View>
        )}
      </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

//make this component available to the app
export default SignlePerson;
