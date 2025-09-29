export const dynamic = "force-dynamic";
import PaymentTable from "@/src/components/table/PaymentTable";

const PaymentPage = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_API}/api/v1/payment`,
    {
      cache: "no-store",
    },
  );
  const paymentData = await res.json();
  const payments = paymentData?.data;

  console.log(payments);

  return (
    <div>
      <PaymentTable payments={payments} />
    </div>
  );
};

export default PaymentPage;
