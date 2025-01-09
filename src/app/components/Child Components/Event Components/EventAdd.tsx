"use client";
import React, { useState } from "react";
import { Form, Input, Button, notification } from "antd";
import { motion } from "framer-motion";
import moment from "moment";
import { addEvent } from "@/lib/actions/eventActions";
import { X } from 'lucide-react';

interface EventFormValues {
  title: string;
  description: string;
  date: string;
  location: string;
}

interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  userId: string;
}

interface EventAddProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (event: Event) => void;
  userId: string;
}

const EventAdd: React.FC<EventAddProps> = ({
  isOpen,
  onClose,
  onAdd,
  userId,
}) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (values: EventFormValues) => {
    setLoading(true);

    try {
      const formattedDate = moment(values.date, "YYYY-MM-DDTHH:mm");
      if (!formattedDate.isValid()) {
        throw new Error("Invalid date format. Please provide a valid date.");
      }

      const eventData = {
        ...values,
        date: formattedDate.toISOString(),
        userId: userId,
      };

      const response = await addEvent(eventData);

      if (response.success && response.data) {
        form.resetFields();
        onClose();
        onAdd(response.data);
        notification.success({
          message: "Event Created",
          description: response.message,
        });
      } else {
        throw new Error(response.message);
      }
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : "Failed to create event. Please try again.";
      notification.error({
        message: "Error",
        description: errorMessage,
      });
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-gray-800 bg-opacity-50 backdrop-blur-sm overflow-y-auto min-h-screen w-screen flex justify-center items-center z-50"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white w-full max-w-4xl rounded-lg shadow-2xl p-8 m-4"
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-blue-600">Create New Event</h2>
          <Button
            icon={<X size={24} />}
            onClick={onClose}
            className="border-none shadow-none text-gray-500 hover:text-gray-700"
          />
        </div>
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          initialValues={{
            date: moment().format("YYYY-MM-DDTHH:mm"),
          }}
          className="space-y-6"
        >
          <Form.Item
            name="title"
            label="Title"
            rules={[{ required: true, message: "Please input the event title!" }]}
          >
            <Input className="w-full px-4 py-2 text-lg border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </Form.Item>

          <Form.Item
            name="description"
            label="Description"
            rules={[{ required: true, message: "Please input the event description!" }]}
          >
            <Input.TextArea
              className="w-full px-4 py-2 text-base border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={6}
            />
          </Form.Item>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Form.Item
              name="date"
              label="Date and Time"
              rules={[{ required: true, message: "Please select the event date!" }]}
            >
              <Input
                type="datetime-local"
                className="w-full px-4 py-2 text-base border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </Form.Item>

            <Form.Item
              name="location"
              label="Location"
              rules={[{ required: true, message: "Please input the event location!" }]}
            >
              <Input className="w-full px-4 py-2 text-base border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </Form.Item>
          </div>

          <div className="flex justify-end space-x-4">
            <Button
              onClick={onClose}
              className="px-6 py-2 text-base bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 transition-colors"
            >
              Cancel
            </Button>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              className="px-6 py-2 text-base bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors"
            >
              {loading ? "Creating..." : "Create Event"}
            </Button>
          </div>
        </Form>
      </motion.div>
    </motion.div>
  );
};

export default EventAdd;
