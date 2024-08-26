import React from "react";
import Button from "./Button";
import { User } from "../utils/interface";

// Define props interface
interface TableProps {
  dataSource: User[];
  column: Array<string>;
  mapping: Array<string>;
  handleEdit: (data: User) => void;
  handleModalDelete: (data: User) => void;
}

type UserKey = keyof User;

export default function Table({
  dataSource,
  column,
  mapping,
  handleEdit,
  handleModalDelete,
}: TableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead>
          {column.map((item, index) => (
            <th
              key={index + 3}
              className="py-3 px-6 bg-gray-100 font-bold text-sm sm:text-base"
            >
              <div className="flex items-center">{item}</div>
            </th>
          ))}
        </thead>
        <tbody>
          {dataSource.map((data, index) => (
            <tr
              className={
                index % 2 === 0
                  ? "bg-blue-100 hover:bg-red-100 transition-colors"
                  : "bg-white hover:bg-red-100 transition-colors"
              }
              key={index + 2}
            >
              {mapping.map((map, i) => {
                const key = map as UserKey; // Cast map to a valid key of User

                return (
                  <td
                    key={i}
                    className="py-4 px-6 border-b border-gray-200 text-sm sm:text-base"
                  >
                    {map === "action" ? (
                      <>
                        <Button
                          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg sm:w-auto mr-2"
                          label="Edit"
                          disabled={false}
                          onClick={() => handleEdit(data)}
                        />
                        |
                        <Button
                          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg sm:w-auto ml-2"
                          label="Delete"
                          disabled={false}
                          onClick={() => handleModalDelete(data)}
                        />
                      </>
                    ) : map === "No." ? (
                      index + 1
                    ) : map === "image" ? (
                      <img
                        src={data.image}
                        alt={`dummy-${i}`}
                        width={100}
                        height={100}
                      />
                    ) : (
                      data[key] // Use the key to access the property
                    )}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
