import { List, Paper } from "@mui/material";
import React, { FC, useContext, useMemo, DragEvent } from "react";
import { EntriesContext } from "../../context/entries";
import { UIContext } from "../../context/ui";
import { EntryStatus } from "../../interfaces";
import { EntryCard } from "./";
import styles from "./EntryList.module.css";
interface Props {
  status: EntryStatus;
}

export const EntryList: FC<Props> = ({ status }) => {
  const { entries, updateEntry } = useContext(EntriesContext);
  const { isDragging, endDragging } = useContext(UIContext);

  const entriesByStatus = useMemo(
    () => entries.filter((entries) => entries.status === status),
    [entries]
  );
  // Se usa useMemo ya que va a memorizar el contenido de los status a no ser que el entries cambie

  const allowDrop = (event: DragEvent) => {
    event.preventDefault();
  };

  const onDropEntry = (event: DragEvent) => {
    const id = event.dataTransfer.getData("text");

    const entry = entries.find((e) => e._id === id)!;
    entry.status = status;
    updateEntry(entry);
    endDragging();
  };

  return (
    // TODO: aqui haremos el drop
    <div
      onDrop={onDropEntry}
      onDragOver={allowDrop}
      className={isDragging ? styles.dragging : ""}
    >
      <Paper
        sx={{
          height: "calc(100vh - 250px)",
          backgroundColor: "transparent",
          overflowY: "scroll",
          "&::-webkit-scrollbar": {
            width: "3px",
            bgcolor: "#454545",
          },
          "&::-webkit-scrollbar-thumb": {
            background: "#4a148c",
            border: "7px none #fffff",
            borderRadius: "10px",
          },
          padding: "1px 5px",
        }}
      >
        {/* Cambiara si estoy haciendo un drag o no */}
        <List sx={{ opacity: isDragging ? 0.2 : 1, transition: "all .3s" }}>
          {entriesByStatus.map((entries) => (
            <EntryCard key={entries._id} entry={entries} />
          ))}
        </List>
      </Paper>
    </div>
  );
};
