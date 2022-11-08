import { AddCircleOutlineOutlined, SaveOutlined } from "@mui/icons-material";
import { Button, TextField } from "@mui/material";
import { Box } from "@mui/system";
import React, { ChangeEvent, useContext, useState } from "react";
import { EntriesContext } from "../../context/entries";
import { UIContext } from "../../context/ui";

export const NewEntry = () => {
  const { addNewEntry} = useContext(EntriesContext);
  const { isAddingEntry, setIsAddingEntry } = useContext(UIContext);

  const [inputValue, setInputValue] = useState("");
  const [touched, setTouched] = useState(false);


  const onTextFieldChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  }

  const onSave = () => { 
      if (inputValue.length === 0 ) return ;

      addNewEntry(inputValue)

      setIsAddingEntry(false)
      setTouched(false)
      setInputValue("")
  }


  return (
    <Box sx={{ marginBottom: 2, paddingX: 2 }}>
      {isAddingEntry ? (
        <>
          <TextField
            fullWidth
            sx={{
              marginBottom: 1,
              marginTop: 2,
            }}
            placeholder="Nueva Entrada"
            autoFocus
            multiline
            label="Nueva entrada"
            helperText={inputValue.length <= 0 && touched && "Ingrese un valor"}
            error={inputValue.length <= 0 && touched}
            value={inputValue}
            onChange={onTextFieldChange}
            onBlur={() => setTouched(true)}
            // OnBlur es cuando se esta en foco, da true, cuando se sale del foco da false
          />
          <Box display="flex" justifyContent="space-between">
            <Button
              variant="outlined"
              color="error"
              endIcon={<SaveOutlined />}
              onClick={() => setIsAddingEntry(false)}
            >
              Cancelar
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              endIcon={<SaveOutlined />}
              onClick={onSave}
            >
              Guardar
            </Button>
          </Box>{" "}
        </>
      ) : (
        <Button
          startIcon={<AddCircleOutlineOutlined />}
          fullWidth
          variant="outlined"
          onClick={() => setIsAddingEntry(true)}
        >
          Agregar Tarea
        </Button>
      )}
    </Box>
  );
};
