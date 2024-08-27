import React, { Suspense, lazy } from "react";
import { header, mapUser } from "../../utils/data";
import Button from "../../components/Button";
import Pagination from "../../components/Pagination";
import Empty from "../../components/Empty";
import { User } from "../../utils/interface";
import TableMUI from "../../components/TableMUI";

const ModalData = lazy(() => import("./ModalData"));
const ModalDelete = lazy(() => import("./ModalDelete"));
const Alert = lazy(() => import("../../components/Alert"));

interface ListUserInterface {
  dataSource: any[];
  isOpen: boolean;
  isDelete: boolean;
  isRow?: User;
  isEdit: boolean;
  isAlert: boolean;
  isMessage: string;
  isType: string;
  paging: {
    currentPage: number;
    totalPages: number;
  };
  handleModal: (data: boolean) => void;
  handleModalDelete: (param: User) => void;
  handleEdit: (data: User) => void;
  handleChangeRow: (data: object) => void;
  handleCrudUser: () => void;
  handlePageChange: (data: number) => void;
}

export default function ListUser({
  dataSource,
  isOpen,
  isDelete,
  isRow,
  isEdit,
  isAlert,
  isMessage,
  isType,
  paging,
  handleModal,
  handleModalDelete,
  handleEdit,
  handleChangeRow,
  handleCrudUser,
  handlePageChange,
}: ListUserInterface) {
  return (
    <div>
      <p className="App text-base sm:text-2xl mt-5">
        User Management Role Access
      </p>
      <br />
      {isAlert && (
        <Suspense>
          <Alert message={isMessage} type={isType} />
        </Suspense>
      )}
      <br />
      <div className="flex flex-wrap items-center justify-between mb-4">
        <div>
          <Button
            className={
              "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg sm:w-auto"
            }
            disabled={false}
            label={"Create"}
            onClick={() => handleModal(true)}
          />
        </div>
      </div>
      {dataSource?.length === 0 ? (
        <Empty />
      ) : (
        <TableMUI
          dataSource={dataSource}
          column={header}
          mapping={mapUser}
          handleEdit={(param) => handleEdit(param)}
          handleModalDelete={(param) => handleModalDelete(param)}
        />
      )}
      <Pagination
        currentPage={paging.currentPage}
        totalPages={paging.totalPages}
        onPageChange={(param: number) => handlePageChange(param)}
      />
      {isOpen && (
        <Suspense>
          <ModalData
            isRow={isRow}
            isEdit={isEdit}
            handleModal={(param: boolean) => handleModal(param)}
            handleChangeRow={(param: object) => handleChangeRow(param)}
            handleCrudUser={handleCrudUser}
          />
        </Suspense>
      )}
      {isDelete && (
        <Suspense>
          <ModalDelete
            handleModalDelete={(param: any) => handleModalDelete(param)}
            handleCrudUser={handleCrudUser}
          />
        </Suspense>
      )}
    </div>
  );
}
