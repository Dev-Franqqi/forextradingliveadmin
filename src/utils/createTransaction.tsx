export interface Transaction{
  email: string,
  transactionType: string,
  transactionDetail: string,
  transactionAmount: number
}

export default async function createTransaction(
  transactionData: Transaction
) {
  try {
    const response = await fetch(
      "https://franqqi-transaction-api.onrender.com/api/create",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(transactionData),
      }
    );

    if (!response.ok) {
      throw new Error("Could not create transaction");
    }

    const createdTransaction = await response.json();
    return createdTransaction;
  } catch (error:any) {
    throw new Error(error.message);
  }
}
