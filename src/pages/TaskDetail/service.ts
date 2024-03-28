// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

// 获取所有任务ID
export async function task(params: API_Task.taskParams, options?: { [key: string]: any }) {
    return request<API_Task.taskList>('/api/task/getAllTask', {
        method: 'GET',
        params: {
            ...params,
        },
        ...(options || {}),
    });
}

// 获取指定taskid的任务信息
export async function taskById(body: API_Detail.abstractByTask) {
    return request<API_Task.taskListItem>(`/api/task/geTaskByID?taskId=${body.TaskID}`, {
        method: 'GET',
    });
}

// 获取指定taskid的摘要
export async function abstractById(body: API_Detail.abstractByTask) {
    return request<API_Detail.abstractList>(`/api/abstract/getAbstractByID?taskId=${body.TaskID}`, {
        method: 'GET',
    });
}


