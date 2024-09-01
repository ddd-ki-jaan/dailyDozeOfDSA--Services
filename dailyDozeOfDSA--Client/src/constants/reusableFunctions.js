import toast from "react-hot-toast";

export function handleApiError(error, navigate, setUserLoggedInStatusToFalse) {
  let error_message = error?.response?.data?.message ?? "something went wrong";
  toast.error(error_message, {
    duration: 3000,
    position: "top-right",
  });

  let status_code = error?.response?.status ?? 500;
  if (status_code === 401) {
    navigate("/signIn", { replace: true });
    setUserLoggedInStatusToFalse();
  }
}
