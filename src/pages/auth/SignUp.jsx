import { useEffect, useState, useContext } from 'react'
import { Formik } from 'formik'
import * as yup from 'yup'
import { TextField } from '@material-ui/core'

import {
  SigupLinkWrapper,
  SigupLinkText,
  StrongSignUp,
  Container,
  MainHeader,
  SubtitleHeader,
  ButtonHolder,
} from './SignIn'

import AuthContext from '../../context/auth/authContext'
import { Button } from '../../components/button/Button'
import SideBar, { Logo } from '../../components/sidebar/Sidebar'
import Loading from '../../components/loading/Loading'
import useWindowDimensions from '../../utils/responsive'

const SignUp = ({ history }) => {
  const authContext = useContext(AuthContext)
  const [loading, setLoading] = useState(false)

  const initialValues = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confrimPassword: '',
  }

  // const [user, setUser] = useState({
  //   firstName: '',
  //   lastName: '',
  //   email: '',
  //   phone: '',
  //   password: '',
  //   confrimPassword: '',
  // })
  const { register, isAuthenticated } = authContext

  const handleSubmit = (values, { isSubmitting }) => {
    setLoading(true)
    register({
      values,
    })
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
      {width < 1200 ? <Logo color='mobile' /> : null}
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
          <MainHeader>Create a free account to get started.</MainHeader>
          <SubtitleHeader>Enter your details below.</SubtitleHeader>
          <Formik
            initialValues={initialValues}
            onSubmit={handleSubmit}
            enableReinitialize={true}
            validationSchema={signUpValidationsSchema}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting,
              setSubmitting,
              setFieldValue,
            }) => (
              <form onSubmit={handleSubmit} autoComplete='off'>
                <TextField
                  value={values.firstName}
                  bg='#F2F2F2'
                  type='text'
                  name='firstName'
                  label='first name'
                  onChange={handleChange}
                  onBlur={handleBlur}
                  variant='outlined'
                  margin='normal'
                  fullWidth
                  error={Boolean(touched.firstName && errors.firstName)}
                  helperText={touched.firstName && errors.firstName}
                />
                <TextField
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.lastName}
                  fullWidth
                  bg='#F2F2F2'
                  type='text'
                  name='lastName'
                  label='last name'
                  variant='outlined'
                  margin='normal'
                />
                <TextField
                  onChange={handleChange}
                  fullWidth
                  onBlur={handleBlur}
                  error={Boolean(touched.email && errors.email)}
                  helperText={touched.email && errors.email}
                  value={values.email}
                  bg='#F2F2F2'
                  type='email'
                  name='email'
                  label='email'
                  variant='outlined'
                  margin='normal'
                />
                <TextField
                  onChange={handleChange}
                  onBlur={handleBlur}
                  fullWidth
                  error={Boolean(touched.phone && errors.phone)}
                  helperText={touched.phone && errors.phone}
                  value={values.phone}
                  bg='#F2F2F2'
                  type='text'
                  name='phone'
                  label='phone'
                  variant='outlined'
                  margin='normal'
                />
                <TextField
                  bg='#F2F2F2'
                  type='password'
                  name='password'
                  onChange={handleChange}
                  fullWidth
                  onBlur={handleBlur}
                  error={Boolean(touched.password && errors.password)}
                  helperText={touched.password && errors.password}
                  value={values.password}
                  variant='outlined'
                  margin='normal'
                  label='password'
                />
                <TextField
                  bg='#F2F2F2'
                  type='password'
                  name='confrimPassword'
                  onChange={handleChange}
                  variant='outlined'
                  margin='normal'
                  fullWidth
                  onBlur={handleBlur}
                  error={Boolean(
                    touched.confrimPassword && errors.confrimPassword
                  )}
                  helperText={touched.confrimPassword && errors.confrimPassword}
                  value={values.confrimPassword}
                  label='confrim password'
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
            )}
          </Formik>
        </Container>
      )}
    </>
  )
}

const phoneValidation = /^234[0-9]{10}$/

const signUpValidationsSchema = yup.object().shape({
  firstName: yup.string().required('name cannot be blank'),
  email: yup
    .string()
    .email('email cannot be blank.')
    .required('please enter a valid email'),
  phone: yup
    .string()
    .matches(phoneValidation, 'phone cannot be blank i.e 2348012345678')
    .required(),
  password: yup
    .string()
    .min(6, 'password is too short.')
    .max(50, 'password is too long'),
  confrimPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords must match'),
})

export default SignUp
