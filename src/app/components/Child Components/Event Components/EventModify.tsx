import React from "react";
import { Form, Input, DatePicker, Button } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import moment from "moment";

interface EventModifyProps {
  event: {
    id: number;
    title: string;
    description: string;
    date: string;
    location: string;
  };
  onClose: () => void;
  onUpdate: (updatedEvent: any) => void;
}

const EventModify: React.FC<EventModifyProps> = ({
  event,
  onClose,
  onUpdate,
}) => {
  const [form] = Form.useForm();

  const handleSubmit = (values: any) => {
    const updatedEvent = {
      ...event,
      ...values,
      date: values.date.format("YYYY-MM-DD"),
    };
    onUpdate(updatedEvent);
    onClose();
  };

  return (
    <div className=" p-6  w-full  relative">
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
          <DatePicker className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500" />
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
          >
            Save Changes
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default EventModify;
