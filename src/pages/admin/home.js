import React, { useEffect, useState } from 'react';
import * as T from 'prop-types';
import Link from 'next/link'
import { 
  withStyles,
  Grid,
  Button,
} from '@material-ui/core';
import { connect } from 'react-redux';
import AdminLayoutTemplate from '../../components/common/Layout/AdminLayoutTemplate';
import CardIcon from '../../components/common/CardIcon';
import Icons from '../../components/common/Icons';
import ProgressBar from '../../components/common/ProgressBar';
import { ADMIN_SECTIONS, SECTIONS } from '../../constants/admin';

const styles = (theme) => ({});

const Home = ({classe, userInfo}) => {
  const [cards, setCards] = useState(null)
  const loadSeactions = (role) => {
    if ( SECTIONS[role]) {
      const getSection = SECTIONS[role].map((section, index) => {
        return (
          <Grid item key={index} lg={2} xs={6}>
            <CardIcon link={ADMIN_SECTIONS[section].url} title={ADMIN_SECTIONS[section].names}>
              <Icons name={ADMIN_SECTIONS[section].key} />
            </CardIcon>
          </Grid>
        )
      })
      setCards(getSection);
    }
  }

  useEffect(() => {
    if (userInfo && userInfo.userRole) {
      loadSeactions(userInfo.userRole);
    }
  }, [userInfo])

  return (
    <AdminLayoutTemplate>
      <Grid container>
        <Grid item lg={12} xs={12}>
        <h1>Home Admin</h1>
        </Grid>
      </Grid>
      <Grid container>
        {
          cards ? cards : (
            <ProgressBar />
          )
        }
      </Grid>
    </AdminLayoutTemplate>
  )
}

Home.protoTypes = {
  classes: T.object
}

const mapStateToProps = state => ({
  userInfo: state.user
}) // add reducer access to props

export default connect(mapStateToProps)(withStyles(styles)(Home));