
import { Link } from "react-router-dom";
import { FiShield, FiArrowLeft } from "react-icons/fi";

const PrivacyPolicy = () => {
  return (
    <main className="min-h-screen bg-[#fffdf9] text-[#29231f]">
      <section className="bg-[#f6eee5] px-5 py-16 text-center sm:py-20">
        <FiShield className="mx-auto mb-4 text-4xl text-[#a77b51]" />
        <h1 className="font-serif text-4xl sm:text-5xl">
          Privacy Policy
        </h1>
        <p className="mt-4 text-sm text-[#75685e]">
          Your privacy matters to us at SHVANS.
        </p>
      </section>

      <section className="mx-auto max-w-4xl px-5 py-14 sm:py-20">
        <p className="mb-8 text-sm leading-7 text-[#75685e]">
          At SHVANS, we respect your privacy and are committed to protecting
          your personal information. This Privacy Policy explains how we
          collect, use, store, and protect your information when you visit
          our website or purchase our products.
        </p>

        {[
          {
            title: "1. Information We Collect",
            content: "We may collect your name, email address, phone number, billing address, shipping address, order details and account information when you register or place an order."
          },
          {
            title: "2. How We Use Your Information",
            content: "Your information is used to process orders, arrange deliveries, provide customer support, send order updates, improve our services and communicate important information."
          },
          {
            title: "3. Payment Information",
            content: "Payments are processed through third-party payment providers. SHVANS does not directly store your complete card or banking credentials."
          },
          {
            title: "4. Cookies",
            content: "Our website may use cookies and similar technologies to improve your browsing experience, remember preferences and understand website usage."
          },
          {
            title: "5. Sharing of Information",
            content: "We may share necessary information with delivery partners, payment providers and service providers only to fulfill orders and operate our services."
          },
          {
            title: "6. Data Security",
            content: "We take reasonable measures to protect your personal information against unauthorized access, misuse, alteration or disclosure."
          },
          {
            title: "7. Your Rights",
            content: "You may contact us to request access to, correction of or deletion of your personal information, subject to applicable legal requirements."
          },
          {
            title: "8. Changes to This Policy",
            content: "We may update this Privacy Policy from time to time. Any changes will be published on this page."
          },
          {
            title: "9. Contact Us",
            content: "If you have questions about this Privacy Policy, please contact our customer support team through the Contact Us page."
          }
        ].map((item) => (
          <div key={item.title} className="mb-8">
            <h2 className="mb-3 font-serif text-xl sm:text-2xl">
              {item.title}
            </h2>
            <p className="text-sm leading-7 text-[#75685e]">
              {item.content}
            </p>
          </div>
        ))}

        <p className="mt-10 text-xs text-[#9a8a7c]">
          Last Updated: November 2026
        </p>

        <Link to="/" className="mt-8 inline-flex items-center gap-2 text-sm text-[#a77b51] hover:text-[#30241f]">
          <FiArrowLeft /> Back to Home
        </Link>
      </section>
    </main>
  );
};

export default PrivacyPolicy;
