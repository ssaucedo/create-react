import {operation} from './sagas'
import BuildService from '../service/buildService'

// check https://github.com/redux-saga/redux-saga/blob/34c9093684323ab92eacdf2df958f31d9873d3b1/test/interpreter/effectMiddlewares.js#L88

describe('Integration test saga-services:', () => {
  it('Base case', () => {
    const saga = operation(BuildService)
    const effect = saga.next()
    console.log(JSON.stringify(effect.value.CALL))
    console.log(JSON.stringify(Object.keys(effect.value)))
    saga.next()
    saga.next()

  })

})
