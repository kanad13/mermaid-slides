import type { ProgressBarProps } from '../../../types/components';

export const ProgressBar = ({ currentIndex, totalDiagrams }: ProgressBarProps) => {
  const progressPercentage = ((currentIndex + 1) / totalDiagrams) * 100;

  return (
    <div className="px-6 pb-3 bg-white">
      <div className="flex items-center space-x-3">
        <div className="flex-1 h-2 rounded-full overflow-hidden bg-gray-200">
          <div
            className="h-full bg-gradient-to-r from-blue-500 to-purple-600 transition-all duration-500 ease-out rounded-full"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
        <span className="text-sm font-medium min-w-[40px] text-right text-gray-500">
          {Math.round(progressPercentage)}%
        </span>
      </div>
    </div>
  );
};
