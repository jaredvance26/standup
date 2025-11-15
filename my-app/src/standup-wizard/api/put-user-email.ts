import axios from "axios";

const API_BASE_URL =
  process.env.REACT_APP_API_URL || "http://localhost:3001/api";

export const putUserEmail = (userId: string, newEmail: string) => {
  const token = localStorage.getItem("token");

  return axios.put(
    `${API_BASE_URL}/account/email`,
    { userId, newEmail },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
};
