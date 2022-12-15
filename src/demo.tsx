import * as React from "react";
import { TextField } from "@material-ui/core";
import Select, { SelectChangeEvent } from '@mui/material/Select';
import {
  DataGrid,
  GridRenderCellParams,
  GridColDef,
  useGridApiContext,
} from '@mui/x-data-grid';

function SelectEditInputCell(props: GridRenderCellParams) {
  const { id, value, field } = props;
  const apiRef = useGridApiContext();

  const handleChange = async (event: SelectChangeEvent) => {
    await apiRef.current.setEditCellValue({ id, field, value: event.target.value });
    apiRef.current.stopCellEditMode({ id, field });
  };

  return (
    <Select
      value={value}
      label="TEK"
      onChange={handleChange}
      size="small"
      sx={{ height: 1 }}
      native
      autoFocus
    >
      <option>Back-end Developer</option>
      <option>Front-end Developer</option>
      <option>UX Designer</option>
    </Select>
  );
}

const renderSelectEditInputCell: GridColDef['renderCell'] = (params) => {
  return <SelectEditInputCell {...params} />;
};

const rows = [
  {
    id: 1,
    taxRate: 0.1,
    test1: 3,
    test3: 5
  },
  {
    id: 2,
    taxRate: 0.2
  },
  {
    id: 3,
    taxRate: 0.3
  }
];

export default function RenderCell() {
  return (
    <div style={{ height: 300, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={[
          {
            field: "taxRate",
            headerName: "Tax Rate",
            renderCell: (params) => (
              <>
                <TextField error={params.value > .1} variant="outlined" margin="dense" value={params.value} />
              </>
            ),
            renderEditCell: (params) => (
              
                <TextField error variant="outlined" value={params.value} margin="dense" />
              
            ),
            width: 150,
            editable: true
          },
          {
            field: "test3",
            headerName: "Tax Rate",
            renderCell: (params) => (
              <>
                <TextField error={params.value > .1} variant="outlined" margin="dense" value={params.value} />
              </>
            ),
            renderEditCell: (params) => (
              
                <TextField error variant="outlined" value={params.value}  margin="dense" />
              
            ),
            width: 150,
            editable: true
          },
          {
            field: "Test2",
            headerName: "Tax Rate",
            renderCell: (params) => (
              <>
                <TextField error={params.value > .1} variant="outlined" margin="dense" value={params.value} />
              </>
            ),
            renderEditCell: (params) => (
              
                <TextField error variant="outlined" value={params.value} margin="dense" />
              
            ),
            width: 150,
            editable: true
          },
          {
            field: 'role',
            headerName: 'Role',
            //renderCell: renderSelect
            renderEditCell: renderSelectEditInputCell,
            editable: true,
            width: 180,
          },
        ]}
      />
    </div>
  );
}
