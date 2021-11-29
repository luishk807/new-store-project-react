import React, { useEffect, useState } from 'react';
import * as T from 'prop-types';
import { 
  withStyles, 
  Link,
} from '@material-ui/core';

import Icons from '@/common/Icons';

const styles = (theme) => ({
  categoryBtnContainer: {
    position: 'relative',
  },
  categoryBtn: {
    borderRadius: 4,
    background: 'white',
    border: '2px solid orange',
    display: 'inline-block',
    padding: 10,
    '& svg': {
      fill: 'orange',
      zIndex: 1,
      width: 25,
    }
  },
  categoryBtnSelected: {
    borderRadius: 4,
    background: 'orange',
    border: '2px solid orange',
    display: 'inline-block',
    padding: 10,
    '& svg': {
      fill: 'white',
      zIndex: 1,
      width: 25,
    }
  },
  categoryDropdownContainer: {
    borderRadius: 3,
    background: 'black',
    maxHeight: 500,
    overflowY: 'scroll',
  },
  categoryDropdownUl: {
    [theme.breakpoints.down('sm')]: {
      height: 300,
      overflowY: 'auto',
    },
    listStyleType: 'none',
    margin: '1px 0px 0px 0px',
    padding: 0,
    backgroundColor: 'white',
    minWidth: '180px',
    position: 'absolute',
    zIndex: 1,
    border: '1px solid rgba(0,0,0,.3)',
  },
  setRight: {
    right: 0,
    left: 'auto',
  },
  categoryLink: {
    color: 'black',
    cursor: 'pointer',
    width: '100%',
    padding: '8px 10px',
    display: 'inline-block',
    '&:hover': {
      backgroundColor: 'orange',
      color: 'white',
    }
  },
  categoryLinkSelected: {
    color: 'white',
    cursor: 'pointer',
    background: 'orange',
    width: '100%',
    padding: '8px 10px',
    display: 'inline-block',
    '&:hover': {
      color: 'white',
    }
  },
  categoryDropdownContainerActive: {
    display: 'block',
  },
  categoryDropdownContainerDisable: {
    display: 'none',
  }
})

const Index = ({classes, options, onSelect, iconType, align}) => {
  const [categoryDropMenuActive, setCategoryDropMenuActive] = useState(false);
  const [selectedItem, setSelectedItem] = useState({
    name: null,
    value: null
  });
  
  const handleDropDownMenOver = () => {
    setCategoryDropMenuActive(true)
  }

  const handleDropDownMenuOut = () => {
    setCategoryDropMenuActive(false)
  }

  const handleSelect = (evt) => {
    if (evt.name == selectedItem.name) {
      setSelectedItem({
        name: null,
        value: null
      });
      onSelect({
        name: null,
        value: null
      });
    } else {
      setSelectedItem(evt);
      onSelect(evt);
    }

    setCategoryDropMenuActive(false)
  }

  return options && (
    <div className={classes.categoryBtnContainer} onMouseOver={handleDropDownMenOver} onMouseOut={handleDropDownMenuOut}>
      <div className={`${selectedItem.name ? classes.categoryBtnSelected : classes.categoryBtn}`}>
        <Icons name={iconType}/>
      </div>
      <div className={`${classes.categoryDropdownContainer} ${categoryDropMenuActive ?classes.categoryDropdownContainerActive : classes.categoryDropdownContainerDisable}`}>
        <ul className={`${classes.categoryDropdownUl} ${align && align == 'right' && classes.setRight}`}>
          {
            options.map((option, index) => {
              return (
                <li key={index} className={classes.categoryDropdownLi}>
                  <Link onClick={() => handleSelect(option)} className={selectedItem.name == option.name ? classes.categoryLinkSelected : classes.categoryLink}>
                    {
                      option.name
                    }
                  </Link>
                </li>
              )
            })
          }
        </ul>
      </div>
    </div>
   );
}
 
Index.protoTypes = {
  align: T.oneOf['left', 'right'],
  classes: T.object,
  iconType: T.string,
  onSelect: T.func,
  options: T.array.isRequired,
}

export default withStyles(styles)(Index);