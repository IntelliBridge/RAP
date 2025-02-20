import React from 'react';
import { Alert } from '@trussworks/react-uswds';
import './barwithchart.scss';


interface ProgressBarProps {
    value: number;
    max?: number;
  }
  
  const ProgressBar: React.FC<ProgressBarProps> = ({ value, max = 100 }) => {
    const normalizedValue = Math.min(Math.max(0, value), max);
    const percentage = (normalizedValue / max) * 100;
  
    const getAlertState = () => {
      if (percentage < 70) {
        return {
          show: true,
          type: 'error',
          message: 'High concern.',
        };
      } else if (percentage >= 70 && percentage < 80) {
        return {
          show: true,
          type: 'warning',
          message: 'Moderate concern.',
        };
      }
      return { show: false };
    };
  
    const alertState = getAlertState();
  
    const getProgressBarClass = () => {
      if (percentage < 70) return 'progress-bar-danger';
      if (percentage < 80) return 'progress-bar-warning';
      return 'progress-bar-success';
    };
  
    return (
      <div className="progress-container">
        {alertState.show && (
          <div className="alert-container">
            <Alert
              type={alertState.type}
              heading={alertState.heading}
              headingLevel="h4"
              slim
            >
              {alertState.message}
            </Alert>
          </div>
        )}
        <div className={getProgressBarClass() + ' progress-track'}>
          <div
            className='progress-bar'
            style={{ width: `${percentage}%` }}>
                {percentage.toFixed(0)}%
            </div>

        </div>
  
      </div>
    );
  }
  
  export default ProgressBar;