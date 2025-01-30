"use client";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { useState } from "react";
import { Copy } from "lucide-react";
import axios from "axios";

const TokenForm = () => {
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
    const { name, email, phone } = values;
    const validatedEmail = validateEmail(email);
    const validatedPhone = validatePhone(phone);
    const validatedName = validateName(name);

    console.log(validatedName, validatedEmail, validatedPhone);
    const payload = { name, email, phone, token };

    axios
      .post("/api/exclusive", payload)
      .then((res) => {
        if (res.status === 201) {
          alert("Token received");
          setValues({ name: "", email: "", phone: "" });
          setToken("");
        }
      })
      .catch((err) => {
        if (err.response.status === 400) {
          alert("Please fill all fields");
        }
      })
      .finally(() => {
        setValues({ name: "", email: "", phone: "" });
        setToken("");
      });
  };

  return (
    <div className="form p-6 m-6 max-w-[550px] bg-white dark:bg-black/50 rounded-lg shadow">
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
          <Label htmlFor="phone">Phone Number (with country code):</Label>
          <Input
            id="phone"
            type="tel"
            placeholder="+233 12 345 6789"
            value={values.phone}
            onChange={(e) =>
              setValues((prev) => {
                return { ...prev, phone: e.target.value };
              })
            }
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
            Submit
          </Button>
        ) : (
          <Button disabled>Submit</Button>
        )}
      </form>
    </div>
  );
};

export default TokenForm;
