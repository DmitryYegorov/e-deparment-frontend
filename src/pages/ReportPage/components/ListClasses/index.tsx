import React, { useState } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Alert,
  Button,
  Collapse,
  IconButton,
  Paper,
  Stack,
  TableCell,
  Typography,
} from "@mui/material";
import {
  Delete as DeleteIcon,
  ExpandMore as ExpandMoreIcon,
} from "@mui/icons-material";
import TableList from "../../../../components/TableList";
import { ClassType } from "../../../../typings/enum";
import { useTranslation } from "react-i18next";
import i18n from "../../../../i18n";
import { useStyles } from "./styled";
import { useAppSelector, useAppDispatch } from "../../../../hooks/redux";
import moment from "moment";
import DropDownMenu from "../../../../components/DropDownMenu";

type Props = {
  loadData: Array<any>;
  reportId: string;
};

const ListClasses: React.FC<Props> = ({ loadData, reportId }) => {
  const { t } = useTranslation(["report"], { i18n });

  const classes = useStyles();

  const [order, setOrder] = useState("title");
  const { isLoading } = useAppSelector((state) => state.report);

  const dispatch = useAppDispatch();

  const loadClassesColumns = [
    {
      id: "subjectName",
      label: t("report:nameLabel"),
      width: 300,
      sortable: true,
    },
    {
      id: "date",
      label: t("report:classDate"),
      renderCell: (row) => (
        <TableCell>
          {!row.isOtherLoad
            ? moment(row.date).format("DD-MM-yyyy")
            : moment(row.date).format("MMMM-yyyy").toUpperCase()}
        </TableCell>
      ),
      width: 150,
      sortable: true,
    },
    {
      id: "type",
      label: t("report:classType"),
      width: 250,
      renderCell: (row) => {
        const key = `event:${row.type as ClassType}`;
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        return <TableCell>{t(key, "-")}</TableCell>;
      },
      sortable: false,
    },
  ];

  const renderActions = (row) => {
    return (
      <DropDownMenu
        options={[
          {
            key: `delete-${row.id}`,
            icon: () => <DeleteIcon color={"error"} />,
            handleClick: () => alert(`delete-${row.id}`),
            text: t("report:actions.deleteItemAction"),
          },
        ]}
      />
    );
  };

  return (
    <Accordion defaultExpanded>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography>{t("report:classes")}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <TableList
          columns={loadClassesColumns}
          rows={loadData}
          count={loadData.length}
          isLoading={isLoading}
          renderActions={renderActions}
        />
      </AccordionDetails>
    </Accordion>
  );
};

export default ListClasses;
