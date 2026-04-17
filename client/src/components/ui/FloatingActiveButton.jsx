import Fab from "@mui/material/Fab";

export default function FloatingActionButton({
  children,
  color = "primary",
  ...props
}) {
  return (
    <Fab color={color} {...props}>
      {children}
    </Fab>
  );
}
