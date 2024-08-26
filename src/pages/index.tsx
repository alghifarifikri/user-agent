/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import ListUser from "./component/index";
import { useDispatch, useSelector } from "react-redux";
import {
  clear,
  deleteUser,
  fetchUsers,
  postUser,
  updateUser,
} from "../redux/slice/userSlice";
import Loading from "../components/Loading";
import { RootState, AppDispatch } from "../redux/store";
import { User } from "../utils/interface";

const itemsPerPage = 5;

export default function Main() {
  const dispatch: AppDispatch = useDispatch();
  const usersData = useSelector((state: RootState) => state.users.users);
  const loadingData = useSelector((state: RootState) => state.users.loading);
  const errorData = useSelector((state: RootState) => state.users.error);
  const successData = useSelector((state: RootState) => state.users.success);
  const [users, setUsers] = useState<Array<User>>(usersData);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isRow, setIsRow] = useState<User>();
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [isDelete, setIsDelete] = useState<boolean>(false);
  const [isAlert, setIsAlert] = useState<boolean>(false);
  const [isMessage, setIsMessage] = useState<string>("");
  const [isType, setIsType] = useState<string>("");
  const [paging, setIsPaging] = useState<{
    currentPage: number;
    totalPages: number;
  }>({
    currentPage: 1,
    totalPages: 1,
  });

  useEffect(() => {
    setIsAlert(errorData || successData ? true : false);
    setIsMessage(errorData ? errorData : "Update Successfully");
    setIsType(errorData ? "error" : "success");
    setTimeout(() => {
      setIsAlert(false);
      setIsMessage("");
      setIsType("");
      dispatch(clear());
    }, 2000);
  }, [dispatch, errorData, successData]);

  useEffect(() => {
    setUsers(getCurrentPageData(usersData));
  }, [usersData]);

  useEffect(() => {
    const total = Math.ceil(usersData.length / itemsPerPage);
    setIsPaging({
      currentPage: paging.currentPage,
      totalPages: total > 0 ? total : 1,
    });
  }, [usersData]);

  useEffect(() => {
    setUsers(getCurrentPageData(usersData));
  }, [paging.currentPage]);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  useEffect(() => {
    if (!loadingData) {
      handleModal(false);
      setIsDelete(false);
      setIsRow(undefined);
    }
  }, [loadingData]);

  const handlePageChange = (page: number) => {
    setIsPaging({
      currentPage: page,
      totalPages: paging.totalPages,
    });
  };

  const handleModal = (param: boolean) => {
    setIsOpen(param);
    if (!param) {
      setIsEdit(false);
      setIsRow(undefined);
    }
  };

  const handleModalDelete = (param: User | undefined) => {
    setIsDelete(!isDelete);
    setIsRow(param);
  };

  const handleEdit = (param: User) => {
    setIsRow(param);
    setIsEdit(!isEdit);
    handleModal(!isOpen);
  };

  const handleChangeRow = (param: Partial<User>) => {
    const temp = { ...isRow, ...param };
    setIsRow(temp);
  };

  const handleCrudUser = () => {
    if (!isRow) return;

    const payload: User = {
      ...isRow,
      id:
        isEdit || isDelete
          ? isRow.id
          : Math.random().toString(36).substring(2, 9),
      image: isEdit
        ? isRow.image
        : "https://w7.pngwing.com/pngs/910/606/png-transparent-head-the-dummy-avatar-man-tie-jacket-user-thumbnail.png",
    };

    dispatch(
      isEdit
        ? updateUser(payload)
        : isDelete
        ? deleteUser(payload)
        : postUser(payload)
    );
  };

  const getCurrentPageData = (param: Array<User>) => {
    // dispatch(started());
    const startIndex = (paging.currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return param.slice(startIndex, endIndex);
  };

  return (
    <>
      {loadingData ? (
        <Loading />
      ) : (
        <ListUser
          dataSource={users}
          isOpen={isOpen}
          isRow={isRow}
          isEdit={isEdit}
          isAlert={isAlert}
          isMessage={isMessage}
          isType={isType}
          isDelete={isDelete}
          paging={paging}
          handleModal={(param) => handleModal(param)}
          handleModalDelete={(param) => handleModalDelete(param)}
          handleEdit={(param) => handleEdit(param)}
          handleChangeRow={(param) => handleChangeRow(param)}
          handleCrudUser={handleCrudUser}
          handlePageChange={(param) => handlePageChange(param)}
        />
      )}
    </>
  );
}
