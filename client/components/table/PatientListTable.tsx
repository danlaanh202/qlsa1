import React, { useEffect, useState } from "react";
import {
  Form,
  Input,
  InputNumber,
  PaginationProps,
  Popconfirm,
  Table,
  Typography,
} from "antd";
import styled from "styled-components";
import { IPatient } from "../../types";
import { useRouter } from "next/router";
import useSnackbar from "../../hooks/useSnackbar";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import PatientManager from "../../managers/api/PatientManager";
import { format } from "date-fns";

interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
  editing: boolean;
  dataIndex: string;
  title: any;
  inputType: "number" | "text";
  record: IPatient;
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

const MedicineEditTable: React.FC = () => {
  const [form] = Form.useForm();
  const [data, setData] = useState<IPatient[]>([]);
  const [editingKey, setEditingKey] = useState("");
  const [page, setPage] = useState(0);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onChange: PaginationProps["onChange"] = (_page) => {
    router.push(`/patient_management/list?page=${_page}`);
  };
  const [open, msg, severity, handleShow, handleClose] = useSnackbar();

  const handleGetPatients = async () => {
    setLoading(true);
    try {
      const patients = await PatientManager.getAll();
      setData(patients);
    } catch (e) {
      handleShow("Lỗi khi lấy danh sách bệnh nhân", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleGetPatients();
  }, [page]);
  useEffect(() => {
    setPage((Number(router.query.page) - 1) | 0);
  }, [router]);
  const isEditing = (record: IPatient) => record.id_benh_nhan === editingKey;

  const edit = (record: IPatient) => {
    form.setFieldsValue({ name: "", age: "", address: "", ...record });
    setEditingKey(record.id_benh_nhan);
  };
  const handleDelete = async (key: React.Key) => {
    try {
    } catch (error) {}
  };

  const cancel = () => {
    setEditingKey("");
  };

  const save = async (key: React.Key) => {
    try {
      const row = (await form.validateFields()) as IPatient;

      const newData = [...data];
      const index = newData.findIndex((item) => key === item.id_benh_nhan);
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...row,
        });

        console.log(newData[index]);
      } else {
        newData.push(row);
        setData(newData);
        setEditingKey("");
      }
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo);
    }
  };

  const columns = [
    {
      title: "Tên bệnh nhân",
      dataIndex: "ho_va_ten",
      width: "120px",
      editable: true,
      fixed: "left",
    },
    {
      title: "Căn cước",
      dataIndex: "can_cuoc",
      width: "100px",
      editable: true,
    },
    {
      title: "Ngày sinh",
      dataIndex: "ngay_sinh",
      editable: true,
      width: "100px",
      render: (_: any, record: any) => {
        return format(new Date(record.ngay_sinh), "dd-MM-yyyy");
      },
    },
    {
      title: "Số điện thoại",
      dataIndex: "so_dien_thoai",
      width: "100px",
      editable: true,
    },
    {
      title: "Giới tính",
      dataIndex: "gioi_tinh",
      width: "60px",
      editable: true,
    },
    {
      title: "Email",
      dataIndex: "email",
      width: "200px",
      editable: true,
    },
    {
      title: "Địa chỉ",
      dataIndex: "dia_chi",
      width: "200px",
      editable: true,
    },
    {
      title: "Hành động",
      dataIndex: "operation",
      width: "100px",
      fixed: "right",
      render: (_: any, record: IPatient) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Typography.Link
              onClick={() => save(record.id_benh_nhan)}
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
            <>
              {data.length >= 1 ? (
                <Popconfirm
                  title="Sure to delete?"
                  onConfirm={() => handleDelete(record.id_benh_nhan)}
                >
                  <a style={{ color: "red", marginLeft: "8px" }}>Delete</a>
                </Popconfirm>
              ) : null}
            </>
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
      onCell: (record: IPatient) => ({
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
        loading={loading}
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
          onChange: onChange,
          current: page + 1,
          total: total,
        }}
        scroll={{ x: 1600 }}
        id="id_benh_nhan"
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

export default MedicineEditTable;
