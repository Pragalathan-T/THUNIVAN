import PackagesSection from "../../components/package/PackagesSection";
import HeroSlider from "../../components/home/heroSlider";

const Home = () => {
  return (
    <div className="w-full min-h-screen bg-gray-50">

      {/* HERO SECTION */}
      <section className="relative h-[90vh] flex items-center justify-center text-white overflow-hidden">

        {/* Moving Background Slider */}
        <HeroSlider />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-black/30"></div>

        {/* Hero Content */}
        <div className="relative z-10 text-center px-4 max-w-4xl">
          <h1 className="text-4xl md:text-6xl font-bold leading-tight">
            Explore Coimbatore with
            <span className="block text-emerald-300">
              Verified Local Guides
            </span>
          </h1>

          <p className="mt-6 text-lg md:text-xl text-gray-200">
            Discover authentic experiences with trusted local guides.
            Safe, verified, and unforgettable.
          </p>

          {/* Search Bar */}
          <div className="mt-10 bg-white rounded-full shadow-xl p-2 flex items-center max-w-3xl mx-auto">
            <input
              type="text"
              placeholder="What do you want to explore?"
              className="flex-1 px-6 py-3 rounded-full outline-none text-gray-700"
            />
            <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-full transition">
              Search
            </button>
          </div>
        </div>

      </section>

      {/* PREMIUM PACKAGES SECTION */}
      <PackagesSection />

    </div>
  );
};

export default Home;