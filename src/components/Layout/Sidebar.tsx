import { Button, ConfigProvider, Layout, Menu } from "antd";
import { FiLogOut } from "react-icons/fi";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { sidebarItems } from "../../utils/sidebarItems";
import Cookies from "js-cookie";

const { Sider } = Layout;

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const generateSidebarItems = (items: any) => {
    return items?.map((item: any) => {
      if(item?.children){
        return {
          key: item?.key,
          icon: item?.icon,
          label: item?.label,
          children: item?.children?.map((child :any)=> ({
            key: `/${child?.path}`,
            icon: child?.icon,
            label: <Link to={`/${child?.path}`}>{child?.label}</Link>
          }))
        }
      }
      return {
        key: `/${item?.key}`,
        icon: item?.icon,
        label: <Link to={`/${item?.path}`}>{item?.label}</Link>,
      };
    });
  };


  const handleLogout = () =>{
    navigate("/login");
    Cookies.remove("accessToken")
  }
  return (
    <ConfigProvider
      theme={{
        token: { colorPrimary: "#8B4E2E" },
        components: {
          Menu: {
            // itemSelectedBg: "#1A1A1A",
            itemSelectedBg: "#8B4E2E",
            itemSelectedColor: "#ffffff",
            itemColor:"#121212",
            itemActiveBg: "#8B4E2E",
            itemHoverBg: "rgba(139,78,46, .8)",
            itemHoverColor: "#ffffff",
            itemBorderRadius: 0,
            itemHeight: 45,
            itemMarginBlock: 12,
            motionDurationFast: "0.1s",            
          },
        },
      }}
    >
      <Sider width={250} theme="light"  breakpoint="md" collapsedWidth="0" className="border-r border-gray-100">
        <div className=" w-full h-[100px] ">
          <Link to="/"><img src="/Horizontal_logo.png"  className="w-48 pt-5 mx-auto" alt="" /></Link>
        </div>
        <div className="flex flex-col" style={{height: "calc(100vh - 100px)",}}>
        <Menu theme="light" mode="inline" selectedKeys={[location?.pathname]} items={generateSidebarItems(sidebarItems)}  style={{flexGrow: 1, overflowY: "auto", }}/>

        {/* Logout Button */}
        <Button onClick={()=>handleLogout()} size="large" style={{borderRadius: "0", paddingLeft: 30, minHeight: 45, marginTop: "auto"}} className="!flex !justify-start" icon={<FiLogOut size={20} />}>  
        LogOut        
        </Button>        
        </div>
      </Sider>
    </ConfigProvider>
  );
};

export default Sidebar;
