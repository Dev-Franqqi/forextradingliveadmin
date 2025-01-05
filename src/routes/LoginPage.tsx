
import { useState ,useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FormEvent } from "react";
import Cookies from "js-cookie"

export default function LoginPage() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    if (username === "" || password === "") {
      setError(true);
      setErrorMessage("Please fill in all fields");
      setLoading(false);
      return;
    }

    // Corrected condition for username and password
    if (!(username === "forextradinglive" && password === "Agbawo27")) {
      setError(true);
      setErrorMessage("Incorrect Email or Password");
      setLoading(false);
      return;
    }
    Cookies.set('adminT',JSON.stringify({username,password}))
    setLoading(false);
    navigate("/dashboard");
  };

  useEffect(() => {
    const admin = Cookies.get('adminT')
    if (admin) {
      navigate('/dashboard')
    }
  })

  return (
    <>
      <nav className="p-1 font-bold">
        <header className="text-center">FOREX TRADING LIVE</header>
      </nav>
      <main className="text-center  text-white h-svh py-10">
        <form
          onSubmit={handleSubmit}
          className="md:border w-4/5 md:w-2/5 mx-center mx-auto  h-4/5 py-12 px-5 rounded-lg bg-white text-black"
        >
          <h1 className="text-xl font-bold mb-6">Login Admin</h1>
          {error && <div className="text-red-500 mb-1">{errorMessage}</div>}
          <Input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            className="mx-auto mb-2"
          />
          <Input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Password"
            className="mx-auto mb-4"
          />
          <Button
            type="submit"
            disabled={loading}
            className="text-white font-bold w-3/5"
          >
            Log in
          </Button>
        </form>
      </main>
    </>
  );
}
