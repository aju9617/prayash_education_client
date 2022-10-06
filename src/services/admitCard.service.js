import toast from "react-hot-toast";
import { api, catchAsync, generateQueryString } from "./helper.js";

const download = catchAsync(async (query) => {
  let myPromise = api.get(
    `/admit-card/download?${generateQueryString(query)}`,
    {
      responseType: "blob",
      headers: {
        "Content-type": "application/pdf",
      },
    }
  );
  toast.promise(myPromise, {
    loading: "Downloading...",
    success: (response) => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "admit card.pdf"); //or any other extension
      document.body.appendChild(link);
      link.click();
      return "success";
    },
    error: (err) => {
      return "Incorrect data";
    },
  });
});

const apis = {
  download,
};

export default apis;
