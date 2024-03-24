

export default async function deleteTransaction(

  transactionId: string
) {
  try {
    const response = await fetch(
      `https://franqqi-transaction-api.onrender.com/api/delete/${transactionId}`,
      {
        method: "DELETE",
        // Add any necessary headers, such as Content-Type or Authorization
      }
    );

    if (!response.ok) {
      throw new Error("Could not delete transaction");
    }

    const data = await response.json();
    return data;
  } catch (error:any) {
    throw new Error(error.message);
  }
}
