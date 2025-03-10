import Button from "@components/Button.tsx";
import { List, Grid } from "lucide-react";

interface ViewButtonProps {
  viewMode: "list" | "grid";
  setViewMode: (viewMode: "list"|"grid") => void;
}

function ViewButton({viewMode, setViewMode}: ViewButtonProps) {
  return (
    <>
      <Button onClick={() => setViewMode("grid")} isActive={viewMode === "grid"}>
        <Grid size={24} />
      </Button>
      <Button onClick={() => setViewMode("list")} isActive={viewMode === "list"}>
        <List size={24} />
      </Button>
    </>
  );
}

export default ViewButton;
