import Actor from './Actor'
import classes from './Actors.scss'

import React, { PropTypes } from 'react'
import { Router } from 'react-router'
import { Provider } from 'react-redux'

import RaisedButton from 'material-ui/RaisedButton';

const Actors = React.createClass({
  componentDidMount: function() {
    this.props.fetchActors()
  },

  render: function() {
    let actors = this.props.actors;
    if(actors.length > 0) {
      actors.sort((a,b) => {
        const i = a.actor_name;
        const j = b.actor_name;
        if(i < j) return -1;
        if(j < i) return 1;
        return 0;
      })
      return (
        <div className="row-fluid">
            {actors.map((actor, i) =>
              <Actor
                key={i}
                actor={actor}
              />
            )}
        </div>
      )
    } else {
      return (
        <center>Loading...</center>
      )
    }
  }
})

const alpha = (i, j) => {
  if(i < j) return -1;
  if(j < i) return 1;
  return 0;
};

export default Actors
