import axios from "axios";

const API_BASE_URL =
  process.env.REACT_APP_API_URL || "http://localhost:3001/api";

export const putUserPassword = (
  userId: string,
  currentPassword: string,
  newPassword: string
) => {
  const token = localStorage.getItem("token");

  return axios.put(
    `${API_BASE_URL}/account/password`,
    {
      userId,
      currentPassword,
      newPassword,
    },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
};
