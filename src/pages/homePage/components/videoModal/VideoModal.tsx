import { Fragment } from 'react';
import { createPortal } from 'react-dom';

const VideoModal = ({
  isShowing,
  hide,
  link,
}: {
  isShowing: boolean;
  hide: () => void;
  link?: string;
}) =>
  isShowing
    ? createPortal(
        <Fragment>
          <div className="fixed top-0 left-0 w-screen z-[1040] h-screen bg-black/50 opacity-50" />
          <div
            className="fixed top-0 left-0 z-[1050] w-full overflow-x-hidden overflow-y-hidden outline-0 "
            aria-modal
            aria-hidden
            tabIndex={-1}
            role="dialog"
            onClick={hide}
          >
            <div className="max-content">
              <div className="container flex h-screen">
                <div className="z-[100]  relative  rounded-lg  m-auto">
                  <div className="relative  ">
                    <div className="flex justify-end -mb-10 mr-5 ">
                      <button
                        type="button"
                        className="sticky z-50 right-0 top-2  bg-transparent rounded-lg text-xl text-[#fff] p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                        onClick={hide}
                      >
                        <svg
                          aria-hidden="true"
                          className="w-5 h-5"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                            clip-rule="evenodd"
                          ></path>
                        </svg>
                        <span className="sr-only">Close modal</span>
                      </button>
                    </div>
                    <video
                      className="w-full h-full rounded-lg "
                      controls
                      autoPlay
                    >
                      <source src={link} type="video/mp4" />
                    </video>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Fragment>,
        document.body,
      )
    : null;

export default VideoModal;
