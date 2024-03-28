import { Progress } from '@ant-design/plots';
import { Col, Row } from 'antd';

import { ChartCard, Field } from '../../OurCharts/components/Charts';

const topColResponsiveProps = {
  xs: 24,
  sm: 12,
  md: 12,
  lg: 12,
  xl: 6,
  style: { marginBottom: 24 },
};

const IntroduceRow = ({ loading, introduceData }: { loading: boolean; introduceData: API_Detail.abstract }) => {
  const progress = introduceData.progress;
  return (
    <Row gutter={24}>
      {/*已执行*/}
      <Col {...topColResponsiveProps}>
        <ChartCard
          bordered={false}
          loading={loading}
          title="执行进度"
          total={progress * 100 + '%'}
          contentHeight={46}
        >
          <Progress
            height={46}
            percent={progress}
            color="#13C2C2"
          />
        </ChartCard>
      </Col>
    </Row>
  );
};

export default IntroduceRow;
