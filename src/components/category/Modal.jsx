import React, { useEffect, useState } from 'react';
import * as T from 'prop-types';
import { 
  withStyles,
  Grid,
  Button, 
  Modal,
  TextField,
} from '@material-ui/core';

import Icons from '@/components/common/Icons';
import { getItems } from 'src/api';
import CategoryModalProducts from '@/components/category/ModalProduct';
import { useTranslation } from 'next-i18next'

const styles = (theme) => ({
  catIcons: {
    width: 40,
    height: 40,
    fill: '#000',
    textAlign: 'center'
  },
  topItemTitle: {
    padding: 9,
    textAlign: 'left',
  }, 
  topItemClose: {
    textAlign: 'right',
  },
  closeIcon: {
    width: 30,
    height: 30,
    fill: '#000',
  },
  catBtn: {
    width: '100%',
    padding: '25px 0px',
    '& svg': {
      fill: 'black'
    },
    borderRadius: 0,
  },
  catBtnClicked: {
    backgroundColor: 'black !important',
    '& svg': {
      fill: 'white'
    }
  },
  body: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100%',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: 'white',
  },
  header: {
    flexShrink: 0,
    display: 'flex',
    flexContainer: 'row',
    justifyContent: 'space-between',
    height: 50,
    alignContent: 'center',
    fontSize: '1.2em',
    '& span': {
      fontWeight: 'bold',
    }
  },
  contentSection: {
    height: '100%',
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
  },
  iconsContainer: {
    borderTop: '1px solid rgba(0,0,0,.08)',
    backgroundColor: 'rgba(0,0,0,.03)',
    overflowY: 'auto',
    width: '30%',
    paddingBottom: 50,
  },
  productsContainer: {
    overflowY: 'auto',
    width: '70%',
    paddingBottom: 50,
  },
  iconContainer: {
    display: 'flex',
    justifyContent: 'center',
  },
});

const CategoryModal = ({classes, open, onClose}) => {
  const [openCategory, setOpenCategory] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [categories, setCategories] = useState([]);
  const [showData, setShowData] = useState(false);
  const { t } = useTranslation('home')

  const getCategories = async() => {
    const categories = await getItems('categories');
    setSelectedCategory(categories[0])
    setCategories(categories);
    setShowData(true)
  }
  const handleIconClick = async(id) => {
    setSelectedCategory(categories[id]);
  }

  useEffect(() => {
    getCategories();
  }, [open])

  return (
    <Modal
      open={open}
    >
      <div className={classes.body}>
        <div className={`AppBarBackColor ${classes.header}`}>
          <div className={classes.topItemTitle}>
            { t('category') }:&nbsp;
            <span>
            {
              selectedCategory && selectedCategory.name
            }
            </span>
          </div>
          <div className={classes.topItemClose}>
            <Button onClick={onClose}>
              <Icons name="close" classes={{ icon: classes.closeIcon}}/>
            </Button>
          </div>
        </div>
        <div className={classes.contentSection}>
          <div className={classes.iconsContainer}>
            {
              categories && categories.map((data, index) => {
                return (
                  <div key={index} xs={12} className={classes.iconContainer}>
                    <Button onClick={()=>handleIconClick(index)} className={`${classes.catBtn} ${selectedCategory.id === data.id ? classes.catBtnClicked : '' }`}>
                      <Icons  name={data.icon} classes={{icon: classes.catIcons}} />
                    </Button>
                  </div>
                );
              })
            }
          </div>
          <div className={classes.productsContainer}>
            {
              selectedCategory && (
                <CategoryModalProducts category={selectedCategory.id} />
              )
            }
          </div>
        </div>
      </div>
    </Modal>
  );
}

CategoryModal.protoTypes = {
  classes: T.object,
  open: T.bool,
  onClose: T.func,
}
 
export default withStyles(styles)(CategoryModal);