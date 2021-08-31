import { useState } from 'react'
import styled from 'styled-components'

import Header, { DropDown } from './header/Header'
import { useContext, useEffect } from 'react'
import EventContext from '../../context/events/eventContext'
import { CardHolder } from '../dashboard/Cards'

import { Container } from '../dashboard/Cards'
import { TextWrapper } from '../button/Button'
import useWindowDimensions from '../../utils/responsive'

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 24px;
  margin-top: 103px;
  margin-bottom: 39px;
  overflow: hidden;
  @media (max-width: 1200px) {
    margin-top: 32px;
  }
`

const FilterHolder = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: auto;
  height: 100%;
  @media (max-width: 1200px) {
    margin-left: 31px;
  }
  margin-left: 120px;
`
const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const EventsTag = styled.h4`
  font-family: Hind;
  font-style: normal;
  font-weight: 600;
  font-size: 12px;
  line-height: 24px;
  width: 100%;
  letter-spacing: 1px;
  color: ${(props) => (props.t ? '#323C46' : '#A9AEB4')};
  text-transform: uppercase;
  margin-right: 12px;
  letter-spacing: 1px;
  cursor: pointer;
  height: 24px;
`

const ToggleView = styled.div`
  width: 56px;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 117px;
  @media (max-width: 1200px) {
    margin-right: 31px;
  }
`
const ToggleIcon = styled.span`
  text-align: center;
  width: 24px;
  margin-right: 11px;
  cursor: pointer;
  color: ${(props) => (props.toggle ? '#323C46' : '#A9AEB4')};
`
const ExtendsDropDownContent = styled.div`
  width: auto;
  height: fit-content;
  border-radius: 10px;
  text-align: center;
  display: block;
  background: #d9dce1;
  opacity: 0.8;
  position: absolute;
 top: 130px;
 left: 62px;
`

const getMonth = function (idx) {
  var objDate = new Date()
  objDate.setDate(1)
  objDate.setMonth(idx)

  var locale = 'en-us',
    month = objDate.toLocaleString(locale, { month: 'long' })
  return month
}

export const getDate = (event) => {
  const date = new Date(event.startsAt)
  let newDate = `${getMonth(
    date.getMonth()
  )} ${date.getDate()} ${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`
  return newDate
}

export const Layout = ({ history, onClick }) => {
  const { width } = useWindowDimensions()
  const [toggleFilter, setToggleFilter] = useState(false)
  const [color1, setColor1] = useState(true)
  const [color2, setColor2] = useState(false)
  const [color3, setColor3] = useState(false)

  const [toggleGrid, setToggleGrid] = useState(true)
  const [toggleList, setToggleList] = useState(false)

  const eventContext = useContext(EventContext)
  const { events, getAllEvent, joinEvent, leaveEvent } = eventContext
  const user = JSON.parse(localStorage.getItem('user'))

  let eventsTShow = []

  if (events?.length && user) {
    const evts = events.map((evt) => {
      if (user.id === evt.owner.id) {
        return { ...evt, isOwner: true }
      }
      const userU = evt.attendees.find((attendee) => attendee.id === user.id)
      if (userU) {
        return { ...evt, isAttending: true }
      }
      return { ...evt, isAttending: false, isOwner: false }
    })
    eventsTShow = evts
  }
  const handleEvent = (e) => {
    if (e.isOwner === true) {
      history.push(`/event/edit/${e.id}`)
    } else if (e.isAttending) {
      leaveEvent(e.id)
      getAllEvent()
    } else {
      joinEvent(e._id)
    }
  }
  useEffect(() => {
    getAllEvent()
    //eslint-disable-next-line
  }, [])

  /**
   * @description handles the current selected filter.
   * @param {current select filter} e
   */
  const handleToggle = (e) => {
    switch (e.target.id) {
      case 'all':
        setColor1(true)
        setColor2(false)
        setColor3(false)
        break
      case 'future':
        setColor1(false)
        setColor2(true)
        setColor3(false)
        break
      case 'past':
        setColor3(true)
        setColor1(false)
        setColor2(false)
        break
      default:
        setColor1(false)
        setColor2(false)
        setColor3(false)
    }
  }
  /**
   * @description handles the current selected view | view | grid.
   * @param {current select filter} e
   */
  const handleToggleGridView = (e) => {
    setToggleGrid(true)
    setToggleList(false)
  }

  const handleToggleListView = () => {
    setToggleList(true)
    setToggleGrid(false)
  }

  /**
   * @returns JSX
   * 
   */

  return (
    <>
      <Header history={history} />
      <Wrapper>
        {width > 1200 && (
          <FilterHolder>
            <EventsTag onClick={(e) => handleToggle(e)} id='all' t={color1}>
              All Events
            </EventsTag>
            <EventsTag t={color2} id='future' onClick={(e) => handleToggle(e)}>
              Future Events
            </EventsTag>
            <EventsTag id='past' onClick={(e) => handleToggle(e)} t={color3}>
              past events
            </EventsTag>
          </FilterHolder>
        )}
        {width < 1200 && (
          <FilterHolder>
            <FilterContainer onClick={() => setToggleFilter(!toggleFilter)}>
              <EventsTag>Show:</EventsTag>
              <DropDown>
                <i className='fas fa-sort-down'></i>
                {toggleFilter && (
                  <ExtendsDropDownContent>
                    <EventsTag
                      onClick={(e) => handleToggle(e)}
                      id='all'
                      t={color1}
                    >
                      All Events
                    </EventsTag>
                    <EventsTag
                      t={color2}
                      id='future'
                      onClick={(e) => handleToggle(e)}
                    >
                      Future Events
                    </EventsTag>
                    <EventsTag
                      id='past'
                      onClick={(e) => handleToggle(e)}
                      t={color3}
                    >
                      past events
                    </EventsTag>
                  </ExtendsDropDownContent>
                )}
              </DropDown>{' '}
            </FilterContainer>
          </FilterHolder>
        )}
        <ToggleView>
          <ToggleIcon
            id='grid'
            onClick={() => handleToggleGridView()}
            toggle={toggleGrid}
          >
            <i className='fas fa-grip-horizontal'></i>
          </ToggleIcon>
          <ToggleIcon
            id='list'
            toggle={toggleList}
            onClick={() => handleToggleListView()}
          >
            <i className='fas fa-grip-lines'></i>
          </ToggleIcon>
        </ToggleView>
      </Wrapper>
      <>
        {toggleGrid ? (
          <Container>
            {color2 &&
              events &&
              eventsTShow
                .filter((event) => new Date(event.startsAt) > new Date())
                .map((event) => {
                  return (
                    <CardHolder
                      toggleGrid={toggleGrid}
                      key={event.id}
                      date={getDate(event)}
                      title={event.title}
                      author={`${event.owner.firstName} ${event.owner.lastName}`}
                      discription={event.description}
                      onClickEvent={() => handleEvent(event)}
                      onClick={() => history.push(`/event/details/${event.id}`)}
                      label={
                        event.isOwner
                          ? 'edit'
                          : event.isAttending
                          ? 'leave'
                          : 'join'
                      }
                      capacity={event.capacity}
                      totalAtendees={event.attendees.length}
                      variant={
                        event.isOwner
                          ? 'tertiary'
                          : event.isAttending
                          ? 'secondary'
                          : 'primary'
                      }
                    />
                  )
                })}
            {color1 && events && 
              eventsTShow
                
                .map((event) => {
                  return (
                    <CardHolder
                      toggleGrid={toggleGrid}
                      key={event.id}
                      date={getDate(event)}
                      title={event.title}
                      author={`${event.owner.firstName} ${event.owner.lastName}`}
                      discription={event.description}
                      onClickEvent={() => handleEvent(event)}
                      onClick={() => history.push(`/event/details/${event.id}`)}
                      label={
                        event.isOwner
                          ? 'edit'
                          : event.isAttending
                          ? 'leave'
                          : 'join'
                      }
                      capacity={event.capacity}
                      totalAtendees={event.attendees.length}
                      variant={
                        event.isOwner
                          ? 'tertiary'
                          : event.isAttending
                          ? 'secondary'
                          : 'primary'
                      }
                    />
                  )
                })
            }
            {color3 &&
              events &&
              eventsTShow.filter((event) => new Date(event.startsAt) < new Date())
              .map((event) => {
                return (
                  <CardHolder
                    toggleGrid={toggleGrid}
                    key={event.id}
                    date={getDate(event)}
                    title={event.title}
                    author={`${event.owner.firstName} ${event.owner.lastName}`}
                    discription={event.description}
                    onClickEvent={() => handleEvent(event)}
                    label={
                      event.isOwner
                        ? 'edit'
                        : event.isAttending
                        ? 'leave'
                        : 'join'
                    }
                    capacity={event.capacity}
                    totalAtendees={event.attendees.length}
                    onClick={() => history.push(`/event/details/${event.id}`)}
                    variant={
                      event.isOwner
                        ? 'tertiary'
                        : event.isAttending
                        ? 'secondary'
                        : 'primary'
                    }
                  />
                )
              })}{' '}
          </Container>
        ) : (
          <>
            {color2 &&
              events &&
              eventsTShow
                .filter((event) => new Date(event.startsAt) > new Date())
                .map((event) => {
                  return (
                    <CardHolder
                      toggleGrid={toggleGrid}
                      key={event.id}
                      date={getDate(event)}
                      title={event.title}
                      author={`${event.owner['firstName']} ${event.owner.lastName}`}
                      discription={event.description}
                      onClickEvent={() => handleEvent(event)}
                      onClick={() => history.push(`/event/details/${event.id}`)}
                      label={
                        event.isOwner
                          ? 'edit'
                          : event.isAttending
                          ? 'leave'
                          : 'join'
                      }
                      capacity={event.capacity}
                      totalAtendees={event['attendees'].length}
                      variant={
                        event.isOwner
                          ? 'tertiary'
                          : event.isAttending
                          ? 'secondary'
                          : 'primary'
                      }
                    />
                  )
                })}
            {color1 &&
              events &&
              eventsTShow.map((event) => {
                return (
                  <CardHolder
                    toggleGrid={toggleGrid}
                    key={event.id}
                    date={getDate(event)}
                    title={event.title}
                    author={`${event.owner['firstName']} ${event.owner.lastName}`}
                    discription={event.description}
                    onClickEvent={() => handleEvent(event)}
                    onClick={() => history.push(`/event/details/${event.id}`)}
                    label={
                      event.isOwner
                        ? 'edit'
                        : event.isAttending
                        ? 'leave'
                        : 'join'
                    }
                    capacity={event.capacity}
                    totalAtendees={event.attendees.length}
                    variant={
                      event.isOwner
                        ? 'tertiary'
                        : event.isAttending
                        ? 'secondary'
                        : 'primary'
                    }
                  />
                )
              })}
            {color3 &&
              events &&
              eventsTShow
                .filter((event) => new Date(event.startsAt) < new Date())
                .map((event) => {
                  return (
                    <CardHolder
                      toggleGrid={toggleGrid}
                      key={event.id}
                      date={getDate(event)}
                      title={event.title}
                      author={`${event.owner.firstName} ${event.owner.lastName}`}
                      discription={event.description}
                      onClick={() => history.push(`/event/details/${event.id}`)}
                      onClickEvent={() => handleEvent(event)}
                      label={
                        event.isOwner
                          ? 'edit'
                          : event.isAttending
                          ? 'leave'
                          : 'join'
                      }
                      capacity={event.capacity}
                      totalAtendees={event['attendees'].length}
                      variant={
                        event.isOwner
                          ? 'tertiary'
                          : event.isAttending
                          ? 'secondary'
                          : 'primary'
                      }
                    />
                  )
                })}{' '}
          </>
        )}
      </>
    </>
  )
}
