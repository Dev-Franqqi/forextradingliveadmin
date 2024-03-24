import { useState, useEffect,FormEvent } from "react";
import { getDoc, doc, updateDoc, deleteDoc } from "firebase/firestore";
import { useParams } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import createTransaction from "@/utils/createTransaction";
import { Transaction } from "@/utils/createTransaction";
import { db } from "@/components/firebase";
import getTransaction from "@/utils/getTransaction";
import deleteTransaction from "@/utils/deleteTransaction";


import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

interface Person {
  firstname: string;
  lastname: string;
  password: string;
  email: string;
  amount: number;
  uid: string;
  ssn?: string;
}
interface Transactions extends Transaction{
    _id:string
}


interface User extends Person {
  id: string;
}


export default function Userdetails() {
 

  const { userId = "" } = useParams<{ userId?: string }>();

  const [user, setUser] = useState<User>();
  const [loading, setLoading] = useState<boolean>(true);
  const [amount, setAmount] = useState<number>();
  const [success1, setSuccess1] = useState<string>();
  const [success2, setSuccess2] = useState<string>();
  const [success3, setSuccess3] = useState<string>();
  const [transaction, setTransaction] = useState<Transactions[]>();
  const [error1, setError1] = useState<string>();
  const [error2, setError2] = useState<string>();
  const [error3, setError3] = useState<string>();
  const [email, setEmail] = useState<string>("");
  const [transactionType, setTransactionType] = useState<string>("");
  const [transactionDetail, setTransactionDetail] = useState<string>("");
  const [transactionAmount, setTransactionAmount] = useState<number>(0);
  
     const deleteATransaction = async (e: React.MouseEvent<SVGElement>) => {
       const id: string =
         (e.target as HTMLElement)?.getAttribute("aria-describedby") || "";

       console.log(id);
       try {
           await deleteTransaction(id);
           setError3('')

         setSuccess3("Successfully deleted transaction");
       } catch (error: any) {
           setSuccess3('')
           setError3(error.message);
           
       }
  };
  
  const createATransaction = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError2("");

    try {
      await createTransaction({
        email,
        transactionType,
        transactionDetail,
        transactionAmount,
      });
      setError2("");
      setSuccess2("Successfully created transaction");
    } catch (error: any) {
      setError2(error.message);
      setSuccess2("");
    }
  };
  const changeAmount = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (amount === null || amount === undefined) {
      throw Error("please fill in the amount");
      setError1("Please fill in the amount");
      setSuccess1(undefined);
    }
    const docref = doc(db, "UserInfo", userId);

    updateDoc(docref, { amount: amount })
      .then(() => {
        setError1("");

        setSuccess1("Successfully changed the amount");
      })
      .catch((err: any) => {
        console.log(err);
        setError1(err.message);
      });
  };

  const deleteDocu = (id: string) => {
    const docref = doc(db, "UserInfo", id);

    deleteDoc(docref)
      .then(() => console.log("Deleted successfully"))
      .catch((err: any) => console.log(err));
  };

  const fetchTransaction = async () => {
    try {
      if (user && user.email) {
        const res = await getTransaction(user.email);
        setTransaction(res);
        console.log(res); // Log the response instead of the state directly
      }
    } catch (error: any) {
      setError3(error.message);
    }
  };

  

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (userId) {
          const userDocRef = doc(db, "UserInfo", userId);
          const userDocSnapshot = await getDoc(userDocRef);

          if (userDocSnapshot.exists()) {
            const userData = userDocSnapshot.data() as Person;
            setUser({ id: userId, ...userData });
            setLoading(false);
          } else {
            console.error(`User with ID ${userId} not found.`);
            setUser(undefined);
          }
        }
      } catch (error: any) {
        console.error("Error fetching user details:", error);
        setError1("Error fetching user details");
      }
    };

    fetchData();
    if (loading === false) {
      fetchTransaction();
    }

   
  }, [userId, loading]);

  return (
    <>
      {loading ? (
        "Loading"
      ) : (
        <>
          <nav className="bg-blue-500 p-1 text-white">
            <header className="text-center font-bold">CRYPTNETVERSE</header>
          </nav>

          {error1 && <div className="text-red-500">{error1}</div>}
          {success1 && <div className="text-green-600">{success1}</div>}
          <main className="p-6 bg-white">
            <h1 className="text-2xl font-bold">
              {user?.firstname} {user?.lastname}
            </h1>

            {user && (
              <span
                onClick={() => deleteDocu(user.id)}
                className="cursor-pointer text-sm rounded mb-2 bg-red-500 text-white p-1"
              >
                Delete Account
              </span>
            )}

            <p className="mt-2">
              <span className="font-semibold">Email:</span> {user?.email}
            </p>
            <p>
              <span className="font-semibold">SSN:</span> {user?.ssn}
            </p>
            <p>
              <span className="font-semibold">Password: </span>
              {user?.password}
            </p>

            <p>
              <span className="font-semibold">UID: </span>
              {user?.uid}
            </p>

            <p>
              <span className="font-semibold">Amount: </span>
              {user?.amount}
            </p>

            <form onSubmit={changeAmount} className="mb-4 ">
              <Input
                onChange={(e) => setAmount(parseFloat(e.target.value))}
                type="number"
                className="w-3/5 mb-3"
              />

              <button
                type="submit"
                className="rounded cursor-pointer bg-blue-500 p-2 text-md text-white"
              >
                Change Amount
              </button>
            </form>
          </main>

          <section className="px-5 py-8">
            <div className="flex justify-between mb-5">
              <h2 className=" font-bold">Transactions</h2>
              <Sheet>
                <SheetTrigger className="text-blue-500">
                  Add Transaction
                </SheetTrigger>
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle>Create New Transaction</SheetTitle>
                    <SheetDescription>Complete all Fields</SheetDescription>
                  </SheetHeader>

                  <form
                    className="mb-4 pt-10 flex flex-col gap-y-5"
                    onSubmit={createATransaction}
                  >
                    {error2 && <div className="text-red-500">{error2}</div>}
                    {success2 && <div className="text-green-600">{success2}</div>}
                    <Input
                      placeholder="Email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <Input
                      placeholder="Deposit or Withdrawal"
                      type="text"
                      value={transactionType}
                      onChange={(e) => setTransactionType(e.target.value)}
                    />
                    <Input
                      placeholder="Transaction Detail"
                      type="text"
                      value={transactionDetail}
                      onChange={(e) => setTransactionDetail(e.target.value)}
                    />
                    <Input
                      placeholder="Transaction Amount"
                      type=""
                      value={transactionAmount}
                      onChange={(e) =>
                        setTransactionAmount(parseInt(e.target.value))
                      }
                    />
                    <Button>Submit</Button>
                  </form>
                </SheetContent>
              </Sheet>
            </div>
            {loading ? (
              <div>Loading...</div>
            ) : (
              <div>
                {error3 && (
                  <div className="text-red-500 text-center">{error3}</div>
                )}
                {success3 && <div className="text-green-600">{success3}</div>}
              </div>
            )}
            <Table>
              <TableCaption>A list of your recent invoices.</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Invoice</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Detail</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {transaction?.map((invoice: Transactions, index: number) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">
                      {index + 1}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6"
                        aria-describedby={invoice._id}
                        onClick={deleteATransaction}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                        />
                      </svg>
                    </TableCell>
                    <TableCell>{invoice.transactionType}</TableCell>
                    <TableCell>{invoice.transactionDetail}</TableCell>
                    <TableCell
                      className={
                        "text-right font-bold"
                  
                      }
                    >
                      ${invoice.transactionAmount}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </section>
        </>
      )}
    </>
  );
}
