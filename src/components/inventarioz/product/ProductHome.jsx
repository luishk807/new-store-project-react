import { withTranslation } from '../../../../i18n'
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
import ProductOptions from '../ProductOptions'
import Categories from '../Categories'
import Brands from '../Brands'
import Departments from '../Departments'
import ProductNoVariant from '../ProductNoVariant'

const useStyles = makeStyles((theme) => {
    root: {
        padding: 0
    }
})

const ProductHome = ({ t }) => {
    const classes = useStyles()
    const [value, setValue] = useState("f");

    const handleTabChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div className={classes.root}>
            <TabContext value={value}>
                <TabList onChange={handleTabChange} aria-label="Product tabs">
                    <Tab label={ t('add_prod_novariant') } value="f" />
                    <Tab label={ t('options') } value="b" />
                    <Tab label={ t('ca_title') } value="c" />
                    <Tab label={ t('brand_title') } value="d" />
                    <Tab label={ t('departments') } value="e" />
                </TabList>
                <TabPanel value="f">
                    <ProductNoVariant />
                </TabPanel>
                <TabPanel value="b">
                    <ProductOptions />
                </TabPanel>
                <TabPanel value="c">
                    <Categories />
                </TabPanel>
                <TabPanel value="d">
                    <Brands />
                </TabPanel>
                <TabPanel value="e">
                    <Departments />
                </TabPanel>
            </TabContext>
        </div>
    )
}

ProductHome.getInitialProps = {
    namespacesRequired: ['product', 'common'],
    displayName: 'ProductHome' // This is for storybook :facepalm:
}

export default withTranslation(['product', 'common'])(ProductHome)
