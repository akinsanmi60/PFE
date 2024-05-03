type IAgencySettingProps = {
  children?: React.ReactNode;
  titleChildren?: React.ReactNode;
};
function AgencySettingsLayout({
  children,
  titleChildren,
}: IAgencySettingProps) {
  return (
    <div className="w-full h-full flex gap-x-[24px] sixm:flex-col sixm:gap-y-[24px]">
      <div className="w-[30%] h-full sixm:w-full">{titleChildren}</div>
      <div className="w-[70%] h-full sixm:w-full">{children}</div>
    </div>
  );
}

export default AgencySettingsLayout;
