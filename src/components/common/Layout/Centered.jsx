import PropTypes from 'prop-types'
import Head from 'next/head'
import { makeStyles } from '@material-ui/core'
import { withTranslation } from '../../../../i18n'

const useStyles = makeStyles(theme => {
    return {
        container: {
            minHeight: '100vh',
            padding: '0 0.5rem',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center'
        },
        main: {
            padding: '5rem 0',
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignIems: 'center'
        }
    }
})

const Centered = (props) => {
    const { t } = props;
    const classes = useStyles();
    
    return (
        <div className={classes.container}>
            <Head>
                <title>{ t('appName') }</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className={classes.main}>
                { props.children }
            </main>
    </div>
    );
}

Centered.getInitialProps = async () => ({
  namespacesRequired: ['common']
})

Centered.propTypes = {
  t: PropTypes.func.isRequired,
}

export default withTranslation('common')(Centered)
