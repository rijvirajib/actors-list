import { connect } from 'react-redux'
import { fetchActors } from '../modules/actors'

import Actors from 'components/Actors'

const mapActionCreators = {
  fetchActors
}

const mapStateToProps = (state) => ({
  actors: state.actors
})

export default connect(mapStateToProps, mapActionCreators)(Actors)
