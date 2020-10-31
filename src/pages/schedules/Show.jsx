import React, { useState, useEffect, useMemo } from 'react';
import { Row, Col, Form, Button } from 'react-bootstrap';
import { fetchSchedule } from '../../utils';
import { useRouteMatch } from 'react-router-dom';
import CopyToClipBoard from 'react-copy-to-clipboard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy } from '@fortawesome/free-solid-svg-icons';
import { intersectionBy } from 'lodash';
import './Check.css';

export function Show() {
  const routeMatch = useRouteMatch();
  const [schedule, setSchedule] = useState(null);
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
      <Form.Group>
        {candidateDates.map((candidateDate) => (
          <Form.Check
            key={candidateDate.id}
            name="aaa"
            type="checkbox"
            label={candidateDate.date}
          />
        ))}
      </Form.Group>
      <Row>
        <Col></Col>
      </Row>
    </>
  );
}
