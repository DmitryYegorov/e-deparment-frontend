import React from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  CircularProgress,
  Container,
  Stack,
  Typography,
  Box,
  Grid,
} from "@mui/material";
import { useParams } from "react-router-dom";
import { useAsyncFn } from "react-use";
import { fetchActiveTeachers } from "../../../http/load-plan";
import { getAcademicYear } from "../../../http/semester";
import moment from "moment";
import { useTranslation } from "react-i18next";
import i18n from "../../../i18n";

type TeacherLoadItemProps = {
  firstName: string;
  lastName: string;
  middleName: string;
  teacherId: string;
};

const TeacherLoadItem: React.FC<TeacherLoadItemProps> = ({
  firstName,
  middleName,
  lastName,
  teacherId,
}) => {
  const { t } = useTranslation(["common", "plan"], { i18n });

  return (
    <Accordion>
      <AccordionSummary>
        <Typography>{`${firstName} ${middleName[0]}. ${lastName[0]}`}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography>{teacherId}</Typography>
      </AccordionDetails>
    </Accordion>
  );
};

const PlanLoad: React.FC = () => {
  const { id } = useParams();
  const { t } = useTranslation(["common", "plan"], { i18n });

  const [teachers, fetchTeachers] = useAsyncFn(async () => {
    const res = await fetchActiveTeachers();

    return res.data;
  });

  const [academicYear, fetchAcademicYear] = useAsyncFn(async (academicId) => {
    const res = await getAcademicYear(academicId);

    return res.data;
  });

  React.useEffect(() => {
    fetchTeachers();
  }, [fetchTeachers]);
  React.useEffect(() => {
    if (id) {
      fetchAcademicYear(id);
    }
  }, [fetchAcademicYear]);

  if (academicYear.loading)
    return (
      <Box
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
        }}
      >
        <CircularProgress />
      </Box>
    );

  if (academicYear.value)
    return (
      <Container>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h5">{`${t("common:academicYear")} (${moment(
              academicYear.value.startDate
            ).format("DD-MM-yyyy")} - ${moment(
              academicYear.value.endDate
            ).format("DD-MM-yyyy")})`}</Typography>
          </Grid>
          <Grid item xs={12}>
            {teachers.loading ? (
              <CircularProgress />
            ) : (
              <Stack>
                {!!teachers.value?.length &&
                  teachers.value.map((teacher) => (
                    <TeacherLoadItem
                      firstName={teacher.firstName}
                      lastName={teacher.lastName}
                      middleName={teacher.middleName}
                      teacherId={teacher.id}
                    />
                  ))}
              </Stack>
            )}
          </Grid>
        </Grid>
      </Container>
    );
};

export default PlanLoad;
