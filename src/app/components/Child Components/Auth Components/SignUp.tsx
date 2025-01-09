"use client";

import { Button, Form, Input, message } from "antd";
import { motion } from "framer-motion";
import {
  UserIcon,
  EnvelopeIcon,
  LockClosedIcon,
} from "@heroicons/react/24/solid";
import Image from "next/image";
import Link from "next/link";
import { registerUser } from "@/lib/actions/authActions";
import { useRouter } from "next/navigation";

interface FormValues {
  username: string;
  email: string;
  password: string;
}

// Simple XOR cipher for basic obfuscation
const encrypt = (text: string): string => {
  const key = "mySecretKey"; // You should use a more secure key in production
  return text
    .split("")
    .map((char, index) =>
      String.fromCharCode(
        char.charCodeAt(0) ^ key.charCodeAt(index % key.length)
      )
    )
    .join("");
};

export default function SignUp() {
  const [form] = Form.useForm();
  const router = useRouter();
  const onFinish = async (values: FormValues) => {
    try {
      const result = await registerUser({
        name: values.username,
        email: values.email,
        password: values.password,
      });

      if (result.success) {
        message.success(result.message);
        form.resetFields();
        const encryptedPassword = encrypt(values.password);
        console.log("Saving to localStorage:", {
          email: values.email,
          encryptedPassword,
        }); // Log here
        localStorage.setItem(
          "rememberedUser",
          JSON.stringify({ email: values.email, encryptedPassword })
        );
        router.push("/dashboard/login");
      } else {
        message.error(result.message);
      }
    } catch (error) {
      console.error("Registration error:", error);
      message.error("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <div className="flex justify-center items-center w-screen min-h-screen bg-gradient-to-br from-purple-400 to-indigo-600 py-12">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Form
          form={form}
          className="bg-white shadow-2xl rounded-lg px-8 pt-6 pb-8 mb-4"
          name="signup"
          onFinish={onFinish}
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
            <Link href="/" className="flex justify-center">
              <Image src="/logo.jpg" alt="logo" width={150} height={80} />
            </Link>
          </motion.div>

          <Form.Item
            name="username"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input
              prefix={<UserIcon className="h-5 w-5 text-gray-400" />}
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
              prefix={<EnvelopeIcon className="h-5 w-5 text-gray-400" />}
              placeholder="Email"
              className="rounded-md"
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password
              prefix={<LockClosedIcon className="h-5 w-5 text-gray-400" />}
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
              prefix={<LockClosedIcon className="h-5 w-5 text-gray-400" />}
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
            <Link
              href="/dashboard/login"
              className="text-sm text-indigo-600 hover:text-indigo-800"
            >
              Log in
            </Link>
          </div>
        </Form>
      </motion.div>
    </div>
  );
}
