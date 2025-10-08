import { Card, CardHeader } from "@heroui/card";

import AllUsersTable from "@/src/components/table/UsersTable";

const CustomerPage = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_API}/user?role=CUSTOMER`,
  );
  const customerData = await res.json();

  const customer = customerData?.data;

  return (
    <div>
      <Card>
        <CardHeader className="flex justify-between items-center bg-amber-500 text-white rounded-t-2xl px-6 py-4">
          <h1 className="text-xl font-bold">All Customers</h1>
        </CardHeader>
        {<AllUsersTable user={customer} />}
      </Card>
    </div>
  );
};

export default CustomerPage;
