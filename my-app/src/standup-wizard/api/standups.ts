import axios from "axios";
import { CreateStandupPOSTContract, StandupGETContract } from "./contracts";

const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:3001/api";

export const createStandup = async (
  userId: string,
  standup: CreateStandupPOSTContract
): Promise<StandupGETContract> => {
  const response = await axios.post<StandupGETContract>(
    `${API_BASE_URL}/user/${userId}/standups`,
    standup,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  return response.data;
};

export const getStandups = async (userId: string): Promise<StandupGETContract[]> => {
  const response = await axios.get<StandupGETContract[]>(
    `${API_BASE_URL}/user/${userId}/standups`,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  return response.data;
};

export const deleteStandup = async (
  userId: string,
  standupId: string
): Promise<{ message: string }> => {
  const response = await axios.delete<{ message: string }>(
    `${API_BASE_URL}/user/${userId}/standups/${standupId}`,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  return response.data;
};
