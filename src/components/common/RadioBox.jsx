import React, { useState, useEffect } from 'react';
import * as T from 'prop-types';
import {
  withStyles,
  Grid,
  Radio,
  Button,
} from '@material-ui/core';
import { formatNumber, sortOptions } from 'src/utils';
import { useTranslation } from 'next-i18next'

const styles = (theme) => ({
  root: {
    padding: 10,
  },
  mainTitle: {
    fontSize: '1.1em',
  },
  radioRadio: {
    textAlign: 'left',
  },
  radioItemRadio: {
    display: 'table-cell',
    '& span': {
      paddingLeft: 0,
    }
  },
  radioItemContent: {
    display: 'table-cell',
  },
  radioDescription: {
    fontSize: '.8em',
    whiteSpace: 'pre-line',
  },
  radioTitle: {
    fontWeight: 'bold',
    marginBottom: '.2em',
  },
  radioTotal: {
    paddingTop: 6,
    textAlign: 'right',
  },
  gridRadioContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  gridRadioItemRadio: {
    width: '10%',
  },
  gridRadioItemContent: {
    width: '90%',
  },
  deliveryServiceListContainer: {
    alignItems: 'start',
    padding: '10px 0px',
    borderTop: 'none',
    [theme.breakpoints.down('sm')]: {
      borderTop: '1px solid rgba(0,0,0,.09)',
    }
  },
  gridRadioItemRadio: {
    textAlign: 'left'
  },
  gridRadioItemRadioRoot: {
    padding: 0,
  },
  gridRadioItemAmount: {
    textAlign: 'right'
  },
  gridRadioItemName: {
    textAlign: 'left',
    [theme.breakpoints.down('sm')]:{
      fontSize: '.9em',
    }
  }
});

const RadioBox = React.memo(({
  options, 
  classes,
  title,
  selected,
  onSelected,
  name,
  type
}) => {
  const [itemOptions, setItemOptions] = useState(null);
  const [checkedOptions, setCheckedOptions] = useState({})
  const [contentHtml, setContentHtml] = useState([]);
  const handleSelect = async(evt) => {
    const opt = options.filter(item => item.id === evt.target.value);
    const checks = Object.assign({}, checkedOptions);
    for(const i in checks) {
      checks[i] = false;
    }
    checks[evt.target.value] = true;
    setCheckedOptions(checks)
    onSelected(opt)
  }
  const { t } = useTranslation('common')

  useEffect(() => {
    let data = null;
    let useSelected = selected;
    if (type === "address") {
      let getFav = options.filter(item => item.selected === true);
      data = getFav ? getFav[0].id : options[0].id;
      if (!useSelected) {
        useSelected = data;
      }
    } 

    const opts = sortOptions(options, 'position');

    if (!opts) {
      opts = options
    }
    const checkOpts = {}
    
    opts.forEach(item => {
      checkOpts[item.id] = useSelected ? useSelected == item.id : item.default ? true : false;
    });

    setCheckedOptions(checkOpts);
    setItemOptions(opts);
  }, [options]);

  useEffect(() => {
    loadContent();
  }, [checkedOptions, selected])

  const loadContent = () => {
    let content = null;
    switch(type) {
      case 'address': {
        content = itemOptions && itemOptions.map((option, index) => {
          return (
            <Grid container key={index}>
              <Grid item lg={10} xs={9} className={classes.radioRadio}>
                <div className={classes.radioItemRadio}>
                  <Radio
                    checked={checkedOptions[option.id]}
                    onChange={handleSelect}
                    value={option.id}
                    name={name}
                  />
                </div>
                <div className={classes.radioItemContent}>
                  <p className={classes.radioTitle}>{option.name} {option.selected && '[Default]'}</p>
                  <p className={classes.radioDescription}>{option.address}</p>
                  <p className={classes.radioDescription}>{option.addressDistrict.name} {option.addressCorregimiento.name}</p>
                  <p className={classes.radioDescription}>{option.addressProvince.name}</p>
                  <p className={classes.radioDescription}>{option.addressCountry.nicename}</p>
                </div>
              </Grid>
              <Grid item lg={2} xs={3} className={classes.radioTotal}>
                <Button href={`/account/addresses/${option.id}`}  className={`secondButton`}>Edit</Button>
              </Grid>
            </Grid>
          )
        })
        break;
      }
      case 'payment': {
        content = itemOptions && itemOptions.map((option, index) => {
          return (
            <Grid container key={index}>
              <Grid item lg={12} xs={12} className={classes.radioRadio}>
                <div className={classes.radioItemRadio}>
                  <Radio
                    checked={checkedOptions[option.id]}
                    onChange={handleSelect}
                    value={option.id}
                    name={name}
                  />
                </div>
                <div className={classes.radioItemContent}>
                  <p className={classes.radioTitle}>{option.name}</p>
                  <p className={classes.radioDescription}>{option.description}</p>
                </div>
              </Grid>
            </Grid>
          )
        })
        break;
      }
      case 'deliveryService': {
        content = itemOptions && itemOptions.map((option, index) => {
          return (
            <Grid container key={index}>
              <Grid item lg={12} xs={12} className={classes.radioRadio}>
                <div className={classes.radioItemRadio}>
                  <Radio
                    checked={checkedOptions[option.id]}
                    onChange={handleSelect}
                    value={option.id}
                    name={name}
                  />
                </div>
                <div className={classes.radioItemContent}>
                  <p className={classes.radioTitle}>{option.name}</p>
                </div>
              </Grid>
            </Grid>
          )
        })
        break;
      }
      case 'deliveryServiceList': {
        content = itemOptions && itemOptions.map((option, index) => {
          return (
            <Grid container key={index}>
              <Grid item lg={12} xs={12} className={classes.gridRadioContainer}>
                <Grid container className={classes.deliveryServiceListContainer}>
                  <Grid item lg={1} xs={2} className={classes.gridRadioItemRadio}>
                    <Radio
                      checked={checkedOptions[option.id]}
                      onChange={handleSelect}
                      classes={{root: classes.gridRadioItemRadioRoot}}
                      value={option.id}
                      name={name}
                    />
                  </Grid>
                  <Grid item lg={9} xs={8} className={`${classes.radioTitle} ${classes.gridRadioItemName}`}>
                    {option.name}
                  </Grid>
                  <Grid item lg={2} xs={2} className={`${classes.radioTitle} ${classes.gridRadioItemAmount}`}>
                    {`$${option.amount}`}
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          )
        })
        break;
      }
      case 'deliveryOption': {
        content = itemOptions && itemOptions.map((option, index) => {
          let optionTotal = null;
          if (option.id == 1) {
            optionTotal = t('free').toUpperCase();
          }
          return (
            <Grid container key={index}>
              <Grid item lg={10} xs={9} className={classes.radioRadio}>
                <div className={classes.radioItemRadio}>
                  <Radio
                    checked={checkedOptions[option.id]}
                    onChange={handleSelect}
                    value={option.id}
                    name={name}
                  />
                </div>
                <div className={classes.radioItemContent}>
                  <p className={classes.radioTitle}>{option.name}</p>
                  <p className={classes.radioDescription}>{option.description}</p>
                </div>
              </Grid>
              <Grid item lg={2} xs={3} className={classes.radioTotal}>
                {optionTotal}
              </Grid>
            </Grid>
          )
        })
        break;
      }
      default: {
        content = itemOptions && itemOptions.map((option, index) => {
          let optionTotal = null;
          if (option.total > 0) {
            optionTotal = `$${formatNumber(option.total)}`;
          } else if (option.total < 0) {
            optionTotal = ``;
          } else if (option.deliveryOptionDeliveryServiceOptions && option.deliveryOptionDeliveryServiceOptions.length) {
            optionTotal = ``;
          } else {
            optionTotal = t('free').toUpperCase();
          }
          return (
            <Grid container key={index}>
              <Grid item lg={10} xs={9} className={classes.radioRadio}>
                <div className={classes.radioItemRadio}>
                  <Radio
                    checked={checkedOptions[option.id]}
                    onChange={handleSelect}
                    value={option.id}
                    name={name}
                  />
                </div>
                <div className={classes.radioItemContent}>
                  <p className={classes.radioTitle}>{option.name}</p>
                  <p className={classes.radioDescription}>{option.description}</p>
                </div>
              </Grid>
              <Grid item lg={2} xs={3} className={classes.radioTotal}>
                {optionTotal}
              </Grid>
            </Grid>
          )
        })
      }
    }
    setContentHtml(content);
  }

  return (
    <div className={classes.root}>
      {
        title && (<h4 className={classes.mainTitle}>{title}</h4>)
      }
      { contentHtml && contentHtml }
    </div>
  );
})

RadioBox.protoTypes = {
  classes: T.object,
  options: T.object.isRequired,
  title: T.string,
  onSelected: T.func,
  selected: T.number,
  name: T.name,
  type: T.string
}

export default withStyles(styles)(RadioBox);