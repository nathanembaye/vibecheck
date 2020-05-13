import {
  StyleSheet
} from 'react-native';
import colors from '../../styles/colors';
import constants from '../../styles/constats';

const vibeCheckStyles = StyleSheet.create({
  vibecheckScroll: {
    flex: 1,
    backgroundColor: colors.yellow,
  },
  vibecheckContainer: {
    alignContent: 'center',
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center'
  },
  vibecheckHeader: {
    width: '85%',
    marginTop: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  queryBox: {
    borderColor: 'transparent',
    borderBottomColor: colors.white,
    borderBottomWidth: 2,
    flexWrap: 'wrap',
    flexDirection: 'row',
    color: colors.black,
    flex: 1,
    marginRight: 20,
    textAlign: 'center',
  },
  searchContainer: {
    height: 50,
    width: 50,
    backgroundColor: 'black',
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'center',
    padding: 6,
    elevation: 8,
    borderRadius: constants.borderRadius
  },
  searchIconContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    shadowColor: 'black',
  },
  searchIcon: {
    height: '100%',
    resizeMode: 'contain'
  },
});

export default vibeCheckStyles;