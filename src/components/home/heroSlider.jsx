import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import img1 from "../../assets/images/img.jpg";
import img2 from "../../assets/images/img1.jpg";
import img3 from "../../assets/images/img2.jpg";
import img4 from "../../assets/images/img3.jpg";
import img5 from "../../assets/images/pack2.jpeg";

const images = [
  img1,img2,img3,img4,img5
];

export default function HeroSlider() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute inset-0">

      {/* Background Images */}
      <AnimatePresence mode="wait">
        <motion.img
          key={index}
          src={images[index]}
          alt="Hero background"
          className="absolute inset-0 w-full h-full object-cover"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
        />
      </AnimatePresence>

      {/* Dots Navigation */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3 z-20">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`h-2 rounded-full transition-all duration-300 ${
              index === i
                ? "w-8 bg-white"
                : "w-2 bg-white/50 hover:bg-white/80"
            }`}
          />
        ))}
      </div>

    </div>
  );
}