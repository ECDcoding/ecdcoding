import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import catReal from "@/assets/characters/cat-real.png";
import spiderReal from "@/assets/characters/spider-real.png";
import cowReal from "@/assets/characters/cow-real.png";
import creeperReal from "@/assets/characters/creeper-real.png";
import endermanReal from "@/assets/characters/enderman-real.png";
import evokerReal from "@/assets/characters/evoker-real.png";
import golemReal from "@/assets/characters/golem-real.png";
import horseReal from "@/assets/characters/horse-real.png";
import ocelotReal from "@/assets/characters/ocelot-real.png";
import pandaReal from "@/assets/characters/panda-real.png";
import skeletonReal from "@/assets/characters/skeleton-real.png";
import wolfReal from "@/assets/characters/wolf-real.png";
import squidReal from "@/assets/characters/squid-real.png";
import foxReal from "@/assets/characters/fox-real.png";
import villagerReal from "@/assets/characters/villager-real.png";

interface ObjectCharactersProps {
  onClose: () => void;
}

export const ObjectCharacters = ({ onClose }: ObjectCharactersProps) => {
  const [selectedCharacter, setSelectedCharacter] = useState(1);
  const [direction, setDirection] = useState<'left' | 'right'>('right');
  const [frameRate, setFrameRate] = useState(48);
  const [isMoving, setIsMoving] = useState(false);

  const handleSpriteClick = () => {
    setIsMoving(true);
    setTimeout(() => setIsMoving(false), 600);
  };

  const characters = [
    { id: 1, name: 'Cat', image: catReal, spriteImage: 'https://assets.codepen.io/36869/cat.webp', frames: 42, columns: 5, height: 5364, width: 2980 },
    { id: 2, name: 'Spider', image: spiderReal, spriteImage: 'https://assets.codepen.io/36869/spider.webp', frames: 28, columns: 5, height: 3576, width: 2980 },
    { id: 3, name: 'Cow', image: cowReal, spriteImage: 'https://assets.codepen.io/36869/cow.webp', frames: 60, columns: 5, height: 7152, width: 2980 },
    { id: 4, name: 'Creeper', image: creeperReal, spriteImage: 'https://assets.codepen.io/36869/creeper.webp', frames: 55, columns: 5, height: 6556, width: 2980 },
    { id: 5, name: 'Enderman', image: endermanReal, spriteImage: 'https://assets.codepen.io/36869/enderman.webp', frames: 55, columns: 5, height: 6556, width: 2980 },
    { id: 6, name: 'Evoker', image: evokerReal, spriteImage: 'https://assets.codepen.io/36869/evoker.webp', frames: 99, columns: 5, height: 11920, width: 2980 },
    { id: 7, name: 'Steel golem', image: golemReal, spriteImage: 'https://assets.codepen.io/36869/golem.webp', frames: 72, columns: 5, height: 8940, width: 2980 },
    { id: 8, name: 'Skeleton horse', image: horseReal, spriteImage: 'https://assets.codepen.io/36869/horse.webp', frames: 47, columns: 5, height: 5960, width: 2980 },
    { id: 9, name: 'Ocelot', image: ocelotReal, spriteImage: 'https://assets.codepen.io/36869/ocelot.webp', frames: 37, columns: 5, height: 4768, width: 2980 },
    { id: 10, name: 'Panda', image: pandaReal, spriteImage: 'https://assets.codepen.io/36869/panda.webp', frames: 88, columns: 5, height: 10728, width: 2980 },
    { id: 11, name: 'Skeleton', image: skeletonReal, spriteImage: 'https://assets.codepen.io/36869/skeleton.webp', frames: 65, columns: 5, height: 7748, width: 2980 },
    { id: 12, name: 'Wolf', image: wolfReal, spriteImage: 'https://assets.codepen.io/36869/wolf.webp', frames: 58, columns: 5, height: 7152, width: 2980 },
    { id: 13, name: 'Squid', image: squidReal, spriteImage: 'https://assets.codepen.io/36869/squid.webp', frames: 104, columns: 5, height: 12516, width: 2980 },
    { id: 14, name: 'Fox', image: foxReal, spriteImage: 'https://assets.codepen.io/36869/fox.webp', frames: 69, columns: 5, height: 8344, width: 2980 },
    { id: 15, name: 'Villager', image: villagerReal, spriteImage: 'https://assets.codepen.io/36869/villager.webp', frames: 37, columns: 5, height: 4768, width: 2980 },
  ];

  const selected = characters.find(c => c.id === selectedCharacter) || characters[0];

  return (
    <div className="fixed inset-0 bg-[#333] z-50 overflow-y-auto">
      <style>{`
        @font-face {
          font-family: 'Minecraft';
          src: url('https://assets.codepen.io/36869/MinecraftTen-VGORe.woff') format('woff');
        }
        
        @keyframes sprite-frame {
          to {
            --sprite-frame: ${selected.frames - 1};
          }
        }
        
        @property --sprite-frame {
          syntax: "<integer>";
          initial-value: 0;
          inherits: false;
        }
        
        .sprite-animation {
          --sprite-frame: 0;
          --sprite-columns: ${selected.columns};
          --sprite-height: ${selected.height};
          --sprite-width: ${selected.width};
          --sprite-frames: ${selected.frames};
          --sprite-target-width: 260;
          --sprite-frame-rate: ${frameRate};
          
          --sprite-sw: calc(var(--sprite-width) / var(--sprite-columns));
          --sprite-ar: calc(var(--sprite-target-width) / var(--sprite-sw));
          --sprite-uh: calc(var(--sprite-height) * var(--sprite-ar));
          --sprite-uw: calc(var(--sprite-width) * var(--sprite-ar));
          --sprite-r: ${Math.ceil(selected.frames / selected.columns)};
          --sprite-th: calc(var(--sprite-uh) / var(--sprite-r));
          --sprite-as: calc(var(--sprite-frames) / var(--sprite-frame-rate) * 1s);
          
          --row: calc(floor(var(--sprite-frame) / var(--sprite-columns)) * var(--sprite-th));
          --col: calc((var(--sprite-frame) - (floor(var(--sprite-frame) / var(--sprite-columns)) * var(--sprite-columns))) * var(--sprite-target-width));
          
          animation: sprite-frame var(--sprite-as) linear infinite;
          height: calc(1px * var(--sprite-th));
          width: calc(1px * var(--sprite-target-width));
          background-image: url('${selected.spriteImage}');
          background-size: calc(1px * var(--sprite-uw)) calc(1px * var(--sprite-uh));
          background-position: calc(-1px * var(--col)) calc(-1px * var(--row));
          transition: transform 0.2s ease;
        }
        
        .sprite-animation:hover {
          transform: scale(1.4);
        }
        
        @keyframes sprite-move {
          0%, 100% { transform: translateX(0) translateY(0); }
          25% { transform: translateX(-30px) translateY(-40px); }
          50% { transform: translateX(30px) translateY(-60px); }
          75% { transform: translateX(-20px) translateY(-40px); }
        }
        
        .sprite-moving {
          animation: sprite-move 0.6s ease-in-out;
        }
      `}</style>
      
      <div className="max-w-7xl mx-auto p-4 md:p-6">
        <header className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              onClick={onClose}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>
            <h1 
              className="text-2xl md:text-4xl font-bold text-white"
              style={{ 
                fontFamily: 'Minecraft, sans-serif',
                textShadow: '0 2px 0 black, 2px 0 0 black, 2px 2px 0 black, -2px -2px 0 black, 2px -2px 0 black, -2px 2px 0 black'
              }}
            >
              Pick your character
            </h1>
          </div>
          <div className="hidden md:flex items-end gap-4 opacity-50">
            <small className="text-white w-40 text-right">support keyboard arrows (while focus)</small>
            <kbd className="border-2 border-gray-600 shadow-[6px_6px_0_#222] text-xl font-semibold w-10 h-10 flex items-center justify-center bg-white">←</kbd>
            <kbd className="border-2 border-gray-600 shadow-[6px_6px_0_#222] text-xl font-semibold w-10 h-10 flex items-center justify-center bg-white">→</kbd>
          </div>
        </header>

        <main className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-8">
          {/* Characters Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2 p-2 bg-black shadow-[6px_6px_0_#222] border-2 border-gray-400">
            {characters.map((character) => (
              <div
                key={character.id}
                className={`relative bg-[#181818] overflow-hidden grid place-items-center ${
                  selectedCharacter === character.id ? 'bg-[#4c8ee1]' : ''
                }`}
              >
                <input
                  type="radio"
                  name="character"
                  value={character.id}
                  checked={selectedCharacter === character.id}
                  onChange={() => setSelectedCharacter(character.id)}
                  className="absolute inset-0 w-full h-full appearance-none cursor-pointer z-10 focus:outline-none checked:border-4 checked:border-double checked:border-black"
                  tabIndex={character.id}
                  onKeyDown={(e) => {
                    if (e.key === 'ArrowRight') {
                      e.preventDefault();
                      setSelectedCharacter(prev => prev < characters.length ? prev + 1 : 1);
                    } else if (e.key === 'ArrowLeft') {
                      e.preventDefault();
                      setSelectedCharacter(prev => prev > 1 ? prev - 1 : characters.length);
                    }
                  }}
                />
                <div className="pointer-events-none">
                  <img
                    src={character.image}
                    alt={character.name}
                    className={`max-w-[50px] md:max-w-[70px] max-h-[50px] md:max-h-[70px] w-auto transition-all ${
                      selectedCharacter === character.id 
                        ? 'scale-120 opacity-100' 
                        : 'opacity-75'
                    }`}
                    style={{
                      filter: selectedCharacter === character.id
                        ? 'drop-shadow(0px 1px 0px #ffda0e) drop-shadow(-1px 0px 0px #ffda0e) drop-shadow(1px 0px 0px #ffda0e)'
                        : 'drop-shadow(0px 1px 0px white) drop-shadow(-1px 0px 0px white) drop-shadow(1px 0px 0px white)'
                    }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Preview Panel */}
          <div className="lg:sticky lg:top-2 h-fit grid gap-2 p-2 bg-black border-2 border-[#4c8ee1] shadow-[6px_6px_0_#222]">
            <div 
              className="bg-[#adcbf1] text-center leading-10 font-bold text-xl"
              style={{ fontFamily: 'Minecraft, sans-serif' }}
            >
              {selected.name}
            </div>
            
            <div className="h-full w-full grid gap-2 place-items-center place-content-center">
              {/* Sprite Container */}
              <div className="relative bg-white h-full w-full min-h-[300px] grid place-items-center">
                <div className="absolute right-0 bottom-0 flex">
                  <input
                    type="radio"
                    name="direction"
                    checked={direction === 'left'}
                    onChange={() => setDirection('left')}
                    className="appearance-none w-[26px] h-7 before:content-['◀️'] before:text-xl before:opacity-25 before:cursor-pointer checked:before:opacity-50"
                  />
                  <input
                    type="radio"
                    name="direction"
                    checked={direction === 'right'}
                    onChange={() => setDirection('right')}
                    className="appearance-none w-[26px] h-7 before:content-['▶️'] before:text-xl before:opacity-25 before:cursor-pointer checked:before:opacity-50"
                  />
                </div>
                
                <div
                  className={`sprite-animation ${direction === 'left' ? 'scale-x-[-1]' : ''} ${isMoving ? 'sprite-moving' : ''} cursor-pointer`}
                  style={{
                    filter: 'drop-shadow(2px 4px 6px black)',
                    position: 'relative'
                  }}
                  onClick={handleSpriteClick}
                />
              </div>

              {/* Stats */}
              <div 
                className="bg-[#adcbf1] w-full p-2 text-sm"
                style={{ fontFamily: 'Minecraft, sans-serif' }}
              >
                <dl className="grid grid-cols-2">
                  <dt className="border-b border-[#99b3d3]">Columns:</dt>
                  <dd className="font-bold text-right border-b border-[#99b3d3]">{selected.columns}</dd>
                  
                  <dt className="border-b border-[#99b3d3]">Rows:</dt>
                  <dd className="font-bold text-right border-b border-[#99b3d3]">{Math.ceil(selected.frames / selected.columns)}</dd>
                  
                  <dt className="border-b border-[#99b3d3]">FPS:</dt>
                  <dd className="font-bold text-right border-b border-[#99b3d3]">
                    <select
                      value={frameRate}
                      onChange={(e) => setFrameRate(Number(e.target.value))}
                      className="bg-transparent border-0 outline-none font-bold text-[#2949c5]"
                      style={{ fontFamily: 'Minecraft, sans-serif' }}
                    >
                      <option value="12">12</option>
                      <option value="24">24</option>
                      <option value="36">36</option>
                      <option value="48">48</option>
                      <option value="64">64</option>
                      <option value="76">76</option>
                      <option value="100">100</option>
                    </select>
                  </dd>
                  
                  <dt>Frames:</dt>
                  <dd className="font-bold text-right">{selected.frames}</dd>
                </dl>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};
