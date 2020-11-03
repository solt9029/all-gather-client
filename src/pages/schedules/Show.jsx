import React, { useState, useEffect, useMemo } from 'react';
import { Row, Col, Form, Button } from 'react-bootstrap';
import { fetchSchedule } from '../../utils';
import { useRouteMatch } from 'react-router-dom';
import CopyToClipBoard from 'react-copy-to-clipboard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy } from '@fortawesome/free-solid-svg-icons';
import { intersectionBy, cloneDeep } from 'lodash';
import './Check.css';
import dayjs from 'dayjs';

export function Show() {
  const routeMatch = useRouteMatch();
  const [schedule, setSchedule] = useState(null);
  const [isUrlCopied, setIsUrlCopied] = useState(false);
  const [checkedDateIds, setCheckedDateIds] = useState([]);
  const [name, setName] = useState('');

  useEffect(() => {
    (async () => {
      const response = await fetchSchedule(routeMatch.params.id);
      setSchedule(response.data);
      console.log(response.data);
    })();
  }, [routeMatch]);

  const onCopy = () => {
    setIsUrlCopied(true);
  };

  /**
   * @type {Array}
   */
  const candidateDates = useMemo(() => {
    if (!schedule) {
      return [];
    }
    const { schedule_dates, schedule_members } = schedule;
    return intersectionBy(
      schedule_dates,
      ...schedule_members.map(
        (scheduleMember) => scheduleMember.schedule_dates
      ),
      'date'
    );
  }, [schedule]);

  const onNameChange = (event) => {
    setName(event.target.value);
  };

  const onSubmitClick = () => {
    // try {
    //   const response = await answerSchedule({ title, dates });
    //   history.push(`/schedules/${response.data.id}`);
    // } catch (error) {
    //   console.log(error.response.data.errors);
    // }
  };

  return (
    <>
      <Row className="mb-5">
        <Col lg={9} md={8} className="mt-2">
          <Form.Control
            value={window.location.href}
            type="text"
            placeholder="日程調整URL"
            readOnly={true}
          />
          {isUrlCopied && (
            <small className="text-secondary">URLのコピーが完了しました</small>
          )}
        </Col>
        <Col lg={3} md={4} className="mt-2">
          <CopyToClipBoard onCopy={onCopy} text={window.location.href}>
            <Button style={{ width: '100%' }}>
              <FontAwesomeIcon style={{ marginRight: '10px' }} icon={faCopy} />
              URLをコピー
            </Button>
          </CopyToClipBoard>
        </Col>
      </Row>
      <Row className="mb-3">
        <Col>
          <Form.Group>
            <Form.Label>参加可能な日付を選びましょう</Form.Label>
            {candidateDates
              .sort((a, b) => (new Date(a.date) < new Date(b.date) ? -1 : 1))
              .map((candidateDate) => (
                <Form.Check
                  style={{ padding: '5px', marginLeft: '20px' }}
                  className="checkbox"
                  onChange={(event) => {
                    console.log(checkedDateIds);
                    if (event.target.checked) {
                      setCheckedDateIds([...checkedDateIds, candidateDate.id]);
                      return;
                    }
                    setCheckedDateIds(
                      checkedDateIds.filter((id) => id !== candidateDate.id)
                    );
                  }}
                  key={candidateDate.id}
                  name="aaa"
                  type="checkbox"
                  label={dayjs(candidateDate.date).format(
                    'YYYY年MM月DD日 (dd)'
                  )}
                />
              ))}
          </Form.Group>
        </Col>
      </Row>
      <Row className="mb-3">
        <Col>
          <Form.Group>
            <Form.Label>あなたの名前</Form.Label>
            <Form.Control
              onChange={onNameChange}
              value={name}
              type="text"
              placeholder="あなたの名前"
            />
          </Form.Group>
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
            回答
          </Button>
        </Col>
      </Row>
    </>
  );
}
