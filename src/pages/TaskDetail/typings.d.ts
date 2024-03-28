declare namespace API_Detail {
  // 获取特定任务的摘要
  type abstractByTask = {
    TaskID: string;
  }
  // 介绍栏
  type abstractList = {
    code: number;
    message: string;
    type: string;
    success: boolean;
    data: API_Detail.abstract;
  }
  // 分页
  type abnormalParams = {
    current?: number;
    pageSize?: number;
  };

  // 概况页
  type abstract = {
    progress: number;
  }
}
