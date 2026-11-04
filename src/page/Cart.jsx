
import { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { FiMinus, FiPlus, FiShoppingBag } from "react-icons/fi";
import { UpdateCartQuantity } from "../toolkit/slices/user/carts";

import { toast } from "react-toastify";
import { razorpayMagickchekout } from "../services/magicchekout";

const Cart = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const carts = useSelector((state) => state.carts.carts || []);
    const products = useSelector((state) => state.userProducts.products || []);

    const isLoading = useSelector(
        (state) => state.carts.isLoading
    );
    const [loading, setLoading] = useState(false)

    // Find product and variant details
    const cartItems = useMemo(() => {
        return carts.map((item) => {
            const productId =
                typeof item.productId === "object"
                    ? item.productId?._id
                    : item.productId;

            const product =
                typeof item.productId === "object"
                    ? item.productId
                    : products.find(
                        (p) => p._id === productId
                    );

            const variantId =
                typeof item.variantId === "object"
                    ? item.variantId?._id
                    : item.variantId;

            const variant =
                typeof item.variantId === "object"
                    ? item.variantId
                    : product?.variants?.find(
                        (v) => v._id === variantId
                    );

            return {
                ...item,
                product,
                variant,
                productId,
                variantId,
            };
        });
    }, [carts, products]);

    // Update quantity
    const handleQuantity = (item, type) => {
        const currentQuantity = Number(item.quantity) || 1;

        const newQuantity = type === "increase" ? currentQuantity + 1 : currentQuantity - 1;
        console.log(newQuantity)



        dispatch(
            UpdateCartQuantity({
                productId: item.productId,
                variantId: item.variantId,
                quantity: newQuantity,
                cartId: item._id
            })
        );
    };

    // Total items
    const totalItems = cartItems.reduce(
        (total, item) => total + Number(item.quantity || 0),
        0
    );

    // Total price
    const totalAmount = cartItems.reduce(
        (total, item) =>
            total +
            Number(item.variant?.price || 0) *
            Number(item.quantity || 0),
        0
    );

    if (cartItems.length === 0) {
        return (
            <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 text-center bg-[#faf8f5]">
                <div className="w-20 h-20 rounded-full bg-[#f0e8df] flex items-center justify-center mb-5">
                    <FiShoppingBag className="text-3xl text-[#a77b51]" />
                </div>

                <h2 className="text-2xl font-semibold text-[#34271f]">
                    Your Cart is Empty
                </h2>

                <p className="text-sm text-[#8a796d] mt-2">
                    Looks like you haven't added anything to your cart yet.
                </p>

                <Link
                    to="/shop"
                    className="mt-6 bg-[#a77b51] text-white px-8 py-3 text-sm tracking-wide hover:bg-[#8d6846] transition"
                >
                    CONTINUE SHOPPING
                </Link>
            </div>
        );
    }



    const handaleCheckout = async () => {
        setLoading(true)
        if (!carts || carts.length === 0) {
            toast.error("Your cart is empty. Please add items to proceed to checkout.");
            return;
        }

        let result = await razorpayMagickchekout(carts, navigate, dispatch)

        if (result.error) {
            setLoading(false)
            toast.error(result.error)
            return
        } else {
            setLoading(false)
            toast.success(result.message)
            return
        }
    }

    return (
        <div className="min-h-screen bg-[#faf8f5] py-12 px-4 sm:px-6 lg:px-10">
            <div className="max-w-7xl mx-auto">

                {/* Heading */}
                <div className="mb-10">
                    <p className="text-xs tracking-[4px] text-[#a77b51] uppercase">
                        Your Selection
                    </p>

                    <h1 className="text-3xl md:text-4xl font-semibold text-[#34271f] mt-2">
                        Shopping Cart
                    </h1>

                    <p className="text-sm text-[#8a796d] mt-2">
                        {totalItems} {totalItems === 1 ? "item" : "items"} in your cart
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Cart Products */}
                    <div className="lg:col-span-2 space-y-4">

                        {cartItems.map((item, index) => {
                            const product = item.product;
                            const variant = item.variant;

                            const price = Number(variant?.price || 0);
                            const quantity = Number(item.quantity || 1);
                            // const quantity = Number(item.qunity || 1);
                            const stock = Number(variant?.stock || 0);

                            const image = product?.productImages?.[0];

                            return (
                                <div
                                    key={`${item.productId}-${item.variantId}-${index}`}
                                    className="bg-white border border-[#eee5dc] p-4 sm:p-5 flex flex-col sm:flex-row gap-5"
                                >
                                    {/* Image */}
                                    <Link
                                        to={`/product/${item.productId}`}
                                        className="w-full sm:w-32 h-36 sm:h-36 bg-[#f5f0ea] shrink-0 overflow-hidden"
                                    >
                                        {image ? (
                                            <img
                                                src={image}
                                                alt={product?.name || "Product"}
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-[#a77b51]">
                                                <FiShoppingBag size={30} />
                                            </div>
                                        )}
                                    </Link>

                                    {/* Details */}
                                    <div className="flex-1 flex flex-col justify-between gap-4">

                                        <div>
                                            <Link
                                                to={`/product/${item.productId}`}
                                                className="text-lg font-semibold text-[#34271f] hover:text-[#a77b51]"
                                            >
                                                {product?.name || "Product"}
                                            </Link>

                                            <p className="text-sm text-[#8a796d] mt-1">
                                                Size: {variant?.unit || "N/A"}
                                            </p>

                                            <p className="text-sm text-[#a77b51] mt-2 font-medium">
                                                ₹{price.toLocaleString("en-IN")}
                                            </p>
                                        </div>

                                        <div className="flex flex-wrap items-center justify-between gap-4">

                                            {/* Quantity */}
                                            <div className="flex items-center border border-[#e8ded4]">

                                                <button
                                                    type="button"
                                                    onClick={() => handleQuantity(item, "decrease")}
                                                    disabled={isLoading}
                                                    className="w-10 h-10 flex items-center justify-center text-[#6f5b4d] hover:bg-[#f5f0ea] disabled:opacity-30"
                                                >
                                                    <FiMinus size={14} />
                                                </button>

                                                <span className="w-10 text-center text-sm font-medium text-[#34271f]">
                                                    {quantity}
                                                </span>

                                                <button
                                                    type="button"
                                                    onClick={() => handleQuantity(item, "increase")}
                                                    disabled={quantity >= stock || isLoading}
                                                    className="w-10 h-10 flex items-center justify-center text-[#6f5b4d] hover:bg-[#f5f0ea] disabled:opacity-30"
                                                >
                                                    <FiPlus size={14} />
                                                </button>

                                            </div>

                                            {/* Subtotal */}
                                            <div className="text-right">
                                                <p className="text-xs text-[#9b8c80]">
                                                    Subtotal
                                                </p>

                                                <p className="text-lg font-semibold text-[#34271f]">
                                                    ₹{(price * quantity).toLocaleString("en-IN")}
                                                </p>
                                            </div>

                                        </div>

                                        {quantity >= stock && stock > 0 && (
                                            <p className="text-xs text-orange-700">
                                                Maximum available stock reached
                                            </p>
                                        )}

                                        {stock <= 0 && (
                                            <p className="text-xs text-red-600">
                                                Currently out of stock
                                            </p>
                                        )}
                                    </div>
                                </div>
                            );
                        })}

                        <Link
                            to="/shop"
                            className="inline-block text-sm text-[#a77b51] hover:text-[#34271f] mt-3"
                        >
                            ← Continue Shopping
                        </Link>
                    </div>

                    {/* Order Summary */}
                    <div className="lg:col-span-1">
                        <div className="bg-white border border-[#eee5dc] p-6 sticky top-24">

                            <h2 className="text-xl font-semibold text-[#34271f] pb-5 border-b border-[#eee5dc]">
                                Order Summary
                            </h2>

                            <div className="space-y-4 py-5">

                                <div className="flex justify-between text-sm">
                                    <span className="text-[#8a796d]">
                                        Total Items
                                    </span>

                                    <span className="font-medium text-[#34271f]">
                                        {totalItems}
                                    </span>
                                </div>

                                <div className="flex justify-between text-sm">
                                    <span className="text-[#8a796d]">
                                        Subtotal
                                    </span>

                                    <span className="font-medium text-[#34271f]">
                                        ₹{totalAmount.toLocaleString("en-IN")}
                                    </span>
                                </div>

                                <div className="flex justify-between text-sm">
                                    <span className="text-[#8a796d]">
                                        Shipping
                                    </span>

                                    <span className="text-[#a77b51]">
                                        Calculated at checkout
                                    </span>
                                </div>

                            </div>

                            <div className="border-t border-[#eee5dc] pt-5 flex justify-between items-center">
                                <span className="font-semibold text-[#34271f]">
                                    Total
                                </span>

                                <span className="text-2xl font-semibold text-[#34271f]">
                                    ₹{totalAmount.toLocaleString("en-IN")}
                                </span>
                            </div>

                            <button
                                type="button"
                                disabled={loading}
                                onClick={() => {
                                    handaleCheckout();
                                }}
                                className="w-full mt-6 py-4 bg-[#a77b51] text-white text-sm tracking-[2px] hover:bg-[#8d6846] transition"
                            >
                                {loading ? "PROCEED TO CHECKOUT..." : "PROCEED TO CHECKOUT"}
                            </button>

                            <p className="text-center text-xs text-[#9b8c80] mt-4">
                                Secure checkout experience
                            </p>

                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Cart;
