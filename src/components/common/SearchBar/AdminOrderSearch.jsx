import React, { useState, useRef } from 'react';
import * as T from 'prop-types';
import { 
  withStyles,
  TextField,
  Button,
  Grid,
  debounce
} from '@material-ui/core';

import { SEARCH_OPTIONS } from '@/constants/orders';
import Icons from '@/common/Icons';
import Select from '@/common/SelectCustom';
import SearchFilterBtn from '@/common/SearchBar/SearchFilterBtn';

const styles = (theme) => ({
  texfield: {
    width: '100%'
  },
  select: {
    width: '100%',
    paddingRight: 5,
    [theme.breakpoints.down('sm')]: {
      margin: '10px 0px',
    }
  },
  button: {
    background: '#f8be15 !important',
    width: '100%',
    height: '100%',
    marginLeft: 5,
    '& svg': {
      fill: 'white'
    }
  },
  icon: {
    width: 20,
    height: 20,
    fill: 'black'
  },

  formControl: {
    minWidth: 120,
    marginRight: 5,
  },
});

const AdminOrderSearch = ({classes, onClick, icon = "search", placeholder = '', searchOption = true}) => {
  const [selectedDrop, setSelectedDrop] = useState(null);
  const [filterList, setFilterList] = useState([]);
  const inputRef = useRef();

  const handleSelectChange = (e) => {
    setSelectedDrop(e);
  }

  const handleRemoveFilter = (e) => {
    onClick({
      value: inputRef.current.value,
      searchBy: selectedDrop
    })
  }

  const handleKeyDown = (e) => {
    if(e.keyCode == 13){
      handleClick(e.target.value)
   }
  }

  const handleClick = (evt) => {
    const searchStr = inputRef.current.value;
    if (searchStr) {
      onClick({
        value: searchStr,
        searchBy: selectedDrop
      })
    }
    setFilterList(
      [searchStr]
    )
    inputRef.current.value = ''
  }

  return (
    <Grid container>
      <Grid item lg={3} md={3} xs={12}>
        <Select classes={{root: classes.select}} defaultValue={SEARCH_OPTIONS[0]} data={SEARCH_OPTIONS} label="Search By" onSelect={handleSelectChange} />
      </Grid>
      <Grid item lg={7} md={7} xs={10}>
        <TextField 
          className={classes.texfield} 
          id="outlined-basic" 
          label={placeholder} 
          variant="outlined" 
          inputRef={inputRef}
          onKeyDown={handleKeyDown} 
        />
      </Grid>
      <Grid item lg={2} md={2} xs={2}>
        {
          inputRef.current ? (
            <Button onClick={handleClick} className={classes.button}>
              <Icons classes={{icon: classes.icon}} name={icon}/>
            </Button>
          ) : (
            <Button disabled className={classes.button}>
              <Icons classes={{icon: classes.icon}} name={icon}/>
            </Button>
          )
        }
      </Grid>
      <Grid item lg={12} md={12} xs={12}>
        <SearchFilterBtn data={filterList} onClick={handleRemoveFilter}/>
      </Grid>
    </Grid>
   );
}

AdminOrderSearch.protoTypes = {
  classes: T.object,
  onClick: T.func.isRequired,
  icon: T.string,
  placeholder: T.string.isRequired,
  searchOption: T.bool
}
export default withStyles(styles)(AdminOrderSearch);