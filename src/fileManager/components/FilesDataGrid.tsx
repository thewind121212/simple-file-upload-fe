import {
  DataGrid,
  GridColDef,
  GridRowSelectionModel,
  GridSortModel,
} from "@mui/x-data-grid";
import { FileDataGridRow } from "../types/fileDataGridRow";
import DeleteForeverRoundedIcon from "@mui/icons-material/DeleteForeverRounded";
import { Stack, Typography } from "@mui/material";
import { FileThumbnail } from "./FileThumbnail";
import { convertByteToMegabyte } from "@/shared/utils";
import { useMemo, useRef, useState } from "react";
import { useFileQuery } from "../hooks/useFileQuery";
import { FileQuickActions } from "./FileQuickActions";
import { useConfirm } from "@/shared/confirm/hooks/useConfirm";
import { useFileDeleteMutation } from "../hooks/useFileDeleteMutation";
import { useFileManagerStore } from "../hooks/useFileManagerStore";
import { BulkActions } from "@/shared/ui/BulkActions";

const columns: GridColDef<FileDataGridRow>[] = [
  {
    field: "filename",
    headerName: "File Name",
    flex: 1,
    renderCell: ({ row }) => (
      <Stack
        sx={{
          flexDirection: "row",
          alignItems: "center",
          gap: 1,
          height: 1,
        }}
      >
        <FileThumbnail name={row.filename} />
        <Typography sx={{ fontWeight: 500 }} variant="body2">
          {row.filename}
        </Typography>
      </Stack>
    ),
  },
  {
    field: "size",
    headerName: "Size",
    flex: 1,
    valueFormatter: (value) => convertByteToMegabyte(value),
  },
  {
    field: "dateUploaded",
    headerName: "Date Uploaded",
    flex: 1,
    valueFormatter: (value) => new Date(value).toDateString(),
  },
  {
    field: "action",
    headerName: "Actions",
    sortable: false,
    pinnable: false,
    type: "actions",
    renderCell: ({ row }) => <FileQuickActions {...row} />,
  },
];

export default function FilesDataGrid() {
  const [sortModel, setSortModel] = useState<GridSortModel>([
    {
      field: "dateUploaded",
      sort: "desc",
    },
  ]);

  const confirm = useConfirm();

  const fileDeleteMutation = useFileDeleteMutation();

  const selectedFileIds = useFileManagerStore((state) => state.selectedFileIds);

  const updateSelectedFileIds = useFileManagerStore(
    (state) => state.updateSelectedFileIds
  );

  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });

  const filesQuery = useFileQuery({ paginationModel, sortModel });
  const rowCountRef = useRef(filesQuery.data?.totalFilesCount || 0);

  const rowCount = useMemo(() => {
    if (filesQuery.data?.totalFilesCount !== undefined) {
      rowCountRef.current = filesQuery.data.totalFilesCount;
    }
    return rowCountRef.current;
  }, [filesQuery.data?.totalFilesCount]);

  function handleRemoveFiles() {
    confirm({
      handleConfirm: () => {
        fileDeleteMutation.mutate(selectedFileIds, {
          onSuccess: () => {
            updateSelectedFileIds([]);
          },
        });
      },
    });
  }

  function handleRowSelectionModelChange(ids: GridRowSelectionModel) {
    updateSelectedFileIds(ids.map((id) => id.toString()));
  }

  return (
    <>
      <DataGrid
        sx={(theme) => ({ height: `calc(100dvh - ${theme.spacing(52)})` })}
        rows={filesQuery.data?.files || []}
        columns={columns}
        rowCount={rowCount}
        loading={filesQuery.isLoading}
        pageSizeOptions={[10, 25, 50, 100]}
        density="comfortable"
        paginationModel={paginationModel}
        paginationMode="server"
        onPaginationModelChange={setPaginationModel}
        onRowSelectionModelChange={handleRowSelectionModelChange}
        onSortModelChange={setSortModel}
      />
      <BulkActions
        actions={[
          {
            icon: <DeleteForeverRoundedIcon />,
            actionFn: handleRemoveFiles,
            label: "Delete files",
          },
        ]}
        ids={selectedFileIds}
      />
    </>
  );
}
