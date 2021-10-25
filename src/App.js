import { BrowserRouter, Route, Switch } from 'react-router-dom';


import AuthState from './context/auth/AuthState'


import Dashboard from './pages/dashboard/Dashboard';
import CreateEvent from './pages/dashboard/CreateEvent';
import EditEvent from './pages/dashboard/EditEvent';
import { DashboardDetails } from './pages/dashboard/DashboardDetails';



import PrivateRoutes from './pages/Routes';
import SignUp from './pages/auth/SignUp'
import SignIn from './pages/auth/SignIn'


import EventState from './context/events/eventState';
import PageNotFound from './pages/NotFound';
import { ThemeProvider } from '@material-ui/core';
import { theme } from './theme/themeProvider';


const App = () => {

  return (
    <AuthState>
      <EventState>
        <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Switch>
            <PrivateRoutes exact path="/" component={Dashboard} />
            <PrivateRoutes path="/event/create" component={CreateEvent} />
            <PrivateRoutes path="/event/edit/:id" component={EditEvent} />
            <PrivateRoutes path="/event/details/:id" component={DashboardDetails} />
            <Route path='/signup' exact component={SignUp} />
            <Route path='/signin' exact component={SignIn} />
            <Route component={PageNotFound} />
          </Switch>
        </BrowserRouter>
        </ThemeProvider>
      </EventState>
    </AuthState>
  )
}

export default App;
