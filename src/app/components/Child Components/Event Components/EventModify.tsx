"use client";
import React, { useState } from "react";
import { Form, Input, Button, notification } from "antd";
import moment from "moment";
import { modifyEvent } from "@/lib/actions/eventActions";

interface EventModifyProps {
  event: {
    id: string;
    title: string;
    description: string;
    date: string;
    location: string;
  };
  onClose: () => void;
  onUpdate: (updatedEvent: any) => void;
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

  const handleSubmit = async (values: any) => {
    setLoading(true);
    const updatedEvent = {
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
      if (response.success) {
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
    } catch (error) {
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
          label="Date and Time"
          rules={[
            { required: true, message: "Please select the date and time!" },
          ]}
        >
          <input
            type="datetime-local"
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-900"
            style={{
              appearance: "none",
              background: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Crect x='3' y='4' width='18' height='18' rx='2' ry='2'%3E%3C/rect%3E%3Cline x1='16' y1='2' x2='16' y2='6'%3E%3C/line%3E%3Cline x1='8' y1='2' x2='8' y2='6'%3E%3C/line%3E%3Cline x1='3' y1='10' x2='21' y2='10'%3E%3C/line%3E%3C/svg%3E") no-repeat right 8px center / 16px`,
              paddingRight: "30px",
            }}
          />
        </Form.Item>
        <Form.Item
          name="location"
          label="Location"
          rules={[{ required: true, message: "Please input the location!" }]}
        >
          <Input className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </Form.Item>
        <Form.Item className="mb-0 flex justify-end space-x-4">
          <Button
            onClick={onClose}
            className="px-4 py-2 mr-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
          >
            Cancel
          </Button>
          <Button
            type="primary"
            htmlType="submit"
            className="px-4 py-2 bg-blue-800 text-white rounded hover:bg-blue-700"
            loading={loading}
          >
            Save Changes
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default EventModify;
