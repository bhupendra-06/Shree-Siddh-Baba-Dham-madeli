import { Card } from "@/components/ui/card";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { useState } from "react";

export const CommunityCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const testimonials = [
    {
      name: "Rajesh Kumar",
      role: "Temple Committee Member",
      city: "Mumbai",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      testimonial: "Being part of this sacred ritual for 15 years has brought immense peace and prosperity to my family.",
      rating: 5
    },
    {
      name: "Priya Sharma",
      role: "Regular Devotee",
      city: "Delhi",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b1f8?w=150&h=150&fit=crop&crop=face",
      testimonial: "The divine energy during Navratri here is unmatched. My diya booking always brings good fortune.",
      rating: 5
    },
    {
      name: "Amit Patel",
      role: "Sponsor",
      city: "Gujarat",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      testimonial: "Sponsoring a day of celebration was the best decision. The blessings received are beyond words.",
      rating: 5
    },
    {
      name: "Sunita Gupta",
      role: "Devotee",
      city: "Rajasthan",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      testimonial: "Every year, lighting my diya here fills my heart with joy and my home with divine blessings.",
      rating: 5
    },
    {
      name: "Vikram Singh",
      role: "Long-time Devotee",
      city: "Punjab",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
      testimonial: "The tradition of diya lighting here has been passed down in my family for three generations.",
      rating: 5
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % Math.ceil(testimonials.length / 3));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + Math.ceil(testimonials.length / 3)) % Math.ceil(testimonials.length / 3));
  };

  const visibleTestimonials = testimonials.slice(currentSlide * 3, currentSlide * 3 + 3);

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            Our Devotee Community
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Hear from the hearts of our devoted community members
          </p>
        </div>

        <div className="relative">
          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-3 bg-white shadow-card rounded-full hover:shadow-temple transition-all duration-300 -translate-x-4"
          >
            <ChevronLeft className="h-6 w-6 text-primary" />
          </button>
          
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-3 bg-white shadow-card rounded-full hover:shadow-temple transition-all duration-300 translate-x-4"
          >
            <ChevronRight className="h-6 w-6 text-primary" />
          </button>

          {/* Testimonials Grid */}
          <div className="grid md:grid-cols-3 gap-6 mx-8">
            {visibleTestimonials.map((testimonial, index) => (
              <Card key={index} className="p-6 text-center bg-gradient-card border-0 shadow-card hover:shadow-temple transition-all duration-300 group">
                {/* Profile Image */}
                <div className="relative mb-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-20 h-20 rounded-full mx-auto object-cover border-4 border-primary/20 group-hover:border-primary/40 transition-all duration-300"
                  />
                  <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-gradient-primary rounded-full p-2">
                    <Star className="h-4 w-4 text-white fill-current" />
                  </div>
                </div>

                {/* Rating */}
                <div className="flex justify-center gap-1 mb-3">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-accent fill-current" />
                  ))}
                </div>

                {/* Testimonial */}
                <blockquote className="text-muted-foreground italic mb-4 leading-relaxed">
                  "{testimonial.testimonial}"
                </blockquote>

                {/* Profile Info */}
                <div>
                  <h4 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                    {testimonial.name}
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    {testimonial.role}
                  </p>
                  <p className="text-xs text-accent font-medium">
                    {testimonial.city}
                  </p>
                </div>
              </Card>
            ))}
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-8">
            {[...Array(Math.ceil(testimonials.length / 3))].map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentSlide ? 'bg-primary shadow-diya' : 'bg-muted hover:bg-primary/50'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};