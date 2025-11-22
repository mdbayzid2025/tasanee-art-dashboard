import { Button, Collapse } from "antd";
import { useState } from "react";
import { FiEdit, FiPlus } from "react-icons/fi";
import { GoTrash } from "react-icons/go";



import ConfirmModel from "../../UI/ConfirmModel";
import FaqAddModal from "./FaqAddModal";
import toast from "react-hot-toast";
import { useDeleteFAQMutation, useGetFAQQuery } from "../../../redux/features/setting/settingApi";

const FAQ = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [openConfirm, setOpenConfirm] = useState(false);

  const [editData, setEditData] = useState<any | null>(null);
  const [selectedFaq, setSelectedFaq] = useState<any | null>(null);

  const { data: faqData, refetch } = useGetFAQQuery(undefined);
  const [deleteFAQ] = useDeleteFAQMutation();

  const items = faqData?.map((faq: any, index: any) => ({
    key: index,
    label: (
      <div className="flex justify-between items-center w-full">
        <span className="text-base font-medium text-white">{faq.question}</span>
        <div className="flex items-center gap-3">
          <FiEdit
            size={20}
            className="text-white cursor-pointer "
            onClick={(e) => {
              e.stopPropagation(); // prevent collapse toggle
              setOpen(true);
              setEditData(faq);
            }}
          />
          <GoTrash
            size={22}
            className="text-red-400 cursor-pointer hover:text-red-800"
            onClick={() => {
              setOpenConfirm(true);
              setSelectedFaq(faq);
            }}
          />
        </div>
      </div>
    ),
    children: <p className="text-gray-700 text-justify">{faq?.answer}</p>,
  }));

  // --------------- Action --------------
  const handleDeleteFAQ = async () => {    
    try {
      const res = await deleteFAQ(selectedFaq?._id);
      
      if (res?.data) {
        toast.success("Delete FAQ Successfully");
        setOpenConfirm(false);
        setSelectedFaq(null)
        refetch();
      }
    } catch (error) {
      console.log("toast error", error),
       toast.error("Some thing wrong")
      }
  };

  return (
    <div className=" md:p-6 rounded-2xl bg-white h-full">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-semibold text-primary mb-6">FAQ</h1>
        <Button
          onClick={() => setOpen(!open)}
          type="primary"
          size="large"
          className="flex items-center"
        >
          {" "}
          <FiPlus size={24} />
          Add FAQ
        </Button>
      </div>

      <Collapse accordion items={items} defaultActiveKey={["0"]} />
      <FaqAddModal
        open={open}
        setOpen={setOpen}
        editData={editData}
        setEditData={setEditData}
        refetch={refetch}
      />
      <ConfirmModel
        open={openConfirm}
        title="Delete FAQ?"
        content={`Are you sure you want to delete "${selectedFaq?.question}"?`}
        okText="Yes, Delete"
        cancelText="Cancel"
        onConfirm={handleDeleteFAQ}
        onCancel={() => {
          setOpenConfirm(false);
          setSelectedFaq(null);
        }}
      />
    </div>
  );
};

export type faqProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  editData?: any | null;
  setEditData: (editData: any | null) => void;
  refetch: any;
};

// --------------- FAQ ADD Update Data--------------------

export default FAQ;