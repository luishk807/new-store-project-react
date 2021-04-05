import React, { useState, useEffect } from 'react';
import * as T from 'prop-types';
import {
  withStyles,
  Grid,
  Radio,
  Button,
} from '@material-ui/core';
import { formatNumber, sortOptions } from '../../utils';

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

    const checkOpts = {}
    
    opts.forEach(item => {
      checkOpts[item.id] = useSelected ? useSelected == item.id : item.default ? true : false;
    });

    setCheckedOptions(checkOpts);
    setItemOptions(opts);
  }, [options]);

  useEffect(() => {
    loadContent();
  }, [checkedOptions])

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
            optionTotal = `FREE`;
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