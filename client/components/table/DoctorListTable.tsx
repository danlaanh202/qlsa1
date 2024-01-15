import React, { useEffect, useState } from "react";
import { Form, Input, InputNumber, Popconfirm, Table, Typography } from "antd";
import styled from "styled-components";
import { IDoctor } from "../../types";
import useSnackbar from "../../hooks/useSnackbar";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import DoctorManager from "../../managers/api/DoctorManager";

interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
  editing: boolean;
  dataIndex: string;
  title: any;
  inputType: "number" | "text";
  record: IDoctor;
  index: number;
  children: React.ReactNode;
}

const EditableCell: React.FC<EditableCellProps> = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  const inputNode = inputType === "number" ? <InputNumber /> : <Input />;

  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{ margin: 0 }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

const DoctorListTable: React.FC = () => {
  const [form] = Form.useForm();
  const [data, setData] = useState<IDoctor[]>([]);
  const [loading, setLoading] = useState(false);
  const [editingKey, setEditingKey] = useState("");
  const [open, msg, severity, handleShow, handleClose] = useSnackbar();

  const handleGetDoctors = async () => {
    setLoading(true);
    try {
      const doctors = await DoctorManager.getAll();
      setData(doctors);
    } catch (e) {
      handleShow("Lỗi khi lấy danh sách bệnh nhân", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleGetDoctors();
  }, []);
  const isEditing = (record: IDoctor) => record.id_bac_si === editingKey;

  const edit = (record: IDoctor) => {
    form.setFieldsValue({ name: "", age: "", address: "", ...record });
    setEditingKey(record.id_bac_si);
  };

  const cancel = () => {
    setEditingKey("");
  };

  const save = async (key: React.Key) => {
    try {
      const row = (await form.validateFields()) as IDoctor;

      const newData = [...data];
      const index = newData.findIndex((item) => key === item.id_bac_si);
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...row,
        });

        setData(newData);
        setEditingKey("");

        await DoctorManager.edit(newData[index]);
      } else {
        newData.push(row);
        setData(newData);
        setEditingKey("");
      }
    } catch (errInfo) {
      console.log("Sửa không thành công", errInfo);
    }
  };

  const columns = [
    {
      title: "Tên bác sĩ",
      dataIndex: "ho_va_ten",
      width: "120px",
      editable: true,
    },
    {
      title: "Ngày sinh",
      dataIndex: "ngay_sinh",
      width: "100px",
      editable: true,
    },
    {
      title: "Chức danh",
      dataIndex: "chuc_danh",
      editable: true,
      width: "100px",
    },
    {
      title: "Số điện thoại",
      dataIndex: "so_dien_thoai",
      width: "100px",
      editable: true,
    },
    {
      title: "Địa chỉ",
      dataIndex: "dia_chi",
      width: "250px",
      editable: true,
    },

    {
      title: "Hành động",
      dataIndex: "operation",
      width: "100px",

      render: (_: any, record: IDoctor) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Typography.Link
              onClick={() => save(record.id_bac_si)}
              style={{ marginRight: 8 }}
            >
              Save
            </Typography.Link>
            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
              <a>Cancel</a>
            </Popconfirm>
          </span>
        ) : (
          <>
            <Typography.Link
              disabled={editingKey !== ""}
              onClick={() => edit(record)}
            >
              Edit
            </Typography.Link>
          </>
        );
      },
    },
  ];

  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record: IDoctor) => ({
        record,
        inputType: "text",
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  return (
    <Form form={form} component={false}>
      <StyledTable
        components={{
          body: {
            cell: EditableCell,
          },
        }}
        bordered
        dataSource={data}
        columns={mergedColumns as any}
        rowClassName="editable-row"
        pagination={{
          onChange: cancel,
        }}
        // scroll={{ x: 1600 }}
        id="id_bac_si"
      />
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity={severity} sx={{ width: "100%" }}>
          {msg}
        </Alert>
      </Snackbar>
    </Form>
  );
};
const StyledTable = styled(Table)`
  .ant-pagination-item {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

export default DoctorListTable;
