import AllUsersTable from "@/src/components/table/UsersTable";

const CustomerPage = async () => {
  const res = await fetch("http://localhost:5000/api/v1/user?role=CUSTOMER");
  const CustomerData = await res.json();

  console.log(CustomerData);
  const Customer = CustomerData?.data;

  return <div>{<AllUsersTable user={Customer} />}</div>;
};

export default CustomerPage;
