import React from 'react';

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

const ProgressBar = ({ currentStep = 1, totalSteps = 3 }: ProgressBarProps) => {
  const progress = (currentStep / totalSteps) * 100;

  return (
    <div className="w-full">
      <div className="relative">
        
        {/* Progress bar background */}
        <div className="flex h-2 mb-4 overflow-hidden rounded bg-[#0E464F]">
          {/* Active progress */}
          <div
            style={{ width: `${progress}%` }}
            className="flex flex-col justify-center overflow-hidden bg-[#24A0B5] rounded-full transition-all duration-500"
          />
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;