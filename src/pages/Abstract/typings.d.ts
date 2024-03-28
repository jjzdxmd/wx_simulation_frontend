declare namespace API_Abstract {
  type abstractList = {
    code: number;
    message: string;
    type: string;
    success: boolean;
    data: API_Abstract.abstract;
  }

  // 分页?
  // // 活跃任务
  // type activeTask = {
  //   online: number;
  //   offline: number;
  // }

  // // 已完成任务
  // type completedTaskItem = {
  //   dateByDay: string;
  //   completeTaskByDay: number;
  // }

  // // N2口异常数
  // type n2AbnormalItem = {
  //   dateByDay: string;
  //   n2AbnormalByDay: number;
  // }

  // // N2口正常数
  // type n2NormalItem = {
  //   dateByDay: string;
  //   n2NormalByDay: number;
  // }

  // // 异常流量类别占比(二分类)
  // type abnormalFlowBinary = {
  //   normal: number;
  //   abnormal: number;
  // }

  // // 异常流量类别占比(多分类)
  // type abnormalFlowMulti = {
  //   normal: number;
  //   abnormal: number;
  // }

  // 介绍栏
  type introduce = {
    activeCount: number;
    abnormalCount: number;
    totalCount: number;
    wxCount: number;
  }

  // 任务类型
  type proportion = {
    dosCount: number;
    scanCount: number;
    routeCount: number;
  }

  // 概况页
  type abstract = {
    introduce: introduce;
    proportion: proportion;
    curTasks: API_Task.taskListItem[];
  }
}
