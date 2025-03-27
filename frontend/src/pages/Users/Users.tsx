import AddIcon from "@mui/icons-material/Add";
import CardBox from "@components/CardBox";
import ChangePasswordModal, {
  ChangePasswordFormValues,
} from "./New/ChangePasswordModal";
import ConfirmationDialog from "@components/ConfirmationDialog";
import IconAction from "@components/IconAction";
import RoundedIconButton from "@components/RoundedIconButton";
import UserFormModal, { UserFormValues } from "./New/UserFormModal";
import { Box } from "@mui/material";
import { Delete, Edit, LockReset } from "@mui/icons-material";
import { FormMode } from "@enums/FormMode";
import { FunctionComponent, useState } from "react";
import { MTable } from "@components/MTable";
import { tableData, UserColumns } from "./Columns";

const UsersPage: FunctionComponent = () => {
  // State
  const [modalOpen, setModalOpen] = useState(false);
  const [editMode, setEditMode] = useState<FormMode>(FormMode.CREATE);
  const [selectedUser, setSelectedUser] = useState<UserFormValues | null>(null);
  const [changePasswordOpen, setChangePasswordOpen] = useState(false);
  // Delete
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  //Functions
  const handleEdit = (user: Omit<UserFormValues, "password">) => {
    setSelectedUser({ ...user, password: "" });
    setEditMode(FormMode.EDIT);
    setModalOpen(true);
  };

  const handleAdd = () => {
    setSelectedUser(null);
    setEditMode(FormMode.CREATE);
    setModalOpen(true);
  };

  const handleDelete = (user: UserFormValues) => {
    setSelectedUser({ ...user, password: "" });
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (selectedUser) {
      console.log("Deleting user:", selectedUser.username);
      // TODO: Delete from DB or state
      setDeleteDialogOpen(false);
      setSelectedUser(null);
    }
  };

  const handleSubmit = (data: UserFormValues) => {
    if (editMode === FormMode.EDIT) {
      console.log("Update User", data);
      // TODO: call update API
    } else {
      console.log("Create User", data);
      // TODO: call create API
    }
  };

  const handleChanagePassword = (data: ChangePasswordFormValues) => {
    console.log("Change Password", data);
  };

  return (
    <Box p={2}>
      <CardBox label="Benutzer">
        <MTable
          data={tableData}
          searchableField="username"
          columns={UserColumns}
          actions={(row) => (
            <>
              <IconAction tooltip="Bearbeiten" onClick={() => handleEdit(row)}>
                <Edit fontSize="small" />
              </IconAction>
              <IconAction tooltip="Löschen" onClick={() => handleDelete(row)}>
                <Delete fontSize="small" />
              </IconAction>
              <IconAction
                tooltip="Passwort ändern"
                onClick={() => setChangePasswordOpen(true)}
              >
                <LockReset fontSize="small" />
              </IconAction>
            </>
          )}
        />
        {/* Add Button */}
        <RoundedIconButton
          icon={<AddIcon fontSize="small" />}
          label="NEU"
          onClick={handleAdd}
        />

        {/* Modals */}
        <UserFormModal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          onSubmit={handleSubmit}
          initialValues={selectedUser || undefined}
          mode={editMode}
        />

        <ChangePasswordModal
          open={changePasswordOpen}
          onClose={() => setChangePasswordOpen(false)}
          onSubmit={handleChanagePassword}
        />

        {/* Confirmation Dialogs */}
        <ConfirmationDialog
          open={deleteDialogOpen}
          onClose={() => setDeleteDialogOpen(false)}
          onConfirm={confirmDelete}
          title="Benutzer löschen"
          message="Möchten Sie diesen Benutzer wirklich löschen? Diese Aktion kann nicht rückgängig gemacht werden."
        />
      </CardBox>
    </Box>
  );
};

export default UsersPage;
