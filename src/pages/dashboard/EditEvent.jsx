import React, { useEffect,useState } from 'react'
import styled from 'styled-components'

import FormInputs from '../../components/inputs/FormInputs'
import { Button } from '../../components/button/Button'
import Header from '../../components/layouts/header/Header'
import { RoundedButon } from '../../components/button/Button'

import {
  EventIdWrapper,
  Wrapper,
  CardAttendees,
  InnerWrapper,
  ButtonHolder,
} from './DashboardDetails'
import { useContext } from 'react'
import EventContext from '../../context/events/eventContext'
import useWindowDimensions from '../../utils/responsive'

const ActionWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`

const ButtonWrapper = styled.div`
  margin-right: 119px;
`
const FormWrapper = styled.div`
  width: 795px;
  margin-left: 120px;
  padding: 32px;
  background-color: #ffffff;
  margin-right: 17px;
  @media (max-width: 1200px) {
    width: 95%;
    margin:10px;
  }
`
const InnerWrapperExtends = styled(InnerWrapper)`
display: flex;
  justify-content: flex-start;
  margin-top: 41px;
  margin-bottom: 20px;
`


const EditEvent = ({match}) => {

   const { width } = useWindowDimensions()
  const [event, setEvent] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    capacity: 1,
  })

  const { title, date, description, time, capacity } = event
   const eventsId = match.params.id
     const eventContext = useContext(EventContext)
     const { getEvent, events } = eventContext

     useEffect(() => {
       getEvent(eventsId)
       if (events) {
         setEvent({
           title: events.title,
           description: events.description,
           date: new Date().getUTCFullYear(),
           capacity: events.capacity,
         })
       }
       //eslint-disable-next-line
     },[eventsId])

  return (
    <>
      <Header />
      <Wrapper>
        <ActionWrapper>
          <EventIdWrapper>ID: {eventsId}</EventIdWrapper>
          <ButtonWrapper>
            <Button theme='outline' label='Delete event' size='main-small' />
          </ButtonWrapper>
        </ActionWrapper>
        <InnerWrapperExtends>
          <FormWrapper>
            <FormInputs
              bg='#ffffff'
              type='text'
              name='date'
              label='Date'
              value={date}
            />
            <FormInputs type='time' name='time' label='Time' value={time} />
            <FormInputs type='text' name='title' label='Title' value={title} />
            <FormInputs
              type='text'
              name='description'
              label='Description'
              value={description}
            />
            <FormInputs
              type='number'
              name='capacity'
              label='Capacity'
              value={capacity}
            />
          </FormWrapper>
        {width > 1200 && <CardAttendees />}
        </InnerWrapperExtends>
        <ButtonHolder>
          <RoundedButon icon='check' variant='secondary' />
        </ButtonHolder>
      </Wrapper>
    </>
  )
}

export default EditEvent
