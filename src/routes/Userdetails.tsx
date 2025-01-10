import { useState, useEffect,FormEvent } from "react";
import { getDoc, doc, updateDoc, deleteDoc } from "firebase/firestore";
import { useParams } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { getDocs } from "firebase/firestore";
import { db } from "@/components/firebase";
import { query } from "firebase/firestore";
import { where } from "firebase/firestore";
import { collection } from "firebase/firestore";
import TransactionForm from "@/mycomps/createTransactionForm";

export type TR ={
  name:string,
  type:string,
  tamount:number,
  date:string,
  docref:string

 }
interface Person {
  firstname: string;
  lastname: string;
  password: string;
  email: string;
country: string;
phone:string;
  uid: string;
  investment:string
  totaldeposits:number;
  currentprofits:number;
}


interface User extends Person {
  id: string;
}


export default function Userdetails() {
 

  const { userId = "" } = useParams<{ userId?: string }>();

  const [user, setUser] = useState<User>();
  const [loading, setLoading] = useState<boolean>(true);
  const [currentAmount, setCurrentAmount] = useState<number>();
  const [depositAmount, setDepositAmount] = useState<number>();
  const [success1, setSuccess1] = useState<string>();
  const [transactions, setTransactions] = useState<TR[]>();
  const [error1, setError1] = useState<string>();
  
    
 
  const changeCurrentAmount = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (currentAmount === null || currentAmount === undefined) {
      throw Error("please fill in the amount");
      setError1("Please fill in the amount");
      setSuccess1(undefined);
    }
    const docref = doc(db, "UserInfo", userId);

    updateDoc(docref, { currentprofits: currentAmount })
      .then(() => {
        setError1("");

        setSuccess1("Successfully changed the amount");
      })
      .catch((err: any) => {
        console.log(err);
        setError1(err.message);
      });
  };
  const changeDepositAmount = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (depositAmount === null || depositAmount === undefined) {
      throw Error("please fill in the amount");
      setError1("Please fill in the amount");
      setSuccess1(undefined);
    }
    const docref = doc(db, "UserInfo", userId);

    updateDoc(docref, { totaldeposits: depositAmount })
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
    if (user) {
      const q = query(
          collection(db, "transactions"),
          where("docref", "==", user.uid) // Use user.uid directly, no need for template literals
      );
  
      
          getDocs(q)
              .then(snapshot => {
                  const transactions = snapshot.docs.map(doc => doc.data() as TR);
                  setTransactions(transactions); // Set all matching transactions
                  console.log("Matching transactions:", transactions);
              })
              .catch(error => {
                  console.error("Error fetching transactions:", error);
              })
              .finally(() => {
                  setLoading(false); // Ensure loading is set to false regardless of success or error
              });
      
  }
    if (loading === false) {
      fetchTransaction();
    }

   
  }, [userId, loading,transactions]);

  return (
    <>
      {loading ? (
        "Loading"
      ) : (
        <>
          <nav className="bg-blue-500 p-1 text-white">
            <header className="text-center font-bold">FOREX TRADING LIVE</header>
          </nav>

          {error1 && <div className="text-red-500">{error1}</div>}
          {success1 && <div className="text-green-600">{success1}</div>}
          <main className="p-6 bg-white md:w-3/5 md:justify-between md:mx-auto">
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
              <span className="font-semibold">Phone:</span> {user?.phone}
            </p>
            <p>
              <span className="font-semibold">Password: </span>
              {user?.password}
            </p>
           
            <p>
            <span className="font-semibold">Country: </span>
              {user?.country}
              
            </p>

            <p>
              <span className="font-semibold">UID: </span>
              {user?.uid}
            </p>

            <p>
              <span className="font-semibold">Current Profits: </span>
              {user?.currentprofits}
            </p>

            <form onSubmit={changeCurrentAmount} className="mb-4 ">
              <Input
                onChange={(e) => setCurrentAmount(parseFloat(e.target.value))}
                type="number"
                className="w-3/5 mb-3"
              />

              <button
                type="submit"
                className="rounded cursor-pointer bg-blue-500 p-2 text-md text-white"
              >
                Change Current Profits
              </button>
            </form>
            <p>
              <span className="font-semibold">Deposits: </span>
              {user?.totaldeposits}
            </p>

            <form onSubmit={changeDepositAmount} className="mb-4 ">
              <Input
                onChange={(e) => setDepositAmount(parseFloat(e.target.value))}
                type="number"
                className="w-3/5 mb-3"
              />

              <button
                type="submit"
                className="rounded cursor-pointer bg-blue-500 p-2 text-md text-white"
              >
                Change Deposit
              </button>
            </form>
          </main>

          <section className="px-5 py-8">
            <div className="flex justify-between mb-5">
              <h2 className=" font-bold">Transactions</h2>
              {user?.uid? <TransactionForm uid={user?.uid} />: "no user id"}
             
            </div>
            {loading ? (
              <div>Loading...</div>
            ) : (
              <div>
               
              </div>
            )}
             <div className="p-4 bg-gray-800 text-white">
      <h2 className="text-lg font-bold mb-4">Transactions</h2>
      <div className="border-t border-yellow-500 mb-4"></div>
      {transactions ? transactions.map((transaction, index) => (
        <div key={index} className="flex justify-between items-center py-4 border-b border-gray-700">
          <div>
            <h3 className="text-sm font-semibold">{transaction.name}</h3>
            <p className="text-xs text-gray-400">{transaction.type}</p>
            <p className="text-xs text-gray-400 mt-1">{transaction.date}</p>
          </div>
          <div
            className={`text-sm font-bold px-3 py-1 rounded ${
              transaction.tamount < 0 ? 'bg-red-600 text-white' : 'bg-green-600 text-white'
            }`}
          >
            {transaction.tamount.toString()}
          </div>
        </div>
      )):<p>No Transactions Yet</p>}
    </div>
          </section>
        </>
      )}
    </>
  );
}
