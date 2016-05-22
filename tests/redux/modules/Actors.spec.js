import reducer, { initialState } from 'redux/modules/Actors'

describe('(Redux) Actors', () => {
  describe('(Reducer)', () => {
    it('sets up initial state', () => {
      expect(reducer(undefined, {})).to.eql(initialState)
    })
  })
})
