const Hero = ({ isHidden = false }: { isHidden?: boolean }) => {
  if (isHidden) return null;
  const letters = [
    { letter: "E", color: "text-brand-red", delay: "delay-0", static: true },
    { letter: "C", color: "text-brand-green", delay: "delay-200", static: true },
    { letter: "D", color: "text-brand-purple", delay: "delay-400", static: true },
    { letter: "c", color: "text-primary", delay: "delay-600", static: false },
    { letter: "o", color: "text-primary", delay: "delay-800", static: false },
    { letter: "d", color: "text-primary", delay: "delay-1000", static: false },
    { letter: "i", color: "text-primary", delay: "delay-1200", static: false },
    { letter: "n", color: "text-primary", delay: "delay-1400", static: false },
    { letter: "g", color: "text-primary", delay: "delay-1600", static: false },
  ];

  return (
    <div className="text-center mb-8">
      <div className="text-6xl md:text-8xl font-black mb-4">
        {letters.map((item, index) => (
          <span
            key={index}
            className={`inline-block ${item.color} ${item.static ? '' : `${item.delay} animate-glow`}`}
            style={item.static ? {} : { animationDelay: `${index * 0.5}s` }}
          >
            {item.letter}
          </span>
        ))}
      </div>
      <h1><div className="text-2xl md:text-3xl text-foreground">
        Empowering Tech Savvy Kids
      </div></h1>
    </div>
  );
};

export default Hero;