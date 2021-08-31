# Eventio, Event management application

## Description

Eventio is an event management application that allows logged in users ### Join,  Leave Or Edit an event.
depending on the current logged in user, users can either decide to join an event they are not currently a part of, or leave an event if they are already part of the event.

## Project Structure
The project is splitted into component, pages, utils, and context.

### Components
This is where all reuseable logics lives.
> Button > consist of button components logics
>dashboad > dashboard the card component
>error-message> error message component
>inputs > text inputs components
>layouts > header > page-layout component 
>loading > a loading spinner component
>sidebar > Auth side bar component

### Pages
> Auth > signIn ,signOut 
> Dashboard> creatEevent, dashboard, dashboardDetails, editEvent
> NotFound
> Routes

## Technologies used
>axios
>create-react app
>react-router dom
>react context api
### PROJECT WORKTHROUGH
The app's entry point in the index.js that can be found in the apps root dir. 
It uses the context api for  state management and alse react hooks, which makes entire app have access to state variables and action.
styled-components was use for managing and creating custom re-useable styles, and axios for making api calls to the server.
### TODO
Update Events: logged in users should be able to update an event, if they are the creators.
 The action and component for the feature is already created but not yet implemented.


Delete Events: logged in users should be able to delete the event they created
 Action already added to the State and the component is already created.

REFRESH TOKEN: This feature has not been added yet, however axios interceptors logs users with expired token out automatically.


### IMPROVEMENTS
make more reuseable logic in the layouts section of the app.
and adding some more css animations and styling.

## Installation
In the project directory, you can run.
to install necessary dependencies.
### `yarn add`  or `npm install`

## Running the application
> Requirements, create a  .env file in the root dir with the following ->
-> REACT_APP_API_URL : https://testproject-api-v2.strv.com
-> REACT_APP_API_KEY : Your api key.

Then Run from the project root directory from your terminal.
### `yarn start` to start the application
