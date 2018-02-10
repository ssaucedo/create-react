import {takeEvery, call, fork, put, take, cancel} from 'redux-saga/effects'

// ------------------------- VIEW ACTIONS --------------------------------------------

const addToCart  = 'ADD_TO_CART'
const moreItemInfo  = 'MORE_ITEM_INFO'
const seeCart  = 'SEE_CART'
const checkoutCart  = 'CHECKOUT_CART'
const updateItemQuantity = 'UPDATE_ITEM_QUANTITY'
const removeItem = 'REMOVE_ITEM'
const cleanCart = 'CLEAN_CART'
const confirmCart = 'CONFIRM_CART'
const cancelCart = 'CANCEL_CART'


const shoppingViewActions = [addToCart, moreItemInfo, seeCart, checkoutCart]

const seeCartViewActions = [updateItemQuantity, removeItem, cleanCart, checkoutCart]

const checkoutCartViewActions = [confirmCart, cancelCart]

// ------------------------- VIEWS --------------------------------------------

function * shoppingView () {
  let action = yield take(shoppingViewActions)
  while([addToCart, moreItemInfo].includes(action.type)) {
    if(action.type === addToCart) {
      yield call(cartAdditionConfirmation, action)
    }

    if(action.type === moreItemInfo) {
      const itemInfo = yield call(itemInfoService, action.payload.itemId)
      yield put({type: 'UPDATE_OPERATION_STATE', payload: {itemInfo}})
    }

    action = yield take(shoppingViewActions)
  }

  if(action.type === 'SEE_CART') {
    return yield put({type: 'UPDATE_APPLICATION_CONTEXT', payload: {item: action.payload}}) // go to different view, show different component
  }

  if(action.type === 'CHECKOUT_CART') {
    return yield put({type: 'UPDATE_APPLICATION_CONTEXT', payload: {item: action.payload}}) // go to different view, show different component
  }
}

function * checkoutView () {
  let userInteraction = yield take(checkoutCartViewActions)
  if(userInteraction.type === confirmCart) {
    yield put({type: 'SHOW_MODAL', modalType: 'CHECKOUT_CONFIRMATION_MODAL'})
    userInteraction = yield take(['CONFIRM_CHECKOUT', 'CANCEL_CHECKOUT'])
    if (userInteraction.type === 'CONFIRM_CHECKOUT') {
      console.log('CHECKOUT CONFIRMED! CONGRATULATIONS')
      yield put("CLOSE_MODAL")
      return yield put({type: 'UPDATE_APPLICATION_CONTEXT', payload: {item: action.payload}}) // go to different view, show different component
    }

    if (userInteraction.type === 'CANCEL_CHECKOUT') {
      console.log('CHECKOUT CONFIRMED! CONGRATULATIONS')
      yield put("CLOSE_MODAL")
      return yield put({type: 'UPDATE_APPLICATION_CONTEXT', payload: {item: action.payload}}) // go to different view, show different component
    }
  }
}

function * cartView () {
  let action = yield take(seeCartViewActions)
  while([removeItem, updateItemQuantity].includes(action.type)) {
    if(action.type === updateItemQuantity) {
      yield put({type: 'UPDATE_CART_ITEM_QUANTITY', payload: {item: action.payload}})
    }

    if(action.type === moreItemInfo) {
      const itemInfo = yield call(itemInfoService, action.payload.itemId)
      yield put({type: 'UPDATE_OPERATION_STATE', payload: {itemInfo}})
    }

    action = yield take(shoppingViewActions)
  }

  if(action.type === cleanCart) {
    return yield put({type: 'UPDATE_APPLICATION_CONTEXT', payload: {item: action.payload}}) // go to different view, show different component
  }

  if(action.type === checkoutCart) {
    return yield put({type: 'UPDATE_APPLICATION_CONTEXT', payload: {item: action.payload}}) // go to different view, show different component
  }
}


function itemInfoService(itemId) {
  return later(1000).then(() => ({itemId, metadata: {description: 'HI!'}}))
}

function later(delay) {
  return new Promise(function(resolve) {
    setTimeout(resolve, delay);
  });
}

/**
 * Handles user interaction and choice modal.
 * @param action
 */
function * cartAdditionConfirmation (action) {
  yield put("SHOW_MODAL")
  const userInteraction = yield take(['CONFIRM_ADDITION', 'CANCEL_ADDITION'])
  if(userInteraction.type === 'CONFIRM_ADDITION') {
    yield put("CLOSE_MODAL")
    yield put({type: 'UPDATE_CART', payload: {item: action.payload}})
  }

  if(userInteraction.type === 'CANCEL_ADDITION') {
    yield put("CLOSE_MODAL")
  }

}
