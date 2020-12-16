import React, { useState, useEffect, useRef } from 'react';
import * as T from 'prop-types';
import ReactDOM from 'react-dom';
import { fade } from '@material-ui/core/styles';
import { 
  withStyles,
  InputBase,
  Grid,
  Button,
  Link,
} from '@material-ui/core';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import SearchIcon from '@material-ui/icons/Search';

import {
  SearchResultSample
} from '../../constants/samples/SearchResultSample';
import { searchProducts } from '../../api/products';

const styles = (theme) => ({
  search: {
    backgroundColor: 'black',
    display: 'inline-block',
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '50ch',
    },
  },
  searchResults: {
    position: 'absolute',
    backgroundColor: 'white',
    color: 'black',
    borderRadius: 2,
    maxHeight: 300,
    overflowY: 'scroll',
  }, 
  searchResultItems: {
    '& div': {
      padding: 10,
      cursor: 'pointer',
      color: 'grey',
      '&:hover, &:focus, &:active': {
        outline: '1px solid transparent',
        backgroundColor: 'grey',
        color: 'white',
      }
    }
  },
  searchBackground: {
    width: '100%',
    background: 'rgba(0,0,0,.7)',
    position: 'absolute',
    top: 0,
    left: 0,
    height: 4000,
    zIndex: '-1',
  }
});

const SearchBar = ({classes}) => {
  const [options, setOptions] = useState([]);
  const [currentTab, setCurrentTab] = useState(null);
  const [showResults, setShowResult] = useState(false);
  const [htmlList, setHtmlList] = useState([]);
  const [currentValue, setCurrentValue] = useState('');
  const refLists = useRef([]);

  const setFocus = async(direction) => {
    let focusIndex = currentTab;
    const total = refLists.current.length - 1;
    if (focusIndex === null) {
       focusIndex = 0;
    } else {
      if (direction === 'prev') {
        focusIndex--;
      } else if(direction === 'next') {
        focusIndex++;
      }
    }
    if (focusIndex > total || focusIndex < 0) {
      return;
    }
    setCurrentTab(focusIndex);
    ReactDOM.findDOMNode(refLists.current[focusIndex]).focus();
  }

  const onKeyDown = (evt) => {
    if (evt.keyCode === 13) {
      evt.preventDefault();
      clearInput();
      if (evt.target.id) {
        window.location.href = `/product/${evt.target.id}`;
      } else {
        window.location.href = `/searchResult?str=${currentValue}`;
      }
    } else if (evt.keyCode === 9) {
      setShowResult(false)
    } else if (evt.keyCode === 40) {
      evt.preventDefault();
      setFocus('next');
    } else if (evt.keyCode === 38) {
      evt.preventDefault();
      setFocus('prev');
    }
  }

  const clearInput = () => {
    setCurrentValue('')
    resetTab()
  }

  const handleSelect = (product) => {
    clearInput();
    window.location.href = `/product/${product.id}`;
  }

  const resetTab = () => {
    setShowResult(false)
    setCurrentTab(null)
    refLists.current = [];
  }

  const handleOnChange = async(evt) => {
    setCurrentValue(evt.target.value)
    resetTab()
    if (evt.target.value.length && evt.target.value.length > 3) {
      const getResult = await searchProducts(evt.target.value);
      if (getResult.length) {
        setOptions(getResult);
        setShowResult(true)
      }
    }
  }

  const getElRef = (el) => {
    if (el && !refLists.current.includes(el)) {
      refLists.current.push(el);
    }
  }

  return (
    <>
    <ClickAwayListener onClickAway={resetTab}>
      <div className={classes.search}>
        <div className={classes.searchIcon}>
          <SearchIcon />
        </div>
        <InputBase
          value={currentValue}
          placeholder="Search…"
          classes={{
            root: classes.inputRoot,
            input: classes.inputInput,
          }}
          onChange={handleOnChange}
          onFocus={resetTab}
          onKeyDown={onKeyDown}
          inputProps={{ 'aria-label': 'search' }}
        />
        {
          showResults && (
            <Grid container className={classes.searchResults}>
              {
                options.map((option, index) => {
                  return (
                    <Grid autoFocus item lg={12} xs={12} key={index} className={classes.searchResultItems}>
                      <div tabIndex={index} id={option.id} onClick={()=>handleSelect(option)} ref={getElRef} onKeyDown={onKeyDown}>
                      {
                        option.name
                      }
                      </div>
                    </Grid>
                  )
                })
              }
            </Grid>
          )
        }
      </div>
    </ClickAwayListener>
    {
      showResults && (<div className={classes.searchBackground}></div>)
    }
    </>
   );
}

SearchBar.protoTypes = {
  classes: T.object
}
export default withStyles(styles)(SearchBar);