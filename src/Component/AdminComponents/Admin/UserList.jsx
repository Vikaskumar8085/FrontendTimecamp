import React from "react";
import bgimage from "../../../assets/commonicon/profilepic.png";
import {Typography, Button} from "@mui/material";
import Grid2 from "@mui/material/Grid2";
import {
  Lock,
  LockOpen,
  VerifiedUser,
  ErrorOutline,
  Edit,
} from "@mui/icons-material";

const UserList = ({users, handleEdit}) => {
  return (
    <>
      <Grid2 container spacing={2}>
        {users
          .filter((item) => item.IsAdmin === false)
          .map((item, index) => {
            return (
              <>
                <Grid2 key={index} size={{md: 6, lg: 4, sm: 12, xs: 12}}>
                  <div className="admin_card_wrapper">
                    <div className="admin_card_wrapper_box">
                      <div className="admin_card_header">
                        <img src={bgimage} alt="" srcset="" />
                        <div className="admin_header_tags">
                          <img
                            src={
                              item?.Photo ||
                              "https://i.ibb.co/4pDNDk1/avatar.png"
                            }
                            alt="User avatar"
                            loading="lazy"
                          />
                          <Button
                            startIcon={<Edit />}
                            type="submit"
                            onClick={() => {
                              handleEdit(item);
                            }}
                            sx={{
                              background: "#6560f0",
                              color: "white",
                              // width: "100%",
                            }}
                          >
                            Edit
                          </Button>
                        </div>
                      </div>
                      <div className="admin_body">
                        <div className="admin-card">
                          <div className="admin-card__name">
                            {item.FirstName} {item.LastName}
                          </div>
                          <div className="admin-card__email">{item.Email}</div>

                          <div className="admin-card__status">
                            {item.isVerify ? (
                              <VerifiedUser className="admin-card__icon admin-card__icon--verified" />
                            ) : (
                              <ErrorOutline className="admin-card__icon admin-card__icon--error" />
                            )}
                            <span
                              className={`admin-card__text ${
                                item.isVerify ? "verified" : "not-verified"
                              }`}
                            >
                              {item.isVerify ? "Verified" : "Not Verified"}
                            </span>
                          </div>

                          <Typography
                            variant="body2"
                            className={`admin-card__terms ${
                              item.Term ? "accepted" : "not-accepted"
                            }`}
                          >
                            {item.Term
                              ? "Accepted Terms & Conditions"
                              : "Terms Not Accepted"}
                          </Typography>

                          <div className="admin-card__block-status">
                            {item.BlockStatus === "Unblock" ? (
                              <LockOpen className="admin-card__icon admin-card__icon--unblock" />
                            ) : (
                              <Lock className="admin-card__icon admin-card__icon--block" />
                            )}
                            {item.BlockStatus === "Unblock" ? (
                              <p>UnBlock</p>
                            ) : (
                              <p>block</p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Grid2>
              </>
            );
          })}
      </Grid2>
    </>
  );
};

export default UserList;
