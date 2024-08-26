import React, { useMemo } from "react";
import Button from "../../components/Button";
import Input from "../../components/Input";
import { validateEmail } from "../../utils/regex";
import { User } from "../../utils/interface";

interface ModalDataProps {
  isRow?: User;
  isEdit: boolean;
  handleModal: (data: boolean) => void;
  handleChangeRow: (value: { [key: string]: string }) => void;
  handleCrudUser: () => void;
}

export default function ModalData({
  isRow,
  isEdit,
  handleModal,
  handleChangeRow,
  handleCrudUser,
}: ModalDataProps) {
  const isDisabled = useMemo(() => {
    return (
      !isRow ||
      !isRow.username ||
      !isRow.name ||
      !isRow.email ||
      !isRow.phone ||
      validateEmail(isRow.email) === false
    );
  }, [isRow]);

  return (
    <div>
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="bg-gray-900 bg-opacity-50 absolute inset-0"></div>
        <div className="bg-white w-full max-w-md mx-auto p-6 rounded-lg relative -mt-15">
          <h2 className="text-xl font-bold mb-4">
            {isEdit ? "Edit User" : "Create User"}
          </h2>

          {isEdit && (
            <img src={isRow?.image} alt={"dummy-1"} width={150} height={100} />
          )}
          <br />
          <Input
            type="text"
            label={"First Name"}
            value={isRow?.name || ""}
            keyJson="name"
            onChange={(param) => handleChangeRow(param)}
          />
          <Input
            type="text"
            label={"Username"}
            value={isRow?.username || ""}
            keyJson="username"
            onChange={(param) => handleChangeRow(param)}
          />
          <Input
            type="email"
            label={"Email"}
            value={isRow?.email || ""}
            keyJson="email"
            onChange={(param) => handleChangeRow(param)}
          />
          <Input
            type="text"
            label={"phone"}
            value={isRow?.phone || ""}
            keyJson="phone"
            onChange={(param) => handleChangeRow(param)}
          />
          <div className="float-right">
            <Button
              className={
                "bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg sm:w-auto mb-2"
              }
              label={"Cancel"}
              disabled={false}
              onClick={() => handleModal(false)}
            />
            <Button
              className={`${
                isDisabled
                  ? "bg-gray-500 hover:bg-gray-700"
                  : "bg-blue-500 hover:bg-blue-700"
              } text-white font-bold py-2 px-4 rounded-lg sm:w-auto mb-2 ml-1`}
              label={"Submit"}
              disabled={isDisabled}
              onClick={handleCrudUser}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
