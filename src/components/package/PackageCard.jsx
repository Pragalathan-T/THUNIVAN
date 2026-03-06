import { Heart, Star, Clock, BadgeCheck } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";

export default function PackageCard({
  image,
  category,
  title,
  price,
  rating,
  duration,
  verified,
}) {
  const [isWishlisted, setIsWishlisted] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      viewport={{ once: true }}
      whileHover={{ y: -12 }}
      className="group relative bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500"
    >
      {/* Soft Glow Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-100/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition duration-500 pointer-events-none" />

      {/* Image */}
      <div className="relative h-64 overflow-hidden">
        <motion.img
          src={image}
          alt={title}
          className="w-full h-full object-cover"
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.7 }}
        />

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition duration-500" />

        {/* Wishlist Button */}
        <motion.button
          whileTap={{ scale: 0.8 }}
          onClick={() => setIsWishlisted(!isWishlisted)}
          className="absolute top-4 right-4 w-11 h-11 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center shadow-md"
        >
          <motion.div
            animate={isWishlisted ? { scale: 1.2 } : { scale: 1 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Heart
              className={`w-5 h-5 ${
                isWishlisted
                  ? "fill-red-500 text-red-500"
                  : "text-gray-600"
              }`}
            />
          </motion.div>
        </motion.button>

        {/* Floating Category Badge */}
        <motion.span
          initial={{ x: -20, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="absolute top-4 left-4 px-4 py-1.5 rounded-full text-xs font-semibold bg-white/80 backdrop-blur-md text-gray-800 shadow-lg"
        >
          {category}
        </motion.span>
      </div>

      {/* Content */}
      <div className="p-6 relative z-10">
        <h3 className="text-lg font-semibold text-gray-900 mb-3 group-hover:text-emerald-600 transition">
          {title}
        </h3>

        {/* Rating + Duration */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < Math.floor(rating)
                    ? "fill-amber-400 text-amber-400"
                    : "text-gray-300"
                }`}
              />
            ))}
            <span className="ml-2 text-sm text-gray-600 font-medium">
              {rating}
            </span>
          </div>

          <div className="flex items-center text-sm text-gray-600">
            <Clock className="w-4 h-4 mr-1" />
            {duration}
          </div>
        </div>

        {/* Price + Verified */}
        <div className="flex items-center justify-between border-t pt-4">
          <div>
            <div className="text-2xl font-bold text-emerald-600">
              ₹{price.toLocaleString()}
            </div>
            <div className="text-xs text-gray-500">per person</div>
          </div>

          {verified && (
            <div className="flex items-center space-x-1 text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full shadow-sm">
              <BadgeCheck className="w-4 h-4" />
              <span className="text-xs font-semibold">Verified</span>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}