import { useNavigate } from 'react-router-dom';
import { ITableBody, ITableProp } from './table.interface';
import { Menu, MenuItem, MenuButton } from '@szhsin/react-menu';
import { capitalize, getClass } from '@utils/constants';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
} from '@chakra-ui/react';
import { useMemo, useState } from 'react';
import CustomPagination from '@shared/customPagination';

type ISortData = {
  key: string | null;
  direction: string;
};
const CustomTable = <TData extends ITableBody>({
  tableHeads,
  dataTableSource,
  pathTo,
  showMenu,
  showPagination,
  clickRow,
  showDivider,
  rowDetailCollector,
  current_page,
  setCurrentPage,
  page_size,
  total,
  menuOptions,
  onMenuClick,
  loading,
  tableEmptyState,
  tableLoader,
  setLimit,
}: ITableProp<TData>) => {
  const [sortConfig, setSortConfig] = useState<ISortData>({
    key: '' || null,
    direction: 'ascending',
  });

  const navigate = useNavigate();
  const dataLength = total as number;

  const itemsPerPage = page_size as number; // Number of items to display per page

  // Calculate the indexes for the current page
  const startIndex = ((current_page as number) - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const handlePageChange = (page: number) => {
    if (setCurrentPage) {
      setCurrentPage(page);
    }
  };

  const handleSetLimit = (value: number) => {
    setLimit && setLimit(value);
  };

  const handleNavigationToDetailpage = (indexValue: number) => {
    const id = dataTableSource![indexValue]?.id;
    if (pathTo !== '') {
      navigate(`${pathTo}/${id}`);
    } else {
      if (rowDetailCollector) {
        rowDetailCollector(dataTableSource![indexValue] as TData);
      }
    }
  };

  const sortedData = useMemo(() => {
    if (!dataTableSource) return [];
    const sortableData = [...dataTableSource];
    if (sortConfig.key !== null && sortConfig.key !== undefined) {
      sortableData.sort((a, b) => {
        if (
          a[sortConfig.key as unknown as keyof ITableBody] <
          b[sortConfig.key as unknown as keyof ITableBody]
        ) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (
          a[sortConfig.key as unknown as keyof ITableBody] >
          b[sortConfig.key as unknown as keyof ITableBody]
        ) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableData;
  }, [dataTableSource, sortConfig]);

  const requestSort = (key: string | null) => {
    let direction = 'ascending';
    if (
      key !== null &&
      sortConfig.key === key &&
      sortConfig.direction === 'ascending'
    ) {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const dataTableSourceLength = sortedData?.length as number;
  const borderValue = showDivider ? '1px' : '0px';

  return (
    <>
      <div
        id="tableContainer"
        className={`w-full overflow-y-auto scrollbar-none`}
      >
        {loading ? (
          tableLoader
        ) : !loading && dataTableSourceLength > 0 ? (
          <div className="relative">
            <TableContainer className="scrollbar-thin ">
              <Table>
                <Thead className="w-full bg-primary-light-2">
                  <Tr>
                    {tableHeads?.map((heads, index) => {
                      return (
                        <Th
                          onClick={() => {
                            requestSort(heads.accessor as string | null);
                          }}
                          key={index}
                          className={`text-left px-[10px] py-[13px] font-[500] bg-white capitalize text-sm text-[#64748B] border-b-[${borderValue}]`}
                        >
                          {heads.label}
                          {sortConfig.key === heads.accessor && (
                            <span>
                              {sortConfig.direction === 'ascending'
                                ? ' ▲'
                                : ' ▼'}
                            </span>
                          )}
                        </Th>
                      );
                    })}
                  </Tr>
                </Thead>

                <Tbody className={showDivider ? 'divide-y' : ''}>
                  {sortedData?.map((rowData, indexKey) => {
                    return (
                      <Tr
                        className={`w-full bg-white cursor-pointer capitalize`}
                        key={indexKey}
                      >
                        {tableHeads?.map(({ accessor, render }, i) => {
                          const dataToShow =
                            (render
                              ? render(rowData)
                              : rowData[accessor as string]) || '--';
                          return (
                            <Td
                              py="4"
                              fontSize="sm"
                              key={i}
                              className={`first:capitalize ${
                                !clickRow && 'cursor-pointer'
                              }`}
                              onClick={() => {
                                clickRow &&
                                  handleNavigationToDetailpage(indexKey);
                              }}
                            >
                              <span className={getClass(dataToShow)}>
                                {dataToShow}
                              </span>
                            </Td>
                          );
                        })}

                        {showMenu && (
                          <Td className="px-[10px] py-[13px] relative z-50s">
                            <span className="z-50 flex justify-center bg-red-90p  -ml-5">
                              <Menu
                                menuButton={
                                  <MenuButton>
                                    {/* <DottedAction className="w-[30px]" /> */}
                                    +
                                  </MenuButton>
                                }
                                transition={true}
                              >
                                {dataTableSource![indexKey]?.action_text && (
                                  <MenuItem
                                    onClick={() => {
                                      if (onMenuClick) {
                                        onMenuClick(dataTableSource![indexKey]);
                                      }
                                    }}
                                    // className={menuItemText(
                                    //   dataTableSource![indexKey]?.action_text,
                                    // )}
                                  >
                                    {capitalize(
                                      dataTableSource![indexKey]?.action_text,
                                    )}
                                  </MenuItem>
                                )}
                                {menuOptions?.map((menuItem, i) => {
                                  return (
                                    <MenuItem
                                      key={i}
                                      onClick={() =>
                                        menuItem?.action(
                                          dataTableSource![indexKey],
                                        )
                                      }
                                      // className={menuItemText(menuItem?.menuTitle)}
                                    >
                                      {menuItem?.menuTitle}
                                    </MenuItem>
                                  );
                                })}
                                {dataTableSource![indexKey]
                                  ?.action_text_sec && (
                                  <MenuItem
                                    onClick={() => {
                                      if (onMenuClick) {
                                        onMenuClick(dataTableSource![indexKey]);
                                      }
                                    }}
                                    // className={menuItemText(
                                    //   dataTableSource![indexKey]?.action_text_sec,
                                    // )}
                                  >
                                    {capitalize(
                                      dataTableSource![indexKey]
                                        ?.action_text_sec,
                                    )}
                                  </MenuItem>
                                )}
                              </Menu>
                            </span>
                          </Td>
                        )}
                      </Tr>
                    );
                  })}
                </Tbody>
              </Table>
            </TableContainer>
          </div>
        ) : (
          tableEmptyState
        )}
      </div>
      {/* pagination */}
      {loading && showPagination
        ? null
        : dataTableSourceLength === 0
        ? null
        : showPagination &&
          dataLength > 0 && (
            <div
              className="flex items-center justify-center mt-5"
              id="tablePagination"
            >
              <CustomPagination
                endIndex={endIndex}
                startIndex={startIndex}
                currentPage={current_page as number}
                onChangeOfPage={handlePageChange}
                lengthOfData={dataLength}
                onChangeofPageSize={handleSetLimit}
                limit={page_size as number}
              />
            </div>
          )}
    </>
  );
};
export default CustomTable;
