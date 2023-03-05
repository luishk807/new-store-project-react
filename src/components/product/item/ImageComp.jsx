import { useEffect, useMemo, useState, useCallback } from "react";
import * as T from 'prop-types';
import ImageGallery from 'react-image-gallery';
import ProgressBar from '@/common/ProgressBar';
import { getImageUrlByType } from 'src/utils/form';
import { removeDuplicatesByProperty } from 'src/utils';
import { noImageUrl } from 'config';
import { getThumbnail } from '@/utils/helpers/image'

const ImageComp = ({ product = {}, selectedProduct = {} }) => {
  const [images, setImages] = useState([]);

  const getGalleryImage = (original, thumbnail) => {
    return {
      original: original,
      thumbnail: thumbnail
    }
  }

  const loadImages = useCallback((data) => {
    const imageUrl = getImageUrlByType('product');
    let imgs = [];

    if (data && data.productImages) {
      imgs = imgs.concat(data.productImages.map((img) => {
        return getGalleryImage(`${imageUrl}/${img.img_url}`, `${imageUrl}/${getThumbnail(img)}`);
      }));
    }

    if (product && product.productImages && product.productImages.length) {
      imgs = imgs.concat(product.productImages.map((img) => {
        return getGalleryImage(`${imageUrl}/${img.img_url}`, `${imageUrl}/${getThumbnail(img)}`)
      }));
    } else {
      if (!data) {
        imgs.push(getGalleryImage(`${noImageUrl.svg}`, `${noImageUrl.svg}`));
      }
    }
    // Remove any duplicate images
    imgs = removeDuplicatesByProperty(imgs, 'original');
    setImages(imgs);
  }, []);

  useEffect(() => {
    loadImages(selectedProduct);
  }, [selectedProduct]);

  const Component = useMemo(() => images.length ? ImageGallery : ProgressBar, [images]);

  return <Component items={images} />
}

ImageComp.propTypes = {
  product: T.object,
  selectedProduct: T.object,
};

export default ImageComp;