"use client";
import React from "react";
import { Form, Input, DatePicker, Button, Modal } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import moment from "moment";

interface EventAddProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (event: any) => void;
}

const EventAdd: React.FC<EventAddProps> = ({ isOpen, onClose, onAdd }) => {
  const [form] = Form.useForm();

  const handleSubmit = (values: any) => {
    const newEvent = {
      id: Date.now(), // Simple way to generate unique id
      ...values,
      date: values.date.toISOString(),
    };
    onAdd(newEvent);
    form.resetFields();
    onClose();
  };

  return (
    <Modal
      title={
        <h2 className="text-2xl font-bold text-blue-800 mb-4">Create New Event</h2>
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
          date: moment(),
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
          label="Date"
          rules={[{ required: true, message: "Please select the event date!" }]}
        >
          <DatePicker
            className="w-full rounded-lg border-gray-300"
            showTime
            format="YYYY-MM-DD HH:mm:ss"
          />
        </Form.Item>

        <Form.Item
          name="location"
          label="Location"
          rules={[{ required: true, message: "Please input the event location!" }]}
        >
          <Input
            placeholder="Enter event location"
            className="rounded-lg border-gray-300"
          />
        </Form.Item>

        <Form.Item className="mb-0 flex justify-end space-x-4">
          <Button onClick={onClose} className="rounded-lg">
            Cancel
          </Button>
          <Button
            type="primary"
            htmlType="submit"
            className="bg-blue-800 rounded-lg"
          >
            Create Event
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EventAdd;

