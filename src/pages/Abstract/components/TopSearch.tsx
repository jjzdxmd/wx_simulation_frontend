import { Card, Table } from 'antd';
import React from 'react';
import type { TableProps } from 'antd';

const columns: TableProps<API_Task.taskListItem>['columns'] = [
  {
    title: '任务ID',
    dataIndex: 'task_id',
  },
  {
    title: '创建时间',
    dataIndex: 'create_time',
  },
  {
    title: '任务类型',
    dataIndex: 'mode',
    render: (val) => (val === 0 ? '拒绝服务攻击' : (val === 1 ? '端口扫描攻击' : '路由攻击')),
  },
];

const TopSearch = ({ loading, curTasks }: { loading: boolean; curTasks: API_Task.taskListItem[]; }) => {
  return (
    <Card
      loading={loading}
      bordered={false}
      title="最新任务"
      style={{
        height: '100%',
      }}
    >
      <Table<any>
        size="small"
        columns={columns}
        dataSource={curTasks}
        pagination={{
          style: { marginBottom: 0 },
          pageSize: 8,
          showSizeChanger: false
        }}
      />
    </Card>
  );
}

export default TopSearch;
