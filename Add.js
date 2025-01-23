import React, { useState } from 'react';
import { StatusBar, View, Button, Text, TextInput, Alert } from 'react-native';

const Add = ({ navigation, route }) => {
    const [name, setName] = useState("");

    return (
        <View>
            <StatusBar />
            <Text>Name:</Text>
            <TextInput
                style={{ borderWidth: 1 }}
                onChangeText={(text) => setName(text)}
            />
            <Button
                title="Submit"
                onPress={() => {
                    let mydata = JSON.parse(route.params.datastr);
                    let item = { name: name };
                    mydata.push(item);

                    fetch("https://jsonhost.com/json/9fde369f80a316c9196dc17d9a06f326", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: "lbzm9lxce7v29aphsnmyph0x3acs6caa",
                        },
                        body: JSON.stringify(mydata),
                    })
                        .then((response) => {
                            if (response.ok) {
                                navigation.navigate("Home");
                            } else {
                                Alert.alert("Error", "Failed to submit data");
                            }
                        })
                        .catch((error) => {
                            Alert.alert("Error", "An error occurred: " + error.message);
                        });
                }}
            />
        </View>
    );
};

export default Add;
