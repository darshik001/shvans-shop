
import { Link } from "react-router-dom";
import { FiRefreshCw, FiArrowLeft } from "react-icons/fi";

const ReturnPolicy = () => {
  const policies = [
    {
      title: "1. Return Eligibility",
      content: "Products may be eligible for return within 7 days of delivery if they are damaged, defective, incorrect or meet our applicable return conditions."
    },
    {
      title: "2. Product Condition",
      content: "For hygiene and safety reasons, perfume and fragrance products must generally be unused, unopened and in their original packaging to qualify for a return, except where applicable consumer law requires otherwise."
    },
    {
      title: "3. Damaged or Incorrect Products",
      content: "If you receive a damaged, defective or incorrect product, contact our support team within 48 hours of delivery with your order number, photographs and an unboxing video if available."
    },
    {
      title: "4. Non-Returnable Products",
      content: "Used, opened or damaged products caused by customer misuse may not qualify for return, subject to applicable consumer protection laws."
    },
    {
      title: "5. Return Process",
      content: "Contact our customer support team with your order details and reason for return. Our team will review your request and provide return instructions if approved."
    },
    {
      title: "6. Refund Process",
      content: "Once the returned product is received and inspected, approved refunds will be processed to the original payment method or another agreed method. Processing time may depend on the payment provider or bank."
    },
    {
      title: "7. Shipping Charges",
      content: "For eligible damaged, defective or incorrect orders, return shipping arrangements will be communicated by our support team. Other return shipping costs may be the customer's responsibility where legally permitted."
    },
    {
      title: "8. Order Cancellation",
      content: "Cancellation requests should be submitted before the order is shipped. Orders already shipped may be subject to our return policy."
    },
    {
      title: "9. Contact Us",
      content: "For return, replacement or refund assistance, contact our customer support team and provide your order number."
    }
  ];

  return (
    <main className="min-h-screen bg-[#fffdf9] text-[#29231f]">
      <section className="bg-[#f6eee5] px-5 py-16 text-center sm:py-20">
        <FiRefreshCw className="mx-auto mb-4 text-4xl text-[#a77b51]" />
        <h1 className="font-serif text-4xl sm:text-5xl">
          Return Policy
        </h1>
        <p className="mt-4 text-sm text-[#75685e]">
          Your satisfaction is important to us.
        </p>
      </section>

      <section className="mx-auto max-w-4xl px-5 py-14 sm:py-20">
        <p className="mb-8 text-sm leading-7 text-[#75685e]">
          At SHVANS, we want you to have a great shopping experience.
          Please read our return and refund policy carefully before
          requesting a return or replacement.
        </p>

        <div className="mb-10 border border-[#e9ddd0] bg-[#f6eee5] p-6">
          <h2 className="font-serif text-xl">
            Return Window
          </h2>
          <p className="mt-2 text-sm leading-7 text-[#75685e]">
            Our standard return request window is 7 days from the date
            of delivery, subject to product eligibility and applicable law.
          </p>
        </div>

        {policies.map((item) => (
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

export default ReturnPolicy;
