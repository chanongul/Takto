import cart from "./cart";
import cartItem from "./cart/cart-item";
import order from "./order";
import orderItem from "./order/order-item";
import orderPayment from "./order/order-payment";
import product from "./product";
import productAssets from "./product/product-assets";
import productColor from "./product/product-color";
import productSize from "./product/product-size";
import productVariant from "./product/product-variant";
import user from "./user";
import userAddress from "./user/user-address";

export const schemaTypes = [
  cart,
  cartItem,
  order,
  orderItem,
  orderPayment,
  product,
  productColor,
  productAssets,
  productSize,
  productVariant,
  user,
  userAddress,
]
