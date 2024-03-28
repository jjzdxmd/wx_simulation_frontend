declare namespace API_Task {
  type taskParams = {
    current?: number;
    pageSize?: number;
  };

  type taskList = {
    data?: taskListItem[];
    total?: number;
    success?: boolean;
  }

  // 获取所有任务
  // TODO 修改数据表成员
  type taskListItem = {
    task_id: string;
    create_time: string;
    start_time?: string;
    end_time?: string;
    mode: number;
    status: number;
    ip?: string;
    port?: string;
    duration?: string;
    result?: string;
    attack_param?: string;
  }

  // 添加任务
  type taskListItemAdd = {
    task_id: string;
    create_time: string;
    mode: number;
    status: number;
    attack_param?: string[];
  }

  // 多个任务
  type taskListItemKeys = {
    taskIds: string[];
  }
}
