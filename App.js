// App.js
import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import axios from 'axios';

const API_URL = 'https://apihub.staging.appply.link/chatgpt';

const App = () => {
  const [heroName, setHeroName] = useState('');
  const [fairyTale, setFairyTale] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const generateFairyTale = async () => {
    if (!heroName.trim()) {
      alert('Please enter a hero name');
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.post(API_URL, {
        messages: [
          { role: "system", content: "You are a creative fairy tale writer. Create a short, engaging fairy tale for children." },
          { role: "user", content: `Write a fairy tale with a hero named ${heroName}. Keep it brief, around 200 words.` }
        ],
        model: "gpt-4o"
      });

      const { data } = response;
      setFairyTale(data.response);
    } catch (error) {
      console.error('Error generating fairy tale:', error);
      alert('Failed to generate fairy tale. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Fairy Tale Generator</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter hero name"
        value={heroName}
        onChangeText={setHeroName}
      />
      <TouchableOpacity style={styles.button} onPress={generateFairyTale} disabled={isLoading}>
        <Text style={styles.buttonText}>Generate Fairy Tale</Text>
      </TouchableOpacity>
      {isLoading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <ScrollView style={styles.storyContainer}>
          <Text style={styles.storyText}>{fairyTale}</Text>
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f0f0f0',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  button: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  storyContainer: {
    flex: 1,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
  },
  storyText: {
    fontSize: 16,
    lineHeight: 24,
  },
});

export default App;
// End of App.js