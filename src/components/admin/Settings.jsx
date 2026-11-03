
import { useState } from "react";
import {
  FiEdit2,
  FiSave,
  FiX,
  FiMapPin,
  FiPhone,
  FiMail,
  FiUpload,
  FiShoppingBag,
  FiSettings,
  FiCheckCircle,
} from "react-icons/fi";

const Settings = () => {
  const initialData = {
    storeName: "SHVANS",
    address: "Shop No. 12, Surat, Gujarat, India",
    mobile: "+91 98765 43210",
    email: "support@shvans.com",
    logo: "",
  };

  const [settings, setSettings] = useState(initialData);
  const [formData, setFormData] = useState(initialData);
  const [isEdit, setIsEdit] = useState(false);

  const handleEdit = () => {
    setFormData(settings);
    setIsEdit(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLogoChange = (e) => {
    const file = e.target.files?.[0];

    if (file) {
      setFormData((prev) => ({
        ...prev,
        logo: URL.createObjectURL(file),
      }));
    }
  };

  const handleSave = () => {
    setSettings(formData);
    setIsEdit(false);
  };

  const handleCancel = () => {
    setFormData(settings);
    setIsEdit(false);
  };

  const detailFields = [
    {
      label: "Store Name",
      name: "storeName",
      icon: FiShoppingBag,
      placeholder: "Enter store name",
    },
    {
      label: "Mobile Number",
      name: "mobile",
      icon: FiPhone,
      placeholder: "Enter mobile number",
    },
    {
      label: "Email Address",
      name: "email",
      icon: FiMail,
      placeholder: "Enter email address",
    },
    {
      label: "Store Address",
      name: "address",
      icon: FiMapPin,
      placeholder: "Enter store address",
      full: true,
    },
  ];

  return (
    <div className="w-full min-h-screen p-4 sm:p-6 flex justify-center">

      <div className="w-full max-w-4xl">

        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-7">

          <div className="flex items-center gap-3">

            <div className="w-12 h-12 rounded-xl bg-[#a77b51]/10 flex items-center justify-center">
              <FiSettings size={23} className="text-[#a77b51]" />
            </div>

            <div>
              <h1 className="text-2xl font-bold text-gray-800">
                Store Settings
              </h1>

              <p className="text-sm text-gray-500 mt-1">
                Manage your store information
              </p>
            </div>

          </div>

          {!isEdit && (
            <button
              onClick={handleEdit}
              className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#a77b51] hover:bg-[#906843] text-white font-medium transition shadow-sm"
            >
              <FiEdit2 size={17} />
              Edit Settings
            </button>
          )}

        </div>

        {/* Main Card */}
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">

          {/* Card Header */}
          <div className="px-5 sm:px-7 py-5 border-b border-gray-100 flex items-center justify-between">

            <div>
              <h2 className="text-lg font-bold text-gray-800">
                General Information
              </h2>

              <p className="text-sm text-gray-500 mt-1">
                Your business details and contact information
              </p>
            </div>

            <div className="hidden sm:flex items-center gap-2 text-xs font-medium text-[#a77b51] bg-[#a77b51]/10 px-3 py-2 rounded-full">
              <FiCheckCircle size={14} />
              Store Profile
            </div>

          </div>

          <div className="p-5 sm:p-7">

            {/* Logo Section */}
            <div className="mb-8">

              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Store Logo
              </label>

              <div className="rounded-xl border border-gray-200 bg-[#faf8f6] p-5 flex flex-wrap items-center gap-5">

                <div className="w-24 h-24 rounded-xl bg-white border border-gray-200 flex items-center justify-center overflow-hidden shadow-sm">

                  {formData.logo ? (
                    <img
                      src={formData.logo}
                      alt="Store Logo"
                      className="w-full h-full object-contain"
                    />
                  ) : (
                    <div className="text-center">
                      <FiShoppingBag
                        size={34}
                        className="text-[#a77b51] mx-auto"
                      />
                      <span className="text-xs font-bold text-[#a77b51] mt-1 block">
                        SHVANS
                      </span>
                    </div>
                  )}

                </div>

                <div className="flex-1 min-w-[180px]">

                  <h3 className="font-semibold text-gray-800">
                    {formData.storeName || "Your Store"}
                  </h3>

                  <p className="text-sm text-gray-500 mt-1">
                    Your brand identity and store logo
                  </p>

                  {isEdit && (
                    <label className="inline-flex items-center gap-2 mt-3 px-4 py-2 rounded-lg bg-white border border-gray-200 text-sm font-medium text-[#a77b51] hover:bg-[#a77b51]/5 cursor-pointer transition">
                      <FiUpload size={16} />
                      Upload Logo

                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleLogoChange}
                        className="hidden"
                      />
                    </label>
                  )}

                </div>

              </div>

            </div>

            {/* Section Title */}
            <div className="flex items-center gap-2 mb-5">
              <div className="w-1 h-5 bg-[#a77b51] rounded-full"></div>

              <h3 className="font-bold text-gray-800">
                Store Details
              </h3>
            </div>

            {/* Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

              {detailFields.map((field) => {
                const Icon = field.icon;

                return (
                  <div
                    key={field.name}
                    className={field.full ? "md:col-span-2" : ""}
                  >

                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      {field.label}
                    </label>

                    {isEdit ? (

                      <div className="relative">

                        <Icon
                          size={18}
                          className={`absolute left-4 text-[#a77b51] ${
                            field.name === "address"
                              ? "top-4"
                              : "top-1/2 -translate-y-1/2"
                          }`}
                        />

                        {field.name === "address" ? (
                          <textarea
                            name={field.name}
                            value={formData[field.name]}
                            onChange={handleChange}
                            rows={3}
                            placeholder={field.placeholder}
                            className="w-full border border-gray-200 rounded-xl pl-11 pr-4 py-3 outline-none focus:border-[#a77b51] focus:ring-2 focus:ring-[#a77b51]/10 resize-none transition"
                          />
                        ) : (
                          <input
                            type="text"
                            name={field.name}
                            value={formData[field.name]}
                            onChange={handleChange}
                            placeholder={field.placeholder}
                            className="w-full border border-gray-200 rounded-xl pl-11 pr-4 py-3 outline-none focus:border-[#a77b51] focus:ring-2 focus:ring-[#a77b51]/10 transition"
                          />
                        )}

                      </div>

                    ) : (

                      <div className="flex items-start gap-3 p-4 rounded-xl border border-gray-100 bg-[#faf8f6] min-h-[66px]">

                        <div className="w-9 h-9 shrink-0 rounded-lg bg-[#a77b51]/10 flex items-center justify-center">
                          <Icon size={18} className="text-[#a77b51]" />
                        </div>

                        <div className="flex-1 min-w-0">
                          <p className="text-xs text-gray-400 mb-1">
                            {field.label}
                          </p>

                          <p className="text-sm font-semibold text-gray-800 break-words">
                            {settings[field.name] || "Not added"}
                          </p>
                        </div>

                      </div>

                    )}

                  </div>
                );
              })}

            </div>

            {/* Action Buttons */}
            {isEdit && (
              <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 mt-8 pt-6 border-t border-gray-100">

                <button
                  type="button"
                  onClick={handleCancel}
                  className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl border border-gray-200 text-gray-700 font-medium hover:bg-gray-50 transition"
                >
                  <FiX size={18} />
                  Cancel
                </button>

                <button
                  type="button"
                  onClick={handleSave}
                  className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#a77b51] hover:bg-[#906843] text-white font-medium transition shadow-sm"
                >
                  <FiSave size={18} />
                  Save Changes
                </button>

              </div>
            )}

          </div>

        </div>

        {/* Bottom Information */}
        <div className="mt-5 p-4 rounded-xl border border-[#a77b51]/15 bg-[#a77b51]/5 flex items-start gap-3">

          <div className="w-9 h-9 shrink-0 rounded-lg bg-[#a77b51]/10 flex items-center justify-center">
            <FiCheckCircle size={18} className="text-[#a77b51]" />
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-800">
              Keep Your Store Updated
            </h3>

            <p className="text-xs text-gray-500 mt-1 leading-5">
              Make sure your store name, contact details and address are correct so customers can easily reach your business.
            </p>
          </div>

        </div>

      </div>
    </div>
  );
};

export default Settings;
