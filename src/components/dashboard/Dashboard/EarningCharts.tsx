import { ConfigProvider, Select } from "antd";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const { Option } = Select;

const EarningCharts = () => {
  // Demo Data for Earnings (replace this with actual API data later)
  const demoEarningsData = [
    { month: "Jan", earnings: 12000 },
    { month: "Feb", earnings: 15000 },
    { month: "Mar", earnings: 13000 },
    { month: "Apr", earnings: 17000 },
    { month: "May", earnings: 16000 },
    { month: "Jun", earnings: 18000 },
    { month: "Jul", earnings: 19000 },
    { month: "Aug", earnings: 22000 },
    { month: "Sep", earnings: 21000 },
    { month: "Oct", earnings: 24000 },
    { month: "Nov", earnings: 25000 },
    { month: "Dec", earnings: 27000 },
  ];

  const CustomTooltip = ({ active, payload, label }: any) => {
    const isVisible = active && payload && payload.length;

    return (
      <div
        className="custom-tooltip w-[120px]"
        style={{ visibility: isVisible ? "visible" : "hidden" }}
      >
        {isVisible && (
          <div className="w-full py-3 pl-2 text-start bg-[#8B4E2E]/80 rounded-xl">
            <p className="text-white whitespace-nowrap font-semibold">
              {label}
            </p>
            <p className="text-white whitespace-nowrap">{`Earnings: $${payload[0].value}`}</p>
          </div>
        )}
      </div>
    );
  };

  const year = new Date().getFullYear();

  return (    
      <div className="w-full bg-white p-5 pb-0 rounded-xl">
        <div className="flex items-center justify-between  ">
          <div className="">
            <p className="font-semibold text-primary text-2xl">Earning</p>
          </div>

          <ConfigProvider
            theme={{
              components: {
                Select: {
                  colorBgContainer: "#8B4E2E",
                  colorBorder: "#8B4E2E",
                  colorText: "#FFFFFF",
                  colorBgElevated: "rgba(139,78,46, 1)",
                  optionSelectedBg: "#121212",
                  optionActiveBg: "#404040",
                },
              },
            }}
          >
            <Select
              defaultValue={year}
              style={{
                width: 120,
                paddingRight: 5,
                textAlign: "start",
                backgroundColor: "transparent",
              }}
            >
              <Option value={year}>{year}</Option>
              <Option value={year - 1}>{year - 1}</Option>
              <Option value={year - 2}>{year - 2}</Option>
              <Option value={year - 3}>{year - 3}</Option>
              <Option value={year - 4}>{year - 4}</Option>
            </Select>
          </ConfigProvider>
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart
            data={demoEarningsData}
            margin={{ left: 0, top: 20, right: 10, bottom: 0 }}
          >
            <defs>
              <linearGradient id="earnings" x1="0" y1="0" x2="0" y2="1">
                <stop offset="30%" stopColor="#8B4E2E" stopOpacity={0.8} />
                <stop offset="100%" stopColor="#8B4E2E" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="month"
              stroke="none"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#888", fontSize: 12 }}
            />
            <YAxis axisLine={false} tickLine={false} />
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <Tooltip wrapperStyle={{ width: 100 }} content={CustomTooltip} />
            <Area
              type="monotone"
              dataKey="earnings"
              stroke="#8B4E2E"
              strokeWidth={2.5}
              fillOpacity={1}
              fill="url(#earnings)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>    
  );
};

export default EarningCharts;
