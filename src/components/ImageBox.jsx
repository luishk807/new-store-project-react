import React, { useEffect, useState } from 'react';
import Carousel from 'react-material-ui-carousel'
import cn from 'classnames';
import * as T from 'prop-types';
import { 
  withStyles, 
  Grid,
  Paper,
  Link,
} from '@material-ui/core';

import { getImageBoxesByType } from '../api/imageBoxes';

const styles = (theme) => ({
  root: {
    margin: '20px 0px',
  },
  imageBoxItem: {
    padding: 5,
    display: 'inline-block'
  },
  table: {
    display: 'table'
  },
  row: {
    display: 'table-row',
    textAlign: 'center',
  },
  rowTitle: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '2em',
    fontWeight: 'bold',
    textTransform: 'capitalize',
  },
  columnMiniImageBox: {
    display: 'table-cell',
    padding: 5,
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      display: 'inline-block',
    }
  },
  columnStoreImageBox: {
    display: 'inline-block',
    width: '10%',
    padding: 10,
    [theme.breakpoints.down('sm')]: {
      width: '30%',
      padding: 10,
    }
  },
  columnBrandImageBox: {
    display: 'inline-block',
    width: '10%',
    padding: 10,
    [theme.breakpoints.down('sm')]: {
      width: '30%',
      padding: 10,
    }
  }
});

const ImageBox = ({classes, type, showTitle = false}) => {
  const imageUrl = `${process.env.IMAGE_URL}/slideImages`;
  const [imageBoxes, setImageBoxes] = useState([]);
  const [showData, setShowData] = useState(false);

  const loadImageBoxes = async() => {
    const data = await getImageBoxesByType(type);
    if (data) {
      setImageBoxes(data)
      setShowData(true);
    }
  }

  useEffect(() => {
    loadImageBoxes();
  }, [showData]);

  return showData && (
    <div className={classes.root}>
      <div className={classes.table}>
        {
          showTitle && (
            <div className={`${classes.row} ${classes.rowTitle}`}>
              {
                imageBoxes.name
              }
            </div>
          )
        }
        <div className={classes.row}>
        {
          imageBoxes.productImages.map((imageBox, index) => {
            let imageBoxUrl = `${imageUrl}/${imageBox.img_url}`;
            switch(type) {
              case 2: {
                return (
                  <div key={index} className={classes.columnMiniImageBox}>
                    <Link href={imageBox.url}>
                      <img className='img-fluid' src={imageBoxUrl} alt=""/>
                    </Link>
                  </div>
                )
                break;
              }
              case 3: {
                return (
                  <div key={index} className={classes.columnBrandImageBox}>
                    <Link href={imageBox.url}>
                      <img className='img-fluid' src={imageBoxUrl} alt=""/>
                    </Link>
                  </div>
                )
                break;
              }
              case 4: {
                return (
                  <div key={index} className={classes.columnStoreImageBox}>
                    <Link href={imageBox.url}>
                      <img className='img-fluid' src={imageBoxUrl} alt=""/>
                    </Link>
                  </div>
                )
                break;
              }
            }
          })
        }
        </div>
      </div>
    </div>
  );
}

ImageBox.protoTypes = {
  classes: T.object,
  type: T.number,
  showTitle: T.bool,
}

export default withStyles(styles)(ImageBox);