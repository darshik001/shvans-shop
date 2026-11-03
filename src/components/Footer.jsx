
import { Link } from "react-router-dom";
import { FiShield, FiTruck, FiRefreshCw, FiInstagram, FiHeart, FiArrowRight, FiStar } from "react-icons/fi";
import { FaFacebookF } from "react-icons/fa";

const Footer = () => {
    const collections = [
        { name: "Rings", path: "/shop?category=rings" },
        { name: "Necklaces", path: "/shop?category=necklaces" },
        { name: "Earrings", path: "/shop?category=earrings" },
        { name: "Bracelets", path: "/shop?category=bracelets" },
        { name: "Pendants", path: "/shop?category=pendants" },
    ];

    const customerLinks = [
        { name: "About Us", path: "/about" },
        { name: "Contact Us", path: "/contact" },
        { name: "Ring Size Guide", path: "/size-guide" },
        { name: "Return & Exchange", path: "/return-policy" },
        { name: "Shipping Policy", path: "/shipping" },
    ];

    const legalLinks = [
        { name: "Privacy Policy", path: "/privacy-policy" },
        { name: "Terms & Conditions", path: "/terms-and-conditions" },
        { name: "Return Policy", path: "/return-policy" },
    ];

    return (
        <footer className="bg-[#171513] text-[#e9e1d8]">
            {/* Trust Section */}
            <div className="border-b border-white/10">
                <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-5 py-8 sm:grid-cols-2 sm:px-8 lg:grid-cols-4 lg:gap-8">
                    <div className="flex items-center gap-4">
                        <FiShield className="shrink-0 text-[#d6a18f]" size={27} />
                        <div>
                            <h3 className="text-sm font-semibold text-white">
                                925 Sterling Silver
                            </h3>
                            <p className="mt-1 text-xs leading-5 text-[#aaa19a]">
                                Crafted with care and precision
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <FiStar className="shrink-0 text-[#d6a18f]" size={27} />
                        <div>
                            <h3 className="text-sm font-semibold text-white">
                                Elegant Designs
                            </h3>
                            <p className="mt-1 text-xs leading-5 text-[#aaa19a]">
                                Everyday elegance, timeless style
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <FiTruck className="shrink-0 text-[#d6a18f]" size={27} />
                        <div>
                            <h3 className="text-sm font-semibold text-white">
                                Secure Delivery
                            </h3>
                            <p className="mt-1 text-xs leading-5 text-[#aaa19a]">
                                Shipping across India
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <FiRefreshCw className="shrink-0 text-[#d6a18f]" size={27} />
                        <div>
                            <h3 className="text-sm font-semibold text-white">
                                Easy Returns
                            </h3>
                            <p className="mt-1 text-xs leading-5 text-[#aaa19a]">
                                Shop with greater confidence
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Footer */}
            <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8 lg:py-16">
                <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-12">
                    {/* Brand */}
                    <div>
                        <Link
                            to="/"
                            aria-label="Shvans Jewellery Home"
                            className="inline-flex items-center"
                        >
                            <img
                                src="/logo.png"
                                alt="SHVANS Jewellery"
                                className="h-14 w-auto max-w-[200px] object-contain"
                            />
                        </Link>

                        <p className="mt-5 max-w-sm text-sm leading-7 text-[#aaa19a]">
                            Discover timeless silver jewellery designed to celebrate your
                            style. Elegant pieces for everyday moments and special occasions.
                        </p>

                        <div className="mt-5 space-y-3 text-sm">
                            <p className="text-[#aaa19a]">
                                <span className="font-medium text-white">WhatsApp:</span>{" "}
                                <a
                                    href="https://wa.me/919998046559"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="transition hover:text-[#e8a598]"
                                >
                                    +91 99980 46559
                                </a>
                            </p>

                            <p className="text-[#aaa19a]">
                                <span className="font-medium text-white">Email:</span>{" "}
                                <a
                                    href="mailto:shvera925@gmail.com"
                                    className="break-all transition hover:text-[#e8a598]"
                                >
                                    shvera925@gmail.com
                                </a>
                            </p>
                        </div>

                        <div className="mt-6 flex items-center gap-2 text-xs text-[#d6a18f]">
                            <FiHeart size={15} />
                            <span>Made to make every moment special</span>
                        </div>

                        <div className="mt-6 flex gap-3">
                            <a
                                href="https://www.instagram.com/"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Instagram"
                                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 transition hover:border-[#d6a18f] hover:bg-[#d6a18f]/10 hover:text-[#e8a598]"
                            >
                                <FiInstagram size={18} />
                            </a>

                            <a
                                href="https://www.facebook.com/"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Facebook"
                                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 transition hover:border-[#d6a18f] hover:bg-[#d6a18f]/10 hover:text-[#e8a598]"
                            >
                                <FaFacebookF size={18} />
                            </a>
                        </div>
                    </div>

                    {/* Static Collections */}
                    <div>
                        <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-white">
                            Our Collections
                        </h3>

                        <ul className="mt-6 space-y-4">
                            {collections.map((item) => (
                                <li key={item.name}>
                                    <Link
                                        to={item.path}
                                        className="group flex items-center justify-between gap-2 text-sm text-[#aaa19a] transition hover:text-[#e8a598]"
                                    >
                                        {item.name}
                                        <FiArrowRight
                                            size={14}
                                            className="opacity-0 transition group-hover:translate-x-1 group-hover:opacity-100"
                                        />
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Customer Care */}
                    <div>
                        <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-white">
                            Customer Care
                        </h3>

                        <ul className="mt-6 space-y-4">
                            {customerLinks.map((item) => (
                                <li key={item.name}>
                                    <Link
                                        to={item.path}
                                        className="text-sm text-[#aaa19a] transition hover:text-[#e8a598]"
                                    >
                                        {item.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Brand Promise */}
                    <div>
                        <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-white">
                            The Shvans Promise
                        </h3>

                        <div className="mt-6 space-y-5">
                            <div>
                                <h4 className="text-sm font-medium text-white">
                                    Quality Craftsmanship
                                </h4>
                                <p className="mt-2 text-xs leading-6 text-[#aaa19a]">
                                    Thoughtfully designed jewellery with attention to every
                                    detail.
                                </p>
                            </div>

                            <div>
                                <h4 className="text-sm font-medium text-white">
                                    Secure Checkout
                                </h4>
                                <p className="mt-2 text-xs leading-6 text-[#aaa19a]">
                                    Convenient payment options for a smooth shopping experience.
                                </p>
                            </div>

                            <div>
                                <h4 className="text-sm font-medium text-white">
                                    Here to Help
                                </h4>
                                <p className="mt-2 text-xs leading-6 text-[#aaa19a]">
                                    Contact our team whenever you need assistance with your
                                    shopping experience.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Legal Links */}
                <div className="mt-12 border-t border-white/10 pt-7">
                    <div className="flex flex-wrap justify-center gap-x-6 gap-y-3 sm:justify-start">
                        {legalLinks.map((item) => (
                            <Link
                                key={item.name}
                                to={item.path}
                                className="text-xs text-[#aaa19a] transition hover:text-[#e8a598]"
                            >
                                {item.name}
                            </Link>
                        ))}

                        <Link
                            to="/contact"
                            className="text-xs text-[#aaa19a] transition hover:text-[#e8a598]"
                        >
                            Customer Support
                        </Link>
                    </div>
                </div>

                {/* Copyright */}
                <div className="mt-7 flex flex-col items-center justify-between gap-5 border-t border-white/10 pt-7 sm:flex-row">
                    <p className="text-center text-xs leading-6 text-[#8f8780] sm:text-left">
                        © {new Date().getFullYear()} Shvans Jewels. All Rights Reserved.
                    </p>

                    <div className="flex flex-wrap items-center justify-center gap-2">
                        {["UPI", "VISA", "Mastercard", "RuPay", "NetBanking"].map(
                            (payment) => (
                                <span
                                    key={payment}
                                    className="rounded border border-white/15 px-3 py-1.5 text-[10px] font-medium tracking-wide text-[#c5bcb4]"
                                >
                                    {payment}
                                </span>
                            )
                        )}
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
