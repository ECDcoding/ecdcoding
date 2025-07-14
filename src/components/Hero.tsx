const Hero = () => {
  const letters = [
    { letter: "E", color: "text-brand-red", delay: "delay-0" },
    { letter: "C", color: "text-brand-green", delay: "delay-200" },
    { letter: "D", color: "text-brand-purple", delay: "delay-400" },
    { letter: "c", color: "text-primary", delay: "delay-600" },
    { letter: "o", color: "text-primary", delay: "delay-800" },
    { letter: "d", color: "text-primary", delay: "delay-1000" },
    { letter: "i", color: "text-primary", delay: "delay-1200" },
    { letter: "n", color: "text-primary", delay: "delay-1400" },
    { letter: "g", color: "text-primary", delay: "delay-1600" },
  ];

  return (
    <div className="text-center mb-8">
      <div className="text-6xl md:text-8xl font-black mb-4">
        {letters.map((item, index) => (
          <span
            key={index}
            className={`inline-block ${item.color} ${item.delay} animate-glow`}
            style={{ animationDelay: `${index * 0.2}s` }}
          >
            {item.letter}
          </span>
        ))}
      </div>
      <h1><div className="text-2xl md:text-3xl font-bold text-foreground">
        Empowering Tech Savvy Kids
      </div></h1>
    </div>
  );
};

export default Hero;