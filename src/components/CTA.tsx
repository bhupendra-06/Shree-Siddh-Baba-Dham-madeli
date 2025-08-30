import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function CTA() {
  return (
    <div className="text-center">
      <Card className="p-8 md:p-12 bg-gradient-primary text-white border-0 shadow-temple max-w-2xl mx-auto">
        <h3 className="font-display text-2xl font-bold mb-4">
          Join Our Sacred Community
        </h3>
        <p className="text-white/90 mb-6">
          Book your diya today and see your name in next year's devotee list
        </p>
        <Link to={"/book-diya"}>
          <Button
            size="lg"
            className="bg-white text-orange-600 font-semibold hover:bg-orange-100 hover:scale-105 transition"
          >
            Book Your Diya Now
          </Button>
        </Link>
      </Card>
    </div>
  );
}
