import { CartState } from "@/common/enum/cart-state";
import { NotFoundErrorException } from "@/exceptions/NotFoundError.exception";
import { CartInterface } from "@/interfaces/cart.interface";
import cartModel from "@/models/cart.model";
import { CartRepo } from "@/repositories/cart.repo";
import ProductRepo from "@/repositories/product.repo";
import { UpdateQuery } from "mongoose";

export class CartService {
    static async addToCart({ userId, product = {} }) {
        // check cart is exist or not
        const userCart = await cartModel.findOne({  
            cart_userId: userId
        }).exec();

        if(!userCart) {
            // create cart for user
            return await CartRepo.createUserCart({ userId, product });
        }

        // No product in cart
        if(userCart.cart_products.length === 0) {
            userCart.cart_products = [product];
            return await userCart.save();
        }
        
        // cart and product exits the product input -> update quantity
        return await CartRepo.updateUserCartQuantity({ userId, product });
    }

    static async addToCartV2({ userId, shop_order_ids }) {
        const { productId, quantity, older_quantity } = shop_order_ids[0]?.item_products[0];
        
        const foundProduct = await ProductRepo.getProductById(productId);
        if(!foundProduct) {
            throw new NotFoundErrorException({message: "Product not exist"});
        }
        if(foundProduct.product_shop.toString() !== shop_order_ids[0]?.shopId) {
            throw new NotFoundErrorException({message: "Product not exist"});
        }

        if(quantity === 0) {
            // deleted
        }

        return await CartRepo.updateUserCartQuantity({userId, product: {
            productId,
            quantity: quantity - older_quantity,

        }})
    }

    static async deleteUserCart({ userId, productId }) {
        const query = { cart_userId: userId, cart_state: CartState.ACTIVE };
        const updateSet: UpdateQuery<CartInterface> = {
            $pull: {
                cart_products: {
                    productId
                }
            }
        }
        const deleteCart = await cartModel.updateOne(query, updateSet).exec();

        return deleteCart;
    }

    static async getListUserCart( userId ) {
        return await cartModel.findOne({
            cart_userId: userId
        }).lean().exec();
    }


}