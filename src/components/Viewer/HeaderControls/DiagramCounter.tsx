import type { ProgressIndicatorProps } from '../../../types/components';

export const DiagramCounter = ({ currentIndex, totalDiagrams }: ProgressIndicatorProps) => {
  return (
    <div className="flex items-center space-x-4">
      <div className="px-4 py-2 rounded-lg bg-gray-100">
        <span className="text-lg font-semibold text-gray-800">
          {currentIndex + 1}
        </span>
        <span className="text-sm text-gray-600">
          {' '}of {totalDiagrams}
        </span>
      </div>
    </div>
  );
};
