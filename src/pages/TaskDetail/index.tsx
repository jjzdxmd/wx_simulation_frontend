import React, { useState, useRef, useEffect, Suspense } from 'react';
import { Col, Divider, Row, Space } from 'antd';
import {
    GridContent,
    ProTable,
    ActionType,
    ProColumns,
    ProDescriptions,
    ProDescriptionsItemProps,
} from '@ant-design/pro-components';
import { task, taskById, abstractById } from './service';
import PageLoading from "@/pages/OurCharts/components/PageLoading";
import IntroduceRow from "@/pages/TaskDetail/components/IntroduceRow";

const TaskDetailPage: React.FC = () => {
    const detailRef = useRef<ActionType>();
    const [abstractValue, setAbstractValue] = useState<API_Detail.abstract>({
        progress: 0
    });

    const [selectedTaskId, setSelectedTaskId] = useState('');

    // 未选择任务id时, 显示更详细的任务信息
    const taskid_columns_detail: ProColumns<API_Task.taskListItem>[] = [
        {
            title: '任务ID',
            dataIndex: 'task_id',
            valueType: 'textarea',
            ellipsis: true,
        },
        {
            title: '任务类型',
            dataIndex: 'mode',
            renderText: (val: number) => {
                return val === 0 ? '拒绝服务攻击' : (val === 1 ? '端口扫描攻击' : '路由攻击');
            },
        },
        {
            title: '任务创建时间',
            dataIndex: 'create_time',
            valueType: 'dateTime',
        },
        {
            title: '任务开始时间',
            dataIndex: 'start_time',
            valueType: 'dateTime',
        },
        {
            title: '任务结束时间',
            dataIndex: 'end_time',
            valueType: 'dateTime',
        },
        {
            title: '状态',
            dataIndex: 'status',
            valueEnum: {
                100: {
                    text: '错误',
                    status: 'Error',
                },
                200: {
                    text: '已停止',
                    status: 'Error',
                },
                0: {
                    text: '未开始',
                    status: 'Default',
                },
                1: {
                    text: '待开始',
                    status: 'Processing',
                },
                2: {
                    text: '执行中',
                    status: 'Processing',
                },
                4: {
                    text: '已完成',
                    status: 'Success',
                },
            },
        }
    ]

    // 选择任务id后只显示任务id
    const taskid_columns: ProColumns<API_Task.taskListItem>[] = [
        {
            title: '任务ID',
            dataIndex: 'task_id',
            valueType: 'textarea',
            ellipsis: true,
        },
    ]

    // 选择任务id后显示任务详情
    const result: ProDescriptionsItemProps<API_Task.taskListItem>[] = [
        {
            title: '任务ID',
            dataIndex: 'task_id',
            valueType: 'textarea',
            ellipsis: true,
        },
        {
            title: '任务类型',
            dataIndex: 'mode',
            renderText: (val: number) => {
                return val === 0 ? '拒绝服务攻击' : (val === 1 ? '端口扫描攻击' : '路由攻击');
            },
        },
        {
            title: '状态',
            dataIndex: 'status',
            valueEnum: {
                100: {
                    text: '错误',
                    status: 'Error',
                },
                200: {
                    text: '已停止',
                    status: 'Error',
                },
                0: {
                    text: '未开始',
                    status: 'Default',
                },
                1: {
                    text: '待开始',
                    status: 'Processing',
                },
                2: {
                    text: '执行中',
                    status: 'Processing',
                },
                4: {
                    text: '检测完成',
                    status: 'Success',
                },
            },
        },
        {
            title: '创建时间',
            dataIndex: 'create_time',
            valueType: 'dateTime',
        },
        {
            title: '开始时间',
            dataIndex: 'start_time',
            valueType: 'dateTime',
        },
        {
            title: '结束时间',
            dataIndex: 'end_time',
            valueType: 'dateTime',
        },
        {
            title: '攻击IP',
            dataIndex: 'ip',
            valueType: 'textarea'
        },
        {
            title: '攻击端口',
            dataIndex: 'port',
            valueType: 'textarea'
        },
        {
            title: '攻击时长',
            dataIndex: 'duration',
            valueType: 'textarea'
        },
        {
            title: '任务结果',
            dataIndex: 'result',
            valueType: 'textarea'
        }
    ]

    useEffect(() => {
        const fetchData = async () => {
            const msg = await abstractById({ TaskID: selectedTaskId });
            setAbstractValue(msg.data);
        };
        if (selectedTaskId) {
            fetchData();
            if (detailRef.current) {
                detailRef.current.reload();
            }
        } else {
            setAbstractValue({
                progress: 0
            });
        }
    }, [selectedTaskId]);

    return (
        <GridContent>
            <Row gutter={16}>

                <Col span={selectedTaskId ? (5) : (23)}>
                    {/* 左侧菜单 */}
                    <ProTable<API_Task.taskListItem, API_Task.taskParams>
                        columns={selectedTaskId ? (taskid_columns) : (taskid_columns_detail)}
                        rowKey="task_id"
                        rowSelection={{
                            type: "radio", onChange: (_, selectedRows) => {
                                if (selectedRows.length > 0) {
                                    setSelectedTaskId(selectedRows[0].task_id);
                                } else {
                                    setSelectedTaskId('');
                                }
                            },
                            alwaysShowAlert: true,
                        }}
                        tableAlertRender={({
                            selectedRowKeys,
                            onCleanSelected,
                        }) => {
                            return (
                                <Space size={23}>
                                    <span>
                                        {selectedRowKeys.length > 0 ? ("当前选择" + selectedRowKeys[0]) : ("请选择要查看的任务")}
                                        <a style={{ marginInlineStart: 8 }} onClick={onCleanSelected}>
                                            {selectedRowKeys.length > 0 ? ("取消选择") : ("")}
                                        </a>
                                    </span>
                                </Space>
                            );
                        }}
                        tableAlertOptionRender={false}
                        search={false}
                        request={task}
                    />
                </Col>

                {/* 任务详细信息 */}
                <Col span={19}>
                    {/* 显示任务详细信息 */}
                    {selectedTaskId ? (
                        <>
                            <Divider>任务概况</Divider>
                            <GridContent>
                                <>
                                    <Suspense fallback={<PageLoading />}>
                                        <IntroduceRow loading={false} introduceData={abstractValue} />
                                    </Suspense>
                                </>
                            </GridContent>
                            <Divider>任务详情</Divider>
                            {/* 选择任务id后, 显示对应的任务信息 */}
                            <ProDescriptions<API_Task.taskListItem>
                                bordered={true}
                                actionRef={detailRef}
                                request={async () => { return await taskById({ TaskID: selectedTaskId }) }}
                                columns={result}></ProDescriptions>
                        </>
                    ) : (
                        <div style={{ textAlign: 'center' }}>
                        </div>
                    )}
                </Col>
            </Row >
        </GridContent >
    );
};

export default TaskDetailPage;
