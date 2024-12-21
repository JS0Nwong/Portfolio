import * as React from "react";
import { Outlet, createRootRoute, useLocation } from "@tanstack/react-router";
import Menubar from "../components/Menubar";
import AppSidebar from "../components/AppSidebar";
import Container from "../components/static/Container";
import { SidebarProvider } from "../context/SidebarContext";
import Error from "../components/static/Error";

export const Route = createRootRoute({
  component: RootComponent,
  errorComponent: () => <div>Error</div>,
  loader: () => <div>Loading...</div>,
});

function RootComponent() {
  const routesWithoutRootStyling = ["/tools/gradient-generator"];
  const location = useLocation();
  const shouldApplyRootStyling = !routesWithoutRootStyling.includes(
    location.pathname
  );

  return (
    <React.Fragment>
      <SidebarProvider>
        {shouldApplyRootStyling ? (
          <Container>
            <Menubar />
            <AppSidebar />
            <Outlet />
          </Container>
        ) : (
          <Outlet />
        )}
      </SidebarProvider>
    </React.Fragment>
  );
}
