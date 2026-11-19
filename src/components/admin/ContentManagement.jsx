
import { useEffect, useMemo, useState } from "react";
import {
  FiPlus,
  FiEdit2,
  FiTrash2,
  FiSearch,
  FiBell,
  FiImage,
  FiX,
  FiSave,
} from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";

import {
  AddAnnounc,
  clearAnnounceMessages,
  DeleteAnnounc,
  UpdateAnnounc,
} from "../../toolkit/slices/admin/announcements";

import { AddBanner, clearBannerMessages, DeleteBanner, UpdateBanner } from "../../toolkit/slices/admin/banner";
import { toast } from "react-toastify";

const announcementInitialForm = {
  title: "",
  status: "active",
};

const bannerInitialForm = {
  title: "",
  description: "",
  bannerImage: null,
  imageTitle: "",
  imageDescription: "",
  status: "active",
};

const ContentManagement = () => {
  const dispatch = useDispatch();

  const { announcements, successMessage, errMessage } = useSelector((state) => state.AdminAnnounc);

  const { banners } = useSelector((state) => state.AdminBanner);
  const AdminBanner = useSelector((state) => state.AdminBanner);

  const [activeTab, setActiveTab] = useState("announcement");
  const [search, setSearch] = useState("");

  const [showAnnouncementForm, setShowAnnouncementForm] =
    useState(false);

  const [showBannerForm, setShowBannerForm] =
    useState(false);

  const [isAnnouncementEdit, setIsAnnouncementEdit] =
    useState(false);

  const [isBannerEdit, setIsBannerEdit] =
    useState(false);

  const [announcementEditId, setAnnouncementEditId] =
    useState(null);

  const [bannerEditId, setBannerEditId] =
    useState(null);

  const [announcementForm, setAnnouncementForm] =
    useState(announcementInitialForm);

  const [bannerForm, setBannerForm] =
    useState(bannerInitialForm);

  const [bannerPreview, setBannerPreview] = useState("");

  const [localBannerUpdates, setLocalBannerUpdates] = useState({});

  const announcementList = Array.isArray(announcements)
    ? announcements
    : [];

  const bannerList = Array.isArray(banners)
    ? banners
    : [];

  // SEARCH ANNOUNCEMENTS
  const filteredAnnouncements = useMemo(() => {
    return announcementList.filter((item) =>
      item.title?.toLowerCase().includes(search.toLowerCase())
    );
  }, [announcementList, search]);

  // SEARCH BANNERS
  const filteredBanners = useMemo(() => {
    return bannerList
      .map((item) => ({
        ...item,
        ...(localBannerUpdates[item._id] || {}),
      }))
      .filter((item) =>
        item.title?.toLowerCase().includes(search.toLowerCase())
      );
  }, [bannerList, search, localBannerUpdates]);

  // RESET ANNOUNCEMENT FORM
  const resetAnnouncementForm = () => {
    setAnnouncementForm(announcementInitialForm);
    setAnnouncementEditId(null);
    setIsAnnouncementEdit(false);
    setShowAnnouncementForm(false);
  };

  // RESET BANNER FORM
  const resetBannerForm = () => {
    setBannerForm(bannerInitialForm);
    setBannerEditId(null);
    setIsBannerEdit(false);
    setBannerPreview("");
    setShowBannerForm(false);
  };

  // TAB CHANGE
  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setSearch("");
    resetAnnouncementForm();
    resetBannerForm();
  };

  // ADD ANNOUNCEMENT
  const handleAddAnnouncement = () => {
    resetAnnouncementForm();
    setShowAnnouncementForm(true);
  };

  // ADD BANNER
  const handleAddBanner = () => {
    resetBannerForm();
    setShowBannerForm(true);
  };

  // ANNOUNCEMENT INPUT
  const handleAnnouncementInput = (e) => {
    const { name, value } = e.target;

    setAnnouncementForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // BANNER INPUT
  const handleBannerInput = (e) => {
    const { name, value } = e.target;

    setBannerForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // EDIT ANNOUNCEMENT
  const handleEditAnnouncement = (item) => {
    console.log("EDIT ANNOUNCEMENT ID:", item._id);

    setAnnouncementEditId(item._id);
    setIsAnnouncementEdit(true);

    setAnnouncementForm({
      title: item.title || "",
      status: item.status || "active",
    });

    setShowAnnouncementForm(true);
  };

  // EDIT BANNER
  const handleEditBanner = (item) => {
    console.log("EDIT BANNER ID:", item._id);
    console.log("EDIT BANNER DATA:", item);

    setBannerEditId(item._id);
    setIsBannerEdit(true);

    setBannerForm({
      title: item.title || "",
      description: item.description || "",
      bannerImage: null,
      imageTitle: item.imageTitle || "",
      imageDescription: item.imageDescription || "",
      status: item.status || "active",
    });

    setBannerPreview(item.bannerImage || "");

    setShowBannerForm(true);
  };

  // BANNER IMAGE
  const handleBannerImage = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    setBannerForm((prev) => ({
      ...prev,
      bannerImage: file,
    }));

    setBannerPreview(URL.createObjectURL(file));
  };

  // SUBMIT ANNOUNCEMENT
  const handleAnnouncementSubmit = (e) => {
    e.preventDefault();

    if (!announcementForm.title.trim()) {
      alert("Please enter announcement title");
      return;
    }

    const submitData = {
      ...(isAnnouncementEdit && {
        _id: announcementEditId,
      }),
      title: announcementForm.title.trim(),
      status: announcementForm.status,
    };

    console.log(
      isAnnouncementEdit
        ? "UPDATE ANNOUNCEMENT DATA:"
        : "ADD ANNOUNCEMENT DATA:",
      submitData
    );

    if (isAnnouncementEdit) {
      dispatch(UpdateAnnounc(submitData));
    } else {
      dispatch(AddAnnounc(submitData));
    }

    resetAnnouncementForm();
  };

  // SUBMIT BANNER
  const handleBannerSubmit = (e) => {
    e.preventDefault();

    if (!bannerForm.title.trim()) {
      alert("Please enter banner title");
      return;
    }

    const submitData = {
      ...(isBannerEdit && { _id: bannerEditId, }),
      title: bannerForm.title.trim(),
      description: bannerForm.description,
      bannerImage: bannerForm.bannerImage,
      imageTitle: bannerForm.imageTitle,
      imageDescription: bannerForm.imageDescription,
      status: bannerForm.status,
    };


    if (isBannerEdit) {
      dispatch(UpdateBanner(submitData))
    } else {
      dispatch(AddBanner(submitData));
    }

    resetBannerForm();
  };

  // DELETE ANNOUNCEMENT
  const handleDeleteAnnouncement = (id) => {
    if (!id) return;

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this announcement?"
    );

    if (!confirmDelete) return;

    console.log("DELETE ANNOUNCEMENT ID:", id);

    dispatch(DeleteAnnounc(id));
  };

  // DELETE BANNER
  const handleDeleteBanner = (id) => {
    if (!id) return;

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this banner?"
    );

    if (!confirmDelete) return;

    dispatch(DeleteBanner(id))

    // Banner Delete API action બનાવ્યા પછી અહીં dispatch કરવો.
  };


  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage)
      dispatch(clearAnnounceMessages())

    }

    if (errMessage) {
      toast.success(errMessage)
      dispatch(clearAnnounceMessages())
    }

    if (AdminBanner.successMessage) {
      toast.success(AdminBanner.successMessage)
      dispatch(clearBannerMessages())
    }
    if (AdminBanner.errMessage) {
      toast.error(AdminBanner.errMessage)
      dispatch(clearBannerMessages())
    }

  }, [successMessage, errMessage, AdminBanner.successMessage, AdminBanner.errMessage, dispatch])

  return (
    <div className="space-y-6">

      {/* HEADER */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold text-[#211a18]">
            Content Management
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage announcements and hero banners
          </p>
        </div>

        {!showAnnouncementForm && !showBannerForm && (
          <button
            onClick={
              activeTab === "announcement"
                ? handleAddAnnouncement
                : handleAddBanner
            }
            className="flex items-center justify-center gap-2 rounded-xl bg-[#211a18] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#3b2d28] shadow-sm"
          >
            <FiPlus size={18} />
            Add{" "}
            {activeTab === "announcement"
              ? "Announcement"
              : "Banner"}
          </button>
        )}
      </div>

      {/* TABS */}
      {!showAnnouncementForm && !showBannerForm && (
        <>
          <div className="flex gap-3 border-b border-gray-200">
            <button
              onClick={() => handleTabChange("announcement")}
              className={`flex items-center gap-2 border-b-2 px-4 py-3 text-sm font-semibold transition ${activeTab === "announcement"
                ? "border-[#a77b51] text-[#a77b51]"
                : "border-transparent text-gray-500 hover:text-[#211a18]"
                }`}
            >
              <FiBell size={17} />
              Announcements
            </button>

            <button
              onClick={() => handleTabChange("banner")}
              className={`flex items-center gap-2 border-b-2 px-4 py-3 text-sm font-semibold transition ${activeTab === "banner"
                ? "border-[#a77b51] text-[#a77b51]"
                : "border-transparent text-gray-500 hover:text-[#211a18]"
                }`}
            >
              <FiImage size={17} />
              Hero Banners
            </button>
          </div>

          {/* SEARCH */}
          <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
            <div className="relative">
              <FiSearch
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                size={18}
              />

              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder={
                  activeTab === "announcement"
                    ? "Search announcements..."
                    : "Search banners..."
                }
                className="w-full rounded-lg border border-gray-200 py-3 pl-11 pr-4 text-sm outline-none focus:border-[#a77b51]"
              />
            </div>
          </div>
        </>
      )}

      {/* ANNOUNCEMENT FORM */}
      {showAnnouncementForm && (
        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-7">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-[#211a18]">
                {isAnnouncementEdit
                  ? "Edit Announcement"
                  : "Add Announcement"}
              </h2>

              {isAnnouncementEdit && (
                <p className="mt-1 text-xs text-gray-500">
                  ID: {announcementEditId}
                </p>
              )}
            </div>

            <button
              type="button"
              onClick={resetAnnouncementForm}
              className="rounded-lg p-2 text-gray-500 hover:bg-gray-100"
            >
              <FiX size={20} />
            </button>
          </div>

          <form onSubmit={handleAnnouncementSubmit} className="space-y-5">
            <div>
              <label className="mb-2 block text-sm font-semibold text-[#211a18]">
                Announcement Title *
              </label>

              <input
                type="text"
                name="title"
                value={announcementForm.title}
                onChange={handleAnnouncementInput}
                placeholder="Enter announcement title"
                required
                className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm outline-none focus:border-[#a77b51]"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-[#211a18]">
                Status
              </label>

              <select
                name="status"
                value={announcementForm.status}
                onChange={handleAnnouncementInput}
                className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm outline-none focus:border-[#a77b51]"
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>

            <div className="flex flex-col gap-3 pt-3 sm:flex-row">
              <button
                type="submit"
                className="flex items-center justify-center gap-2 rounded-xl bg-[#211a18] px-6 py-3 text-sm font-semibold text-white hover:bg-[#3b2d28] transition shadow-sm"
              >
                <FiSave size={17} />
                {isAnnouncementEdit ? "Update" : "Save"}
              </button>

              <button
                type="button"
                onClick={resetAnnouncementForm}
                className="flex items-center justify-center gap-2 rounded-xl border border-gray-200 px-6 py-3 text-sm font-semibold text-gray-600 hover:bg-[#f8f5f2] transition"
              >
                <FiX size={17} />
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* ANNOUNCEMENT TABLE */}
      {!showAnnouncementForm &&
        !showBannerForm &&
        activeTab === "announcement" && (
          <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
            <div className="border-b border-gray-100 px-5 py-4">
              <h2 className="font-bold text-[#211a18]">
                Announcement List
              </h2>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full min-w-[650px] text-left">
                <thead className="bg-[#f8f5f2]">
                  <tr className="text-xs uppercase tracking-wide text-gray-500 font-semibold">
                    <th className="px-5 py-4">Title</th>
                    <th className="px-5 py-4">Status</th>
                    <th className="px-5 py-4">ID</th>
                    <th className="px-5 py-4 text-right">Actions</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-100">
                  {filteredAnnouncements.length > 0 ? (
                    filteredAnnouncements.map((item) => (
                      <tr key={item._id} className="transition hover:bg-[#faf8f6]">
                        <td className="px-5 py-4">
                          <p className="font-semibold text-gray-800">
                            {item.title}
                          </p>
                        </td>

                        <td className="px-5 py-4">
                          <span
                            className={`rounded-full px-3 py-1 text-xs font-semibold ${item.status === "active"
                              ? "bg-green-50 text-green-700"
                              : "bg-gray-100 text-gray-600"
                              }`}
                          >
                            {item.status}
                          </span>
                        </td>

                        <td className="max-w-[180px] truncate px-5 py-4 text-xs text-gray-500">
                          {item._id}
                        </td>

                        <td className="px-5 py-4">
                          <div className="flex justify-end gap-2">
                            <button
                              onClick={() => handleEditAnnouncement(item)}
                              className="rounded-lg bg-[#f4ebe6] p-2 text-[#a66e58] hover:bg-[#ecdcd4] transition"
                              title="Edit"
                            >
                              <FiEdit2 size={16} />
                            </button>

                            <button
                              onClick={() => handleDeleteAnnouncement(item._id)}
                              className="rounded-lg bg-red-50 p-2 text-red-500 hover:bg-red-100 transition"
                              title="Delete"
                            >
                              <FiTrash2 size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={4} className="px-5 py-12 text-center text-sm text-gray-400">
                        No announcements found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

      {/* BANNER FORM */}
      {showBannerForm && (
        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-7">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-[#211a18]">
                {isBannerEdit ? "Edit Hero Banner" : "Add Hero Banner"}
              </h2>

              {isBannerEdit && (
                <p className="mt-1 text-xs text-gray-500">
                  ID: {bannerEditId}
                </p>
              )}
            </div>

            <button
              type="button"
              onClick={resetBannerForm}
              className="rounded-lg p-2 text-gray-500 hover:bg-gray-100"
            >
              <FiX size={20} />
            </button>
          </div>

          <form onSubmit={handleBannerSubmit} className="space-y-5">
            <div>
              <label className="mb-2 block text-sm font-semibold text-[#211a18]">
                Banner Title *
              </label>

              <input
                type="text"
                name="title"
                value={bannerForm.title}
                onChange={handleBannerInput}
                placeholder="Enter banner title"
                required
                className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm outline-none focus:border-[#a77b51]"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-[#211a18]">
                Description
              </label>

              <textarea
                name="description"
                value={bannerForm.description}
                onChange={handleBannerInput}
                rows={3}
                placeholder="Enter description"
                className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm outline-none focus:border-[#a77b51]"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-[#211a18]">
                Banner Image
              </label>

              <input
                type="file"
                accept="image/*"
                onChange={handleBannerImage}
                className="w-full rounded-lg border border-gray-200 p-3 text-sm"
              />

              {bannerPreview && (
                <div className="mt-3">
                  <img
                    src={bannerPreview}
                    alt="Banner preview"
                    className="h-48 w-full rounded-lg object-cover sm:w-96"
                  />
                </div>
              )}
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-[#211a18]">
                Image Title
              </label>

              <input
                type="text"
                name="imageTitle"
                value={bannerForm.imageTitle}
                onChange={handleBannerInput}
                placeholder="Enter image title"
                className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm outline-none focus:border-[#a77b51]"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-[#211a18]">
                Image Description
              </label>

              <textarea
                name="imageDescription"
                value={bannerForm.imageDescription}
                onChange={handleBannerInput}
                rows={3}
                placeholder="Enter image description"
                className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm outline-none focus:border-[#a77b51]"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-[#211a18]">
                Status
              </label>

              <select
                name="status"
                value={bannerForm.status}
                onChange={handleBannerInput}
                className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm outline-none focus:border-[#a77b51]"
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>

            <div className="flex flex-col gap-3 pt-3 sm:flex-row">
              <button
                type="submit"
                className="flex items-center justify-center gap-2 rounded-xl bg-[#211a18] px-6 py-3 text-sm font-semibold text-white hover:bg-[#3b2d28] transition shadow-sm"
              >
                <FiSave size={17} />
                {isBannerEdit ? "Update" : "Save"}
              </button>

              <button
                type="button"
                onClick={resetBannerForm}
                className="flex items-center justify-center gap-2 rounded-xl border border-gray-200 px-6 py-3 text-sm font-semibold text-gray-600 hover:bg-[#f8f5f2] transition"
              >
                <FiX size={17} />
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* BANNER TABLE */}
      {!showAnnouncementForm &&
        !showBannerForm &&
        activeTab === "banner" && (
          <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
            <div className="border-b border-gray-100 px-5 py-4">
              <h2 className="font-bold text-[#211a18]">
                Hero Banner List
              </h2>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full min-w-[1100px] text-left">
                <thead className="bg-[#f8f5f2]">
                  <tr className="text-xs uppercase tracking-wide text-gray-500 font-semibold">
                    <th className="px-5 py-4">Banner Title</th>
                    <th className="px-5 py-4">Description</th>
                    <th className="px-5 py-4">Image</th>
                    <th className="px-5 py-4">Image Title</th>
                    <th className="px-5 py-4">Image Description</th>
                    <th className="px-5 py-4">Status</th>
                    <th className="px-5 py-4">ID</th>
                    <th className="px-5 py-4 text-right">Actions</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-100">
                  {filteredBanners.length > 0 ? (
                    filteredBanners.map((item) => (
                      <tr key={item._id} className="align-top transition hover:bg-[#faf8f6]">
                        {/* BANNER TITLE */}
                        <td className="px-5 py-4">
                          <p className="max-w-[180px] font-semibold text-gray-800">
                            {item.title || "-"}
                          </p>
                        </td>

                        {/* DESCRIPTION */}
                        <td className="px-5 py-4">
                          <p className="max-w-[200px] whitespace-normal text-sm text-gray-600">
                            {item.description || "-"}
                          </p>
                        </td>

                        {/* IMAGE */}
                        <td className="px-5 py-4">
                          {item.bannerImage ? (
                            <img
                              src={item.bannerImage}
                              alt={item.imageTitle || item.title || "Banner"}
                              className="h-14 w-24 rounded-md object-cover"
                            />
                          ) : (
                            <span className="text-xs text-gray-400">
                              No image
                            </span>
                          )}
                        </td>

                        {/* IMAGE TITLE */}
                        <td className="px-5 py-4">
                          <p className="max-w-[180px] whitespace-normal text-sm font-medium text-[#30241f]">
                            {item.imageTitle || "-"}
                          </p>
                        </td>

                        {/* IMAGE DESCRIPTION */}
                        <td className="px-5 py-4">
                          <p className="max-w-[240px] whitespace-normal text-sm leading-5 text-gray-600">
                            {item.imageDescription || "-"}
                          </p>
                        </td>

                        {/* STATUS */}
                        <td className="px-5 py-4">
                          <span
                            className={`whitespace-nowrap rounded-full px-3 py-1 text-xs font-semibold ${item.status === "active"
                              ? "bg-green-50 text-green-700"
                              : "bg-gray-100 text-gray-600"
                              }`}
                          >
                            {item.status || "inactive"}
                          </span>
                        </td>

                        {/* ID */}
                        <td className="max-w-[150px] truncate px-5 py-4 text-xs text-gray-500">
                          {item._id}
                        </td>

                        {/* ACTIONS */}
                        <td className="px-5 py-4">
                          <div className="flex justify-end gap-2">
                            <button
                              onClick={() => handleEditBanner(item)}
                              className="rounded-lg bg-[#f4ebe6] p-2 text-[#a66e58] hover:bg-[#ecdcd4] transition"
                              title="Edit"
                            >
                              <FiEdit2 size={16} />
                            </button>

                            <button
                              onClick={() => handleDeleteBanner(item._id)}
                              className="rounded-lg bg-red-50 p-2 text-red-500 hover:bg-red-100"
                              title="Delete"
                            >
                              <FiTrash2 size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan={8}
                        className="px-5 py-12 text-center text-sm text-gray-400"
                      >
                        No banners found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
    </div>
  );
};

export default ContentManagement;
