import { makeStyles } from '@material-ui/core/styles'
import { Grid } from '@material-ui/core'
import AdminLayoutTemplate from '../../../components/common/Layout/AdminLayoutTemplate'
import HeaderSub from '../../../components/common/HeaderSub'
import QuickbooksConnect from './quickbooks'

// const useStyles = makeStyles((theme) => ({
//     root: {
//         flexGrow: 1,
//     }
// }));

const IntegrationHome = () => {
    // const classes = useStyles()

    return (
        <AdminLayoutTemplate>
            <HeaderSub name="integrations" disableAddButton={true} />
            <Grid container>
                <Grid item>
                    <QuickbooksConnect />
                </Grid>
            </Grid>
        </AdminLayoutTemplate>
    )
}

export default IntegrationHome
