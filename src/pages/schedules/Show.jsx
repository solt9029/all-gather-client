import React, { useState, useEffect } from 'react';
import { Row, Col, Form, Button } from 'react-bootstrap';
import { createSchedule, fetchSchedule } from '../../utils';
import { useRouteMatch } from 'react-router-dom';

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
    })();
  }, [routeMatch]);

  console.log(routeMatch.params.id);
  return <div>show</div>;
}
