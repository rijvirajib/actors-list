import React, { PropTypes } from 'react'
import classes from './Actor.scss'
import validator from 'valid-url'

import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card'
import {GoogleMapLoader, GoogleMap, Marker} from "react-google-maps"
import FlatButton from 'material-ui/FlatButton'
import Badge from 'material-ui/Badge'
import IconButton from 'material-ui/IconButton';
import Avatar from 'material-ui/Avatar';
import FontIcon from 'material-ui/FontIcon';
import moment from 'moment';

export default class Actor extends React.Component {
  constructor(props) {
    super(props)
    this.props = props
    this.state = {
      expanded: false,
    }
  }
  handleExpandChange = (expanded) => {
    this.setState({expanded: expanded})
  }

  handleToggle = (event, toggle) => {
    this.setState({expanded: toggle})
  }

  handleExpand = () => {
    this.setState({expanded: true})
  }

  handleReduce = () => {
    this.setState({expanded: false})
  }
  
  loadGoogleMap(){
    const actor = this.props.actor;
    const position = {
      lat: parseInt(actor.activity_latitude),
      lng: parseInt(actor.activity_longitude)
    };
    return(
    <CardText expandable = {true}>
      <GoogleMapLoader
        containerElement = {<div style={map} />}
        googleMapElement = {
          <GoogleMap
            defaultZoom = {3}
            defaultCenter = {position}
          >
            <Marker position = {position}/>
          </GoogleMap>
        }
      />
    </CardText>
  );
  }

  loadMessage(){
    const actor = this.props.actor;
    const provider = actor.provider;
    if(isLink(actor.activity_message))
      return(
        <CardMedia
          overlay = {
            <CardHeader title = {actor.actor_description} />
          }>
          <img src = {actor.activity_message} />
        </CardMedia>
      );
    else
      return(
        <CardText>
          <p>{actor.actor_description}</p>
          <p>{actor.activity_message}</p>
       </CardText>
      );
  }

  render() {
    const actor = this.props.actor
    const provider = 'fa fa-' + this.props.actor.provider

    const map = actor.activity_latitude && actor.activity_longitude ? this.loadGoogleMap() : ''
    const message = this.loadMessage();

    const activity_date = moment(actor.activity_date).fromNow()

    return(
      <Card expanded={this.state.expanded} onExpandChange={this.handleExpandChange} className="col-xs-12 col-sm-6 col-md-4">
        <FontIcon className={provider} style={float}/>
        <CardHeader title={actor.actor_name}
          subtitle={'@' + actor.actor_username + ' ' + activity_date}
          avatar={actor.actor_avator}
          actAsExpander={true}
          showExpandableButton={true}
        />
        {map}
        <CardText expandable={true}>
          {message}
        </CardText>
        <CardActions style={cardPadding}>
          <Badge badgeContent = {actor.activity_likes} secondary={true} className="col-md-3">
            <IconButton onClick={this.handleToggle}>
              <FontIcon className="fa fa-thumbs-o-up fa-fw" />
            </IconButton>
          </Badge>
          <Badge badgeContent={actor.activity_shares} secondary={true} className="col-md-3" onClick={this.handleToggle}>
            <IconButton>
              <FontIcon className="fa fa-share-alt fa-fw" />
            </IconButton>
          </Badge>
          <Badge badgeContent={actor.activity_comments} secondary={true} className="col-md-3">
            <IconButton onClick={this.handleToggle}>
              <FontIcon className="fa fa-bell-o fa-fw" />
            </IconButton>
          </Badge>
        </CardActions>
      </Card>
    )
  }
}

const cardPadding = {
  marginBottom: '4px'
}
const float = {
  float: 'right',
  top: 10,
  right: 0
}
const map = {
  display:'flex',
  flex: 1,
  height: 250
}

function isLink(str) {
  let pattern =/(http|https):\/\/(\w+:{0,1}\w*)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/
  return pattern.test(str)
}
