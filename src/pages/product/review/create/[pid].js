import React, {useState, useEffect } from 'react';
import * as T from 'prop-types';
import { useRouter } from 'next/router';
import {
  withStyles,
  Grid
} from '@material-ui/core';

import { getImageUrlByType } from '../../../../utils/form';
import { ADMIN_SECTIONS } from '../../../../constants/admin'
import AddForm from '../../../../components/common/Form/Users/AddForm';
import { getItemById } from '../../../../api';
import Rate from '../../../../components/common/Rate/Rate';
import PrivatePage from '../../../../components/common/Form/Users/PrivatePage';

const styles = (theme) => ({
  root: {
    padding:10
  },
});

const Index = ({classes, data}) => {
  const router = useRouter();
  const id = router.query.pid;
  const [images, setImages] = useState({});
  const [productInfo, setProductInfo] = useState({});
  const [showData, setShowData] = useState(false);

  const [form, setForm] = useState({
    rate: null,
    title: null,
    comment: null,
    product: id,
  });
  
  const loadImages = (data) => {
    const imageUrl = getImageUrlByType('product');
    const imgs = data.product_images.map((img) => {
        return {
          original: `${imageUrl}/${img.img_url}`,
          thumbnail: `${imageUrl}/${img.img_url}`,
        }
    });
    setImages(imgs);
  }

  const loadProductInfo = async() => {
    const getProductInfo = await getItemById(ADMIN_SECTIONS.product.url, id)
    console.log('product', getProductInfo)
    loadImages(getProductInfo)
    setProductInfo(getProductInfo);
    setShowData(true);
  }

  useEffect(() => {
    loadProductInfo();
  }, [])

  const ignoreEntry=['product'];

  return showData && (
      <AddForm customUrl={`/product/${id}`} ignoreForm={ignoreEntry}  name={ADMIN_SECTIONS.rate.key} entryForm={form} >
        <Grid container>
          <Grid item lg={3} xs={12} align="center">
            <img src={`${images[0].original}`}  className={`img-fluid`} />
          </Grid>
          <Grid item lg={5} xs={12} align="center">
            {productInfo.description}
          </Grid>
        </Grid>
      </AddForm>
  );
}

Index.protoTypes = {
  classes: T.object,
  data: T.object,
}

export default withStyles(styles)(Index);