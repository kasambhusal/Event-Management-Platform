"use client";
import React, { useState } from "react";
import { Form, Input, DatePicker, Button, Modal, notification } from "antd";
import moment from "moment";
import { addEvent } from "@/lib/actions/eventActions";

interface EventAddProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (event: any) => void;
  userId: string;
}

const EventAdd: React.FC<EventAddProps> = ({
  isOpen,
  onClose,
  onAdd,
  userId,
}) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (values: any) => {
    setLoading(true);
    setError(null);

    const eventData = {
      ...values,
      date: values.date.toISOString(),
      userId: userId,
    };

    try {
      const response = await addEvent(eventData);

      if (response.success) {
        form.resetFields();
        onClose();
        onAdd(response.data);
        notification.success({
          message: "Event Created",
          description: response.message,
        });
      } else {
        setError(response.message);
        notification.error({
          message: "Error",
          description: response.message,
        });
      }
    } catch (error: any) {
      setError("Failed to create event. Please try again.");
      notification.error({
        message: "Error",
        description:
          "There was an error creating your event. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title={
        <h2 className="text-2xl font-bold text-blue-800 mb-4">
          Create New Event
        </h2>
      }
      open={isOpen}
      onCancel={onClose}
      footer={null}
      width={600}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        initialValues={{
          date: moment().startOf("minute"),
        }}
      >
        <Form.Item
          name="title"
          label="Title"
          rules={[{ required: true, message: "Please input the event title!" }]}
        >
          <Input
            placeholder="Enter event title"
            className="rounded-lg border-gray-300"
          />
        </Form.Item>

        <Form.Item
          name="description"
          label="Description"
          rules={[
            { required: true, message: "Please input the event description!" },
          ]}
        >
          <Input.TextArea
            placeholder="Enter event description"
            className="rounded-lg border-gray-300"
            rows={4}
          />
        </Form.Item>

        <Form.Item
          name="date"
          label="Date and Time"
          rules={[{ required: true, message: "Please select the event date!" }]}
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
          rules={[
            { required: true, message: "Please input the event location!" },
          ]}
        >
          <Input
            placeholder="Enter event location"
            className="rounded-lg border-gray-300"
          />
        </Form.Item>

        {error && <div className="text-red-500 mb-4 text-center">{error}</div>}

        <Form.Item className="mb-0 flex justify-end space-x-4">
          <Button onClick={onClose} className="rounded-lg">
            Cancel
          </Button>
          <Button
            type="primary"
            htmlType="submit"
            className="bg-blue-800 rounded-lg"
            loading={loading}
          >
            {loading ? "Creating..." : "Create Event"}
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EventAdd;
