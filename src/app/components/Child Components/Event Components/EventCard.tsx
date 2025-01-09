"use client";
import React, { useState } from "react";
import EventTime from "./EventTime";
import EventModify from "./EventModify";
import { motion, AnimatePresence } from "framer-motion";
import { deleteEvent } from "@/lib/actions/eventActions";
import { notification } from "antd";
import {
  MapPin,
  ChevronDown,
  ChevronUp,
  Edit2,
  Trash2,
} from "lucide-react";

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
  onUpdate: (updatedEvent: Event) => void;
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

  const toggleDescription = () => setIsExpanded(!isExpanded);
  const openModifyForm = () => setIsModifying(true);
  const closeModifyForm = () => setIsModifying(false);
  const handleDeleteClick = () => setShowDeleteConfirmation(true);

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
    onUpdate(updatedEvent);
    setIsModifying(false);
  };

  const renderDescription = () => {
    if (isExpanded) return description;
    return description.length > 100
      ? description.substring(0, 100) + "..."
      : description;
  };

  const canModify = userRole === "ADMIN" || userId === currentUserId;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="w-full mb-6"
    >
      <div className="group">
        <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100 transition-all duration-300 hover:shadow-lg">
          {/* Title and Actions Row */}
          <div className="flex justify-between items-start mb-4">
            <h2 className="text-2xl font-bold text-blue-600">{title}</h2>
            {canModify && (
              <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={openModifyForm}
                  className="p-2 rounded-full bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors"
                >
                  <Edit2 size={16} />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleDeleteClick}
                  className="p-2 rounded-full bg-red-50 text-red-600 hover:bg-red-100 transition-colors"
                >
                  <Trash2 size={16} />
                </motion.button>
              </div>
            )}
          </div>

          {/* Description */}
          <motion.div
            animate={{ height: isExpanded ? "auto" : "60px" }}
            className="overflow-hidden"
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <p className="text-gray-600 leading-relaxed">
              {renderDescription()}
            </p>
          </motion.div>

          {/* Expand/Collapse Button */}
          {description.length > 100 && (
            <button
              onClick={toggleDescription}
              className="mt-2 text-blue-600 font-medium flex items-center gap-1 hover:text-blue-700 focus:outline-none"
            >
              {isExpanded ? (
                <>
                  Show less <ChevronUp size={16} />
                </>
              ) : (
                <>
                  Show more <ChevronDown size={16} />
                </>
              )}
            </button>
          )}

          {/* Meta Information */}
          <div className="mt-6 flex flex-wrap gap-4 items-center text-sm">
            <div className="flex items-center gap-2 text-gray-600">
              <MapPin size={16} className="text-blue-500" />
              <span>{location}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <EventTime date={date} />
            </div>
          </div>
        </div>
      </div>

      {/* Modify Modal */}
      <AnimatePresence>
        {isModifying && (
          <EventModify
            event={{ id, title, description, date, location, userId }}
            onClose={closeModifyForm}
            onUpdate={handleUpdate}
            userId={currentUserId}
            userRole={userRole}
          />
        )}
      </AnimatePresence>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {showDeleteConfirmation && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/30 backdrop-blur-sm overflow-y-auto h-full w-full flex justify-center items-center z-50"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white p-6 rounded-xl shadow-xl text-center max-w-md w-full m-4"
            >
              <h3 className="text-xl font-semibold mb-4 text-gray-900">
                Delete Event
              </h3>
              <p className="text-gray-600 mb-6">
                Are you sure you want to delete this event? This action cannot
                be undone.
              </p>
              <div className="flex justify-center gap-4">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleDeleteConfirm}
                  className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 transition-colors"
                >
                  Delete
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setShowDeleteConfirmation(false)}
                  className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 transition-colors"
                >
                  Cancel
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default EventCard;
