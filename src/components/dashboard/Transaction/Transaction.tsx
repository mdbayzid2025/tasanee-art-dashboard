import { EyeOutlined } from "@ant-design/icons";
import { Image, Select, Table, Tooltip } from "antd";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import TransactionViewModal from "./TransactionViewModal";
import { useGetAllTransactionsQuery } from "../../../redux/features/dashboard/dashboardApi";
import { imageUrl } from "../../../redux/base/baseAPI";
import { useUpdateSearchParams } from "../../../utils/updateSearchParams";
import { getSearchParams } from "../../../utils/getSearchParams";

const Transaction = () => {
  const [selectedTransaction, setSelectedTransaction] = useState<any | null>(null);
  const [openView, setOpenView] = useState(false);
  const { data: transactionData, refetch, isLoading } = useGetAllTransactionsQuery({});
  const [currentPage, setCurrentPage] = useState(1)

  const { searchTerm, page, type } = getSearchParams();
  const updateSearchParams = useUpdateSearchParams()

  useEffect(() => {
    refetch()
  }, [searchTerm, page, type])

  const pageSize = transactionData?.pagination?.limit ?? 10;

  const columns = [
    {
      title: "Buyer Name",
      dataIndex: ["buyerId", "name profileImage"],
      render: (_: any, record: any) => {
        const buyer = record?.buyerId;

        return (
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <Image
              src={`${imageUrl}${buyer?.profileImage}`}
              alt={buyer?.name}
              style={{ width: 32, height: 32, borderRadius: "50%", objectFit: "cover" }}
            />
            <span>{buyer?.name}</span>
          </div>
        );
      },
      key: "buyerName",
    },
    {
      title: "Seller Name",
      dataIndex: ["sellerId", "name profileImage"],
      render: (_: any, record: any) => {
        const seller = record?.sellerId;

        return (
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <Image
              src={`${imageUrl}${seller?.profileImage}`}
              alt={seller?.name}
              style={{ width: 32, height: 32, borderRadius: "50%", objectFit: "cover" }}
            />
            <span>{seller?.name} </span>
          </div>
        );
      },
      key: "sellerName",
    },
    {
      title: "Item",
      dataIndex: ["item", "title"],
      render: (_: any, record: any) => <>{record?.item?.title} <span className="font-semibold">{record?.type}</span></>
    },
    {
      title: "Transaction Type",
      dataIndex: "type",
      render: (text: string) => <span className="text-primary font-bold">{text}</span>
    },
    {
      title: "Platform Fee",
      dataIndex: "platformFee",
      key: "platformFee",
    },
    {
      title: "Seller Earning",
      dataIndex: "sellerEarning",
      key: "sellerEarning",
    },
    {
      title: "Transaction ID",
      dataIndex: "trxId",
      key: "transactionId",
    },

    // If you have a timestamp field
    {
      title: "Transaction Date",
      dataIndex: "timestamp", // or createdAt
      key: "transactionDate",
      render: (timestamp: any) =>
        timestamp ? dayjs(timestamp).format("MMMM D, YYYY") : "N/A",
    },


    {
      title: "Action",
      key: "action",
      render: (_: any, record: any) => (
        <Tooltip title="View Transaction">
          <EyeOutlined
            size={20}
            style={{ color: "#1890ff", cursor: "pointer" }}
            onClick={() => {
              setSelectedTransaction(record);
              setOpenView(true);
            }}
          />
        </Tooltip>
      ),
    },
  ];

  return (
    <div className="bg-white rounded-xl p-6 h-full">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl text-primary font-semibold">Transactions</h1>
        <Select
          allowClear
          size="large"
          placeholder="Search By Service Category"
          onChange={(value) => updateSearchParams({ type: value })}
          style={{ width: 250, height: 42 }}          
          options={[
            { value: 'Arts', label: <span >Arts</span> },
            { value: 'Event', label: <span > Event</span> },            
            { value: 'Learning', label: <span>Learning</span> },
            ]}
        />
      </div>

      <Table
        loading={isLoading}
        dataSource={transactionData?.data}
        columns={columns}
        bordered
        pagination={{
          total: transactionData?.pagination?.total,
          current: currentPage,
          pageSize,
          onChange: (page) => { setCurrentPage(page); updateSearchParams({ page: page }) },
        }}
      />

      {/* Transaction View Modal */}
      <TransactionViewModal
        open={openView}
        onClose={() => setOpenView(false)}
        transaction={selectedTransaction}
      />
    </div>
  );
};

export default Transaction;


