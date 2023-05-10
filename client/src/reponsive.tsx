
import { Row, Col } from 'antd';

function Reponsive() {
  return (
    <div>
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} md={8} lg={6}>
          Content 1
        </Col>
        <Col xs={24} sm={12} md={8} lg={6}>
          Content 2
        </Col>
        <Col xs={24} sm={12} md={8} lg={6}>
          Content 3
        </Col>
        <Col xs={24} sm={12} md={8} lg={6}>
          Content 4
        </Col>
      </Row>
    </div>
  );
}

export default Reponsive;
