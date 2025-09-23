import AllUsersTable from "@/src/components/table/UsersTable";

const SellersPage = async() => {
  const res =await fetch("http://localhost:5000/api/v1/user?role=SELLER");
  const sellersData = await res.json()
  console.log(sellersData)
  const sellers = sellersData?.data ;
  return (
    <div>
     {
      <AllUsersTable user={sellers}/>
     }
    </div>
  );
};

export default SellersPage;