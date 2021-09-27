import PropTypes from 'prop-types'
import Centered from 'src/components/common/Layout/Centered'
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
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        console.log([username, password]);
    }

    return (
        <Centered title={ 'Credentials' }>
            <Card>
                <CardHeader title={ 'Credentials' }
                    avatar={<ListAltIcon/>}
                    autoCapitalize="true"
                >
                </CardHeader>
                <CardContent>
                    <TextField required id="username" name="username" label="Username" variant="filled" 
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <TextField required id="password" name="password" label="Password" variant="filled" type="password"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </CardContent>
                <CardActions>
                    <Button onClick={handleLogin}>Login</Button>
                </CardActions>
            </Card>
        </Centered>
    )
}

Login.propTypes = {
    // t: PropTypes.func.isRequired,
}

export default Login
