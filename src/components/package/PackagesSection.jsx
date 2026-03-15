import PackageCard from "./PackageCard";
import img1 from "../../assets/images/pack1.jpg";
import img2 from "../../assets/images/de.jpg";
import img3 from "../../assets/images/pack2.jpg";
import img4 from "../../assets/images/pack3.jpg";


export default function PackagesSection() {
  const packages = [
    {
      id: "1",
      image: img1,
      category: "LifeStyle",
      title: "Malls Shopping - Brookfield , ProZone",
      price: 2499,
      rating: 4.8,
      duration: "6 hours",
      verified: true,
    },
    {
      id: "2",
      image: img2,
      category: "Spiritual",
      title: "ISHA's Adiyogi ",
      price: 1799,
      rating: 4.9,
      duration: "4 hours",
      verified: true,
    },
    {
      id: "3",
      image: img3,
      category: "NightLife",
      title: "Race Course Walk",
      price: 899,
      rating: 5.0,
      duration: "3 hours",
      verified: true,
    },
     {
      id: "4",
      image: img4,
      category: "Spirtual",
      title: "Marudhamalai",
      price: 799  ,
      rating: 5.0,
      duration: "3 hours",
      verified: true,
    },
  ];

  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900">
            Curated Experiences in Coimbatore
          </h2>
          <p className="text-gray-600 mt-3">
            Handpicked tours led by verified local guides
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {packages.map((pkg) => (
            <PackageCard key={pkg.id} {...pkg} />
          ))}
        </div>
      </div>
    </section>
  );
}