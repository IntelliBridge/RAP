import { Link } from "react-router-dom";
import "./Nav.scss";
interface NavProps {
  activeNav: string;
}

export default function Nav({ activeNav }: NavProps) {
  const navItems = [
    { label: "My Pets", to: "pets" },
    { label: "Account", to: "account" },
  ];
  return (
    <div className="nav-component">
      {navItems.map(({ label, to }) => {
        const active = label === activeNav ? "active" : "";
        return (
          <div className={`nav-item ${active}`}>
            <Link to={to}>{label}</Link>
          </div>
        );
      })}
    </div>
  );
}
