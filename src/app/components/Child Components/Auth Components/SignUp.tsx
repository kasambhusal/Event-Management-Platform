"use client";
import { Button, Form, Input, Radio } from "antd";
import { motion } from "framer-motion";
import {
  UserIcon,
  EnvelopeIcon,
  LockClosedIcon,
  MapPinIcon,
} from "@heroicons/react/24/solid";

const onFinish = (values: any): void => {
  console.log("Success:", values);
};

const onFinishFailed = (errorInfo: any): void => {
  console.log("Failed:", errorInfo);
};

export default function SignUp() {
  return (
    <div className="flex justify-center items-center w-screen min-h-screen bg-gradient-to-br from-purple-400 to-indigo-600 py-12">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Form
          className="bg-white shadow-2xl rounded-lg px-8 pt-6 pb-8 mb-4"
          name="signup"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          layout="vertical"
        >
          <motion.div
            className="text-center mb-8"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{
              delay: 0.2,
              type: "spring",
              stiffness: 260,
              damping: 20,
            }}
          >
            <span className="text-3xl font-bold text-indigo-600">LOGO</span>
            <span className="text-xl text-gray-600 ml-2">Kya huwa re</span>
          </motion.div>

          <Form.Item
            name="username"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input
              prefix={
                <span>
                  <UserIcon className="h-5 w-5 text-gray-400" />
                </span>
              } // Wrap in span
              placeholder="Username"
              className="rounded-md"
            />
          </Form.Item>

          <Form.Item
            name="email"
            rules={[
              { required: true, message: "Please input your email!" },
              { type: "email", message: "Please enter a valid email!" },
            ]}
          >
            <Input
              prefix={
                <span>
                  <EnvelopeIcon className="h-5 w-5 text-gray-400" />
                </span>
              } // Wrap in span
              placeholder="Email"
              className="rounded-md"
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password
              prefix={
                <span>
                  <LockClosedIcon className="h-5 w-5 text-gray-400" />
                </span>
              } // Wrap in span
              placeholder="Password"
              className="rounded-md"
            />
          </Form.Item>

          <Form.Item
            name="confirmPassword"
            dependencies={["password"]}
            rules={[
              { required: true, message: "Please confirm your password!" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error("The two passwords do not match!")
                  );
                },
              }),
            ]}
          >
            <Input.Password
              prefix={
                <span>
                  <LockClosedIcon className="h-5 w-5 text-gray-400" />
                </span>
              } // Wrap in span
              placeholder="Confirm Password"
              className="rounded-md"
            />
          </Form.Item>

          <Form.Item>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                type="primary"
                htmlType="submit"
                className="w-full bg-indigo-600 hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-300 text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                Sign Up
              </Button>
            </motion.div>
          </Form.Item>

          <div className="text-center mt-4">
            <span className="text-gray-600">Already have an account? </span>
            <a
              href="/dashboard/login"
              className="text-sm text-indigo-600 hover:text-indigo-800"
            >
              Log in
            </a>
          </div>
        </Form>
      </motion.div>
    </div>
  );
}
