import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    topMenu: {
      padding: theme.spacing(2),
    },
  })
);