import PropTypes from 'prop-types'
import {
    CircularProgress,
    TextField
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { useState, useEffect } from 'react'
import { getStock } from '../../../services/inventarioz/stock'

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        padding: 5
    }
}))

function getTextField(obj, field) {
    if (obj) {
        return <TextField label="Option" value={obj[field]} variant="outlined" size="small" aria-readonly="true" />
    }
    return ''
}

const ProductDetailPanel = (data) => {

    const [isLoading, setIsLoading] = useState(true)
    const [detail, setDetail] = useState([])

    const classes = useStyles()

    useEffect(() => {
        let mounted = true
        if (data && mounted) {
            getStock({ productId: data.data.id })
                .then(result => {
                    // console.log('result', result)
                    // console.log('stock result.data', result.data)
                    setIsLoading(false)
                    if (mounted) {
                        setDetail(result.data)
                    }
                })
                .catch(error => {
                    console.log(error)
                    setIsLoading(false)
                })
        }

        return () => {
            mounted = false
        }
    }, [data])

    if (isLoading) {
        return (
            <CircularProgress />
        )
    } else {
        return (
            <div className={classes.root}>
                {/* <div>{ JSON.stringify(detail) }</div> */}
                {detail.map((s, index) => {
                    return (
                    <div>
                        <TextField label="Stock" value={s.quantity} variant="outlined" size="small" />
                        { getTextField(s.option, 'name') }
                            {/* <TextField label="Option" value={s.option.name} variant="outlined" size="small" /> */}
                        { getTextField(s.option_value, 'value') }
                            {/* <TextField label="Option Value" value={s.option_value.value} variant="outlined" size="small" /> */}
                    </div>
                    )
                })}
            </div>
        )
    }
}

ProductDetailPanel.propTypes = {
    data: PropTypes.object
}

export default ProductDetailPanel
