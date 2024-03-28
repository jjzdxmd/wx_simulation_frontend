import React, { Suspense, useEffect, useState } from 'react';
import { Col, Row } from 'antd';
import { GridContent } from '@ant-design/pro-components';
import type { RadioChangeEvent } from 'antd/es/radio';

import IntroduceRow from './components/IntroduceRow';
import TopSearch from './components/TopSearch';
import ProportionSales from './components/ProportionSales';

import { abstractData } from './service';
import PageLoading from '@/pages/OurCharts/components/PageLoading';

type SalesType = 'all' | 'Dos' | 'Scan' | 'Route';

const Analysis: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [salesType, setSalesType] = useState<SalesType>('all');
  const [abstractValue, setAbstractValue] = useState<API_Abstract.abstract>({
    introduce: { activeCount: 0, abnormalCount: 0, totalCount: 0, wxCount: 0 },
    proportion: { dosCount: 0, scanCount: 0, routeCount: 0 },
    curTasks: [],
  });
  const [salesPieData, setSalesPieData] = useState<any>([]);

  useEffect(() => {
    const fetchData = async () => {
      const msg = await abstractData();
      setAbstractValue(msg.data);
      setSalesPieData([
        {
          x: '拒绝服务攻击',
          y: msg.data.proportion.dosCount,
        },
        {
          x: '端口扫描攻击',
          y: msg.data.proportion.scanCount,
        },
        {
          x: '路由攻击',
          y: msg.data.proportion.routeCount,
        },
      ]);
    };
    setLoading(false);
    fetchData();
  }, []);

  // useEffect(() => {
  //   window.location.reload();
  // },[JSON.stringify(abstractValue)])

  const handleChangeSalesType = (e: RadioChangeEvent) => {
    setSalesType(e.target.value);
  };

  // 等待数据加载完成后再渲染页面
  if (loading) {
    return <PageLoading />;
  }
  else {
    return (
      <GridContent>
        <>

          {abstractValue.introduce &&
            <Suspense fallback={<PageLoading />}>
              <IntroduceRow loading={false} introduceData={abstractValue.introduce} />
            </Suspense>
          }

          <Row
            gutter={24}
            style={{
              marginTop: 24,
            }}
          >
            {/*任务类别占比!*/}
            <Col xl={12} lg={24} md={24} sm={24} xs={24}>
              <Suspense fallback={null}>
                <ProportionSales
                  salesType={salesType}
                  loading={loading}
                  salesPieData={salesPieData}
                  handleChangeSalesType={handleChangeSalesType}
                />
              </Suspense>
            </Col>

            {/*最新任务*/}
            <Col xl={12} lg={24} md={24} sm={24} xs={24}>
              <Suspense fallback={null}>
                <TopSearch
                  loading={loading}
                  curTasks={abstractValue.curTasks}
                />
              </Suspense>
            </Col>
          </Row>
        </>
      </GridContent>
    );
  }
};

export default Analysis;
