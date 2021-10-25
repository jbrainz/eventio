import { useState, useEffect, useContext } from 'react'
import styled from 'styled-components'
import * as yup from 'yup'

import useWindowDimensions from '../../utils/responsive'

import AuthContext from '../../context/auth/authContext'

import { Button } from '../../components/button/Button'
import SideBar, { Logo } from '../../components/sidebar/Sidebar'

import './signup.css'
import { LogoContainer } from '../../components/sidebar/Sidebar'
import Message from '../../components/error-message/Message'
import { TextField } from '@material-ui/core'
import { Formik } from 'formik'

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
    top: 130px;
    left: 12px;
    right: 12px;
    width: auto;
    margin-bottom: 10%;
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
  margin-top: 52px;
  @media (max-width: 1200px) {
    position: relative;
    text-align: center;
    margin-top: 48px;
    margin-bottom: 38px;
  }
`
const IconHolder = styled.div`
  position: absolute;
  top: 40%;
  right: 7%;
`
export const MobileLogo = styled(LogoContainer)`
  height: 22px;
  left: 24px;
  top: 29px;
`
const initialValues = {
  email: '',
  password: '',
}
const SignIn = ({ history }) => {
  const [open, setOpen] = useState(false)

  const authContext = useContext(AuthContext)

  const { login, error, isAuthenticated } = authContext

  //Submit Handler
  const handleSubmit = (values, { isSubmitting }) => {
    login({ values })
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
      {width < 1200 && <Logo color='mobile' />}
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
        <MainHeader>Sign in to N-Verify</MainHeader>
        {error ? (
          <Message message="Oops! Credentials cant't find that user!" />
        ) : (
          <SubtitleHeader>Enter your details below to continue.</SubtitleHeader>
        )}
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          enableReinitialize={true}
          validationSchema={loginSchema}
        >
          {({
            values,
            errors,
            touched,
            handleBlur,
            handleChange,
            handleSubmit,
            isSubmitting,
            setSubmitting,
            setFieldValue,
          }) => (
            <form onSubmit={handleSubmit} autoComplete='off'>
              <TextField
                onChange={handleChange}
                value={values.email}
                bg='#F2F2F2'
                type='email'
                name='email'
                label='Email'
                variant='outlined'
                margin='normal'
                fullWidth
                onBlur={handleBlur}
                error={Boolean(touched.email && errors.email)}
                helperText={touched.email && errors.email}
              />
              <div className='form__container-password'>
                <TextField
                  name='password'
                  type={open ? 'text' : 'password'}
                  value={values.password}
                  onChange={handleChange}
                  variant='outlined'
                  margin='normal'
                  label='Password'
                  fullWidth
                  onBlur={handleBlur}
                  error={Boolean(touched.password && errors.password)}
                  helperText={touched.password && errors.password}
                />
                <IconHolder>
                  <span onClick={() => setOpen(!open)} className='icon-eye'>
                    <i className={open ? 'fas fa-eye' : 'fas fa-eye-slash'}></i>
                  </span>
                </IconHolder>
              </div>
              {width < 1200 && (
                <SigupLinkWrapper>
                  <SigupLinkText>
                    Dont Have account?{' '}
                    <StrongSignUp onClick={() => history.push('/signup')}>
                      SIGN UP
                    </StrongSignUp>
                  </SigupLinkText>
                </SigupLinkWrapper>
              )}
              <ButtonHolder>
                <Button
                  type='submit'
                  label='Sign in'
                  variant='primary'
                  size='main'
                />
              </ButtonHolder>
            </form>
          )}
        </Formik>
      </Container>
    </>
  )
}
const loginSchema = yup.object().shape({
  email: yup
    .string()
    .email('cannot be blank')
    .required('please enter a valid email'),
  password: yup
    .string()
    .min(6, 'password is too short.')
    .max(50, 'password is too long'),
})
export default SignIn
