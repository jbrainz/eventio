import { useEffect, useContext } from 'react'
import styled from 'styled-components'
import { CardHolder, GridWrapper } from '../../components/dashboard/Cards'
import Header from '../../components/layouts/header/Header'
import { RoundedButon } from '../../components/button/Button'
import EventContext from '../../context/events/eventContext'
import { getDate } from '../../components/layouts/Layout'

export const Wrapper = styled.div`
  margin-top: 109px;
  width: 100%;
`

export const EventIdWrapper = styled.p`
  font-family: Hind;
  font-style: normal;
  font-weight: 600;
  height: 24px;
  font-size: 12px;
  line-height: 24px;
  letter-spacing: 1px;
  text-transform: uppercase;
  color: #a9aeb4;
  margin-left: 121px;
  margin-bottom: 41px;
  @media (max-width: 1200px) {
    margin-left: 32px;
    margin-top: 32px;
    display: block;
  }
`

export const InnerWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  @media (max-width: 1200px) {
    flex-direction: column;
  }
`

const GridWrapperExtends = styled(GridWrapper)`
  margin-left: 0px;
  position: relative;
  height: 296px;
  margin-top: 32px;
  margin-left: -17px ;
`
const Attendees = styled.p`
  font-family: Hind;
  font-style: normal;
  font-weight: normal;
  font-size: 22px;
  line-height: 32px;
  color: #323c46;
  margin-left: 32px;
  margin-top: 26px;
`
const BorderedBox = styled.div`
  width: fit-content;
  display: flex;
  align-items: center;
  height: 32px;
  margin-left: 31px;
  margin-top: 22px;
  background: #d9dce1;
  border-radius: 100px;
  margin-left: 8px;
  margin-top: 17px;
`
const NameHolder = styled.p`
  font-family: Hind;
  font-style: normal;
  font-weight: normal;
  font-size: 13px;
  line-height: 31px;
  text-align: center;
  color: #949ea8;
  padding-left: 10px;
  padding-right: 10px;
`

const WrapperContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  margin-right: -72px;
  @media (max-width: 1200px) {
    margin-right: 0px;
  }
`

const BorderedBoxWrapper = styled.div`
  display: flex;
  height: auto;
  flex-wrap: wrap;
  margin-bottom: 32px;
`
export const ButtonHolder = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-right: 32px;
  margin-left: 32px;
`
export const DashboardDetails = ({ history, match }) => {
  const eventsId = match.params.id
  const eventContext = useContext(EventContext)
  const { getEvent, events } = eventContext

  useEffect(() => {
    getEvent(eventsId)
      //eslint-disable-next-line
  }, [eventsId])
  return (
    <>
      <Header onClick={() => history.push('/')} back={true} />
      <Wrapper>
        <InnerWrapper>
          <WrapperContainer>
            <EventIdWrapper>{eventsId}</EventIdWrapper>
            {events && (
              <CardHolder
                width='756px'
                toggleGrid={true}
                key={events.id}
                date={getDate(events)}
                title={events.title}
                author={`${events.owner?.firstName} ${events.owner?.lastName}`}
                discription={events.description}
                label='Default'
                capacity={events.capacity}
                totalAtendees={events.attendees?.length}
                variant={
                  events.isOwner
                    ? 'tertiary'
                    : events.isAttending
                    ? 'secondary'
                    : 'primary'
                }
              />
            )}
          </WrapperContainer>
          <CardAttendees />
        </InnerWrapper>
        <ButtonHolder>
          <RoundedButon variant='primary' />
        </ButtonHolder>
      </Wrapper>
    </>
  )
}

export const CardAttendees = ({ data }) => {
  return (
    <GridWrapperExtends>
      <Attendees>Attendees</Attendees>
      <BorderedBoxWrapper>
        <BorderedBox>
          <NameHolder>Luis Pope general</NameHolder>
        </BorderedBox>
        <BorderedBox>
          <NameHolder>Luis Pope</NameHolder>
        </BorderedBox>
        <BorderedBox>
          <NameHolder>Luis User</NameHolder>
        </BorderedBox>
        <BorderedBox>
          <NameHolder>Franklophone Pope</NameHolder>
        </BorderedBox>
        <BorderedBox>
          <NameHolder>Luis Pope</NameHolder>
        </BorderedBox>
        <BorderedBox>
          <NameHolder>Luis Pope</NameHolder>
        </BorderedBox>
      </BorderedBoxWrapper>
    </GridWrapperExtends>
  )
}
