import PropTypes from 'prop-types'
import { withTranslation } from '../../../../i18n'
import Centered from '../../../components/common/Layout/Centered'
import {
    TextField,
    Card,
    CardContent,
    CardHeader,
    CardActions,
    Button
} from '@material-ui/core'
import ListAltIcon from '@material-ui/icons/ListAlt';
import { useState } from 'react'

const Login = (props) => {
    const { t } = props;
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        console.log([username, password]);
    }

    return (
        <Centered title={ t('credentials') }>
            <Card>
                <CardHeader title={ t('credentials') }
                    avatar={<ListAltIcon/>}
                    autoCapitalize="true"
                >
                </CardHeader>
                <CardContent>
                    <TextField required id="username" name="username" label={t('username')} variant="filled" 
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <TextField required id="password" name="password" label={t('password')} variant="filled" type="password"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </CardContent>
                <CardActions>
                    <Button onClick={handleLogin}>{ t('login') }</Button>
                </CardActions>
            </Card>
        </Centered>
    )
}

Login.getInitialProps = async () => ({
    namespacesRequired: ['login']
})
  
Login.propTypes = {
    t: PropTypes.func.isRequired,
}

export default withTranslation('login')(Login)
