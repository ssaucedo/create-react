import { call, put } from 'redux-saga/effects'
import { laterReturn } from '../helpers'

export default function* basicFlowService () {
  console.log('basicFlowService')
  try {
    return yield laterReturn({items: [{id: '1', name: 'first'}, {id: '2', name: 'second'}]})
  } catch (e) {
    return yield {error: 'Error on basicFlowService', reason: JSON.stringify(e)}

  }
}