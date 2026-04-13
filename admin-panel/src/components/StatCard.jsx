import React from 'react';
import { TrendingUp } from 'lucide-react';

const StatCard = ({ title, value, subtitle }) => {
  return (
    <div className="card shadow-sm">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <small className="text-muted">{title}</small>
            <h4 className="mt-1 mb-0">{value}</h4>
            {subtitle && <small className="text-muted d-block">{subtitle}</small>}
          </div>
          <div className="text-success">
            <TrendingUp />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatCard;
