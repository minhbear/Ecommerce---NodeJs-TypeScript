import { CartState } from "@/common/enum/cart-state";

export interface CartInterface {
    cart_state: CartState,
    cart_products: any[],
    cart_cout_product: number,
    cart_userId: number
}