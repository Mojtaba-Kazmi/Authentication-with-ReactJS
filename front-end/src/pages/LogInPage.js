import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useToken } from '../auth/useToken';
import { useQueryParams } from '../util/useQueryParams';

const LogInPage = () => {
    const [emailValue, setEmailValue] = useState("");
    const [passwordValue, setPasswordValue] = useState("");
    const [googleOauthUrl, setGoogleOauthUrl] = useState('');
    const [errorMessage, setErrorMessage] = useState("");
    const [, setToken] = useToken();
    const { token: oauthToken } = useQueryParams();
    const history = useHistory();

    useEffect(() => {
      if (oauthToken) {
        setToken(oauthToken);
        history.push('/');
      }
    }, [oauthToken, setToken, history]);

    useEffect(() => {
      const loadOauthUrl = async () => {
        try {
          const response = await axios.get('/auth/google/url');
          const { url } = response.data;
          setGoogleOauthUrl(url);
        } catch (e) {
          console.log(e);
        }
      }

      loadOauthUrl();
    }, []);

    const onLogInClicked = async () => {
      const response = await axios.post('/api/login', {
        email: emailValue,
        password: passwordValue,
      });

      const { token } = response.data;
      setToken(token);
      history.push('/');
    }

  return (
    <div className='content-container'>
      <h1>Log In</h1>
      {errorMessage && <div className='fail'>{errorMessage}</div>}
      <input
        value={emailValue}
        onChange={(e) => setEmailValue(e.target.value)}
        placeholder='Email Address'
      />
      <input
        value={passwordValue}
        onChange={(e) => setPasswordValue(e.target.value)}
        type= 'password'
        placeholder='Password'
      />
      <button
        disabled={!emailValue || !passwordValue} 
        onClick={onLogInClicked}>Log In</button>
      <button
        onClick={() => history.push('/forgot-password')}>Forgot Password</button>
      <button
        onClick={() => history.push('/signup')}>Don't have an account? Sign Up</button>
      <button
        disabled={!googleOauthUrl}
        onClick={ () => { window.location.href = googleOauthUrl }}
      >Log in with Google</button>
    </div>
  )
}

export default LogInPage;



