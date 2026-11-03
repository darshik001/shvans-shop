
import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  FiArrowLeft,
  FiPlus,
  FiTrash2,
  FiUpload,
  FiX,
} from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { AddProducts, clearProductMessages, UpdateProduct } from "../../../toolkit/slices/admin/products";
import { toast } from "react-toastify";

const emptyVariant = {
  price: "",
  stock: 0,
  unit: "",
};

const initialForm = {
  productId: "",
  categoryId: "",
  name: "",
  description: "",
  additionalInfo: "",
  variants: [{ ...emptyVariant }],
  packing: {
    width: 30,
    length: 15,
    height: 5,
    weight: 0.5,
  },
  status: "active",
};

const ProductForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const location = useLocation();

  const { categories = [] } = useSelector(
    (state) => state.AdminCategories
  );
  const { isLoading, success, ErrMessage, successMessage } = useSelector((state) => state.AdminProducts);


  // Edit product from navigation state
  const product = location.state?.product || location.state?.initialData || null;

  const isEdit = Boolean(product) || location.state?.isEdit === true;

  const [formData, setFormData] = useState(initialForm);
  const [imageItems, setImageItems] = useState([]);

  const blobUrls = useRef(new Set());

  // Load existing product data
  useEffect(() => {
    if (!isEdit || !product) return;

    setFormData({
      productId: product._id || "",

      categoryId:
        product.categoryId?._id ||
        product.categoryId ||
        "",

      name: product.name || "",
      description: product.description || "",
      additionalInfo: product.additionalInfo || "",

      variants:
        product.variants?.length > 0
          ? product.variants.map((variant) => ({
            price: variant.price ?? "",
            stock: variant.stock ?? 0,
            unit: variant.unit || "",
          }))
          : [{ ...emptyVariant }],

      packing: {
        width: product.packing?.width ?? 30,
        length: product.packing?.length ?? 15,
        height: product.packing?.height ?? 5,
        weight: product.packing?.weight ?? 0.5,
      },

      status: product.status || "active",
    });

    setImageItems(
      (product.productImages || []).map((image) => ({
        url: image,
        file: null,
        isExisting: true,
      }))
    );
  }, [isEdit, product]);

  // Cleanup blob URLs
  useEffect(() => {
    return () => {
      blobUrls.current.forEach((url) => {
        URL.revokeObjectURL(url);
      });

      blobUrls.current.clear();
    };
  }, []);




  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePackingChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      packing: {
        ...prev.packing,
        [name]: value,
      },
    }));
  };

  const handleVariantChange = (index, e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      variants: prev.variants.map((variant, i) =>
        i === index
          ? { ...variant, [name]: value }
          : variant
      ),
    }));
  };

  const addVariant = () => {
    setFormData((prev) => ({
      ...prev,
      variants: [...prev.variants, { ...emptyVariant }],
    }));
  };

  const removeVariant = (index) => {
    setFormData((prev) => ({
      ...prev,
      variants:
        prev.variants.length > 1
          ? prev.variants.filter((_, i) => i !== index)
          : prev.variants,
    }));
  };

  // Select multiple images
  const handleImageChange = (e) => {
    const selectedFiles = Array.from(e.target.files || []);

    const newImages = selectedFiles.map((file) => {
      const url = URL.createObjectURL(file);

      blobUrls.current.add(url);

      return {
        url,
        file,
        isExisting: false,
      };
    });

    setImageItems((prev) => [...prev, ...newImages]);

    e.target.value = "";
  };

  // Remove image
  const removeImage = (index) => {
    const removedImage = imageItems[index];

    if (removedImage?.file) {
      URL.revokeObjectURL(removedImage.url);
      blobUrls.current.delete(removedImage.url);
    }

    setImageItems((prev) =>
      prev.filter((_, i) => i !== index)
    );
  };

  // Submit
  const handleSubmit = (e) => {
    e.preventDefault();

    const productData = {
      ...formData,

      variants: formData.variants.map((variant) => ({
        price: Number(variant.price),
        stock: Number(variant.stock),
        unit: variant.unit,
      })),

      packing: {
        width: Number(formData.packing.width),
        length: Number(formData.packing.length),
        height: Number(formData.packing.height),
        weight: Number(formData.packing.weight),
      },

      productImages: imageItems.filter((item) => item.isExisting).map((item) => item.url),

      newImages: imageItems.filter((item) => !item.isExisting).map((item) => item.file)
    };

    if (!isEdit) {
      dispatch(AddProducts(productData))
    } else {

      const existingImages = product.productImages || [];
      const updatedImages = productData.productImages || [];

      const deleteImages = existingImages.filter(
        (image) => !updatedImages.includes(image)
      );

      dispatch(UpdateProduct({ ...productData, _id: product._id, deleteImages }))
    }



  };


  useEffect(() => {
    if (success) {
      dispatch(clearProductMessages());
      navigate("/admin/products");
    }
  }, [success, navigate, dispatch]);

  useEffect(()=>{
    if(ErrMessage){
      toast.error(ErrMessage)
      dispatch(clearProductMessages());
    }
    if(successMessage){
      toast.success(successMessage)
      dispatch(clearProductMessages());
    }
  },[ErrMessage, successMessage])



  const inputClass =
    "w-full rounded-lg border border-[#e8ded8] bg-white px-4 py-3 text-sm text-[#211a18] outline-none transition focus:border-[#a36f55] focus:ring-2 focus:ring-[#a36f55]/10";

  const labelClass =
    "mb-2 block text-sm font-medium text-[#55443c]";

  return (
    <div className="mx-auto max-w-6xl space-y-6">

      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => navigate("/admin/products")}
            className="rounded-lg border border-[#e8ded8] bg-white p-3 text-[#55443c] hover:bg-[#f5efeb]"
          >
            <FiArrowLeft size={18} />
          </button>

          <div>
            <h1 className="text-2xl font-semibold text-[#211a18]">
              {isEdit ? "Edit Product" : "Add Product"}
            </h1>

            <p className="mt-1 text-sm text-[#8b7770]">
              Manage your product information
            </p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">

        {/* Basic Information */}
        <section className="rounded-xl border border-[#eee5df] bg-white p-5 shadow-sm sm:p-6">
          <h2 className="mb-5 text-lg font-semibold text-[#211a18]">
            Basic Information
          </h2>

          <div className="grid gap-5 md:grid-cols-2">

            {/* Product Name */}
            <div>
              <label className={labelClass}>
                Product Name *
              </label>

              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter product name"
                className={inputClass}
                required
              />
            </div>

            {/* Category Dropdown */}
            <div>
              <label className={labelClass}>
                Select Category *
              </label>

              <select
                name="categoryId"
                value={formData.categoryId}
                onChange={handleChange}
                className={inputClass}
                required
              >
                <option value="">
                  Select Category
                </option>

                {categories.map((item) => (
                  <option
                    key={item._id}
                    value={item._id}
                  >
                    {item.name}
                  </option>
                ))}
              </select>

              {categories.length === 0 && (
                <p className="mt-2 text-xs text-red-500">
                  No categories found. Please load categories first.
                </p>
              )}
            </div>

            {/* Description */}
            <div className="md:col-span-2">
              <label className={labelClass}>
                Description
              </label>

              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={4}
                placeholder="Enter product description"
                className={inputClass}
              />
            </div>

            {/* Additional Information */}
            <div className="md:col-span-2">
              <label className={labelClass}>
                Additional Information
              </label>

              <textarea
                name="additionalInfo"
                value={formData.additionalInfo}
                onChange={handleChange}
                rows={3}
                placeholder="Enter additional information"
                className={inputClass}
              />
            </div>

          </div>
        </section>

        {/* Product Images */}
        <section className="rounded-xl border border-[#eee5df] bg-white p-5 shadow-sm sm:p-6">
          <h2 className="mb-5 text-lg font-semibold text-[#211a18]">
            Product Images
          </h2>

          <label className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-[#d9c5b9] bg-[#fcfaf8] p-8 text-center hover:bg-[#f8f2ee]">
            <FiUpload
              size={28}
              className="mb-3 text-[#a36f55]"
            />

            <span className="text-sm font-semibold text-[#55443c]">
              Click to upload images
            </span>

            <span className="mt-1 text-xs text-[#99877e]">
              Select multiple product images
            </span>

            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageChange}
              className="hidden"
            />
          </label>

          {imageItems.length > 0 && (
            <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-5">
              {imageItems.map((item, index) => (
                <div
                  key={`${item.url}-${index}`}
                  className="group relative overflow-hidden rounded-lg border border-[#eee5df]"
                >
                  <img
                    src={item.url}
                    alt={`Product ${index + 1}`}
                    className="h-32 w-full object-cover"
                  />

                  <span className="absolute bottom-2 left-2 rounded bg-black/60 px-2 py-1 text-xs text-white">
                    {item.isExisting ? "Existing" : "New"}
                  </span>

                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute right-2 top-2 rounded-full bg-[#211a18] p-2 text-white"
                  >
                    <FiX size={14} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Variants */}
        <section className="rounded-xl border border-[#eee5df] bg-white p-5 shadow-sm sm:p-6">
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-lg font-semibold text-[#211a18]">
                Product Variants
              </h2>

              <p className="mt-1 text-xs text-[#8b7770]">
                Add price, stock and unit for each variant
              </p>
            </div>

            <button
              type="button"
              onClick={addVariant}
              className="flex items-center gap-2 rounded-lg bg-[#211a18] px-4 py-2.5 text-sm font-medium text-white hover:bg-[#44332c]"
            >
              <FiPlus /> Add Variant
            </button>
          </div>

          <div className="space-y-4">
            {formData.variants.map((variant, index) => (
              <div
                key={index}
                className="rounded-lg border border-[#eee5df] bg-[#fcfaf8] p-4"
              >
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="text-sm font-semibold text-[#55443c]">
                    Variant {index + 1}
                  </h3>

                  <button
                    type="button"
                    onClick={() => removeVariant(index)}
                    disabled={formData.variants.length === 1}
                    className="rounded-lg p-2 text-red-500 hover:bg-red-50 disabled:opacity-40"
                  >
                    <FiTrash2 size={17} />
                  </button>
                </div>

                <div className="grid gap-4 md:grid-cols-3">
                  <div>
                    <label className={labelClass}>
                      Price *
                    </label>

                    <input
                      type="number"
                      name="price"
                      min="0"
                      step="0.01"
                      value={variant.price}
                      onChange={(e) =>
                        handleVariantChange(index, e)
                      }
                      placeholder="Enter price"
                      className={inputClass}
                      required
                    />
                  </div>

                  <div>
                    <label className={labelClass}>
                      Stock
                    </label>

                    <input
                      type="number"
                      name="stock"
                      min="0"
                      value={variant.stock}
                      onChange={(e) =>
                        handleVariantChange(index, e)
                      }
                      placeholder="Enter stock"
                      className={inputClass}
                    />
                  </div>

                  <div>
                    <label className={labelClass}>
                      Unit *
                    </label>

                    <input
                      name="unit"
                      value={variant.unit}
                      onChange={(e) =>
                        handleVariantChange(index, e)
                      }
                      placeholder="e.g. piece, gram"
                      className={inputClass}
                      required
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Packing */}
        <section className="rounded-xl border border-[#eee5df] bg-white p-5 shadow-sm sm:p-6">
          <h2 className="mb-5 text-lg font-semibold text-[#211a18]">
            Packing Details
          </h2>

          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {[
              { name: "width", label: "Width" },
              { name: "length", label: "Length" },
              { name: "height", label: "Height" },
              { name: "weight", label: "Weight" },
            ].map((field) => (
              <div key={field.name}>
                <label className={labelClass}>
                  {field.label}
                </label>

                <input
                  type="number"
                  min="0"
                  step="any"
                  name={field.name}
                  value={formData.packing[field.name]}
                  onChange={handlePackingChange}
                  className={inputClass}
                />
              </div>
            ))}
          </div>
        </section>

        {/* Status */}
        <section className="rounded-xl border border-[#eee5df] bg-white p-5 shadow-sm sm:p-6">
          <h2 className="mb-4 text-lg font-semibold text-[#211a18]">
            Product Status
          </h2>

          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className={inputClass}
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </section>

        {/* Actions */}
        <div className="flex flex-wrap justify-end gap-3 pb-5">
          <button
            type="button"
            onClick={() => navigate("/admin/products")}
            className="rounded-lg border border-[#e8ded8] bg-white px-6 py-3 text-sm font-semibold text-[#55443c] hover:bg-[#f5efeb]"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="rounded-lg bg-[#211a18] px-7 py-3 text-sm font-semibold text-white hover:bg-[#44332c]"
          >
            {isEdit ? (isLoading ? "Updating..." : "Update Product") : (isLoading ? "Saving..." : "Save Product")}
          </button>
        </div>

      </form>
    </div>
  );
};

export default ProductForm;
