import {createStore} from 'redux'
import itemReducer from './reducerItem'

const store = createStore(itemReducer)
export default store