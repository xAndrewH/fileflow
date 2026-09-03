"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { ALL_TOOLS } from "@/lib/tool-registry";
import { useToolHistory } from "@/hooks/useToolHistory";

/** Records the current page as a recently-visited tool, on every navigation, site-wide. */
export function RecordToolVisit() {
  const pathname = usePathname();
  const { recordVisit } = useToolHistory();

  useEffect(() => {
    const tool = ALL_TOOLS.find(t => t.href === pathname);
    if (tool) recordVisit(tool.href, tool.title);
  }, [pathname, recordVisit]);

  return null;
}
