import React, { useEffect, useContext, useReducer } from 'react';
import { AuthContext } from '../App';

import Card from './Card';

const initialState = {
  lessons: [],
  isFetching: false,
  hasError: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_LESSONS_REQUEST':
      return {
        ...state,
        isFetching: true,
        hasError: false,
      };
    case 'FETCH_LESSONS_SUCCESS':
      return {
        ...state,
        isFetching: false,
        lessons: action.payload,
      };
    case 'FETCH_LESSONS_FAILURE':
      return {
        ...state,
        isFetching: false,
        hasError: true,
      };
    default:
      return state;
  }
};

const Home = () => {
  const { state: authState } = useContext(AuthContext);
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    dispatch({
      type: 'FETCH_LESSONS_REQUEST',
    });

    fetch('/api/lessons', {
      headers: {
        Authorization: `Bearer ${authState.token}`,
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw response;
      })
      .then((responseObject) => {
        console.log(responseObject);
        dispatch({
          type: 'FETCH_LESSONS_SUCCESS',
          payload: responseObject,
        });
      })
      .catch((error) => {
        console.log(error);
        dispatch({
          type: 'FETCH_LESSONS_FAILURE',
        });
      });
  }, [authState.token]);

  return (
    <div className="home">
      {state.isFetching ? (
        <span className="loader">Loading...</span>
      ) : state.hasError ? (
        <span className="error">An error has occurred.</span>
      ) : (
        <>
          {state.lessons.length > 0 &&
            state.lessons.map((lesson) => (
              <Card key={lesson.id.toString()} lesson={lesson} />
            ))}
        </>
      )}
    </div>
  );
};

export default Home;
