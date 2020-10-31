import React, { useState, useEffect } from 'react';
import { Row, Col, Form, Button } from 'react-bootstrap';
import { createSchedule, fetchSchedule } from '../../utils';
import { useRouteMatch } from 'react-router-dom';
import CopyToClipBoard from 'react-copy-to-clipboard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy } from '@fortawesome/free-solid-svg-icons';
import { intersection } from 'lodash';

export function Show() {
  const routeMatch = useRouteMatch();
  const [schedule, setSchedule] = useState({
    id: routeMatch.params.id,
    title: '',
    dates: [],
  });
  const [isUrlCopied, setIsUrlCopied] = useState(false);

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

  const { schedule_dates, schedule_members } = schedule;
  if (schedule_dates && schedule_members) {
    // 重なった日付
    console.log(
      intersection(
        schedule_dates.map((scheduleDate) => scheduleDate.date),
        ...schedule_members.map((scheduleMember) =>
          scheduleMember.schedule_dates.map((scheduleDate) => scheduleDate.date)
        )
      )
    );
  }

  return (
    <>
      <Row className="mb-3">
        <Col>
          <Form.Group>
            <Form.Label>日程調整URL</Form.Label>
            <Form.Control
              value={window.location.href}
              type="text"
              placeholder="日程調整URL"
              readOnly={true}
            />
          </Form.Group>
          <CopyToClipBoard onCopy={onCopy} text={window.location.href}>
            <Button style={{ width: '100%' }}>
              <FontAwesomeIcon style={{ marginRight: '10px' }} icon={faCopy} />
              URLをコピー
            </Button>
          </CopyToClipBoard>
          {isUrlCopied && (
            <small className="text-secondary">URLのコピーが完了しました</small>
          )}
        </Col>
      </Row>

      <Row>
        <Col></Col>
      </Row>
    </>
  );
}
