import React, { useState, useEffect, useMemo } from 'react';
import {
  Row,
  Col,
  Form,
  Button,
  ListGroup,
  ListGroupItem,
  Alert,
} from 'react-bootstrap';
import { fetchSchedule, answerSchedule } from '../../utils';
import { useRouteMatch } from 'react-router-dom';
import CopyToClipBoard from 'react-copy-to-clipboard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy, faUser } from '@fortawesome/free-solid-svg-icons';
import { intersectionBy } from 'lodash';
import './Check.css';
import dayjs from 'dayjs';

export function Show() {
  const routeMatch = useRouteMatch();
  const [schedule, setSchedule] = useState(null);
  const [isUrlCopied, setIsUrlCopied] = useState(false);
  const [checkedDateIds, setCheckedDateIds] = useState([]);
  const [name, setName] = useState('');
  const [scheduleMember, setScheduleMember] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    (async () => {
      await setError(null);
      const response = await fetchSchedule(routeMatch.params.id);
      setSchedule(response.data);
    })();
  }, [routeMatch.params.id, scheduleMember]);

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
        (scheduleMember) => scheduleMember.schedule_dates || []
      ),
      'date'
    );
  }, [schedule]);

  const onNameChange = (event) => {
    setName(event.target.value);
  };

  const onSubmitClick = async () => {
    try {
      await setError(null);
      const scheduleMember = await answerSchedule(routeMatch.params.id, {
        name,
        date_ids: checkedDateIds,
      });
      await setScheduleMember(scheduleMember);
    } catch (error) {
      setError(error);
      console.log(error);
    }
  };

  return (
    <>
      {scheduleMember !== null && error === null && (
        <Row className="mb-3">
          <Col>
            <Alert variant="success">日程調整の回答が完了しました</Alert>
          </Col>
        </Row>
      )}
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
      <Row className="mb-5">
        <Col lg={9} md={8} className="mt-2" style={{ paddingRight: '0.3rem' }}>
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
        <Col lg={3} md={4} className="mt-2" style={{ paddingLeft: '0.3rem' }}>
          <CopyToClipBoard onCopy={onCopy} text={window.location.href}>
            <Button style={{ width: '100%' }}>
              <FontAwesomeIcon style={{ marginRight: '10px' }} icon={faCopy} />
              コピー
            </Button>
          </CopyToClipBoard>
        </Col>
      </Row>
      <Row className="mb-3">
        <Col>
          <Form.Group>
            <Form.Label>
              <b>参加可能な日付を選びましょう</b>
            </Form.Label>
            {candidateDates.length === 0 && (
              <div>
                回答済みのメンバー全員の参加できる日程が存在しませんでした
              </div>
            )}
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
            <Form.Label>
              <b>あなたの名前</b>
            </Form.Label>
            <Form.Control
              onChange={onNameChange}
              value={name}
              type="text"
              placeholder="あなたの名前"
            />
          </Form.Group>
        </Col>
      </Row>
      <Row className="mb-5">
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

      <Row>
        <Col>
          <p>
            <b>回答済みのメンバー</b>
          </p>
        </Col>
      </Row>
      <Row>
        <Col>
          <ListGroup>
            {schedule?.schedule_members?.length === 0 && (
              <div>まだ誰も回答してません</div>
            )}
            {schedule?.schedule_members &&
              schedule.schedule_members.map((scheduleMember, index) => (
                <ListGroupItem
                  key={index}
                  style={{
                    paddingLeft: '1rem',
                    paddingRight: '1rem',
                    paddingTop: '0.3rem',
                    paddingBottom: '0.3rem',
                  }}
                >
                  <FontAwesomeIcon
                    style={{ marginRight: '10px' }}
                    icon={faUser}
                  />
                  {scheduleMember.name} さん
                </ListGroupItem>
              ))}
          </ListGroup>
        </Col>
      </Row>
    </>
  );
}
