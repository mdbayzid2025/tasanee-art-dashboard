import { BellOutlined } from "@ant-design/icons";
import { Avatar, Badge, Button } from "antd";
import { useGetProfileQuery } from "../../redux/features/auth/authApi";
import { imageUrl } from "../../redux/base/baseAPI";

const DashboardHeader = () => {

  const {data: profileData} = useGetProfileQuery(undefined);

  if(profileData){console.log("profileData",profileData)}


  return (
    <div className="h-[80px] border-b border-gray-300 flex items-center justify-end pr-5 bg-white gap-5">
      {/* <Badge count={0} showZero>
        <Button
          size="large"
          icon={
            <BellOutlined style={{ fontSize: 22, color: "rgba(0,0,0,.5)" }} />
          }
          href="https://www.google.com"
          target="_blank"
        />
      </Badge> */}

      <div className="flex items-center gap-3">
        <Avatar
          size={50}
          src={
            <img
            // @ts-ignore
              src={profileData?.profileImage ? `${imageUrl}${profileData?.profileImage}` : '/placeholder.png'}
              alt="avatar"
            />
          }
        />
        <div className="">
          <p className="font-bold text-lg">{profileData?.name}</p>
          <p className="text-slate-500 font-semibold">{profileData?.email}</p>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;
