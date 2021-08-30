import {
  ADD_EVENT,
  DELETE_EVENT,
  JOIN_EVENT,
  GET_ALL_EVENT,
  GET_EVENT,
  EVENT_FETCH_ERROR,
  EVENT_UPDATE_ERROR,
  CLOSE_FORM,
  LEAVE_EVENT
} from '../types';

const eventReducer = (state, action) => {
  switch (action.type) {
    case GET_ALL_EVENT:
      return {
        ...state,
        events: action.payload,
        loading: false
      }
    case ADD_EVENT:
      return {
        ...state,
        events: [action.payload],
        loading: false
      };
    case EVENT_FETCH_ERROR:
    case EVENT_UPDATE_ERROR:
      return {
        ...state,
        error: true
      };
    case DELETE_EVENT:
      return {
        ...state,
        events: state.events.filter(
          (event) => event.id !== action.payload
        ),
        loading: false
      };
    case GET_EVENT:
      return {
        ...state,
        events: action.payload,
        loading: false,
      }
    case JOIN_EVENT:
      return {
        ...state,
        events: action.payload,
        loading: false
      }
    case LEAVE_EVENT:
      return {
        ...state,
        events: action.payload,
        loading: false
      }
    case CLOSE_FORM: {
      return {
        ...state,
        show: false
      }
    }
    default:
      return state;
  }
};
export default eventReducer
