import { CSSProperties } from "react";

const DateRenderer = ({ date, style }: { date: string; style: CSSProperties }) => {
  let launchDate = new Date(date);
  let launchDateFormat = launchDate.toLocaleString();

  return (
    <span className=" text-gray-200 text-sm" style={style}>
      {launchDateFormat}
    </span>
  );
};

export default DateRenderer;
