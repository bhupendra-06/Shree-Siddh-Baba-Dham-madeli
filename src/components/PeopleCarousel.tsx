import React, { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import noUser from "@/assets/no-user.jpg";
import { ChevronLeft, ChevronRight } from "lucide-react";
import one from "@/assets/one.png";
import two from "@/assets/two.png";
import three from "@/assets/three.jpg";
import four from "@/assets/four.png";
import five from "@/assets/five.jpg";

interface Member {
  name: string;
  image: string;
}

const members: Member[] = [
  { name: "Mannu Lal Sahu", image: three },
  { name: "Lokesh Sahu", image: one },
  { name: "Heera Sahu", image: five },
  { name: "Lucky Sahu", image: two },
  { name: "Bhawna Sahu", image: four },
];

export default function PeopleCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start" });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  useEffect(() => {
    if (!emblaApi) return;

    // 👉 Carousel select handle
    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on("select", onSelect);
    onSelect();

    // 👉 Autoplay setup
    let timer: ReturnType<typeof setInterval> | null = null;

    const start = () => {
      if (timer) return;
      timer = setInterval(() => emblaApi.scrollNext(), 3000);
    };

    const stop = () => {
      if (!timer) return;
      clearInterval(timer);
      timer = null;
    };

    const onPointerDown = () => stop();
    emblaApi.on("pointerDown", onPointerDown);

    const root = emblaApi.rootNode();
    root.addEventListener("mouseenter", stop);
    root.addEventListener("mouseleave", start);

    start();

    // ✅ Cleanup
    return () => {
      stop();
      emblaApi.off("select", onSelect);
      emblaApi.off("pointerDown", onPointerDown);
      root.removeEventListener("mouseenter", stop);
      root.removeEventListener("mouseleave", start);
    };
  }, [emblaApi]);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
  const scrollTo = useCallback(
    (index: number) => emblaApi?.scrollTo(index),
    [emblaApi]
  );

  return (
    <div className="relative px-4 sm:px-20 py-10 my-6 bg-orange-50">
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 font-[Mangal]">
        मंदिर <span className="text-orange-600">निर्माण सहयोगी</span>
      </h2>

      <div ref={emblaRef} className="overflow-hidden">
        <div className="flex">
          {members.map((member, i) => (
            <div
              key={i}
              className="flex-[0_0_100%] sm:flex-[0_0_50%] md:flex-[0_0_33.33%] lg:flex-[0_0_25%] p-4"
            >
              <div className="bg-white rounded-xl shadow-lg p-6 text-center hover:scale-105 transition duration-300">
                <img
                  src={member.image || noUser}
                  alt={member.name}
                  className="mx-auto w-28 h-28 rounded-full object-cover border-4 border-orange-400 shadow"
                />
                <h3 className="text-lg mt-4 font-semibold text-gray-800 font-[Mangal]">
                  {member.name}
                </h3>
              </div>
            </div>
          ))}
        </div>

        {/* Arrows */}
        <button
          onClick={scrollPrev}
          aria-label="Previous"
          className="absolute left-2 top-1/2 bg-white p-3 rounded-full shadow-md hover:bg-gray-100 transition"
        >
          <ChevronLeft className="w-5 h-5 text-gray-700" />
        </button>

        <button
          onClick={scrollNext}
          aria-label="Next"
          className="absolute right-2 top-1/2 bg-white p-3 rounded-full shadow-md hover:bg-gray-100 transition"
        >
          <ChevronRight className="w-5 h-5 text-gray-700" />
        </button>
      </div>

    </div>
  );
}
