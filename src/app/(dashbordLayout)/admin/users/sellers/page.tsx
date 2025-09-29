import AllUsersTable from "@/src/components/table/UsersTable";

const SellersPage = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_API}/user?role=SELLER`,
  );
  const sellersData = await res.json();

  console.log(sellersData);
  const sellers = sellersData?.data;

  return <div>{<AllUsersTable user={sellers} />}</div>;
};

export default SellersPage;
