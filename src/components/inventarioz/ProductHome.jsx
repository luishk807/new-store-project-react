import { withTranslation } from '../../../i18n'
import { makeStyles } from '@material-ui/core'
import { useState } from 'react'
import {
    Tab
} from '@material-ui/core'
import {
    TabPanel,
    TabContext,
    TabList
} from '@material-ui/lab'
import Product from './Product'
import ProductOptions from './ProductOptions'
import Categories from'./Categories'

const useStyles = makeStyles((theme) => {
    root: {
        padding: 0
    }
})

const ProductHome = ({ t }) => {
    const classes = useStyles()
    const [value, setValue] = useState("a");

    const handleTabChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div className={classes.root}>
            <TabContext value={value}>
                <TabList onChange={handleTabChange} aria-label="Product tabs">
                    <Tab label={ t('add_product') } value={"a"} />
                    <Tab label={ t('options') } value={"b"} />
                    <Tab label={ t('ca_title') } value={"c"} />
                </TabList>
                <TabPanel value={"a"}>
                    <Product/>
                </TabPanel>
                <TabPanel value={"b"}>
                    <ProductOptions />
                </TabPanel>
                <TabPanel value={"c"}>
                    <Categories onDataChange={(value) => { console.log('onCategoryChange', value) }} />
                </TabPanel>
            </TabContext>
        </div>
    )
}

ProductHome.getInitialProps = {
    namespacesRequired: ['product'],
    displayName: 'ProductHome' // This is for storybook :facepalm:
}

export default withTranslation('product')(ProductHome)
