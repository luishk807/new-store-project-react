import PropTypes from 'prop-types'
import { withTranslation } from '../../../i18n'
import { makeStyles } from '@material-ui/core'
import { 
    Grid,
    TextField,
    Divider,
    Button
} from '@material-ui/core'
import { useState } from 'react'

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    submit: {
        
    }
}));

const ProductOptionAdd = (props) => {
    const { t, onSubmit } = props
    const classes = useStyles()
    const [option, setOption] = useState({});

    const handleSubmit = () => {
        if (onSubmit) { // If defined, will call it and ship the data
            if (option.name) {
                onSubmit(option)
            }
        }
    }

    const onChange = (e) => {
        setOption({
            ...option,
            [e.target.name]: e.target.value
        })
    }

    return (
        <div className={classes.root}>
            <Grid container spacing={2}>
                <Grid item sm={12}>
                    <TextField
                        label={ t('name') }
                        name="name"
                        variant="filled"
                        size="small"
                        margin="dense"
                        fullWidth={true}
                        onChange={onChange}
                    />
                    <TextField
                        label={ t('description') }
                        name="description"
                        variant="filled"
                        size="small"
                        margin="dense"
                        fullWidth={true}
                        onChange={onChange}
                    />
                </Grid>
                <Divider/>
                <Grid item sm={12} justify="flex-end">
                    <Button className={classes.submit} onClick={handleSubmit}>{ t('add') }</Button>
                </Grid>
            </Grid>
        </div>
    )
}

ProductOptionAdd.getInitialOptions = async () => ({
    namespacesRequired: ['product']
})

ProductOptionAdd.propTypes = {
    t: PropTypes.func.isRequired, // This is translation
    onSubmit: PropTypes.func
}

export default withTranslation('product')(ProductOptionAdd)
