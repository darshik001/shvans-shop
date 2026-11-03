
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    FiPlus,
    FiSearch,
    FiEdit2,
    FiTrash2,
    FiEye,
    FiTag,
    FiX,
} from "react-icons/fi";
import { useSelector } from "react-redux";



const Categories = () => {
    const navigate = useNavigate();
    const {categories,isLoading} = useSelector((state)=>state.AdminCategories)
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [showView, setShowView] = useState(false);

    const filteredCategories = useMemo(() => {
        return categories.filter((category) => {
            const matchesSearch = category.name
                .toLowerCase()
                .includes(search.toLowerCase());

            const matchesStatus =
                statusFilter === "all" ||
                category.status === statusFilter;

            return matchesSearch && matchesStatus;
        });
    }, [categories, search, statusFilter]);

    const handleDelete = (id) => {
        const confirmed = window.confirm(
            "Are you sure you want to delete this category?"
        );

        if (!confirmed) return;

        setCategories((prev) =>
            prev.filter((category) => category._id !== id)
        );
    };

    const handleEdit = (category) => {
  navigate("/admin/categorie-from", {
    state: {
      isEdit: true,
      category,
    },
  });
};

    const handleView = (category) => {
        setSelectedCategory(category);
        setShowView(true);
    };

    const activeCount = categories.filter((category) => category.status === "active").length;

    const inactiveCount = categories.filter((category) => category.status === "inactive").length;



   
    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-semibold text-[#211a18]">
                        Categories
                    </h1>
                    <p className="mt-1 text-sm text-[#8b7770]">
                        Manage your product categories
                    </p>
                </div>

                <button
                    onClick={() => navigate("/admin/categorie-from")}
                    className="flex items-center gap-2 rounded-lg bg-[#211a18] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#44332c]"
                >
                    <FiPlus size={18} />
                    Add Category
                </button>
            </div>

            {/* Stats */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <div className="rounded-xl border border-[#eee5df] bg-white p-5 shadow-sm">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-[#8b7770]">Total Categories</p>
                            <h2 className="mt-2 text-2xl font-bold text-[#211a18]">
                                {categories.length}
                            </h2>
                        </div>
                        <div className="rounded-xl bg-[#f5ece6] p-3 text-[#a36f55]">
                            <FiTag size={22} />
                        </div>
                    </div>
                </div>

                <div className="rounded-xl border border-[#eee5df] bg-white p-5 shadow-sm">
                    <p className="text-sm text-[#8b7770]">Active Categories</p>
                    <h2 className="mt-2 text-2xl font-bold text-green-700">
                        {activeCount}
                    </h2>
                </div>

                <div className="rounded-xl border border-[#eee5df] bg-white p-5 shadow-sm">
                    <p className="text-sm text-[#8b7770]">Inactive Categories</p>
                    <h2 className="mt-2 text-2xl font-bold text-red-600">
                        {inactiveCount}
                    </h2>
                </div>
            </div>

            {/* Search and Filter */}
            <div className="flex flex-col gap-3 rounded-xl border border-[#eee5df] bg-white p-4 shadow-sm sm:flex-row">
                <div className="relative flex-1">
                    <FiSearch
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-[#a18e85]"
                        size={18}
                    />
                    <input
                        type="text"
                        placeholder="Search category..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full rounded-lg border border-[#e8ded8] py-3 pl-11 pr-4 text-sm outline-none focus:border-[#a36f55]"
                    />
                </div>

                <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="rounded-lg border border-[#e8ded8] bg-white px-4 py-3 text-sm text-[#55443c] outline-none focus:border-[#a36f55]"
                >
                    <option value="all">All Status</option>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                </select>
            </div>

            {/* Category Table */}
            <div className="overflow-hidden rounded-xl border border-[#eee5df] bg-white shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full min-w-[750px] text-left">
                        <thead className="bg-[#faf7f4]">
                            <tr className="text-xs uppercase tracking-wide text-[#8b7770]">
                                <th className="px-5 py-4 font-semibold">Category</th>
                                <th className="px-5 py-4 font-semibold">Description</th>
                                <th className="px-5 py-4 font-semibold">Status</th>
                                <th className="px-5 py-4 font-semibold">Created At</th>
                                <th className="px-5 py-4 text-right font-semibold">Actions</th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-[#f0e9e4]">
                            {filteredCategories.map((category) => (
                                <tr key={category._id} className="hover:bg-[#fdfbf9]">
                                    <td className="px-5 py-4">
                                        <div className="flex items-center gap-3">
                                            <img
                                                src={category.categoryImage}
                                                alt={category.name}
                                                className="h-12 w-12 rounded-lg border border-[#eee5df] object-cover"
                                            />
                                            <span className="font-semibold text-[#211a18]">
                                                {category.name}
                                            </span>
                                        </div>
                                    </td>

                                    <td className="max-w-[250px] px-5 py-4 text-sm text-[#8b7770]">
                                        <p className="line-clamp-2">
                                            {category.description || "-"}
                                        </p>
                                    </td>

                                    <td className="px-5 py-4">
                                        <span
                                            className={`rounded-full px-3 py-1 text-xs font-semibold ${category.status === "active"
                                                    ? "bg-green-50 text-green-700"
                                                    : "bg-red-50 text-red-600"
                                                }`}
                                        >
                                            {category.status}
                                        </span>
                                    </td>

                                    <td className="px-5 py-4 text-sm text-[#8b7770]">
                                        {category.createdAt || "-"}
                                    </td>

                                    <td className="px-5 py-4">
                                        <div className="flex justify-end gap-2">
                                            <button
                                                title="View"
                                                onClick={() => handleView(category)}
                                                className="rounded-lg border border-[#eee5df] p-2 text-[#6f625b] hover:bg-[#f5ece6]"
                                            >
                                                <FiEye size={16} />
                                            </button>

                                            <button
                                                title="Edit"
                                                onClick={() => handleEdit(category)}
                                                className="rounded-lg border border-[#eee5df] p-2 text-[#a36f55] hover:bg-[#f5ece6]"
                                            >
                                                <FiEdit2 size={16} />
                                            </button>

                                            <button
                                                title="Delete"
                                                onClick={() => handleDelete(category._id)}
                                                className="rounded-lg border border-[#eee5df] p-2 text-red-500 hover:bg-red-50"
                                            >
                                                <FiTrash2 size={16} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}

                            {filteredCategories.length === 0 && (
                                <tr>
                                    <td
                                        colSpan="5"
                                        className="px-5 py-12 text-center text-sm text-[#8b7770]"
                                    >
                                        No categories found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* View Modal */}
            {showView && selectedCategory && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
                    onClick={() => setShowView(false)}
                >
                    <div
                        className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="mb-5 flex items-center justify-between">
                            <h2 className="text-xl font-semibold text-[#211a18]">
                                Category Details
                            </h2>

                            <button
                                onClick={() => setShowView(false)}
                                className="rounded-lg p-2 text-[#8b7770] hover:bg-[#f5ece6]"
                            >
                                <FiX size={20} />
                            </button>
                        </div>

                        <img
                            src={selectedCategory.categoryImage}
                            alt={selectedCategory.name}
                            className="mb-5 h-48 w-full rounded-xl object-cover"
                        />

                        <div className="space-y-3">
                            <div>
                                <p className="text-xs text-[#9b8980]">CATEGORY NAME</p>
                                <p className="mt-1 font-semibold text-[#211a18]">
                                    {selectedCategory.name}
                                </p>
                            </div>

                            <div>
                                <p className="text-xs text-[#9b8980]">DESCRIPTION</p>
                                <p className="mt-1 text-sm text-[#55443c]">
                                    {selectedCategory.description || "No description"}
                                </p>
                            </div>

                            <div>
                                <p className="text-xs text-[#9b8980]">STATUS</p>
                                <span className="mt-1 inline-block rounded-full bg-[#f5ece6] px-3 py-1 text-xs font-semibold capitalize text-[#a36f55]">
                                    {selectedCategory.status}
                                </span>
                            </div>
                        </div>

                        <button
                            onClick={() => setShowView(false)}
                            className="mt-6 w-full rounded-lg bg-[#211a18] py-3 text-sm font-semibold text-white hover:bg-[#44332c]"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Categories;
