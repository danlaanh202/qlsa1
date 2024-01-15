import React from "react";
import styled from "styled-components";

const StyledInputWrapper = styled.div`
  margin-top: 16px;
  .file-input-wrapper {
    .file-input-label {
      background: white;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 300px;
      height: 200px;
      border: 2px dashed black;
    }
    input {
      display: none;
    }
  }
  .image-wrapper {
    width: 300px;
    position: relative;
    img {
      width: 100%;
      object-fit: cover;
    }
    .delete-image-btn {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      padding: 4px;
      border-radius: 8px;
      cursor: pointer;
      opacity: 0;
    }
    &:hover {
      .delete-image-btn {
        opacity: 1;
        background: rgba(255, 255, 255, 0.8);
      }
    }
  }
`;

const InputWrapper = ({
  previewSource,
  fileInputState,
  handleFileInputChange,
  handleRemovePreviewImage,
}) => {
  return (
    <StyledInputWrapper>
      {!previewSource && (
        <div className="file-input-wrapper">
          <label className="file-input-label" htmlFor="file-id">
            Chọn ảnh
          </label>
          <input
            type="file"
            id="file-id"
            value={fileInputState}
            onChange={handleFileInputChange}
          />
        </div>
      )}
      {previewSource && (
        <div className="image-wrapper">
          <img src={previewSource} alt="Image preview" />
          <div className="delete-image-btn" onClick={handleRemovePreviewImage}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              width="16"
              height="16"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
              />
            </svg>
          </div>
        </div>
      )}
    </StyledInputWrapper>
  );
};

export default InputWrapper;
