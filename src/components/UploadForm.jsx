import { useState } from "react";
import ProgressBar from "./ProgressBar";

const UploadForm = () => {
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);

  const types = ["image/jpeg", "image/png"];

  const changeHandler = (e) => {
    let selected = e.target.files[0];
    if (selected && types.includes(selected.type)) {
      setFile(selected);
    } else {
      setFile(null);
      setError("please insert a file type of (jpeg or png)");
    }
  };

  return (
    <form onChange={changeHandler}>
      <label>
        <input type="file" />
        <span className="text-custom3 text-4xl cursor-pointer transition-colors hover:text-custom1">
          +
        </span>
      </label>
      {error && <div className="error">{error}</div>}
      {file && <div className="file">{file.name}</div>}
      {file && <ProgressBar file={file} setFile={setFile} />}
    </form>
  );
};

export default UploadForm;
