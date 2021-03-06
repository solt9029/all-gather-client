import React, { useState } from 'react';
import ReactCalendar from 'react-calendar';
import './Calendar.css';
import dayjs from 'dayjs';
import 'dayjs/locale/ja';
import { Row, Col, Form, Button, Alert } from 'react-bootstrap';
import { createSchedule } from '../../utils';
import { useHistory } from 'react-router-dom';

dayjs.locale('ja');

const isDateIncluded = (dates, date) =>
  dates.some((d) => dayjs(date).isSame(dayjs(d), 'day'));
const removeDate = (dates, date) =>
  dates.filter((d) => !dayjs(date).isSame(dayjs(d), 'day'));

function Calendar() {
  const [dates, setDates] = useState([]);
  const [title, setTitle] = useState('');
  const [error, setError] = useState(null);
  const history = useHistory();

  const onTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const onSubmitClick = async () => {
    try {
      await setError(null);
      const response = await createSchedule({ title, dates });
      history.push(`/schedules/${response.data.id}`);
    } catch (error) {
      setError(error);
    }
  };

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
      {error !== null && error?.response?.status === 500 && (
        <Row className="mb-3">
          <Col>
            <Alert variant="danger">エラーが発生しました</Alert>
          </Col>
        </Row>
      )}
      {error !== null && error?.response?.status === 400 && (
        <Row className="mb-3">
          <Col>
            <Alert variant="danger">
              {error.response.data.errors.map((error) => (
                <li>{error}</li>
              ))}
            </Alert>
          </Col>
        </Row>
      )}

      <Row className="mb-3">
        <Col>
          <p>
            "全員集合！"は多数決ではなく全員の予定を合わせることを前提とする日程調整を対象にデザインされた日程調整ツールです。
          </p>
        </Col>
      </Row>

      <Row className="mb-3">
        <Col>
          <Form.Group>
            <Form.Label>
              <b>タイトル</b>
            </Form.Label>
            <Form.Control
              onChange={onTitleChange}
              value={title}
              type="text"
              placeholder="タイトル"
            />
          </Form.Group>
        </Col>
      </Row>

      <Row>
        <Col>
          <p>
            <b>日程を選びましょう</b>
          </p>
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
          <Button
            onClick={onSubmitClick}
            style={{ width: '100%' }}
            variant="primary"
            type="submit"
          >
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
