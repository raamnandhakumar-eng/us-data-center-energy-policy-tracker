import { GridPolicyDashboard } from "@/components/GridPolicyDashboard";
import { marketProfiles, policies } from "@/lib/policies";

export default function Home() {
  return <GridPolicyDashboard policies={policies} markets={marketProfiles} />;
}
