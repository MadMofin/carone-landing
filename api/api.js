import axios from "axios";

let baseURL;

if (process.env.NODE_ENV === "production") {
  baseURL = "https://apicarone.com/api/v1";
} else {
  baseURL = "https://apicarone.com/api/v1";
}

export default axios.create({
  baseURL: baseURL,
});
