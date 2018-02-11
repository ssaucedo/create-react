import { takeLatest, call, fork, put, take, cancel } from 'redux-saga/effects'
import { cloneableGenerator } from 'redux-saga/utils'
import sagas, { updateState, basicFlow } from '../../Pattern3/sagas'
import basicFlowService from '../../Pattern3/sagasServices'


/*
    When coding sagas under this pattern, you can start thinking on flows as a whole.
    Write TDD for flows is simple too.
    I found that defining just the 'body' or steps of a flow in a test at the beginning can help
    to see most of the cases from the first moment.

    it('START-NEXT-CONFIRM', () => {
      **
    })

    it('START-NEXT-CANCEL', () => {
      **
    })

    it('START-CANCEL', () => {
      **
    })

    it('START-SERVICE-ERROR', () => {
      **
    })

    it('START-UNEXPECTED-ERROR', () => {
      **
    })
 */

/*
 *  Tests that the flow is exported and exposed using takeLatest effect.
 */
describe('Export and Expose flow', () => {
  it('BasicFlow exposed through USER_STARTS_FLOW', () => {
    const gen = sagas.flow()
    expect(gen.next().value).toEqual(takeLatest('USER_STARTS_FLOW', basicFlow))
    expect(gen.next().done).toBeTruthy()
  })
})

describe('Basic flow saga:', () => {
  const gen = cloneableGenerator(basicFlow)()
  expect(gen.next().value).toEqual(put(updateState('UPDATE_SIDEBAR_STATE')))
  expect(gen.next().value).toEqual(put(updateState('UPDATE_SIDEBAR_LOADING', {loading: true})))

  const serviceCallAndSelectionStep = (gen) => {
    expect(gen.next().value).toEqual(call(basicFlowService))
    expect(gen.next({
      items: [{
        id: 1,
        name: 2,
      }],
    }).value).toEqual(put(updateState('UPDATE_SIDEBAR_LOADING', {loading: false})))
    expect(gen.next().value).toEqual(take('USER_SELECTION_STEP'))
  }

  it('START-NEXT-CONFIRM', () => {
    const clone = gen.clone()
    serviceCallAndSelectionStep(clone)
    expect(clone.next({cancel: false}).value).toEqual(put(updateState('UPDATE_MODAL_STATE')))
    expect(clone.next().value).toEqual(take('USER_CONFIRMATION_STEP'))
    expect(clone.next({}).value).toEqual(put(updateState('UPDATE_MODAL_STATE')))
    expect(clone.next().value).toEqual(put(updateState('RESET_FLOW')))
    expect(clone.next().done).toBeTruthy()
  })

  it('START-NEXT-CANCEL', () => {
    const clone = gen.clone()
    serviceCallAndSelectionStep(clone)
    expect(clone.next({cancel: false}).value).toEqual(put(updateState('UPDATE_MODAL_STATE')))
    expect(clone.next().value).toEqual(take('USER_CONFIRMATION_STEP'))
    expect(clone.next({cancel: true}).value).toEqual(put(updateState('RESET_FLOW')))
    expect(clone.next().done).toBeTruthy()
  })

  it('START-CANCEL', () => {
    const clone = gen.clone()
    serviceCallAndSelectionStep(clone)
    expect(clone.next({cancel: true}).value).toEqual(put(updateState('RESET_FLOW')))
  })

  it('START-SERVICE-ERROR', () => {
    const clone = gen.clone()
    expect(clone.next().value).toEqual(call(basicFlowService))
    const res = {
      error: 'Error on basicFlowService', reason: JSON.stringify({}),
    }
    expect(clone.next(res).value).toEqual(put(updateState('ERROR_ON_BASIC_FLOW', {...res})))
    expect(clone.next().done).toBeTruthy()
  })

  it('START-UNEXPECTED-ERROR', () => {
    const clone = gen.clone()
    expect(clone.next().value).toEqual(call(basicFlowService))
    expect(clone.next().value)
      .toEqual(put(updateState('ERROR_ON_BASIC_FLOW', {
        error: 'Unexpected error on basicFlowService',
        reason: new TypeError('Cannot read property \'error\' of undefined'),
      })))
  })
})
