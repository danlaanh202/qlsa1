import styled from "styled-components";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import FormRow from "./FormRow";
import FormInput from "./FormInput";
import useSnackbar from "../../hooks/useSnackbar";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import InputWrapper from "../InputWrapper";
import useUploadImage from "../../hooks/useUploadImage";

const schema = yup.object({});
const StyledFormContainer = styled.div`
  .submit-btn {
    margin-top: 40px;
    background: #1f28af;
    color: white;
    padding: 12px 20px;
    border: 1px solid #dcdfe6;
    border-radius: 6px;
    min-width: 150px;
    min-height: 42px;
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
const CreatePaperForm = ({
  createPaper,
  loading = false,
}: {
  createPaper: (data: any) => Promise<any>;
  loading?: boolean;
}) => {
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors, isValid, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
  });
  const [open, msg, severity, handleShow, handleClose] = useSnackbar();
  const onSubmitHandler = async (data: any) => {
    const { url } = await uploadImage();

    const resp = await createPaper({ ...data, hinh_sieu_am: url });
    reset();
  };
  const {
    previewSource,
    fileInputState,
    handleFileInputChange,
    handleRemovePreviewImage,
    uploadImage,
  } = useUploadImage();
  return (
    <StyledFormContainer>
      <form
        onSubmit={handleSubmit(onSubmitHandler as SubmitHandler<FieldValues>)}
      >
        <FormRow numberOfCol={1}>
          <FormInput
            control={control}
            inputType="text"
            label="Chi phí"
            id="chi_phi"
          />
        </FormRow>
        <FormRow numberOfCol={1}>
          <FormInput
            control={control}
            inputType="textField"
            label="Kết quả siêu âm"
            id="ket_qua"
          />
        </FormRow>
        <FormRow numberOfCol={1}>
          <FormInput
            control={control}
            inputType="textField"
            label="Kết luận của bác sĩ"
            id="ket_luan"
          />
        </FormRow>

        <InputWrapper
          previewSource={previewSource}
          fileInputState={fileInputState}
          handleFileInputChange={handleFileInputChange}
          handleRemovePreviewImage={handleRemovePreviewImage}
        />
        <button type="submit" className="submit-btn">
          {loading ? (
            <div className="spinner"></div>
          ) : (
            <>Hoàn thành phiếu siêu âm</>
          )}
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

export default CreatePaperForm;
