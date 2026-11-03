
import { useMemo, useState } from "react";
import {
  FiFilter,
  FiChevronDown,
  FiX,
  FiSliders,
} from "react-icons/fi";

import ProductCard from "../components/ProductCard";
import { useDispatch, useSelector } from "react-redux";
import { AddToCart } from "../toolkit/slices/user/carts";

const Shop = () => {
  const { products } = useSelector((state) => state.userProducts);
  const { isLogin } = useSelector((state) => state.userAuth)
  const dispatch = useDispatch();

  const [selectedCategory, setSelectedCategory] = useState("All");
  const [priceRange, setPriceRange] = useState("All");
  const [availability, setAvailability] = useState("All");
  const [sortBy, setSortBy] = useState("default");
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Categories
  const categories = [
    "All",
    ...new Set(
      products.map((product) => product.category).filter(Boolean)
    ),
  ];

  // Filter Products
  const filteredProducts = useMemo(() => {
    let result = products.map((product) => {
      // All variants
      let variants = product.variants || [];

      // Price Filter
      if (priceRange !== "All") {
        variants = variants.filter((variant) => {
          const price = Number(variant.price) || 0;

          if (priceRange === "under-1500") {
            return price < 1500;
          }

          if (priceRange === "1500-2500") {
            return price >= 1500 && price <= 2500;
          }

          if (priceRange === "above-2500") {
            return price > 2500;
          }

          return true;
        });
      }

      // Availability Filter
      if (availability === "in-stock") {
        variants = variants.filter(
          (variant) => Number(variant.stock) > 0
        );
      }

      if (availability === "out-of-stock") {
        variants = variants.filter(
          (variant) => Number(variant.stock) <= 0
        );
      }

      return {
        ...product,
        filteredVariants: variants,
      };
    });

    // Category Filter
    if (selectedCategory !== "All") {
      result = result.filter(
        (product) => product.category === selectedCategory
      );
    }

    // Product must have at least one matching variant
    result = result.filter(
      (product) => product.filteredVariants.length > 0
    );

    // Price Sorting
    if (sortBy === "price-low") {
      result.sort((a, b) => {
        const priceA = Math.min(
          ...a.filteredVariants.map((v) => Number(v.price) || 0)
        );

        const priceB = Math.min(
          ...b.filteredVariants.map((v) => Number(v.price) || 0)
        );

        return priceA - priceB;
      });
    }

    if (sortBy === "price-high") {
      result.sort((a, b) => {
        const priceA = Math.max(
          ...a.filteredVariants.map((v) => Number(v.price) || 0)
        );

        const priceB = Math.max(
          ...b.filteredVariants.map((v) => Number(v.price) || 0)
        );

        return priceB - priceA;
      });
    }

    return result;
  }, [
    products,
    selectedCategory,
    priceRange,
    availability,
    sortBy,
  ]);

  // Clear Filters
  const clearFilters = () => {
    setSelectedCategory("All");
    setPriceRange("All");
    setAvailability("All");
    setSortBy("default");
  };

  // Filter UI
  const FilterContent = () => (
    <div className="space-y-7">

      {/* Filter Heading */}
      <div className="flex items-center justify-between border-b border-[#e9ddd0] pb-4">
        <div className="flex items-center gap-2">
          <FiSliders className="text-[#a77b51]" />

          <h3 className="font-serif text-xl text-[#30241f]">
            Filters
          </h3>
        </div>

        <button
          type="button"
          onClick={clearFilters}
          className="text-xs font-medium text-[#a77b51] hover:text-[#30241f]"
        >
          Clear All
        </button>
      </div>

      {/* Category Filter */}
      <div>
        <h4 className="mb-3 text-xs font-semibold uppercase tracking-[2px] text-[#75685e]">
          Category
        </h4>

        <div className="space-y-2">
          {categories.map((category) => (
            <label
              key={category}
              className="flex cursor-pointer items-center gap-3 text-sm text-[#75685e]"
            >
              <input
                type="radio"
                name="category"
                checked={selectedCategory === category}
                onChange={() => setSelectedCategory(category)}
                className="accent-[#a77b51]"
              />

              <span
                className={
                  selectedCategory === category
                    ? "font-medium text-[#30241f]"
                    : ""
                }
              >
                {category}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Price Filter */}
      <div>
        <h4 className="mb-3 text-xs font-semibold uppercase tracking-[2px] text-[#75685e]">
          Price Range
        </h4>

        <div className="space-y-2">
          {[
            { label: "All Prices", value: "All" },
            { label: "Under ₹1,500", value: "under-1500" },
            { label: "₹1,500 - ₹2,500", value: "1500-2500" },
            { label: "Above ₹2,500", value: "above-2500" },
          ].map((item) => (
            <label
              key={item.value}
              className="flex cursor-pointer items-center gap-3 text-sm text-[#75685e]"
            >
              <input
                type="radio"
                name="price"
                checked={priceRange === item.value}
                onChange={() => setPriceRange(item.value)}
                className="accent-[#a77b51]"
              />

              <span
                className={
                  priceRange === item.value
                    ? "font-medium text-[#30241f]"
                    : ""
                }
              >
                {item.label}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Availability Filter */}
      <div>
        <h4 className="mb-3 text-xs font-semibold uppercase tracking-[2px] text-[#75685e]">
          Availability
        </h4>

        <div className="space-y-2">
          {[
            { label: "All Products", value: "All" },
            { label: "In Stock", value: "in-stock" },
            { label: "Out of Stock", value: "out-of-stock" },
          ].map((item) => (
            <label
              key={item.value}
              className="flex cursor-pointer items-center gap-3 text-sm text-[#75685e]"
            >
              <input
                type="radio"
                name="availability"
                checked={availability === item.value}
                onChange={() => setAvailability(item.value)}
                className="accent-[#a77b51]"
              />

              <span
                className={
                  availability === item.value
                    ? "font-medium text-[#30241f]"
                    : ""
                }
              >
                {item.label}
              </span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );


  const AddToCartData = (cartData) => {


    dispatch(AddToCart(cartData));

  }
  return (
    <main className="min-h-screen bg-[#fffdf9] text-[#30241f]">

      {/* Page Header */}
      <section className="border-b border-[#e9ddd0] bg-[#f6eee5]">
        <div className="mx-auto max-w-7xl px-5 py-14 text-center sm:px-8 sm:py-16 lg:px-12">
          <p className="mb-3 text-xs uppercase tracking-[4px] text-[#a77b51]">
            Discover Your Essence
          </p>

          <h1 className="font-serif text-4xl sm:text-5xl">
            Explore Our
            <span className="ml-2 italic text-[#a77b51]">
              Fragrances
            </span>
          </h1>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-[#817368]">
            Discover a fragrance that matches your personality and creates
            memories that last long after the moment has passed.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-10 sm:px-8 sm:py-14 lg:px-12">

        {/* Top Bar */}
        <div className="mb-8 flex flex-col gap-4 border-b border-[#e9ddd0] pb-5 sm:flex-row sm:items-center sm:justify-between">

          <p className="text-sm text-[#817368]">
            Showing{" "}
            <span className="font-semibold text-[#30241f]">
              {filteredProducts.length}
            </span>{" "}
            products
          </p>

          <div className="flex items-center gap-3">

            {/* Mobile Filter Button */}
            <button
              type="button"
              onClick={() => setMobileFilterOpen(true)}
              className="inline-flex items-center gap-2 border border-[#d8cabc] px-4 py-3 text-sm md:hidden"
            >
              <FiFilter />
              Filters
            </button>

            {/* Sort */}
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none border border-[#d8cabc] bg-white px-4 py-3 pr-10 text-sm text-[#30241f] outline-none focus:border-[#a77b51]"
              >
                <option value="default">Sort by: Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>

              <FiChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#a77b51]" />
            </div>
          </div>
        </div>

        <div className="grid gap-8 md:grid-cols-[240px_1fr] lg:grid-cols-[260px_1fr]">

          {/* Desktop Filters */}
          <aside className="hidden self-start border-r border-[#e9ddd0] pr-6 md:sticky md:top-32 md:block">
            <FilterContent />
          </aside>

          {/* Products */}
          <div>
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-3">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product._id}
                    product={product}
                    variants={product.filteredVariants}
                    onAddToCart={(cartData) => {


                      AddToCartData(cartData);
                    }}
                  />
                ))}
              </div>
            ) : (
              <div className="flex min-h-[350px] flex-col items-center justify-center border border-dashed border-[#d8cabc] bg-[#f7f1e9] px-4 text-center">
                <FiFilter className="mb-4 text-3xl text-[#a77b51]" />

                <h3 className="font-serif text-2xl">
                  No products found
                </h3>

                <p className="mt-3 max-w-sm text-sm text-[#817368]">
                  We couldn't find any fragrances matching your selected
                  filters.
                </p>

                <button
                  type="button"
                  onClick={clearFilters}
                  className="mt-6 bg-[#30241f] px-6 py-3 text-sm text-white transition hover:bg-[#8d6846]"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Mobile Filter Modal */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-[100] md:hidden">

          <div
            className="absolute inset-0 bg-[#30241f]/40"
            onClick={() => setMobileFilterOpen(false)}
          />

          <div className="absolute bottom-0 left-0 right-0 max-h-[85vh] overflow-y-auto bg-[#fffdf9] p-5 shadow-2xl">

            <div className="mb-6 flex items-center justify-between">
              <h3 className="font-serif text-2xl">
                Filter Products
              </h3>

              <button
                type="button"
                onClick={() => setMobileFilterOpen(false)}
                className="flex h-10 w-10 items-center justify-center border border-[#e9ddd0] text-[#30241f]"
              >
                <FiX size={20} />
              </button>
            </div>

            <FilterContent />

            <button
              type="button"
              onClick={() => setMobileFilterOpen(false)}
              className="mt-8 w-full bg-[#30241f] py-4 text-sm font-medium text-white"
            >
              Show {filteredProducts.length} Products
            </button>
          </div>
        </div>
      )}
    </main>
  );
};

export default Shop;
