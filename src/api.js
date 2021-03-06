import axios from 'axios';
import qs from 'qs';

export const signUpAPI = async ({ email, password, name }) => {
  const signUpUrl = 'http://ec2-3-34-5-220.ap-northeast-2.compute.amazonaws.com:8080/auth/signup';
  const params = qs.stringify({
      'email': email,
      'password': password,
      'name': name
  });
  try {
    await axios.post(signUpUrl, params);
    return {
      'success': true,
      'message': 'signUp success !!!'
    }
  } catch (error) {
    console.log('******Error: ', error);
    return { 
      'success': false,
      'message': 'Email already exists.'
    }
  }
};


export const signInAPI = async ({ email, password }) => {
    const signInUrl = 'http://ec2-3-34-5-220.ap-northeast-2.compute.amazonaws.com:8080/auth/login';
    const params = qs.stringify({
        'email': email,
        'password': password,
    });
    try {
      const token = await axios.post(signInUrl, params);
      axios.defaults.headers.common['Authorization'] = token.data;
      return {
        'success': true,
        'token': token.data
      }
    } catch (error) {
      console.log('******Error: ', error);
      return { 
        'success': false,
        'token': ''
      }
    }
  };