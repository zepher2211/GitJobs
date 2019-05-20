import { createStore, compose, applyMiddleware } from 'redux'
import ReduxThunk from 'redux-thunk'
//import history from './history'

const initialState = {
    things: [],
    currentThing: {}
}

const reducer = (currentState, action) => {
    switch(action.type){
        case 'ADD_THING':
            return { 
                ...currentState, 
                things: [ 
                    ...currentState.things,
                    action.payload
                ]
            }
        break;
        case 'EDIT_THING':
            // setTimeout( () => history.replace('/things'), 0)
            return { 
                ...currentState, 
                things: currentState.things.map( thing => (
                    thing.id === action.thing.id ? { ...thing, ...action.thing } : thing
                ))
            }
        break;
        case 'REMOVE_THING':
            return { 
                ...currentState, 
                things: currentState.things.filter( thing => (
                    thing.id !== action.id
                ))
            }
        break;
        case 'CHANGE_NAME':
            return {
                ...currentState,
                currentThing: {
                    ...currentState.currentThing,
                    name: action.name
                }
            }
        break;
        case 'SELECT_THING':
            return { 
                ...currentState, 
                currentThing: currentState.things.find( thing => (
                    thing.id == action.id
                ))
            }
        break;
        case 'STORE_THINGS':
           return {
                ...currentState,
                things: action.things
           }
        break;
    }
    return currentState
}

const middleware = compose(
    applyMiddleware(ReduxThunk),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)


export const store = createStore(reducer, initialState, middleware)