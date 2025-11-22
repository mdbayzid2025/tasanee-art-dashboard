import { BsCurrencyDollar } from "react-icons/bs";
import { HiOutlineUserGroup } from "react-icons/hi";
import { LiaUserCheckSolid } from "react-icons/lia";

const Statics = ({users}:any) => {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-x-10 justify-between">

  {/* Total User */}
  <div className="flex justify-between gap-5 bg-white w-full p-5 rounded-2xl">
    <div>
      <p className="text-xl text-black font-normal">Total User</p>
      <h1 className="font-semibold text-black mt-4 text-4xl">{users?.total}</h1>
    </div>
    <div className="shrink-0 bg-primary w-12 h-12 flex items-center justify-center rounded-full">
      <HiOutlineUserGroup size={30} color="white" />
    </div>
  </div>

  {/* Total Active User */}
  <div className="flex justify-between gap-5 bg-white w-full p-5 rounded-2xl">
    <div>
      <p className="text-xl text-black font-normal">Total Active User</p>
      <h1 className="font-semibold text-black mt-4 text-4xl">{users?.active}</h1>
    </div>
    <div className="shrink-0 bg-primary w-12 h-12 flex items-center justify-center rounded-full">
      <LiaUserCheckSolid size={30} color="white" />
    </div>
  </div>

  {/* Total Subscriber */}
  <div className="flex justify-between gap-5 bg-white w-full p-5 rounded-2xl">
    <div>
      <p className="text-xl text-black font-normal">Total Subscriber</p>
      <h1 className="font-semibold text-black mt-4 text-4xl">3000</h1>
    </div>
    <div className="shrink-0 bg-primary w-12 h-12 flex items-center justify-center rounded-full">
      <LiaUserCheckSolid size={30} color="white" />
    </div>
  </div>

  {/* Total Revenue */}
  <div className="flex justify-between gap-5 bg-white w-full p-5 rounded-2xl">
    <div>
      <p className="text-xl text-black font-normal">Total Revenue</p>
      <h1 className="font-semibold text-black mt-4 text-4xl">5000</h1>
    </div>
    <div className="shrink-0 bg-primary w-12 h-12 flex items-center justify-center rounded-full">
      <BsCurrencyDollar size={30} color="white" />
    </div>
  </div>

</div>
  );
};

export default Statics;

