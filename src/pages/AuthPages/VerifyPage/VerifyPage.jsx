import React, {useEffect} from "react";
import {Link, useParams} from "react-router-dom";
import {Button} from "@mui/material";
import "./verify.scss";
import {useDispatch} from "react-redux";
import {setLoader} from "../../../redux/LoaderSlices/LoaderSlices";
import {verifyTokenapicall} from "../../../ApiServices/UserApiServices/User";
import toast from "react-hot-toast";
const VerifyPage = () => {
  const {id} = useParams();
  const dispatch = useDispatch();

  const verifyfunc = async () => {
    try {
      dispatch(setLoader(true));
      const response = await verifyTokenapicall(id);
      if (response.success) {
        toast.success(response?.message);
        dispatch(setLoader(false));
      } else {
        toast.error(response?.message);
        dispatch(setLoader(false));
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "something went wrong");
      dispatch(setLoader(false));
    }
  };
  useEffect(() => {
    verifyfunc();
  }, [0]);
  return (
    <div>
      <div className="verify_container">
        <section className="verify_box">
          <div className="verify_gif"></div>
          <article className="verify">
            <h1> Your email has been verified</h1>
            <p>Your email address has been verified. please go on login page</p>
            <Button id="one">
              <Link to="/login">Go to Login</Link>
            </Button>
          </article>
        </section>
      </div>
    </div>
  );
};

export default VerifyPage;
