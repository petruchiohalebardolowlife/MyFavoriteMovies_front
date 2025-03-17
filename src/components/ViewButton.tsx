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
        isSelected={viewMode == GRID_VIEW}
        customClassName="bg-yellow-500"
      >
        <Grid size={ICON_SIZE} />
      </Button>
      <Button
        onClick={() => setViewMode(LIST_VIEW)}
        isSelected={viewMode == LIST_VIEW}
        customClassName="bg-yellow-500"
      >
        <List size={ICON_SIZE} />
      </Button>
    </>
  );
}

export default ViewButton;
