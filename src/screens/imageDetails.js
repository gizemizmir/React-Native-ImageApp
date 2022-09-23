import { View, Text, Image, Dimensions, StyleSheet } from 'react-native'
import React, {useState, useEffect} from 'react'
import { useNavigation, useRoute } from "@react-navigation/native";
import {
  getDocs,
  query,
  collection,
  where,
} from 'firebase/firestore';
import {db} from '../utils/firebase';

const ImageDetails = () => {
  const [user, setUser] = useState(null)
  const {
    params: { imageItem },
  } = useRoute();
  const navigation = useNavigation();

  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    const q = query(collection(db, 'user'), where('id', '==', imageItem.userID));
    await getDocs(q).then(res => {
      const _user = res.docs.map(item => item.data());
      console.log(_user)
      setUser(_user);
    });
  };


  useEffect(() => {
    navigation.setOptions({
      title: `${user?.[0]?.firstName} ${user?.[0]?.lastName} 's photo `,
    });
  }, [user]);


  return (
    <View>
      <Image style={styles.image} source={{uri: imageItem.photoURL}}/>
      <Text style={styles.imageText}>By {user?.[0]?.firstName + ' ' + user?.[0]?.lastName}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  image: {
    width: Dimensions.get("screen").width,
    height: 300,
  },
  imageText: {
    marginTop: 20,
    fontWeight: 'bold',
    fontSize: 18,
  }
});

export default ImageDetails