"use client";
import React, { useState } from "react";
import { Form, Input, Button, notification } from "antd";
import { motion } from "framer-motion";
import moment from "moment";
import { modifyEvent } from "@/lib/actions/eventActions";
import { X } from "lucide-react";

interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  userId: string;
}

interface EventModifyProps {
  event: Event;
  onClose: () => void;
  onUpdate: (updatedEvent: Event) => void;
  userId: string;
  userRole: "USER" | "ADMIN";
}

const EventModify: React.FC<EventModifyProps> = ({
  event,
  onClose,
  onUpdate,
  userId,
  userRole,
}) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values: Event) => {
    setLoading(true);
    const updatedEvent: Event = {
      ...event,
      ...values,
      date: new Date(values.date).toISOString(),
    };

    try {
      const response = await modifyEvent(
        event.id,
        updatedEvent,
        userId,
        userRole
      );
      if (response.success && response.data) {
        onUpdate(response.data);
        onClose();
        notification.success({
          message: "Event Updated",
          description: response.message,
        });
      } else {
        notification.error({
          message: "Error",
          description: response.message,
        });
      }
    } catch (error: unknown) {
      console.error("Error updating event:", error);
      notification.error({
        message: "Error",
        description: "An unexpected error occurred while updating the event.",
      });
    } finally {
      setLoading(false);
    }
  };

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
          <h2 className="text-3xl font-bold text-blue-600">Modify Event</h2>
          <Button
            icon={<X size={24} />}
            onClick={onClose}
            className="border-none shadow-none text-gray-500 hover:text-gray-700"
          />
        </div>
        <Form
          form={form}
          layout="vertical"
          initialValues={{
            ...event,
            date: moment(event.date).format("YYYY-MM-DDTHH:mm"),
          }}
          onFinish={handleSubmit}
          className="space-y-6"
        >
          <Form.Item
            name="title"
            label="Title"
            rules={[{ required: true, message: "Please input the title!" }]}
          >
            <Input className="w-full px-4 py-2 text-lg border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </Form.Item>
          <Form.Item
            name="description"
            label="Description"
            rules={[
              { required: true, message: "Please input the description!" },
            ]}
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
              rules={[{ required: true, message: "Please input the date!" }]}
            >
              <Input
                type="datetime-local"
                className="w-full px-4 py-2 text-base border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </Form.Item>
            <Form.Item
              name="location"
              label="Location"
              rules={[
                { required: true, message: "Please input the location!" },
              ]}
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
              Save Changes
            </Button>
          </div>
        </Form>
      </motion.div>
    </motion.div>
  );
};

export default EventModify;
