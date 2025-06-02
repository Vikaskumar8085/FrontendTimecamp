import React, { useState } from "react";
import { Calendar } from "lucide-react";
import { DateRange } from "react-date-range";
import { format } from "date-fns";
import "./DateRagePicker.scss";
import "react-date-range/dist/styles.css"; // core styles
import "react-date-range/dist/theme/default.css"; // theme styles

const DateRangePicker = () => {
  const [open, setOpen] = useState(false);
  const [range, setRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  const handleSelect = (ranges) => {
    setRange([ranges.selection]);
  };

  return (
    <div className="date-range-wrapper">
      <div className="date-range-picker" onClick={() => setOpen(!open)}>
        <span className="icon">
          <Calendar size={16} />
        </span>
        <span className="date-text">
          {format(range[0].startDate, "dd MMMM")} - {format(range[0].endDate, "dd MMMM yyyy")}
        </span>
      </div>

      {open && (
        <div className="calendar-popup">
          <DateRange
            editableDateInputs={true}
            onChange={handleSelect}
            moveRangeOnFirstSelection={false}
            ranges={range}
          />
        </div>
      )}
    </div>
  );
};

export default DateRangePicker;

