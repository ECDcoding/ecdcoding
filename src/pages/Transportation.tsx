import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import roadTransportVehicles from "@/assets/road-transport-vehicles.jpg";
import railTransportVehicles from "@/assets/rail-transport-vehicles.jpg";
import twoWheelVehicles from "@/assets/two-wheel-vehicles.jpg";
import fourWheelVehicles from "@/assets/four-wheel-vehicles.jpg";

const Transportation = () => {
  const navigate = useNavigate();

  return (
    <div className="fixed inset-0 bg-white z-[100] overflow-y-auto">
      <div className="min-h-screen flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-[#395B50] text-white">
          <h1 className="text-3xl font-bold text-yellow-400" style={{fontFamily: 'Bungee Shade, cursive'}}>
            Transportation
          </h1>
          <button 
            onClick={() => navigate('/lesson-vault-04-06')}
            className="text-white hover:text-yellow-400 transition-colors"
          >
            <X className="h-8 w-8" />
          </button>
        </div>
        
        {/* Content */}
        <div className="flex-1 p-8 max-w-6xl mx-auto">
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-4xl font-bold text-pink-400 mb-4" style={{fontFamily: 'Bungee Shade, cursive'}}>
                World of Transportation
              </h2>
              <p className="text-xl text-gray-700 mb-8">
                Discover different types of vehicles and how they help us move around!
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Road Transport */}
              <div className="bg-blue-50 p-6 rounded-lg shadow-lg">
                <h3 className="text-2xl font-bold text-blue-600 mb-4">Road Transport</h3>
                <div className="bg-white p-4 rounded-lg mb-4">
                  <img 
                    src={roadTransportVehicles} 
                    alt="Various road transport vehicles including cars, buses, and trucks" 
                    className="w-full h-auto rounded-lg"
                  />
                </div>
                <p className="text-gray-700">
                  Cars, buses, and trucks travel on roads to take us to different places!
                </p>
              </div>

              {/* Rail Transport */}
              <div className="bg-green-50 p-6 rounded-lg shadow-lg">
                <h3 className="text-2xl font-bold text-green-600 mb-4">Rail Transport</h3>
                <div className="bg-white p-4 rounded-lg mb-4">
                  <img 
                    src={railTransportVehicles} 
                    alt="Different types of rail vehicles including trains and trams" 
                    className="w-full h-auto rounded-lg"
                  />
                </div>
                <p className="text-gray-700">
                  Trains run on tracks and can carry many people at once!
                </p>
              </div>

              {/* Two-Wheel Vehicles */}
              <div className="bg-yellow-50 p-6 rounded-lg shadow-lg">
                <h3 className="text-2xl font-bold text-yellow-600 mb-4">Two-Wheel Vehicles</h3>
                <div className="bg-white p-4 rounded-lg mb-4">
                  <img 
                    src={twoWheelVehicles} 
                    alt="Two-wheeled vehicles including bicycles and motorcycles" 
                    className="w-full h-auto rounded-lg"
                  />
                </div>
                <p className="text-gray-700">
                  Bicycles and motorcycles have two wheels and are fun to ride!
                </p>
              </div>

              {/* Four-Wheel Vehicles */}
              <div className="bg-purple-50 p-6 rounded-lg shadow-lg">
                <h3 className="text-2xl font-bold text-purple-600 mb-4">Four-Wheel Vehicles</h3>
                <div className="bg-white p-4 rounded-lg mb-4">
                  <img 
                    src={fourWheelVehicles} 
                    alt="Four-wheeled vehicles showing different types of cars" 
                    className="w-full h-auto rounded-lg"
                  />
                </div>
                <p className="text-gray-700">
                  Cars and vans have four wheels for stability and comfort!
                </p>
              </div>
            </div>

            <div className="bg-pink-50 p-8 rounded-lg shadow-lg mt-8">
              <h3 className="text-2xl font-bold text-pink-600 mb-4 text-center">Fun Facts!</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-4xl mb-2">🚗</div>
                  <p className="font-semibold">Did you know?</p>
                  <p className="text-sm text-gray-600">The first cars were invented over 100 years ago!</p>
                </div>
                <div className="text-center">
                  <div className="text-4xl mb-2">🚂</div>
                  <p className="font-semibold">Speed Fact</p>
                  <p className="text-sm text-gray-600">Some trains can go faster than race cars!</p>
                </div>
                <div className="text-center">
                  <div className="text-4xl mb-2">🚲</div>
                  <p className="font-semibold">Green Transport</p>
                  <p className="text-sm text-gray-600">Bicycles are great for the environment!</p>
                </div>
              </div>
            </div>

            <div className="mt-8 text-center">
              <Button 
                onClick={() => navigate('/lesson-vault-04-06')}
                className="bg-pink-500 hover:bg-pink-600 text-white font-semibold px-8 py-4 rounded-full text-lg"
              >
                Back to Lesson Vault
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Transportation;
