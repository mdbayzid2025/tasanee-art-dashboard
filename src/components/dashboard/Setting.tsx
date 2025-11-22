import { DeleteOutlined, UploadOutlined } from "@ant-design/icons";
import {
  Button,
  Card,
  Form,
  Image,
  Input,
  Upload,
  type UploadProps,
} from "antd";
import FormItem from "antd/es/form/FormItem";
import type { RcFile } from "antd/es/upload";
import { useEffect, useState } from "react";
import { useEditProfileMutation } from "../../redux/features/user/userApi";
import { ImSpinner9 } from "react-icons/im";
import toast from "react-hot-toast";
import { useGetProfileQuery } from "../../redux/features/auth/authApi";
import { imageUrl } from "../../redux/base/baseAPI";

const Setting = () => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState<any[]>([]);
  const [imgURL, setImgURL] = useState<string | null>(null); // for preview
  const [imageFile, setImageFile] = useState<RcFile | null>(null);
  const [editProfile, { isLoading: editing }] = useEditProfileMutation();
  const { data: profileData, refetch } = useGetProfileQuery(undefined);

  // Pre-fill form with static profile data
  form.setFieldsValue({
    name: profileData?.name || "",
    email: profileData?.email || "",
  });

  const props: UploadProps = {
    beforeUpload: (file) => {
      setImageFile(file as RcFile); // store actual file for upload
      setFileList([
        {
          uid: file.uid,
          name: file.name,
          status: "done",
          url: URL.createObjectURL(file),
        },
      ]);
      setImgURL(URL.createObjectURL(file)); // For preview
      return false; // prevent auto-upload
    },
    onRemove: () => {
      setImageFile(null);
      setFileList([]);
      setImgURL(null);
    },
    fileList,
    maxCount: 1,
    accept: "image/*",
    listType: "picture",
    showUploadList: {
      showRemoveIcon: true,
      // antd accepts a ReactNode or a function (file) => ReactNode
      removeIcon: () => <DeleteOutlined className="!text-orange-300" />,
    },
  };

  // Pre-fill form with profile data
  useEffect(() => {
    form.setFieldsValue({
      name: profileData?.name || "",
      email: profileData?.email || "",      
    });
  }, [form]);

  // Static profile form submission handler
  const onFinish = async (values: any) => {
    try {
      const res = await editProfile(values).unwrap();
      console.log("resres", res);
      refetch()
    } catch (error) {
      console.log("error", error);
    }
  };

  const handleImageUpload = async () => {
    if (!imageFile) return toast.error("No file selected");

    console.log("values", imageFile);
    const formData = new FormData();
    formData.append("profileImage", imageFile);

    try {
      const res = await editProfile(formData);
      if (res?.data) {
        toast.success("Profile image updated");
        setImageFile(null);
        setFileList([]);
        setImgURL(null);
        refetch();
      }
    } catch (err) {
      console.error(err);
      toast.error("Upload failed");
    }
  };

  return (
    <div className="h-full">
      <h1 className="text-2xl text-primary font-semibold mb-10">Profile</h1>

      <div className=" grid grid-cols-1 items-start sm:grid-cols-1 lg:grid-cols-3 gap-5  justify-center md:pb-3">
        {/* ------------------ Profile Picture Card ------------------ */}
        <Card
          style={{
            background: "#ffff",
            border: "1px solid #8B4E2E",
            minWidth: 300,
            height: "100%"
          }}
          className="w-full h-full shadow-md rounded-xl md:col-span-1 "
          title={<p className="text-primary  ">Profile Photo</p>}
        >
          <div className="flex flex-col justify-center items-center gap-4">
            {/* Show current image or preview */}
            <Image
              height={200}
              width="100%"
              alt="Profile"
              // @ts-ignore
              src={imgURL ?? (profileData?.profileImage ? `${imageUrl}${profileData?.profileImage}`  : "/placeholder.png")}
              className="!object-cover rounded-xl"
              preview={false}
            />

            <input
              id="image-upload"
              type="file"
              hidden
              accept="image/*"
              onChange={(e: any) => {
                const file = e.target.files[0];
                if (file) {
                  setImageFile(file);
                  setImgURL(URL.createObjectURL(file));
                }
              }}
            />
            <div className="w-full text-start">
              <Upload {...props}>
                <Button
                  type="primary"
                  icon={<UploadOutlined />}
                  size="large"
                  prefix="red"
                >
                  Change Photo
                </Button>
              </Upload>
            </div>
            {imgURL && imageFile && (
              <Button
                type="primary"
                size="large"
                loading={editing}
                onClick={handleImageUpload}
                className="mt-3"
              >
                {editing ? (
                  <ImSpinner9 size={15} className="animate-spin mr-1" />
                ) : null}
                Save New Photo
              </Button>
            )}
          </div>
        </Card>

        {/* ------------------ Profile Form ------------------ */}
        <div className="md:col-span-2  p-6 shadow-md rounded-xl max-w-xl border bg-white h-full border-borderColor">
          <h2 className="text-xl font-semibold mb-4 text-primary">
            Profile Information
          </h2>

          <Form layout="vertical" form={form} onFinish={onFinish} className="">
            <div className="grid grid-cols-1 md:grid-cols-1 gap-x-4">
              <FormItem
                name="name"
                label={<p className=" font-semibold text-lg">Name</p>}
                rules={[{ message: "Please enter your name" }]}
              >
                <Input placeholder="John Doe" style={{ height: 48 }} />
              </FormItem>

              <FormItem
                name="email"
                label={<p className=" font-semibold text-lg">Email</p>}
                rules={[{ message: "Please enter your email" }]}
              >
                <Input
                  disabled
                  placeholder="john@example.com"
                  style={{ height: 48 }}
                />
              </FormItem>
            </div>

            <div className="">
              <Button type="primary" size="large" htmlType="submit">
                Save Changes
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Setting;
