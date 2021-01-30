import Head from 'next/head'
import { makeStyles } from '@material-ui/core'

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
    const classes = useStyles();
    
    return (
        <div className={classes.container}>
            <Head>
                <title>Stockz</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className={classes.main}>
                { props.children }
            </main>
    </div>
    );
}

export default Centered
