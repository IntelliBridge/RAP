import React from 'react';
import './donutchart.scss';

interface ChartData {
  label: string;
  value: number;
  color: string;
}

interface DonutChartProps {
  outerData: ChartData[];
  innerData: ChartData[];
  size?: number;
  outerThickness?: number;
  innerThickness?: number;
  title?: string;
}

export const WellnessChart: React.FC<DonutChartProps> = ({
  outerData,
  innerData,
  size = 200,
  outerThickness = 40,
  innerThickness = 60,
  title = "Title"
}) => {
  const center = size / 2;
  const radius = center - Math.max(outerThickness, innerThickness) / 2;
  const holeRadius = radius - Math.max(outerThickness, innerThickness); // Calculate radius for the center hole

  const createArcPath = (thickness: number, percentage: number): string => {
    const startAngle = -90; // Start from top
    const angle = (percentage / 100) * 360;
    const endAngle = startAngle + angle;
    
    const outerR = radius;
    const innerR = radius - thickness;
    
    // Convert angles to radians for calculations
    const startRad = (startAngle * Math.PI) / 180;
    const endRad = (endAngle * Math.PI) / 180;
    
    // Calculate points
    const outerStartX = center + outerR * Math.cos(startRad);
    const outerStartY = center + outerR * Math.sin(startRad);
    const outerEndX = center + outerR * Math.cos(endRad);
    const outerEndY = center + outerR * Math.sin(endRad);
    
    const innerStartX = center + innerR * Math.cos(startRad);
    const innerStartY = center + innerR * Math.sin(startRad);
    const innerEndX = center + innerR * Math.cos(endRad);
    const innerEndY = center + innerR * Math.sin(endRad);
    
    const largeArcFlag = angle > 180 ? 1 : 0;
    
    return [
      `M ${outerStartX} ${outerStartY}`, // Move to start point
      `A ${outerR} ${outerR} 0 ${largeArcFlag} 1 ${outerEndX} ${outerEndY}`, // Outer arc
      `L ${innerEndX} ${innerEndY}`, // Line to inner circle
      `A ${innerR} ${innerR} 0 ${largeArcFlag} 0 ${innerStartX} ${innerStartY}`, // Inner arc
      'Z' // Close path
    ].join(' ');
  };

  return (
    <div className="relative wellness-chart">
        <div className='chart-title'>
            {title}
        </div>
      <div className='donut-chart-container flex'> 
      <div className='donut-chart'>
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
          {/* Background circle */}
          <circle
            cx={center}
            cy={center}
            r={radius}
            fill="#f3f4f6"
          />
          
          {/* White center hole */}
          <circle
            cx={center}
            cy={center}
            r={holeRadius}
            fill="white"
          />
          
          {/* Background rings */}
          <path
            d={createArcPath(innerThickness, 100)}
            fill="#e5e7eb"
            className="opacity-20"
          />
          <path
            d={createArcPath(outerThickness, 100)}
            fill="#e5e7eb"
            className="opacity-20"
          />
          
          {/* Value rings - Pink ring first (behind), then Blue ring on top */}
          <path
            d={createArcPath(innerThickness, innerData[0].value)}
            fill={innerData[0].color}
            className="transition-all duration-300 hover:opacity-80"
          >
            <title>{`${innerData[0].label}: ${innerData[0].value}%`}</title>
          </path>
          <path
            d={createArcPath(outerThickness, outerData[0].value)}
            fill={outerData[0].color}
            className="transition-all duration-300 hover:opacity-80"
          >
            <title>{`${outerData[0].label}: ${outerData[0].value}%`}</title>
          </path>
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="text-2xl font-bold">
              {outerData[0].value}%
            </div>
          </div>
        </div>
        </div>
        <div className="mt-6 grid grid-cols-2 gap-4">
          <div>
            <div className="donut-legend">
              <div
                className="w-4 h-4 rounded-full"
                style={{ backgroundColor: outerData[0].color }}
              />
              <span className="text-sm you">
                <span className='outer-dot' style={{ backgroundColor: outerData[0].color }}></span>{outerData[0].label} ({outerData[0].value}%)
              </span>
            </div>
          </div>
          <div>
            <div className="donut-legend">
              <div
                className="w-4 h-4 rounded-full"
                style={{ backgroundColor: innerData[0].color }}
              />
              <span className="text-sm">
              <span className='outer-dot' style={{ backgroundColor: innerData[0].color }}></span> {innerData[0].label} ({innerData[0].value}%)
              </span>
            </div>
          </div>
        </div>
        </div>  
    </div>
    
  );
};

export default WellnessChart