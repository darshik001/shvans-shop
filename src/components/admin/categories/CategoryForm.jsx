
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FiArrowLeft, FiUpload, FiX } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { AddCategory, clearCategoryMessages, UpdateCategory } from "../../../toolkit/slices/admin/categories";
import { toast } from "react-toastify";
const CategoryForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const location = useLocation();
  const { isLoading, successMessage, ErrMessage } = useSelector((state) => state.AdminCategories)
  const isEdit = location.state?.isEdit || false;
  const category = location.state?.category || null;

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    status: "active",
  });

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");

  // Fill form when edit
  useEffect(() => {
    if (isEdit && category) {
      setFormData({
        name: category.name || "",
        description: category.description || "",
        status: category.status || "active",
      });

      setPreview(category.categoryImage || "");
    }
  }, [isEdit, category]);

  useEffect(() => {
    return () => {
      if (preview.startsWith("blob:")) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  const inputClass =
    "w-full rounded-lg border border-[#e8ded8] bg-white px-4 py-3 text-sm text-[#211a18] outline-none transition focus:border-[#a36f55] focus:ring-2 focus:ring-[#a36f55]/10";

  const labelClass =
    "mb-2 block text-sm font-medium text-[#55443c]";

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    setImage(file);
    setPreview(URL.createObjectURL(file));
    e.target.value = "";
  };

  const removeImage = () => {
    setImage(null);
    setPreview("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const categoryData = {
      name: formData.name.trim(),
      description: formData.description,
      status: formData.status,
      categoryImage: image,
      existingImage: !image ? category?.categoryImage || "" : "",
    };



    if (!isEdit) {
      dispatch(AddCategory(categoryData))
      navigate('/admin/categories')
    } else {

      dispatch(UpdateCategory({ ...categoryData, categoryId: category._id }))
      navigate('/admin/categories')

    }


  };

  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage)
      dispatch(clearCategoryMessages())
    }

    if (ErrMessage) {
      toast.success(ErrMessage)
      dispatch(clearCategoryMessages())
    }

  }, [successMessage, ErrMessage])

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => navigate("/admin/categories")}
          className="rounded-lg border border-[#e8ded8] bg-white p-3 text-[#55443c]"
        >
          <FiArrowLeft size={18} />
        </button>

        <div>
          <h1 className="text-2xl font-semibold text-[#211a18]">
            {isEdit ? "Edit Category" : "Add Category"}
          </h1>

          <p className="mt-1 text-sm text-[#8b7770]">
            {isEdit
              ? "Update category information"
              : "Create a new product category"}
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <section className="rounded-xl border border-[#eee5df] bg-white p-5 shadow-sm sm:p-6">
          <h2 className="mb-5 text-lg font-semibold text-[#211a18]">
            Category Information
          </h2>

          <div className="space-y-5">
            <div>
              <label className={labelClass}>Category Name *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter category name"
                className={inputClass}
                required
              />
            </div>

            <div>
              <label className={labelClass}>Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={4}
                placeholder="Enter category description"
                className={inputClass}
              />
            </div>
          </div>
        </section>

        <section className="rounded-xl border border-[#eee5df] bg-white p-5 shadow-sm sm:p-6">
          <h2 className="mb-5 text-lg font-semibold text-[#211a18]">
            Category Image
          </h2>

          {!preview ? (
            <label className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-[#d9c5b9] bg-[#fcfaf8] p-8 text-center">
              <FiUpload size={28} className="mb-3 text-[#a36f55]" />
              <span className="text-sm font-semibold text-[#55443c]">
                Click to upload image
              </span>

              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </label>
          ) : (
            <div className="relative max-w-sm overflow-hidden rounded-xl border border-[#eee5df]">
              <img
                src={preview}
                alt="Category preview"
                className="h-56 w-full object-cover"
              />

              <button
                type="button"
                onClick={removeImage}
                className="absolute right-3 top-3 rounded-full bg-[#211a18] p-2 text-white"
              >
                <FiX size={16} />
              </button>
            </div>
          )}
        </section>

        <section className="rounded-xl border border-[#eee5df] bg-white p-5 shadow-sm sm:p-6">
          <h2 className="mb-4 text-lg font-semibold text-[#211a18]">
            Category Status
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

        <div className="flex justify-end gap-3 pb-5">
          <button
            type="button"
            onClick={() => navigate("/admin/categories")}
            className="rounded-lg border border-[#e8ded8] bg-white px-6 py-3 text-sm font-semibold text-[#55443c]"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={isLoading}
            className="rounded-lg bg-[#211a18] px-7 py-3 text-sm font-semibold text-white"
          >
            {isEdit ? "Update Category" : "Save Category"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CategoryForm;
