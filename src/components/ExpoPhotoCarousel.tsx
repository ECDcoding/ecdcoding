import vrStudents from "@/assets/expo/vr-students.jpg";
import boyTv from "@/assets/expo/boy-tv.jpg";
import kidTechGlasses from "@/assets/expo/kid-tech-glasses.jpg";
import futuristicVr from "@/assets/expo/futuristic-vr.jpg";
import girlBooks from "@/assets/expo/girl-books.jpg";
import africanKidsBlocks from "@/assets/expo/african-kids-blocks.jpg";
import adorableKid from "@/assets/expo/adorable-kid.jpg";

const photos = [
  { src: vrStudents, alt: "Students exploring virtual reality at the ECD Coding and Robotics Expo" },
  { src: boyTv, alt: "Young boy learning coding basics on a screen" },
  { src: kidTechGlasses, alt: "Child wearing tech glasses during a robotics session" },
  { src: futuristicVr, alt: "Futuristic virtual reality learning experience" },
  { src: girlBooks, alt: "Girl reading books alongside technology learning" },
  { src: africanKidsBlocks, alt: "African children building with coding blocks" },
  { src: adorableKid, alt: "Young learner smiling during a coding lesson" },
];

const ExpoPhotoCarousel = () => {
  const loop = [...photos, ...photos];

  return (
    <section className="w-full py-12 overflow-hidden">
      <div className="group relative w-full overflow-hidden">
        <div className="flex w-max gap-4 animate-[expo-scroll_40s_linear_infinite] group-hover:[animation-play-state:paused]">
          {loop.map((photo, i) => (
            <img
              key={`${photo.src}-${i}`}
              src={photo.src}
              alt={photo.alt}
              loading="lazy"
              className="h-40 sm:h-56 w-auto rounded-xl object-cover border border-border shadow-md transition-transform duration-300 hover:scale-105"
            />
          ))}
        </div>
      </div>

      <style>{`@keyframes expo-scroll { from { transform: translateX(0); } to { transform: translateX(-50%); } }`}</style>
    </section>
  );
};

export default ExpoPhotoCarousel;
