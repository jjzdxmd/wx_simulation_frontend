import { TinyArea, TinyColumn, Progress } from '@ant-design/plots';
import { Col, Row } from 'antd';

import { ChartCard, Field } from '@/pages/OurCharts/components/Charts';
import styles from '../style.less';

const topColResponsiveProps = {
  xs: 24,
  sm: 12,
  md: 12,
  lg: 12,
  xl: 6,
  style: { marginBottom: 24 },
};

const IntroduceRow = ({ loading, introduceData }: { loading: boolean; introduceData: API_Abstract.introduce }) => {
  const today = new Date();
  const pastDates: string[] = [];
  for (let i = 6; i >= 0; i--) {
    const date = new Date(today.getFullYear(), today.getMonth(), today.getDate() - i);
    const dateString = date.toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });
    pastDates.push(dateString.split('/').join('-'));
  }

  return (
    <Row gutter={24}>
      {/*活跃任务*/}
      <Col {...topColResponsiveProps}>
        <ChartCard
          bordered={false}
          title="活跃任务数量"
          loading={loading}
          total={() => introduceData.activeCount}
          contentHeight={46}
        >
          {/* <TinyColumn height={46} data={[introduceData.activeCount]} /> */}
        </ChartCard>
      </Col>

      {/*异常任务*/}
      <Col {...topColResponsiveProps}>
        <ChartCard
          bordered={false}
          loading={loading}
          title="异常任务数量"
          color={'#E5EDFE'}
          total={() => introduceData.abnormalCount}
          contentHeight={46}
        >
          {/* <TinyColumn height={46} data={[introduceData.abnormalCount]} /> */}
        </ChartCard>
      </Col>

      {/*已完成任务*/}
      <Col {...topColResponsiveProps}>
        <ChartCard
          bordered={false}
          loading={loading}
          title="总任务数量"
          total={() => introduceData.totalCount}
          contentHeight={46}
        >
          {/* <TinyArea
            height={46}
            autoFit={false}
            smooth={false}
            data={[introduceData.totalCount]}
          /> */}
        </ChartCard>
      </Col>

      {/*卫星网络节点数*/}
      <Col {...topColResponsiveProps}>
        <ChartCard
          loading={loading}
          bordered={false}
          title="卫星网络节点数量"
          total={introduceData.wxCount}
          contentHeight={46}
        >
          {/* <TinyColumn height={46} data={[introduceData.wxCount]} /> */}
        </ChartCard>
      </Col>
    </Row>
  );
};

export default IntroduceRow;
