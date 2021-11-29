import React, { useEffect, useState } from 'react';
import * as T from 'prop-types';
import {
  withStyles,
  Button,
  Grid
} from '@material-ui/core';

const styles = (theme) => ({
  searchFilterBox: {
    border: '1px dashed black',
    color: 'black',
    minWidth: 200,
    margin: 5,
    dipley: 'flex',
    justifyContent: 'space-between',
    fontSize: '.8em'
  }
});

const SearchFilterBtn = ({classes, data, onClick}) => {
    const [filterList, setFilterList] = useState([]);
    const [showData, setShowData] = useState(false);

    useEffect(() => {
      let htmlTemp = [];
      
      if (data && Object.keys(data).length) {
        Object.keys(data).map((item, index) => {
          if (data[item]) {
            htmlTemp.push(
              <Button onClick={() => handleClick(index)} key={index} className={classes.searchFilterBox}>
              <div>
              {
                data[item]
              }
              </div>
              <div>
                &#10005;
              </div>
            </Button>
            )
          }
        })
        if (htmlTemp.length) {
          setFilterList(htmlTemp);
        }

      }

    }, [data]);

    const handleClick = (e) => {
      const currFilter = filterList;
      currFilter.splice(e);
      setFilterList(currFilter)
      onClick()
    }

    useEffect(() => {
      if (filterList && filterList.length) {
        setShowData(true)
      } else {
        setShowData(false)
      }
    }, [filterList]);

    return showData && (
      <Grid container>
        <Grid item>
          <i>Searching</i>: {
            filterList.map((filter, index) => {
              return filter
            })
          }
        </Grid>
      </Grid>
    )
}
SearchFilterBtn.protoTypes = {
  classes: T.object,
  data: T.object.isRequired,
  onClick: T.func
} 
export default withStyles(styles)(SearchFilterBtn);