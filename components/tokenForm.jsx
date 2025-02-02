"use client";
import { Input } from "./ui/input";
import PhoneInput from "react-phone-number-input";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { useState } from "react";
import { Copy } from "lucide-react";
import axios from "axios";
import { useRouter } from "next/navigation";
import "react-phone-number-input/style.css";

const TokenForm = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState("");
  const [values, setValues] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const generateToken = () => {
    const code = Math.random().toString(36).substr(2, 6).toUpperCase();
    setToken(code);
  };

  const copyToken = () => {
    const codeSection = document.getElementById("codeDisplay");
    const code = codeSection.innerText;
    navigator.clipboard.writeText(code).then(() => {
      alert("Copied to clipboard");
    });
  };

  const validateEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  const validatePhone = (phone) => {
    const re = /^\+[1-9]{1}[0-9]{3,14}$/;
    return re.test(phone);
  };

  const validateName = (name) => {
    const re = /^[a-zA-Z\s]+$/;
    return re.test(name);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    const { name, email, phone } = values;
    const validatedEmail = validateEmail(email);
    const validatedPhone = validatePhone(phone);
    const validatedName = validateName(name);

    const payload = { name, email, phone, token };
    const baseUrl = process.env.NEXT_PUBLIC_BASEURL || "http://localhost:3000";

    if (!validatedEmail || !validatedPhone || !validatedName) {
      alert("Please provide valid details");
      return;
    }
    axios
      .post(`${baseUrl}/api/exclusive`, payload)
      .then((res) => {
        if (res.status === 201) {
          alert("Token received");
          setValues({ name: "", email: "", phone: "" });
          setToken("");
          router.push("/"); // Redirect to home page
        }
      })
      .catch((err) => {
        if (err.response.status === 400) {
          alert("Please fill all fields");
        } else {
          alert("An error occurred. Please try again:", err.message);
        }
      })
      .finally(() => {
        setValues({ name: "", email: "", phone: "" });
        setToken("");
        setLoading(false);
      });
  };

  return (
    <div className="form p-0 sm:p-6 my-6 max-w-[550px] sm:bg-white sm:dark:bg-black/50 rounded-lg sm:shadow">
      <form className="form grid w-full gap-6">
        {/* <Label htmlFor="name">Name:</Label> */}
        <Input
          id="name"
          type="text"
          placeholder="Name"
          value={values.name}
          onChange={(e) =>
            setValues((prev) => {
              return { ...prev, name: e.target.value };
            })
          }
        />

        {/* <Label htmlFor="email">Email:</Label> */}
        <Input
          id="email"
          type="email"
          placeholder="Email"
          value={values.email}
          onChange={(e) =>
            setValues((prev) => {
              return { ...prev, email: e.target.value };
            })
          }
        />
        <div className="phone">
          {/* <Label htmlFor="phone">Phone Number (with country code):</Label> */}
          <PhoneInput
            className="border border-gray-300 rounded-md p-2"
            id="phone"
            placeholder="+233 12 345 6789"
            value={values.phone}
            onChange={(phone) => setValues((prev) => ({ ...prev, phone }))}
            defaultCountry="GH" // Optional: Set a default country (e.g., Ghana)
          />
        </div>

        {token && values.email && values.name && values.phone && (
          <div className="code-section flex gap-2" id="codeDisplay">
            {token}
            <Copy onClick={copyToken} />
          </div>
        )}

        <Button variant="secondary" type="button" onClick={generateToken}>
          Generate Token
        </Button>
        {token ? (
          <Button type="submit" onClick={handleSubmit}>
            {loading ? (
              <span className="animate-spin border-2 border-t-2 border-white rounded-full w-5 h-5"></span>
            ) : (
              "Submit"
            )}
          </Button>
        ) : (
          <Button disabled>Submit</Button>
        )}
      </form>
    </div>
  );
};

export default TokenForm;
