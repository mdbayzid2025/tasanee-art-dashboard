import { Modal } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import React from "react";

type ConfirmModalProps = {
  open: boolean;
  title?: string;
  content?: string;
  okText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
  confirmLoading?: boolean;
  danger?: boolean;
};

const ConfirmModal: React.FC<ConfirmModalProps> = ({
  open,
  title = "Are you sure?",
  content = "This action cannot be undone.",
  okText = "Yes, Confirm",
  cancelText = "Cancel",
  onConfirm,
  onCancel,
  confirmLoading = false,
  danger = true,
}) => {
  return (
    <Modal
      open={open}
      title={
        <div className="flex items-center gap-2 border-b border-primary/20 pb-4">
          <ExclamationCircleOutlined className="text-red-500 text-2xl" />
          <p className="text-xl font-semibold text-primary">{title}</p>
        </div>
      }
      onOk={onConfirm}
      onCancel={onCancel}
      okText={okText}
      cancelText={cancelText}
      okButtonProps={{
        danger,
        className: "rounded-lg font-medium",
      }}
      cancelButtonProps={{
        className: "rounded-lg font-medium",
      }}
      confirmLoading={confirmLoading}
      centered
      className="rounded-2xl"
      bodyStyle={{ padding: "1.5rem", borderRadius: "1rem" }}
    >
      <p className="text-slate-600 text-base leading-relaxed">{content}</p>
    </Modal>
  );
};

export default ConfirmModal;
