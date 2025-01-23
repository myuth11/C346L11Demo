import React, { useState, useEffect } from 'react';
import { StatusBar, Button, FlatList, StyleSheet, Text, View } from 'react-native';

const styles = StyleSheet.create({
    listStyle: {
        borderWidth: 1,
        margin: 5,
        padding: 10,
    },
});

const Home = ({ navigation }) => {
    const [myData, setMyData] = useState([]);

    useEffect(() => {
        // Fetch data from the provided endpoint
        const fetchData = async () => {
            try {
                const response = await fetch('https://jsonhost.com/json/9fde369f80a316c9196dc17d9a06f326');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setMyData(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []); // Empty dependency array ensures useEffect runs only once

    const renderItem = ({ item }) => (
        <View style={styles.listStyle}>
            <Text>{item.name}</Text>
        </View>
    );

    return (
        <View>
            <StatusBar />
            <Button
                title="Add Item"
                onPress={() => {
                    navigation.navigate('Add', { datastr: JSON.stringify(myData) });
                }}
            />
            <FlatList
                data={myData}
                keyExtractor={(item, index) => index.toString()}
                renderItem={renderItem}
            />
        </View>
    );
};

export default Home;
