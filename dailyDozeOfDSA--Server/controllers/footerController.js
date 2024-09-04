import ContactUs from "../models/Footer/ContactUs.js";
import ReportBug from "../models/Footer/ReportBug.js";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function saveContactUs(request, response) {
  try {
    const { name, email, query } = request.body;

    if (!name || name.trim().length === 0) {
      return response.status(400).json({
        success: false,
        message: "length of the name cannot be less than 1 character",
      });
    }
    if (name.trim().length > 26) {
      return response.status(400).json({
        success: false,
        message: "length of the name cannot exceed 26 characters",
      });
    }
    if (!email || !emailRegex.test(email.trim())) {
      return response.status(400).json({
        success: false,
        message: "Please provide a valid email address.",
      });
    }
    if (!query || query.trim().length === 0) {
      return response.status(400).json({
        success: false,
        message: "Query cannot be empty.",
      });
    }

    const contactUs = new ContactUs(request.body);
    await contactUs.save();
    response.status(200).json({ success: true, message: "Your query has been successfully submitted." });
  } catch (error) {
    console.log("***saveContactUs: ***", error);
    response.status(500).json({ success: false, message: "Something went wrong." });
  }
}

export async function saveReportBug(request, response) {
  try {
    const { email, bugDescription } = request.body;

    if (!email || !emailRegex.test(email.trim())) {
      return response.status(400).json({
        success: false,
        message: "Please provide a valid email address.",
      });
    }

    if (!bugDescription || bugDescription.trim().length === 0) {
      return response.status(400).json({
        success: false,
        message: "Bug description cannot be empty.",
      });
    }

    const reportBug = new ReportBug(request.body);
    await reportBug.save();
    response.status(200).json({ success: true, message: "Your report has been successfully submitted." });
  } catch (error) {
    console.log("***saveReportBug: ***", error);
    response.status(500).json({ success: false, message: "Something went wrong." });
  }
}