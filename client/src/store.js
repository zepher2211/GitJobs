import { createStore, compose, applyMiddleware } from 'redux'
import ReduxThunk from 'redux-thunk'
//import history from './history'

const initialState = {
    loginForm: {},
    currentUser: null,
    isAuth: false
    
}

const reducer = (currentState, action) => {
    switch(action.type){
        case 'EDIT_EMAIL':
            return { 
                ...currentState, 
                loginForm: {
                    ...currentState.loginForm,
                    email: action.email
                }
            }
        break;
        case 'EDIT_PASSWORD':
            return { 
                ...currentState, 
                loginForm: {
                    ...currentState.loginForm,
                    password: action.password
                }
            }
        break;
        case 'SET_USER':
                return { 
                    ...currentState, 
                    currentUser: action.user
                }
        break;
        case 'IS_AUTH':
            return { 
                ...currentState, 
                isAuth: action.res
            }
        break;
    }
    return currentState
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const middleware = composeEnhancers(
    applyMiddleware(ReduxThunk)
)


export const store = createStore(reducer, initialState, middleware)