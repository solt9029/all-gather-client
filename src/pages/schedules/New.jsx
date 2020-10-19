import React, { useState } from 'react';
import ReactCalendar from 'react-calendar';
import './Calendar.css';
import dayjs from 'dayjs';
import 'dayjs/locale/ja';
import { Row, Col } from 'react-bootstrap';

dayjs.locale('ja');

const isDateIncluded = (dates, date) =>
  dates.some((d) => dayjs(date).isSame(dayjs(d), 'day'));
const removeDate = (dates, date) =>
  dates.filter((d) => !dayjs(date).isSame(dayjs(d), 'day'));

function Calendar() {
  const [dates, setDates] = useState([]);

  const onClickDay = (date) => {
    if (isDateIncluded(dates, date)) {
      setDates(removeDate(dates, date));
    } else {
      setDates([...dates, date]);
    }
  };

  const tileClassName = ({ date }) => {
    if (isDateIncluded(dates, date)) {
      return 'react-calendar__tile-selected';
    }
  };

  return (
    <>
      <Row className="mb-3">
        <Col>日程を選んでください。</Col>
      </Row>
      <Row>
        <Col>
          <ReactCalendar
            locale="ja"
            tileClassName={tileClassName}
            onClickDay={onClickDay}
          />
        </Col>
      </Row>
    </>
  );
}

export function New() {
  return <Calendar locale="ja" />;
}
