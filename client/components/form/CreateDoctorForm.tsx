import styled from "styled-components";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import FormRow from "./FormRow";
import FormInput from "./FormInput";
import { useState } from "react";
import useVNAddress from "../../hooks/useVNAddress";
import useSnackbar from "../../hooks/useSnackbar";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import DoctorManager from "../../managers/api/DoctorManager";
const schema = yup.object({});
const StyledFormContainer = styled.div`
  .submit-btn {
    margin-top: 40px;
    background: #1f28af;
    color: white;
    padding: 12px 20px;
    border: 1px solid #dcdfe6;
    border-radius: 6px;
    cursor: pointer;
    .spinner {
      width: 14px;
      height: 14px;
      border: 2px solid white;
      border-left: 2px solid transparent;
      margin: auto;
      border-radius: 100%;
    }
  }
`;
const CreateDoctorForm = () => {
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors, isValid, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
  });
  const [
    provincesList,
    setProvincesList,
    selectProvince,
    setSelectProvince,
    districtsList,
    setDistrictsList,
    selectDistrict,
    setSelectDistrict,
    wardsList,
    setWardsList,
    selectWard,
    setSelectWard,
  ] = useVNAddress();
  const [gender, setGender] = useState("");
  const [dob, setDob] = useState();
  const [open, msg, severity, handleShow, handleClose] = useSnackbar();
  const [loading, setLoading] = useState(false);
  const onSubmitHandler = async (data: any) => {
    setLoading(true);
    try {
      await DoctorManager.create({
        ...data,
        province: (selectProvince as any)?.name,
        district: (selectDistrict as any)?.name,
        ward: (selectWard as any)?.name,
        gioi_tinh: gender,
        ngay_sinh: dob,
      });
      handleShow("Thêm bác sĩ thành công");
    } catch (error) {
      handleShow("Có lỗi xảy ra", "error");
    } finally {
      setLoading(false);
    }
  };
  return (
    <StyledFormContainer>
      <form
        onSubmit={handleSubmit(onSubmitHandler as SubmitHandler<FieldValues>)}
      >
        <FormRow numberOfCol={2}>
          <FormInput
            control={control}
            inputType="text"
            label="Họ và tên"
            id="ho_va_ten"
          />
          <FormInput
            control={control}
            inputType="date"
            label="Ngày sinh"
            id="ngay_sinh"
            setStartDate={setDob}
            startDate={dob}
          />
        </FormRow>
        <FormRow numberOfCol={2}>
          <FormInput
            control={control}
            inputType="text"
            label="Chức danh"
            id="chuc_danh"
          />
          <FormInput
            control={control}
            inputType="text"
            label="Số điện thoại"
            id="so_dien_thoai"
          />
        </FormRow>
        <FormRow numberOfCol={2}>
          <FormInput
            control={control}
            inputType="text"
            label="Tên đăng nhập"
            id="username"
          />
          <FormInput
            control={control}
            inputType="text"
            label="Mật khẩu"
            id="password"
          />
        </FormRow>
        <FormRow numberOfCol={2}>
          <FormInput
            control={control}
            inputType="radio"
            label="Giới Tính"
            id="gioi_tinh"
            radioIds={["Nam", "Nữ"]}
            radioLabels={["Nam", "Nữ"]}
            setOuterVal={setGender}
          />
        </FormRow>
        <FormRow numberOfCol={3}>
          <FormInput
            control={control}
            id="province"
            inputType="dropdown"
            label="Tỉnh thành"
            list={provincesList}
            setOuterVal={setSelectProvince}
          />
          <FormInput
            control={control}
            id="district"
            inputType="dropdown"
            label="Quận huyện"
            list={districtsList}
            setOuterVal={setSelectDistrict}
          />
          <FormInput
            control={control}
            id="ward"
            inputType="dropdown"
            label="Phường xã"
            list={wardsList}
            setOuterVal={setSelectWard}
          />
        </FormRow>
        <button type="submit" className="submit-btn">
          {loading ? <div className="spinner"></div> : <>Thêm bác sĩ</>}
        </button>
      </form>
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
    </StyledFormContainer>
  );
};

export default CreateDoctorForm;
