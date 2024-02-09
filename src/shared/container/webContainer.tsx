function WebContainer({ children }: { children: React.ReactNode }) {
  return (
    <div className="max-content">
      <div className="container">{children}</div>
    </div>
  );
}

export default WebContainer;
