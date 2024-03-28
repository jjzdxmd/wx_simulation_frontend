// @ts-ignore
import { request } from '@umijs/max';
import { message } from 'antd';

// 获取任务列表
export async function task(params: API_Task.taskParams, options?: { [key: string]: any }) {
  return request<API_Task.taskList>('/api/task/getAllTask', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

// 添加拒绝服务攻击任务
export async function addDosTask(body: API_Task.taskListItemAdd, options?: { [key: string]: any }) {
  let params = new FormData();
  params.append('taskId', body.task_id)
  params.append('createTime', body.create_time)
  params.append('mode', body.mode);
  params.append('status', body.status);
  params.append('attackParam', body.attack_param);
  return request<API_Task.taskListItemAdd>('/api/task/createDosTask', {
    method: 'POST',
    data: params,
    ...(options || {}),
  });
}

// 添加端口扫描攻击任务
export async function addScanTask(body: API_Task.taskListItemAdd, options?: { [key: string]: any }) {
  let params = new FormData();
  params.append('taskId', body.task_id)
  params.append('createTime', body.create_time)
  params.append('mode', body.mode);
  params.append('status', body.status);
  params.append('attackParam', body.attack_param);
  return request<API_Task.taskListItemAdd>('/api/task/createScanTask', {
    method: 'POST',
    data: params,
    ...(options || {}),
  });
}

// 添加路由攻击任务
export async function addRouteTask(body: API_Task.taskListItemAdd, options?: { [key: string]: any }) {
  let params = new FormData();
  params.append('taskId', body.task_id)
  params.append('createTime', body.create_time)
  params.append('mode', body.mode);
  params.append('status', body.status);
  params.append('attackParam', body.attack_param);
  return request<API_Task.taskListItemAdd>('/api/task/createRouteTask', {
    method: 'POST',
    data: params,
    ...(options || {}),
  });
}

// 删除任务
export async function removeTask(body: API_Task.taskListItemKeys, options?: { [key: string]: any }) {
  let params = new FormData();
  body.taskIds.forEach((taskId) => {
    params.append('taskId', taskId);
  });
  return request<Record<string, any>>('/api/task/deleteTask', {
    method: 'POST',
    data: params,
    ...(options || {}),
  });
}

// 开始任务
export async function startTask(body: API_Task.taskListItemKeys, options?: { [key: string]: any }) {
  let params = new FormData();
  body.taskIds.forEach((taskId) => {
    params.append('taskId', taskId);
  });
  return request<Record<string, any>>('/api/task/startTask', {
    method: 'POST',
    data: params,
    ...(options || {}),
  });
}

// 停止任务
export async function stopTask(body: API_Task.taskListItemKeys, options?: { [key: string]: any }) {
  let params = new FormData();
  body.taskIds.forEach((taskId) => {
    params.append('taskId', taskId);
  });
  return request<Record<string, any>>('/api/task/stopTask', {
    method: 'POST',
    data: params,
    ...(options || {}),
  });
}
