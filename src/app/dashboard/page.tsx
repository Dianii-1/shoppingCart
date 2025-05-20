import { WidgetItem } from "@/components/WidgetItem";


export const metadata = {
 title: 'Dashboard',
 description: 'SEO Title',
};
export default function DashboardPage() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {/* TODO: src/components <WidgetItem /> */}
      <WidgetItem
        title="Global Activities"
      >
        <div>algo</div>
      </WidgetItem>
      {/* TODO: Fin <WidgetItem /> */}
    </div>
  );
}
