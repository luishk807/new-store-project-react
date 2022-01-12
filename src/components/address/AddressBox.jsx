import React from 'react';
import * as T from 'prop-types';
import {
  withStyles,
  Grid,
  Button
} from '@material-ui/core';
import Icons from '@/components/common/Icons';
import Typography from '@/components/common/Typography';
import { useTranslation } from 'next-i18next'

const styles = (theme) => ({
  root: {
    border: '1px solid #ccc',
    padding: 25,
    margin: 10,
    [theme.breakpoints.down('sm')]: {
      margin: '10px auto',
    }
  },
  addressContainer: {

  },
  iconItem: {
    textAlign: 'right'
  },
  icon: {
    width: 20,
    height: 20,
    fill: '#F31B59'
  },
  content: {
    padding: 0.5,
    textAlign: 'left'
  },
  title: {
    fontWeight: 'bold'
  },
  btnCont: {
    justifyContent: 'space-between'
  }
});

const AddressBox = ({classes, data, onClickEdit, onClickRemove, onClickSet}) => {
  const { t } = useTranslation(['common', 'addresses'])
    return (
      <div className={classes.root}>
        <Grid container className={classes.addressContainer} spacing={2}>
          <Grid item lg={12} className={classes.iconItem}>
            {
              data.selected ? (
                <Button onClick={() => onClickSet(data.id)}>
                  <Icons name="heart2" classes={{icon: classes.icon}} />
                </Button>
              ) : (
                <Button onClick={() => onClickSet(data.id)}>
                <Icons name="heart1" classes={{icon: classes.icon}} />
              </Button>
              )
            }
          </Grid>
          <Grid item lg={12} className={classes.title}>{data?.name}</Grid>
          <Grid item lg={12} className={classes.content}>{data?.address}</Grid>
          {
            data.addressB && (
              <Grid item lg={12} className={classes.content}>{data?.addressB}</Grid>
            )
          }
          <Grid item lg={12} className={classes.content}>
          { data.addressDistrict && `${data.addressDistrict?.name}`}
          { data.addressCorregimiento && `${data.addressCorregimiento?.name}`}
          </Grid>
          <Grid item lg={12} className={classes.content}>{data.addressProvince?.name}</Grid>
          <Grid item lg={12} className={classes.content}>{data.addressCountry?.nicename}</Grid>
          <Grid item lg={12} className={classes.content}>{ t('addresses:phone') }: {data?.phone}</Grid>
          <Grid item lg={12} className={classes.content}>{ t('addresses:mobile') }: {data?.mobile}</Grid>
          {
            data.note && (
              <Grid item lg={12} className={classes.content}>Note: {data.note}</Grid>
            )
          }
          <Grid item lg={12} xs={12}>
            <Grid container className={classes.btnCont}>
             <Grid item lg={5} xs={5}>
                <Button className={`mainButton`} onClick={ () => onClickEdit(data.id)}>
                  <Typography>{ t('common:edit') }</Typography>
                </Button>
              </Grid>
              <Grid item lg={5} xs={5}>
                <Button className={`mainButton`} onClick={ () => onClickRemove(data.id)}>
                    <Typography>{ t('common:remove') }</Typography>
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
    )
}
AddressBox.protoTypes = {
  classes: T.object,
  data: T.object,
  onClickSet: T.func,
  onClickEdit: T.func,
  onClickRemove: T.func,
} 
export default withStyles(styles)(AddressBox);