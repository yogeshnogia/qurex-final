import React from 'react';
import { Tab, Tabs } from 'react-bootstrap';
import Slider from 'react-slick';
//import faqCardLine from '../../assets/svgs/faqCardLine.svg';
import faqCardClose from '../../assets/svgs/faqCardClose.svg';
import faqCardAdd from '../../assets/svgs/faqCardAdd.svg';

const Features = () => {
  var settings = {
    dots: true,
    infinite: false,
    speed: 500,
    arrows: false,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="mb-5 container-fluid faqSection">
      <div className="container">
        <div className="row">
          <div className="col">
            <h1 className="faqTitle">Frequently Asked Questions</h1>
          </div>
        </div>
        <Tabs variant="pills" defaultActiveKey="male" className="mx-4 my-5">
          <Tab eventKey="male" title="Male">
            <Slider {...settings} className="mb-5">
              <div className="FaqCardContainer">
                <div className="mx-auto rounded FAQContainer">
                  {/* <img src={faqCardLine} className="faqCardDash" /> */}
                  <p className="faqCardTitle">What is sexology?</p>
                  <p className="faqCardText">
                    Our experience in deploying healthcare chabots give us an
                    edge in understanding industry specific challenges.
                  </p>
                  <div className="faqCardBtn ">
                    <img src={faqCardClose} />
                  </div>
                </div>
              </div>

              <div className="FaqCardContainer">
                <div className="mx-auto rounded FAQContainer">
                  {/* <img src={faqCardLine} className="faqCardDash" /> */}
                  <p className="faqCardTitle">
                    Can I give my baby fruit and vegetables during weaning?
                  </p>
                  <p className="faqCardText"></p>
                  <div className="faqCardBtn">
                    <img src={faqCardAdd} />
                  </div>
                </div>
              </div>

              <div className="FaqCardContainer">
                <div className="mx-auto rounded FAQContainer">
                  {/* <img src={faqCardLine} className="faqCardDash" /> */}
                  <p className="faqCardTitle">
                    {' '}
                    Do potatoes count as one of my 5 A Day?
                  </p>
                  <p className="faqCardText"></p>
                  <div className="faqCardBtn">
                    <img src={faqCardAdd} />
                  </div>
                </div>
              </div>

              <div className="FaqCardContainer">
                <div className="mx-auto rounded FAQContainer">
                  {/* <img src={faqCardLine} className="faqCardDash" /> */}
                  <p className="faqCardTitle">
                    Can I just eat five portions of my favourite fruit or
                    vegetable?
                  </p>
                  <p className="faqCardText"></p>
                  <div className="faqCardBtn">
                    <img src={faqCardAdd} />
                  </div>
                </div>
              </div>

              <div className="FaqCardContainer">
                <div className="mx-auto rounded FAQContainer">
                  {/* <img src={faqCardLine} className="faqCardDash" /> */}
                  <p className="faqCardTitle">What is sexology?</p>
                  <p className="faqCardText">
                    Our experience in deploying healthcare chabots give us an
                    edge in understanding industry specific challenges.
                  </p>
                  <div className="faqCardBtn">
                    <img src={faqCardAdd} />
                  </div>
                </div>
              </div>
            </Slider>
          </Tab>
          <Tab eventKey="female" title="Female">
            Female
          </Tab>
          <Tab eventKey="couples" title="Couples">
            Couples
          </Tab>
        </Tabs>
      </div>
    </div>
  );
};

export default Features;
