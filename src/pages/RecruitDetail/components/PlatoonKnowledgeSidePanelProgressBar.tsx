import React from 'react';
import './kgprogress.scss'

interface ProgressProps {
  label: string;
  value: number;
  color?: string;
}

const getColorClass = (value: number): string => {
  if (value >= 90) return 'green-progress';
  if (value >= 70) return 'yellow-progress';
  if (value >= 50) return 'red-progress';
};

export const SidePanelProgress: React.FC<ProgressProps> = ({ 
  label, 
  value, 
  color 
}) => {
  const progressColor = color || getColorClass(value);

  return (
    <div className="side-panel-progress">
      <div className="flex justify-between mb-1">
        <span className="text-sm font-medium text-gray-700">{label}</span>
      </div>
      <div className={`bg-gray-200`}>
        <div
          className={`${progressColor} progress-bar`}
          style={{ width: `${value}%` }}
        >
        </div>
      </div>
    </div>
  );
};