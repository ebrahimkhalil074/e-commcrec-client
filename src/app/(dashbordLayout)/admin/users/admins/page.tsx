import AllUsersTable from "@/src/components/table/UsersTable";

const AdminPage = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_API}/user?role=ADMIN`,
  );
  const usersData = await res.json();

  const users = usersData?.data;

  return <div>{<AllUsersTable user={users} />}</div>;
};

export default AdminPage;
