
import React, { useState } from "react";
import {
  FiMapPin,
  FiPhone,
  FiMail,
  FiClock,
  FiSend,
  FiMessageCircle,
} from "react-icons/fi";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Backend API connect karvani baki che
    console.log("Contact Form Data:", formData);

    alert("Thank you! Your message has been submitted.");

    setFormData({
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    });
  };

  const contactDetails = [
    {
      icon: <FiMapPin />,
      title: "Our Address",
      value: "Surat, Gujarat, India",
    },
    {
      icon: <FiPhone />,
      title: "Call Us",
      value: "+91 XXXXXXXXXX",
    },
    {
      icon: <FiMail />,
      title: "Email Us",
      value: "support@shvans.com",
    },
    {
      icon: <FiClock />,
      title: "Working Hours",
      value: "Monday - Saturday | 10 AM - 7 PM",
    },
  ];

  return (
    <div className="bg-[#faf8f5] min-h-screen text-[#29231f]">

      {/* Hero Section */}
      <section className="bg-[#211b17] text-white px-6 py-20 md:py-28 text-center">
        <p className="text-[#c5a47e] uppercase tracking-[5px] text-xs mb-5">
          Get In Touch
        </p>

        <h1 className="text-4xl md:text-6xl font-serif mb-6">
          Contact Us
        </h1>

        <p className="max-w-xl mx-auto text-[#ded4ca] leading-8">
          Have a question about our fragrances or your order?
          We are here to help you. Get in touch with the SHVANS team.
        </p>
      </section>

      {/* Contact Information */}
      <section className="max-w-7xl mx-auto px-6 py-16 md:py-20">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {contactDetails.map((item, index) => (
            <div
              key={index}
              className="bg-white border border-[#eee5dc] p-7 text-center hover:shadow-lg transition"
            >
              <div className="w-14 h-14 mx-auto rounded-full bg-[#f3ede6] text-[#a17c55] flex items-center justify-center text-2xl mb-5">
                {item.icon}
              </div>

              <h3 className="font-serif text-lg mb-3">
                {item.title}
              </h3>

              <p className="text-sm text-[#81766d] leading-6 break-words">
                {item.value}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Form */}
      <section className="max-w-7xl mx-auto px-6 pb-20">
        <div className="grid lg:grid-cols-2 gap-12">

          {/* Left Content */}
          <div className="bg-[#eee8e0] p-8 md:p-12">
            <p className="text-[#a17c55] uppercase tracking-[4px] text-xs mb-5">
              Let's Talk
            </p>

            <h2 className="text-3xl md:text-5xl font-serif leading-tight mb-7">
              We'd Love To
              <span className="block italic text-[#a17c55]">
                Hear From You
              </span>
            </h2>

            <p className="text-[#756b63] leading-8 mb-10">
              Whether you need help choosing a fragrance, have a question
              about an order, or simply want to share your feedback,
              feel free to contact us.
            </p>

            <div className="border-t border-[#d7cabe] pt-8">
              <h3 className="font-serif text-xl mb-4">
                Customer Support
              </h3>

              <p className="text-sm text-[#81766d] leading-7 mb-6">
                Our team is happy to assist you with your queries and
                provide the support you need.
              </p>

              <a
                href="https://wa.me/91XXXXXXXXXX"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-3 bg-[#29231f] text-white px-7 py-4 text-sm hover:bg-[#a17c55] transition"
              >
                <FiMessageCircle size={18} />
                CHAT ON WHATSAPP
              </a>
            </div>
          </div>

          {/* Form */}
          <div className="bg-white border border-[#eee5dc] p-7 md:p-12">
            <h2 className="font-serif text-3xl mb-3">
              Send Us a Message
            </h2>

            <p className="text-sm text-[#81766d] mb-8">
              Fill out the form below and we will get back to you.
            </p>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  required
                  className="w-full border border-[#e5ddd4] bg-[#faf8f5] px-4 py-3 outline-none focus:border-[#a17c55]"
                />
              </div>

              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter email"
                    required
                    className="w-full border border-[#e5ddd4] bg-[#faf8f5] px-4 py-3 outline-none focus:border-[#a17c55]"
                  />
                </div>

                <div>
                  <label className="block text-sm mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Enter phone number"
                    className="w-full border border-[#e5ddd4] bg-[#faf8f5] px-4 py-3 outline-none focus:border-[#a17c55]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm mb-2">
                  Subject *
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Enter subject"
                  required
                  className="w-full border border-[#e5ddd4] bg-[#faf8f5] px-4 py-3 outline-none focus:border-[#a17c55]"
                />
              </div>

              <div>
                <label className="block text-sm mb-2">
                  Your Message *
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Write your message here..."
                  rows="5"
                  required
                  className="w-full border border-[#e5ddd4] bg-[#faf8f5] px-4 py-3 outline-none focus:border-[#a17c55] resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-3 bg-[#29231f] text-white py-4 text-sm tracking-wider hover:bg-[#a17c55] transition"
              >
                SEND MESSAGE
                <FiSend />
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-[#211b17] text-white px-6 py-16 text-center">
        <p className="text-[#c5a47e] uppercase tracking-[4px] text-xs mb-4">
          SHVANS Fragrance
        </p>

        <h2 className="text-3xl md:text-4xl font-serif mb-5">
          We're Always Here For You
        </h2>

        <p className="text-[#d1c6bc] max-w-xl mx-auto leading-7">
          Your experience matters to us. Thank you for being a part
          of the SHVANS fragrance journey.
        </p>
      </section>
    </div>
  );
};

export default ContactUs;
