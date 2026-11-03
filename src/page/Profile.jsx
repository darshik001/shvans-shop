import { useEffect, useState } from "react";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaCalendarAlt,
  FaEdit,
  FaSave,
  FaTimes,
  FaSignOutAlt,
} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  clearSuccessMessage,
  userLogout,
} from "../toolkit/slices/user/userAuth";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const {
    user,
    errMessage,
    successMessage,
    isLogin,
    AccessToken,
  } = useSelector((state) => state.userAuth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isEditing, setIsEditing] = useState(false);

  const [profileData, setProfileData] = useState({
    name: "",
    phone: "",
  });

  useEffect(() => {
    if (user) {
      setProfileData({
        name: user.name || "",
        phone: user.phone || "",
      });
    }

    if (errMessage) {
      toast.error(errMessage);
      dispatch(clearSuccessMessage());
    }

    if (successMessage) {
      toast.success(successMessage);
      dispatch(clearSuccessMessage());
    }

    if (!isLogin) {
      navigate("/auth");
    }
  }, [
    user,
    errMessage,
    successMessage,
    isLogin,
    dispatch,
    navigate,
  ]);

  const handleChange = (e) => {
    setProfileData({
      ...profileData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = () => {
    // અહીં પછી તમારી profile update API dispatch કરી શકો છો
    setIsEditing(false);
  };

  const handleCancel = () => {
    setProfileData({
      name: user.name || "",
      phone: user.phone || "",
    });

    setIsEditing(false);
  };

  const handleLogout = () => {
    if (AccessToken) {
      dispatch(userLogout(AccessToken));
    } else {
      console.log("Token not set");
    }
  };

  const formattedDate = user?.createdAt
    ? new Date(user.createdAt).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    })
    : "Not available";

  const details = [
    {
      label: "Email Address",
      value: user?.email || "Not provided",
      icon: <FaEnvelope />,
    },
    {
      label: "Phone Number",
      value: user?.phone || "Not provided",
      icon: <FaPhone />,
      editable: true,
      name: "phone",
    },
    {
      label: "Member Since",
      value: formattedDate,
      icon: <FaCalendarAlt />,
    },
    {
      label: "Full Name",
      value: user?.name || "Not provided",
      icon: <FaUser />,
      editable: true,
      name: "name",
    },
  ];

  if (!user) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center bg-[#fffdf9] px-4">
        <div className="w-full max-w-md border border-[#e9ddd0] bg-white p-10 text-center shadow-lg">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#f6eee5] text-2xl text-[#a77b51]">
            <FaUser />
          </div>

          <h2 className="mt-5 font-serif text-2xl text-[#30241f]">
            Profile not available
          </h2>

          <p className="mt-3 text-sm leading-6 text-[#817368]">
            Please login to view and manage your profile.
          </p>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#fffdf9] px-4 py-10 text-[#30241f] sm:px-6 sm:py-14">
      <div className="mx-auto max-w-4xl">

        {/* Page Heading */}
        <div className="mb-8 text-center">
          <p className="mb-3 text-xs font-medium uppercase tracking-[4px] text-[#a77b51]">
            Your Account
          </p>

          <h1 className="font-serif text-4xl sm:text-5xl">
            Welcome,
            <span className="ml-2 italic text-[#a77b51]">
              {user.name?.split(" ")[0] || "Guest"}.
            </span>
          </h1>

          <p className="mx-auto mt-4 max-w-md text-sm leading-6 text-[#817368]">
            Manage your personal information and keep your Shvans experience
            beautifully yours.
          </p>
        </div>

        {/* Main Profile Card */}
        <div className="overflow-hidden border border-[#e9ddd0] bg-white shadow-xl shadow-[#30241f]/5">

          {/* Luxury Banner */}
          <div className="relative h-40 overflow-hidden bg-[#30241f] sm:h-48">

            {/* Decorative Elements */}
            <div className="absolute -right-12 -top-16 h-56 w-56 rounded-full border border-[#a77b51]/50" />
            <div className="absolute right-8 top-8 h-32 w-32 rounded-full border border-[#d8b58e]/20" />
            <div className="absolute -bottom-20 -left-10 h-52 w-52 rounded-full border border-[#a77b51]/40" />

            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <p className="text-xs uppercase tracking-[4px] text-[#d8b58e]">
                Shvans Member
              </p>

              <p className="mt-3 font-serif text-2xl italic text-white sm:text-3xl">
                Your story. Your essence.
              </p>
            </div>

            {/* Profile Image */}
            <div className="absolute -bottom-14 left-1/2 z-10 flex h-28 w-28 -translate-x-1/2 items-center justify-center overflow-hidden rounded-full border-4 border-white bg-[#f6eee5] text-4xl text-[#a77b51] shadow-xl sm:h-32 sm:w-32">
              {user.profile ? (
                <img
                  src={user.profile}
                  alt={user.name || "Profile"}
                  className="h-full w-full object-cover"
                />
              ) : (
                <FaUser />
              )}
            </div>
          </div>

          {/* Profile Content */}
          <div className="px-5 pb-8 pt-20 sm:px-10 sm:pt-24 sm:pb-10">

            {/* User Name */}
            <div className="border-b border-[#eee5db] pb-7 text-center">
              <h2 className="font-serif text-2xl capitalize sm:text-3xl">
                {user.name || "User"}
              </h2>

              <p className="mt-2 text-sm text-[#817368]">
                Member of the Shvans fragrance family
              </p>
            </div>

            {/* Section Heading */}
            <div className="mb-6 mt-8 flex items-end justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[3px] text-[#a77b51]">
                  Personal Details
                </p>

                <h3 className="mt-2 font-serif text-2xl">
                  Your Information
                </h3>
              </div>

              {!isEditing && (
                <button
                  type="button"
                  onClick={() => setIsEditing(true)}
                  className="inline-flex items-center gap-2 border border-[#c9b8a6] px-4 py-2.5 text-sm font-medium text-[#30241f] transition hover:bg-[#30241f] hover:text-white"
                >
                  <FaEdit />
                  Edit Profile
                </button>
              )}
            </div>

            {/* Details Grid */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {details.map((item) => (
                <div
                  key={item.label}
                  className="group flex min-w-0 items-start gap-4 border border-[#eee5db] bg-[#fffdf9] p-5 transition hover:border-[#c9b8a6] hover:bg-[#fdf9f4]"
                >
                  {/* Icon */}
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#f6eee5] text-base text-[#a77b51] transition group-hover:bg-[#30241f] group-hover:text-white">
                    {item.icon}
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="text-[10px] font-medium uppercase tracking-[2px] text-[#9b8d80]">
                      {item.label}
                    </p>

                    {isEditing && item.editable ? (
                      <input
                        type={item.name === "phone" ? "tel" : "text"}
                        name={item.name}
                        value={profileData[item.name]}
                        onChange={handleChange}
                        className="mt-3 w-full border border-[#d8cabc] bg-white px-3 py-2.5 text-sm text-[#30241f] outline-none transition focus:border-[#a77b51] focus:ring-1 focus:ring-[#a77b51]"
                      />
                    ) : (
                      <p className="mt-3 break-words text-sm font-medium text-[#30241f]">
                        {item.value}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Account ID */}
            <div className="mt-4 border border-[#eee5db] bg-[#f7f1e9] px-5 py-4">
              <p className="text-[10px] font-medium uppercase tracking-[2px] text-[#9b8d80]">
                Account ID
              </p>

              <p className="mt-2 break-all font-mono text-xs text-[#75685e]">
                {user._id || "Not available"}
              </p>
            </div>

            {/* Edit Actions */}
            {isEditing && (
              <div className="mt-6 flex flex-col gap-3 border-t border-[#eee5db] pt-6 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="inline-flex items-center justify-center gap-2 border border-[#c9b8a6] px-5 py-3 text-sm font-medium text-[#75685e] transition hover:bg-[#f6eee5]"
                >
                  <FaTimes />
                  Cancel
                </button>

                <button
                  type="button"
                  onClick={handleSave}
                  className="inline-flex items-center justify-center gap-2 bg-[#30241f] px-6 py-3 text-sm font-medium text-white transition hover:bg-[#8d6846]"
                >
                  <FaSave />
                  Save Changes
                </button>
              </div>
            )}

            {/* Logout */}
            <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t border-[#eee5db] pt-6 sm:flex-row">
              <div>
                <p className="font-serif text-lg">
                  Want to leave for now?
                </p>
                <p className="mt-1 text-xs text-[#9b8d80]">
                  You can always come back and discover more fragrances.
                </p>
              </div>

              <button
                type="button"
                onClick={handleLogout}
                className="inline-flex items-center justify-center gap-2 border border-red-200 bg-red-50 px-5 py-3 text-sm font-medium text-red-700 transition hover:bg-red-600 hover:text-white"
              >
                <FaSignOutAlt />
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Profile;