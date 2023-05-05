import { CartState } from "@/common/enum/cart-state";
import { CartInterface } from "@/interfaces/cart.interface";
import cartModel from "@/models/cart.model";
import { QueryOptions, UpdateQuery } from "mongoose";

export class CartRepo {
    static async createUserCart({ userId, product }) {
        const query: Partial<CartInterface> = { cart_userId: userId, cart_state: CartState.ACTIVE };
        const updateOrInsert: UpdateQuery<CartInterface> = {
            $addToSet: {
                cart_products: product
            }
        };
        const options: QueryOptions = {
            upsert: true,
            new: true
        }

        return await cartModel.findOneAndUpdate(query, updateOrInsert, options).exec();
    }

    static async updateUserCartQuantity({ userId, product }) {
        const { productId, quantity } = product;

        const query = {
            cart_userId: userId,
            'cart_products.productId': productId,
            cart_state: CartState.ACTIVE
        }
        const updateSet: UpdateQuery<CartInterface> = {
            $inc: {
                'cart_products.$.quantity': quantity
            }
        }

        const options: QueryOptions = {
            upsert: true,
            new: true
        }

        return await cartModel.findOneAndUpdate(query, updateSet, options).exec();
    }
}