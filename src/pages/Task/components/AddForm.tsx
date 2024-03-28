import {
  ProForm,
  ProFormUploadButton,
  ProFormSelect,
  ProFormText,
  ProFormRadio,
  ProFormDependency
} from '@ant-design/pro-components';
import { Modal } from 'antd';
import React from 'react';

export type AddFormValueType = {
  mode: number;
  model: number;
  status: number;
  port?: number;
  pcapFile?: File[];
};

export type AddFormProps = {
  onCancel: (flag?: boolean, formVals?: AddFormValueType) => void;
  onSubmit: (values: AddFormValueType) => Promise<void>;
  addModalOpen: boolean;
};

const AddForm: React.FC<AddFormProps> = (props) => {
  return (
    <Modal
      width={640}
      bodyStyle={{ padding: '32px 40px 48px' }}
      destroyOnClose
      title='新建任务'
      open={props.addModalOpen}
      footer={null}
      onCancel={() => {
        props.onCancel();
      }}
    >
      <ProForm
        onFinish={props.onSubmit}
      >
        <ProFormRadio.Group
          name="mode"
          label="任务类型"
          options={[
            {
              label: '拒绝服务攻击',
              value: 0,
            },
            {
              label: '端口扫描攻击',
              value: 1,
            },
            {
              label: '路由攻击',
              value: 2,
            },
          ]}
          rules={[
            {
              required: true,
              message: "请选择任务类型"
            },
          ]}
        />
        <ProForm.Group>
          <ProFormDependency name={["mode"]}>
            {({ mode }) => {
              return mode === 0 ? ( // TODO 拒绝服务攻击自定义参数界面
                <ProFormText
                  name="dos_param1"
                  label='IP'
                  width="md"
                  rules={[
                    {
                      required: true,
                      message: "请输入攻击IP"
                    },
                  ]}
                />
              ) : mode === 1 ? ( // TODO 端口扫描攻击自定义参数界面
                <>
                  <ProFormText
                    name="scan_param1"
                    label='IP'
                    width="md"
                    placeholder="eg.10.66.232.111 10.66.232.111/24"
                    rules={[
                      {
                        required: true,
                        message: "请输入攻击IP"
                      },
                    ]}
                  />
                  <ProFormText
                    name="scan_param2"
                    label='Port'
                    width="md"
                    rules={[
                      {
                        required: false,
                        message: "请输入攻击Port"
                      },
                    ]}
                  />
                  {/* <ProFormText
                    name="scan_param3"
                    label='Type'
                    width="md"
                    rules={[
                      {
                        required: false,
                        message: "请输入攻击Type"
                      },
                    ]}
                  /> */}
                  <ProFormSelect
                    name="scan_param3"
                    label="Type"
                    width="md"
                    placeholder="请选择攻击Type"
                    rules={[
                      {
                        required: true,
                        message: "请选择攻击Type"
                      },
                    ]}
                    options={[
                      {
                        label: "TCP Connect scan",
                        value: "TCP Connect scan",
                      },
                      {
                        label: "Ping scan",
                        value: "Ping scan",
                      },
                      {
                        label: "Version scan",
                        value: "Version scan",
                      },
                      // 添加更多选项...
                    ]}
                  />

                </>
              ) : mode === 2 ? ( // TODO 路由攻击自定义参数界面
                <>
                  <ProFormText
                    name="route_param1"
                    label='IP'
                    width="md"
                    rules={[
                      {
                        required: true,
                        message: "请输入攻击IP"
                      },
                    ]}
                  />
                  <ProFormText
                    name="route_param2"
                    label='Port'
                    width="md"
                    rules={[
                      {
                        required: true,
                        message: "请输入攻击端口"
                      },
                    ]}
                  />
                  <ProFormText
                    name="route_param3"
                    label='时长(单位:秒)'
                    width="md"
                    rules={[
                      {
                        required: true,
                        message: "请输入攻击时长"
                      },
                    ]}
                  />
                </>
              ) : null;
            }}
          </ProFormDependency>
        </ProForm.Group>
      </ProForm>
    </Modal>
  );
};

export default AddForm;
