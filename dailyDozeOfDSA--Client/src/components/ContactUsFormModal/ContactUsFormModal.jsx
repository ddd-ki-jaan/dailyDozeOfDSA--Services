import { Modal, TextInput, Label, Textarea, Button } from "flowbite-react";
import { Flowbite } from "flowbite-react";
import { BiLoaderAlt } from "react-icons/bi";
import { useState } from "react";
import { saveContactUsData } from "../../services/footerServices";
import { toast } from "react-hot-toast";

function ContactUsFormModal({ show, toggle }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    query: "",
  });
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    query: "",
  });
  const [loader, setLoader] = useState(false);

  const customTheme = {
    textInput: {
      field: {
        input: {
          colors: {
            bllack:
              "border-gray-300 bg-gray-50 text-gray-900 focus:border-black focus:ring-black",
          },
        },
      },
    },
    textarea: {
      colors: {
        bllack:
          "border-gray-300 bg-gray-50 text-gray-900 focus:border-black focus:ring-black",
      },
    },
    button: {
      color: {
        bllack:
          "border border-transparent bg-black text-white enabled:hover:border enabled:hover:border-black enabled:hover:bg-white enabled:hover:text-black",
      },
    },
  };

  async function handleSubmit() {
    if (loader) return;
    setLoader(true);

    try {
      const response = await saveContactUsData(formData);
      const respones_data = response.data;
      if (respones_data.success) {
        toast.success("Your query has been successfully submitted.", {
          duration: 3000,
          position: "top-right",
        });
        setFormData({ name: "", email: "", query: "" });
      }
    } catch (error) {
      console.log("Error in handlSubmit***: ", error);
      let error_message =
        (error.response.data && error.response.data.message) ||
        "Something went wrong";
      toast.error(error_message, {
        duration: 3000,
        position: "top-right",
      });
    }

    setLoader(false);
    toggle();
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));

    let error = "";
    if (name === "name") {
      if (value.trim().length < 1 || value.trim().length > 26) {
        error = "Name should be between 1 and 26 characters.";
      }
    } else if (name === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value.trim())) {
        error = "Please enter a valid email.";
      }
    } else if (name === "query") {
      if (value.trim() === "") {
        error = "Query should not be empty.";
      }
    }

    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: error });
  }

  return (
    <>
      <Flowbite theme={{ theme: customTheme }}>
        <Modal show={show} dismissible size="md" onClose={toggle}>
          <Modal.Header>Contact Us...</Modal.Header>
          <Modal.Body>
            <div className="space-y-5">
              <div>
                <div className="mb-1 block">
                  <Label htmlFor="name" value="Your name" />
                </div>
                <TextInput
                  id="name"
                  name="name"
                  placeholder="Your name"
                  onChange={handleChange}
                  value={formData.name}
                  required
                  color="bllack"
                />
                {errors.name && (
                  <div className="text-sm text-red-600">{errors.name}</div>
                )}
              </div>
              <div>
                <div className="mb-1 block">
                  <Label htmlFor="email" value="Your email" />
                </div>
                <TextInput
                  id="email"
                  name="email"
                  placeholder="name@gmail.com"
                  onChange={handleChange}
                  value={formData.email}
                  required
                  color="bllack"
                />
                {errors.email && (
                  <div className="text-sm text-red-600">{errors.email}</div>
                )}
              </div>
              <div>
                <div className="mb-1 block">
                  <Label htmlFor="query" value="Your query" />
                </div>
                <Textarea
                  id="query"
                  name="query"
                  placeholder="Your query..."
                  onChange={handleChange}
                  value={formData.query}
                  required
                  rows={4}
                  color="bllack"
                />
                {errors.query && (
                  <div className="text-sm text-red-600">{errors.query}</div>
                )}
              </div>
              <div>
                <Button
                  color="bllack"
                  isProcessing={loader}
                  processingSpinner={
                    <BiLoaderAlt className="animate-spin text-lg" />
                  }
                  onClick={handleSubmit}
                  disabled={
                    !formData.name ||
                    !formData.email ||
                    !formData.query ||
                    errors.name ||
                    errors.email ||
                    errors.query
                  }
                >
                  Submit
                </Button>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      </Flowbite>
    </>
  );
}

export default ContactUsFormModal;
