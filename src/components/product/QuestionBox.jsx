import React from 'react';
import * as T from 'prop-types';
import { useEffect, useState } from 'react';
import classNames from 'classnames';
import { useRouter } from 'next/router';
import {
  withStyles,
  Grid,
  FormControl,
  TextField,
  Divider,
  Button,
  Link
} from '@material-ui/core';
import MessageOutlinedIcon from '@material-ui/icons/MessageOutlined';
import CommentOutlinedIcon from '@material-ui/icons/CommentOutlined';

import { sendQuestion, getQuestions } from '@/api/questions';
import { handleFormResponse } from '@/utils/form';
import Snackbar from '@/common/Snackbar';
import Typography from '@/common/Typography';
import AskProductQuestionsForm from '@/common/AskProductQuestionsForm';

const styles = (theme) => ({
  root: {
    padding:'10px 0px'
  },
  qaItem: {
    display: 'flex',
    alignItems: 'center',
  },
  qaTitleContainer: {
    margin: '20px 0px',
  },
  qaLink: {
    display: 'inherit',
    fontWeight: 'bold',
    color: 'black',
  },
  qaDivider: {
    margin: '5px 0px',
  },
  qaItemTitle1: {
    fontWeight: 'bold',
  },
  qaAnswersContainer: {
    alignItems: 'start',
    padding: '5px 0px'
  },
  textButton: {
    boxShadow: 'none',
    '&:hover': {
      boxShadow: 'none',
    }
  },
});

const ProductQuestionBox = ({classes, data}) => {
  const router = useRouter();
  const [questions, setQuestions] = useState([])
  const [showQuestions, setShowQuestions] = useState(false);
  const [form, setForm] = useState({
    product: data.id,
    question: '',
  })
  const [snack, setSnack] = useState({
    severity: 'success',
    open: false,
    text: '',
  });

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      'question': value
    });
  }

  const submitQuestion = (e) => {
    if (!form.question) {
      setSnack({
        severity: 'error',
        open: true,
        text: 'Please enter a question',
      })
    } else {
      sendQuestion(form).then((res) => {
        const snackResp = handleFormResponse(res.data)
        setSnack(snackResp)
        setForm({
          ...form,
          'question': ''
        })
      })
    }
  }

  const loadQuestions = async() => {
    let range = questions ? questions.length + 5 : 5;
    const fetchQuestions = await getQuestions({limit: range});
    setQuestions(fetchQuestions);
    setShowQuestions(true)
  }

  useEffect(() => {
    loadQuestions()
  }, []);

  return showQuestions && (
    <div className={classes.root}>
      <Grid container>
        <Grid item lg={12} xs={12}>
          <Typography align="left" variant="h4" component="h4">Preguntas y respuestas</Typography>
        </Grid>
        <Grid item lg={12} xs={12}>
          <AskProductQuestionsForm data={data} />
        </Grid>
        <Grid item lg={12} xs={12} className={classes.qaTitleContainer}>
          <Typography align="left" variant="h5" component="h5">Ultima Preguntas</Typography>
          <Divider className={classes.qaDivider} />
        </Grid>
        <Grid item lg={12} xs={12}>
          <Grid container spacing={2}>
          {
            questions.map((question, index) => {
              return (
                <Grid key={index} item lg={12} xs={12}>
                  <Grid container>
                    <Grid item lg={12} xs={12} className={classes.qaItem}>
                      <Grid container className={classes.qaAnswersContainer}>
                        <Grid item lg={1} xs={2} className={classes.qaItemTitle1}>
                          <CommentOutlinedIcon width="20" height="20"/>&nbsp;P 
                        </Grid>
                        <Grid item lg={11} xs={10} align="left">
                          <Link href={`questions/${question.id}`} className={classes.qaLink}>
                            {question.question}
                          </Link>                   
                        </Grid>
                      </Grid>
                    </Grid>
                    {
                      question.product_answers && question.product_answers.length > 0 && (
                        <Grid item lg={12} xs={12}>
                          <Grid container className={classes.qaAnswersContainer}>
                              <Grid item lg={1} xs={2} className={classes.qaItemTitle1}>
                                  <MessageOutlinedIcon width="20" height="20"/>&nbsp;&nbsp;R: 
                              </Grid>
                              <Grid item lg={11} xs={10} align="left">                          
                                <Typography align="left" className={`${classes.questionAnswer}`} variant="body1" component="div">{question.product_answers[0].answer}</Typography>
                                <Typography align="left" variant="caption" component="legend">By: {question.product_answers[0].user}test on July 24</Typography>
                              </Grid>
                          </Grid>
                        </Grid>
                      )
                    }
                  </Grid>
                </Grid>
              )
            })
          }
          </Grid>
        </Grid>
        <Grid item lg={12} xs={12} className={classes.qaTitleContainer}>
          <Button onClick={loadQuestions} className={`mainButton ${classes.textButton}`}>Ver mas</Button>
        </Grid>
        <Grid item lg={12} xs={12} className={classes.qaTitleContainer}>
          <Divider className={classes.qaDivider} />
        </Grid>
      </Grid>
      <Snackbar open={snack.open} severity={snack.severity} onClose={()=>{setSnack({...snack,open:false})}} content={snack.text} />
    </div>
  );
}

ProductQuestionBox.protoTypes = {
  classes: T.object,
  data: T.object,
}
export default withStyles(styles)(ProductQuestionBox);