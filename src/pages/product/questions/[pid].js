import React, {useState, useEffect } from 'react';
import * as T from 'prop-types';
import { useRouter } from 'next/router';
import {
  Grid,
  Link,
  withStyles,
} from '@material-ui/core';
import moment from 'moment';
import LayoutTemplate from '../../../components/common/Layout/LayoutTemplate';
import { getImageUrlByType } from '../../../utils/form';
import { ADMIN_SECTIONS } from '../../../constants/admin';
import { sendQuestion, getQuestionById } from '../../../api/questions';
import { getItemById } from '../../../api';
import AnswerProductQuestionsForm from '../../../components/common/AnswerProductQuestionsForm';
import { getThumbnail } from '../../../utils/helpers/image'

const styles = (theme) => ({
  root: {
    padding:10
  },
  imageItem: {
    padding: 10,
  },
  contentSection: {
    padding: 10,
  },
  name: {
    fontSize: '2rem',
    fontWeight: 'bold',
    color: 'black',
    cursor: 'pointer',
  },
  imageAnswersContent: {
    padding: 10
  },
  answerItemsContainer: {
    padding: '10px 0px'
  }
});

const Index = ({classes, data}) => {
  const router = useRouter();
  const id = router.query.pid;
  const [images, setImages] = useState({});
  const [questions, setQuestions] = useState({})
  const [productInfo, setProductInfo] = useState({});
  const [showInfo, setShowInfo] = useState(false);
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

  const loadQuestions = async() => {
    const fetchQuestions = await getQuestionById({id: id});
    const getProductInfo = await getItemById(ADMIN_SECTIONS.product.url, fetchQuestions.product)
    setQuestions(fetchQuestions);
    setProductInfo(getProductInfo);
    loadImages(getProductInfo)
    setShowInfo(true);
  }

  useEffect(() => {
    loadQuestions()
  }, []);

  return showInfo && (
    <LayoutTemplate>
      <div className={classes.root}>
        <Grid container>
          <Grid item lg={2} xs={12} className={classes.imageItem}>
            <img src={`${images[0].original}`}  className={`img-fluid`} />
          </Grid>
          <Grid item lg={10} xs={12} className={classes.contentSection}>
            <Grid container>
              <Grid item lg={12} xs={12}>
                <Link onClick={()=>router.back()} className={classes.name}>{productInfo.name}</Link>
              </Grid>
              <Grid item lg={12} xs={12}>
                Preguntando en {moment(productInfo.createdAt).format('MMMM D, YYYY')}
              </Grid>
              <Grid item lg={12} xs={12}>
                <AnswerProductQuestionsForm data={questions} />
              </Grid>
            </Grid>
          </Grid>
          <Grid item lg={12} xs={12} className={classes.imageAnswersContent}>
          {
            questions && questions.questionAnswers.map((item, index) => {
              return (
                <Grid key={index} container className={classes.answerItemsContainer}>
                  <Grid item lg={12} xs={12}>{item.answer}</Grid>
                  <Grid item lg={12} xs={12}>{item.userId} on {moment(item.createdAt).format('MMMM D, YYYY')}</Grid>
                </Grid>
              )
            })
          }
          </Grid>
        </Grid>
      </div>
    </LayoutTemplate>
  );
}

Index.protoTypes = {
  classes: T.object,
  data: T.object,
}

export default withStyles(styles)(Index);