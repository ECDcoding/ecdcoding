import { cn } from "@/lib/utils";

interface MiniTrafficRobotProps {
  status: 'red' | 'yellow' | 'green';
  label?: string;
}

export const MiniTrafficRobot = ({ status, label }: MiniTrafficRobotProps) => {
  return (
    <div className="flex flex-col items-center gap-1">
      <div className="flex flex-col items-center gap-1 p-2 bg-gradient-to-b from-gray-800 to-gray-900 rounded-xl shadow-lg w-12">
        {/* Red Light */}
        <div
          className={cn(
            "w-8 h-8 rounded-full border-2 border-gray-700 transition-all duration-300 relative overflow-hidden",
            status === 'red' 
              ? "bg-gradient-radial from-red-400 via-red-500 to-red-700 shadow-[0_0_20px_rgba(239,68,68,0.8)]" 
              : "bg-red-900/30"
          )}
        >
          {status === 'red' && (
            <div className="absolute inset-1 bg-gradient-radial from-white/50 to-transparent rounded-full" />
          )}
        </div>

        {/* Yellow Light */}
        <div
          className={cn(
            "w-8 h-8 rounded-full border-2 border-gray-700 transition-all duration-300 relative overflow-hidden",
            status === 'yellow' 
              ? "bg-gradient-radial from-yellow-300 via-yellow-400 to-yellow-600 shadow-[0_0_20px_rgba(234,179,8,0.8)]" 
              : "bg-yellow-900/30"
          )}
        >
          {status === 'yellow' && (
            <div className="absolute inset-1 bg-gradient-radial from-white/50 to-transparent rounded-full" />
          )}
        </div>

        {/* Green Light */}
        <div
          className={cn(
            "w-8 h-8 rounded-full border-2 border-gray-700 transition-all duration-300 relative overflow-hidden",
            status === 'green' 
              ? "bg-gradient-radial from-green-300 via-green-400 to-green-600 shadow-[0_0_20px_rgba(34,197,94,0.8)]" 
              : "bg-green-900/30"
          )}
        >
          {status === 'green' && (
            <div className="absolute inset-1 bg-gradient-radial from-white/50 to-transparent rounded-full" />
          )}
        </div>
      </div>
      
      {label && (
        <p className={cn(
          "text-[10px] font-medium text-center",
          status === 'red' && "text-red-500",
          status === 'yellow' && "text-yellow-500",
          status === 'green' && "text-green-500"
        )}>
          {label}
        </p>
      )}
    </div>
  );
};
