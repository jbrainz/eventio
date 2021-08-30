import { Route, Redirect } from 'react-router-dom';

const PrivateRoutes = ({ component: Component, history, ...rest }) => {
  const userInfo = localStorage.getItem('user')

  return (
    <Route {...rest} render={(props) =>
      !userInfo ? (
        <Redirect to="signin" />
      ) : (
        <Component {...props} />
      )
    } />
  )
}

export default PrivateRoutes
