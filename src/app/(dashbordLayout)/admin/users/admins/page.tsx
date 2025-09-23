import AllUsersTable from "@/src/components/table/UsersTable";

const AdminPage = async() => {
  const res =await fetch("http://localhost:5000/api/v1/user?role=ADMIN");
  const usersData = await res.json()
  console.log(usersData)
  const users = usersData?.data ;
  return (
    <div>
     {
      <AllUsersTable user={users}/>
     }
    </div>
  );
};

export default AdminPage;