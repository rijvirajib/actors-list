import React from 'react'
import { IndexLink, Link } from 'react-router'
import classes from './Header.scss'

import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import NavigationClose from 'material-ui/svg-icons/navigation/close';

export const Header = (props) => (
  <div className="row">
    <AppBar
      title="NUVI Actors"
    />
</div>
)

export default Header
