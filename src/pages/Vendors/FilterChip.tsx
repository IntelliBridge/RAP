import React from 'react';
import RemoveIcon from "../../assets/icons/x.svg";
import { Grid } from "@trussworks/react-uswds";
import "./FilterChip.scss";

interface FilterChipProps {
  name: string;
  unstyled?: boolean;
  onRemove?: () => void;
}

const FilterChip: React.FC<FilterChipProps> = ({ name, unstyled, onRemove }) => {
  return (
    <Grid col={6}>
      <div className={`filter-chip ${unstyled ? "unstyled" : ""}`}>
        {name}
        {onRemove && (
          <img 
            src={RemoveIcon} alt="Remove Chip" 
            onClick={onRemove} 
            aria-label={`${name} Filter Chip`}
          />
        )}
      </div>
    </Grid>
  );
};

export default FilterChip;
