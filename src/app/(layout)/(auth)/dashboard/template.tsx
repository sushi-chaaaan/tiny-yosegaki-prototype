import DashboardTab from "@/features/users/dashboard/components/DashBoardTab"

export default function Template({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col md:flex-row gap-8 md:gap-16">
      <aside>
        <DashboardTab />
      </aside>
      <div className="flex-1">{children}</div>
    </div>
  )
}
