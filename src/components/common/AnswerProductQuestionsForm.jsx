import React, { useState, useEffect } from 'react';
import * as T from 'prop-types';
import { useRouter } from 'next/router';
import {
  withStyles,
  FormControl,
  TextField,
  Button,
  Grid
} from '@material-ui/core';
import classNames from 'classnames';
import Typography from '@/common/Typography';
import Snackbar from '@/common/Snackbar';
import { getQuestions } from '@/api/questions';
import { sendAnswer } from '@/api/answers';
import { handleFormResponse } from '@/utils/form';

const styles = (theme) => ({
  // root: {
  //   padding: 5,
  //   margin:5,
  // },
  textInput: {
    // flexGrow: 2,
    width: '100%',
  },
  textContainer: {
    width: '100%',
    margin: '20px 0px',
  },
  questionBtnContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  textQuestioBtn: {
    height: '100%',
    boxShadow: 'none',
    '&:hover': {
      boxShadow: 'none',
    }
  }
});

const AnswerProductQuestionForm = ({classes, data}) => {
  const router = useRouter();
  const [form, setForm] = useState({
    question: data.id,
    product: data.product,
    answer: ''
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
      'answer': value
    });
  }

  const answerQuestion = (e) => {
    if (!form.question) {
      setSnack({
        severity: 'error',
        open: true,
        text: 'Please enter a answer',
      })
    } else {
      sendAnswer(form).then((res) => {
        const snackResp = handleFormResponse(res.data)
        setSnack(snackResp)
        setForm({
          ...form,
          'answer': ''
        })
      })
    }
  }

  return (
    <div className={classes.root}>
      <FormControl className={classes.textContainer}>
        <Grid container spacing={2}>
          <Grid item lg={10} xs={12}>
            <TextField value={form.answer} onChange={handleOnChange} className={classNames(classes.textInput)} id="outlined-basic" label="Tu respuesta" variant="outlined" />
          </Grid>
          <Grid item lg={2} xs={12} className={classes.questionBtnContainer}>
            <Button className={`mainButton ${classes.textQuestioBtn}`} variant="contained" color="primary" onClick={answerQuestion} component="span">
              Answer
            </Button>
          </Grid>
        </Grid>
      </FormControl>
      <Snackbar open={snack.open} severity={snack.severity} onClose={()=>{setSnack({...snack,open:false})}} content={snack.text} />
    </div>
  )
}
AnswerProductQuestionForm.protoTypes = {
  classes: T.object,
  data: T.object,
} 
export default withStyles(styles)(AnswerProductQuestionForm);