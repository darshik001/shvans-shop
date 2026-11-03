
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FiPlus,
  FiSearch,
  FiEdit2,
  FiEye,
  FiPackage,
  FiFilter,
  FiX,
} from "react-icons/fi";
import { useSelector } from "react-redux";

const Products = () => {
  const navigate = useNavigate();

  const { products = [] } = useSelector(
    (state) => state.AdminProducts
  );

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [status, setStatus] = useState("All");
  const [selectedProduct, setSelectedProduct] = useState(null);

  const formatPrice = (price) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 2,
    }).format(Number(price) || 0);

  const getStatus = (value) =>
    String(value || "").toLowerCase();

  const categories = useMemo(() => {
    return [
      "All",
      ...new Set(
        products
          .map((product) => product.category)
          .filter(Boolean)
      ),
    ];
  }, [products]);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch =
        (product.name || "")
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        (product.sku || "")
          .toLowerCase()
          .includes(search.toLowerCase());

      const matchesCategory =
        category === "All" || product.category === category;

      const matchesStatus =
        status === "All" ||
        getStatus(product.status) === status;

      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [products, search, category, status]);

  const totalProducts = products.length;

  const activeProducts = products.filter(
    (product) => getStatus(product.status) === "active"
  ).length;

  const inactiveProducts = products.filter(
    (product) => getStatus(product.status) === "inactive"
  ).length;

  const handleEdit = (product) => {
    navigate("/admin/product-form", {
      state: {
        isEdit: true,
        product,
      },
    });
  };

  const closeView = () => {
    setSelectedProduct(null);
  };

  return (
    <div className="space-y-7">

      {/* Header */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold text-[#211a18]">
            Products
          </h1>
          <p className="mt-1 text-sm text-[#897970]">
            Manage your products and inventory.
          </p>
        </div>

        <button
          onClick={() => navigate("/admin/product-form")}
          className="flex items-center justify-center gap-2 rounded-xl bg-[#211a18] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#49362e]"
        >
          <FiPlus size={18} />
          Add Product
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {[
          {
            label: "Total Products",
            value: totalProducts,
            icon: <FiPackage size={23} />,
            color: "bg-[#f5ede8] text-[#a36f55]",
          },
          {
            label: "Active Products",
            value: activeProducts,
            icon: <FiPackage size={23} />,
            color: "bg-[#edf5ee] text-[#47845a]",
          },
          {
            label: "Inactive Products",
            value: inactiveProducts,
            icon: <FiPackage size={23} />,
            color: "bg-[#f9eeea] text-[#b45e4b]",
          },
        ].map((item) => (
          <div
            key={item.label}
            className="rounded-2xl border border-[#eee5df] bg-white p-5"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[#897970]">
                  {item.label}
                </p>
                <h2 className="mt-2 text-2xl font-bold text-[#211a18]">
                  {item.value}
                </h2>
              </div>
              <div className={`rounded-xl p-3 ${item.color}`}>
                {item.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Products Table */}
      <div className="overflow-hidden rounded-2xl border border-[#eee5df] bg-white">

        {/* Search and Filters */}
        <div className="flex flex-col gap-4 border-b border-[#eee5df] p-5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="text-lg font-bold text-[#211a18]">
              All Products
            </h2>
            <p className="mt-1 text-xs text-[#99877d]">
              {filteredProducts.length} products found
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <div className="relative">
              <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-[#a18d82]" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search products..."
                className="w-full rounded-xl border border-[#e9dfd9] py-2.5 pl-10 pr-4 text-sm outline-none focus:border-[#a36f55] sm:w-56"
              />
            </div>

            <div className="flex items-center gap-2 rounded-xl border border-[#e9dfd9] px-3">
              <FiFilter className="text-[#a18d82]" />
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-transparent py-2.5 text-sm text-[#51443d] outline-none"
              >
                {categories.map((item) => (
                  <option key={item} value={item}>
                    {item === "All" ? "All Categories" : item}
                  </option>
                ))}
              </select>
            </div>

            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="rounded-xl border border-[#e9dfd9] bg-white px-3 py-2.5 text-sm text-[#51443d] outline-none"
            >
              <option value="All">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full min-w-[700px] text-left">
            <thead className="bg-[#faf7f4]">
              <tr className="text-xs uppercase tracking-wider text-[#907d72]">
                <th className="px-6 py-4 font-semibold">Product</th>
                <th className="px-6 py-4 font-semibold">SKU</th>
                <th className="px-6 py-4 font-semibold">Category</th>
                <th className="px-6 py-4 font-semibold">Price</th>
                <th className="px-6 py-4 font-semibold">Status</th>
                <th className="px-6 py-4 text-center font-semibold">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-[#f0e9e4]">
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => {
                  const firstVariant = product.variants?.[0];
                  const isActive =
                    getStatus(product.status) === "active";

                  return (
                    <tr
                      key={product._id}
                      className="transition hover:bg-[#fdfbf9]"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          {product.productImages?.[0] ? (
                            <img
                              src={product.productImages[0]}
                              alt={product.name}
                              className="h-12 w-12 rounded-xl border border-[#eee5df] object-cover"
                            />
                          ) : (
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#f5ede8] text-[#a36f55]">
                              <FiPackage size={20} />
                            </div>
                          )}

                          <div>
                            <p className="whitespace-nowrap text-sm font-semibold text-[#30241f]">
                              {product.name}
                            </p>
                            <p className="mt-1 text-xs text-[#99877d]">
                              {product.variants?.length || 0} Variants
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="px-6 py-4 text-sm text-[#897970]">
                        {product.sku || "-"}
                      </td>

                      <td className="px-6 py-4 text-sm text-[#897970]">
                        {product.category || "-"}
                      </td>

                      <td className="px-6 py-4 text-sm font-semibold text-[#30241f]">
                        {firstVariant
                          ? formatPrice(firstVariant.price)
                          : "-"}
                      </td>

                      <td className="px-6 py-4">
                        <span
                          className={`whitespace-nowrap rounded-full px-3 py-1.5 text-xs font-semibold ${
                            isActive
                              ? "bg-[#edf5ee] text-[#47845a]"
                              : "bg-[#f9eeea] text-[#b45e4b]"
                          }`}
                        >
                          {isActive ? "Active" : "Inactive"}
                        </span>
                      </td>

                      <td className="px-6 py-4">
                        <div className="flex items-center justify-center gap-4">
                          <button
                            type="button"
                            title="View Product"
                            onClick={() => setSelectedProduct(product)}
                            className="text-[#8b796e] transition hover:text-[#211a18]"
                          >
                            <FiEye size={18} />
                          </button>

                          <button
                            type="button"
                            title="Edit Product"
                            onClick={() => handleEdit(product)}
                            className="text-[#a36f55] transition hover:text-[#70452f]"
                          >
                            <FiEdit2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td
                    colSpan="6"
                    className="px-6 py-12 text-center text-sm text-[#99877d]"
                  >
                    No products found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Product View Modal */}
      {selectedProduct && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-3 sm:p-6"
          onClick={closeView}
        >
          <div
            className="max-h-[92vh] w-full max-w-5xl overflow-y-auto rounded-2xl bg-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-[#eee5df] bg-white px-5 py-4 sm:px-7">
              <div>
                <h2 className="text-xl font-bold text-[#211a18]">
                  Product Details
                </h2>
                <p className="mt-1 text-xs text-[#897970]">
                  {selectedProduct.sku || "Product"}
                </p>
              </div>

              <button
                type="button"
                onClick={closeView}
                className="rounded-lg border border-[#eee5df] p-2 text-[#55443c] hover:bg-[#f5efeb]"
              >
                <FiX size={20} />
              </button>
            </div>

            <div className="space-y-7 p-5 sm:p-7">

              {/* Product Images */}
              {selectedProduct.productImages?.length > 0 && (
                <div>
                  <h3 className="mb-3 font-semibold text-[#211a18]">
                    Product Images
                  </h3>

                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                    {selectedProduct.productImages.map((image, index) => (
                      <img
                        key={`${image}-${index}`}
                        src={image}
                        alt={`${selectedProduct.name} ${index + 1}`}
                        className="h-40 w-full rounded-xl border border-[#eee5df] object-cover"
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Basic Details */}
              <div>
                <h3 className="mb-4 font-semibold text-[#211a18]">
                  Basic Information
                </h3>

                <div className="grid gap-4 rounded-xl bg-[#fcfaf8] p-4 sm:grid-cols-2 lg:grid-cols-3">
                  <div>
                    <p className="text-xs text-[#99877d]">Product Name</p>
                    <p className="mt-1 text-sm font-semibold text-[#30241f]">
                      {selectedProduct.name}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-[#99877d]">SKU</p>
                    <p className="mt-1 text-sm font-semibold text-[#30241f]">
                      {selectedProduct.sku || "-"}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-[#99877d]">Category</p>
                    <p className="mt-1 text-sm font-semibold text-[#30241f]">
                      {selectedProduct.category || "-"}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-[#99877d]">Status</p>
                    <p className="mt-1 text-sm font-semibold capitalize text-[#30241f]">
                      {selectedProduct.status || "-"}
                    </p>
                  </div>

                  <div className="sm:col-span-2">
                    <p className="text-xs text-[#99877d]">Description</p>
                    <p className="mt-1 whitespace-pre-wrap text-sm text-[#55443c]">
                      {selectedProduct.description || "-"}
                    </p>
                  </div>

                  <div className="sm:col-span-2 lg:col-span-3">
                    <p className="text-xs text-[#99877d]">
                      Additional Information
                    </p>
                    <p className="mt-1 whitespace-pre-wrap text-sm text-[#55443c]">
                      {selectedProduct.additionalInfo || "-"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Variants */}
              <div>
                <h3 className="mb-4 font-semibold text-[#211a18]">
                  Product Variants
                </h3>

                <div className="overflow-x-auto rounded-xl border border-[#eee5df]">
                  <table className="w-full min-w-[450px] text-left">
                    <thead className="bg-[#faf7f4]">
                      <tr className="text-xs uppercase text-[#907d72]">
                        <th className="px-4 py-3">Variant</th>
                        <th className="px-4 py-3">Price</th>
                        <th className="px-4 py-3">Stock</th>
                      </tr>
                    </thead>

                    <tbody className="divide-y divide-[#eee5df]">
                      {(selectedProduct.variants || []).map(
                        (variant, index) => (
                          <tr key={variant._id || index}>
                            <td className="px-4 py-3 text-sm font-medium text-[#30241f]">
                              {variant.unit || `Variant ${index + 1}`}
                            </td>
                            <td className="px-4 py-3 text-sm font-semibold text-[#30241f]">
                              {formatPrice(variant.price)}
                            </td>
                            <td className="px-4 py-3 text-sm text-[#55443c]">
                              {variant.stock ?? 0}
                            </td>
                          </tr>
                        )
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Packing */}
              <div>
                <h3 className="mb-4 font-semibold text-[#211a18]">
                  Packing Details
                </h3>

                <div className="grid grid-cols-2 gap-3 rounded-xl bg-[#fcfaf8] p-4 sm:grid-cols-4">
                  {[
                    ["Width", selectedProduct.packing?.width, "cm"],
                    ["Length", selectedProduct.packing?.length, "cm"],
                    ["Height", selectedProduct.packing?.height, "cm"],
                    ["Weight", selectedProduct.packing?.weight, "kg"],
                  ].map(([label, value, unit]) => (
                    <div key={label}>
                      <p className="text-xs text-[#99877d]">{label}</p>
                      <p className="mt-1 text-sm font-semibold text-[#30241f]">
                        {value ?? "-"} {value != null ? unit : ""}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Modal Actions */}
              <div className="flex justify-end border-t border-[#eee5df] pt-5">
                <button
                  type="button"
                  onClick={() => {
                    const product = selectedProduct;
                    closeView();
                    handleEdit(product);
                  }}
                  className="rounded-xl bg-[#211a18] px-5 py-3 text-sm font-semibold text-white hover:bg-[#49362e]"
                >
                  Edit Product
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Products;
