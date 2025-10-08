import { Card, CardHeader } from "@heroui/card";

import AllUsersTable from "@/src/components/table/UsersTable";

const SellersPage = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_API}/user?role=SELLER`,
  );
  const sellersData = await res.json();

  const sellers = sellersData?.data;

  return (
    <div>
      <Card>
        <CardHeader className="flex justify-between items-center bg-amber-500 text-white rounded-t-2xl px-6 py-4">
          <h1 className="text-xl font-bold">All Sellers</h1>
        </CardHeader>
        {<AllUsersTable user={sellers} />}
      </Card>
    </div>
  );
};

export default SellersPage;
