import * as React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { AppHeader } from "components/AppHeader";
import { ContactCreatePage } from "pages/ContactCreate/ContactCreatePage";
import { ContactListPage } from "pages/ContactListPage";
import { ROUTER_NAMES } from "./routerNames";
import { ContactDetailsPage } from "pages/ContactDetails/ContactDetailsPage";

export const AppRouter: React.FC = () => {
  return (
    <BrowserRouter>
      <AppHeader />

      <Routes>
        <Route path={ROUTER_NAMES.CONTACT_LIST} element={<ContactListPage />} />
        <Route
          path={ROUTER_NAMES.CONTACT_CREATE}
          element={<ContactCreatePage />}
        />
        <Route
          path={ROUTER_NAMES.CONTACT_DETAILS}
          element={<ContactDetailsPage />}
        />

        <Route path="*" element={<Navigate to={ROUTER_NAMES.CONTACT_LIST} />} />
      </Routes>
    </BrowserRouter>
  );
};
