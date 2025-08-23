import React, { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";

interface Member {
  name: string;
  qualification: string;
  experience: string;
  image: string;
}

const members: Member[] = [
  {
    name: "Mohan Thakur",
    qualification: "Adyaksh",
    experience: "📞 7804827109",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    name: "Purushottam Netam",
    qualification: "Sachiv",
    experience: "📞 9098412384",
    image: "https://randomuser.me/api/portraits/men/33.jpg",
  },
  {
    name: "Tejram Sahu",
    qualification: "Upadhyaksh",
    experience: "📞 6268678377",
    image: "https://randomuser.me/api/portraits/men/34.jpg",
  },
  {
    name: "Hitesh Patel",
    qualification: "Koshadhyaksh",
    experience: "📞 6265644983",
    image: "https://randomuser.me/api/portraits/men/35.jpg",
  },
  {
    name: "Purushottam Kansari",
    qualification: "Sahsachiv",
    experience: "📞 (not provided)",
    image: "https://randomuser.me/api/portraits/men/36.jpg",
  },
];

export default function MembersCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start" });

  // Pagination (dots)
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);
  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on("select", onSelect);
    onSelect();
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  // Manual autoplay (no plugin): 3s, pause on hover & user interaction
  useEffect(() => {
    if (!emblaApi) return;

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

    // Pause on user drag/touch
    const onPointerDown = () => stop();
    emblaApi.on("pointerDown", onPointerDown);

    // Pause on hover
    const root = emblaApi.rootNode();
    root.addEventListener("mouseenter", stop);
    root.addEventListener("mouseleave", start);

    start();

    return () => {
      stop();
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
    <div className="relative px-4 sm:px-20 py-10 bg-blue-50">
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
        Our <span className="text-orange-600">Members</span>
      </h2>

      <div ref={emblaRef} className="overflow-hidden">
        <div className="flex">
          {members.map((member, i) => (
            <div
              key={i}
              className="flex-[0_0_100%] sm:flex-[0_0_50%] md:flex-[0_0_33.33%] lg:flex-[0_0_25%] p-4"
            >
              <div className="bg-blue-200/80 rounded-lg shadow-lg p-6 hover:scale-105 transition duration-300">
                <img
                  src={member.image}
                  alt={member.name}
                  className="mx-auto w-28 h-28 rounded-full object-cover border-2 border-gray-300"
                />
                <h3 className="text-lg mt-4 font-semibold text-center">
                  {member.name}
                </h3>
                <p className="text-center text-gray-700">
                  {member.qualification}
                </p>
                <div className="mt-2 text-center px-3 py-1 rounded bg-white text-sm text-gray-600">
                  {member.experience}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Arrows */}
        <button
          onClick={scrollPrev}
          aria-label="Previous"
          className="absolute left-2 top-1/2 bg-white p-2 rounded-full shadow hover:bg-gray-100"
        >
          ◀
        </button>
        <button
          onClick={scrollNext}
          aria-label="Next"
          className="absolute right-2 top-1/2 bg-white p-2 rounded-full shadow hover:bg-gray-100"
        >
          ▶
        </button>
      </div>
    </div>
  );
}
