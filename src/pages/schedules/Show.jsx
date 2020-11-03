import React, { useState, useEffect, useMemo } from 'react';
import { Row, Col, Form, Button, Alert, Table } from 'react-bootstrap';
import { fetchSchedule, answerSchedule } from '../../utils';
import { useRouteMatch, useHistory } from 'react-router-dom';
import CopyToClipBoard from 'react-copy-to-clipboard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy } from '@fortawesome/free-solid-svg-icons';
import { intersectionBy } from 'lodash';
import './Check.css';
import dayjs from 'dayjs';
import { NotFound } from './NotFound';

export function Show() {
  const routeMatch = useRouteMatch();
  const [schedule, setSchedule] = useState(null);
  const [isUrlCopied, setIsUrlCopied] = useState(false);
  const [checkedDateIds, setCheckedDateIds] = useState([]);
  const [name, setName] = useState('');
  const [scheduleMember, setScheduleMember] = useState(null);
  const [error, setError] = useState(null);
  const history = useHistory();

  useEffect(() => {
    (async () => {
      await setError(null);
      try {
        const response = await fetchSchedule(routeMatch.params.id);
        setSchedule(response.data);
      } catch (error) {
        setError(error);
      }
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

  const onCreateClick = () => {
    history.push('/schedules/new');
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
    }
  };

  const onAllSelectClick = () => {
    setCheckedDateIds(candidateDates.map((candidateDate) => candidateDate.id));
  };

  if (schedule === null && error !== null && error.response?.status === 404) {
    return <NotFound />;
  }

  return (
    <>
      {scheduleMember !== null && error === null && (
        <Row className="mb-3">
          <Col>
            <Alert variant="success">日程調整の回答が完了しました</Alert>
          </Col>
        </Row>
      )}
      {error !== null && error.response?.status === 500 && (
        <Row className="mb-3">
          <Col>
            <Alert variant="danger">エラーが発生しました</Alert>
          </Col>
        </Row>
      )}
      {error !== null && error.response?.status === 400 && (
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
      <Row>
        <Col>
          <h4>#{schedule?.title}</h4>
        </Col>
      </Row>
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
            <Button style={{ width: '100%' }} variant="info">
              <FontAwesomeIcon style={{ marginRight: '10px' }} icon={faCopy} />
              コピー
            </Button>
          </CopyToClipBoard>
        </Col>
      </Row>
      <Row className="mb-3">
        <Col>
          {candidateDates.length === 0 && (
            <div className="mb-5">
              <div className="mb-2">
                回答済みのメンバー全員の参加できる日程が存在しませんでした
                <span role="img" aria-label="sad">
                  😢
                </span>
              </div>
              <div>
                <Button variant="info" onClick={onCreateClick}>
                  新しい日程調整を作成
                </Button>
              </div>
            </div>
          )}
          {candidateDates.length > 0 && (
            <Form.Group>
              <Form.Label>
                <b>参加可能な日程を選びましょう</b>{' '}
                <Button
                  onClick={onAllSelectClick}
                  variant="info"
                  style={{
                    marginLeft: '10px',
                  }}
                >
                  全選択
                </Button>
              </Form.Label>
              {candidateDates
                .sort((a, b) => (new Date(a.date) < new Date(b.date) ? -1 : 1))
                .map((candidateDate) => (
                  <Form.Check
                    style={{ padding: '5px', marginLeft: '20px' }}
                    className="checkbox"
                    onChange={(event) => {
                      if (event.target.checked) {
                        setCheckedDateIds([
                          ...checkedDateIds,
                          candidateDate.id,
                        ]);
                        return;
                      }
                      setCheckedDateIds(
                        checkedDateIds.filter((id) => id !== candidateDate.id)
                      );
                    }}
                    checked={checkedDateIds.some(
                      (id) => id === candidateDate.id
                    )}
                    key={candidateDate.id}
                    name="aaa"
                    type="checkbox"
                    label={dayjs(candidateDate.date).format(
                      'YYYY年MM月DD日 (dd)'
                    )}
                  />
                ))}
            </Form.Group>
          )}
        </Col>
      </Row>
      {candidateDates.length !== 0 && (
        <>
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
        </>
      )}

      <Row>
        <Col>
          <p>
            <b>回答済みのメンバー（{schedule?.schedule_members?.length}人）</b>
          </p>
        </Col>
      </Row>
      <Row>
        <Col>
          <Table
            bordered
            striped
            hover
            style={{
              overflow: 'auto',
              display: 'block',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              textAlign: 'center',
            }}
            className="small"
          >
            <thead>
              <tr>
                <th>日程</th>
                {schedule?.schedule_members?.map((scheduleMember) => (
                  <th key={scheduleMember.id}>{scheduleMember.name}</th>
                ))}
              </tr>
              {schedule?.schedule_dates
                ?.sort((a, b) => (new Date(a.date) < new Date(b.date) ? -1 : 1))
                .map((scheduleDate) => {
                  return (
                    <tr key={scheduleDate.id}>
                      <td>{dayjs(scheduleDate.date).format('MM/DD')}</td>
                      {schedule?.schedule_members?.map(
                        (scheduleMember, index) => {
                          const hasDate = scheduleMember.schedule_dates.some(
                            (value) => value.id === scheduleDate.id
                          );
                          if (hasDate) {
                            return (
                              <td key={index}>
                                <span role="img" aria-label="ok">
                                  ⭕️
                                </span>
                              </td>
                            );
                          }
                          if (index > 0) {
                            const previousScheduleMember =
                              schedule.schedule_members[index - 1];
                            const hasPreviousDate = previousScheduleMember.schedule_dates.some(
                              (value) => value.id === scheduleDate.id
                            );
                            if (hasPreviousDate) {
                              return (
                                <td key={index}>
                                  <span role="img" aria-label="ng">
                                    ✖️
                                  </span>
                                </td>
                              );
                            }
                          }
                          return <td key={index}></td>;
                        }
                      )}
                    </tr>
                  );
                })}
            </thead>
          </Table>
        </Col>
      </Row>
    </>
  );
}
