import { Avatar, Button, Divider, Modal, Table } from "antd";
import dayjs from "dayjs";
import { imageUrl } from "../../../redux/base/baseAPI";

const TransactionViewModal = ({ open, onClose, transaction }: any) => {

  console.log('TransactionViewModal', transaction)
  const columns = [
    {
      title: "Field",
      dataIndex: "field",
      key: "field",
      render: (text: any) => <strong>{text}</strong>,
      width: 180,
    },
    {
      title: "Value",
      dataIndex: "value",
      key: "value",
    },
  ];

  const dataSource = [
    {
      key: "buyer",
      field: "Buyer",
      value: (
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <Avatar src={`${imageUrl}${transaction?.buyerId?.profileImage}`} size={40} />
          <span>{transaction?.buyerId?.name}</span>
        </div>
      ),
    },
    {
      key: "sellerId",
      field: "Seller",
      value: (
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <Avatar src={`${imageUrl}${transaction?.sellerId?.profileImage}`} size={40} />
          <span>{transaction?.sellerId?.name}</span>
        </div>
      ),
    },
    {
      key: "item",
      field: "Item",
      value: transaction?.item?.title,
    },
    {
      key: "platformFee",
      field: "Platform Fee",
      value: `${transaction?.platformFee} Tk`,
    },
    {
      key: "sellerEarning",
      field: "Seller Earning",
      value: `${transaction?.sellerEarning} Tk`,
    },
    {
      key: "date",
      field: "Transaction Date",
      value: transaction?.timestamp
        ? dayjs(transaction.timestamp).format("MMMM D, YYYY")
        : "N/A",
    },
    {
      key: "trxId",
      field: "Transaction ID",
      value: transaction?.trxId,
    },
    transaction?.status && {
      key: "status",
      field: "Status",
      value: (
        <span
          style={{
            color:
              transaction.status === "Completed"
                ? "green"
                : transaction.status === "Pending"
                ? "orange"
                : "red",
          }}
        >
          {transaction.status}
        </span>
      ),
    },
  ].filter(Boolean); // removes empty rows if status doesn't exist

  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      centered
      width={600}
      title={
        <h3 className="text-xl font-semibold text-primary">
          Transaction Details
        </h3>
      }
    >
      <Divider />

      {transaction && (
        <Table
          dataSource={dataSource}
          columns={columns}
          pagination={false}
          showHeader={false}
          bordered
          size="middle"
        />
      )}

      <div className="flex justify-end space-x-4 mt-6">
        <Button
          onClick={onClose}
          className="px-6 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
          style={{ borderRadius: "10px", fontWeight: "500" }}
        >
          Close
        </Button>
      </div>
    </Modal>
  );
};

export default TransactionViewModal;
