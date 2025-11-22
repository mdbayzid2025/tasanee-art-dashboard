import { Button, Checkbox, ConfigProvider, Form, Input } from "antd";
import { useForm } from "antd/es/form/Form";
import FormItem from "antd/es/form/FormItem";
import Cookies from "js-cookie";
import { useEffect } from "react";
import toast from "react-hot-toast";
import {
  MdOutlineVisibility,
  MdOutlineVisibilityOff
} from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { useLoginAdminMutation } from "../../redux/features/auth/authApi";

const Login = () => {
  const [form] = useForm();
  const [adminLogin] = useLoginAdminMutation();
  const navigate = useNavigate()

  useEffect(() => {
    const email = Cookies.get("email");
    const password = Cookies.get("password");
    if (email && password) {
      form.setFieldsValue({ email, password });
    }
  }, []);

  const handleLogin = async (values: any) => {
    try {
      if (values?.remember == true) {
        Cookies.set("email", values.email);
        Cookies.set("password", values.password);
      }

      const res = await adminLogin(values).unwrap();
      toast.success(res?.message);
      Cookies.set("accessToken", res?.data?.token);
      
      navigate("/")
    } catch (error:any) {
      console.log("error", error);
      
      toast.error((error as any)?.data?.message);
    }
  };

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#8B4E2E",

          colorBgContainer: "#F1F4F9",
        },
        components: {
          Input: {
            borderRadius: 12,
            colorBorder: "#8B4E2E",
            colorPrimaryBg: "#121212",
            colorText: "#757575",
            inputFontSize: 16,
            // activeBg: "#989898",
            colorBgBlur: "#989898",
            colorTextPlaceholder: "#757575 ",
          },
          Checkbox: {
            colorBgContainer: "transparent",
            colorBorder: "#989898",
            colorText: "#989898",
            fontSize: 15,
            colorPrimary: "#989898",
            colorPrimaryHover: "#989898",
            controlInteractiveSize: 20,
            borderRadiusSM: 50,
          },
        },
      }}
    >
      <div className="flex items-center justify-center h-screen">
        <div className="border border-borderColor rounded-xl px-12 py-8 min-w-xl">
          <img src="/logo.png" className="w-18 mb-5 mx-auto" alt="" />
          <h1 className="text-center text-primary text-2xl font-semibold mb-4">
            Sign In
          </h1>
          <p className="text-center text-gray text-lg mb-8">
            Please enter your email and password to continue
          </p>

          <Form form={form} layout="vertical" onFinish={handleLogin}>
            <FormItem
              name="email"
              label={<p className="text-gray font-semibold text-lg">Email</p>}
              rules={[
                {
                  required: true,
                  type: "email",
                  message: "Please enter your email",
                },
              ]}
            >
              <Input
                style={{ height: 48 }}
                placeholder="example@gmail.com"
                autoComplete="off"
              />
            </FormItem>

            <FormItem
              name="password"
              label={
                <p className="text-gray font-semibold text-lg">Password</p>
              }
              rules={[
                {
                  required: true,
                  message: "Please enter your Password",
                },
              ]}
            >
              <Input.Password
                name="password"
                minLength={6}
                style={{
                  height: 48,
                  cursor: "pointer",
                }}
                placeholder="Enter Password"
                iconRender={(visible) =>
                  visible ? (
                    <MdOutlineVisibility size={20} color="#808080" />
                  ) : (
                    <MdOutlineVisibilityOff size={20} color="#808080" />
                  )
                }
              />
            </FormItem>
            <div className="flex items-center justify-between">
              <Form.Item
                name="remember"
                style={{ marginBottom: 0 }}
                valuePropName="checked"
                label={null}
              >
                <Checkbox>Remember me</Checkbox>
              </Form.Item>
              <Link
                to="/forgot-password"
                className="!text-gray-600 font-medium text-[15px]"
              >
                Forgot Password ?
              </Link>
            </div>

            <Button
              type="primary"
              size="large"
              htmlType="submit"
              shape="round"
              style={{
                width: "100%",
                height: 50,
                marginTop: 20,
              }}
            >
              Verify
            </Button>
          </Form>
        </div>
      </div>
    </ConfigProvider>
  );
};

export default Login;
