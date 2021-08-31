import styled from 'styled-components'
import FormInputs from '../../components/inputs/FormInputs'
import Header from '../../components/layouts/header/Header'
import { useContext, useState } from 'react'
import EventContext from '../../context/events/eventContext'
import { Button } from '../../components/button/Button'
import Message from '../../components/error-message/Message'


const FormWrapper = styled.div`
  background: #ffffff;
  box-shadow: 0px 2px 3px rgba(0, 0, 0, 0.108696);
  border-radius: 2px;
  padding-left: 32px;
  padding-right: 32px;
  width: 480px;
  height: fit-content;
  margin-bottom: 30px;
  padding-top: 41px;
  padding-bottom: 40px;
  @media (max-width: 1366px) {
    padding-left: 22px;
    padding-right: 22px;
    padding-top: 31px;
    padding-bottom: 20px;
    margin-bottom: 30px;
  }
  @media (max-width: 1200px){
    margin: 10px;
  }
`
const FormTitle = styled.h3`
  font-family: Hind;
  font-style: normal;
  font-weight: normal;
  font-size: 28px;
  line-height: 48px;
  text-align: center;
  color: #323c46;
`
const FormSubtitle = styled.p`
  font-family: Hind;
  font-style: normal;
  font-weight: normal;
  font-size: 18px;
  line-height: 24px;
  text-align: center;
  color: #949ea8;
`
const Container = styled.div`
  justify-content: center;
  display: flex;
  align-items: center;
  height: 100%;
  position: relative;
`
const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
`
const CreateEvent = ({ history }) => {

  const [event, setEvent] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    capacity: 1,
  })

  const { title, date, description, time, capacity } = event
  const eventContext = useContext(EventContext)
  const [componetError, setError] = useState('')
  const [createError, setCreateError] = useState(false)
  const { show, error, addEvent } = eventContext
  const onChange = (e) => {
    if(createError){
      setCreateError(false)
    }
    setEvent({
      ...event,
      [e.target.name]: e.target.value,
    })
  }

  const onSubmit = (e) => {
    e.preventDefault()
    const d = new Date(`${date} ${time}`)
    if (
      title === '' ||
      date === null ||
      description === '' ||
      time === '' ||
      capacity < 1 
    ) {
      return setError('Enter valid event details')
    } else if (d < new Date()) {
      return setError('Event has to be in the future')
    } else if(capacity > 50){ 
        setCreateError(true)
      return setError('Capacity can not be more than 50') } else {
      addEvent({
        title,
        description,
        startsAt: `${d.toISOString()}`,
        capacity,
      })
      history.push('/')
    }
  }
  return (
    <>
      <Header modalClose={() => history.push('/')} close={show} />
      {show ? (
        <Container>
          <FormWrapper>
            <form onSubmit={onSubmit} autoComplete='of'>
              <FormTitle>Create new event</FormTitle>
              {error || createError ? (
                <Message message={componetError} />
              ) : (
                <FormSubtitle>Enter details below</FormSubtitle>
              )}
              <FormInputs
                onChange={onChange}
                value={title}
                name='title'
                type='text'
                required
                label='Title'
              />
              <FormInputs
                onChange={onChange}
                value={description}
                name='description'
                type='text'
                label='Description'
              />
              <FormInputs
                onChange={onChange}
                value={date}
                name='date'
                type='date'
                label='Date'
              />
              <FormInputs
                onChange={onChange}
                value={time}
                name='time'
                type='time'
                label='Time'
              />
              <FormInputs
                onChange={onChange}
                value={capacity}
                name='capacity'
                type='number'
                label='Capacity'
              />
              <ButtonWrapper>
                <Button
                  type='submit'
                  label='create event'
                  variant='primary'
                  size='main'
                />
              </ButtonWrapper>
            </form>
          </FormWrapper>
        </Container>
      ) : null}
    </>
  )
}

export default CreateEvent
