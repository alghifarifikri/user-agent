import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { User } from "../utils/interface";
import Button from "./Button";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(() => ({
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

function createData(
  name: string,
  calories: number,
  fat: number,
  carbs: number,
  protein: number
) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];

interface TableProps {
  dataSource: User[];
  column: Array<string>;
  mapping: Array<string>;
  handleEdit: (data: User) => void;
  handleModalDelete: (data: User) => void;
}

type UserKey = keyof User;

export default function TableMUI({
  dataSource,
  column,
  mapping,
  handleEdit,
  handleModalDelete,
}: TableProps) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            {column.map((item) => (
              <StyledTableCell>{item}</StyledTableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {dataSource.map((row, index) => (
            <StyledTableRow
              className="hover:bg-red-100 cursor-pointer"
              key={row.name}
            >
              {mapping.map((map, i) => {
                const key = map as UserKey;

                return (
                  <StyledTableCell component="th" scope="row">
                    {map === "No." ? (
                      index + 1
                    ) : map === "image" ? (
                      <img
                        src={row.image}
                        alt={`dummy-${i}`}
                        width={100}
                        height={100}
                      />
                    ) : map === "action" ? (
                      <div>
                        <Button
                          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg sm:w-auto mr-2"
                          label="Edit"
                          disabled={false}
                          onClick={() => handleEdit(row)}
                        />
                        |
                        <Button
                          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg sm:w-auto ml-2"
                          label="Delete"
                          disabled={false}
                          onClick={() => handleModalDelete(row)}
                        />
                      </div>
                    ) : (
                      <div>{row[key]}</div>
                    )}
                  </StyledTableCell>
                );
              })}
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
