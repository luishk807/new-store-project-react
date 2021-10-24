import React, {useState, useEffect } from 'react';
import * as T from 'prop-types';
import { useRouter } from 'next/router';
import {
  withStyles,
  Grid
} from '@material-ui/core';

import { getImageUrlByType } from 'src/utils/form';
import AddForm from 'src/components/common/Form/AddForm';
import { MAIN_SECTIONS } from 'src/constants';
import { getItemById } from 'src/api';
import { getThumbnail } from 'src/utils/helpers/image'

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
    const imgs = data.productImages.map((img) => {
        return {
          original: `${imageUrl}/${img.img_url}`,
          thumbnail: `${imageUrl}/${getThumbnail(img)}`,
        }
    });
    setImages(imgs);
  }

  const loadProductInfo = async() => {
    const getProductInfo = await getItemById(MAIN_SECTIONS.product.url, id)
    loadImages(getProductInfo)
    setProductInfo(getProductInfo);
    setShowData(true);
  }

  useEffect(() => {
    loadProductInfo();
  }, [])

  const ignoreEntry=['product'];

  return showData && (
    <AddForm 
      userSection={MAIN_SECTIONS.rate} 
      customUrl={`/product/${id}`} 
      cancelUrl={`/product/${id}`} 
      successUrl={`/product/${id}`} 
      ignoreForm={ignoreEntry} 
      entryForm={form} >
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