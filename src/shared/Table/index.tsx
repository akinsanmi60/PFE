import { useNavigate } from 'react-router-dom';
import CustomPagination from 'shared/Pagination';
import { ITableBody, ITableProp } from './table.interface';

import { Menu, MenuItem, MenuButton } from '@szhsin/react-menu';
import { capitalize, getClass } from '@utils/constants';
import { IPagenationSetter } from '@hooks/tableHook';
import { RxHamburgerMenu } from 'react-icons/rx';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
} from '@chakra-ui/react';
import { MouseEvent, useMemo, useState } from 'react';

type ISortData = {
  key: string | null;
  direction: string;
};
const CustomTable = ({
  tableHeads,
  dataTableSource,
  pathTo,
  showMenu,
  showPagination,
  clickRow,
  showDivider,
  showRowModal,
  rowDetailCollector,
  setValuer,
  valuer,
  page_size,
  total,
  menuOptions,
  onMenuClick,
  loading,
  tableEmptyState,
  tableLoader,
  optAddItem,
  removeHeads,
  useTableFilter = true,
}: ITableProp) => {
  const [sortConfig, setSortConfig] = useState<ISortData>({
    key: '' || null,
    direction: 'ascending',
  });

  const navigate = useNavigate();
  const [openFilterModal, setOpenFilterModal] = useState(false);

  const dataLength = total as number;

  const itemsPerPage = page_size as number; // Number of items to display per page

  // Calculate the indexes for the current page
  const startIndex = ((valuer?.current_page as number) - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const handlePageChange = (page: number) => {
    if (setValuer) {
      setValuer({ ...(valuer as IPagenationSetter), current_page: page });
    }
  };

  const handleNavigationToDetailpage = (indexValue: number) => {
    const id = dataTableSource![indexValue]?.id;
    if (pathTo !== '') {
      navigate(`${pathTo}/${id}`);
    } else if (showRowModal) {
      // dispatch(setFilterModalOpen(true));
      if (rowDetailCollector) {
        rowDetailCollector(dataTableSource![indexValue] as ITableBody);
      }
    }
  };

  const handleFilterOpen = () => {
    if (openFilterModal === false) {
      setOpenFilterModal(!openFilterModal);
    } else {
      setOpenFilterModal(false);
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
              <Table variant="striped" colorScheme="gray">
                <Thead className="w-full">
                  <Tr>
                    {tableHeads?.map(heads => {
                      return (
                        <Th
                          onClick={() => {
                            requestSort(heads.accessor);
                          }}
                          key={heads.accessor}
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
                        className={`w-full bg-white cursor-pointer capitalize   `}
                        key={indexKey}
                      >
                        {tableHeads?.map(({ accessor }, i) => {
                          const dataToShow = rowData[accessor] || '--';
                          return (
                            <Td
                              py="1.5"
                              fontSize="sm"
                              key={i}
                              className={`first:capitalize ${
                                !clickRow && 'cursor-default'
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
            {useTableFilter && (
              <div className="absolute top-0 left-0 cursor-pointer">
                <RxHamburgerMenu onClick={handleFilterOpen} />
                {openFilterModal === true && (
                  <div className="mt-[0px] shadow-lg w-[200px]  bg-white ">
                    {removeHeads?.map((heads, i) => {
                      return (
                        <div
                          onClick={(e: MouseEvent<HTMLDivElement>) => {
                            if (optAddItem) {
                              optAddItem(e);
                            }
                          }}
                          key={i}
                          className={`text-left px-[10px] py-[13px] font-[500]capitalize text-sm text-[#64748B] border-b-[${borderValue}]`}
                        >
                          {heads.label}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            )}
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
                currentPage={valuer?.current_page as number}
                onChangeOfPage={handlePageChange}
                lengthOfData={dataLength}
              />
            </div>
          )}
    </>
  );
};
export default CustomTable;
