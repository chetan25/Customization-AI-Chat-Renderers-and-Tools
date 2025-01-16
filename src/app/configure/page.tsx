"use client";

import { ContextProvider } from "@/app/components/ContextManager";
import CustomBarChartData from "../components/CustomBarChartData";

export default function ChatPage() {
  return (
    <ContextProvider initialContext={[]}>
      <CustomBarChartData />
    </ContextProvider>
  );
}
