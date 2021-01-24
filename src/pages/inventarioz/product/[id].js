import { CircularProgress } from '@material-ui/core'
import Centered from '../../../components/common/Layout/Centered'
import HomeLayout from '../../../components/inventarioz/layouts/HomeLayout'
import ProductBasic from '../../../components/inventarioz/product/ProductBasic'
import ProductAddVariants from '../../../components/inventarioz/product/ProductAddVariants'
import ProductVariants from '../../../components/inventarioz/product/ProductVariants'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { getProduct } from '../../../services/inventarioz/product'

const ProductDetail = () => {
    const router = useRouter()
    const [product, setProduct] = useState({})
    const [isLoading, setIsLoading] = useState(true)
    const { id } = router.query

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
                <ProductBasic dataObject={product} />
                <ProductVariants dataObject={product} />
                <ProductAddVariants dataObject={product} onUpdate={onProductVariantUpdate} />
            </HomeLayout>
        )
    }
}

export default ProductDetail
