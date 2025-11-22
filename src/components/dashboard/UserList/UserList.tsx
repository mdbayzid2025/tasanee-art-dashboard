import {
  EyeOutlined,
  SearchOutlined
} from "@ant-design/icons";
import { Button, Divider, Form, Input, Modal, Space, Table, Tooltip } from "antd";
import FormItem from "antd/es/form/FormItem";
import { useEffect, useState } from "react";
import { CiLock, CiUnlock } from "react-icons/ci";
import { TbMessageDots } from "react-icons/tb";
import UserDetailsModal from "./UserDetailsModal";
import { useGetUsersQuery, useUpdateUserMutation } from "../../../redux/features/user/userApi";
import { useUpdateSearchParams } from "../../../utils/updateSearchParams";
import toast from "react-hot-toast";
import dayjs from "dayjs";
import { getSearchParams } from "../../../utils/getSearchParams";

const UserList = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [openWarning, setOpenWarning] = useState(false);
  const [openUserDetails, setOpenUserDetails] = useState(false);
  const {data: usersData, isLoading, refetch} = useGetUsersQuery(undefined)
  const [currentPage, setCurrentPage] = useState(1)

  const [updateUser] = useUpdateUserMutation()

  const {searchTerm} = getSearchParams();
  const updateSearchParams = useUpdateSearchParams()
  
  useEffect(()=>{
    refetch()
  },[searchTerm])

  const handleUpdateStatus = async (record :any)=>{
    try {
      const data = {id: record?._id, status : record?.status == 'ACTIVE' ? 'INACTIVE' : 'ACTIVE' }
      const res = await updateUser(data);
      
      toast.success(res?.data?.message);
    } catch (error) {
      console.log(" handleUpdateStatus error",error);      
    }
  }
  const pageSize = usersData?.pagination?.limit ?? 10;

  const columns = [
    {
      title: "SL No",
      dataIndex: "slNo",
      key: "slNo",
      render: (_ :any, __ :any, index :any) => index + 1,
      width: 80,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
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
    },
     {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (text : string)=> <span className={`${text == 'ACTIVE' ? 'text-green-500' : 'text-red-400'} font-semibold`}>{text}</span>
    },  
    {
      title: "Join Date",
      dataIndex: "joinDate",
      key: "joinDate",
      render: (text : string)=> dayjs(text).format("DD MMM, YY")
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
              onClick={() => {
                setOpenUserDetails(true);
                setSelectedUser(record);
              }}
            />
          </Tooltip>
          <Tooltip title={record?.status == "Active" ? "Active" : "Banned"}>
            <div className="" onClick={()=>handleUpdateStatus(record)}>
           { record?.status?.toLowerCase() == "active" ?  <CiUnlock
              size={20}
              style={{ color: "green", cursor: "pointer" }}
              onClick={() => console.log("Banned:", record)}
            />  :
             <CiLock
              size={20}
              style={{ color: "red", cursor: "pointer" }}
              onClick={() => console.log("Banned:", record)}
            />
            }
            </div>

          </Tooltip>          
          <Tooltip title="Edit">
            <TbMessageDots
              size={20}
              style={{ color: "orange", cursor: "pointer" }}
              onClick={() => {
                setSelectedUser(record);
                setOpenWarning(true);
              }}
            />
          </Tooltip>
        </Space>
      ),
    },
  ];

  return (
    <div className="bg-white rounded-xl p-6 h-full">
      <div className="flex items-center justify-between mb-6 ">
        <h1 className="text-2xl text-primary font-semibold">User Management</h1>
        <Form>
          <div className="flex items-center">
            <Input
              id="search"
              placeholder="Search"
              onChange={(e)=>updateSearchParams({searchTerm: e.target.value})}
              style={{                                
                height: 48,
                color: "#808080",
              }}
              className="!rounded-r-none md:!w-[350px]"
            />
            <Button
              size="large"
              icon={<SearchOutlined />}              
              target="_blank"
              className="!bg-white !w-[50px] !h-[48px] !rounded-none !rounded-r-md"
            />
          </div>
        </Form>
      </div>
      <WarningModal
        open={openWarning}
        setOpen={setOpenWarning}
        onSubmit={(reason) => console.log("Warning reason:", reason)}
      />
      <Table
        dataSource={usersData?.data}
        columns={columns}
        loading={isLoading}
        bordered
        pagination={{
          total: usersData?.pagination?.total,
          current: currentPage,
          pageSize,    
          onChange: (page) => setCurrentPage(page),     
        }}
      />      
      <UserDetailsModal   
      open={openUserDetails}
      data={selectedUser}    
      onClose={()=>setOpenUserDetails(false)} 
      />      
    </div>
  );
};

export default UserList;

interface WarningModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  onSubmit: (reason: string) => void;
}

const WarningModal = ({ open, setOpen, onSubmit }: WarningModalProps) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const handleClose = () => {
    form.resetFields();
    setOpen(false);
  };

  const handleFinish = async (values: { reason: string }) => {
    setLoading(true);
    try {
      await onSubmit(values.reason);
      form.resetFields();
      setOpen(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title={<p className="text-2xl pt-2.5 pb-1 leading-0 font-semibold text-primary">Warning</p>}
      
      open={open}
      onCancel={handleClose}
      footer={false}
      centered
    >
      <Divider />
      <Form
        form={form}
        layout="vertical"
        onFinish={handleFinish}
        style={{ marginTop: 10 }}
      >
        <FormItem
          label={
            <p className="text-gray font-semibold text-lg mb-5 ">
              Warning Message
            </p>
          }
          name="reason"
          rules={[{ required: true, message: "Please enter warning reason" }]}
        >
          <Input
            placeholder="Enter warning reason"  style={{height: 48}}          
          />
        </FormItem>

        <div className="flex justify-center">
          <Button
            type="primary"
            size="large"
            htmlType="submit"
            style={{ width: "100%", background: "#8B4E2E", marginTop: 30 }}
            loading={loading}
          >
            Send Warning
          </Button>
        </div>
      </Form>
    </Modal>
  );
};



