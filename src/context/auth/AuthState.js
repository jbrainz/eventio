import { useReducer } from 'react'

import authReducer from './authReducer'
import AuthContext from './authContext'


import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGOUT,
  CLEAR_ERRORS,
} from '../types';

import { axiosInstance } from '../../index'

const AuthState = props => {
  const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    loading: true,
    user: null,
    error: null,
  }

  const [state, dispatch] = useReducer(authReducer, initialState)
  /**
   * @description login handler, that sends a post request to the login endpoint
   * @returns a payload, token and reset token to authenticate the user
   * @param {*email, password} 
   */
  const login = async (formData) => {
    try {
      const res = await axiosInstance.post(`/auth/native`, formData)
      console.log(res.headers)
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res
      })
    } catch (error) {
      dispatch({
        type: LOGIN_FAIL,
        payload: error,
      })
    }
  };

  /**
 * @description register handler, that sends a post request to the register endpoint
 * @returns a payload, token and reset token to authenticate the user
 * @param {*email, password, firstname, lastname}
 */
  const register = async (formData) => {

    try {
      const res = await axiosInstance.post(`/users`, formData);
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res,
      });
    } catch (err) {
      dispatch({
        type: REGISTER_FAIL,
        payload: err,
      });
    }
  }

  /**
* @description logout handler,  logs the user out, and clear the state
* @returns 
* @param {}
*/
  const logout = () => dispatch({ type: LOGOUT })

  const clearErrors = () => dispatch({ type: CLEAR_ERRORS })
  return (
    <AuthContext.Provider value={{
      token: state.token,
      isAuthenticated: state.isAuthenticated,
      loading: state.loading,
      error: state.error,
      user: state.user,
      register,
      clearErrors,
      login,
      logout
    }}>
      {props.children}
    </AuthContext.Provider>
  )
}

export default AuthState
