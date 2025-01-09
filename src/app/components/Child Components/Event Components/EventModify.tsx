"use client";
import React, { useState } from "react";
import { Form, Input, Button, notification } from "antd";
import moment from "moment";
import { modifyEvent } from "@/lib/actions/eventActions";

// Define Event type
interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  userId: string;
}

interface EventModifyProps {
  event: Event; // Updated to Event type
  onClose: () => void;
  onUpdate: (updatedEvent: Event) => void; // Updated to Event type
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
    // Updated to Event type
    setLoading(true);
    const updatedEvent: Event = {
      // Updated to Event type
      ...event,
      ...values,
      date: new Date(values.date).toISOString(), // Convert to ISO string
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
    <div className="p-6 w-full relative">
      <h2 className="text-2xl font-bold text-blue-800 mb-4">Modify Event</h2>
      <Form
        form={form}
        layout="vertical"
        initialValues={{
          ...event,
          date: moment(event.date).format("YYYY-MM-DDTHH:mm"), // Format for datetime-local input
        }}
        onFinish={handleSubmit}
      >
        <Form.Item
          name="title"
          label="Title"
          rules={[{ required: true, message: "Please input the title!" }]}
        >
          <Input className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </Form.Item>
        <Form.Item
          name="description"
          label="Description"
          rules={[{ required: true, message: "Please input the description!" }]}
        >
          <Input.TextArea className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </Form.Item>
        <Form.Item
          name="date"
          label="Date"
          rules={[{ required: true, message: "Please input the date!" }]}
        >
          <Input
            type="datetime-local"
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </Form.Item>
        <Form.Item
          name="location"
          label="Location"
          rules={[{ required: true, message: "Please input the location!" }]}
        >
          <Input className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </Form.Item>
        <div className="flex justify-between items-center">
          <Button onClick={onClose} className="bg-gray-500 text-white">
            Cancel
          </Button>
          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
            className="bg-blue-600 text-white"
          >
            Save Changes
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default EventModify;
