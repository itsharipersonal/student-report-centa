import axios from "axios";
import { useState } from "react";

export default ({ url, method, body, onSuccess }) => {
  const [errors, setErrors] = useState(null);

  const doRequest = async (props = {}) => {
    try {
      setErrors(null);
      const response = await axios[method](url, { ...body, ...props });

      if (onSuccess) {
        onSuccess(response.data);
      }

      return response.data;
    } catch (err) {
      console.log(err);
      setErrors(
        <div
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
          role="alert"
        >
          <strong className="font-bold">Ooops....</strong>
          <ul className="list-disc mt-2 ml-4">
            {err?.response?.data?.errors ? (
              err.response.data.errors.map((err, index) => (
                <li key={index} className="text-red-500">
                  **{err.message}
                </li>
              ))
            ) : (
              <li  className="text-red-500">
                **Something went wrong**
              </li>
            )}
          </ul>
        </div>
      );
    }
  };

  return { doRequest, errors };
};
