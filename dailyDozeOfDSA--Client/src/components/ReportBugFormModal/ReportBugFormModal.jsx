import {
  Modal,
  TextInput,
  Label,
  Textarea,
  Button,
  Flowbite,
} from "flowbite-react";
import { BiLoaderAlt } from "react-icons/bi";
import { useState } from "react";
import { saveReportBugData } from "../../services/footerServices";
import { toast } from "react-hot-toast";

function ReportBugFormModal({ show, toggle }) {
  const [formData, setFormData] = useState({
    email: "",
    bugDescription: "",
  });
  const [errors, setErrors] = useState({
    email: "",
    bugDescription: "",
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
    setLoader(true);

    try {
      const response = await saveReportBugData(formData);
      const respones_data = response.data;
      if (respones_data.success) {
        toast.success("Your query has been successfully submitted.", {
          duration: 3000,
          position: "top-right",
        });
        setFormData({ email: "", bugDescription: "" });
      }
      setLoader(false);
      toggle();
    } catch (error) {
      console.log("Error in handleSubmit***: ", error);
      let error_message =
        (error.response.data && error.response.data.message) ||
        "Something went wrong";
      toast.error(error_message, {
        duration: 3000,
        position: "top-right",
      });
      setLoader(false);
      toggle();
    }
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));

    let error = "";
    if (name === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value.trim())) {
        error = "Please enter a valid email.";
      }
    }
    if (name === "bugDescription") {
      if (!value.trim()) {
        error = "Bug description is required";
      }
    }

    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
    setErrors({ ...errors, [name]: error });
  }

  return (
    <>
      <Flowbite theme={{ theme: customTheme }}>
        <Modal show={show} dismissible size="md" onClose={toggle}>
          <Modal.Header>Report A Bug...</Modal.Header>
          <Modal.Body>
            <div className="space-y-5">
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
                  color="bllack"
                  required
                />
                {errors.email && (
                  <div className="text-sm text-red-600">{errors.email}</div>
                )}
              </div>
              <div>
                <div className="mb-1 block">
                  <Label htmlFor="bugDescription" value="Bug description" />
                </div>
                <Textarea
                  id="bugDescription"
                  name="bugDescription"
                  placeholder="Bug Description..."
                  onChange={handleChange}
                  value={formData.bugDescription}
                  rows={4}
                  color="bllack"
                  required
                />
                {errors.bugDescription && (
                  <div className="text-sm text-red-600">
                    {errors.bugDescription}
                  </div>
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
                    !formData.email ||
                    !formData.bugDescription ||
                    errors.email ||
                    errors.bugDescription
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

export default ReportBugFormModal;
