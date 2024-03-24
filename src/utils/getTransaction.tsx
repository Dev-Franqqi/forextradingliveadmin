export default async function getTransaction(email:string) {
  try {
    const response = await fetch(
      `https://franqqi-transaction-api.onrender.com/api/transaction/${email}`
    );

    if (!response.ok) {
      throw new Error("No transaction found");
    }

    const data = await response.json();
    return data;
  } catch (error:any) {
    throw new Error(error.message);
  }
}
