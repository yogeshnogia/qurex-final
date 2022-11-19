//import './styles.css';
import React, { useState, useEffect, useRef } from 'react';
import { BiPlusMedical } from 'react-icons/bi';
import { useDispatch, useSelector } from 'react-redux';
import { capitalize } from 'lodash';
import UserApi from '../../../../../api/UserAPI';
import { setAuth } from '../../../../../state/auth/Actions';
// import { getBusinessHours } from '../../../../../api/UserAPI'

const days = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];
const Availability = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  let authData = auth?.data;
  //console.log({ authData });

  // useEffect(() => {
  //   (async () => {
  //     const userData = await UserApi.getByUserId(authData?._id);
  //     //console.log(authData?._id);
  //     if (userData) {
  //       dispatch(setAuth({ ...authData, userData }));
  //     }
  //   })();
  // }, []);
  const businessHours = authData?.businessHours;
  const calendarComponentRef = React.createRef();
  const bsInitialData = {
    day: 'monday',
    slots: [
      {
        from: '17:00',
        to: '22:00',
      },
    ],
  };
  const [businessHoursData, setBusinessHoursData] = useState(
    businessHours || days.map((day) => ({ ...bsInitialData, day }))
  );

  const handleChange = (value) => {
    console.log(businessHoursData);
    const data = businessHoursData.map((item, index) => {
      
      console.log(item?.day == value?.day ? value : item);
      return item?.day == value?.day ? value : item;
    });
    console.log('🚀 ~ file: index.jsx ~ line 41 ~ handleChange ~ data', data);
    setBusinessHoursData(data);
  };
  const handleSubmit = async (key, value) => {
    console.log(businessHoursData);
    let drData = await UserApi.getByUserId(authData?._id);
    let drId = drData?._id;
    // const data = {

    //   drId,
    //   businessHours: businessHoursData,
    // };
    // console.log({ authData });
    let businessHoursData1 = { businessHours: businessHoursData };
    let response = await UserApi.update(businessHoursData1, drId);
    if (response?.status) {
      // console.log(response?.data);
      let drData = response?.data;
      dispatch(setAuth({ ...authData, drData: drData }));
      alert('Business hours updated successfully!!');
      return;
    }
    alert('Unable to process the request!');
  };
  const addNewRow = () => {
    setBusinessHoursData((state) => [...state, bsInitialData]);
  };
  //console.log(businessHoursData[0].slots[index]);
  console.log(businessHoursData);
  return (
    <>
      <div className="flex flex-col px-10 font-montserrat">
        <div className="py-6 font-semibold text-2xl text-[#636363]">
          Business Hours
        </div>

        <div className="font-montserrat text-[#636363] shadow-lg rounded-lg bg-white flex flex-col ">
          <div className="grid p-3 text-xs grid-rows-8 sm:text-sm md:text-lg lg:text-lg xl:text-lg">
            <div className="grid grid-cols-9 col-span-1 pt-5 font-bold text-black bg-gray-100 md:grid-cols-6 lg:grid-cols-6 xl:grid-cols-6 md:pl-5 lg:pl-5 xl:pl-5">
              <div className="col-span-2 font-bold md:col-span-1 lg:col-span-1 xl:col-span-1 ">
                Day
              </div>
              <div className="col-span-3 font-bold md:col-span-2 lg:col-span-2 xl:col-span-2 ">
                Opening Time
              </div>
              <div className="col-span-3 font-bold md:col-span-2 lg:col-span-2 xl:col-span-2 ">
                Closing Time
              </div>
              <div className="col-span-1">Add</div>
            </div>

            {Object.entries(businessHoursData).map(([key, time]) =>
              Object.entries(time.slots).map(([index, slot]) => (
                <PerDayBussinessHours
                  key={`${key}-${index}`}
                  number={key}
                  {...time}
                  index={index}
                  addNewRow={addNewRow}
                  handleChange={handleChange}
                />
              ))
            )}
          </div>
          <div className="my-3 ml-3 md:ml-8 lg:ml-8 xl:ml-8 ">
            <button
              type="button"
              onClick={handleSubmit}
              className="bg-[#655af4] w-16 md:w-20 lg:w-20 xl:w-20 flex justify-center text-xs sm:text-sm md:text-lg lg:text-lg xl:text-lg py-1 md:py-1.5 lg:py-1.5 xl:py-1.5 rounded-2xl font-semibold text-white"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

const PerDayBussinessHours = ({
  number,
  day,
  slots,
  index,
  addNewRow,
  handleChange,
}) => {
  let slot = slots && slots.length > 0 ? slots[index] : {};
  let ot_hours = slot?.from?.split(':')[0];
  let ot_minutes = slot?.from?.split(':')[1];
  let ct_hours = slot?.to?.split(':')[0];
  let ct_minutes = slot?.to?.split(':')[1];
  let ot_meredium = 'AM';
  let ct_meredium = 'PM';
  if (ot_hours > 12) {
    ot_meredium = 'PM';
    ot_hours = parseInt(ot_hours) - 12;
  }
  if (ct_hours > 12) {
    ct_meredium = 'PM';
    ct_hours = parseInt(ct_hours) - 12;
  }

  return (
    <div className="grid grid-cols-9 col-span-1 mt-6 md:grid-cols-6 lg:grid-cols-6 xl:grid-cols-6 md:pl-5 lg:pl-5 xl:pl-5">
      <div className="col-span-2 font-bold md:col-span-1 lg:col-span-1 xl:col-span-1">
        <div className="mr-2 h-8 sm:h-10 md:h-10 lg:h-10 xl:h-10  border rounded-md flex overflow-hidden justify-center items-center bg-gray-100 text-[#655af4] border-[#655af4] ">
          {day}
        </div>
      </div>

      <div className="flex flex-row col-span-3 md:col-span-2 lg:col-span-2 xl:col-span-2">
        <div className="">
          <input
            maxLength="2"
            name={'ot_hours[]'}
            value={ot_hours}
            onChange={(e) => {
              handleChange({
                day,
                slots: slots.map((i, item) =>
                  i === index
                    ? {
                        ...item,
                        from: `${
                          ot_meredium == 'PM' && parseInt(e.target.value) <= 12
                            ? 12 + parseInt(e.target.value)
                            : e.target.value
                        }:${ot_minutes}`,
                      }
                    : item
                ),
              });
            }}
            type="text"
            className="w-8 h-8 pl-2 border rounded-md outline-none drop-shadow-md sm:w-10 md:w-10 lg:w-10 xl:w-10 sm:h-10 md:h-10 lg:h-10 xl:h-10"
          />
        </div>
        <div className="mt-1.5 ml-1">:</div>
        <div className="ml-1">
          <input
            maxLength="2"
            name={'ot_minutes[]'}
            value={ot_minutes}
            onChange={(e) => {
              handleChange({
                day,
                slots: slots.map((i, item) =>
                  i === index
                    ? {
                        ...item,
                        to: `${ot_hours}:${e.target.value}`,
                      }
                    : item
                ),
              });
            }}
            type="text"
            className="w-8 h-8 pl-2 border rounded-md outline-none drop-shadow-md sm:w-10 md:w-10 lg:w-10 xl:w-10 sm:h-10 md:h-10 lg:h-10 xl:h-10"
          />
        </div>
        <div className="w-22 h-8 sm:h-10 md:h-10 lg:h-10 xl:h-10 ml-2 border rounded-md flex overflow-hidden justify-center items-center bg-gray-100 text-[#655af4] border-[#655af4] ">
          <select
            name={'ot_meredium[]'}
            defaultValue={ot_meredium}
            onChange={(e) => {
              handleChange({
                day,
                slots: slots.map((i, item) =>
                  i === index
                    ? {
                        ...item,
                        from: `${
                          e.target.value == 'PM' && parseInt(ot_hours) <= 12
                            ? 12 + parseInt(ot_hours)
                            : ot_hours
                        }:${ot_minutes ?? 0}`,
                      }
                    : item
                ),
              });
            }}
            className="py-1.5 pl-3 w-full outline-none"
          >
            <option key={'AM' + number} value="AM" className="outline-none">
              AM
            </option>
            <option key={'PM' + number} value="PM" className="outline-none">
              PM
            </option>
          </select>
        </div>
      </div>

      <div className="flex flex-row col-span-3 md:col-span-2 lg:col-span-2 xl:col-span-2">
        <div className="">
          <input
            maxLength="2"
            name={'ct_hours[]'}
            value={ct_hours}
            onChange={(e) => {
              handleChange({
                day,
                slots: slots.map((i, item) =>
                  i === index
                    ? {
                        ...item,
                        to: `${
                          ct_meredium == 'PM' && parseInt(e.target.value) <= 12
                            ? 12 + parseInt(e.target.value)
                            : e.target.value
                        }:${ct_minutes ?? 0}`,
                      }
                    : item
                ),
              });
            }}
            type="text"
            className="w-8 h-8 pl-2 border rounded-md outline-none drop-shadow-md sm:w-10 md:w-10 lg:w-10 xl:w-10 sm:h-10 md:h-10 lg:h-10 xl:h-10"
          />
        </div>
        <div className="mt-1.5 ml-1">:</div>
        <div className="ml-1">
          <input
            maxLength="2"
            name={'ct_minutes[]'}
            value={ct_minutes}
            onChange={(e) => {
              handleChange({
                day,
                slots: slots.map((i, item) =>
                  i === index
                    ? {
                        ...item,
                        to: `${ct_hours}:${e.target.value}`,
                      }
                    : item
                ),
              });
            }}
            type="text"
            className="w-8 h-8 pl-2 border rounded-md outline-none drop-shadow-md sm:w-10 md:w-10 lg:w-10 xl:w-10 sm:h-10 md:h-10 lg:h-10 xl:h-10"
          />
        </div>
        <div className="w-22 h-8 sm:h-10 md:h-10 lg:h-10 xl:h-10 ml-2 border rounded-md flex overflow-hidden justify-center items-center bg-gray-100 text-[#655af4] border-[#655af4] ">
          <select
            name={'ct_meridium[]'}
            defaultValue={ct_meredium}
            onChange={(e) => {
              handleChange({
                day,
                slots: slots.map((i, item) =>
                  i === index
                    ? {
                        ...item,
                        to: `${
                          e.target.value == 'PM' && parseInt(ct_hours) <= 12
                            ? 12 + parseInt(ct_hours)
                            : ct_hours
                        }:${ct_minutes ?? 0}`,
                      }
                    : item
                ),
              });
            }}
            className="py-1.5 pl-3 w-full outline-none"
          >
            <option key={'AM' + number} value="AM" className="outline-none">
              AM
            </option>
            <option key={'PM' + number} value="PM" className="outline-none">
              PM
            </option>
          </select>
        </div>
      </div>

      <div className="col-span-1 ">
        <BiPlusMedical
          className="mt-1 rounded-3xl px-2 h-6 md:h-8 w-6 md:w-8 bg-[#655af4]  text-white "
          onClick={(e) => {
            handleChange({
              day,
              slots: [
                ...slots,
                {
                  from: `00:00`,
                  to: `00:00`,
                },
              ],
            });
          }}
        />
      </div>
    </div>
  );
};

const validateTimeInput = (num) => num.replace(/[^0-9]/g, '');
const toTwoDigits = (num) => String(num).padStart(2, '0');
function tConvert(time) {
  // Check correct time format and split into components
  time = time.toString().match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [
    time,
  ];

  if (time.length > 1) {
    // If time format correct
    time = time.slice(1); // Remove full string match value
    time[5] = +time[0] < 12 ? 'AM' : 'PM'; // Set AM/PM
    time[0] = +time[0] % 12 || 12; // Adjust hours
  }
  return time.join(''); // return adjusted time or original string
}

export default Availability;
