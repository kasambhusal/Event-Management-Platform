"use client";
import React from "react";
import { useUser } from "@/app/context/UserContext";
import { updateUser } from "@/lib/actions/userActions";
import { X } from "lucide-react";
import { Form, Input, Button, message } from "antd";

interface AccountManagementProps {
  onClose: () => void;
}

const AccountManagement: React.FC<AccountManagementProps> = ({ onClose }) => {
  const { user, updateUserContext } = useUser();

  const [form] = Form.useForm();

  const handleSubmit = async (values: { name: string; email: string }) => {
    if (!user || !user.id) return;
    try {
      const result = await updateUser({
        id: user.id,
        name: values.name,
        email: values.email,
      });

      if (result.success) {
        updateUserContext({ ...user, name: values.name, email: values.email });
        message.success("Profile updated successfully");
        onClose();
      } else {
        message.error(result.message);
      }
    } catch (error) {
      message.error("An error occurred while updating the profile.");
      console.log("Error on Updating User profile", error)
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Account Management</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X size={24} />
          </button>
        </div>
        <Form
          form={form}
          initialValues={{
            name: user?.name || "",
            email: user?.email || "",
          }}
          onFinish={handleSubmit}
          layout="vertical"
        >
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: "Please input your name!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Please input your email!" },
              { type: "email", message: "Please enter a valid email address!" },
            ]}
          >
            <Input
              placeholder="Email"
              className="rounded-md"
            />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" className="w-full">
              Update Profile
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default AccountManagement;
