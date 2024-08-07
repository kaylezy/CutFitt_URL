import axios from "axios";

const API_URL = "https://api.tinyurl.com/create";
const API_KEY = "PlJd5UDqt6EuyubySWNfrxJAvbbkCjH57oi9nXhlBHRdixSCm66Oi5OtdUpo";

export const shortenUrl = async (originalUrl: string, customAlias?: string) => {
  try {
    const response = await axios.post(
      API_URL,
      {
        url: originalUrl,
        domain: "tiny.one",
        alias: customAlias,
      },
      {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data.data.tiny_url;
  } catch (error: any) {
    console.log("Error response:", error.response.data);
    if (error.response.status === 422) {
      const errorMessage = error.response.data.errors.join(", ");
      // throw new Error(${errorMessage});
      throw new Error(errorMessage);
    }
    throw error;
  }
};
