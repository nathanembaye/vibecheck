import { StyleSheet } from 'react-native';
import colors from './colors';

const generalStyles = StyleSheet.create({
  title: {
    fontFamily: 'sail',
    fontStyle: 'normal',
    fontSize: 40,
    color: colors.black,
  },
  titleButton: {
    fontFamily: 'sail',
    fontStyle: 'normal',
    fontSize: 24,
    color: colors.white,
  },
  text: {
    fontFamily: 'worksans-regular',
    fontStyle: 'normal',
    fontSize: 28,
    color: colors.black,
    textAlign: 'left'
  },
  menuText: {
    fontFamily: 'worksans-light',
    fontStyle: 'normal',
    fontSize: 32,
    color: colors.black,
    textAlign: 'left'
  },
  queryText: {
    fontFamily: 'worksans-regular',
    fontStyle: 'normal',
    fontSize: 22,
    color: colors.black,
  },
  bottomDarkLogo: {
    position: 'absolute', 
    bottom: 30, 
    right: 30,
    height: 40, 
    width: '30%',
    resizeMode: 'contain',
  },
  appContainer: {
    flex: 1,
    alignItems: 'stretch',
  },
});

export default generalStyles;