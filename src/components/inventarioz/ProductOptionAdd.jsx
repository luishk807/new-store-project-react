import PropTypes from 'prop-types'
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
    const { onSubmit } = props
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
                        label="Name"
                        name="name"
                        variant="filled"
                        size="small"
                        margin="dense"
                        fullWidth={true}
                        onChange={onChange}
                    />
                    <TextField
                        label="Description"
                        name="description"
                        variant="filled"
                        size="small"
                        margin="dense"
                        fullWidth={true}
                        onChange={onChange}
                    />
                </Grid>
                <Divider/>
                <Grid item sm={12}>
                    <Button className={classes.submit} onClick={handleSubmit}>Add</Button>
                </Grid>
            </Grid>
        </div>
    )
}

ProductOptionAdd.propTypes = {
    // t: PropTypes.func.isRequired, // This is translation
    onSubmit: PropTypes.func
}

export default ProductOptionAdd
