import React from 'react';
import { Row, Col, Jumbotron, Button } from 'react-bootstrap';

export function Top() {
  return (
    <>
      <Jumbotron
        className="mb-5"
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

      <Row>
        <Col>
          <h3>背景</h3>
        </Col>
      </Row>
      <Row>
        <Col>
          <img
            style={{ width: '100%' }}
            src="/normal-tool-description.jpeg"
            alt="normal tool description"
          />
        </Col>
      </Row>
      <Row className="mb-5">
        <Col>
          <p>
            従来の日程調整ツールでは、全員が全ての日程に回答する必要がありました。
            しかし、全員の予定を合わせることを前提とする日程調整の場合、誰かが参加できないと回答した日程について、回答する必要がありません。
            回答する必要のない日程まで確認する必要があり、とても手間になります。
          </p>
        </Col>
      </Row>

      <Row>
        <Col>
          <h3>全員集合！の魅力</h3>
        </Col>
      </Row>
      <Row>
        <Col>
          <img
            style={{ width: '100%' }}
            src="/all-gather-description.jpeg"
            alt="all-gather description"
          />
        </Col>
      </Row>
      <Row>
        <Col>
          <p>
            本日程調整ツールでは、誰かがすでに参加できないと回答している日程は除外して表示されます。
            回答済みのメンバが増えれば増えるほど、回答する必要のある日程が減り、より手軽に日程調整に回答することができるようになります。
          </p>
        </Col>
      </Row>
    </>
  );
}
