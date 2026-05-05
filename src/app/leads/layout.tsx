import { PropsWithChildren } from "react";

export default function LeadsLayout({ children }: PropsWithChildren) {
  return <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>{children}</div>;
}
