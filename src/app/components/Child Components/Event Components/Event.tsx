"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button, Spin } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import EventCard from "./EventCard";
import EventAdd from "./EventAdd";
import { useUser } from "@/app/context/UserContext";
import { getEvents } from "@/lib/actions/eventActions";

interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  userId: string;
}

function Event() {
  const { user } = useUser();
  const [events, setEvents] = useState<Event[]>([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      setError(null);

      try {
        if (user?.id && (user.role === "USER" || user.role === "ADMIN")) {
          const response = await getEvents(user.id, user?.role);

          if (response.success && response.data) {
            setEvents(response.data);
          } else {
            setError(`Failed to fetch events: ${response.message}`);
          }
        } else {
          setError("User ID or role is missing.");
        }
      } catch (error: unknown) {
        setError("An error occurred while fetching events.");
        console.error("Error fetching events:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [user?.id, user?.role]);

  const handleDelete = (id: string) => {
    setEvents(events.filter((event) => event.id !== id));
  };

  const handleAdd = (newEvent: Event) => {
    setEvents([newEvent, ...events]);
  };

  const handleUpdate = (updatedEvent: Event): void => {
    setEvents(
      events.map((event) =>
        event.id === updatedEvent.id ? updatedEvent : event
      )
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="w-screen h-[92vh] bg-gray-100 flex justify-center items-center p-1">
        <div
          className="w-full h-full bg-blue-200 flex flex-col items-center"
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
            {loading ? (
              <div className="flex justify-center items-center">
                <Spin size="large" />
              </div>
            ) : error ? (
              <div className="text-center text-red-500">{error}</div>
            ) : (
              <AnimatePresence>
                {events.length > 0 ? (
                  events.map((event) => (
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
                        userRole={user?.role === "USER" ? "USER" : "ADMIN"}
                        onDelete={handleDelete}
                        currentUserId={user?.id || "undefined"}
                        onUpdate={handleUpdate}
                        userId={event.userId || "undefined"}
                      />
                    </motion.div>
                  ))
                ) : (
                  <p className="text-center text-gray-500">No events found</p>
                )}
              </AnimatePresence>
            )}
          </div>

          {/* Add Event Modal */}
          {user && (
            <EventAdd
              isOpen={isAddModalOpen}
              onClose={() => setIsAddModalOpen(false)}
              onAdd={handleAdd}
              userId={user.id || "undefined"}
            />
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default Event;
