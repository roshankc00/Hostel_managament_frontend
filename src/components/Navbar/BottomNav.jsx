import Search from "./Search";

const BottomNav = () => {
  return (
    <div className="flex flex-col items-center h-[14rem] bg-red-700 mb-10">
      <div className="text-white text-[2rem] font-bold mt-10">HOSTEL MOTO</div>

      <Search />
    </div>
  );
};

export default BottomNav;
