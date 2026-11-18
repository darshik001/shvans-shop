
import React from "react";
import { Link } from "react-router-dom";
import {
  FiArrowRight,
  FiHeart,
  FiAward,
  FiStar,
  FiShield,
} from "react-icons/fi";

const AboutUs = () => {
  const features = [
    {
      icon: <FiStar />,
      title: "Unique Fragrances",
      description:
        "Discover fragrances that reflect your personality and make every moment special.",
    },
    {
      icon: <FiAward />,
      title: "Quality First",
      description:
        "We focus on quality, attention to detail, and creating a memorable fragrance experience.",
    },
    {
      icon: <FiHeart />,
      title: "Made with Passion",
      description:
        "Every fragrance is selected with care to help you express your unique identity.",
    },
    {
      icon: <FiShield />,
      title: "Customer Satisfaction",
      description:
        "Your satisfaction matters to us. We aim to make every shopping experience special.",
    },
  ];

  return (
    <div className="bg-[#faf8f5] text-[#29231f] min-h-screen">

      {/* Hero Section */}
      <section className="relative bg-[#211b17] text-white overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img
            src="/images/about-perfume.jpg"
            alt="Luxury perfume collection"
            className="w-full h-full object-cover"
            onError={(e) => (e.currentTarget.style.display = "none")}
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-6 py-24 md:py-32 text-center">
          <p className="text-[#c5a47e] uppercase tracking-[5px] text-xs mb-5">
            Discover Our Story
          </p>

          <h1 className="text-4xl md:text-6xl font-serif mb-6">
            About SHVANS
          </h1>

          <p className="max-w-2xl mx-auto text-[#e5dcd3] leading-8 text-sm md:text-base">
            A fragrance is more than just a scent. It's an expression of
            personality, a memory, and a story waiting to be told.
          </p>
        </div>
      </section>

      {/* Brand Story */}
      <section className="max-w-7xl mx-auto px-6 py-20 md:py-28">
        <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">
          <div>
            <p className="text-[#a17c55] uppercase tracking-[4px] text-xs mb-4">
              Who We Are
            </p>

            <h2 className="text-3xl md:text-5xl font-serif leading-tight mb-7">
              Every Scent Has
              <span className="block italic text-[#a17c55]">
                A Story to Tell
              </span>
            </h2>

            <p className="text-[#756b63] leading-8 mb-5">
              SHVANS is a fragrance destination for people who believe that
              the right scent can make every moment unforgettable.
              We bring together carefully selected fragrances designed
              to complement your personality and style.
            </p>

            <p className="text-[#756b63] leading-8 mb-8">
              Whether you are looking for something fresh for everyday
              moments or a captivating fragrance for special occasions,
              we want you to find a scent that feels uniquely yours.
            </p>

            <Link
              to="/shop"
              className="inline-flex items-center gap-3 bg-[#29231f] text-white px-7 py-4 text-sm tracking-wider hover:bg-[#a17c55] transition"
            >
              EXPLORE COLLECTION
              <FiArrowRight />
            </Link>
          </div>

          <div className="relative">
            <div className="absolute -top-5 -left-5 w-full h-full border border-[#c5a47e]" />
            <img
              src="/images/about-story.jpg"
              alt="SHVANS fragrance story"
              className="relative w-full h-[400px] md:h-[520px] object-cover bg-[#e8dfd5]"
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
            />
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="bg-[#eee8e0] py-20 md:py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-[#a17c55] uppercase tracking-[4px] text-xs mb-5">
            Our Purpose
          </p>

          <h2 className="text-3xl md:text-5xl font-serif mb-8">
            Our Mission
          </h2>

          <p className="text-[#756b63] leading-9 text-base md:text-lg">
            Our mission is to make fragrance shopping simple, enjoyable,
            and memorable. We aim to bring thoughtfully selected scents
            closer to everyone and help people discover fragrances that
            express who they are.
          </p>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="max-w-7xl mx-auto px-6 py-20 md:py-28">
        <div className="text-center mb-14">
          <p className="text-[#a17c55] uppercase tracking-[4px] text-xs mb-4">
            The SHVANS Experience
          </p>

          <h2 className="text-3xl md:text-5xl font-serif">
            Why Choose SHVANS?
          </h2>

          <p className="text-[#81766d] mt-5 max-w-xl mx-auto leading-7">
            More than fragrances, we bring you an experience built around
            quality, passion, and personal expression.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((item, index) => (
            <div
              key={index}
              className="bg-white p-8 text-center border border-[#eee5dc] hover:shadow-xl transition duration-300"
            >
              <div className="w-14 h-14 mx-auto rounded-full bg-[#f3ede6] text-[#a17c55] flex items-center justify-center text-2xl mb-6">
                {item.icon}
              </div>

              <h3 className="font-serif text-xl mb-4">
                {item.title}
              </h3>

              <p className="text-sm text-[#81766d] leading-7">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Closing CTA */}
      <section className="bg-[#211b17] text-white px-6 py-20 text-center">
        <p className="text-[#c5a47e] uppercase tracking-[4px] text-xs mb-5">
          Find Your Signature Scent
        </p>

        <h2 className="text-3xl md:text-5xl font-serif mb-6">
          Make Every Moment Memorable
        </h2>

        <p className="text-[#d1c6bc] max-w-xl mx-auto leading-7 mb-9">
          Explore our fragrance collection and discover the scent
          that tells your story.
        </p>

        <Link
          to="/shop"
          className="inline-flex items-center gap-3 bg-[#c5a47e] text-[#211b17] px-8 py-4 text-sm tracking-wider hover:bg-white transition"
        >
          SHOP NOW
          <FiArrowRight />
        </Link>
      </section>
    </div>
  );
};

export default AboutUs;
