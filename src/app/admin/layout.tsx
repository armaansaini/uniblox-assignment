import AdminNavbar from "./components/AdminNavbar";

export default function AdminPagesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <AdminNavbar />
      {children}
    </div>
  );
}
