import PaymentTable from "@/src/components/table/PaymentTable";

const PaymentPage = async() => {
  const res = await fetch("http://localhost:5000/api/v1/payment")
  const paymentData =await res.json()
  const payments = paymentData?.data ;
  console.log(payments)
  return (
    <div>
        <PaymentTable payments={payments} />
    </div>
  );
};

export default PaymentPage;

