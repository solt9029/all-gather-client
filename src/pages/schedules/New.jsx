import React, { useState } from 'react';
import ReactCalendar from 'react-calendar';
import './Calendar.css';
import dayjs from 'dayjs';
import 'dayjs/locale/ja';
import { Row, Col, Form, Button } from 'react-bootstrap';

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
        <Col>
          <p>
            "全員集合！"は多数決ではなく全員の予定を合わせることを前提としてデザインされた日程調整ツールです。
          </p>
        </Col>
      </Row>

      <Row className="mb-3">
        <Col>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>イベント名</Form.Label>
            <Form.Control type="text" placeholder="イベント名" />
          </Form.Group>
        </Col>
      </Row>

      <Row>
        <Col>
          <p>日程を選びましょう</p>
        </Col>
      </Row>
      <Row className="mb-5">
        <Col>
          <ReactCalendar
            locale="ja"
            tileClassName={tileClassName}
            onClickDay={onClickDay}
          />
        </Col>
      </Row>

      <Row>
        <Col>
          <Button style={{ width: '100%' }} variant="primary" type="submit">
            作成
          </Button>
        </Col>
      </Row>
    </>
  );
}

export function New() {
  return <Calendar locale="ja" />;
}
