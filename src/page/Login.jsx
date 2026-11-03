
import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
    FiArrowLeft,
    FiArrowRight,
    FiSmartphone,
    FiShield,
    FiX,
} from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
    clearSuccessMessage,
    GoogleLogin,
    sentLoginOtp,
    userverifyOtpAndLogin,
} from "../toolkit/slices/user/userAuth";


const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Supports both state.userAuth and a flattened Redux state
    const reduxState = useSelector((state) => state);
    const {
        isLogin,
        isLoding,
        successMessage,
        errMessage,
        userId,
        user,
        AccessToken,
    } = reduxState.userAuth || reduxState;

    const [step, setStep] = useState("mobile");
    const [mobile, setMobile] = useState("");
    const [otp, setOtp] = useState(["", "", "", "", "", ""]);
    const [resendCount, setResendCount] = useState(0);
    const [formError, setFormError] = useState("");

    const otpRefs = useRef([]);
    if (isLogin) {
        navigate('/')
    }
    // Redux error message
    useEffect(() => {
        if (errMessage) {
            toast.error(errMessage);
            dispatch(clearSuccessMessage())

        }
    }, [errMessage]);

    // Redux success message
    useEffect(() => {
        if (successMessage) {
            toast.success(successMessage);
            dispatch(clearSuccessMessage())
        }

    }, [successMessage]);

    // Local validation error
    useEffect(() => {
        if (formError) {
            toast.error(formError);
            dispatch(clearSuccessMessage())

        }
    }, [formError]);

    // Show OTP form after receiving userId
    useEffect(() => {
        if (userId && !isLogin) {
            setStep("otp");
            setOtp(["", "", "", "", "", ""]);
        }
    }, [userId, isLogin]);

    // Navigate after successful login
    useEffect(() => {
        if (isLogin) {
            navigate("/");
        }
    }, [isLogin, navigate]);

    const handleMobileSubmit = async (e) => {
        e.preventDefault();
        setFormError("");

        if (!/^[6-9]\d{9}$/.test(mobile)) {
            setFormError("Please enter a valid 10-digit mobile number.");
            return;
        }

        try {
            await dispatch(
                sentLoginOtp({ phone: mobile })
            ).unwrap();
        } catch (error) {
            console.error("Send OTP error:", error);
        }
    };

    const handleOtpChange = (index, value) => {
        if (!/^\d*$/.test(value)) return;

        const digit = value.slice(-1);
        const updatedOtp = [...otp];

        updatedOtp[index] = digit;
        setOtp(updatedOtp);
        setFormError("");

        if (digit && index < 5) {
            otpRefs.current[index + 1]?.focus();
        }
    };

    const handleOtpKeyDown = (index, e) => {
        if (
            e.key === "Backspace" &&
            !otp[index] &&
            index > 0
        ) {
            otpRefs.current[index - 1]?.focus();
        }
    };

    const handleOtpPaste = (e) => {
        e.preventDefault();

        const pasted = e.clipboardData
            .getData("text")
            .replace(/\D/g, "")
            .slice(0, 6);

        if (!pasted) return;

        const updatedOtp = Array(6).fill("");

        pasted.split("").forEach((digit, index) => {
            updatedOtp[index] = digit;
        });

        setOtp(updatedOtp);
        setFormError("");

        otpRefs.current[Math.min(pasted.length, 5)]?.focus();
    };

    const handleVerifyOtp = async (e) => {
        e.preventDefault();
        setFormError("");

        const enteredOtp = otp.join("");

        if (enteredOtp.length !== 6) {
            setFormError("Please enter the complete 6-digit OTP.");
            return;
        }

        if (!userId) {
            setFormError("User ID not found. Please request OTP again.");
            return;
        }

        try {
            await dispatch(
                userverifyOtpAndLogin({
                    userId,
                    otp: enteredOtp,
                })
            ).unwrap();
        } catch (error) {
            console.error("Verify OTP error:", error);
        }
    };

    const handleResendOtp = async () => {
        setFormError("");

        if (resendCount >= 3) {
            setFormError("Resend limit reached. Please try again later.");
            return;
        }

        try {
            // Use this only if sentLoginOtp supports sending OTP again.
            await dispatch(
                sentLoginOtp({ phone: mobile })
            ).unwrap();

            setResendCount((count) => count + 1);
            setOtp(["", "", "", "", "", ""]);
            otpRefs.current[0]?.focus();
        } catch (error) {
            console.error("Resend OTP error:", error);
        }
    };

    const handleGoogleLogin = () => {
        dispatch(GoogleLogin())
    };

    return (
        <>


            <div className="flex min-h-screen items-center justify-center bg-[#faf8f5] px-4 py-8 sm:px-6">
                <div className="grid w-full max-w-5xl overflow-hidden rounded-3xl bg-white shadow-xl md:grid-cols-2">

                    {/* Left Brand Panel */}
                    <div className="relative hidden flex-col justify-between overflow-hidden bg-[#211a18] p-10 text-white md:flex lg:p-14">
                        <div className="absolute -right-24 -top-20 h-72 w-72 rounded-full border border-[#d6a18f]/20" />
                        <div className="absolute -bottom-24 -left-16 h-80 w-80 rounded-full border border-[#d6a18f]/20" />

                        <Link
                            to="/"
                            className="relative text-3xl font-bold tracking-widest"
                        >
                            SHVNAS<span className="text-[#d6a18f]">.</span>
                        </Link>

                        <div className="relative my-12">
                            <span className="text-xs uppercase tracking-[0.3em] text-[#d6a18f]">
                                Timeless Elegance
                            </span>

                            <h1 className="mt-5 text-4xl font-light leading-tight lg:text-5xl">
                                Jewellery that
                                <br />
                                tells your
                                <br />
                                <span className="font-semibold text-[#d6a18f]">
                                    story.
                                </span>
                            </h1>

                            <p className="mt-6 max-w-sm text-sm leading-7 text-gray-300">
                                Discover elegant silver jewellery designed
                                to celebrate your individuality and every
                                special moment.
                            </p>
                        </div>

                        <div className="relative flex items-center gap-3 border-t border-white/10 pt-6">
                            <FiShield className="text-[#d6a18f]" size={21} />
                            <p className="text-xs tracking-wide text-gray-300">
                                Secure login for your shopping experience
                            </p>
                        </div>
                    </div>

                    {/* Right Login Panel */}
                    <div className="flex items-center justify-center p-6 sm:p-10 lg:p-14">
                        <div className="w-full max-w-md">

                            {/* Mobile Header */}
                            <div className="mb-10 flex items-center justify-between md:hidden">
                                <Link
                                    to="/"
                                    className="text-2xl font-bold tracking-widest text-[#211a18]"
                                >
                                    SHVANS<span className="text-[#c58e7b]">.</span>
                                </Link>

                                <Link
                                    to="/"
                                    aria-label="Close login"
                                    className="rounded-full border border-gray-200 p-2 text-gray-500 hover:bg-gray-50"
                                >
                                    <FiX size={20} />
                                </Link>
                            </div>

                            {step === "mobile" ? (
                                <>
                                    <div className="mb-8">
                                        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#b27c69]">
                                            Welcome to Shvans
                                        </span>

                                        <h2 className="mt-3 text-3xl font-semibold tracking-tight text-gray-900">
                                            Login or Sign up
                                        </h2>

                                        <p className="mt-3 text-sm leading-6 text-gray-500">
                                            Enter your mobile number to continue
                                            shopping with us.
                                        </p>
                                    </div>

                                    <form onSubmit={handleMobileSubmit}>
                                        <label
                                            htmlFor="mobile"
                                            className="mb-2 block text-sm font-medium text-gray-700"
                                        >
                                            Mobile Number
                                        </label>

                                        <div className="flex items-center rounded-xl border border-gray-300 transition focus-within:border-[#b27c69] focus-within:ring-4 focus-within:ring-[#b27c69]/10">
                                            <span className="border-r border-gray-200 px-4 py-4 text-sm font-semibold text-gray-700">
                                                +91
                                            </span>

                                            <input
                                                id="mobile"
                                                type="tel"
                                                inputMode="numeric"
                                                autoComplete="tel-national"
                                                maxLength={10}
                                                value={mobile}
                                                onChange={(e) => {
                                                    setMobile(
                                                        e.target.value
                                                            .replace(/\D/g, "")
                                                            .slice(0, 10)
                                                    );
                                                    setFormError("");
                                                }}
                                                placeholder="Enter 10-digit number"
                                                className="w-full min-w-0 rounded-r-xl px-4 py-4 text-sm outline-none"
                                            />
                                        </div>

                                        <button
                                            type="submit"
                                            disabled={isLoding}
                                            className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-[#211a18] px-5 py-4 text-sm font-semibold text-white transition hover:bg-[#3a2d29] disabled:cursor-not-allowed disabled:opacity-60"
                                        >
                                            {isLoding
                                                ? "Sending OTP..."
                                                : "Continue with Mobile"}

                                            {!isLoding && (
                                                <FiArrowRight size={18} />
                                            )}
                                        </button>
                                    </form>

                                    <div className="my-7 flex items-center gap-4">
                                        <div className="h-px flex-1 bg-gray-200" />
                                        <span className="text-xs uppercase tracking-wider text-gray-400">
                                            Or continue with
                                        </span>
                                        <div className="h-px flex-1 bg-gray-200" />
                                    </div>

                                    <button
                                        type="button"
                                        onClick={handleGoogleLogin}
                                        className="flex w-full items-center justify-center gap-3 rounded-xl border border-gray-300 px-5 py-4 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
                                    >
                                        <FcGoogle size={21} />
                                        Continue with Google
                                    </button>

                                    <p className="mt-8 text-center text-xs leading-6 text-gray-500">
                                        By continuing, you agree to our{" "}
                                        <Link
                                            to="/terms-and-conditions"
                                            className="font-medium text-[#9a6755] underline"
                                        >
                                            Terms &amp; Conditions
                                        </Link>{" "}
                                        and{" "}
                                        <Link
                                            to="/privacy-policy"
                                            className="font-medium text-[#9a6755] underline"
                                        >
                                            Privacy Policy
                                        </Link>.
                                    </p>
                                </>
                            ) : (
                                <>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setStep("mobile");
                                            setFormError("");
                                            setOtp(["", "", "", "", "", ""]);
                                        }}
                                        className="mb-8 flex items-center gap-2 text-sm font-medium text-gray-500 transition hover:text-gray-900"
                                    >
                                        <FiArrowLeft size={18} />
                                        Change mobile number
                                    </button>

                                    <div className="mb-8">
                                        <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#f7eee9] text-[#9a6755]">
                                            <FiSmartphone size={26} />
                                        </div>

                                        <h2 className="text-3xl font-semibold tracking-tight text-gray-900">
                                            Verify OTP
                                        </h2>

                                        <p className="mt-3 text-sm leading-6 text-gray-500">
                                            Enter the 6-digit verification code
                                            sent to{" "}
                                            <span className="font-semibold text-gray-800">
                                                +91 {mobile}
                                            </span>.
                                        </p>
                                    </div>

                                    <form onSubmit={handleVerifyOtp}>
                                        <div className="flex justify-between gap-2 sm:gap-3">
                                            {otp.map((digit, index) => (
                                                <input
                                                    key={index}
                                                    ref={(element) => {
                                                        otpRefs.current[index] = element;
                                                    }}
                                                    type="text"
                                                    inputMode="numeric"
                                                    autoComplete={
                                                        index === 0
                                                            ? "one-time-code"
                                                            : "off"
                                                    }
                                                    maxLength={1}
                                                    value={digit}
                                                    aria-label={`OTP digit ${index + 1}`}
                                                    onChange={(e) =>
                                                        handleOtpChange(
                                                            index,
                                                            e.target.value
                                                        )
                                                    }
                                                    onKeyDown={(e) =>
                                                        handleOtpKeyDown(index, e)
                                                    }
                                                    onPaste={
                                                        index === 0
                                                            ? handleOtpPaste
                                                            : undefined
                                                    }
                                                    className="h-12 w-full min-w-0 rounded-xl border border-gray-300 text-center text-xl font-semibold text-gray-900 outline-none transition focus:border-[#b27c69] focus:ring-4 focus:ring-[#b27c69]/10 sm:h-14"
                                                />
                                            ))}
                                        </div>

                                        <button
                                            type="submit"
                                            disabled={isLoding}
                                            className="mt-7 flex w-full items-center justify-center gap-2 rounded-xl bg-[#211a18] px-5 py-4 text-sm font-semibold text-white transition hover:bg-[#3a2d29] disabled:cursor-not-allowed disabled:opacity-60"
                                        >
                                            {isLoding
                                                ? "Verifying..."
                                                : "Verify & Continue"}

                                            {!isLoding && (
                                                <FiArrowRight size={18} />
                                            )}
                                        </button>
                                    </form>

                                    <div className="mt-6 text-center">
                                        <p className="text-sm text-gray-500">
                                            Didn't receive the code?
                                        </p>

                                        <button
                                            type="button"
                                            onClick={handleResendOtp}
                                            disabled={isLoding || resendCount >= 3}
                                            className="mt-2 text-sm font-semibold text-[#9a6755] hover:underline disabled:text-gray-400"
                                        >
                                            Resend OTP
                                        </button>
                                    </div>

                                    <p className="mt-8 text-center text-xs leading-6 text-gray-400">
                                        Never share your OTP with anyone.
                                    </p>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;
