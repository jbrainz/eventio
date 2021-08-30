import { useState, useEffect, useContext } from 'react'
import styled from 'styled-components'

import useWindowDimensions from '../../utils/responsive'

import AuthContext from '../../context/auth/authContext'

import FormInputs from '../../components/inputs/FormInputs'
import { Button } from '../../components/button/Button'
import SideBar from '../../components/sidebar/Sidebar'

import './signup.css'
import { LogoContainer } from '../../components/sidebar/Sidebar'
import Message from '../../components/error-message/Message'
import mobileLogo from '../../assets/img/mobilelogo.png'

export const SigupLinkWrapper = styled.div`
  position: absolute;
  overflow: hidden;
  width: fit-content;
  right: 39px;
  top: 40px;
  @media (max-width: 1200px) {
   position: relative;
   right: 0;
   top: 20px;
   left: 62px;
  }
`
export const SigupLinkText = styled.p`
  font-family: Hind;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 24px;
  text-text-decoration: none;
  color: #c9ced3;
  cursor: pointer;
  background-color: transparent;
  border-width: 0px;
`
export const StrongSignUp = styled.a`
  font-weight: bold;
  color: #75797c;
`
export const Container = styled.div`
  width: 480px;
  position: absolute;
  overflow: hidden;
  top: 20%;
  right: 505px;
  left: 719px;
  @media (max-width: 1200px) {
    top: 100px;
    left: 12px;
    right: 12px;
    width: auto;
  }
`
export const MainHeader = styled.h2`
  font-family: Hind;
  font-style: normal;
  font-weight: normal;
  font-size: 28px;
  line-height: 48px;
  color: #323c46;
  @media (max-width: 1200px) {
    text-align: center;
    margin-top: -4px;
  }
`
export const SubtitleHeader = styled.h4`
  font-family: Hind;
  font-style: normal;
  font-weight: normal;
  font-size: 18px;
  line-height: 24px;
  color: #949ea8;
  margin-top: 15px;
  @media (max-width: 1200px) {
    text-align: center;
  }
`

export const ButtonHolder = styled.div`
  margin-top: 32px;
  @media (max-width: 1200px) {
    position: relative;
    text-align: center;
    margin-top: 48px;
  }
`
const IconHolder = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
  @media (max-width: 1200px) {
    right: 178px;
  }
`
export  const MobileLogo = styled(LogoContainer)`
  height: 22px;
  width: 22px;
  left: 24px;
  top: 29px;
`

const SignIn = ({ history }) => {
  const [open, setOpen] = useState(false)
  const [user, setUser] = useState({
    email: '',
    password: '',
  })
  const { email, password } = user
  const authContext = useContext(AuthContext)

  const { login, error, clearErrors, isAuthenticated } = authContext
  const onChange = (e) => {
    if (error) {
      setTimeout(() => {
        clearErrors()
      }, 200)
    }
    return setUser({ ...user, [e.target.name]: e.target.value })
  }

  //Submit Handler
  const onSubmit = (e) => {
    e.preventDefault()
    if (email === '' || password === '') {
      return
    } else {
      login({
        email,
        password,
      })
    }
  }
  const { width } = useWindowDimensions()
  useEffect(() => {
    const user = localStorage.getItem('user')
    if (user || isAuthenticated) {
      history.push('/')
    }
    //eslint-disable-next-line
  }, [error, isAuthenticated, history])

  return (
    <>
      {width > 1200 && <SideBar />}
      {width < 1200 && (
        <MobileLogo>
          <img src={mobileLogo} alt='logo' />{' '}
        </MobileLogo>
      )}
      {width > 1200 && (
        <SigupLinkWrapper>
          <SigupLinkText>
            Dont Have account?{' '}
            <StrongSignUp onClick={() => history.push('/signup')}>
              SIGN UP
            </StrongSignUp>
          </SigupLinkText>
        </SigupLinkWrapper>
      )}
      <Container>
        <MainHeader>Sign in to Eventio</MainHeader>
        {error ? (
          <Message message="Oops! Credentials cant't find that user!" />
        ) : (
          <SubtitleHeader>Enter your details below.</SubtitleHeader>
        )}
        <form onSubmit={onSubmit} autoComplete='off'>
          <FormInputs
            onChange={onChange}
            value={email}
            bg='#F2F2F2'
            type='email'
            name='email'
            id={error && 'label'}
            label='Email'
          />
          <div className='form__container-password'>
            <input
              className='input__password'
              name='password'
              type={open ? 'text' : 'password'}
              required={true}
              value={password}
              onChange={onChange}
            />
            <label
              id={error && 'label'}
              className='label-password'
              name='password'
            >
              <div className='password_holder'>
                <span className='content-password'>Password</span>
              </div>
            </label>
            <IconHolder>
              <span onClick={() => setOpen(!open)} className='icon-eye'>
                <i className={open ? 'fas fa-eye' : 'fas fa-eye-slash'}></i>
              </span>
            </IconHolder>
          </div>
        {width < 1200 &&  <SigupLinkWrapper>
            <SigupLinkText>
              Dont Have account?{' '}
              <StrongSignUp onClick={() => history.push('/signup')}>
                SIGN UP
              </StrongSignUp>
            </SigupLinkText>
          </SigupLinkWrapper>
            }
          <ButtonHolder>
            <Button
              type='submit'
              label='Sign in'
              variant='primary'
              size='main'
            />
          </ButtonHolder>
        </form>
      </Container>
    </>
  )
}

export default SignIn
