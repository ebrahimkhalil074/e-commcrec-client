import { Card, CardHeader } from "@heroui/card";

import AllUsersTable from "@/src/components/table/UsersTable";

const UsersPage = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/user`);
  const usersData = await res.json();

  console.log(usersData);
  const users = usersData?.data;

  return (
    <div>
      <Card>
        <CardHeader className="flex justify-between items-center bg-amber-500 text-white rounded-t-2xl px-6 py-4">
          <h1 className="text-xl font-bold">All Users</h1>
        </CardHeader>
        {<AllUsersTable user={users} />}
      </Card>
    </div>
  );
};

export default UsersPage;
