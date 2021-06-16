import React, { useEffect, useState } from 'react';
import * as T from 'prop-types';
import { 
  withStyles,
  Grid,
  TextField,
  FormControl,
  Button,  
} from '@material-ui/core';
// import DateFnsUtils from "@date-io/date-fns";
// import { MuiPickersUtilsProvider, DatePicker } from "@material-ui/pickers";

//import { removeCharacter } from '../utils';
import ActionForm from './common/Form/Action/Add';
import { validateForm } from '../utils/form';
import Snackbar from './common/Snackbar';
import Typography from './common/Typography';
import { useTranslation } from 'next-i18next'

const styles = (theme) => ({
  root: {
    padding: '5px 0px',
  },
  formRoot: {
    padding: 5
  },
  formTextField: {
    padding: '10px 0px',
    width: '100%',
  },
  mainContainer: {
    justifyContent: 'space-between',
  },
  formItem: {
    width: '100%',
    margin: 5,
    padding: '5px 0px',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
    // margin: '20px auto 0px auto',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const CreditCard = ({classes, onSubmit, inStatus}) => {
  const [errors, setErrors] = useState(null);
  const [form, setForm] = useState({});
  const [selectedDate, setSelectedDate] = useState(new Date());
  const { t } = useTranslation('order')
  const [snack, setSnack] = useState({
    severity: 'success',
    open: false,
    text: '',
  });

  const handleDeliveryForm = async (e) => {
    let errorFound = false;
    let key = '';
    for (var i in form) {
      errorFound = await validateForm(i, form[i]);
      key = i;
      if (errorFound){
        saveErrors(i)
      } else {
        saveErrors(i, true, `${i} is required`)
        break
      }
    }
    if (!errorFound) {
      setSnack({
        severity: 'error',
        open: true,
        text: `Unable to login, ${i} is required`
      })
    } else {
      onSubmit(form);
    }
  }


  const saveErrors = async (key, err = false, str = '') => {
    await setErrors({
      ...errors,
      [key]: {
        error: err,
        text: str,
      }
    });
  }

  const configureError = async(fields) => {
    let newErrors = {}

    Object.keys(fields).forEach((field, index) => {
      newErrors = {
        ...newErrors,
        [field]: {
          error: false,
          text: '',
        }
      }
    })
    setErrors(newErrors);
  }

  useEffect(() => {
    const fields = {
      creditCardName: '',
      creditCardNumber: '',
      creditCardExpireDate: new Date(),
      creditCardCode: '',
    }
    configureError(fields)
    setForm(fields)
  }, [])


  return errors && (
      <div className={classes.root}>
        {/* <form className={classes.formFoot} noValidate autoComplete="off"> */}
            {/* credit card */}
            <ActionForm 
              formSection={{
                name: t('message.search_order'),
              }}
              actionButtonName={ t('search') }
              entryForm={form} 
              showCancel={false}
              onSubmitAction={handleDeliveryForm}
              type="action"
            />
            {/* <Grid item className={classes.itemSection} lg={12} xs={12}>
                <Grid container className={classes.mainContainer}>
                  <Grid item lg={12} xs={12} className={classes.formItem}>
                    <FormControl fullWidth variant="outlined">
                        <TextField
                          error={errors.creditCardName.error}
                          helperText={errors.creditCardName.text} 
                          name="creditCardName"
                          defaultValue={form.creditCardName}
                          onChange={formOnChange}
                          label={removeCharacter( t(FORM_SCHEMA.creditCardName.tKey) )} 
                          variant="outlined" 
                        />
                    </FormControl>
                  </Grid>
                  <Grid  item lg={12} xs={12} className={classes.formItem}>
                    <FormControl fullWidth variant="outlined">
                        <TextField
                          error={errors.creditCardNumber.error}
                          helperText={errors.creditCardNumber.text} 
                          defaultValue={form.creditCardNumber}
                          name="creditCardNumber"
                          onChange={formOnChange}
                          label="Credit card number"
                          variant="outlined" 
                        />
                    </FormControl>
                  </Grid>
                  <Grid  item lg={7} xs={7} className={classes.formItem}>
                    <FormControl fullWidth variant="outlined">
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <DatePicker
                              name="creditCardExpireDate"
                              variant="inline"
                              openTo="year"
                              views={["year", "month"]}
                              label={removeCharacter( t(FORM_SCHEMA.creditCardExpireDate.tKey) )} 
                              InputAdornmentProps={{ position: "start" }}
                              value={form.creditCardExpireDate}
                              onChange={formOnChange}
                              error={errors.creditCardExpireDate.error}
                              helperText={errors.creditCardExpireDate.text} 
                              inputVariant="outlined"
                            />
                        </MuiPickersUtilsProvider>
                    </FormControl>
                  </Grid>
                  <Grid  item lg={4} xs={4} className={classes.formItem}>
                    <FormControl fullWidth variant="outlined">
                        <TextField
                          error={errors.creditCardCode.error}
                          helperText={errors.creditCardCode.text} 
                          name="creditCardCode"
                          value={form.creditCardCode}
                          label={removeCharacter( t(FORM_SCHEMA.creditCardCode.tKey) )} 
                          onChange={formOnChange}
                          placeholder="Placeholder"
                          variant="outlined" 
                        />
                    </FormControl>
                  </Grid>
                </Grid>
            </Grid> */}
            {/* end of credit card */}
        {/* </form> */}
        <Snackbar open={snack.open} severity={snack.severity} onClose={()=>setSnack({...snack,'open':false})} content={snack.text} />
      </div>
  );
}

CreditCard.protoTypes = {
  classes: T.object,
  onSubmit: T.func,
  inStatus: T.object,
}

export default withStyles(styles)(CreditCard);