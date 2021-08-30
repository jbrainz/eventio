import styled from 'styled-components'

import useWindowDimensions from '../../utils/responsive'

import { Button } from '../button/Button'

export const GridWrapper = styled.div`
  margin-bottom: 16px;
  margin-right: ${(props) => (props.mr ? props.mr : '120px')};
  margin-left: 120px;
  width: ${(props) => (props.width ? props.width : '390px')};
  height: auto;
  background: #ffffff;
  box-shadow: 0px 2px 3px rgba(0, 0, 0, 0.108696);
  border-radius: 2px;
  @media (max-width: 1366px) {
    width: ${(props) => (props.width ? props.width : '350px')};
  }
  @media (max-width: 1200px) {
    width: 304px;
    margin-left: 0px;
    margin-right: 0px;
    overflow: hidden;
  }
`

const ListWrapper = styled(GridWrapper)`
  width: auto;
  height: 72px;
  margin-right: 120px;
  margin-top: 10px;
  cursor: pointer;
  padding-left: 12px;
  @media (max-width: 1200px) {
    height: auto;
    width: 95%;
    margin: 8px;
    display: flex;
    justify-content: flex-start;
  }
`

export const InnerWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  margin: 0 18px 0;
`

const InnWrapperList = styled.div`
  display: flex;
  justify-content: space-around;
  flex-direction: row;
  align-items: center;
  @media (max-width: 1200px) {
    flex-direction: column;
    margin-left: 0px;
  }
`
const DateHolder = styled.p`
  margin-top: 32px;
  font-family: Hind;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 24px;
  color: #cacdd0;
`
const DataHolderList = styled(DateHolder)`
  margin-top: 15px;
`
const EventHeader = styled.h2`
  font-family: Hind;
  font-style: normal;
  font-weight: normal;
  width: auto;
  font-size: 22px;
  color: #323c46;
  margin-top: -10px;
  margin-bottom: -10px;
  cursor: pointer;
  margin-top: 20px;
  height: 48px;
  max-lines: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`

const EventHeaderList = styled(EventHeader)`
  font-family: Hind;
  font-style: normal;
  padding-right: 0px;
  margin-top: 20px;
  font-weight: normal;
  text-align: left;
  @media (max-width: 1200px) {
    margin: auto;
    text-align: left;
    margin-top: 10px;
  }
  font-size: 18px;
  width: 222px;
`

const EventAuthor = styled.h3`
  font-family: Hind;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 24px;
  color: #7d7878;
`
const EventAuthorList = styled(EventAuthor)`
  margin-top: 15px;
  text-align: left;
  width: 96px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`

const ShortDescription = styled(DateHolder)`
  color: #949ea8;
  width: 227px;
  font-size: 16px;
  height: 48px;
  margin-bottom: 24px;
`
const ShortDescritionList = styled.p`
  width: 240px;
  height: 24px;
  color: #949ea8;
  max-lines: 1;
  margin-top: 20px;
  text-align: left;
  @media (max-width: 1200px) {
    margin-top: -23px;
    margin-left: 13px;
  }
  font-family: Hind;
  font-style: normal;
  font-weight: normal;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`
const MobileEventDetails = styled.div`
  text-align: center;
`
const ActionWrapper = styled.div`
  display: flex;
  height: 32px;
  justify-content: space-between;
  align-items: center;
  margin-top: 31px;
  margin-bottom: 32px;
`
const ActionWrapperList = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  @media (max-width: 1200px) {
    margin-top: 12px;
    width: 100%;
    margin-left: 32px;
  }
`
const UserCount = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 66px;

`
const UserIconHolder = styled.span`
  width: 16px;
  height: 16px;
  color: #949ea8;
`
const ActiveUsers = styled(EventAuthor)`
  color: #949ea8;
  text-align: center;
  margin-top: 15px;
`
const ButtonContainer = styled.div`
  margin-right: 32px;
  @media (max-width: 1200px) {
    margin-right: 0px;
  }
`

const ButtonContainerList = styled.div`
  display: flex;
  justify-content: flex-end;
`
export const Container = styled.div`
  display: grid;
  gap: 0px;
  grid-template-columns: repeat(4, 400px);
  @media (max-width: 1920px) {
    grid-template-columns: repeat(4, 400px);
  }
  @media (max-width: 1366px) {
    grid-template-columns: repeat(3, 358px);
  }
  @media (max-width: 1200px) {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    padding-right: 0px;
    margin: 0px;
  }
  justify-content: flex-start;
`

export const GridView = ({ width, mr, onClick, onClickEvent, ...rest }) => {
  return (
    <GridWrapper width={width} mr={mr}>
      <InnerWrapper>
        <DateHolder>{rest.date}</DateHolder>
        <EventHeader onClick={onClick}>{rest.title}</EventHeader>
        <EventAuthor>{rest.author}</EventAuthor>
        <ShortDescription>{rest.discription}</ShortDescription>
        <ActionWrapper>
          <UserCount>
            <UserIconHolder>
              <i className='fas fa-user'></i>
            </UserIconHolder>
            <ActiveUsers>
              {rest.capacity} of {rest.totalAtendees}
            </ActiveUsers>
          </UserCount>
          <ButtonContainer>
            <Button
              label={rest.label}
              size='main-small'
              variant={rest.variant}
              onClick={onClickEvent}
            />
          </ButtonContainer>
        </ActionWrapper>
      </InnerWrapper>
    </GridWrapper>
  )
}

export const ListView = ({ onClick, onClickEvent, ...rest }) => {
  const { width } = useWindowDimensions()

  return (
    <ListWrapper>
      <InnWrapperList>
        <EventHeaderList onClick={onClick}>{rest.title}</EventHeaderList>
        <ShortDescritionList>{rest.discription}</ShortDescritionList>
        {width > 1200 && <EventAuthorList>{rest.title}</EventAuthorList>}
        {width > 1200 && <DataHolderList>{rest.date}</DataHolderList>}
        <ActionWrapperList>
          {width < 1200 && (
            <MobileEventDetails>
              <DataHolderList>{rest.date}</DataHolderList>
              <UserCount>
                <ActiveUsers>
                  {rest.capacity} of {rest.totalAtendees}
                </ActiveUsers>
              </UserCount>
            </MobileEventDetails>
          )}
          {width > 1200 && (
            <UserCount>
              <ActiveUsers>
                {rest.capacity} of {rest.totalAtendees}
              </ActiveUsers>
            </UserCount>
          )}
          <ButtonContainerList>
            <Button
              onClick={onClickEvent}
              label={rest.label}
              size='main-small'
              variant={rest.variant}
            />
          </ButtonContainerList>
        </ActionWrapperList>
      </InnWrapperList>
    </ListWrapper>
  )
}

export const CardHolder = ({ onClick, onClickEvent, ...rest }) => {
  return (
    <>
      {rest.toggleGrid ? (
        <GridView
          width={rest.width}
          key={rest.key}
          date={rest.date}
          title={rest.title}
          author={rest.author}
          discription={rest.discription}
          onClick={onClick}
          label={rest.label}
          capacity={rest.capacity}
          totalAtendees={rest.totalAtendees}
          variant={rest.variant}
          onClickEvent={onClickEvent}
        />
      ) : (
        <ListView
          title={rest.title}
          author={rest.author}
          discription={rest.discription}
          onClick={onClick}
          label={rest.label}
          variant={rest.variant}
          date={rest.date}
          capacity={rest.capacity}
          totalAtendees={rest.totalAtendees}
          key={rest.key}
          onClickEvent={onClickEvent}
        />
      )}
    </>
  )
}
