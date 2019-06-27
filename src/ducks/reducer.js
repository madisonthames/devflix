import axios from 'axios';

const initialState = {
    user: {}
}

const REGISTER = "REGISTER";
const LOGIN = "LOGIN";
const LOGOUT = "LOGOUT"
const GET_USER = "GET_USER";

export function register(username, password) {
    let data = axios.post("/auth/register", {username, password})
    return {
      type: REGISTER,
      payload: data
    };
  }
  
  export function login(username, password) {
    let data = axios.post("/auth/login", {username, password})
    return {
      type: LOGIN,
      payload: data
    };
  }

  export function logout() {
    let data = axios.post("/auth/logout")
    return {
      type: LOGOUT,
      payload: data
    };
  }
  
  export function getUser() {
    let data = axios.get("/auth/user")
    return {
      type: GET_USER,
      payload: data
    };
  }
  

export default function reducer(state = initialState, action) {
    switch (action.type) {
      case `${REGISTER}_FULFILLED`:
        return { ...state, user: action.payload.data };


      case `${REGISTER}_DENIED`:
            return { ...state, error: "This username is already taken." };
  
      case `${LOGIN}_FULFILLED`:
        return { ...state, user: action.payload.data };
  
      case `${LOGIN}_DENIED`:
        return { ...state, error: "The login info you entered is incorrect" };

      case `${LOGOUT}_FULFILLED`:
            return { ...state, user: action.payload.data };
  
      case `${GET_USER}_FULFILLED`:
        return { ...state, user: action.payload.data };

        default:
            return state;
    }
}
  