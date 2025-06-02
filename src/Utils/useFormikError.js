import { useFormikContext } from "formik";

const useFormikError = () => {
  const { errors, touched } = useFormikContext();

  const getFormikError = (name) => {
    return touched?.[name] && errors?.[name] ? errors[name] : null;
  };

  return getFormikError;
};

export default useFormikError;

// {getFormikError("email") && (
//     <div style={{ color: "red", fontSize: "14px" }}>
//       {getFormikError("email")}
//     </div>s
//   )}
