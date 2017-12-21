const context = {
  user: {
    name: '1',
    id: '11234142'
  },
  appContext: {
      flow: 'creation' // creation or edition
  }
}

export default function context(state = baseUI, action) {
  switch (action.type) {
    default:
      return state
  }
}