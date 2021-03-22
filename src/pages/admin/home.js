import React, { useEffect, useState } from 'react';
import * as T from 'prop-types';
import Link from 'next/link'
import { 
  withStyles,
  Grid,
  Button,
} from '@material-ui/core';
import AdminLayoutTemplate from '../../components/common/Layout/AdminLayoutTemplate';
import CardIcon from '../../components/common/CardIcon';
import Icons from '../../components/common/Icons';
import { ADMIN_SECTIONS, SECTIONS } from '../../constants/admin';

const styles = (theme) => ({});

const Home = ({classes}) => {
  const [cards, setCards] = useState([])
  const [hasAccess, setHasAccess] = useState([])
  const loadSeactions = () => {
    const getSection = SECTIONS.map((section, index) => {
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
  useEffect(() => {
    loadSeactions();
  }, [])

  return (
    <AdminLayoutTemplate>
      <Grid container>
        <Grid item lg={12} xs={12}>
        <h1>Home Admin</h1>
        </Grid>
      </Grid>
      <Grid container>
        {
          cards && cards
        }
      </Grid>
    </AdminLayoutTemplate>
  )
}

Home.protoTypes = {
  classes: T.object
}

export default withStyles(styles)(Home) ;