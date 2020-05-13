import {
  StyleSheet
} from 'react-native';
import colors from '../../styles/colors';

const songCardHeight = 110;

const songCardStyles = StyleSheet.create({
  songCardContainer: {
    height: songCardHeight,
    flex: 1,
    width: '85%',
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'flex-start',
    marginBottom: 30,
    backgroundColor: 'transparent',
  },
  songTitle: {
    fontFamily: 'worksans-regular',
    fontSize: 19,
    color: colors.black,
  },
  songArtist: {
    fontFamily: 'worksans-regular',
    fontSize: 16,
    color: colors.black,
  },
  songAlbum: {
    fontFamily: 'worksans-light',
    fontSize: 15,
    color: colors.black,
  },
  albumContainer: {
    width: songCardHeight,
    height: songCardHeight,
    alignItems: 'center',
    borderRadius: 0,
    overflow: 'hidden',
    elevation: 8,
  },
  albumImage: {
    height: '100%',
    resizeMode: 'contain'
  },
  songContainerOutter: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'column',
    paddingLeft: 10
  },
  songContainerInner: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'column'
  },
  division: {
    width: '100%',
    borderTopColor: colors.black,
    borderTopWidth: 1,
    marginTop: 4,
    marginBottom: 4
  },
  albumShading: { 
    position: 'absolute', 
    backgroundColor: 'rgba(0, 0, 0, 0.1)', 
    height: '100%', 
    width: '100%',
    flexDirection: 'column',
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center' 
  },
  statusButton: { 
    width: 40, 
    height: 40, 
    resizeMode: 'contain' 
  },
})

export default songCardStyles;