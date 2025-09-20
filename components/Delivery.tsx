import React, { useState, useEffect } from "react";

const FeatureSlider = () => {
  const slides = [
    {
      img: "https://img.icons8.com/color/96/000000/cash-in-hand.png",
      text: " الدفع عند الاستلام"
    },
    {
      img: "https://img.icons8.com/fluency/48/delivery-scooter.png",
      text: " توصيل سريع ومجاني"
    },
    {
      img: "https://img.icons8.com/color/96/000000/guarantee.png",
      text: " ضمان على الجودة"
    },
    {
      img: "https://img.icons8.com/?size=100&id=116989&format=png&color=000000",
      text: " خدمة العملاء متوفرة"
    }
  ];

  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent(prev => (prev + 1) % slides.length);
    }, 4000); // كل 4 ثواني

    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <div style={styles.container}>
      <div style={styles.sliderContainer}>
        {slides.map((slide, index) => (
          <div
            key={index}
            style={{
              ...styles.slide,
              opacity: index === current ? 1 : 0,
              transform:
                index === current ? "translateY(0)" : "translateY(20px)",
              zIndex: index === current ? 2 : 1
            }}
          >
            <img src={slide.img} alt={slide.text} style={styles.image} />
            <p style={styles.text}>{slide.text}</p>
          </div>
        ))}
      </div>

      {/* Indicators */}
      <div style={styles.indicators}>
        {slides.map((_, index) => (
          <span
            key={index}
            style={{
              ...styles.dot,
              backgroundColor: index === current ? "#ff6b6b" : "#ddd"
            }}
          />
        ))}
      </div>
    </div>
  );
};

// ستايل محسّن
const styles: {
  container: React.CSSProperties;
  sliderContainer: React.CSSProperties;
  slide: React.CSSProperties;
  image: React.CSSProperties;
  text: React.CSSProperties;
  indicators: React.CSSProperties;
  dot: React.CSSProperties;
} = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "20px"
  },
  sliderContainer: {
    position: "relative",
    width: "320px",
    height: "220px",
    margin: "auto",
    overflow: "hidden",
    borderRadius: "20px",
    background: "linear-gradient(135deg, #f9f9f9, #f1f1f1)",
    boxShadow: "0 8px 25px rgba(0,0,0,0.15)"
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
    transition: "all 0.9s ease",
    padding: "10px"
  },
  image: {
    width: "85px",
    height: "85px",
    marginBottom: "15px",
    filter: "drop-shadow(0 4px 6px rgba(0,0,0,0.2))"
  },
  text: {
    fontSize: "20px",
    fontWeight: 600,
    color: "#333",
    textAlign: "center",
    lineHeight: "1.5"
  },
  indicators: {
    marginTop: "15px",
    display: "flex",
    gap: "8px"
  },
  dot: {
    width: "12px",
    height: "12px",
    borderRadius: "50%",
    transition: "background-color 0.3s ease"
  }
};

export default FeatureSlider;
