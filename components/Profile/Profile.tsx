import React from 'react';
import { Text, View, TouchableOpacity, Image } from 'react-native';
import profileStyles from './Profile.styles';
import personLogo from '../../assets/img/profile_icon.png';
import thumbs from '../../assets/img/100.png';
import Menu from '../Menu/Menu';
import {getProfileData, getTopArtists} from '../../util/SpotifyAPI.util';
import { ProfileInterfaceProps, ProfileInterfaceState } from '../../interfaces/Profile.interface';

const emptyState = {
  vibeColors: ['#FFFFFF','#FFC300','#5187F0','#FF351A','#8600B6','#00cc00'], //White, yellow, blue,orange,purple, green
  vibe: 0,
}

export default class Profile extends React.Component<ProfileInterfaceProps,ProfileInterfaceState> {
  constructor(props) {
    super(props);
    this.state = {
      ...props,
      ...emptyState
    }
  };

  async componentDidMount() {
    const topArtist = await getTopArtists();

    this.setState({ topArtist: topArtist })
  }

  changeColor = () => { 
    if(emptyState.vibe==5){ emptyState.vibe = -1;}

    else{this.setState({ vibe: ++emptyState.vibe}) }
  }
  
  render() {
    const {vibe, vibeColors, topArtist} = this.state;
    const { navigation } = this.props;

    return (
      <View style={{ flex: 1, alignContent: 'center', flexDirection: 'column', alignItems: 'center'}}>
        <Menu navigation={navigation} />
        <View style={profileStyles.profile}>
          <View style={[profileStyles.middleContainer]}>
            <TouchableOpacity onPress={this.changeColor}>
              {getProfileData().images.length!==0 ? 
              (<Image style={{width:200, height: 300, resizeMode: 'contain' }} source={{uri:getProfileData().images[0].url}} />) 
              : null}
              <Text style={[profileStyles.text, {color:vibeColors[vibe]}]}>{`${getProfileData().display_name}'s vibe`}</Text>  
            </TouchableOpacity>
          </View>   
          <Text style={[profileStyles.text,{marginTop: 20}]}>{`Your favorite artist: ${topArtist}`}</Text>  
          {/* <View style={[profileStyles.lowerContainer]}>
            <View style={profileStyles.elementMargin}>
              <Image style={{width:50, height: 50, resizeMode: 'contain' }} source={thumbs} />
              <Image style={{width:50, height: 50, resizeMode: 'contain' }} source={thumbs} />
            </View>
            <View style={profileStyles.elementMargin}>
              <Image style={{width:50, height: 50, resizeMode: 'contain' }} source={thumbs} />
              <Image style={{width:50, height: 50, resizeMode: 'contain' }} source={thumbs} />
            </View>
            <View style={profileStyles.elementMargin}>
              <Image style={{width:50, height: 50, resizeMode: 'contain' }} source={thumbs} />
              <Image style={{width:50, height: 50, resizeMode: 'contain' }} source={thumbs} />
            </View>
          </View> */}

        </View>
      </View>
    );
  }
}
