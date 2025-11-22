import { useEffect } from "react";

import { Button, Form, Input, Modal } from "antd";


import FormItem from "antd/es/form/FormItem";
import TextArea from "antd/es/input/TextArea";
import toast from "react-hot-toast";
import { useAddFAQMutation, useUpdateFAQMutation } from "../../../redux/features/setting/settingApi";


const FaqAddModal = ({
  open,
  setOpen,
  editData,
  setEditData,
  refetch,
}:any) => {
  const [form] = Form.useForm();
  const [addFAQ] = useAddFAQMutation();
  const [updateFAQ] = useUpdateFAQMutation();

  const handleClose = () => {
    form.resetFields();
    setOpen(false);
    setEditData(null);
  };

  useEffect(() => {
    if (editData) {
      form.setFieldsValue(editData);
    }
  }, [editData]);

  const onFinish = async (values: any) => {
    try {
      if (editData) {
        const res = await updateFAQ({
          data: values,
          id: editData?._id,
        }).unwrap();
        if (res) {
          refetch();
          toast.success("FAQ added successfully");
          form.resetFields();
          setEditData(null);
          setOpen(false);
        }
      } else {
        const res = await addFAQ(values).unwrap();

        if (res?.data) {
          refetch();
          toast.success("FAQ added successfully");
          form.resetFields();
          setEditData(null);
          setOpen(false);
        }
      }
    } catch (error) {}
  };

  return (
    <Modal
      title={
        <p className="text-xl font-semibold text-primary">
          {editData ? "Update FAQ" : "Add FAQ"}
        </p>
      }
      open={open}
      onCancel={handleClose}
      centered
      footer={false}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        style={{ marginTop: 15 }}
      >
        <FormItem
          label={<p className="text-slate-700 font-semibold">{editData ? "Update FAQ" : "Add FAQ"}</p>}
          name="question"
          rules={[
            {
              required: true,
              message: "Enter FAQ question",
            },
          ]}
        >
          <Input
            style={{ height: 42, color: '#121212' }}
            name="question"
            placeholder="Your faq question"
          />
        </FormItem>
        <FormItem
          name="answer"
          label={<p className="text-slate-700 font-semibold">{editData ? "Update Answer" : "Add Answer"}</p>}
          rules={[
            {
              required: true,
              message: "Enter FAQ answer",
            },
          ]}
        >
          {/* <TextArea style={{ height: 42 }} name="answer" placeholder='Your faq answer' /> */}
          <TextArea rows={4} style={{color: '#121212'}} name="answer" placeholder="Your faq answer" />
        </FormItem>
        <div className="flex items-center justify-center">
          <Button className="" type="primary" size="large" htmlType="submit">
            {editData ? "Update FAQ" : "Add FAQ"}
          </Button>
        </div>
      </Form>
    </Modal>
  );
};


export default FaqAddModal;