import { DeleteOutlined, EyeOutlined } from "@ant-design/icons";
import { Button, Space, Table, Tooltip } from "antd";
import dayjs from "dayjs";
import { useState } from "react";
import toast from "react-hot-toast";
import { CiLock, CiUnlock } from "react-icons/ci";
import {
  useCreateAdminMutation,
  useDeleteUserMutation,
  useGetAdminQuery,
  useUpdateUserMutation,
} from "../../../redux/features/user/userApi";
import ConfirmModal from "../../UI/ConfirmModel";
import AddAdminModal from "./AddAdminModal";

const AdminList = () => {
  const { data: adminData, refetch } = useGetAdminQuery(undefined);
  const [updateUser] = useUpdateUserMutation();
  const [deleteUser] = useDeleteUserMutation();
  const [selectedUser, setSelectedUser] = useState(null);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [open, setOpen] = useState(false);
  const [createAdmin] = useCreateAdminMutation();

  const handleUpdateStatus = async (record: any) => {
    try {
      const data = {
        id: record?._id,
        status: record?.status == "ACTIVE" ? "INACTIVE" : "ACTIVE",
      };
      const res = await updateUser(data).unwrap();

      toast.success(res?.data?.message);
    } catch (error : any) {
      toast.error(error?.data?.message);
    }
  };

  const handleDeleteAdmin = async () => {
    try {
      // @ts-ignore
      const res = await deleteUser(selectedUser?._id).unwrap();
      console.log("delete", res);
      
      toast.success("Admin delete Success");
      setSelectedUser(null);
      setOpenConfirm(false);
    } catch (error : any) {     
      console.log("update", error);
      
      toast.error(error?.data?.message);
    }
  };
  const columns = [
    {
      title: "SL No",
      dataIndex: "slNo",
      key: "slNo",
      render: (_: any, __: any, index: any) => index + 1,
      width: 80,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      render: (text: string) => text.split("_").join(" "),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (text: string) => (
        <span
          className={`${
            text == "ACTIVE" ? "text-green-500" : "text-red-400"
          } font-semibold`}
        >
          {text}
        </span>
      ),
    },
    {
      title: "Join Date",
      dataIndex: "joinDate",
      key: "joinDate",
      render: (text: string) => dayjs(text).format("DD MMM, YY"),
    },

    {
      title: "Action",
      key: "action",
      width: 130,
      render: (_: any, record: any) => (
        <Space size="middle">
          <Tooltip title="View">
            <EyeOutlined
              size={20}
              style={{ color: "#1890ff", cursor: "pointer" }}
              onClick={() => {}}
            />
          </Tooltip>
          <Tooltip title={record?.status == "Active" ? "Active" : "Banned"}>
            <div className="" onClick={() => handleUpdateStatus(record)}>
              {record?.status?.toLowerCase() == "active" ? (
                <CiUnlock
                  size={20}
                  style={{ color: "green", cursor: "pointer" }}
                  onClick={() => console.log("Banned:", record)}
                />
              ) : (
                <CiLock
                  size={20}
                  style={{ color: "red", cursor: "pointer" }}
                  onClick={() => console.log("Banned:", record)}
                />
              )}
            </div>
          </Tooltip>
          <DeleteOutlined
            size={20}
            style={{ color: "red", cursor: "pointer" }}
            onClick={() => {
              setSelectedUser(record);
              setOpenConfirm(true);
            }}
          />
        </Space>
      ),
    },
  ];

  const handleUpdateAdmin = async (values: any) => {
    try {
      await createAdmin(values).unwrap();        
      toast.success("Admin created Success")
      refetch();

    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <div className="bg-white rounded-xl p-6 h-full">
      <div className="flex items-center justify-between mb-6 ">
        <h1 className="text-2xl text-primary font-semibold">
          Admin Management
        </h1>
        <Button onClick={() => setOpen(true)} type="primary" size="large">
          Add Admin
        </Button>
      </div>

      <Table
        dataSource={adminData}
        columns={columns}
        bordered
        pagination={{ pageSize: 10 }}
      />
      <ConfirmModal
        open={openConfirm}
        title="Delete Admin?"
        content={`Are you sure you want to delete "${
          (selectedUser as any)?.name
        } Admin"?`}
        okText="Yes, Delete"
        cancelText="Cancel"
        onConfirm={handleDeleteAdmin}
        onCancel={() => {
          setOpenConfirm(false);
          setSelectedUser(null);
        }}
      />

      <AddAdminModal
        editData={selectedUser}
        open={open}
        setOpen={setOpen}
        onSubmit={handleUpdateAdmin}
      />
    </div>
  );
};

export default AdminList;
