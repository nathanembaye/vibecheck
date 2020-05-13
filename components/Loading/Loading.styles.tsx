import { StyleSheet, TouchableOpacity } from 'react-native';
import colors from '../../styles/colors';
import constants from '../../styles/constats';

const loadingStyles = StyleSheet.create({
  loading: {
    backgroundColor: colors.black,
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    alignContent: 'center',
  },
  title: {
    fontFamily: 'sail',
    fontStyle: 'normal',
    fontSize: 30,
    color: colors.white,
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
    width: '80%',
  },
  elementMargin: {
    marginBottom: 20,
  }
})

export default loadingStyles;