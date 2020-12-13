import {firebase} from '../utils/firebase';
import {setComanda} from './userActions';

export const addItem = (item) => {
  return {
    type: "ADD_ITEM",
    item: item
  }
}

export const chamarGarcom = () => {
  return (dispatch, getState) => {
    const { comanda } = getState();
    dispatch(chamandoGarcom(!comanda.chamando));
    firebase.database().ref('comandas/' + comanda.comanda_id).update({
      chamando: !comanda.chamando
    });
  }
}

export const chamandoGarcom = (status) => {
  return {
    type: "CHAMANDO_GARCOM",
    payload: status 
  }
}

export const encerrarConta = () => {
  return (dispatch) => {
    dispatch({type: "REQUISITAR_PAGAMENTO"});
    firebase.database().ref('comandas/' + comanda.comanda_id).update({
      pagamento: true
    });
  }
}

export const carregarComanda = (codigo=1, userId=1) => {
  return (dispatch) => {
    var comanda;
    firebase.database().ref('comandas/'+ codigo).once('value', snap => {
      comanda = snap.val();
      if(userId==comanda.owner) {
        comanda.owner=true;
      } else {
        comanda.owner=false;
      }
    }).then(() => {
      dispatch({type: "CARREGAR_COMANDA", payload: [comanda, codigo]});
    }).then(() => {
      dispatch({type: "LOAD_SUCCESS"});
    });
  }
}

export const abrirComanda = (codigo=1, userId=1) => {
  return (dispatch) => {
    var comanda;
    firebase.database().ref('comandas/'+ codigo).once('value', snap => {
      comanda = snap.val();
    }).then(() => {
      if(comanda) {
        if(comanda.owner) {
          dispatch({type: "COMANDA_OCUPADA_ATRIBUIDA", payload: [comanda, codigo]});
          firebase.database().ref('comandas/'+codigo+'/consumo/'+userId).push();
          dispatch(setComanda(codigo, userId));
        } else {
          dispatch({type: "COMANDA_ATRIBUIDA", payload: [comanda, codigo]});
          firebase.database().ref('comandas/' + codigo).update({
            owner: userId
          });
          firebase.database().ref('comandas/'+codigo+'/consumo/'+userId).push();
          dispatch(setComanda(codigo, userId));
        }
        firebase.database().ref('comandas/' + codigo).update({
          chamando: false,
          pagamento: false,
        });
      } else {
        dispatch({type: "COMANDA_INEXISTENTE"});
      }
    })
  }
}