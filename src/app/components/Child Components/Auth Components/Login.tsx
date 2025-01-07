"use client";
import React from "react";
import { Button, Checkbox, Form, Input } from "antd";
import { motion } from "framer-motion";
import Link from "next/link";
import { EnvelopeIcon, LockClosedIcon } from "@heroicons/react/24/solid";
import { useRouter } from "next/navigation"; // Correct import for navigation

export default function Login() {
  const router = useRouter(); // useRouter for navigation

  const onFinish = (values: string): void => {
    console.log("Success:", values);
    router.push("/dashboard/events"); // Use router.push to navigate
  };

  const onFinishFailed = (errorInfo: any): void => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="flex justify-center items-center w-screen h-screen bg-gradient-to-br from-purple-400 to-indigo-600">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Form
          className="bg-white shadow-2xl rounded-lg px-8 pt-6 pb-8 mb-4"
          name="basic"
          initialValues={{
            remember: true,
          }}
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
            <Link href="/">
              <span className="text-3xl font-bold text-indigo-600">LOGO</span>
              <span className="text-xl text-gray-600 ml-2">Kya huwa re</span>
            </Link>
          </motion.div>

          <Form.Item
            name="email"
            rules={[
              { required: true, message: "Please input your email!" },
              { type: "email", message: "Please enter a valid email!" },
            ]}
          >
            <Input
              prefix={<EnvelopeIcon className="h-5 w-5 text-gray-400" />}
              placeholder="Email"
              className="rounded-md"
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            <Input.Password
              prefix={<LockClosedIcon className="h-5 w-5 text-gray-400" />}
              placeholder="Password"
              className="rounded-md"
            />
          </Form.Item>

          <Form.Item name="remember" valuePropName="checked">
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <Form.Item>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                type="primary"
                htmlType="submit"
                className="w-full bg-indigo-600 hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-300 text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                LogIn
              </Button>
            </motion.div>
          </Form.Item>

          <div className="text-center mt-4">
            <p className="text-gray-600">Don't have an account? </p>
            <Link
              href="/dashboard/sign-up"
              className="text-sm text-indigo-600 hover:text-indigo-800"
            >
              Sign Up
            </Link>
          </div>
        </Form>
      </motion.div>
    </div>
  );
}
