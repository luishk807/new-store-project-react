import { withTranslation } from '../../../i18n'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core'
import {
    Grid,
    TextField,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Button
} from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import DropDown from './DropDown'
import { useEffect, useState } from 'react'
import ProductOptionsDropDown from './ProductOptionsDropDown'
import CategoryDropDown from './CategoryDropDown'

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    }
}));

const Product = (props) => {
    const { t } = props
    const classes = useStyles();
    const [optionValues, setOptionValues] = useState([])

    const onCategoryChange = (value) => {
        console.log('onCategoryChange', value)
    }

    const onOptionsChange = (value) => {
        console.log('onOptionsChange', value);
        const ovs = value.option_value
        console.log(ovs)
        const values = []
        if (ovs) {
            ovs.forEach(v => {
                values.push({
                    text: v.value,
                    value: v.id,
                    object: v
                })
            })
            setOptionValues(values)
        }
    }

    const optionValueChange = (value) => {
        console.log('optionValueChange', value)
    }

    return (
        <div className={classes.root}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Accordion defaultExpanded>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="basic-content"
                            id="basic-header"
                            >
                            { t('basic') }
                        </AccordionSummary>
                        <AccordionDetails>
                            <Grid container spacing={0}>
                                <Grid item xs={12}>
                                    <TextField
                                        label={ t('name') }
                                        variant="filled"
                                        size="small"
                                        margin="dense"
                                        fullWidth={true}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        label={ t('description') }
                                        variant="filled"
                                        size="small"
                                        margin="dense"
                                        fullWidth={true}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <CategoryDropDown onChange={onCategoryChange}/>
                                </Grid>
                            </Grid>
                        </AccordionDetails>
                    </Accordion>
                </Grid>
                <Grid item xs={12}>
                    <Accordion defaultExpanded>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="basic-content"
                            id="variants-header"
                            >
                            { t('pv_title') }
                        </AccordionSummary>
                        <AccordionDetails>
                            <Grid container spacing={2}>
                                <Grid item xs={12} md={6}>
                                    <ProductOptionsDropDown onChange={onOptionsChange} />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <DropDown 
                                        onChange={optionValueChange}
                                        items={optionValues}
                                        label={ t('pov_title') }
                                        textField="text"
                                        valueField="value"
                                    ></DropDown>
                                </Grid>
                            </Grid>
                        </AccordionDetails>
                    </Accordion>
                </Grid>
                <Grid item xs={12}>
                    <Accordion defaultExpanded>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="basic-content"
                            id="variants-header"
                            >
                            { t('pv_title') }
                        </AccordionSummary>
                        <AccordionDetails>
                            {/* <TableContainer component={Paper}>
                                <Table className={classes.table} size="small" aria-label="a dense table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>{ t('po_name') }</TableCell>
                                            <TableCell>{ t('po_description') }</TableCell>
                                            <TableCell align="right">*</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                    {optionsDataRows.map((o) => (
                                        <TableRow key={o.name}
                                            hover={true} 
                                            selected={true} 
                                            className={classes.tableRow} 
                                            onClick={() => { onOptionSelect(o) }}
                                        >
                                            <TableCell component="th" scope="o">
                                                {o.name}
                                            </TableCell>
                                            <TableCell>{o.description}</TableCell>
                                            <TableCell align="right">
                                            <IconButton aria-label="delete" size="small" onClick={() => confirmRemoveOption(o.name)}>
                                                <DeleteIcon />
                                            </IconButton>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                    </TableBody>
                                </Table>
                            </TableContainer> */}
                        </AccordionDetails>
                    </Accordion>
                </Grid>
            </Grid>
        </div>
    );
}

Product.getInitialProps = async () => ({
    namespacesRequired: ['product'],
    displayName: 'Product' // This is for storybook :facepalm:
})

// Product.propTypes = {

// }

export default withTranslation('product')(Product);
