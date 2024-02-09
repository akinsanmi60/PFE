// import SideNav from 'components/appNav/adminNav';
import { Outlet } from 'react-router-dom';
const AdminLayout = () => {
  return (
    <section className="grid grid-cols-[260px_1fr] h-screen overflow-auto mdxl:block">
      <aside className="sticky top-0 h-screen mdxl:hidden">
        {/* <SideNav /> */}
      </aside>
      <main className="bg-white mdxl:w-full">
        <Outlet />
      </main>
    </section>
  );
};

export default AdminLayout;
