import React from 'react'
import { StyleSheet, Text, View, Image, Switch } from 'react-native'
import firebase from 'firebase'
import { RFValue } from 'react-native-responsive-fontsize'

export default class Profile extends React.Component {
  constructor() {
    super()
    this.state = {
      theme: 'light',
      name: 'Loading Name',
      image: '',
    }
  }

  async fetchUser() {
    let image = '',
      name = 'Loading Name',
      theme = 'light'
    await firebase
      .database()
      .ref('/users/' + firebase.auth().currentUser.uid)
      .on('value', function (snapshot) {
        theme = snapshot.val().current_theme
        name = `${snapshot.val().first_name} ${snapshot.val().last_name}`
        image = snapshot.val().profile_picture
      })
    this.setState({
      theme: theme,
      name: name,
      image: image,
    })
  }

  componentDidMount() {
    this.fetchUser()
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.first}>
          <Image
            source={
              this.state.image === ''
                ? require('../assets/profile_img.png')
                : { uri: this.state.image }
            }
            style={styles.image}
          />
        </View>
        <View style={styles.second}>
          <Text>{this.state.name}</Text>
          <Switch />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  first: {
    flex: 0.4,
    backgroundColor: '#7e4',
    alignItems: 'center',
    justifyContent: 'center',
  },
  second: {
    flex: 0.6,
    backgroundColor: '#fed',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    height: RFValue(40),
    width: RFValue(40),
    borderRadius: RFValue(200),
  },
})
