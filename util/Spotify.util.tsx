import { AuthSession } from 'expo';
import { encode  } from 'base-64';
import { APP_CLIENT_ID, APP_CLIENT_SECRET } from 'react-native-dotenv';
import { saveData, getData } from './Storage.util';

globalThis.btoa = encode;
const spotifyURL = 'https://accounts.spotify.com/authorize';
const spotifyAPI_URL = 'https://accounts.spotify.com/api/token';
const spotifyScopes = [
  'user-modify-playback-state', 
  'user-read-currently-playing', 
  'user-read-playback-state', 
  'user-library-modify',
  'user-library-read', 
  'playlist-read-private', 
  'playlist-read-collaborative', 
  'playlist-modify-public',
  'playlist-modify-private', 
  'user-read-recently-played', 
  'user-top-read',
  'ugc-image-upload',
].join(' ');

const getExpiryTime = (time : number) => new Date().getTime() + time * 1000;

export const getAuthCode = async () => {
  let result;
  const redirectUrl = AuthSession.getRedirectUrl();

  try {
    result = await AuthSession.startAsync({
      authUrl: `${spotifyURL}?response_type=code&client_id=${APP_CLIENT_ID}&scope=${encodeURIComponent(spotifyScopes)}&redirect_uri=${encodeURIComponent(redirectUrl)}`
    });
  } catch (err) {
    console.error(err)
  }

  return result.params.code;
}

export const getAuthTokens = async () => {
  try {
    const authorizationCode = await getAuthCode();
    const encodedCredentials = encode(`${APP_CLIENT_ID}:${APP_CLIENT_SECRET}`);
    const redirectUri = AuthSession.getRedirectUrl();

    const reqConfig = {
      method: 'POST',
      headers: {
        Authorization: `Basic ${encodedCredentials}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `grant_type=authorization_code&code=${authorizationCode}&redirect_uri=${
        redirectUri
      }`,
    }

    const response = await fetch(spotifyAPI_URL, reqConfig).then(async (res) => {
      return await res.json();
    })
    
    const {
      access_token,
      refresh_token,
      expires_in,
    } = response;

    const expiryTime = getExpiryTime(expires_in);
    
    await saveData('ACCESS_TOKEN', access_token);
    await saveData('REFRESH_TOKEN', refresh_token);
    await saveData('EXPIRY_TIME', JSON.stringify(expiryTime));

  } catch (err) {
    console.log(`Error getting auth tokens`);
    console.log(err);
  }
}

export const refreshAuthTokens = async () => {
  try {
    const encodedCredentials = encode(`${APP_CLIENT_ID}:${APP_CLIENT_SECRET}`);
    const currRefreshToken = await getData('REFRESH_TOKEN');
    
    const reqConfig = {
      method: 'POST',
      headers: {
        Authorization: `Basic ${encodedCredentials}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `grant_type=refresh_token&refresh_token=${currRefreshToken}`,
    }

    const response = await fetch(spotifyAPI_URL, reqConfig).then(async (res) => {
      return await res.json();
    });
    
    const {
      access_token,
      refresh_token,
      expires_in,
    } = response;

    await saveData('ACCESS_TOKEN', access_token);
    
    if (refresh_token) { 
      await saveData('REFRESH_TOKEN', refresh_token); 
    };

    await saveData('EXPIRY_TIME', expires_in.toString());
  } catch (error) {
    console.log(error);
  }
}
