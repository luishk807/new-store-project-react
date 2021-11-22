import { CircularProgress, Grid } from '@material-ui/core'
import Centered from '@/common/Layout/Centered'
import HomeLayout from '@/inventarioz/layouts/HomeLayout'
import ProductBasic from '@/inventarioz/product/ProductBasic'
import ProductAddVariants from '@/inventarioz/product/ProductAddVariants'
import ProductVariants from '@/inventarioz/product/ProductVariants'
import ProductStock from '@/inventarioz/stock/ProductStock'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { getProduct } from '@/inventarioz/product'
import { getStock } from '@/inventarioz/stock'
import {
    Tab
} from '@material-ui/core'
import {
    TabPanel,
    TabContext,
    TabList
} from '@material-ui/lab'

const ProductDetail = () => {
    const router = useRouter()
    const { id } = router.query
    const [product, setProduct] = useState({})
    const [stock, setStock] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [tabValue, setTabValue] = useState("product");

    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
    };

    useEffect(() => {
        updateProduct()
    }, [])

    const updateProduct = () => {
        setIsLoading(true)
        getProduct(id).then(result => {
            setProduct(result.data)
            setIsLoading(false)
        }).catch(err => {
            console.log(err)
        })

        getStock({ productId: id }).then(result => {
            console.log('getStock', result)
            setStock(result.data)
        }).catch(err => {
            console.log(err)
        })
    }

    const onProductVariantUpdate = (value) => {
        updateProduct()
    }

    if (isLoading) {
        return (
            <HomeLayout>
                <Centered>
                    <CircularProgress />
                </Centered>
            </HomeLayout>
        )
    } else {
        return (
            <HomeLayout>
                <TabContext value={tabValue}>
                    <TabList onChange={handleTabChange} aria-label="Product Details Tabs">
                        <Tab label="Product Details" value="product" />
                        <Tab label="Stock" value="stock" />
                    </TabList>
                    <TabPanel value="product">
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={12} md={12} xl={12}><ProductBasic dataObject={product} /></Grid>
                            <Grid item xs={12} sm={12} md={12} xl={12}><ProductVariants dataObject={product} /></Grid>
                            <Grid item xs={12} sm={12} md={12} xl={12}><ProductAddVariants dataObject={product} onUpdate={onProductVariantUpdate} /></Grid>
                        </Grid>
                    </TabPanel>
                    <TabPanel value="stock">
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={12} md={12} xl={12}>
                            <ProductStock product={product} stock={stock} />
                            </Grid>
                        </Grid>
                    </TabPanel>
                </TabContext>
            </HomeLayout>
        )
    }
}

export default ProductDetail
