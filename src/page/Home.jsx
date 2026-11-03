import { Link } from "react-router-dom";
import {
  FiArrowRight,
  FiTruck,
  FiShield,
  FiRefreshCw,
  FiHeadphones,
  FiHeart,
  FiShoppingBag,
} from "react-icons/fi";

const categories = [
  {
    name: "For Him",
    image:
      "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=700&q=85",
  },
  {
    name: "For Her",
    image:
      "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=700&q=85",
  },
  {
    name: "Unisex",
    image:
      "https://images.unsplash.com/photo-1615634260167-c8cdede054de?auto=format&fit=crop&w=700&q=85",
  },
  {
    name: "Gift Sets",
    image:
      "https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=700&q=85",
  },
];

const products = [
  {
    id: 1,
    name: "Midnight Oud",
    price: 2499,
    oldPrice: 3299,
    tag: "BESTSELLER",
    image:
      "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=700&q=85",
  },
  {
    id: 2,
    name: "Bloom Essence",
    price: 1899,
    oldPrice: 2499,
    tag: "NEW",
    image:
      "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=700&q=85",
  },
  {
    id: 3,
    name: "Velvet Noir",
    price: 2799,
    oldPrice: 3499,
    tag: "TRENDING",
    image:
      "https://images.unsplash.com/photo-1615634260167-c8cdede054de?auto=format&fit=crop&w=700&q=85",
  },
  {
    id: 4,
    name: "Golden Amber",
    price: 2199,
    oldPrice: 2899,
    tag: "POPULAR",
    image:
      "https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=700&q=85",
  },
];

const benefits = [
  {
    icon: <FiTruck />,
    title: "Free Shipping",
    description: "On eligible orders",
  },
  {
    icon: <FiShield />,
    title: "Secure Shopping",
    description: "Protected checkout",
  },
  {
    icon: <FiRefreshCw />,
    title: "Easy Returns",
    description: "Terms apply",
  },
  {
    icon: <FiHeadphones />,
    title: "Customer Support",
    description: "We're here to help",
  },
];

const Home = () => {
  return (
    <main className="min-h-screen bg-[#fffdf9] text-[#29231f]">
      
      {/* Announcement Bar */}
      <div className="bg-[#30241f] px-4 py-2.5 text-center text-xs tracking-[2px] text-white sm:text-sm">
        DISCOVER YOUR SIGNATURE SCENT — EXPLORE SHVANS
      </div>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-[#f6eee5]">
        <div className="mx-auto grid min-h-[580px] max-w-7xl items-center gap-10 px-5 py-12 sm:px-8 md:grid-cols-2 md:py-16 lg:px-12">
          
          <div className="order-2 max-w-xl md:order-1">
            <p className="mb-5 text-xs font-semibold uppercase tracking-[4px] text-[#9a714a] sm:text-sm">
              The Art of Fragrance
            </p>

            <h1 className="font-serif text-5xl leading-[1.12] tracking-tight sm:text-6xl lg:text-7xl">
              A scent that
              <span className="mt-2 block italic text-[#a77b51]">
                tells your story.
              </span>
            </h1>

            <p className="mt-6 max-w-md text-sm leading-7 text-[#75685e] sm:text-base">
              Discover captivating fragrances crafted to express your
              personality and leave a lasting impression wherever you go.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                to="/products"
                className="inline-flex items-center gap-3 bg-[#30241f] px-7 py-4 text-sm font-medium text-white transition hover:bg-[#8d6846]"
              >
                Explore Fragrances <FiArrowRight />
              </Link>

              <Link
                to="/about"
                className="inline-flex items-center gap-2 border border-[#c9b8a6] px-7 py-4 text-sm transition hover:border-[#30241f]"
              >
                Our Story
              </Link>
            </div>

            <div className="mt-10 flex items-center gap-4 border-t border-[#dfd0c1] pt-6">
              <div className="flex -space-x-2">
                {["S", "C", "T"].map((letter) => (
                  <div
                    key={letter}
                    className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-[#f6eee5] bg-[#ddc8b0] text-xs font-semibold text-[#49372b]"
                  >
                    {letter}
                  </div>
                ))}
              </div>

              <p className="text-xs leading-5 text-[#75685e]">
                Crafted for your identity
                <span className="block font-medium text-[#30241f]">
                  A fragrance for every moment
                </span>
              </p>
            </div>
          </div>

          <div className="relative order-1 mx-auto w-full max-w-lg md:order-2">
            <div className="absolute -right-3 -top-3 h-28 w-28 border border-[#c8a57f] sm:-right-5 sm:-top-5 sm:h-40 sm:w-40" />

            <img
              src="https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=1000&q=90"
              alt="Luxury perfume collection"
              className="relative z-10 h-[350px] w-full object-cover sm:h-[470px] md:h-[520px]"
            />

            <div className="absolute -bottom-5 -left-3 z-20 bg-white px-5 py-4 shadow-lg sm:-left-6 sm:px-7">
              <p className="font-serif text-xl italic">Wear your essence.</p>
              <p className="mt-1 text-[10px] uppercase tracking-[2px] text-[#9a714a]">
                The Shvans Fragrance Collection
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="border-b border-[#eee5db] bg-white">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-5 py-8 sm:px-8 md:grid-cols-4 lg:px-12">
          {benefits.map((item) => (
            <div
              key={item.title}
              className="flex items-center gap-3 sm:justify-center"
            >
              <span className="text-2xl text-[#a77b51]">{item.icon}</span>
              <div>
                <h3 className="text-sm font-medium">{item.title}</h3>
                <p className="mt-1 text-xs text-[#8b7c70]">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20 lg:px-12">
        <div className="mb-9 flex items-end justify-between gap-4">
          <div>
            <p className="mb-3 text-xs uppercase tracking-[3px] text-[#a77b51]">
              Find Your Fragrance
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl">
              Shop by Collection
            </h2>
          </div>

          <Link
            to="/products"
            className="hidden items-center gap-2 text-sm hover:text-[#a77b51] sm:flex"
          >
            View All <FiArrowRight />
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
          {categories.map((category) => (
            <Link
              to="/products"
              key={category.name}
              className="group block"
            >
              <div className="overflow-hidden bg-[#f4ece3]">
                <img
                  src={category.image}
                  alt={category.name}
                  loading="lazy"
                  className="h-52 w-full object-cover transition duration-500 group-hover:scale-105 sm:h-72"
                />
              </div>

              <div className="flex items-center justify-between border-b border-[#e9ddd0] py-4">
                <h3 className="font-serif text-lg sm:text-xl">
                  {category.name}
                </h3>
                <FiArrowRight className="transition group-hover:translate-x-1" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="bg-[#f7f1e9]">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20 lg:px-12">
          <div className="mb-10 text-center">
            <p className="mb-3 text-xs uppercase tracking-[3px] text-[#a77b51]">
              Curated for You
            </p>

            <h2 className="font-serif text-3xl sm:text-4xl">
              Our Signature Scents
            </h2>

            <p className="mx-auto mt-4 max-w-lg text-sm leading-6 text-[#817368]">
              Discover distinctive fragrances designed to complement every
              personality, mood, and unforgettable moment.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
            {products.map((product) => (
              <article key={product.id} className="group min-w-0">
                <div className="relative overflow-hidden bg-white">
                  <img
                    src={product.image}
                    alt={product.name}
                    loading="lazy"
                    className="h-52 w-full object-cover transition duration-500 group-hover:scale-105 sm:h-72"
                  />

                  <span className="absolute left-2 top-2 bg-white px-2 py-1 text-[9px] font-semibold tracking-wider sm:left-3 sm:top-3 sm:text-[10px]">
                    {product.tag}
                  </span>

                  <button
                    type="button"
                    aria-label={`Add ${product.name} to wishlist`}
                    className="absolute right-2 top-2 flex h-9 w-9 items-center justify-center rounded-full bg-white transition hover:bg-[#30241f] hover:text-white sm:right-3 sm:top-3"
                  >
                    <FiHeart />
                  </button>

                  <Link
                    to="/products"
                    className="absolute bottom-0 left-0 right-0 translate-y-full bg-[#30241f]/95 py-3 text-center text-xs text-white transition duration-300 group-hover:translate-y-0"
                  >
                    View Fragrance
                  </Link>
                </div>

                <div className="pt-4">
                  <h3 className="truncate text-sm font-medium sm:text-base">
                    {product.name}
                  </h3>

                  <div className="mt-2 flex flex-wrap items-center gap-2">
                    <span className="text-sm font-semibold">
                      ₹{product.price.toLocaleString("en-IN")}
                    </span>

                    <span className="text-xs text-[#9b8d80] line-through">
                      ₹{product.oldPrice.toLocaleString("en-IN")}
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link
              to="/products"
              className="inline-flex items-center gap-3 border border-[#30241f] px-8 py-4 text-sm transition hover:bg-[#30241f] hover:text-white"
            >
              Explore All Fragrances <FiArrowRight />
            </Link>
          </div>
        </div>
      </section>

      {/* Brand Story */}
      <section className="mx-auto grid max-w-7xl items-center gap-10 px-5 py-16 sm:px-8 sm:py-20 md:grid-cols-2 lg:px-12">
        <div className="overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=1000&q=90"
            alt="Luxury fragrance collection"
            loading="lazy"
            className="h-[350px] w-full object-cover sm:h-[460px]"
          />
        </div>

        <div className="max-w-xl">
          <p className="mb-4 text-xs uppercase tracking-[3px] text-[#a77b51]">
            More Than A Fragrance
          </p>

          <h2 className="font-serif text-4xl leading-tight sm:text-5xl">
            Every scent.
            <span className="block italic text-[#a77b51]">
              A lasting memory.
            </span>
          </h2>

          <p className="mt-6 text-sm leading-7 text-[#817368] sm:text-base">
            At Shvans, we believe a fragrance is more than just a scent. It is
            an expression of who you are, a reflection of your mood, and a
            memory that stays long after the moment has passed.
          </p>

          <Link
            to="/about"
            className="mt-8 inline-flex items-center gap-3 border-b border-[#a77b51] pb-2 text-sm font-medium transition hover:gap-5"
          >
            Discover Our Story <FiArrowRight />
          </Link>
        </div>
      </section>

      {/* Newsletter */}
      <section className="bg-[#30241f] px-5 py-16 text-white sm:py-20">
        <div className="mx-auto max-w-2xl text-center">
          <p className="mb-4 text-xs uppercase tracking-[3px] text-[#d8b58e]">
            Stay Connected
          </p>

          <h2 className="font-serif text-3xl sm:text-4xl">
            A world of fragrance in your inbox.
          </h2>

          <p className="mx-auto mt-4 max-w-md text-sm leading-6 text-[#d0c2b7]">
            Be the first to discover new fragrances, exclusive collections,
            special offers, and updates from Shvans.
          </p>

          <form className="mx-auto mt-8 flex max-w-lg flex-col gap-3 sm:flex-row">
            <input
              type="email"
              required
              placeholder="Enter your email address"
              aria-label="Email address"
              className="min-w-0 flex-1 border border-[#716057] bg-transparent px-5 py-4 text-sm outline-none placeholder:text-[#b6a69a] focus:border-[#d8b58e]"
            />

            <button
              type="submit"
              className="flex items-center justify-center gap-2 bg-[#d8b58e] px-6 py-4 text-sm font-medium text-[#30241f] transition hover:bg-white"
            >
              Subscribe <FiArrowRight />
            </button>
          </form>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="px-5 py-10 text-center">
        <FiShoppingBag className="mx-auto mb-3 text-2xl text-[#a77b51]" />

        <p className="font-serif text-xl">
          Find the fragrance that feels like you.
        </p>

        <Link
          to="/products"
          className="mt-4 inline-block text-sm underline underline-offset-4 hover:text-[#a77b51]"
        >
          Explore Fragrances
        </Link>
      </section>
    </main>
  );
};

export default Home;