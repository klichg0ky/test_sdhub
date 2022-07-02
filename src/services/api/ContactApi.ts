import { Contact } from "models/contact";
import { clientApi } from "./clientApi";

export const ContactApi = {
  getContactList() {
    return clientApi.get<Contact[]>("/v1/contact/");
  },
  addContact(data: Exclude<Contact, "id">) {
    return clientApi.post("/v1/contact/", data);
  },
  deleteContact(id: number | string) {
    return clientApi.delete(`/v1/contact/${id}/`);
  },
  updateContact(id: number | string, data: Contact) {
    return clientApi.put(`/v1/contact/${id}/`, data);
  },
  getContactById(id: number | string) {
    return clientApi.get<Contact>(`/v1/contact/${id}/`);
  },
};
