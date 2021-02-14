export const getBrand = (detail) => {
    if (detail && detail.brand_product) {
        if (detail.brand_product.length > 0) {
            return detail.brand_product[0].brand
        }
    }
    return null
}

export const getDepartment = (detail) => {
    if (detail && detail.department_product) {
        if (detail.department_product.length > 0) {
            return detail.department_product[0].department
        }
    }
    return null
}

export const getCategory = (detail) => {
    if (detail && detail.category_product) {
        if (detail.category_product.length > 0) {
            return detail.category_product[0].category
        }
    }
    return null
}

export const getProductVariants = (detail) => {
    if (detail && detail.product_variant) {
        return detail.product_variant
    }
    return []
}
