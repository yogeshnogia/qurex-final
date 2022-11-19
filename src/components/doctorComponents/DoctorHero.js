import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { get, headers } from '../../api';
import { BaseSetting } from '../../utils/common';
import { useSelector, useDispatch } from 'react-redux';
import { setAuth } from '../../state/auth/Actions';
import doctorApi from '../../api/doctorAPI';
import { addData } from '../../state/doctor/Actions';

const DoctorHero = ({ drDetailData }) => {
  return (
    <div className="py-5 container-fluid doctorHeroSection">
      <div className="row">
        <div className="col-12 col-md-6 d-flex justify-content-center">
          <img
            src="https://quer.vercel.app/static/media/dranita.66f4e152a5afe7abebb0.png"
            className="rounded-circle"
          />
        </div>
        <div className="mt-3 col-12 col-md-6 d-flex flex-column justify-content-center align-items-center align-items-md-start ">
          <div className="d-flex align-items-center">
            <h1 className="fw-bolder">{drDetailData?.drUserData?.name}</h1>
            <p className="mx-2 mt-2 btn btn-primary btn-sm rounded-pill">
              {drDetailData?.professionalDetail?.specializations[0]}
            </p>
          </div>
          <p className="flex fw-bolder">
            Expert in
            {/* {drDetailData?.professionalDetail.treatments} */}
            {drDetailData?.professionalDetail?.treatments.map((item, index) => (
              <div className="flex"> {item},</div>
            ))}
          </p>
          <p className="fw-bolder ">{`22`} Cases Solved</p>
          <p className="fw-bolder">
            ₹ {drDetailData?.feeCharge} Consulting Fee
          </p>
          <div className="d-flex">
            <button
              type="button"
              className="mr-2 btn btn-outline-primary rounded-pill"
            >
              Watch Now
            </button>
            <Link to={'/booking-calendar'}>
              <button
                type="button"
                className="mx-2 btn btn-primary rounded-pill"
              >
                Consult Now
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorHero;
