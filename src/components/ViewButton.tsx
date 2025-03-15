import Button from "@components/Button.tsx";
import { List, Grid } from "lucide-react";
import { ViewModeType } from "types";
import { GRID_VIEW, ICON_SIZE, LIST_VIEW } from "./constants";

interface ViewButtonProps {
  viewMode: ViewModeType;
  setViewMode: (viewMode: ViewModeType) => void;
}

function ViewButton({ viewMode, setViewMode }: ViewButtonProps) {
  return (
    <>
      <Button
        onClick={() => setViewMode(GRID_VIEW)}
        isPressed={viewMode == GRID_VIEW}
      >
        <Grid size={ICON_SIZE} />
      </Button>
      <Button
        onClick={() => setViewMode(LIST_VIEW)}
        isPressed={viewMode == LIST_VIEW}
      >
        <List size={ICON_SIZE} />
      </Button>
    </>
  );
}

export default ViewButton;
