import { injectReducer } from '../../store/reducers'

export default (store) => ({
  path: 'actors',
  /*  Async getComponent is only invoked when route matches   */
  getComponent (nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
        and embed an async module loader (jsonp) when bundling   */
    require.ensure([], (require) => {
      const Actors = require('./containers/ActorsContainer').default
      const reducer = require('./modules/actors').default

      injectReducer(store, { key: 'actors', reducer })

      cb(null, Actors)

    }, 'actors')
  }
})
