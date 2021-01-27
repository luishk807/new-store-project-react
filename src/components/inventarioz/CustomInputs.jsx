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

const CustomInputs = (props) => {
    const { t, onSubmit, inputs } = props
    const classes = useStyles()
    const [value, setValue] = useState({});

    const textFields = (options, i) => {
        return (
            <TextField
                key={ (i) ? `ci-${i}` : options.name }
                label={ t(options.t) }
                name={ options.name }
                variant="filled"
                size="small"
                margin="dense"
                fullWidth={true}
                onChange={onChange}
            />
        )
    }

    const handleSubmit = () => {
        if (onSubmit) { // If defined, will call it and ship the data
            onSubmit(value)
        }
    }

    const onChange = (e) => {
        setValue({
            ...value,
            [e.target.name]: e.target.value
        })
    }

    return (
        <div className={classes.root}>
            <Grid container spacing={2} justify="flex-end">
                <Grid item sm={12}>
                    {inputs.map((input, i) => (
                        textFields(input, i)
                    ))}
                </Grid>
                <Divider/>
                <Grid item sm={12}>
                    <Button className={classes.submit} onClick={handleSubmit}>{ t('save') }</Button>
                </Grid>
            </Grid>
        </div>
    )
}

CustomInputs.getInitialOptions = async () => ({
    namespacesRequired: ['custom-inputs']
})

CustomInputs.defaultProps = {
    inputs: []
}

CustomInputs.propTypes = {
    t: PropTypes.func.isRequired, // This is translation
    onSubmit: PropTypes.func,
    inputs: PropTypes.array // { name (field name), t (translation field name)}
}

export default withTranslation('custom-inputs')(CustomInputs)
