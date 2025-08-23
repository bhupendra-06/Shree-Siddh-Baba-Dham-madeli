// components/GoogleMap.tsx
"use client";

export default function GoogleMapComponent() {
  return (
    <div className="my-10 w-full h-[300px] rounded-xl shadow-md overflow-hidden">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d7457.167724789945!2d82.1283079!3d20.8485041!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a2f54768d7374e9%3A0x82c11b76bb459225!2sSiddh%20Baba%20Dham%20Madeli!5e0!3m2!1sen!2sin!4v1755957746382!5m2!1sen!2sin"
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen={true}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>
  );
}
