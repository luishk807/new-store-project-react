// import PropTypes from 'prop-types'
import Centered from '../../components/common/Layout/Centered'
import { CircularProgress } from '@material-ui/core'
import { useRouter } from 'next/router';
import { useEffect } from 'react'

const Redirector = (props) => {
    const router = useRouter();
    useEffect(() => {
        router.push('/inventarioz/login')
    });
    
    return (
        <Centered>
          <CircularProgress />
        </Centered>
    );
}

export default Redirector
