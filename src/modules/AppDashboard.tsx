import SideNav from 'components/appNav/sideBar';
import { Outlet } from 'react-router-dom';
const DashboardLayout = () => {
  return (
    <section className="grid grid-cols-[260px_1fr] h-screen overflow-auto mdxl:block">
      <aside className="sticky top-0 h-screen mdxl:hidden">
        <SideNav />
      </aside>
      <main className="mdxl:w-full w-full">
        <div className="bg-background-borderlight h-full">
          <Outlet />
        </div>
      </main>
    </section>
  );
};

export default DashboardLayout;
