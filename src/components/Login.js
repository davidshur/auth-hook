import React, { useState, useContext, useReducer } from 'react';
import { AuthContext } from '../App';

const Login = () => {
  const { dispatch } = useContext(AuthContext);
  const initialState = {
    email: '',
    password: '',
    isSubmitting: false,
    errorMessage: null,
  };

  const [data, setData] = useState(initialState);

  const handleChange = (event) => {
    setData({
      ...data,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setData({
      ...data,
      isSubmitting: true,
      errorMessage: null,
    });

    fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: data.email,
        password: data.password,
      }),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw response;
      })
      .then((responseObject) => {
        dispatch({
          type: 'LOGIN',
          payload: responseObject,
        });
      })
      .catch((error) => {
        setData({
          ...data,
          isSubmitting: false,
          errorMessage: error.message || error.statusText,
        });
      });
  };

  return (
    <div className="login-container">
      <div className="card">
        <div className="container">
          <form onSubmit={handleSubmit}>
            <h1>Log In</h1>
            <label htmlFor="email">
              Email Address
              <input
                type="text"
                name="email"
                id="email"
                value={data.email}
                onChange={handleChange}
              />
            </label>
            <label htmlFor="password">
              Password
              <input
                type="password"
                name="password"
                id="password"
                value={data.password}
                onChange={handleChange}
              />
            </label>
            {data.errorMessage && (
              <span className="form-error">{data.errorMessage}</span>
            )}
            <button disabled={data.isSubmitting}>
              {data.isSubmitting ? 'Loading...' : 'Login'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
