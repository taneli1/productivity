import { Outlet } from "react-router";
import { Link } from "react-router-dom";

export default function Invoices() {
  return (
    <div style={{ display: "flex" }}>
      <nav
        style={{
          borderRight: "solid 1px",
          padding: "1rem",
        }}
      >
        <Link
          style={{ display: "block", margin: "1rem 0" }}
          to={`/invoices/123`}
          key={"123"}
        >
          link
        </Link>
      </nav>
      <Outlet />
    </div>
  );
}
