import { Input } from '@chakra-ui/react';
import { resetInputValue } from '@utils/constants';
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { ReactComponent as UploadUserPlaceholder } from '@assets/svg/userPlacholderBig.svg';
import { ReactComponent as UploadCamCoder } from '@assets/svg/camCoder.svg';

type UploadProp = {
  keyName?: string;
  url?: string;
  className?: string;
  acceptType: string;
  successWatcher: boolean;
  setChosenImage?: (_val: File) => void;
};

const MAX_IMAGE_SIZE = 600 * 600; // 1MB

function ImageUpload({
  keyName,
  className,
  acceptType,
  successWatcher,
  setChosenImage,
}: UploadProp) {
  const [previewImage, setPreviewImage] = useState<string>('');
  const [imageString, setImageString] = useState<File | null>(null);
  const sideClasses =
    'relative h-[150px] w-[150px] cursor-pointer primary-self-text flex rounded-full justify-center items-center bg-tertiary-light-4 overflow-hidden mx-auto ';

  const inputRef = useRef<HTMLInputElement | null>(null);

  const classes = useMemo(() => {
    if (sideClasses) {
      return sideClasses + ' ' + className;
    }
    return sideClasses;
  }, [className]);

  useEffect(() => {
    setChosenImage && setChosenImage(imageString as File);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imageString]);

  useEffect(() => {
    if (successWatcher) {
      setPreviewImage('');
      setImageString(null);
    }
  }, [successWatcher]);

  const onClickImage = useCallback(() => {
    inputRef?.current?.click();
  }, []);

  const handleImage1Change = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] as File;
    const allowedExtensions = /(jpg|jpeg|png|svg)$/i;
    //checking the img type
    const isValid = allowedExtensions.exec(file?.type);

    if (!isValid) {
      alert('Not Valid Image type');
      return resetInputValue(e);
    }
    if (file.size > MAX_IMAGE_SIZE) {
      alert('Image size exceeds the maximum allowed size (240kb).');
      return resetInputValue(e);
    } else if (file) {
      setImageString(file);
      setPreviewImage(URL.createObjectURL(file));
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

      <div className="relative w-[150px]">
        <div className={classes} onClick={onClickImage}>
          {previewImage ? (
            <img
              className={'object-cover w-[100%] h-[100%]'}
              src={previewImage}
              alt="upload_image"
            />
          ) : (
            <UploadUserPlaceholder className="h-[100%] w-[100%]" />
          )}
        </div>
        <div
          className="absolute bottom-0 right-0 cursor-pointer"
          onClick={onClickImage}
        >
          <UploadCamCoder className="h-[36px] w-[36px]" />
        </div>
      </div>
    </>
  );
}

export default ImageUpload;
