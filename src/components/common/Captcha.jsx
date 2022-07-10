import React from 'react';
import * as T from 'prop-types';
import {
  withStyles,
} from '@material-ui/core';
import ReCAPTCHA from "react-google-recaptcha";

const styles = (theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
});

const Captcha = ({classes, onChange, hl = "es"}) => {
    return (
      <div className={classes.root}>
        <ReCAPTCHA
          sitekey={process.env.GOOGLE_RECHAPTCHA_SITE_V2}
          onChange={onChange}
          hl={hl}
        />
      </div>
    )
}
Captcha.protoTypes = {
  classes: T.object,
  onChange: T.func,
  hl: T.string
} 
export default withStyles(styles)(Captcha);