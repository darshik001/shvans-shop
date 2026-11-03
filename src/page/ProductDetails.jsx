import { useMemo, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
    FiArrowLeft,
    FiShoppingBag,
    FiCheck,
    FiPlus,
    FiMinus,
    FiStar,
} from "react-icons/fi";

import { AddToCart } from "../toolkit/slices/user/carts";

const ProductDetails = () => {
    const { id } = useParams();
    const dispatch = useDispatch();

    const products = useSelector(
        (state) => state.userProducts.products || []
    );

    const [selectedImage, setSelectedImage] = useState(0);
    const [selectedVariant, setSelectedVariant] = useState(0);
    const [quantity, setQuantity] = useState(1);
    const [showAllReviews, setShowAllReviews] = useState(false);

    const isLoading = useSelector(
        (state) => state.carts.isLoading
    );

    // Current Product
    const product = useMemo(
        () => products.find((item) => item._id === id),
        [products, id]
    );

    // Same Category Products
    const relatedProducts = useMemo(() => {
        if (!product) return [];

        const currentCategoryId =
            typeof product.categoryId === "object"
                ? product.categoryId?._id
                : product.categoryId;

        return products.filter((item) => {
            const categoryId =
                typeof item.categoryId === "object"
                    ? item.categoryId?._id
                    : item.categoryId;

            return (
                categoryId === currentCategoryId &&
                item._id !== product._id &&
                item.status === "active"
            );
        });
    }, [products, product]);

    if (!product) {
        return (
            <div className="min-h-[70vh] flex flex-col items-center justify-center bg-[#faf8f5] px-4">
                <FiShoppingBag className="text-5xl text-[#a77b51] mb-4" />

                <h2 className="text-2xl font-semibold text-[#34271f]">
                    Product Not Found
                </h2>

                <Link
                    to="/shop"
                    className="mt-5 bg-[#a77b51] text-white px-7 py-3"
                >
                    Back to Shop
                </Link>
            </div>
        );
    }

    const images = product.productImages || [];
    const variants = product.variants || [];
    const reviews = product.reviews || [];

    const variant = variants[selectedVariant];

    const price = Number(variant?.price || 0);
    const stock = Number(variant?.stock || 0);

    // Rating
    const averageRating =
        reviews.length > 0
            ? reviews.reduce(
                (total, review) =>
                    total + Number(review.rating || 0),
                0
            ) / reviews.length
            : Number(product.averageRating || product.rating || 0);

    const displayReviews = showAllReviews
        ? reviews
        : reviews.slice(0, 3);

    // Add To Cart
    const handleAddToCart = () => {
        if (!variant || stock <= 0) return;

        if (quantity > stock) return;

        dispatch(
            AddToCart({
                productId: product._id,
                variantId: variant._id,
                quantity,
            })
        );
    };

    return (
        <div className="min-h-screen bg-[#faf8f5] py-10 px-4 sm:px-6 lg:px-10">

            <div className="max-w-7xl mx-auto">

                {/* Breadcrumb */}
                <div className="mb-8 flex flex-wrap items-center gap-2 text-sm text-[#8a796d]">

                    <Link to="/" className="hover:text-[#a77b51]">
                        Home
                    </Link>

                    <span>/</span>

                    <Link to="/shop" className="hover:text-[#a77b51]">
                        Shop
                    </Link>

                    <span>/</span>

                    <span className="text-[#34271f]">
                        {product.name}
                    </span>

                </div>

                {/* Product Details */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">

                    {/* Product Images */}
                    <div>

                        <div className="bg-white border border-[#eee5dc] overflow-hidden aspect-square">

                            {images.length > 0 ? (
                                <img
                                    src={images[selectedImage]}
                                    alt={product.name}
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-[#a77b51]">
                                    <FiShoppingBag size={60} />
                                </div>
                            )}

                        </div>

                        {/* Thumbnails */}
                        {images.length > 1 && (
                            <div className="flex gap-3 mt-4 flex-wrap">

                                {images.map((image, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setSelectedImage(index)}
                                        className={`w-20 h-20 border-2 overflow-hidden ${selectedImage === index
                                                ? "border-[#a77b51]"
                                                : "border-[#eee5dc]"
                                            }`}
                                    >
                                        <img
                                            src={image}
                                            alt={`${product.name} ${index + 1}`}
                                            className="w-full h-full object-cover"
                                        />
                                    </button>
                                ))}

                            </div>
                        )}

                    </div>

                    {/* Product Information */}
                    <div className="flex flex-col">

                        <p className="text-xs uppercase tracking-[4px] text-[#a77b51] mb-3">
                            Product Details
                        </p>

                        <h1 className="text-3xl md:text-4xl font-semibold text-[#34271f]">
                            {product.name}
                        </h1>

                        {/* Rating */}
                        <div className="flex items-center gap-3 mt-4">

                            <div className="flex items-center gap-1 text-[#d49a42]">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <FiStar
                                        key={star}
                                        size={16}
                                        fill={
                                            star <= Math.round(averageRating)
                                                ? "currentColor"
                                                : "none"
                                        }
                                    />
                                ))}
                            </div>

                            <span className="text-sm font-medium text-[#34271f]">
                                {averageRating.toFixed(1)}
                            </span>

                            <span className="text-sm text-[#8a796d]">
                                ({reviews.length} Reviews)
                            </span>

                        </div>

                        <div className="border-b border-[#e8ded4] my-6" />

                        {/* Price */}
                        <div>
                            <p className="text-sm text-[#8a796d]">
                                Price
                            </p>

                            <h2 className="text-3xl font-semibold text-[#a77b51] mt-1">
                                ₹{price.toLocaleString("en-IN")}
                            </h2>
                        </div>

                        {/* Description */}
                        <div className="mt-7">

                            <h3 className="text-base font-semibold text-[#34271f] mb-2">
                                Description
                            </h3>

                            <p className="text-sm leading-7 text-[#8a796d] whitespace-pre-line">
                                {product.description || "No description available."}
                            </p>

                        </div>

                        {/* Variants */}
                        {variants.length > 0 && (
                            <div className="mt-7">

                                <h3 className="text-base font-semibold text-[#34271f] mb-3">
                                    Select Size
                                </h3>

                                <div className="flex flex-wrap gap-3">

                                    {variants.map((item, index) => (
                                        <button
                                            key={item._id || index}
                                            onClick={() => {
                                                setSelectedVariant(index);
                                                setQuantity(1);
                                            }}
                                            className={`px-5 py-3 border text-sm transition ${selectedVariant === index
                                                    ? "border-[#a77b51] bg-[#f0e8df] text-[#a77b51]"
                                                    : "border-[#e8ded4] bg-white text-[#6f5b4d] hover:border-[#a77b51]"
                                                }`}
                                        >
                                            {item.unit}
                                        </button>
                                    ))}

                                </div>

                            </div>
                        )}

                        {/* Stock */}
                        <div className="mt-6 flex items-center gap-2">

                            {stock > 0 ? (
                                <>
                                    <FiCheck className="text-green-600" />

                                    <span className="text-sm text-green-700">
                                        In Stock ({stock} available)
                                    </span>
                                </>
                            ) : (
                                <span className="text-sm text-red-600">
                                    Out of Stock
                                </span>
                            )}

                        </div>

                        {/* Quantity */}
                        {stock > 0 && (
                            <div className="mt-6">

                                <h3 className="text-sm font-semibold text-[#34271f] mb-3">
                                    Quantity
                                </h3>

                                <div className="flex items-center border border-[#e8ded4] w-fit bg-white">

                                    <button
                                        onClick={() =>
                                            setQuantity((prev) =>
                                                Math.max(1, prev - 1)
                                            )
                                        }
                                        disabled={quantity <= 1}
                                        className="w-11 h-11 flex items-center justify-center hover:bg-[#f5f0ea] disabled:opacity-30"
                                    >
                                        <FiMinus size={15} />
                                    </button>

                                    <span className="w-12 text-center font-medium text-[#34271f]">
                                        {quantity}
                                    </span>

                                    <button
                                        onClick={() =>
                                            setQuantity((prev) =>
                                                Math.min(stock, prev + 1)
                                            )
                                        }
                                        disabled={quantity >= stock}
                                        className="w-11 h-11 flex items-center justify-center hover:bg-[#f5f0ea] disabled:opacity-30"
                                    >
                                        <FiPlus size={15} />
                                    </button>

                                </div>

                            </div>
                        )}

                        {/* Add To Cart */}
                        <button
                            onClick={handleAddToCart}
                            disabled={!variant || stock <= 0 || isLoading}
                            className="mt-7 w-full py-4 flex items-center justify-center gap-3 bg-[#a77b51] text-white text-sm tracking-[2px] hover:bg-[#8d6846] transition disabled:opacity-50"
                        >
                            <FiShoppingBag size={18} />

                            {isLoading
                                ? "ADDING..."
                                : stock <= 0
                                    ? "OUT OF STOCK"
                                    : "ADD TO CART"}
                        </button>

                        {/* Additional Information */}
                        {product.additionalInfo && (
                            <div className="mt-7 p-5 bg-white border border-[#eee5dc]">

                                <h3 className="font-semibold text-[#34271f] mb-2">
                                    Additional Information
                                </h3>

                                <p className="text-sm text-[#8a796d] leading-7 whitespace-pre-line">
                                    {product.additionalInfo}
                                </p>

                            </div>
                        )}

                    </div>

                </div>

                {/* Reviews Section */}
                <section className="mt-20">

                    <div className="border-b border-[#e8ded4] pb-5 mb-8">

                        <p className="text-xs tracking-[4px] uppercase text-[#a77b51]">
                            Customer Feedback
                        </p>

                        <h2 className="text-2xl md:text-3xl font-semibold text-[#34271f] mt-2">
                            Customer Reviews
                        </h2>

                        <div className="flex items-center gap-3 mt-3">

                            <span className="text-3xl font-semibold text-[#34271f]">
                                {averageRating.toFixed(1)}
                            </span>

                            <div>
                                <div className="flex gap-1 text-[#d49a42]">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <FiStar
                                            key={star}
                                            fill={
                                                star <= Math.round(averageRating)
                                                    ? "currentColor"
                                                    : "none"
                                            }
                                        />
                                    ))}
                                </div>

                                <p className="text-xs text-[#8a796d] mt-1">
                                    Based on {reviews.length} reviews
                                </p>
                            </div>

                        </div>

                    </div>

                    {/* Review List */}
                    {reviews.length > 0 ? (

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">

                            {displayReviews.map((review, index) => {

                                const rating = Number(review.rating || 0);

                                return (
                                    <div
                                        key={review._id || index}
                                        className="bg-white border border-[#eee5dc] p-6"
                                    >

                                        <div className="flex justify-between items-start gap-3">

                                            <div>
                                                <h3 className="font-semibold text-[#34271f]">
                                                    {review.user?.name ||
                                                        review.userName ||
                                                        review.name ||
                                                        "Customer"}
                                                </h3>

                                                {review.createdAt && (
                                                    <p className="text-xs text-[#9b8c80] mt-1">
                                                        {new Date(
                                                            review.createdAt
                                                        ).toLocaleDateString("en-IN")}
                                                    </p>
                                                )}
                                            </div>

                                            <div className="flex gap-1 text-[#d49a42] shrink-0">

                                                {[1, 2, 3, 4, 5].map((star) => (
                                                    <FiStar
                                                        key={star}
                                                        size={13}
                                                        fill={
                                                            star <= rating
                                                                ? "currentColor"
                                                                : "none"
                                                        }
                                                    />
                                                ))}

                                            </div>

                                        </div>

                                        <p className="text-sm text-[#8a796d] leading-7 mt-5">
                                            {review.comment ||
                                                review.review ||
                                                review.description ||
                                                "No review description."}
                                        </p>

                                    </div>
                                );
                            })}

                        </div>

                    ) : (

                        <div className="bg-white border border-[#eee5dc] p-10 text-center">
                            <FiStar className="text-3xl text-[#a77b51] mx-auto mb-3" />

                            <h3 className="font-semibold text-[#34271f]">
                                No Reviews Yet
                            </h3>

                            <p className="text-sm text-[#8a796d] mt-2">
                                Be the first to review this product.
                            </p>
                        </div>

                    )}

                    {/* View More */}
                    {reviews.length > 3 && (
                        <div className="text-center mt-8">

                            <button
                                onClick={() =>
                                    setShowAllReviews((prev) => !prev)
                                }
                                className="px-8 py-3 border border-[#a77b51] text-[#a77b51] text-sm hover:bg-[#a77b51] hover:text-white transition"
                            >
                                {showAllReviews
                                    ? "SHOW LESS"
                                    : `VIEW MORE REVIEWS (${reviews.length - 3})`}
                            </button>

                        </div>
                    )}

                </section>

                {/* Related Products */}
                {relatedProducts.length > 0 && (
                    <section className="mt-20">

                        <div className="mb-8">

                            <p className="text-xs tracking-[4px] uppercase text-[#a77b51]">
                                You May Also Like
                            </p>

                            <h2 className="text-2xl md:text-3xl font-semibold text-[#34271f] mt-2">
                                Related Products
                            </h2>

                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">

                            {relatedProducts.map((item) => {

                                const itemVariant = item.variants?.[0];

                                const itemImage = item.productImages?.[0];

                                return (
                                    <Link
                                        to={`/product/${item._id}`}
                                        key={item._id}
                                        onClick={() => {
                                            setSelectedImage(0);
                                            setSelectedVariant(0);
                                            setQuantity(1);
                                            setShowAllReviews(false);
                                            window.scrollTo({
                                                top: 0,
                                                behavior: "smooth",
                                            });
                                        }}
                                        className="bg-white border border-[#eee5dc] group"
                                    >

                                        <div className="aspect-square overflow-hidden bg-[#f5f0ea]">

                                            {itemImage ? (
                                                <img
                                                    src={itemImage}
                                                    alt={item.name}
                                                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                                                />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center text-[#a77b51]">
                                                    <FiShoppingBag size={35} />
                                                </div>
                                            )}

                                        </div>

                                        <div className="p-4">

                                            <h3 className="font-semibold text-[#34271f] truncate">
                                                {item.name}
                                            </h3>

                                            <p className="text-sm text-[#a77b51] font-medium mt-2">
                                                ₹{Number(
                                                    itemVariant?.price || 0
                                                ).toLocaleString("en-IN")}
                                            </p>

                                            <p className="text-xs text-[#9b8c80] mt-2">
                                                {itemVariant?.unit || ""}
                                            </p>

                                        </div>

                                    </Link>
                                );
                            })}

                        </div>

                    </section>
                )}

                {/* Back to Shop */}
                <div className="mt-16">
                    <Link
                        to="/shop"
                        className="inline-flex items-center gap-2 text-sm text-[#a77b51] hover:text-[#34271f]"
                    >
                        <FiArrowLeft />
                        Continue Shopping
                    </Link>
                </div>

            </div>
        </div>
    );
};

export default ProductDetails;