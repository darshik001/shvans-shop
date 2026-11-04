
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import {
  FiHeart,
  FiShoppingBag,
} from "react-icons/fi";

const ProductCard = ({
  product,
  variants = [],
  onAddToCart,
}) => {
  const [selectedVariantId, setSelectedVariantId] = useState(
    variants?.[0]?._id || ""
  );

  // Update selected variant when filters change
  useEffect(() => {
    setSelectedVariantId(variants?.[0]?._id || "");
  }, [variants]);

  // Selected Variant
  const selectedVariant = variants.find(
    (variant) => variant._id === selectedVariantId
  );

  const price = Number(selectedVariant?.price) || 0;
  const stock = Number(selectedVariant?.stock) || 0;

  const image = product?.productImages?.[0];

  // Add To Cart
  const handleAddToCart = () => {
    if (!selectedVariant || stock <= 0) return;

    const cartData = {
      productId: product._id,
      variantId: selectedVariant._id,
      quantity: 1,
    };

    onAddToCart?.(cartData);
  };

  return (
    <article className="group overflow-hidden border border-[#eee5db] bg-white transition duration-300 hover:shadow-lg">

      {/* Product Image */}
      <Link
        to={`/product/${product?._id}`}
        className="relative block overflow-hidden bg-[#f7f1e9]"
      >
        {image ? (
          <img
            src={image}
            alt={product?.name}
            className="h-56 w-full object-cover transition duration-500 group-hover:scale-105 sm:h-72"
          />
        ) : (
          <div className="flex h-56 items-center justify-center text-sm text-[#9b8d80] sm:h-72">
            No Image Available
          </div>
        )}

        {/* Category */}
        <span className="absolute left-3 top-3 bg-white px-3 py-1 text-[10px] font-medium uppercase tracking-wider text-[#a77b51]">
          {product?.category || "Product"}
        </span>

        {/* Wishlist */}
        {/* <button
          type="button"
          aria-label={`Add ${product?.name} to wishlist`}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
          className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white text-[#30241f] transition hover:bg-[#30241f] hover:text-white"
        >
          <FiHeart />
        </button> */}
      </Link>

      {/* Product Details */}
      <div className="p-4">

        <p className="text-xs uppercase tracking-wider text-[#9b8d80]">
          {product?.category || "SHVANS"}
        </p>

        <Link to={`/product/${product?._id}`}>
          <h3 className="mt-2 truncate font-serif text-lg text-[#30241f] transition hover:text-[#a77b51]">
            {product?.name}
          </h3>
        </Link>

        <p className="mt-2 line-clamp-2 text-sm leading-6 text-[#817368]">
          {product?.description}
        </p>

        {/* Variant Selection Chips */}
        {variants.length > 1 && (
          <div className="mt-4">
            <div className="flex flex-wrap gap-2">
              {variants.map((variant) => {
                const isSelected =
                  selectedVariantId === variant._id;

                return (
                  <button
                    key={variant._id}
                    type="button"
                    onClick={() =>
                      setSelectedVariantId(variant._id)
                    }
                    className={`min-w-[65px] border px-3 py-2 text-xs font-medium transition duration-200 ${isSelected
                      ? "border-[#a77b51] bg-[#f8f0e7] text-[#8d6846]"
                      : "border-[#e9ddd0] bg-white text-[#75685e] hover:border-[#a77b51]"
                      }`}
                  >
                    {variant.unit}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Price and Add To Cart */}
        <div className="mt-4 flex items-end justify-between gap-3">

          <div>
            <p className="text-lg font-semibold text-[#30241f]">
              ₹{price.toLocaleString("en-IN")}
            </p>

            {selectedVariant?.unit && (
              <p className="mt-1 text-xs text-[#9b8d80]">
                {selectedVariant.unit}
              </p>
            )}
          </div>

          <button
            type="button"
            disabled={!selectedVariant || stock <= 0}
            onClick={handleAddToCart}
            aria-label="Add to cart"
            className={`flex h-10 w-10 items-center justify-center transition ${stock > 0
              ? "bg-[#30241f] text-white hover:bg-[#8d6846]"
              : "cursor-not-allowed bg-gray-200 text-gray-400"
              }`}
          >
            <FiShoppingBag />
          </button>
        </div>

        {/* Stock */}
        <p
          className={`mt-3 text-xs ${stock > 0 ? "text-green-600" : "text-red-500"
            }`}
        >
          {stock > 0
            ? `${stock} items available`
            : "Out of stock"}
        </p>

      </div>
    </article>
  );
};

export default ProductCard;
