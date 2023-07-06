//----------Cart----------//

// Cart Properties

// Cart Queries

//----------Product----------//

// Product Properties
const PRODUCT_COLLECTION_PROPERTIES: string =
  '{_id,title,titleTH,description,descriptionTH,_createdAt}'

const PRODUCT_COLOR_PROPERTIES: string =
  '{_id,name,title,titleTH,extraPrice,code}'

const PRODUCT_SIZE_PROPERTIES: string = '{_id,name,title,extraPrice}'

const PRODUCT_PROPERTIES: string = `{_id,title,titleTH,description,descriptionTH,categories,price,collections[]->${PRODUCT_COLLECTION_PROPERTIES},sizes[]->${PRODUCT_SIZE_PROPERTIES},colors[]->${PRODUCT_COLOR_PROPERTIES},"slug":slug.current}`

const PRODUCT_VARIANT_PROPERTIES: string = `{_id,product->${PRODUCT_PROPERTIES},color->${PRODUCT_COLOR_PROPERTIES},size->${PRODUCT_SIZE_PROPERTIES},amountLeft}`

const PRODUCT_ASSETS_PROPERTIES: string = `{_id,product->${PRODUCT_VARIANT_PROPERTIES}}`

// Product Queries
export const GET_PRODUCTS_QUERY: string = `*[_type=="product"]${PRODUCT_PROPERTIES}`

export const GET_PRODUCT_VARIANTS_QUERY: string = `*[_type=="productVariant"]${PRODUCT_VARIANT_PROPERTIES}`

export const GET_PRODUCT_BY_ID_QUERY = (id: string): string =>
  `*[_type=="product"&&_id=="${id}"]${PRODUCT_PROPERTIES}`

export const GET_PRODUCT_VARIANT_BY_ID_QUERY = (id: string): string =>
  `*[_type=="productVariant"&&_id=="${id}"]${PRODUCT_VARIANT_PROPERTIES}`

export const GET_PRODUCTS_BY_CATEGORY_QUERY = (category: string): string =>
  `*[_type=="product"&&"${category}" in categories]${PRODUCT_PROPERTIES}`

export const GET_FILTERED_PRODUCTS_QUERY = (queries: {
  category?: string
  color?: string
  size?: string
  collection?: string
}): string =>
  `*[_type=="product"${
    queries.category ? '&&"' + queries.category + '"in categories' : null
  }${queries.color ? '&&"' + queries.color + '"in colors[]->.name' : ''}${
    queries.size ? '&&"' + queries.size + '"in sizes[]->.name' : ''
  }]${PRODUCT_PROPERTIES}`

export const GET_FILTERED_PRODUCT_VARIANTS_QUERY = (queries: {
  productId: string
  color?: string
}) =>
  `*[_type=="productVariant"&& references("${queries.productId}")]${PRODUCT_VARIANT_PROPERTIES}`

export const GET_AVAILABLE_PRODUCT_COLORS_QUERY = (productId: string): string =>
  `*[_type=="product"&&_id=="${productId}"]{colors[]->${PRODUCT_COLOR_PROPERTIES}}[0].colors[]._id`

export const GET_AVAILABLE_PRODUCT_SIZES_QUERY = (productId: string): string =>
  `*[_type=="product"&&_id=="${productId}"]{sizes[]->${PRODUCT_SIZE_PROPERTIES}}[0].sizes[]._id`

//----------User----------//

// User Properties
const USER_PROPERTIES: string = '{_id,fname,lname,email,lang}'

// User Queries
export const GET_USERS_QUERY: string = `*[_type=="user"]${USER_PROPERTIES}`

//----------Order----------//

// Order Properties

// Order Queries
export const GET_CURRENT_ORDER_NUMBER_QUERY: string =
  '*[_type=="order"] | order(number desc)[0]'
