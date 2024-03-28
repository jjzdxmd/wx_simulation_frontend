import { task, addDosTask, addScanTask, addRouteTask, removeTask, startTask, stopTask } from '@/pages/Task/service';
import { PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import {
    PageContainer,
    ProTable,
} from '@ant-design/pro-components';
import '@umijs/max';
import { Button, message, Modal, Space } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import type { AddFormValueType } from '@/pages/Task/components/AddForm';
import AddForm from '@/pages/Task/components/AddForm';
import { v4 as uuidv4 } from 'uuid';
import moment from 'moment';

// 创建任务
// TODO 修改任务参数
const handleAdd = async (fields: AddFormValueType) => {
    const hide = message.loading('正在添加');
    if (fields.mode == 0) {
        try {
            await addDosTask({
                task_id: uuidv4(),
                create_time: moment().format('YYYY-MM-DD HH:mm:ss'),
                mode: fields.mode,
                status: 0,
                attack_param: [fields.dos_param1],
            });
            hide();
            message.success('成功创建拒绝服务攻击任务');
            return true;
        } catch (error) {
            hide();
            message.error('创建失败, 请重试!');
            return false;
        }
    } else if (fields.mode == 1) {
        try {
            await addScanTask({
                task_id: uuidv4(),
                create_time: moment().format('YYYY-MM-DD HH:mm:ss'),
                mode: fields.mode,
                status: 0,
                attack_param: [fields.scan_param1, fields.scan_param2, fields.scan_param3],
            });
            hide();
            message.success('成功创建端口扫描攻击任务');
            return true;
        } catch (error) {
            hide();
            message.error('创建失败, 请重试!');
            return false;
        }
    } else if (fields.mode == 2) {
        try {
            await addRouteTask({
                task_id: uuidv4(),
                create_time: moment().format('YYYY-MM-DD HH:mm:ss'),
                mode: fields.mode,
                status: 0,
                attack_param: [fields.route_param1, fields.route_param2, fields.route_param3],
            });
            hide();
            message.success('成功创建路由攻击任务');
            return true;
        } catch (error) {
            hide();
            message.error('创建失败, 请重试!');
            return false;
        }
    }
};

// 批量删除
const handleRemove = async (selectedRows: API_Task.taskListItem[]) => {
    const hide = message.loading('正在删除');
    if (!selectedRows) return true;
    try {
        const startableRows = selectedRows.filter((row) => [0, 4, 100, 200].includes(row.status));
        if (startableRows.length === 0) {
            hide();
            message.error('选中的任务中没有可删除的任务');
            return false;
        }
        await removeTask({
            taskIds: startableRows.map((row) => row.task_id),
        });
        hide();
        message.success('删除成功');
        return true;
    } catch (error) {
        hide();
        message.error('删除失败, 请重试');
        return false;
    }
};

// 批量开始
const handleStart = async (selectedRows: API_Task.taskListItem[]) => {
    const hide = message.loading('正在启动');
    if (!selectedRows) return true;
    try {
        const starttableRows = selectedRows.filter((row) => [0, 4, 100, 200].includes(row.status));
        if (starttableRows.length === 0) {
            hide();
            message.error('选中的任务中没有可启动的任务');
            return false;
        }
        await startTask({
            taskIds: starttableRows.map((row) => row.task_id),
        });
        hide();
        message.success('启动成功');
        return true;
    } catch (error) {
        hide();
        message.error('启动失败, 请重试');
        return false;
    }
};

// 批量停止
const handleStop = async (selectedRows: API_Task.taskListItem[]) => {
    const hide = message.loading('正在停止');
    if (!selectedRows) return true;
    try {
        const stoptableRows = selectedRows.filter((row) => [1, 2, 3].includes(row.status));
        if (stoptableRows.length === 0) {
            hide();
            message.error('选中的任务中没有可停止的任务');
            return false;
        }
        await stopTask({
            taskIds: stoptableRows.map((row) => row.task_id),
        });
        hide();
        message.success('已停止');
        return true;
    } catch (error) {
        hide();
        message.error('停止失败, 请重试');
        return false;
    }
};

const TableList: React.FC = () => {
    // 新建窗口的弹窗
    const [createModalOpen, handleModalOpen] = useState<boolean>(false);
    // 更新窗口的弹窗
    const [showDetail, setShowDetail] = useState<boolean>(false);
    const actionRef = useRef<ActionType>();
    const [autoReload, setAutoReload] = useState<boolean>(true);
    const [deleteModalVisible, setDeleteModalVisible] = useState(false);
    const [deleteTasks, setDeleteTasks] = useState<API_Task.taskListItem[]>([]);
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

    // 确认删除
    const showDeleteModal = (deleteTasks: API_Task.taskListItem[]) => {
        setDeleteModalVisible(true);
        setDeleteTasks(deleteTasks);
    };

    const handleDeleteConfirm = async () => {
        // 调用删除任务的方法
        await handleRemove(deleteTasks);
        setSelectedRowKeys([]);
        if (actionRef.current) {
            actionRef.current.reload();

        } else {
            message.error('任务已经删除');
        }
        setDeleteModalVisible(false);

    };

    const handleDeleteCancel = () => {
        setDeleteModalVisible(false);
    };

    // 自动刷新数据
    useEffect(() => {
        const timer = setInterval(() => {
            if (actionRef.current && autoReload) {
                actionRef.current.reload();
            }
        }, 1000); // 每隔 1 秒刷新一次

        return () => clearInterval(timer);
    }, [autoReload]);

    const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
        console.log('selectedRowKeys changed: ', newSelectedRowKeys);
        setSelectedRowKeys(newSelectedRowKeys);
    };

    const columns: ProColumns<API_Task.taskListItem>[] = [
        {
            title: '任务ID',
            dataIndex: 'task_id',
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
            title: '参数',
            dataIndex: 'attack_param',
            valueType: 'textarea',
        },
        // {
        //     title: '结果',
        //     dataIndex: 'result',
        //     valueType: 'textarea',
        // },
        {
            title: '状态',
            dataIndex: 'status',
            filters: true,
            onFilter: true,
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
                    status: 'Processing',
                },
            },
        },
        {
            title: '操作',
            dataIndex: 'option',
            valueType: 'option',
            render: (_, record) => {
                const canRestart = record.status === 4 || record.status === 100 || record.status === 200;
                const canStart: boolean = record.status === 0;
                const canDelete: boolean = record.status === 0 || record.status === 4 || record.status === 100 || record.status === 200;
                const canStop: boolean = record.status === 1 || record.status === 2 || record.status === 3;
                return [
                    canStop && (
                        <a
                            key="stopTask"
                            onClick={async () => {
                                await handleStop([record]);
                                if (actionRef.current) {
                                    actionRef.current.reload();
                                    setAutoReload(true);
                                } else {
                                    message.error('任务已经停止');
                                }
                            }}
                        >
                            停止任务
                        </a>
                    ),
                    canRestart && (
                        <a
                            key="restartTask"
                            onClick={async () => {
                                await handleStart([record]);
                                if (actionRef.current) {
                                    actionRef.current.reload();
                                    setAutoReload(true);
                                } else {
                                    message.error('任务已经启动');
                                }
                            }}
                        >
                            重新开始
                        </a>
                    ),
                    canStart && (
                        <a
                            key="startTask"
                            onClick={async () => {
                                await handleStart([record]);
                                if (actionRef.current) {
                                    actionRef.current.reload();
                                    setAutoReload(true);
                                } else {
                                    message.error('任务已经启动');
                                }
                            }}
                        >
                            开始任务
                        </a>
                    ),
                    canDelete && (
                        <a
                            key="deleteTask"
                            onClick={() => {
                                showDeleteModal([record]);
                            }}
                        >
                            删除任务
                        </a>
                    )
                ];
            },
        },
    ];
    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    };
    return (
        <PageContainer>
            <ProTable<API_Task.taskListItem, API.PageParams>
                headerTitle="任务列表"
                actionRef={actionRef}
                rowKey="task_id"
                search={false}
                toolBarRender={() => [
                    <Button
                        type="primary"
                        key="primary"
                        onClick={() => {
                            handleModalOpen(true);
                        }}
                    >
                        <PlusOutlined /> 新建
                    </Button>,
                ]}

                request={async (params: {
                    pageSize?: number;
                    current?: number;
                },) => {
                    const msg = await task({
                        current: params.current,
                        pageSize: params.pageSize,
                    });
                    if (msg.success && msg.data) {
                        setAutoReload(msg.data.some((item: {
                            status: number;
                        }) => [1, 2, 3].includes(item.status)));
                        // TODO 修改列表显示的参数
                        msg.data.map(item => {
                            console.log("item:", item);
                            console.log("item.ip:", item.ip);
                            console.log("item.port:", item.port);
                            console.log("item.attack_param:", item.attack_param);
                            if (item.mode == 0) {
                                // 拒绝服务
                                item.attack_param = item.ip;
                            } else if (item.mode == 1) {
                                // 端口扫描
                                // item.attack_param = item.ip + ', ' + item.port + ', ' + item.attack_param;
                                item.attack_param = item.ip + ', ' + item.port + ', ' + item.protocol;
                            } else if (item.mode == 2) {
                                // 路由攻击
                                item.attack_param = item.ip + ', ' + item.port + ', ' + item.duration;
                            }
                        });
                    } else
                        setAutoReload(true);
                    return {
                        data: msg.data,
                        success: msg.success,
                    };
                }}

                columns={columns}
                rowSelection={rowSelection}
                // 左侧选项区域
                tableAlertRender={({ selectedRowKeys, onCleanSelected }) => {
                    return (
                        <Space size={24}>
                            <span>
                                已选 {selectedRowKeys.length} 项
                                <a style={{ marginInlineStart: 8 }} onClick={onCleanSelected}>
                                    取消选择
                                </a>
                            </span>
                        </Space>
                    );
                }}
                // 右侧选项区域
                tableAlertOptionRender={({ selectedRows, onCleanSelected }) => {
                    console.log("tableAlertOptionRender" + selectedRows);

                    return (
                        <Space size={16}>
                            <a
                                onClick={() => {
                                    showDeleteModal(selectedRows);

                                }}
                            >
                                批量删除
                            </a>
                            <a
                                onClick={async () => {
                                    await handleStart(selectedRows);

                                    if (actionRef.current) {
                                        actionRef.current.reload();
                                        onCleanSelected();
                                    } else {
                                        message.error('任务已经启动');
                                    }
                                }}
                            >
                                批量启动
                            </a>
                        </Space>
                    );
                }}
            />
            <Modal
                title="确认删除"
                open={deleteModalVisible}
                onOk={() => {
                    handleDeleteConfirm();

                }}
                onCancel={handleDeleteCancel}
            >
                {deleteTasks.length === 1 ? (
                    `是否删除任务 ${deleteTasks[0].task_id}?`
                ) : (
                    `是否删除 ${deleteTasks.length} 个任务?`
                )}
            </Modal>
            <AddForm
                onSubmit={async (value) => {
                    const success = await handleAdd(value);
                    if (success) {
                        handleModalOpen(false);
                        if (actionRef.current) {
                            actionRef.current.reload();
                        }
                    }
                }}
                onCancel={() => {
                    handleModalOpen(false);
                }}
                addModalOpen={createModalOpen}
            />
        </PageContainer>
    );
};
export default TableList;
