import React, { useState, useEffect, useRef } from 'react';
import * as T from 'prop-types';
import ReactDOM from 'react-dom';
import { alpha } from '@material-ui/core/styles';
import { 
  withStyles,
  InputBase,
  Grid,
  Hidden,
  Button,
  debounce
} from '@material-ui/core';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Icons from '@/common/Icons';
import Dropdown from '@/src/components/common/dropdown/SearchDrop';
import { getCategories } from '@/api/categories';
import { getCatSearch } from 'src/utils';

import { searchProducts } from '@/api/products';

const styles = (theme) => ({
  searchBarInputContent: {
    position: 'relative',
    background: 'white',
    padding: 3,
    width: '100%',
    alignItems: 'center',
    display: 'flex',
    borderRadius: '0px 4px 4px 0px',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      borderRadius: 4,
    }
  },
  search: {
    backgroundColor: 'black',
    display: 'inline-block',
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
  },
  icon: {
    fill: 'white',
    zIndex: 1,
    width: 25,
  },
  searchIcon: {
    // padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    right: 0,
    top: 0,
    borderRadius: '0px 4px 4px 0px',
    border: '1px solid white',
    outline: 'none'
  },
  inputRoot: {
    color: 'inherit',
    width: '80%',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: 15,
    transition: theme.transitions.create('width'),
    width: '80%',
    backgroundColor: 'white',
    color: 'black',
  },
  searchResults: {
    position: 'absolute',
    backgroundColor: 'white',
    color: 'black',
    borderRadius: 2,
    maxHeight: 300,
    overflowY: 'scroll',
    marginTop: '-3px',
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
  },
  searchContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
});

const SearchBar = ({classes}) => {
  const [options, setOptions] = useState([]);
  const [currentTab, setCurrentTab] = useState(null);
  const [showResults, setShowResult] = useState(false);
  const [dropDownOptions, setDropDownOptions] = useState([]);
  const [validButton, setValidButton] = useState(true);
  const refLists = useRef([]);
  const inputRef = useRef();

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
      const searcStr = evt.target.value;
      clearInput();
      if (evt.target.id) {
        window.location.href = `/product/${evt.target.id}`;
      } else {
        window.location.href = `/searchResult?str=${searcStr}`;
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

  const onSearchIconClick = () => {
    const searcStr = input.current.value;
    if (searcStr.length > 3) {
      window.location.href = `/searchResult?str=${searcStr}`;
      setValidButton(true)
    }
  }

  const clearInput = () => {
    inputRef.current.value = '';
    resetTab()
  }

  const handleSelect = (product) => {
    clearInput();
    window.location.href = `/product/${product.slug}`;
  }

  const handleDropDown = async(data) => {
    const url = await getCatSearch(data);
    window.location.href = url;
  }

  const resetTab = () => {
    setShowResult(false)
    setCurrentTab(null)
    refLists.current = [];
  }

  const handleOnChange = debounce(async(evt) => {
    const name = evt.target.value;
    resetTab()
    if (name.length && name.length > 3) {
      const getResult = await searchProducts(name);
      if (getResult.length) {
        setOptions(getResult);
        setShowResult(true)
      }
    }
  }, 1000);
  
  const getElRef = (el) => {
    if (el && !refLists.current.includes(el)) {
      refLists.current.push(el);
    }
  }

  useEffect(() => {
    (async() => {
      let active = true;
      const categories = await getCategories();
      if (active) {
        setDropDownOptions(categories);
      }
      return (() => { active = false })
    })()
  }, [])

  return (
    <>
    <ClickAwayListener onClickAway={resetTab}>
      <div className={classes.search}>
        <div className={classes.searchContainer}>
          <Hidden smDown>
            <Dropdown options={dropDownOptions} onSelect={handleDropDown} iconType="listBullets" />
          </Hidden>
          <div className={classes.searchBarInputContent}>
            <div className={`AppBarBackColor ${classes.searchIcon}`}>
              <Button onClick={(e) => validButton && onSearchIconClick(e)}>
                <Icons classes={{icon: classes.icon}} name="search"/>
              </Button>
            </div>
            <InputBase
              inputRef={inputRef}
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
          </div>
        </div>
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