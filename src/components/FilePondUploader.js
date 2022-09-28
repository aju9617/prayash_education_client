import React from "react";
import { FilePond } from "react-filepond";
import "filepond/dist/filepond.min.css";
import { ErrorMessage } from "formik";
import constant from "../config/constant";

function FilePondUploader({ label, setFiles, setFieldValue, name }) {
  const [filepondFiles, setFilepondFiles] = React.useState([]);

  return (
    <div className=" w-full pb-4">
      <label className="text-sm mb-2 block">
        {label}{" "}
        <ErrorMessage
          name={name}
          render={(msg) => <span className="text-xs text-red-600">{msg}</span>}
        />
      </label>
      <FilePond
        files={filepondFiles}
        onupdatefiles={setFilepondFiles}
        allowMultiple={false}
        maxFiles={1}
        server={{
          url: `${constant.API_URL}/media/upload`,
          process: {
            onload: (response) => {
              const res = JSON.parse(response);
              console.log(res);
              if (setFiles)
                setFiles((e) => [...e, { url: res.data.url, id: res.data.id }]);
              setFieldValue(name, res.data.url);
            },
            onerror: (err) => {
              console.log(err);
            },
          },
        }}
        name="file"
        labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
      />
    </div>
  );
}

export default FilePondUploader;
