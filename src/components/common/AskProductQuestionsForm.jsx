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
import { sendQuestion, getQuestions } from '@/api/questions';
import { handleFormResponse } from '@/utils/form';

const styles = (theme) => ({
  textInput: {
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

const AddQuestionsForm = ({classes, data}) => {
  const router = useRouter();
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

  return (
    <div className={classes.root}>
      <FormControl className={classes.textContainer}>
        <Grid container spacing={2}>
          <Grid item lg={10} xs={12}>
            <TextField value={form.question} onChange={handleOnChange} className={classNames(classes.textInput)} id="outlined-basic" label="Tu pregunta" variant="outlined" />
          </Grid>
          <Grid item lg={2} xs={12} className={classes.questionBtnContainer}>
            <Button className={`mainButton ${classes.textQuestioBtn}`} variant="contained" color="primary" onClick={submitQuestion} component="span">
              Preguntar
            </Button>
          </Grid>
        </Grid>
      </FormControl>
      <Snackbar open={snack.open} severity={snack.severity} onClose={()=>{setSnack({...snack,open:false})}} content={snack.text} />
    </div>
  )
}
AddQuestionsForm.protoTypes = {
  classes: T.object,
  data: T.object,
} 
export default withStyles(styles)(AddQuestionsForm);