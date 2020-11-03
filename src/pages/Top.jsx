import React from 'react';
import { Row, Col, Jumbotron, Button } from 'react-bootstrap';

export function Top() {
  return (
    <Jumbotron
      style={{
        textAlign: 'center',
        background: `linear-gradient(#6f86d6,#48c6ef)`,
        color: 'white',
      }}
    >
      <h1 className="mb-4">
        <b>全員集合！</b>
      </h1>
      <div className="mb-4" style={{ fontSize: '0.9rem' }}>
        <p>
          "全員集合！"は多数決ではなく 全員の予定を合わせることを前提とする
          日程調整を対象にデザインされた日程調整ツールです。
        </p>
      </div>
      <Button href="/schedules/new">日程調整を始める</Button>
    </Jumbotron>
  );
}
