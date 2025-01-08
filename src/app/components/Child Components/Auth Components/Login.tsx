"use client";
import React, { useEffect } from "react";
import { Button, Checkbox, Form, Input, message } from "antd";
import { motion } from "framer-motion";
import Link from "next/link";
import { EnvelopeIcon, LockClosedIcon } from "@heroicons/react/24/solid";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { loginUser } from "@/lib/actions/authActions";
import { useUser } from "@/app/context/UserContext";

interface LoginFormValues {
  email: string;
  password: string;
  remember: boolean;
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

const decrypt = (text: string): string => {
  // XOR is symmetric, so we can use the same function for decryption
  return encrypt(text);
};

export default function Login() {
  const router = useRouter();
  const [form] = Form.useForm<LoginFormValues>();
  const { user, setUser } = useUser();

  useEffect(() => {
    const rememberedUser = localStorage.getItem("rememberedUser");
    if (rememberedUser) {
      const { email, encryptedPassword } = JSON.parse(rememberedUser);
      console.log("Retrieved from localStorage:", { email, encryptedPassword }); // Log here
      if (encryptedPassword) {
        const password = decrypt(encryptedPassword);
        form.setFieldsValue({ email, password, remember: true });
      } else {
        console.error("Encrypted password is missing!");
      }
    }
  }, [form]);
  useEffect(() => {
    if (user.email && user.id && user.name) {
      router.push("/dashboard/events");
    }
  }, []);
  const onFinish = async (values: LoginFormValues) => {
    if (!values.password) {
      console.error("Password is missing");
      message.error("Password is required");
      return;
    }

    try {
      const result = await loginUser({
        email: values.email,
        password: values.password,
      });

      if (result.success) {
        setUser({
          id: result?.data?.id || null,
          name: result?.data?.name || null,
          email: result?.data?.email || null,
        });
        message.success(result.message);
        if (values.remember) {
          const encryptedPassword = encrypt(values.password);
          console.log("Saving to localStorage:", {
            email: values.email,
            encryptedPassword,
          }); // Log here
          localStorage.setItem(
            "rememberedUser",
            JSON.stringify({ email: values.email, encryptedPassword })
          );
        } else {
          localStorage.removeItem("rememberedUser");
        }
        router.push("/dashboard/events");
      } else {
        message.error(result.message || "Login failed");
      }
    } catch (error) {
      console.error("Login error:", error);
      message.error("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <div className="flex justify-center items-center w-screen h-screen bg-gradient-to-br from-purple-400 to-indigo-600">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Form<LoginFormValues>
          form={form}
          className="bg-white shadow-2xl rounded-lg px-8 pt-6 pb-8 mb-4"
          name="login"
          initialValues={{
            remember: true,
          }}
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
                Log In
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
