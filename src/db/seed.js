import mongoose from "mongoose";
import dotenv from "dotenv";
import connectDB from "./index.js";
import { User } from "../models/user.models.js";
import { Category } from "../models/category.models.js";
import { Product } from "../models/product.models.js";
import { Cart } from "../models/cart.models.js";
import { Order } from "../models/order.models.js";
import { Payment } from "../models/payment.models.js";
import { Review } from "../models/review.models.js";
import { WishList } from "../models/wishlist.models.js";

dotenv.config({ path: "./.env" });

const seedDB = async () => {
    try {
        await connectDB();
        
        console.log("Clearing existing data...");
        // Clearing collections in correct order to avoid constraint issues, though Mongoose handles this mostly fine.
        await Payment.deleteMany({});
        await Review.deleteMany({});
        await WishList.deleteMany({});
        await Order.deleteMany({});
        await Cart.deleteMany({});
        await Product.deleteMany({});
        await Category.deleteMany({});
        await User.deleteMany({});
        console.log("Existing data cleared.");

        console.log("Seeding Users...");
        const users = [];
        for (let i = 1; i <= 5; i++) {
            users.push(await User.create({
                username: `user_${i}_test`,
                email: `user${i}@example.com`,
                password: `Password@${i}123`,
                fullName: `Test User ${String.fromCharCode(64 + i)}`,
                phoneNumber: `+91987654321${i}`,
                address: [{
                    street: `Street ${i}`,
                    city: `City ${i}`,
                    state: `State ${i}`,
                    country: `Country`,
                    pincode: `12345${i}`
                }],
                role: "user"
            }));
        }

        console.log("Seeding Categories...");
        const categoryNames = ["Electronics", "Fashion", "Home & Garden", "Sports", "Books"];
        const categories = [];
        for (let i = 0; i < 5; i++) {
            categories.push(await Category.create({
                name: categoryNames[i],
                description: `This is the detailed description for the ${categoryNames[i]} category. It has various sub-items.`,
                isActive: true
            }));
        }

        console.log("Seeding Products...");
        const products = [];
        for (let i = 1; i <= 5; i++) {
            products.push(await Product.create({
                name: `Awesome Product ${i}`,
                description: `This is a highly detailed description for Awesome Product ${i} that spans more than twenty characters.`,
                price: i * 100,
                discountPercentage: i * 5,
                stock: i * 10,
                category: categories[i - 1]._id,
                brand: `Brand ${i}`,
                isFeatured: true,
                isActive: true
            }));
        }

        console.log("Seeding Carts...");
        const carts = [];
        for (let i = 0; i < 5; i++) {
            carts.push(await Cart.create({
                user: users[i]._id,
                items: [{
                    product: products[i]._id,
                    price: products[i].price,
                    quantity: 2
                }]
            }));
        }

        console.log("Seeding Orders...");
        const orders = [];
        for (let i = 0; i < 5; i++) {
            orders.push(await Order.create({
                user: users[i]._id,
                orderItems: [{
                    product: products[i]._id,
                    price: products[i].price,
                    quantity: 1
                }],
                shippingAddress: {
                    fullName: `Test User ${String.fromCharCode(65 + i)}`,
                    phone: `+91987654321${i+1}`,
                    street: `Street ${i+1}`,
                    city: `City ${i+1}`,
                    state: `State ${i+1}`,
                    country: `Country`,
                    pincode: `12345${i+1}`
                },
                paymentMethod: "COD",
                paymentStatus: false,
                itemsPrice: products[i].price,
                shippingPrice: 50,
                taxPrice: products[i].price * 0.1,
                totalPrice: products[i].price + 50 + (products[i].price * 0.1)
            }));
        }

        console.log("Seeding Payments...");
        const payments = [];
        for (let i = 0; i < 5; i++) {
            payments.push(await Payment.create({
                user: users[i]._id,
                order: orders[i]._id,
                paymentID: `PAYMENT_TXN_00${i+1}`,
                status: "pending",
                amount: orders[i].totalPrice,
                method: "COD"
            }));
        }

        console.log("Seeding Reviews...");
        const reviews = [];
        for (let i = 0; i < 5; i++) {
            reviews.push(await Review.create({
                user: users[i]._id,
                product: products[i]._id,
                rating: "5",
                comment: `This is a fantastic product ${i+1}!`
            }));
        }

        console.log("Seeding WishLists...");
        const wishLists = [];
        for (let i = 0; i < 5; i++) {
            wishLists.push(await WishList.create({
                user: users[i]._id,
                product: products[(i + 1) % 5]._id // Wishlist different product
            }));
        }

        console.log("Seeding Completed Successfully!");
        process.exit(0);

    } catch (error) {
        console.error("Error Seeding Data:", error);
        process.exit(1);
    }
};

seedDB();
