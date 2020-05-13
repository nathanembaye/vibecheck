import React from 'react';
import { Text, View, Image,TouchableOpacity, Animated } from 'react-native';
import menuStyles from './Menu.styles';
import menuLogo from '../../assets/img/app_dark_logo.png';
import menuLogoLight from '../../assets/img/app_light_logo.png';
import burger from '../../assets/img/menu.png';
import darkBurger from '../../assets/img/menu_dark.png';
import menuIcon from '../../assets/img/icon_menu.png';
import menuIconLight from '../../assets/img/icon_menu_light.png';
import whiteDot from '../../assets/img/whitedot.png';
import purpleDot from '../../assets/img/purpledot.png';
import yellowDot from '../../assets/img/yellowdot.png';
import blueDot from '../../assets/img/bluedot.png';
import blackDot from '../../assets/img/blackdot.png';
import orangeDot from '../../assets/img/orangedot.png';
import { deleteData as yeet } from '../../util/Storage.util';

import { MenuInterfaceProps, MenuInterfaceState } from '../../interfaces/Menu.Interface';

const emptyState = {
  showDropBox: false,
  animation: new Animated.Value(0)
}

const menuItem = (navFunction, target, dotSrc, text) => {
  if (target === "LogOut") {
    return (
      <View style={menuStyles.elementMargin} key={`${text}-id`}>
        <TouchableOpacity onPress={async () => {
          await yeet('ACCESS_TOKEN');
          await yeet('REFRESH_TOKEN');
          await yeet('EXPIRY_TIME');
          
          navFunction('Login');
        }} style={menuStyles.option}>
          <Image style={menuStyles.dotStyle} source={dotSrc} />
          <Text style={menuStyles.text}>{text}</Text>
        </TouchableOpacity>
      </View>
    )
  } else {
    return (
      <View style={menuStyles.elementMargin} key={`${text}-id`}>
        <TouchableOpacity onPress={() => navFunction(target)} style={menuStyles.option}>
          <Image style={menuStyles.dotStyle} source={dotSrc} />
          <Text style={menuStyles.text}>{text}</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const menuItems = {
  'Vibecheck': [yellowDot, 'Vibecheck'],
  'Playlist check': [whiteDot,'PlaylistCheck'],
  'Your playlists': [blackDot,'Playlists'],
  'Your profile': [blueDot,'Profile'],
  'About us': [purpleDot,'About'],
  'Log out': [orangeDot,'LogOut'] //? This does actually redirect to a "logout page, it takes you to loading"
};

Animated.timing(emptyState.animation, {
  toValue : 1,
  duration : 1000
}).start();

if(emptyState.showDropBox==true){ emptyState.animation.setValue(0)}

export default class Menu extends React.Component<MenuInterfaceProps,MenuInterfaceState> {
  constructor(props) {
    super(props);
    this.state = {
      ...props,
      ...emptyState
    }
  };
  
  changeContent = () =>{ 
    this.setState({ 
      showDropBox: !this.state.showDropBox
    })
  }

  goToLanding = (navigation) => {
    navigation('Landing');

    this.setState({ showDropBox: false })
  }

  render() {
    const { showDropBox, animation } = this.state;
    const { navigate, state } = this.props.navigation;

    return (
      <View style={[menuStyles.menuHeader, (state.routeName === "Landing" && !showDropBox ? menuStyles.landing : null)]}>
        <View style={menuStyles.menuHeaderItems}>
          <TouchableOpacity onPress={this.changeContent}>
            <Image style={{ width: 50, resizeMode: 'contain' }} source={(state.routeName === "Landing" && !showDropBox ? darkBurger : burger)} />
          </TouchableOpacity>
          {(!showDropBox && state.routeName !== "Landing")? (<Text style={menuStyles.routeText}> {state.routeName} </Text>): 
          (<Image style={{ width:180, resizeMode: 'contain', marginLeft: 4 }} source={(!showDropBox ? null: menuLogo)} />)}
          <View style={menuStyles.rightIcon}>
            <TouchableOpacity onPress={() => this.goToLanding(navigate)}>
              <Image style={{ width: 45, height: 45, resizeMode: 'contain' }} source={(state.routeName === "Landing" && !showDropBox ? menuIconLight : menuIcon)} />
            </TouchableOpacity>
          </View>
        </View>
        {showDropBox ? 
          <Animated.View style={[{opacity: animation}, menuStyles.body]}>
            <View style={menuStyles.menuContainer}>
              {Object.keys(menuItems).map((currItem) => (
                menuItem(navigate, menuItems[currItem][1], menuItems[currItem][0], currItem)
              ))}
            </View>
          </Animated.View> : 
        null}  
      </View>
    );
  }
}