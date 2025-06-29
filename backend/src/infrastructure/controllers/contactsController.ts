import express, {
  type Request,
  type Response,
  type Router,
  type NextFunction,
} from "express";

import { type IContactsRepository } from "../../types";
import {
  contactIdValidator,
  contactValidator,
} from "../middleware/contactValidator";

export const sendResponse = <T>(res: Response, status: number, data?: T) => {
  if (!data) {
    res.status(status).send();
    return;
  }

  res.status(status).json(data);
};

export function createContactsRouter(
  contactsRepository: IContactsRepository
): Router {
  const router = express.Router();

  const getAllContacts = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const result = await contactsRepository.getAllContacts();
      sendResponse(res, 200, result);
    } catch (error) {
      next(error);
    }
  };

  const getContactById = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const result = await contactsRepository.getContact(+req.params.id);
      sendResponse(res, 200, result);
    } catch (error) {
      next(error);
    }
  };

  const createContact = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const contact = await contactsRepository.createContact(req.body);
      if (contact) {
        res.setHeader("Location", `/api/contacts/${contact.id}`);
      }
      sendResponse(res, 201, contact);
    } catch (error) {
      next(error);
    }
  };

  const updateContact = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const updatedContact = await contactsRepository.updateContact(
        +req.params.id,
        req.body
      );
      sendResponse(res, 200, updatedContact);
    } catch (error) {
      next(error);
    }
  };

  const deleteContact = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      await contactsRepository.deleteContact(+req.params.id);
      sendResponse(res, 204);
    } catch (error) {
      next(error);
    }
  };

  router.get("/", getAllContacts);
  router.get("/:id", contactIdValidator, getContactById);
  router.post("/", contactValidator, createContact);
  router.put("/:id", contactIdValidator, contactValidator, updateContact);
  router.delete("/:id", contactIdValidator, deleteContact);

  return router;
}
