
import { Link } from "react-router-dom";
import { FiFileText, FiArrowLeft } from "react-icons/fi";

const TermsConditions = () => {
  const terms = [
    {
      title: "1. Acceptance of Terms",
      content: "By accessing or using the SHVANS website, you agree to comply with these Terms and Conditions. If you do not agree, please do not use our website."
    },
    {
      title: "2. Products and Descriptions",
      content: "We try to ensure that product descriptions, images, prices and availability are accurate. However, slight variations in product appearance or packaging may occur."
    },
    {
      title: "3. Pricing and Payments",
      content: "All product prices are displayed on our website in the applicable currency. Orders must be paid using the payment methods available at checkout."
    },
    {
      title: "4. Orders and Cancellation",
      content: "We reserve the right to accept or reject an order in certain circumstances, including stock unavailability, pricing errors or suspected fraudulent activity. Cancellation requests are subject to our order cancellation policy."
    },
    {
      title: "5. Shipping and Delivery",
      content: "Orders are shipped to the address provided during checkout. Delivery timelines are estimates and may vary due to location, courier operations or unforeseen circumstances."
    },
    {
      title: "6. Returns and Refunds",
      content: "Returns, replacements and refunds are governed by our Return Policy. Please review the Return Policy before placing an order."
    },
    {
      title: "7. User Responsibilities",
      content: "You agree to provide accurate account and order information and not misuse our website or attempt unauthorized access to our services."
    },
    {
      title: "8. Intellectual Property",
      content: "All website content, including logos, images, text, designs and branding, belongs to SHVANS or its respective owners and may not be used without permission."
    },
    {
      title: "9. Limitation of Liability",
      content: "To the extent permitted by applicable law, SHVANS shall not be liable for indirect or consequential losses arising from the use of our website or products."
    },
    {
      title: "10. Changes to Terms",
      content: "We reserve the right to modify these Terms and Conditions at any time. Updated terms will be published on this page."
    },
    {
      title: "11. Contact Information",
      content: "For questions regarding these Terms and Conditions, please contact our customer support team."
    }
  ];

  return (
    <main className="min-h-screen bg-[#fffdf9] text-[#29231f]">
      <section className="bg-[#f6eee5] px-5 py-16 text-center sm:py-20">
        <FiFileText className="mx-auto mb-4 text-4xl text-[#a77b51]" />
        <h1 className="font-serif text-4xl sm:text-5xl">
          Terms & Conditions
        </h1>
        <p className="mt-4 text-sm text-[#75685e]">
          Please read our terms before using SHVANS.
        </p>
      </section>

      <section className="mx-auto max-w-4xl px-5 py-14 sm:py-20">
        <p className="mb-8 text-sm leading-7 text-[#75685e]">
          Welcome to SHVANS. These Terms and Conditions govern your access
          to and use of our website, products and services. By using our
          website, you agree to these terms.
        </p>

        {terms.map((item) => (
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

export default TermsConditions;
