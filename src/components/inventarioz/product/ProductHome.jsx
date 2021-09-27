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
import ProductOptions from '@/inventarioz/ProductOptions'
import Categories from '@/inventarioz/Categories'
import Brands from '@/inventarioz/Brands'
import Departments from '@/inventarioz/Departments'
import Suppliers from '@/inventarioz/Suppliers'
import ProductNoVariant from '@/inventarioz/ProductNoVariant'

const useStyles = makeStyles((theme) => {
    root: {
        padding: 0
    }
})

const ProductHome = () => {
    const classes = useStyles()
    const [value, setValue] = useState("a");

    const handleTabChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div className={classes.root}>
            <TabContext value={value}>
                <TabList onChange={handleTabChange} aria-label="Product tabs">
                    <Tab label={ '+Product' } value="a" />
                    <Tab label={ 'Options' } value="b" />
                    <Tab label={ 'Category' } value="c" />
                    <Tab label={ 'Brand' } value="d" />
                    <Tab label={ 'Departments' } value="e" />
                    <Tab label={ 'Supplier' } value="f" />
                </TabList>
                <TabPanel value="a">
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
                <TabPanel value="f">
                    <Suppliers />
                </TabPanel>
            </TabContext>
        </div>
    )
}

export default ProductHome
