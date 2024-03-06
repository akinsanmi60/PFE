import { useState } from 'react';

export type IPagenationSetter = {
  total: number;
  page_size?: number;
  current_page: number;
  total_pages: number;
  limit?: number;
};
const PagenationSetter = () => {
  const [paginationObj, setPagenationObj] = useState<IPagenationSetter>({
    current_page: 1,
    total_pages: 0,
    limit: 10,
    total: 0,
  });

  return { paginationObj, setPagenationObj };
};

export default PagenationSetter;
