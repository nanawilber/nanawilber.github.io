"use client";

import { useState } from "react";
import { Mail, MapPin, Phone } from "lucide-react";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import axios from "axios";

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("/api/contact-us", formData);

      if (res.status === 201) {
        alert("Message sent successfully!");
      } else {
        alert("Failed to send message.");
      }
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      console.error("Error::", error);
      alert("An error occurred while sending the message.");
    } finally {
      setFormData({ name: "", email: "", message: "" });
    }
  };

  return (
    <section id="contact" className="container px-4 md:px-none py-6">
      <h2 className="tracking-widest uppercase font-bold text-2xl mt-16 mb-6">
        Get in <span className="text-primary">touch</span>
      </h2>
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <div className="flex flex-col gap-6 mb-12">
          <p>
            Please fill out the form on this section to get in contact with me.
            Or call between the hours between 9:00 and 21:00 ET
          </p>
          <div className="grid grid-cols-[150px,1fr] w-full">
            <div className="title flex flex-col gap-3 font-bold">
              <div className="flex gap-2">
                <MapPin />
                Address
              </div>
              <div className="flex gap-2">
                <Mail />
                Email
              </div>
              <div className="flex gap-2">
                <Phone />
                Phone
              </div>
            </div>
            <div className="content flex flex-col gap-3">
              <div className="address">Brook 103, Vancouver, Canada</div>
              <div className="address">info@brapurple.com</div>
              <div className="address">+1 82 527 6938</div>
            </div>
          </div>
        </div>
        <div className="contact-form w-full">
          <form className="form grid w-full gap-6" onSubmit={handleSubmit}>
            <Input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <Input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <Textarea
              placeholder="Message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
            />
            <Button type="submit">Send Message</Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
