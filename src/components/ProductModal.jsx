import React, { useEffect, useState } from 'react';
import * as T from 'prop-types';
import { 
  withStyles, 
  Grid,
} from '@material-ui/core';
import Modal from './common/Modal';
import { getAdminProductById } from 'src/api/products';
import AccordionBox from './common/accordion/AccordionBox';

const styles = (theme) => ({
  root: {
    width: '50%',
    margin: '0px auto',
    [theme.breakpoints.down('sm')]: {
      width: '100%'
    }
  },
  title: {
    padding: '20px',
    textAlign: 'left'
  },
  productModalInnerCont: {
    maxHeight: '800px',
    overflow: 'auto',
  }
})

const ProductModal = ({
  classes, 
  productId,
  onClose
}) => {
  const [productModalContent, setProductModalContent] = useState(null);
  const [openProductModal, setOpenProductModal] = useState(false);
  const [showData, setShowData] = useState(false);
  const [productInfo, setProductInfo] = useState(null);

  useEffect(() => {
    if (productId) {
      loadProductModal(productId)
    }
  }, [productId])

  useEffect(() => {
    if (productInfo) {
      setShowData(true)
    }
  }, [productInfo])

  const handleCloseWindow = () => {
    setOpenProductModal(false);
    setShowData(false)
    setProductInfo(null)
    onClose()
  }

  useEffect(() => {
    if (productModalContent) {
      setOpenProductModal(true);
    }
  }, [productModalContent]);

  const loadProductModal = async(productId) => {
    const getProd = await getAdminProductById(productId);

    if (getProd) {
      setProductInfo(getProd);
      setProductModalContent(
        <div className={classes.productModalInnerCont}>
          <Grid container>
            <Grid item lg={12} xs={12}>
              <AccordionBox id={productId} section="variant" title="Variantes" options={getProd.productProductItems}/>
            </Grid>
            <Grid item lg={12} xs={12}>
              <AccordionBox id={productId} section="size" title={`Tamaños`}  options={getProd.productSizes} />
            </Grid>
            <Grid item lg={12} xs={12}>
              <AccordionBox id={productId} section="color" title={`Colores`} options={getProd.productColors}/>
            </Grid>
            <Grid item lg={12} xs={12}>
              <AccordionBox id={productId} section="deal" title={`Descuentos`} options={getProd.productProductDiscount}/>
            </Grid>
          </Grid>
        </div>
      )
    }

  }

  return showData && ( 
    <Modal
      onOpen={openProductModal}
      onClose={handleCloseWindow}
      classes={{modal: classes.root}}
    >
      <div className={classes.title}>
        <a target="_blank" href={`/admin/products/${productInfo.id}`}>{productInfo.name}</a>
      </div>
      {productModalContent}
    </Modal>
   );
}
 
Modal.protoTypes = {
  classes: T.object,
  onClose: T.func,
  productId: T.number,
}

export default withStyles(styles)(ProductModal);