import { Button, Card, Col, Input, Modal, Row, Space, Typography } from "antd";
import { useEffect, useState } from "react";
import { FaDollarSign, FaEdit } from "react-icons/fa";
import { useGetCommissionShippingQuery, useUpdateCommissionShippingMutation } from "../../../redux/features/setting/settingApi";
import toast from "react-hot-toast";

const { Title, Text } = Typography;

const CommissionShipping = () => {
  // Commission values
  const [commission, setCommission] = useState<number>(0);
  const [shippingCharge, setShippingCharge] = useState<number>(0);

  const [currentType, setCurrentType] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ fee: "" });
  const { data, isLoading} = useGetCommissionShippingQuery(null);
  const [updateCommissionShipping] = useUpdateCommissionShippingMutation();



  useEffect(() => {
    if (data) {
      data?.map((item: any) => {
        if (item?.type === "commission") {
          setCommission(item?.value)
        } else {
          setShippingCharge(item?.value)
        }
      })
    }

  }, [data]);

  useEffect(() => {
    if (!isModalOpen) {
      setFormData({ fee: "" });
      setCurrentType(null);
    }
  }, [isModalOpen]);

  const handleOpenModal = (type: any) => {
    setCurrentType(type);
    setFormData({
      fee:
        type === "commission"
          ? commission.toString()
          : shippingCharge.toString(),
    });
    setIsModalOpen(true);
  };

  const handleChange = (value: string) => {
    setFormData({ fee: value });
  };

  const handleSubmit = async () => {
    const feeValue = parseFloat(formData.fee);
    const data = {
      type: currentType,
      value: feeValue
    }
    try {
      if (currentType === "commission") {
        setCommission(feeValue);
        await updateCommissionShipping(data).unwrap();
        toast.success("Commission updated successfully");
        
      } else if (currentType === "deliveryCharge") {
        setShippingCharge(feeValue);
        const data = {
          type: currentType,
          value: feeValue
        }
        await updateCommissionShipping(data).unwrap();        
        toast.success("Shipping Charge updated successfully");
      }    
    } catch (error) {
      console.log("error", error);

    }


    setIsModalOpen(false);
  };

  const CommissionCard = ({
    title,
    commission,
    type,
  }: {
    title: string;
    commission: number;
    type: "commission" | "deliveryCharge";
  }) => (
    <Card
      title={<Title level={5}>{title}</Title>}
      extra={
        <Button type="primary" icon={<FaEdit />} onClick={() => handleOpenModal(type)}>
          Edit
        </Button>
      }
      style={{
        marginBottom: 20,
        borderRadius: 12,
        border: "1px solid rgba(0,0,0,0.2)",
      }}
    >
      <Space
        style={{
          display: "flex",
          alignItems: "center",
          backgroundColor: "#cd671c",
          color: "white",
          padding: 20,
          borderRadius: 8,
        }}
      >
        <div
          style={{
            fontSize: 32,
            color: "black",
            backgroundColor: "white",
            borderRadius: "50%",
            padding: 8,
            marginRight: 16,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <FaDollarSign />
        </div>

        <div >
          <Text className="text-white!">{title}</Text>
          <Title level={3} style={{ margin: 0, color: "white" }}>
            {commission}{type === "deliveryCharge" ? " BDT" : "%"}
          </Title>
        </div>
      </Space>
    </Card>
  );

  return (
    <div style={{ padding: 32 }}>
      {!isLoading && data && <Row gutter={32}>
        {/* First card: Commission */}
        <Col xs={24} md={12}>
          <CommissionCard title="Commission" commission={commission} type="commission" />
        </Col>

        {/* Second card: Shipping Charge */}
        <Col xs={24} md={12}>
          <CommissionCard title="Shipping Charge" commission={shippingCharge} type="deliveryCharge" />
        </Col>
      </Row>
}
      <Modal
        title={`Edit ${currentType === "commission"
          ? "commission"
          : "deliveryCharge"
          }`}
        centered
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        onOk={handleSubmit}
        okText="Update"
        cancelText="Cancel"
      >
        <Input
          style={{ marginTop: 16, height: 45 }}
          placeholder={currentType === "commission" ? "Amount (USD)" : "Commission (%)"}
          value={formData.fee}
          onChange={(e) => handleChange(e.target.value)}
        />
      </Modal>
    </div>
  );
};

export default CommissionShipping;
