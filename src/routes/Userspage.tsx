import { Fragment, useEffect, useState } from "react";
import { getDocs} from "firebase/firestore";
import { colref } from "../components/firebase";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import Loadinganim from "@/mycomps/Loadinganim";
import { Link } from "react-router-dom";

interface Person {
  firstname: string;
  lastname: string;
  password: string;
  email: string;
  amount: number;
  uid: string;
  btcAmount?: number;
}

interface Dats {
  id: string;
  data: Person;
}

function UsersPage() {
  const navigate = useNavigate();

  const [users, setUsers] = useState<Dats[]>([]);
  
  const [loading,setLoading]  = useState<boolean>(true)



 

  useEffect(() => {
    const admin = Cookies.get("adminT");

    if (!admin) {
      navigate("/");
    }

    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(colref);
        const response = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data() as Person,
        }));

        if (response.length > 0) {
          setUsers(response);
          console.log(response);
        }

        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        // Handle error
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <nav className=" flex justify-between px-3 py-2 mb-2 bg-gray-200 ">
        <header className=" font-bold text-center">CRYPTONETVERSE</header>
        {/* <div className="hover:underline">
          <a href="https://console.firebase.google.com/u/0/project/tonye-project/firestore/data/~2FUserInfo~2F87MKUstd1rnFMV038KLq">
            View Database
          </a>
        </div> */}
        <Link className="underline text-blue-500" to="/license">Licenses</Link>
      </nav>

      <main className="w-full font-sans  pt-8  h-fit ">
        <h1 className=" font-semibold px-5 mb-4 text-center">WELCOME ADMIN</h1>
        <h2 className="font-medium px-5 mb-5">Users</h2>
        {loading ? (
          <Loadinganim />
        ) : (
          <ol className="px-3 list-disc list-inside w-full mb-4">
            {users.map((user) => (
              <Fragment key={user.id}>
                <li className="flex justify-between pt-2 mb-3 px-1 border-b">
                  <span>
                    {user.data.firstname} {user.data.lastname}
                  </span>
                  
                  <Link className="text-blue-600 font-semibold" to={`/dashboard/${user.id}`}>View</Link>
                </li>
                {/* <div className="rounded-md text-xs md:text-md py-3 px-1 mb-4">
                <span className="block">ID: {user.data.uid}</span>
                <span className="block">EMAIL: {user.data.email}</span>
                <span className="block">PASSWORD: {user.data.password}</span>
                <span className="block">AMOUNT: ${user.data.amount}</span>
                
              </div> */}
              </Fragment>
            ))}
          </ol>
        )}
      </main>
    </>
  );
}

export default UsersPage;
