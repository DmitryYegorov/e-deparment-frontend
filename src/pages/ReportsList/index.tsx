import React, { useEffect, useState } from "react";
import {
  Button,
  Grid,
  Paper,
  Stack,
  Container,
  Typography,
  IconButton,
} from "@mui/material";
import {
  Add as AddIcon,
  OpenInNew as OpenInNewIcon,
  Delete as DeleteIcon,
} from "@mui/icons-material";
import { useTranslation } from "react-i18next";
import i18n from "../../i18n";
import { useStyles } from "./styled";
import { Column } from "../../components/TableList/typings";
import TableList from "../../components/TableList";
import ModalWindow from "../../components/ModalWindow";
import CreateReportForm from "../../components/CreateReportForm";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { fetchReportsAction } from "../../store/reducers/Report/ActionCreators";
import { ReportStateConfig } from "../../helpers";
import { ReportState } from "../../typings/enum";
import { useNavigate } from "react-router-dom";
import { deleteReportById } from "../../http/report";

const ReportsList: React.FC = () => {
  const dispatch = useAppDispatch();
  const reportState = useAppSelector((state) => state.report);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchReportsAction());
  }, [dispatch]);

  const { t } = useTranslation(["common", "report"], { i18n });
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const classes = useStyles();

  const columns: Column[] = [
    {
      id: "name",
      label: t("report:nameLabel"),
      sortable: false,
    },
    {
      id: "state",
      label: t("report:stateLabel"),
      sortable: false,
    },
    {
      id: "createdAt",
      label: t("report:createdAt"),
      sortable: false,
    },
  ];

  return (
    <Container>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12}>
          <Paper className={classes.topMenu}>
            <Stack direction="row">
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={() => setOpenCreateModal(true)}
              >
                {t("common:studyLoading.createNew")}
              </Button>
            </Stack>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <TableList
            rows={reportState.list.map((report) => {
              const stateConfig =
                ReportStateConfig[report.state as ReportState];
              return {
                ...report,
                state: (
                  <Stack>
                    <Typography style={{ color: stateConfig.color }}>
                      {t(
                        `report:state.${report.state as ReportState}`,
                        report.state
                      )}
                    </Typography>
                  </Stack>
                ),
              };
            })}
            columns={columns}
            renderActions={(row) => (
              <Stack direction={"row"} spacing={0.5}>
                <IconButton color="primary" onClick={() => navigate(row.id)}>
                  <OpenInNewIcon />
                </IconButton>
                <IconButton
                  color="error"
                  onClick={() => {
                    deleteReportById(row.id);
                    dispatch(fetchReportsAction());
                  }}
                >
                  <DeleteIcon />
                </IconButton>
              </Stack>
            )}
            isLoading={reportState.isLoading}
            notDataMessage={t("report:notReportsData")}
          />
        </Grid>
      </Grid>
      <ModalWindow
        open={openCreateModal}
        setOpen={() => setOpenCreateModal(!openCreateModal)}
        label={"Создать новый отчёт"}
      >
        <CreateReportForm
          invokeFetch={async () => {
            dispatch(fetchReportsAction());
            setOpenCreateModal(!openCreateModal);
          }}
        />
      </ModalWindow>
    </Container>
  );
};

export default ReportsList;
