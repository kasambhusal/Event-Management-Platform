import React from "react";
import { ClockCircleOutlined } from "@ant-design/icons";
import { formatDistanceToNow } from "date-fns";

interface EventTimeProps {
  date: string; // ISO date string
}

const EventTime: React.FC<EventTimeProps> = ({ date }) => {
  const timeAgo = formatDistanceToNow(new Date(date), { addSuffix: true });

  return (
    <div className="flex items-center text-gray-600 text-sm">
      <ClockCircleOutlined className="mr-2 text-blue-800" />
      <span>{timeAgo}</span>
    </div>
  );
};

export default EventTime;
