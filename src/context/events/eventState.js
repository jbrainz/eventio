import eventReducer from './eventReducer'
import { useReducer } from 'react'


import EventContext from './eventContext'

import {
  ADD_EVENT,
  GET_ALL_EVENT,
  GET_EVENT,
  DELETE_EVENT,
  JOIN_EVENT,
  LEAVE_EVENT,
  EVENT_FETCH_ERROR,
  CLOSE_FORM
} from '../types'
import { axiosInstance } from '../..'

const EventState = props => {
  const initialState = {
    events: null,
    error: null,
    loading: false,
    show: true,
    filterDate: null,
  }

  const [state, dispatch] = useReducer(eventReducer, initialState)

  //get all events
  const getAllEvent = async () => {
    try {
      const res = await axiosInstance.get('/events')
      dispatch({ type: GET_ALL_EVENT, payload: res.data })
    } catch (error) {
      dispatch({ type: EVENT_FETCH_ERROR, payload: error.response })
    }
  }
  // this action adds a new event to the API endpoint
  const addEvent = async (event) => {
    try {
      const res = await axiosInstance.post('/events', event)
      dispatch({ type: ADD_EVENT, payload: res.data })
    } catch (error) {
      dispatch({ type: EVENT_FETCH_ERROR, payload: error })
      console.log(error);
    }
  }
  // deletes an event from the database
  const deleteEvent = async (id) => {
    try {
      await axiosInstance.delete(`/events/${id}`)
      dispatch({
        type: DELETE_EVENT,
        payload: id,
      })
    } catch (error) {
      dispatch({
        type: EVENT_FETCH_ERROR,
        payload: error.response
      })
    }
  }

  //gets a specific event with ID
  const getEvent = async (id) => {
    try {
      const res = await axiosInstance.get(`/events/${id}`)
      dispatch({
        type: GET_EVENT,
        payload: res.data
      })
    } catch (error) {
      dispatch({
        type: EVENT_FETCH_ERROR,
        payload: error.response
      })
    }
  }

  // This handles the join event action, requires an id to be passed as a param
  const joinEvent = async (id) => {
    try {
      const res = await axiosInstance.post(`/events/${id}/attendees/me`)
      dispatch({
        type: JOIN_EVENT,
        payload: res.data
      })
      getAllEvent()
    } catch (error) {
      dispatch({
        type: EVENT_FETCH_ERROR,
        payload: error.response
      })
      console.log(error);
    }
  }
  //  handler that takes in the id event as the parameter, fires the leave event action to the api.
  const leaveEvent = async (id) => {
    try {
      const res = await axiosInstance.delete(`/events/${id}/attendees/me`)
      dispatch({
        type: LEAVE_EVENT,
        payload: res.data
      })
      getAllEvent()
    } catch (error) {
      dispatch({
        type: EVENT_FETCH_ERROR,
        payload: error.response
      })
    }
  }
  return (
    <EventContext.Provider value={{
      events: state.events,
      error: state.error,
      addEvent,
      leaveEvent,
      joinEvent,
      getEvent,
      deleteEvent,
      getAllEvent,
      show: state.show,
      filterDate: state.filterDate,
      loading: state.loading
    }}>
      {props.children}
    </EventContext.Provider>
  )
}

export default EventState
