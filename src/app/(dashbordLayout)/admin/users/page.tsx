import AllUsersTable from "@/src/components/table/UsersTable";

const UsersPage = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/user`);
  const usersData = await res.json();

  console.log(usersData);
  const users = usersData?.data;

  return <div>{<AllUsersTable user={users} />}</div>;
};

export default UsersPage;
