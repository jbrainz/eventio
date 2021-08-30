import { useContext, useEffect, useState } from 'react'

import styled from 'styled-components'



import { LogoContainer } from '../../sidebar/Sidebar'
import logoHome from '../../../assets/img/logohome.png'

import AuthContext from '../../../context/auth/authContext'

import useWindowDimensions from '../../../utils/responsive'


const Wrapper = styled.nav`
  margin-top: 39px;
  margin-left: 61px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: auto;
  height: auto;
  @media (max-width: 1200px) {
   margin-left: 21px;
  }
`

const Logo = styled(LogoContainer)`
  position: relative;
  top: 0;
  left: 0;
`

const UserContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  width: auto;
  margin-right: 39px;
  cursor: pointer;
`

const Profile = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #d9dce1;
  margin-right: 8px;
`
const ProfileTag = styled.h4`
  font-family: Hind;
  font-weight: 500;
  font-style: normal;
  font-size: 14px;
  line-height: 14px;
  text-align: right;
  color: #949ea8;
  text-transform: uppercase;
`
const ProfileName = styled.h4`
  font-family: Hind;
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 24px;
  text-align: right;
  color: #949ea8;
  margin-right: 5px;
  text-transform: uppercase;
`
export const DropDown = styled.span`
  width: 10px;
  height: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 8px;
  color: #949ea8;
  margin-top: -8px;
`
export const DropDownContent = styled.div`
  width: 70px;
  height: fit-content;
  border-radius: 10px;
  text-align: center;
  display: block;
  background: #d9dce1;
  opacity: 0.8;
  position: absolute;
  top: 85px;
  right: 40px;
`
const Navigation = styled.div`
  width: 133px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  color: #323c46;
  cursor: pointer;
`

const IconContainer = styled.span`
  height: 16px;
  width: 16px;
  text-align: center;
  color: #323c46;
  margin-top: -5px;
`
const TextInput = styled.p`
  font-family: Hind;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 48px;
  color: #323c46;
`
const CloseIcon = styled.span`
  height: 14px;
  width: 14px;
  text-align: center;
  color: #323c46;
  margin-top: -5px;
  margin-right: 12px;
`
const CloseText = styled(TextInput)``


const Header = ({ back, onClick, modalClose, close }) => {
  const { width } = useWindowDimensions()

  const [toggle, setToggle] = useState(false)
  const [data, setData] = useState()

   const authContext = useContext(AuthContext)

   const {  logout } = authContext

   const handleLogout = () => {
     logout()
    if(!localStorage.token){
      window.location.reload()
    }
   }

  useEffect(() => { 
      setData(JSON.parse(localStorage.getItem('user')))
  }, [])
  return (
    <Wrapper>
      <Logo>
        <img src={logoHome} alt='eventio logo' />
      </Logo>
      {back && width >1200 && (
        <Navigation onClick={onClick}>
          <IconContainer>
            <i className='fas fa-arrow-left'></i>
          </IconContainer>
          <TextInput>Back to events</TextInput>
        </Navigation>
      )}
      <UserContainer onClick={modalClose}>
        <>
          {close ? (
            <>
              <CloseIcon>
                <i className='fas fa-times'></i>
              </CloseIcon>
              <CloseText>Close</CloseText>
            </>
          ) : (
            <>
              <Profile>
                <ProfileTag>
                  {data && data.firstName.charAt(0)}{' '}
                  {data && data.lastName.charAt(0)}
                </ProfileTag>
              </Profile>
              {width > 1200 && (
                <>
                  {' '}
                  <ProfileName>{data && data.firstName}</ProfileName>
                  <ProfileName>{data && data.lastName}</ProfileName>
                </>
              )}
              <DropDown onClick={() => setToggle(!toggle)}>
                <i className='fas fa-sort-down'></i>
                {toggle && (
                  <DropDownContent>
                    <CloseText onClick={() => handleLogout()}>Logout</CloseText>
                  </DropDownContent>
                )}
              </DropDown>
            </>
          )}
        </>
      </UserContainer>
    </Wrapper>
  )
}

export default Header
