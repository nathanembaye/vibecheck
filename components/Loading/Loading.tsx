import React from 'react';
import { View, Image, Animated, Easing } from 'react-native';
import loadingStyles from './Loading.styles';
import splashLogo from '../../assets/img/app_dark_logo.png';
import loadingLogo from '../../assets/img/loading_logo.png';
import generalStyles from '../../styles/generalStyles';
import { loadAsync } from 'expo-font';
import { LoadingInterfaceProps, LoadingInterfaceState } from '../../interfaces/Loading.interface';
import { getData } from '../../util/Storage.util';
import { refreshAuthTokens } from '../../util/Spotify.util';
import { initializeAPI } from '../../util/SpotifyAPI.util';

const emptyState = {
  spinValue: new Animated.Value(0),
  colorNumber: new Animated.Value(0),
  isReady: false
}

Animated.loop( Animated.timing(emptyState.spinValue, {
  toValue : 1,
  duration : 3000,
  easing: Easing.linear
})).start();

Animated.loop( Animated.timing(emptyState.colorNumber, {
  toValue : 1,
  duration : 3000,
})).start();

const spin = emptyState.spinValue.interpolate({
  inputRange: [0,1],
  outputRange:['0deg','360deg'],
})

const color = emptyState.colorNumber.interpolate({
  inputRange: [0,1],
  outputRange: ['#FFFFFF','#000000']
});

const wait = async (time) => (
  new Promise((resolve) => {
    setTimeout(() => {
      return resolve('');
    }, time);
  })
)

export default class Profile extends React.Component <LoadingInterfaceProps, LoadingInterfaceState> {
  constructor(props) {
    super(props);
    this.state = {
      ...emptyState
    };
  }

  async componentDidMount() {
    const { navigate } = this.props.navigation;
    const { isReady } = this.state;

    if (!isReady) {
      await loadAsync({
        'sail': require('../../assets/fonts/Sail.ttf'),
        'worksans-regular': require('../../assets/fonts/WorkSans-Regular.ttf'),
        'worksans-light': require('../../assets/fonts/WorkSans-Light.ttf')
      });
  
      this.setState({
        isReady: true,
      });
    }

    await wait(2000);

    const currentTokenTime = await getData('EXPIRY_TIME');
    const currentDate = new Date().getTime();

    if (currentTokenTime !== undefined) {
      if (JSON.parse(currentTokenTime) < currentDate) {
        await refreshAuthTokens();
        const newToken = await getData('ACCESS_TOKEN');
        
        initializeAPI(newToken);
        navigate('Landing');
      } else {
        const oldToken = await getData('ACCESS_TOKEN');

        initializeAPI(oldToken);
        navigate('Landing');
      }
    } else {
      navigate('Login');
    }
  }

  render() {
    const { isReady } = this.state;

    return (
      (isReady === true ? (
        <View style={loadingStyles.loading}>
          <View style={loadingStyles.loadingContainer}>
            <Animated.Image style={[{transform:[{rotate: spin}]},{ height: 200, resizeMode: 'contain'}, loadingStyles.elementMargin]} source={loadingLogo} />
            <Animated.Text style={[loadingStyles.title,{color:color}]}> Signing you in...</Animated.Text>
          </View>
          <Image style={generalStyles.bottomDarkLogo} source={splashLogo} />
        </View>
      ) : null)
    );
  }
}

