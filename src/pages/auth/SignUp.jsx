import { useEffect, useState, useContext } from 'react'

import {
  SigupLinkWrapper,
  SigupLinkText,
  StrongSignUp,
  Container,
  MainHeader,
  SubtitleHeader,
  MobileLogo,
  ButtonHolder,
} from './SignIn'
import AuthContext from '../../context/auth/authContext'

import { Button } from '../../components/button/Button'
import FormInputs from '../../components/inputs/FormInputs'
import SideBar from '../../components/sidebar/Sidebar'
import Loading from '../../components/loading/Loading'
import useWindowDimensions from '../../utils/responsive'
import mobileLogo from '../../assets/img/mobilelogo.png'

const SignUp = ({ history }) => {
  const authContext = useContext(AuthContext)
  const [loading, setLoading] = useState(false)

  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    password2: '',
  })
  const { register, isAuthenticated } = authContext

  const { firstName, email, lastName, password, password2 } = user
  const onChange = (e) => setUser({ ...user, [e.target.name]: e.target.value })

  const onSubmit = (e) => {
    e.preventDefault()
    if (firstName === '' || email === '' || password === '') {
      return
    } else if (password !== password2) {
      return console.log('Password mismatch')
    } else {
      setLoading(true)
      register({
        firstName,
        lastName,
        email,
        password,
      })
    }
    setLoading(false)
  }
  const { width } = useWindowDimensions()

  useEffect(() => {
    const user = localStorage.getItem('user')
    if (user || isAuthenticated) {
      history.push('/')
    }
  }, [history, isAuthenticated])
  return (
    <>
      {width > 1200 ? <SideBar /> : null}
      {width < 1200 ? (
        <MobileLogo>
          <img src={mobileLogo} alt='logo' />{' '}
        </MobileLogo>
      ) : null}
      {width > 1200 && (
        <SigupLinkWrapper>
          <SigupLinkText>
            Already Have an account?{' '}
            <StrongSignUp onClick={() => history.push('/signin')}>
              SIGN IN
            </StrongSignUp>
          </SigupLinkText>
        </SigupLinkWrapper>
      )}
      {loading ? (
        <Loading />
      ) : (
        <Container>
          <MainHeader>Get started absolutely free.</MainHeader>
          <SubtitleHeader>Enter your details below.</SubtitleHeader>
          <form onSubmit={onSubmit} autoComplete='off'>
            <FormInputs
              onChange={onChange}
              value={firstName}
              bg='#F2F2F2'
              type='text'
              name='firstName'
              label='First name'
            />
            <FormInputs
              onChange={onChange}
              value={lastName}
              bg='#F2F2F2'
              type='text'
              name='lastName'
              label='Last name'
            />
            <FormInputs
              onChange={onChange}
              value={email}
              bg='#F2F2F2'
              type='email'
              name='email'
              label='Email'
            />
            <FormInputs
              bg='#F2F2F2'
              type='password'
              name='password'
              onChange={onChange}
              value={password}
              label='Password'
            />
            <FormInputs
              bg='#F2F2F2'
              type='password'
              name='password2'
              onChange={onChange}
              value={password2}
              label='Repeat password'
            />
            {width < 1200 && (
              <SigupLinkWrapper>
                <SigupLinkText>
                  Already Have an account?{' '}
                  <StrongSignUp onClick={() => history.push('/signin')}>
                    SIGN IN
                  </StrongSignUp>
                </SigupLinkText>
              </SigupLinkWrapper>
            )}
            <ButtonHolder>
              <Button
                type='submit'
                label='Sign up'
                variant='primary'
                size='main'
              />
            </ButtonHolder>
          </form>
        </Container>
      )}
    </>
  )
}

export default SignUp
