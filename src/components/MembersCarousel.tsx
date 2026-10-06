import React, { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import noUser from "@/assets/no-user.jpg";
import hitesh from "@/assets/hitesh-patel.png"
import prakash from "@/assets/prakash-dhruw.jpeg"


interface Member {
  name: string;
  position: string;
  mobile: string;
  image: string;
}

const members: Member[] = [
  {
    name: "Mohan Thakur",
    position: "Adhyaksh",
    mobile: "7804827109",
    image: noUser,
  },
  {
    name: "Purushottam Netam",
    position: "Sachiv",
    mobile: "9098412384",
    image: noUser,
  },
  {
    name: "Tej Ram Sahu",
    position: "Upadhyaksh",
    mobile: "6268678377",
    image: noUser,
  },
  {
    name: "Hitesh Patel",
    position: "Koshadhyaksh",
    mobile: "6265644983",
    image: hitesh,
  },
  {
    name: "Purushottam Kansari",
    position: "Sahsachiv",
    mobile: "**********",
    image: noUser,
  },
  {
    name: "Prakash Kumar Dhruw",
    position: "Sadasya",
    mobile: "7489206045",
    image: prakash,
  },
];

export default function MembersCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start" });

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

  // Autoplay
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
    const onPointerDown = () => stop();
    emblaApi.on("pointerDown", onPointerDown);
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
    <div className="relative px-4 sm:px-20 py-10 my-6 bg-blue-50">
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
                  src={member.image ? member.image : noUser}
                  alt={member.name}
                  className="mx-auto w-28 h-28 rounded-full object-cover border-2 border-gray-300"
                />
                <h3 className="text-lg mt-4 font-semibold text-center">
                  {member.name}
                </h3>

                {/* Position styled */}
                <p className="m-auto w-fit text-center mt-1 text-sm font-bold text-white bg-gradient-to-r from-orange-500 to-red-500 px-3 py-1 rounded-full">
                  {member.position}
                </p>

                {/* Mobile clickable */}
                {member.mobile ? (
                  <div className="mt-3 text-center">
                    <a
                      href={`tel:${member.mobile}`}
                      className="px-3 py-1 rounded bg-white text-sm text-blue-700 font-medium shadow hover:bg-blue-100"
                    >
                      📞 {member.mobile}
                    </a>
                  </div>
                ) : (
                  <p className="mt-3 text-center text-sm text-gray-500">
                    📞 Not Provided
                  </p>
                )}
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
