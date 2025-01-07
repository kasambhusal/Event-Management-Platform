"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import EventCard from "./EventCard";
import EventAdd from "./EventAdd";

const initialEvents = [
  {
    id: 1,
    title: "Annual Tech Conference",
    description: "A gathering for tech enthusiasts to explore new innovations.",
    date: "2025-01-06T10:30:00Z",
    location: "Kathmandu, Nepal",
  },
  {
    id: 2,
    title: "Coding Workshop",
    description: "Learn the fundamentals of React and TypeScript.",
    date: "2025-01-05T14:00:00Z",
    location: "Bhaktapur, Nepal",
  },
];

function Event() {
  const [events, setEvents] = useState(initialEvents);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const handleDelete = (id: number) => {
    setEvents(events.filter((event) => event.id !== id));
  };

  const handleAdd = (newEvent: any) => {
    setEvents([newEvent, ...events]);
  };

  const handleUpdate = () => {};

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="w-screen h-[92vh] bg-gray-500  flex justify-center items-center p-1">
        <div
          className="w-full h-full bg-blue-100 flex flex-col items-center"
          style={{ borderRadius: "15px", overflowY: "scroll" }}
        >
          {/* Add Event Button */}
          <div className="w-[98%] sm:w-[95%] md:w-[60%] flex justify-end pt-4">
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => setIsAddModalOpen(true)}
              className="bg-blue-800 rounded-full h-10 flex items-center"
            >
              Add Event
            </Button>
          </div>

          {/* Events List */}
          <div className="w-[98%] sm:w-[95%] md:w-[60%] flex flex-col py-4">
            <AnimatePresence>
              {events.map((event) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <EventCard
                    id={event.id}
                    title={event.title}
                    description={event.description}
                    date={event.date}
                    location={event.location}
                    onDelete={handleDelete}
                    onUpdate={handleUpdate}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Add Event Modal */}
          <EventAdd
            isOpen={isAddModalOpen}
            onClose={() => setIsAddModalOpen(false)}
            onAdd={handleAdd}
          />
        </div>
      </div>
    </motion.div>
  );
}

export default Event;
