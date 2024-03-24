import { getStorage, ref, listAll, getDownloadURL } from "firebase/storage";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
export default function License() {
  const storage = getStorage();
  const imageRef = ref(storage, "");
  const [driversLicense, setDriversLicense] = useState<string[]>([]); // Explicitly specifying the type as string[]

  useEffect(() => {
    listAll(imageRef)
      .then((response) => Promise.all(response.items.map(getDownloadURL)))
      .then((urls) => {
        setDriversLicense(urls);
      })
      .catch((error) => {
        console.error("Error fetching images:", error);
      });
  }, []); // Empty dependency array to run the effect only once on mount

  return (
      <>
          <nav className="flex gap-x-8 bg-blue-500 text-white p-1 font-bold mb-4"> <Link to="/dashboard">Go back</Link><header>Cryptnetverse</header>
          </nav>
      {Array.isArray(driversLicense) && driversLicense.length > 0 ? (
        driversLicense.map((url, index) => <img className="mx-auto w-[50%]" key={index} src={url} alt="" />)
      ) : (
        <p>No driver's license images found.</p>
      )}
    </>
  );
}
