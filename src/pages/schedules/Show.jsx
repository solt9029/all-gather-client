import React, { useState, useEffect } from 'react';
import { Row, Col, Form, Button } from 'react-bootstrap';
import { createSchedule, fetchSchedule } from '../../utils';
import { useRouteMatch } from 'react-router-dom';
import CopyToClipBoard from 'react-copy-to-clipboard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy } from '@fortawesome/free-solid-svg-icons';

export function Show() {
  const routeMatch = useRouteMatch();
  const [schedule, setSchedule] = useState({
    id: routeMatch.params.id,
    title: '',
    dates: [],
  });

  useEffect(() => {
    (async () => {
      const response = await fetchSchedule(routeMatch.params.id);
      setSchedule(response.data);
      console.log(response.data);
    })();
  }, [routeMatch]);

  console.log(routeMatch.params.id);
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
          <Button style={{ width: '100%' }}>
            <FontAwesomeIcon style={{ marginRight: '10px' }} icon={faCopy} />
            URLをコピー
          </Button>
        </Col>
      </Row>
    </>
  );
}
