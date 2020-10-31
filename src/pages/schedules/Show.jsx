import React, { useState } from 'react';
import { Row, Col, Form, Button } from 'react-bootstrap';
import { createSchedule } from '../../utils';
import { useRouteMatch } from 'react-router-dom';

export function Show() {
  const routeMatch = useRouteMatch();
  console.log(routeMatch.params.id);
  return <div>show</div>;
}
