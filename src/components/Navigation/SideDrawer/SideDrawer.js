import React from 'react';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import classes from './SideDrawer.css';
import Backdrop from '../../UI/Backdrop/Backdrop';
import Aux from '../../../hoc/Aux';

const sideDrawer = props => {
  let drawerClasses = [classes.SideDrawer, classes.Closed];
  if (props.open) {
    drawerClasses = [classes.SideDrawer, classes.Open];
  }

  return (
    <Aux>
      <Backdrop clicked={props.toggle} show={props.open} />
      <div className={drawerClasses.join(' ')}>
        <div className={classes.Logo}>
          <Logo />
        </div>
        <nav>
          <NavigationItems />
        </nav>
      </div>
    </Aux>
  );
};

export default sideDrawer;