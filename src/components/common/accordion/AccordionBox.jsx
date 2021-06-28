import React, { useState, useEffect } from 'react';
import * as T from 'prop-types';
import { 
  makeStyles, 
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Grid,
  Typography
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import VariantItem from './sections/VariantItem';
import ColorItem from './sections/ColorItem';
import SizeItem from './sections/SizeItem';
import DealItem from './sections/DealItem';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    flexDirection: 'column',
  },
  accordionHeader: {
    backgroundColor: 'rgba(0,0,0,.03)',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  accordion: {
    width: '100%'
  }
}));

const AccordionB = ({options, title, section, id}) => {
  const [optionUrl, setOptionUrl] = useState(null);
  const [showData, setShowData] = useState(false);
  const [itemSection, setItemSection] = useState(null);
  const classes = useStyles();

  useEffect(() => {
    let urlLink = null;
    let itemSect = null;
    const total = options ? options.length : 0;
    switch(section) {
      case 'variant': {
        urlLink = <a target="_blank" href={`/admin/products/items/${id}`}>{total}</a>
        itemSect = <VariantItem data={options} />;
        break;
      }
      case 'color': {
        urlLink = <a target="_blank" href={`/admin/products/colors/${id}`}>{total}</a>
        itemSect = <ColorItem data={options} />;
        break;
      }
      case 'size': {
        urlLink = <a target="_blank" href={`/admin/products/sizes/${id}`}>{total}</a>
        itemSect = <SizeItem data={options} />;
        break;
      }
      case 'deal': {
        urlLink = <a target="_blank" href={`/admin/products/discounts/${id}`}>{total}</a>
        itemSect = <DealItem data={options} />;
        break;
      }
    }

    setItemSection(itemSect);
    setOptionUrl(urlLink);

  }, [section]);

  useEffect(() => {
    if (itemSection) {
      setShowData(true);
    }
  }, [itemSection])

  return showData && ( 
      <div className={classes.root}>
        <Accordion className={classes.accordion}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
            className={classes.accordionHeader} 
          >
            <Typography className={classes.heading}>{title}&nbsp;[{optionUrl}]</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Grid container>
              {
                itemSection && itemSection
              }
            </Grid>
          </AccordionDetails>
        </Accordion>
      </div>
   );
}
 
AccordionB.protoTypes = {
  options: T.array,
  title: T.string,
  id: T.number,
  section: T.string
}

export default AccordionB;