import moment from 'moment/moment';
import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { Link, useNavigate } from 'react-router-dom';
import { get, headers, post } from '../api';
import { BaseSetting } from '../utils/common';
import '../styles/Confirm.css';
import { useSelector } from 'react-redux';

const Consult = () => {
  const [currentTime, setCurrentTime] = useState('');
  const navigate = useNavigate();

  const auth = useSelector((state) => state.auth);
  let authData = auth?.data;
  const drDetail = useSelector((state) => state.drDetail);
  let drDetailData = drDetail?.data;
  const currentDate = new Date();


  useEffect(() => {
    getData();

    const today = new Date(
      new Date().toLocaleString('en-US', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      })
    );
    setCurrentTime(moment(today).format('MM-DD-YYYY h:mm A'));
  }, []);
  const [mydate, setMyDate] = useState(new Date());
  const [time, setTime] = useState('');
  const [dateData, setDateData] = useState({});
  const [dateTime, setDateTime] = useState([]);
  const [selected, setSelected] = useState({});
  const SelezionaTab = (tabId = null) => {
    setSelected({ [tabId]: !selected[tabId] });
    // console.log(tabId);
  };

  const handleSubmit = async (e) => {
    const date = mydate;

    const [day, month, year] = date.split('-');

    const resdate = [year, month, day].join('-');
    //console.log(resdate + 'T' + time + ':00.000Z');
    // console.log(
    //   authData?._id,
    //   drDetailData?.userId,
    //   resdate + 'T' + time + ':00.000Z'
    // );
    try {
      const response = await post(
        BaseSetting.doctorApiDomain + '/bookAppointment',
        {
          patientId: authData?._id,
          doctorId: drDetailData?.userId,
          meta: 'test',
          from: resdate + 'T' + time + ':00.000Z',
        },

        headers
      );
      //console.log(response);
      // setApiData(response.data.data);
      const result = response.data;
      //console.log({ result });
      if (result.status === 1) {
        //   console.log(result);
        navigate('/confirm-payment', {
          state: result.data,
          time: time,
          drDetailData: drDetailData,
        });
      } else {
        console.log(response);
        alert(result.data);
      }
      // setData(result.data['02-01-2022']);
      // console.log(result.data['02-01-2022']);
    } catch (error) {
      console.log({ error });
      alert(error);
    }
  };
  function tConvert(time) {
    // Check correct time format and split into components
    time = time
      .toString()
      .match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];

    if (time.length > 1) {
      // If time format correct
      time = time.slice(1); // Remove full string match value
      time[5] = +time[0] < 12 ? ' AM' : ' PM'; // Set AM/PM
      time[0] = +time[0] % 12 || 12; // Adjust hours
    }
    return time.join(''); // return adjusted time or original string
  }
  const changeSelectedDate = (date) => {
    let date1 = moment(date).format('DD-MM-YYYY');
    var date2 = moment(date).format('MM-DD-YYYY'); // Or your date here

    // console.log(date2);
    setMyDate(date1);

    if (dateData && Object.keys(dateData)?.length > 0) {
      // console.log(tConvert(dateData[date1][0].time));
      let ctime = dateData[date1]?.filter((item) => {
        let aDate = moment(date2 + ' ' + tConvert(item?.time));
        let bDate = moment(currentTime)
          .add(15, 'minutes')
          .format('MM-DD-YYYY hh:mm A');
        let cDate = moment(bDate);
        return aDate.isAfter(cDate);
      });

      setDateTime(ctime);

      // console.log(dateData[date1]);
    }
  };

  const getData = async () => {
    try {
      const response = await get(
        BaseSetting.doctorApiDomain + '/availableSlots/' + drDetailData?.userId
      );

      // setApiData(response.data.data);
      const result = response?.data;
      //console.log({ result });
      setDateData(result?.data);
      // console.log(result.data['02-01-2022']);
    } catch (error) {}
  };
  // console.log(dateTime);

  return (
    <section className="consultsec">
      <div className="innerconsult">
        <div className="conleft">
          <div className="inconleft">
            <span className="slot"> Available - Slots</span>
            <span className="gryline"></span>
            <div className="mt-3 timings">
              <div className="grid grid-cols-3 gap-4 topt">
                {dateTime?.length > 0
                  ? dateTime?.map((item, index) => (
                      <button
                        className={` ${
                          selected[index] ? 'bg-[#000000] text-white' : ''
                        } ${
                          item?.isAvailable ? '' : 'opacity-50'
                        }  hover:bg-[#000000] hover:text-white shadow-md hover:shadow-xl duration-500 ease-in-out border rounded-md px-2 py-1 col-span-1`}
                        onClick={() => {
                          setTime(item?.time);
                          SelezionaTab(index);
                        }}
                      >
                        {tConvert(item?.time)}
                      </button>
                    ))
                  : 'Not Available'}
              </div>
            </div>
          </div>
          <div className="mobnavdw">
            <span className="mobnav01">Back</span>
            <button className="mobnav02">Book now</button>
          </div>
        </div>

        <div className="conright">
          <Calendar minDate={new Date()} onChange={changeSelectedDate} value={new Date()} />


          <div className="bitdiv">
            <button onClick={() => navigate(-1)} className="back shadow-md hover:shadow-2xl duration-500 ease-in-out">
              Back
            </button>
            <button
              className="book bg-[#006edc] opacity-100 shadow-md hover:shadow-2xl duration-500 ease-in-out"
              onClick={handleSubmit}
            >
              Book now
            </button>
          </div>
          
        </div>
      </div>
    </section>
  );
};

export default Consult;
