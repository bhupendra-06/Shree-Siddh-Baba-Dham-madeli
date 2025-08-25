// import { Header } from "@/components/Header";
// import { Footer } from "@/components/Footer";
// import { Button } from "@/components/ui/button";
// import { Card } from "@/components/ui/card";
// import { Tabs, TabsContent } from "@/components/ui/tabs";
// import { Camera, Play, Calendar, Heart, ArrowLeft, ArrowRight } from "lucide-react";
// import { useState } from "react";
// import { useParams, Link } from "react-router-dom";
// import diyaLight from "@/assets/diya-light.jpg";
// import diyaRows from "@/assets/diya-rows.jpg";
// import templeHero from "@/assets/temple-hero.jpg";

// const Gallery = () => {
//   const [selectedImage, setSelectedImage] = useState<string | null>(null);
//   const [currentImageIndex, setCurrentImageIndex] = useState(0);
//   const [activeImages, setActiveImages] = useState<any[]>([]); // ✅ store current event's images
//   const { eventId } = useParams();

//   // Event-based gallery organization
//   const events = {
//     "navratri-2024": {
//       title: "Navratri 2024 Celebration",
//       description: "Nine divine nights of celebration and devotion",
//       images: [
//         { src: templeHero, title: "Navratri Evening Prayers", description: "Divine atmosphere during evening prayers" },
//         { src: diyaLight, title: "Sacred Diya Lighting", description: "Devotees lighting diyas with devotion" },
//         { src: diyaRows, title: "Thousand Diyas Illumination", description: "Spectacular view of illuminated temple" },
//         { src: templeHero, title: "Temple Morning Aarti", description: "Morning prayers and rituals" },
//         { src: diyaLight, title: "Devotee Prayers", description: "Faithful devotees in prayer" },
//         { src: diyaRows, title: "Festival Celebration", description: "Community celebrating together" }
//       ]
//     },
//     "navratri-2023": {
//       title: "Navratri 2023 Memories",
//       description: "Cherished moments from previous year's celebration",
//       images: [
//         { src: diyaRows, title: "Grand Diya Display 2023", description: "Beautiful diya arrangements" },
//         { src: templeHero, title: "Temple Decoration", description: "Festive temple decorations" },
//         { src: diyaLight, title: "Evening Ceremonies", description: "Sacred evening rituals" },
//         { src: diyaRows, title: "Community Gathering", description: "Devotees coming together" }
//       ]
//     },
//     "diya-lighting": {
//       title: "Diya Lighting Ceremony",
//       description: "Sacred ritual of lighting diyas",
//       images: [
//         { src: diyaLight, title: "Individual Diya Lighting", description: "Personal moments of devotion" },
//         { src: diyaRows, title: "Mass Diya Lighting", description: "Community participation" },
//         { src: templeHero, title: "Temple Illumination", description: "Temple glowing with diyas" }
//       ]
//     }
//   };

//   const videos = [
//     { type: "video", thumbnail: templeHero, title: "Navratri 2024 Highlights", duration: "5:32", views: "1.2K" },
//     { type: "video", thumbnail: diyaLight, title: "Diya Lighting Ceremony", duration: "3:45", views: "856" },
//     { type: "video", thumbnail: diyaRows, title: "Temple Morning Prayers", duration: "8:15", views: "2.1K" }
//   ];

//   const openLightbox = (imageSrc: string, images: any[], index: number) => {
//     setSelectedImage(imageSrc);
//     setCurrentImageIndex(index);
//     setActiveImages(images); // ✅ use current event's images
//   };

//   const closeLightbox = () => {
//     setSelectedImage(null);
//     setActiveImages([]);
//   };

//   const navigateImage = (direction: "prev" | "next", images: any[]) => {
//     if (direction === "prev") {
//       const newIndex = currentImageIndex > 0 ? currentImageIndex - 1 : images.length - 1;
//       setCurrentImageIndex(newIndex);
//       setSelectedImage(images[newIndex].src);
//     } else {
//       const newIndex = currentImageIndex < images.length - 1 ? currentImageIndex + 1 : 0;
//       setCurrentImageIndex(newIndex);
//       setSelectedImage(images[newIndex].src);
//     }
//   };

//   // If viewing a specific event
//   if (eventId && events[eventId as keyof typeof events]) {
//     const event = events[eventId as keyof typeof events];
//     return (
//       <div className="min-h-screen bg-background">
//         <Header />

//         {/* Event Header */}
//         <section className="py-24 pt-32 bg-gradient-to-br from-primary/5 to-secondary/5">
//           <div className="container mx-auto px-4">
//             <Link
//               to="/gallery"
//               className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors mb-6"
//             >
//               <ArrowLeft className="h-4 w-4" />
//               Back to Gallery
//             </Link>

//             <div className="text-center">
//               <h1 className="font-display text-3xl md:text-5xl font-bold text-foreground mb-4">
//                 {event.title}
//               </h1>
//               <p className="text-xl text-muted-foreground max-w-2xl mx-auto">{event.description}</p>
//             </div>
//           </div>
//         </section>

//         {/* Event Gallery */}
//         <section className="py-16">
//           <div className="container mx-auto px-4">
//             <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
//               {event.images.map((image, index) => (
//                 <Card
//                   key={index}
//                   className="group relative overflow-hidden rounded-xl shadow-card hover:shadow-temple transition-all duration-300 cursor-pointer hover:scale-105"
//                   onClick={() => openLightbox(image.src, event.images, index)}
//                 >
//                   <div className="aspect-square relative">
//                     <img
//                       src={image.src}
//                       alt={image.title}
//                       className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
//                     />
//                     <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

//                     <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
//                       <h3 className="font-semibold text-white text-sm mb-1">{image.title}</h3>
//                       <p className="text-white/80 text-xs">{image.description}</p>
//                     </div>
//                   </div>
//                 </Card>
//               ))}
//             </div>
//           </div>
//         </section>

//         {/* Lightbox */}
//         {selectedImage && (
//           <div
//             className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
//             onClick={closeLightbox}
//           >
//             <div className="relative max-w-6xl max-h-full w-full">
//               <img
//                 src={selectedImage}
//                 alt="Gallery Image"
//                 className="max-w-full max-h-full object-contain rounded-lg mx-auto block"
//                 onClick={(e) => e.stopPropagation()}
//               />

//               {/* Navigation Controls */}
//               <button
//                 onClick={(e) => {
//                   e.stopPropagation();
//                   navigateImage("prev", activeImages);
//                 }}
//                 className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-colors"
//               >
//                 <ArrowLeft className="h-6 w-6" />
//               </button>

//               <button
//                 onClick={(e) => {
//                   e.stopPropagation();
//                   navigateImage("next", activeImages);
//                 }}
//                 className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-colors"
//               >
//                 <ArrowRight className="h-6 w-6" />
//               </button>

//               {/* Close Button */}
//               <button
//                 onClick={closeLightbox}
//                 className="absolute top-4 right-4 w-10 h-10 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-colors"
//               >
//                 ×
//               </button>

//               {/* Image Info */}
//               <div className="absolute bottom-4 left-4 right-4 bg-black/50 backdrop-blur-sm rounded-lg p-4 text-white">
//                 <div className="text-center">
//                   <h3 className="font-semibold mb-1">{activeImages[currentImageIndex]?.title}</h3>
//                   <p className="text-white/80 text-sm">
//                     {currentImageIndex + 1} of {activeImages.length}
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}

//         <Footer />
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-background">
//       <Header />

//       {/* Hero Section */}
//       <section className="py-24 pt-32 bg-gradient-to-br from-primary/5 to-secondary/5">
//         <div className="container mx-auto px-4 text-center">
//           <div className="inline-flex items-center gap-2 bg-primary/10 backdrop-blur-sm border border-primary/20 rounded-full px-6 py-3 mb-6">
//             <Camera className="h-5 w-5 text-primary" />
//             <span className="font-medium text-primary">Sacred Memories</span>
//           </div>

//           <h1 className="font-display text-4xl md:text-6xl font-bold text-foreground mb-6">Temple Gallery</h1>

//           <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
//             Witness the divine beauty of our Navratri celebrations and sacred rituals
//           </p>
//         </div>
//       </section>

//       {/* Featured Events */}
//       <section className="py-20">
//         <div className="container mx-auto px-4">
//           <div className="mb-16">
//             <div className="text-center mb-12">
//               <h2 className="font-display text-3xl font-bold text-foreground mb-4">Featured Events</h2>
//               <p className="text-muted-foreground">Explore our most memorable celebrations</p>
//             </div>

//             <div className="grid md:grid-cols-3 gap-6 mb-12">
//               {Object.entries(events).map(([key, event]) => (
//                 <Link key={key} to={`/gallery/${key}`}>
//                   <Card className="group overflow-hidden rounded-xl shadow-card hover:shadow-temple transition-all duration-300 hover:scale-105">
//                     <div className="aspect-[4/3] relative">
//                       <img
//                         src={event.images[0].src}
//                         alt={event.title}
//                         className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
//                       />
//                       <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
//                       <div className="absolute bottom-0 left-0 right-0 p-6">
//                         <h3 className="font-display text-xl font-bold text-white mb-2">{event.title}</h3>
//                         <p className="text-white/80 text-sm mb-3">{event.description}</p>
//                         <div className="flex items-center justify-between">
//                           <span className="text-white/70 text-xs">{event.images.length} photos</span>
//                           <ArrowRight className="h-4 w-4 text-white group-hover:translate-x-1 transition-transform" />
//                         </div>
//                       </div>
//                     </div>
//                   </Card>
//                 </Link>
//               ))}
//             </div>
//           </div>
//         </div>
//       </section>

//       <Footer />
//     </div>
//   );
// };

// export default Gallery;





































import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Camera, Play, Calendar, Heart, ArrowLeft, ArrowRight } from "lucide-react";
import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import diyaLight from "@/assets/diya-light.jpg";
import diyaRows from "@/assets/diya-rows.jpg";
import templeHero from "@/assets/temple-hero.jpg";

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { eventId } = useParams();

  // Event-based gallery organization
  const events = {
    "navratri-2024": {
      title: "Navratri 2024 Celebration",
      description: "Nine divine nights of celebration and devotion",
      images: [
        { src: templeHero, title: "Navratri Evening Prayers", description: "Divine atmosphere during evening prayers" },
        { src: diyaLight, title: "Sacred Diya Lighting", description: "Devotees lighting diyas with devotion" },
        { src: diyaRows, title: "Thousand Diyas Illumination", description: "Spectacular view of illuminated temple" },
        { src: templeHero, title: "Temple Morning Aarti", description: "Morning prayers and rituals" },
        { src: diyaLight, title: "Devotee Prayers", description: "Faithful devotees in prayer" },
        { src: diyaRows, title: "Festival Celebration", description: "Community celebrating together" }
      ]
    },
    "navratri-2023": {
      title: "Navratri 2023 Memories",
      description: "Cherished moments from previous year's celebration",
      images: [
        { src: diyaRows, title: "Grand Diya Display 2023", description: "Beautiful diya arrangements" },
        { src: templeHero, title: "Temple Decoration", description: "Festive temple decorations" },
        { src: diyaLight, title: "Evening Ceremonies", description: "Sacred evening rituals" },
        { src: diyaRows, title: "Community Gathering", description: "Devotees coming together" }
      ]
    },
    "diya-lighting": {
      title: "Diya Lighting Ceremony",
      description: "Sacred ritual of lighting diyas",
      images: [
        { src: diyaLight, title: "Individual Diya Lighting", description: "Personal moments of devotion" },
        { src: diyaRows, title: "Mass Diya Lighting", description: "Community participation" },
        { src: templeHero, title: "Temple Illumination", description: "Temple glowing with diyas" }
      ]
    }
  };

  const videos = [
    { type: "video", thumbnail: templeHero, title: "Navratri 2024 Highlights", duration: "5:32", views: "1.2K" },
    { type: "video", thumbnail: diyaLight, title: "Diya Lighting Ceremony", duration: "3:45", views: "856" },
    { type: "video", thumbnail: diyaRows, title: "Temple Morning Prayers", duration: "8:15", views: "2.1K" }
  ];

  const openLightbox = (imageSrc: string, images: any[], index: number) => {
    setSelectedImage(imageSrc);
    setCurrentImageIndex(index);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  const navigateImage = (direction: 'prev' | 'next', images: any[]) => {
    if (direction === 'prev') {
      const newIndex = currentImageIndex > 0 ? currentImageIndex - 1 : images.length - 1;
      setCurrentImageIndex(newIndex);
      setSelectedImage(images[newIndex].src);
    } else {
      const newIndex = currentImageIndex < images.length - 1 ? currentImageIndex + 1 : 0;
      setCurrentImageIndex(newIndex);
      setSelectedImage(images[newIndex].src);
    }
  };

  // If viewing a specific event
  if (eventId && events[eventId as keyof typeof events]) {
    const event = events[eventId as keyof typeof events];
    return (
      <div className="min-h-screen bg-background">
        <Header />
        
        {/* Event Header */}
        <section className="py-24 pt-32 bg-gradient-to-br from-primary/5 to-secondary/5">
          <div className="container mx-auto px-4">
            <Link to="/gallery" className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors mb-6">
              <ArrowLeft className="h-4 w-4" />
              Back to Gallery
            </Link>
            
            <div className="text-center">
              <h1 className="font-display text-3xl md:text-5xl font-bold text-foreground mb-4">
                {event.title}
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                {event.description}
              </p>
            </div>
          </div>
        </section>

        {/* Event Gallery */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
              {event.images.map((image, index) => (
                <Card
                  key={index}
                  className="group relative overflow-hidden rounded-xl shadow-card hover:shadow-temple transition-all duration-300 cursor-pointer hover:scale-105"
                  onClick={() => openLightbox(image.src, event.images, index)}
                >
                  <div className="aspect-square relative">
                    <img
                      src={image.src}
                      alt={image.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                      <h3 className="font-semibold text-white text-sm mb-1">{image.title}</h3>
                      <p className="text-white/80 text-xs">{image.description}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <Footer />
      </div>
    );
  }

  const GalleryGrid = ({ items }: { items: any[] }) => (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {items.map((item, index) => (
        <div
          key={index}
          className="group relative overflow-hidden rounded-2xl shadow-card hover:shadow-temple transition-all duration-500 cursor-pointer hover:scale-105"
          onClick={() => item.type === "image" && openLightbox(item.src, [], 0)}
        >
          <div className="aspect-[4/3] relative">
            <img
              src={item.src || item.thumbnail}
              alt={item.title}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            {item.type === "video" && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:bg-white/30 transition-colors">
                  <Play className="h-8 w-8 text-white ml-1" />
                </div>
              </div>
            )}
            
            <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
              <h3 className="font-semibold text-white mb-1">{item.title}</h3>
              <div className="flex items-center justify-between text-white/80 text-sm">
                <div className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  {item.year || "2024"}
                </div>
                {item.duration && (
                  <div className="flex items-center gap-1">
                    <Play className="h-3 w-3" />
                    {item.duration}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="py-24 pt-32 bg-gradient-to-br from-primary/5 to-secondary/5">
        <div className="container mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 bg-primary/10 backdrop-blur-sm border border-primary/20 rounded-full px-6 py-3 mb-6">
            <Camera className="h-5 w-5 text-primary" />
            <span className="font-medium text-primary">Sacred Memories</span>
          </div>
          
          <h1 className="font-display text-4xl md:text-6xl font-bold text-foreground mb-6">
            Temple Gallery
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Witness the divine beauty of our Navratri celebrations and sacred rituals
          </p>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          {/* Featured Events */}
          <div className="mb-16">
            <div className="text-center mb-12">
              <h2 className="font-display text-3xl font-bold text-foreground mb-4">
                Featured Events
              </h2>
              <p className="text-muted-foreground">
                Explore our most memorable celebrations
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6 mb-12">
              {Object.entries(events).map(([key, event]) => (
                <Link key={key} to={`/gallery/${key}`}>
                  <Card className="group overflow-hidden rounded-xl shadow-card hover:shadow-temple transition-all duration-300 hover:scale-105">
                    <div className="aspect-[4/3] relative">
                      <img
                        src={event.images[0].src}
                        alt={event.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <div className="absolute bottom-0 left-0 right-0 p-6">
                        <h3 className="font-display text-xl font-bold text-white mb-2">{event.title}</h3>
                        <p className="text-white/80 text-sm mb-3">{event.description}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-white/70 text-xs">{event.images.length} photos</span>
                          <ArrowRight className="h-4 w-4 text-white group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          </div>

          <Tabs defaultValue="videos" className="w-full">
            <TabsContent value="highlights" className="space-y-8">
              <div className="text-center mb-8">
                <h2 className="font-display text-2xl font-bold text-foreground mb-2">
                  Recent Highlights
                </h2>
                <p className="text-muted-foreground">
                  Latest moments from our temple activities
                </p>
              </div>
              
              <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                {events["navratri-2024"].images.slice(0, 8).map((image, index) => (
                  <Card
                    key={index}
                    className="group relative overflow-hidden rounded-xl shadow-card hover:shadow-temple transition-all duration-300 cursor-pointer hover:scale-105"
                    onClick={() => openLightbox(image.src, events["navratri-2024"].images, index)}
                  >
                    <div className="aspect-square relative">
                      <img
                        src={image.src}
                        alt={image.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      
                      <div className="absolute bottom-0 left-0 right-0 p-3 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                        <h3 className="font-semibold text-white text-xs mb-1">{image.title}</h3>
                        <p className="text-white/80 text-xs">{image.description}</p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>

          {/* Stats Section */}
          <div className="mt-20 grid md:grid-cols-4 gap-8 text-center">
            <div className="p-6">
              <div className="text-3xl font-bold text-primary mb-2">500+</div>
              <div className="text-muted-foreground">Photos Captured</div>
            </div>
            <div className="p-6">
              <div className="text-3xl font-bold text-primary mb-2">50+</div>
              <div className="text-muted-foreground">Video Moments</div>
            </div>
            <div className="p-6">
              <div className="text-3xl font-bold text-primary mb-2">10+</div>
              <div className="text-muted-foreground">Years Documented</div>
            </div>
            <div className="p-6">
              <div className="text-3xl font-bold text-primary mb-2">1000+</div>
              <div className="text-muted-foreground">Memories Shared</div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="mt-16 text-center">
            <div className="bg-gradient-primary rounded-3xl p-8 md:p-12 text-white shadow-temple max-w-2xl mx-auto">
              <Heart className="h-12 w-12 mx-auto mb-4" />
              <h3 className="font-display text-2xl font-bold mb-4">
                Be Part of Our Next Gallery
              </h3>
              <p className="text-white/90 mb-6">
                Join our upcoming Navratri celebration and create new memories that will be cherished forever
              </p>
              <Button variant="outline" size="lg" className="border-white/30 text-white hover:bg-white/10">
                Book Your Diya Today
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Lightbox */}
      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
          onClick={closeLightbox}
        >
          <div className="relative max-w-6xl max-h-full w-full">
            <img
              src={selectedImage}
              alt="Gallery Image"
              className="max-w-full max-h-full object-contain rounded-lg mx-auto block"
              onClick={(e) => e.stopPropagation()}
            />
            
            {/* Navigation Controls */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                navigateImage('prev', events["navratri-2024"].images);
              }}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-colors"
            >
              <ArrowLeft className="h-6 w-6" />
            </button>
            
            <button
              onClick={(e) => {
                e.stopPropagation();
                navigateImage('next', events["navratri-2024"].images);
              }}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-colors"
            >
              <ArrowRight className="h-6 w-6" />
            </button>
            
            {/* Close Button */}
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 w-10 h-10 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-colors"
            >
              ×
            </button>
            
            {/* Image Info */}
            <div className="absolute bottom-4 left-4 right-4 bg-black/50 backdrop-blur-sm rounded-lg p-4 text-white">
              <div className="text-center">
                <h3 className="font-semibold mb-1">
                  {events["navratri-2024"].images[currentImageIndex]?.title}
                </h3>
                <p className="text-white/80 text-sm">
                  {currentImageIndex + 1} of {events["navratri-2024"].images.length}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default Gallery;





