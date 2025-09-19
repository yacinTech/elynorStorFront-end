import React, { useState, useEffect } from "react";

const FeatureSlider = () => {
  const slides = [
    {
      img: "https://img.icons8.com/color/96/000000/cash-in-hand.png",
      text: "الدفع عند الاستلام "
    },
    {
      img: "https://img.icons8.com/fluency/48/delivery-scooter.png",
      text: " توصيل سريع ومجاني "
    },
    {
      img: "https://img.icons8.com/color/96/000000/guarantee.png",
      text: "ضمان على الجودة"
    },
    {
      img: "https://img.icons8.com/?size=100&id=116989&format=png&color=000000",
      text: "خدمة العملاء متوفرة"
    }
  ];

  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent(prev => (prev + 1) % slides.length);
    }, 3000); // تغيير كل 3 ثواني

    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <div style={styles.sliderContainer}>
      {slides.map((slide, index) => (
        <div
          key={index}
          style={{
            ...styles.slide,
            opacity: index === current ? 1 : 0,
            transform: index === current ? "scale(1)" : "scale(0.95)",
            zIndex: index === current ? 2 : 1
          }}
        >
          <img src={slide.img} alt={slide.text} style={styles.image} />
          <p style={styles.text}>{slide.text}</p>
        </div>
      ))}
    </div>
  );
};

// ستايل مدمج
const styles: {
  sliderContainer: React.CSSProperties;
  slide: React.CSSProperties;
  image: React.CSSProperties;
  text: React.CSSProperties;
} = {
  sliderContainer: {
    position: "relative",
    width: "300px",
    height: "200px",
    margin: "auto",
    overflow: "hidden",
    borderRadius: "15px",
    boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
    backgroundColor: "#fff"
  },
  slide: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    transition: "all 0.8s ease",
  },
  image: {
    width: "80px",
    height: "80px",
    marginBottom: "10px"
  },
  text: {
    fontSize: "18px",
    fontWeight: "bold",
    color: "#333",
    textAlign: "center"
  }
};

export default FeatureSlider;
