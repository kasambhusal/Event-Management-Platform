"use client";
import React, { useState } from "react";
import { Form, Input, DatePicker, Button, notification } from "antd";
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
      date: values.date.toISOString(),
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
          date: moment(event.date),
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
          rules={[{ required: true, message: "Please select the date!" }]}
        >
          <DatePicker
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            showTime
            format="YYYY-MM-DD HH:mm:ss"
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
