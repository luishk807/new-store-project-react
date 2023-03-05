
import * as T from 'prop-types';
import { useTranslation } from 'next-i18next'
import {
  Grid,
  withStyles,
} from '@material-ui/core';
import { getColorName } from '@/utils/helpers/product'
import {
  capitalize,
} from 'src/utils';
import { useMemo } from 'react';

const styles = () => ({
  root: {
    width: '100%',
  },
  infoRowContent: {
    margin: '20px 0px',
    display: 'flex',
    alignItems: 'center',
  },
  variantTitles: {
    margin: '10px 0px',
  },
  productColorLink: {
    margin: '3px',
    display: 'inline-block',
    lineHeight: '0px',
    outline: '1px solid rgba(0,0,0,.2)',
    '&:hover': {
      outline: '2px solid rgba(0,0,0)',
    },
  },
  productColorLinkSelected: {
    margin: '3px',
    display: 'inline-block',
    lineHeight: '0px',
    outline: '2px solid rgba(0,0,0)',
  },
  productColorBox: {
    width: 50,
    height: 28,
    // cursor: 'pointer',
    border: '1px solid white',
    padding: 5,
    display: 'inline-block',
  },
});

const ColorSelection = ({ classes, colors = [], color, onColorChange }) => {
  const { t } = useTranslation(['common', 'product', 'colors'])
  const mainColors = useMemo(() => colors && colors.length ? colors : [], [colors])

  if (!colors.length) {
    return;
  }

  return (
    <div className={classes.root}>
      <Grid container>
        <Grid item lg={10} xs={12} className={classes.infoRowContent}>
          <Grid container>
            <Grid item lg={12} xs={12} className={classes.variantTitles}>{t('colors')}: {color ? getColorName(color, t, 'colors') : ''}</Grid>
            <Grid item lg={12} xs={12}>
              {
                mainColors.map((item, index) => {
                  return (
                    <a title={`Select ${capitalize(item.name)}`} key={index} href="#" className={color.id === item.id ? classes.productColorLinkSelected : classes.productColorLink} onClick={(e) => onColorChange(e, item)}><div className={classes.productColorBox} style={{ backgroundColor: item.color }}></div></a>
                  )
                })
              }
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  )
}

ColorSelection.propTypes = {
  classes: T.object,
  colors: T.array,
  color: T.object,
  onColorChange: T.func,
}


/**
 * This section is mandatory for next-18next translation to work, only inside /pages.
 * Use get ServerSideProps instead of getStaticProps because it's a dinamic route
 */
export const getServerSideProps = async ({ locale }) => ({
  props: {
    ...await serverSideTranslations(locale, ['common', 'product', 'footer', 'colors']),
  },
})

export default withStyles(styles)(ColorSelection);