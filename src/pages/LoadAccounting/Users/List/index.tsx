import React, { useEffect } from "react";
import {
  Container,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../../../hooks/redux";
import { fetchUsersAction } from "../../../../store/reducers/Users/ActionCreators";
import {
  CheckCircle as CheckCircleIcon,
  ManageAccounts as ManageAccountsIcon,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const UsersList: React.FC = () => {
  const userStore = useAppSelector((state) => state.user);

  const navigate = useNavigate();

  return (
    <Container>
      <Paper>
        <Table>
          <TableHead>
            <TableCell>
              <Typography variant="body1">Имя</Typography>
            </TableCell>
            <TableCell>
              <Typography variant="body1">E-Mail</Typography>
            </TableCell>
            <TableCell>
              <Typography variant="body1">Активен</Typography>
            </TableCell>
            <TableCell>
              <Typography variant="body1">Действия</Typography>
            </TableCell>
          </TableHead>
          <TableBody>
            {userStore.list.map((u) => (
              <TableRow>
                <TableCell>
                  <Typography variant="body2">{`${u.firstName} ${u.middleName} ${u.lastName}`}</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2">{u.email}</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2">
                    <CheckCircleIcon color={u.isActive ? "success" : "error"} />
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2">
                    <IconButton
                      color="primary"
                      onClick={() => navigate(`${u.id}`)}
                    >
                      <ManageAccountsIcon />
                    </IconButton>
                  </Typography>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Container>
  );
};

export default UsersList;
