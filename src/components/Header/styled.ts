import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      margin: 0,
      padding: 0,
    },
    toolbar: {
      padding: theme.spacing(0),
      [theme.breakpoints.down("xs")]: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      },
    },
  })
);
