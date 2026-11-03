
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AdminSignin } from "../../toolkit/slices/admin/adminAuth";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
    const { isLogin } = useSelector((state) => state.adminAuth)
    const [showPassword, setShowPassword] = useState(false);
    const [isForgotPassword, setIsForgotPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch()
    const naviget = useNavigate()

    useEffect(()=>{
    if(isLogin){
        naviget('/admin/dashboard')
    }
    },[isLogin])
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    // Admin Login
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);

            // TODO: Connect Admin Login API
            console.log("Admin Login:", formData);
            dispatch(AdminSignin(formData))
            // Successful login:
            // navigate("/admin/dashboard");

        } catch (error) {
            console.log(error);
        }
    };

    // Forgot Password
    const handleForgotPassword = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);

            // TODO: Connect Forgot Password API
            console.log("Forgot Password:", formData.email);

        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#faf8f6] flex items-center justify-center px-4 py-10">

            <div className="w-full max-w-6xl min-h-[610px] bg-white rounded-[26px] shadow-xl overflow-hidden grid grid-cols-1 md:grid-cols-2">

                {/* LEFT SIDE */}
                <div className="relative overflow-hidden bg-[#211a18] text-white p-10 md:p-14 flex flex-col justify-between min-h-[350px]">

                    {/* Decorative Circles */}
                    <div className="absolute w-72 h-72 border border-[#66504a]/40 rounded-full -top-20 -right-24" />

                    <div className="absolute w-80 h-80 border border-[#66504a]/40 rounded-full -bottom-40 -left-32" />

                    <div className="relative z-10">

                        <h1 className="text-3xl font-bold tracking-[3px]">
                            SHVANS<span className="text-[#c99883]">.</span>
                        </h1>

                        <p className="text-[10px] tracking-[5px] text-[#c99883] mt-2">
                            JEWELLERY
                        </p>

                        <div className="mt-14">

                            <p className="text-xs tracking-[4px] text-[#c99883] mb-6">
                                ADMINISTRATION PORTAL
                            </p>

                            <h2 className="text-4xl md:text-[48px] leading-[1.3] font-light">
                                Manage your
                                <br />
                                jewellery
                                <br />
                                <span className="text-[#d5a18d] font-semibold">
                                    business.
                                </span>
                            </h2>

                            <p className="text-gray-300 text-sm leading-7 mt-7 max-w-sm">
                                Welcome to SHVANS Admin Panel. Manage your products,
                                orders, customers and business operations from one place.
                            </p>

                        </div>
                    </div>

                    <div className="relative z-10 border-t border-white/10 pt-7 mt-10">

                        <div className="flex items-center gap-3">

                            <svg
                                className="w-6 h-6 text-[#d5a18d]"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeWidth="1.7"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M12 3l8 4v5c0 5-3.5 8-8 9-4.5-1-8-4-8-9V7l8-4z"
                                />
                            </svg>

                            <span className="text-sm text-gray-300">
                                Secure Admin Authentication
                            </span>

                        </div>
                    </div>
                </div>

                {/* RIGHT SIDE */}
                <div className="flex items-center justify-center p-7 sm:p-12 md:p-14">

                    <div className="w-full max-w-md">

                        <p className="text-xs tracking-[3px] text-[#b77b64] font-medium mb-4">
                            SHVANS ADMIN
                        </p>

                        {!isForgotPassword ? (

                            /* LOGIN FORM */
                            <>
                                <h2 className="text-3xl font-semibold text-[#211a18]">
                                    Admin Login
                                </h2>

                                <p className="text-gray-500 text-sm mt-3 mb-10">
                                    Enter your credentials to access the admin dashboard.
                                </p>

                                <form onSubmit={handleSubmit} className="space-y-6">

                                    {/* EMAIL */}
                                    <div>

                                        <label className="block text-sm font-medium text-gray-800 mb-2">
                                            Email Address
                                        </label>

                                        <div className="relative">

                                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                                                <svg
                                                    className="w-5 h-5"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path
                                                        strokeWidth="1.6"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        d="M3 6l9 7 9-7M5 5h14a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2z"
                                                    />
                                                </svg>
                                            </span>

                                            <input
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                placeholder="Enter your email address"
                                                required
                                                autoComplete="username"
                                                className="w-full h-[56px] pl-12 pr-4 border border-gray-300 rounded-xl outline-none text-sm focus:border-[#211a18] focus:ring-2 focus:ring-[#211a18]/10 transition"
                                            />

                                        </div>
                                    </div>

                                    {/* PASSWORD */}
                                    <div>

                                        <div className="flex justify-between items-center mb-2">

                                            <label className="text-sm font-medium text-gray-800">
                                                Password
                                            </label>

                                            <button
                                                type="button"
                                                onClick={() => setIsForgotPassword(true)}
                                                className="text-xs font-medium text-[#a66e58] hover:text-[#211a18] transition"
                                            >
                                                Forgot Password?
                                            </button>

                                        </div>

                                        <div className="relative">

                                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                                                <svg
                                                    className="w-5 h-5"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <rect
                                                        x="4"
                                                        y="10"
                                                        width="16"
                                                        height="11"
                                                        rx="2"
                                                        strokeWidth="1.6"
                                                    />
                                                    <path
                                                        d="M8 10V7a4 4 0 018 0v3"
                                                        strokeWidth="1.6"
                                                        strokeLinecap="round"
                                                    />
                                                </svg>
                                            </span>

                                            <input
                                                type={showPassword ? "text" : "password"}
                                                name="password"
                                                value={formData.password}
                                                onChange={handleChange}
                                                placeholder="Enter your password"
                                                required
                                                autoComplete="current-password"
                                                className="w-full h-[56px] pl-12 pr-12 border border-gray-300 rounded-xl outline-none text-sm focus:border-[#211a18] focus:ring-2 focus:ring-[#211a18]/10 transition"
                                            />

                                            <button
                                                type="button"
                                                onClick={() => setShowPassword(!showPassword)}
                                                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#211a18]"
                                            >
                                                {showPassword ? (

                                                    <svg
                                                        className="w-5 h-5"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        viewBox="0 0 24 24"
                                                    >
                                                        <path
                                                            strokeWidth="1.7"
                                                            strokeLinecap="round"
                                                            d="M3 3l18 18M10.6 10.6a2 2 0 002.8 2.8M9.9 5.2A10.7 10.7 0 0112 5c5 0 8.5 4.5 9 7-.2 1.1-1.1 2.5-2.6 3.7M6.2 6.2C4.2 7.5 3.3 9.5 3 12c.5 2.5 4 7 9 7 1.1 0 2.1-.2 3-.6"
                                                        />
                                                    </svg>

                                                ) : (

                                                    <svg
                                                        className="w-5 h-5"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        viewBox="0 0 24 24"
                                                    >
                                                        <path
                                                            strokeWidth="1.7"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            d="M2.5 12s3.5-7 9.5-7 9.5 7 9.5 7-3.5 7-9.5 7-9.5-7-9.5-7z"
                                                        />
                                                        <circle cx="12" cy="12" r="3" strokeWidth="1.7" />
                                                    </svg>

                                                )}
                                            </button>

                                        </div>
                                    </div>

                                    {/* REMEMBER ME */}
                                    <div className="flex items-center gap-2">

                                        <input
                                            type="checkbox"
                                            id="remember"
                                            className="w-4 h-4 accent-[#211a18] cursor-pointer"
                                        />

                                        <label
                                            htmlFor="remember"
                                            className="text-sm text-gray-500 cursor-pointer"
                                        >
                                            Remember me
                                        </label>

                                    </div>

                                    {/* LOGIN BUTTON */}
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="w-full h-[55px] bg-[#211a18] hover:bg-[#3b2d28] disabled:opacity-60 text-white rounded-xl font-semibold text-sm flex items-center justify-center gap-3 transition duration-300"
                                    >
                                        {loading ? "Please wait..." : "Sign In to Dashboard"}

                                        {!loading && (
                                            <svg
                                                className="w-5 h-5"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeWidth="2"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M5 12h14m-6-6l6 6-6 6"
                                                />
                                            </svg>
                                        )}
                                    </button>

                                </form>
                            </>

                        ) : (

                            /* FORGOT PASSWORD FORM */
                            <>
                                <h2 className="text-3xl font-semibold text-[#211a18]">
                                    Forgot Password?
                                </h2>

                                <p className="text-gray-500 text-sm mt-3 mb-10 leading-6">
                                    Don't worry! Enter your registered email address.
                                    We'll send you instructions to reset your password.
                                </p>

                                <form
                                    onSubmit={handleForgotPassword}
                                    className="space-y-6"
                                >

                                    <div>

                                        <label className="block text-sm font-medium text-gray-800 mb-2">
                                            Email Address
                                        </label>

                                        <div className="relative">

                                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">

                                                <svg
                                                    className="w-5 h-5"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path
                                                        strokeWidth="1.6"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        d="M3 6l9 7 9-7M5 5h14a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2z"
                                                    />
                                                </svg>

                                            </span>

                                            <input
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                placeholder="Enter your registered email"
                                                required
                                                className="w-full h-[56px] pl-12 pr-4 border border-gray-300 rounded-xl outline-none text-sm focus:border-[#211a18] focus:ring-2 focus:ring-[#211a18]/10 transition"
                                            />

                                        </div>
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="w-full h-[55px] bg-[#211a18] hover:bg-[#3b2d28] disabled:opacity-60 text-white rounded-xl font-semibold text-sm flex items-center justify-center gap-3 transition duration-300"
                                    >
                                        {loading ? "Sending..." : "Send Reset Link"}

                                        {!loading && (
                                            <svg
                                                className="w-5 h-5"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeWidth="2"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M5 12h14m-6-6l6 6-6 6"
                                                />
                                            </svg>
                                        )}
                                    </button>

                                    <button
                                        type="button"
                                        onClick={() => setIsForgotPassword(false)}
                                        className="w-full flex items-center justify-center gap-2 text-sm font-medium text-[#a66e58] hover:text-[#211a18] transition"
                                    >
                                        <span>←</span> Back to Login
                                    </button>

                                </form>
                            </>
                        )}

                        {/* BOTTOM */}
                        <div className="flex items-center gap-4 my-8">

                            <div className="flex-1 h-px bg-gray-200" />

                            <span className="text-xs text-gray-400 tracking-wider">
                                SECURE ACCESS
                            </span>

                            <div className="flex-1 h-px bg-gray-200" />

                        </div>

                        <p className="text-center text-xs text-gray-400 leading-6">
                            This area is restricted to authorized administrators only.
                            <br />
                            All rights reserved © SHVANS.
                        </p>

                    </div>
                </div>

            </div>
        </div>
    );
};

export default AdminLogin;
