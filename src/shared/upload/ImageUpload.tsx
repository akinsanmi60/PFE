import { Input } from '@chakra-ui/react';
import { resetInputValue } from '@utils/constants';
import React, { useCallback, useMemo, useRef } from 'react';

type UploadProp = {
  keyName?: string;
  url?: string;
  className?: string;
  setPreviewImage1: React.Dispatch<React.SetStateAction<string | null>>;
  acceptType: string;
  imageFileSetter: React.Dispatch<React.SetStateAction<File | null>>;
};

const MAX_IMAGE_SIZE = 600 * 600; // 1MB

function ImageUpload({
  keyName,
  setPreviewImage1,
  url,
  className,
  acceptType,
  imageFileSetter,
}: UploadProp) {
  const sideClasses =
    'h-[150px] w-[150px] cursor-pointer primary-self-text flex justify-center items-center overflow-hidden mx-auto ';

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
    const allowedExtensions = /(jpg|jpeg|png|svg)$/i;
    //checking the img type
    const isValid = allowedExtensions.exec(file.type);

    if (!isValid) {
      alert('Not Valid Image type');
      return resetInputValue(e);
    }
    if (file.size > MAX_IMAGE_SIZE) {
      alert('Image size exceeds the maximum allowed size (240kb).');
      return resetInputValue(e);
    } else if (file) {
      imageFileSetter(file);
      setPreviewImage1(URL.createObjectURL(file));
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
          <img
            className={'object-cover w-[100%]'}
            src={url}
            alt="upload_image"
          />
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-[50px] w-[50px]"
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

export default ImageUpload;
