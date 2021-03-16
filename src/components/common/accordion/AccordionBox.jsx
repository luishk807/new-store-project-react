import React from 'react';
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

const AccordionB = ({options, title, section}) => {
  const classes = useStyles();

  const getSection = () => {
    switch(section) {
      case 'variant': {
        return <VariantItem data={options} />
      }
      case 'color': {
        return <ColorItem data={options} />
      }
      case 'size': {
        return <SizeItem data={options} />
      }
      case 'deal': {
        return <DealItem data={options} />
      }
    }
  }

  return ( 
      <div className={classes.root}>
        <Accordion className={classes.accordion}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
            className={classes.accordionHeader} 
          >
            <Typography className={classes.heading}>{title}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Grid container>
              {
                getSection()
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
  section: T.string
}

export default AccordionB;