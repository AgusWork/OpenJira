import type { NextApiRequest, NextApiResponse } from "next";
import mongoose from "mongoose";
import { db } from "../../../database";
import { Entry, IEntry } from "../../../models";

type Data = { message: string } | IEntry;

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { id } = req.query;

  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({ message: "El id no es valido" + id });
  }

  switch (req.method) {
    case "PUT":
      return updateEntry(req, res);
      case "GET":
      return getEntry(req, res);
      case 'DELETE':                    
      return deleteEntry( req, res );
    default:
      return res.status(400).json({ message: "Metodo no existe" });
  }
}

const updateEntry = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { id } = req.query;

  await db.connect();

  const entryToUpdate = await Entry.findById(id);

  if (!entryToUpdate) {
    await db.disconnect();
    return res.status(400).json({ message: "No hay entrada con ese id" + id });
  }

  const {
    description = entryToUpdate.description,
    status = entryToUpdate.status,
  } = req.body;

try {
    const updatedEntry = await Entry.findByIdAndUpdate(
        id,
        { description, status },
        { runValidators: true, new: true }
      );
      await db.disconnect();
      res.status(200).json(updatedEntry!);

} catch (error:any) {
    await db.disconnect();
    res.status(400).json({message: error.errors.status.message})
    
}
  //   Primero se manda el id a cambiar los datos, despues los datos que quiero cambiar, y al final es un validador
  // Que permite que las validaciones del status sean una de las 3 opciones y con new permito el cambio de una a otra

};

const getEntry = async(req: NextApiRequest,res: NextApiResponse) => {
  const { id } = req.query;

  await db.connect();

  const entryById = await Entry.findById(id);
    await db.disconnect();
  

  if (!entryById) {
    return res.status(400).json({ message: "No hay entrada con ese id" + id });
  } 

  return  res.status(200).json(entryById);
}

const deleteEntry = async ( req: NextApiRequest, res: NextApiResponse<Data> ) => {

  const { id } = req.query;   

  await db.connect();
  const entryDBTodelete = await Entry.findByIdAndDelete( id );
  await db.disconnect();

  if ( !entryDBTodelete ) {
      return res.status(400).json({message: 'No hay entrada con ese id ' + id });
  }
  
  return res.status(200).json( entryDBTodelete );

} 