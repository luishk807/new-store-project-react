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
    height: '100%',
    borderRadius: '4px 0px 0px 4px',
    background: 'black',
    display: 'flex',
    padding: 10,
  },
  categoryIcon: {
    fill: 'white',
    zIndex: 1,
    width: 25,
  },
  categoryDropdownContainer: {
    position: 'absolute',
    marginTop: 1,
    borderRadius: 3,
    padding: 5,
    background: 'black',
    maxHeight: 500,
    overflowY: 'scroll',
  },
  categoryDropdownUl: {
    listStyleType: 'none',
    margin: 0,
    padding: 0,
    backgroundColor: 'black',
    minWidth: '180px',
  },
  categoryLink: {
    color: 'white',
    cursor: 'pointer',
    textDecoration: 'none',
    width: '100%',
    padding: '8px 10px',
    display: 'inline-block',
    '&:hover': {
      textDecoration: 'none',
      backgroundColor: 'white',
      color: 'black',
    }
  },
  categoryDropdownContainerActive: {
    display: 'block',
  },
  categoryDropdownContainerDisable: {
    display: 'none',
  }
})

const Dropdown = ({classes, options, onSelect, iconType}) => {
  const [categoryDropMenuActive, setCategoryDropMenuActive] = useState(false);
  
  const handleDropDownMenOver = () => {
    setCategoryDropMenuActive(true)
  }

  const handleDropDownMenuOut = () => {
    setCategoryDropMenuActive(false)
  }

  return options && (
    <div className={classes.categoryBtnContainer} onMouseOver={handleDropDownMenOver} onMouseOut={handleDropDownMenuOut}>
      <div className={classes.categoryBtn}>
        <Icons classes={{icon: classes.categoryIcon}} name={iconType}/>
      </div>
      <div className={`${classes.categoryDropdownContainer} ${categoryDropMenuActive ?classes.categoryDropdownContainerActive : classes.categoryDropdownContainerDisable}`}>
        <ul className={classes.categoryDropdownUl}>
          {
            options.map((option, index) => {
              return (
                <li key={index} className={classes.categoryDropdownLi}>
                  <Link onClick={()=>onSelect(option)} className={classes.categoryLink}>
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
 
Dropdown.protoTypes = {
  classes: T.object,
  iconType: T.string,
  onSelect: T.func,
  options: T.array.isRequired,
}

export default withStyles(styles)(Dropdown);