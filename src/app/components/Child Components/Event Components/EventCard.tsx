"use client";
import React, { useState } from "react";
import EventTime from "./EventTime";
import EventModify from "./EventModify";
import { motion, AnimatePresence } from "framer-motion";
import { deleteEvent } from "@/lib/actions/eventActions";
import { notification } from "antd";

// Define Event type
interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  userId: string;
}

interface EventCardProps {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  userId: string;
  currentUserId: string;
  userRole: "USER" | "ADMIN";
  onDelete: (id: string) => void;
  onUpdate: (updatedEvent: Event) => void; // Updated to Event type
}

const EventCard: React.FC<EventCardProps> = ({
  id,
  title,
  description,
  date,
  location,
  userId,
  currentUserId,
  userRole,
  onDelete,
  onUpdate,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isModifying, setIsModifying] = useState(false);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

  const toggleDescription = () => {
    setIsExpanded(!isExpanded);
  };

  const openModifyForm = () => {
    setIsModifying(true);
  };

  const closeModifyForm = () => {
    setIsModifying(false);
  };

  const handleDeleteClick = () => {
    setShowDeleteConfirmation(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      const response = await deleteEvent(id, currentUserId, userRole);
      if (response.success) {
        onDelete(id);
        notification.success({
          message: "Event Deleted",
          description: response.message,
        });
      } else {
        notification.error({
          message: "Error",
          description: response.message,
        });
      }
    } catch (error: unknown) {
      console.error("Error deleting event:", error);
      notification.error({
        message: "Error",
        description: "An unexpected error occurred while deleting the event.",
      });
    }
    setShowDeleteConfirmation(false);
  };

  const handleUpdate = (updatedEvent: Event) => {
    // Updated to Event type
    onUpdate(updatedEvent);
    setIsModifying(false);
  };

  const renderDescription = () => {
    if (isExpanded) {
      return description;
    }
    return description.length > 100
      ? description.substring(0, 100) + "..."
      : description;
  };

  const canModify = userRole === "ADMIN" || userId === currentUserId;

  return (
    <div className="w-full bg-white shadow-lg rounded-lg p-6 mb-6 relative overflow-hidden">
      <h2 className="text-xl font-semibold text-blue-800 mb-2">{title}</h2>
      <p className="text-gray-700 mb-4">
        {renderDescription()}
        {description.length > 100 && (
          <button
            onClick={toggleDescription}
            className="text-blue-600 font-medium ml-1 hover:underline focus:outline-none"
          >
            {isExpanded ? "See less" : "See more"}
          </button>
        )}
      </p>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
        <div className="text-gray-500 text-sm mb-2 sm:mb-0">
          <span className="font-medium text-gray-800">Location: </span>
          {location}
        </div>
        <EventTime date={date} />
      </div>
      {canModify && (
        <div className="flex justify-end space-x-4">
          <button
            onClick={openModifyForm}
            className="text-blue-600 hover:underline font-medium focus:outline-none"
          >
            Modify
          </button>
          <button
            onClick={handleDeleteClick}
            className="text-red-600 hover:underline font-medium focus:outline-none"
          >
            Delete
          </button>
        </div>
      )}

      <AnimatePresence>
        {isModifying && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-gray-600 bg-opacity-20 overflow-y-auto h-full w-full flex justify-center items-center z-50"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              transition={{ duration: 0.2 }}
              className="relative bg-white rounded-lg shadow-xl p-6 m-4 max-w-xl w-full"
            >
              <button
                onClick={closeModifyForm}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
              <EventModify
                event={{ id, title, description, date, location, userId }}
                onClose={closeModifyForm}
                onUpdate={handleUpdate}
                userId={currentUserId}
                userRole={userRole}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showDeleteConfirmation && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center z-50"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              transition={{ duration: 0.2 }}
              className="bg-white p-6 rounded-lg shadow-md text-center max-w-md w-full m-4"
            >
              <p className="text-gray-700 mb-4">
                Are you sure you want to delete this event?
              </p>
              <div className="flex justify-center space-x-4">
                <button
                  onClick={handleDeleteConfirm}
                  className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 transition-colors duration-200"
                >
                  Yes, Delete
                </button>
                <button
                  onClick={() => setShowDeleteConfirmation(false)}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 transition-colors duration-200"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default EventCard;
