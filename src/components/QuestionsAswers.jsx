import React from 'react';
import * as T from 'prop-types';
import { useEffect, useState } from 'react';
import classNames from 'classnames';
import {
  withStyles,
  Grid,
  FormControl,
  TextField,
  Divider,
  Button,
} from '@material-ui/core';
import MessageOutlinedIcon from '@material-ui/icons/MessageOutlined';
import CommentOutlinedIcon from '@material-ui/icons/CommentOutlined';

import { handleFormResponse } from '../utils/form';
import { sendQuestionm, getQuestions } from '../api/product';
import Snackbar from './common/Snackbar';
import Typography from './common/Typography';

const styles = (theme) => ({
  root: {
    padding:10
  },
  qaItem: {
    display: 'flex',
    alignItems: 'center',
  },
  questionTitle: {
    fontWeight: 'bold'
  },
  qaTitleContainer: {
    margin: '20px 0px',
  },
  qaDivider: {
    margin: '5px 0px',
  },
  textContainer: {
    width: '100%',
    margin: '20px 0px',
  },
  textInput: {
    // flexGrow: 2,
    width: '100%',
  },
  questionBtnContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  textButton: {
    // width: '100%',
//    height: '100%',
    boxShadow: 'none',
    '&:hover': {
      boxShadow: 'none',
    }
  }
});

const QuestionsAnswers = ({classes, data}) => {
  const [questions, setQuestions] = useState([])
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
    console.log('questions', fetchQuestions)
  }

  useEffect(() => {
    loadQuestions()
  }, []);

  return (
    <div className={classes.root}>
      <Grid container>
        <Grid item lg={12}>
          <Typography align="left" variant="h4" component="h4">Preguntas y respuestas</Typography>
        </Grid>
        <Grid item lg={12}>
          <FormControl className={classes.textContainer}>
            <Grid container spacing={2}>
              <Grid item lg={10} sm={12}>
                <TextField value={form.question} onChange={handleOnChange} className={classNames(classes.textInput)} id="outlined-basic" label="Tu pregunta" variant="outlined" />
              </Grid>
              <Grid item lg={2} sm={12} className={classes.questionBtnContainer}>
                <Button className={`mainButton ${classes.textButton}`} variant="contained" color="primary" onClick={submitQuestion} component="span">
                  Preguntar
                </Button>
              </Grid>
            </Grid>
          </FormControl>
        </Grid>
        <Grid item lg={12} sm={12} className={classes.qaTitleContainer}>
          <Typography align="left" variant="h5" component="h5">Ultima Preguntas</Typography>
          <Divider className={classes.qaDivider} />
        </Grid>
        <Grid item lg={12}>
          <Grid container spacing={2}>
          {
            // questions.map((question, index) => {
            //   return (index % 2 !== 0) ? (
            //     <Grid key={index} item lg={12}>
            //       <Grid container>
            //         <Grid item lg={12} className={classes.qaItem}>
            //           <MessageOutlinedIcon width="20" height="20"/>
            //             &nbsp;&nbsp;<Typography align="left" variant="body1" component="div">{question.question}</Typography>
            //         </Grid>
            //         <Grid item lg={12}>
            //           <Typography align="left" variant="caption" component="legend">{question.name}</Typography>
            //         </Grid>
            //       </Grid>
            //     </Grid>
            //   ) : (
            //     <Grid key={index} item lg={12}>
            //       <Grid container>
            //         <Grid item lg={12} className={classes.qaItem}>
            //           <CommentOutlinedIcon width="20" height="20"/>
            //             &nbsp;&nbsp;<Typography align="left" variant="body1" component="div">{question.question}</Typography>
            //         </Grid>
            //         <Grid item lg={12}>
            //           <Typography align="left" variant="caption" component="legend">{question.name}</Typography>
            //         </Grid>
            //       </Grid>
            //     </Grid>
            //   )
            // })
            questions.map((question, index) => {
              return (
                <Grid key={index} item lg={12}>
                  <Grid container>
                    <Grid item lg={12} className={classes.qaItem}>
                      <MessageOutlinedIcon width="20" height="20"/>
                        &nbsp;&nbsp;<Typography align="left" className={`${classes.questionTitle} textColor`} variant="body1" component="div">{question.question}</Typography>
                    </Grid>
                    <Grid item lg={12}>
                      <Typography align="left" variant="caption" component="legend">{question.name}</Typography>
                    </Grid>
                  </Grid>
                </Grid>
              )
            })
          }
          </Grid>
        </Grid>
        <Grid item lg={12} sm={12} className={classes.qaTitleContainer}>
          <Button onClick={loadQuestions} className={`mainButton ${classes.textButton}`}>Ver mas</Button>
        </Grid>
        <Grid item lg={12} sm={12} className={classes.qaTitleContainer}>
          <Divider className={classes.qaDivider} />
        </Grid>
      </Grid>
      <Snackbar open={snack.open} severity={snack.severity} onClose={()=>{setSnack({...snack,open:false})}} content={snack.text} />
    </div>
  );
}

QuestionsAnswers.protoTypes = {
  classes: T.object,
  data: T.object,
}
export default withStyles(styles)(QuestionsAnswers);