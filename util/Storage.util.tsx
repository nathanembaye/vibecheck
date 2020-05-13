import { AsyncStorage } from 'react-native';

export const saveData = async (key: string, value: string) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (error) {
    console.log(`Error saving ${key} token`);
    console.log(error);
  }
}

export const getData = async (key: string) => {
  try {
    const data = await AsyncStorage.getItem(key);
    if (data) {
      return data;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
}

export const deleteData = async (key: string) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    console.log(error);
  }
}