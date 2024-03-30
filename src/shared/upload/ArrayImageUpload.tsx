import { Input } from '@chakra-ui/react';
import { resetInputValue } from '@utils/constants';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { ReactComponent as UploadSvg } from '@assets/svg/uploadVector.svg';

type IArrayUploadProp = {
  keyName?: string;
  className?: string;
  url?: string[];
  acceptType: string;
  setChosenImages: (_val: File[]) => void;
  successWatcher: boolean;
};

const MAX_IMAGE_SIZE = 600 * 600; // 1MB

function ArrayImageUpload({
  keyName,
  className,
  acceptType,
  setChosenImages,
  successWatcher,
}: IArrayUploadProp) {
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const [imageString, setImageString] = useState<File[]>([]);
  const sideClasses =
    'h-[120px] w-full cursor-pointer primary-self-text flex justify-start items-center  overflow-hidden mx-auto ';

  const inputRef = useRef<HTMLInputElement | null>(null);

  const classes = `${sideClasses} ${className ?? ''}`;

  const onClickImage = useCallback(() => {
    inputRef?.current?.click();
  }, []);

  useEffect(() => {
    setChosenImages(imageString as File[]);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imageString]);

  useEffect(() => {
    if (successWatcher) {
      setPreviewImages([]);
      setImageString([]);
    }
  }, [successWatcher]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []) as File[];
    const allowedExtensions = /(jpg|jpeg|png|svg)$/i;

    const validFiles = files.filter(file => {
      const isValid = allowedExtensions.test(file.type);
      if (!isValid) {
        alert('Not Valid Image type');
        return false;
      }
      if (file.size > MAX_IMAGE_SIZE) {
        alert('Image size exceeds the maximum allowed size (240kb).');
        return resetInputValue(e);
      }
      return true;
    });

    if (validFiles.length >= 5) {
      alert('You can only upload 4 images');
    }

    if (validFiles.length > 0) {
      // setImageString(prevFiles => [...prevFiles, ...validFiles]);
      // const previewUrls = validFiles.map(file => URL.createObjectURL(file));
      // setPreviewImages(prevUrls => [...prevUrls, ...previewUrls]);
      setPreviewImages([]);
      setImageString(validFiles);
      const previewUrls = validFiles.map(file => URL.createObjectURL(file));
      setPreviewImages(previewUrls);
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
        multiple
        onChange={handleImageChange}
      />

      <div className={classes}>
        {previewImages && previewImages.length > 0 ? (
          <div className="flex gap-x-[20px]" onClick={onClickImage}>
            {previewImages.map((image, index) => (
              <img
                key={index}
                src={image}
                alt="image"
                className="w-[120px] h-[120px] cursor-pointer"
              />
            ))}
          </div>
        ) : (
          <div className="flex justify-center items-center border-[2px] border-dashed b border-background-light bg-[#EBFAEC] w-[60px] h-[60px] rounded-lg">
            <UploadSvg
              className="w-[20px] h-[20px] cursor-pointer"
              onClick={onClickImage}
            />
          </div>
        )}
      </div>
    </>
  );
}

export default ArrayImageUpload;
