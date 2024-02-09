import { Input } from '@chakra-ui/react';
import { resetInputValue } from '@utils/constants';
import React, { useCallback, useMemo, useRef } from 'react';

type UploadProp = {
  keyName?: string;
  url?: string;
  className?: string;
  setFilePreview: React.Dispatch<React.SetStateAction<string | null>>;
  acceptType: string;
  pdfFileSetter: React.Dispatch<React.SetStateAction<File | null>>;
};

const MAX_IMAGE_SIZE = 900 * 900; // 1MB

function FileUpload({
  keyName,
  setFilePreview,
  url,
  className,
  acceptType,
  pdfFileSetter,
}: UploadProp) {
  const sideClasses =
    'h-[80px] w-[300px] cursor-pointer primary-self-text flex justify-center items-center overflow-hidden mx-auto ';

  const inputRef = useRef<HTMLInputElement | null>(null);

  const classes = useMemo(() => {
    if (sideClasses) {
      return sideClasses + ' ' + className;
    }
    return sideClasses;
  }, [className]);

  const onClickImage = useCallback(() => {
    inputRef?.current?.click();
  }, []);

  const handleImage1Change = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] as File;
    const allowedExtensions = /(pdf)$/i;
    //checking the img type
    const isValid = allowedExtensions.exec(file.type);

    if (!isValid) {
      alert('Not Valid Pdf type');
      return resetInputValue(e);
    }
    if (file.size > MAX_IMAGE_SIZE) {
      alert('Pdf size exceeds the maximum allowed size (240kb).');
      return resetInputValue(e);
    } else if (file) {
      pdfFileSetter(file);
      setFilePreview(URL.createObjectURL(file));
    }
  };

  return (
    <>
      <Input
        ref={inputRef}
        id={keyName}
        className="hidden"
        type="file"
        accept={acceptType}
        onChange={e => {
          if (handleImage1Change) {
            handleImage1Change(e);
          }
        }}
      />

      <div className={classes} onClick={onClickImage}>
        {url ? (
          //   <img
          //     className={'object-cover w-[100%]'}
          //     src={url}
          //     alt="upload_image"
          //   />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="50"
            height="50"
            fill="currentColor"
            className="bi bi-file-pdf"
            viewBox="0 0 16 16"
          >
            {' '}
            <path
              d="M4 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H4zm0 1h8a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1z"
              fill="red"
            ></path>{' '}
            <path
              d="M4.603 12.087a.81.81 0 0 1-.438-.42c-.195-.388-.13-.776.08-1.102.198-.307.526-.568.897-.787a7.68 7.68 0 0 1 1.482-.645 19.701 19.701 0 0 0 1.062-2.227 7.269 7.269 0 0 1-.43-1.295c-.086-.4-.119-.796-.046-1.136.075-.354.274-.672.65-.823.192-.077.4-.12.602-.077a.7.7 0 0 1 .477.365c.088.164.12.356.127.538.007.187-.012.395-.047.614-.084.51-.27 1.134-.52 1.794a10.954 10.954 0 0 0 .98 1.686 5.753 5.753 0 0 1 1.334.05c.364.065.734.195.96.465.12.144.193.32.2.518.007.192-.047.382-.138.563a1.04 1.04 0 0 1-.354.416.856.856 0 0 1-.51.138c-.331-.014-.654-.196-.933-.417a5.716 5.716 0 0 1-.911-.95 11.642 11.642 0 0 0-1.997.406 11.311 11.311 0 0 1-1.021 1.51c-.29.35-.608.655-.926.787a.793.793 0 0 1-.58.029zm1.379-1.901c-.166.076-.32.156-.459.238-.328.194-.541.383-.647.547-.094.145-.096.25-.04.361.01.022.02.036.026.044a.27.27 0 0 0 .035-.012c.137-.056.355-.235.635-.572a8.18 8.18 0 0 0 .45-.606zm1.64-1.33a12.647 12.647 0 0 1 1.01-.193 11.666 11.666 0 0 1-.51-.858 20.741 20.741 0 0 1-.5 1.05zm2.446.45c.15.162.296.3.435.41.24.19.407.253.498.256a.107.107 0 0 0 .07-.015.307.307 0 0 0 .094-.125.436.436 0 0 0 .059-.2.095.095 0 0 0-.026-.063c-.052-.062-.2-.152-.518-.209a3.881 3.881 0 0 0-.612-.053zM8.078 5.8a6.7 6.7 0 0 0 .2-.828c.031-.188.043-.343.038-.465a.613.613 0 0 0-.032-.198.517.517 0 0 0-.145.04c-.087.035-.158.106-.196.283-.04.192-.03.469.046.822.024.111.054.227.09.346z"
              fill="red"
            ></path>{' '}
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-[50px] w-[300px]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
        )}
      </div>
    </>
  );
}

export default FileUpload;
