import { combineReducers } from 'redux';
import {cartReducer} from './cartReducer';
import {comandaReducer} from './comandaReducer';
import { gerenciamentoComandaReducer } from './gerenciamentoComandaReducer';
import {profileReducer} from './profileReducer';

export const rootReducer = combineReducers({
  cart: cartReducer,
  comanda: comandaReducer,
  comandas: gerenciamentoComandaReducer,
})
