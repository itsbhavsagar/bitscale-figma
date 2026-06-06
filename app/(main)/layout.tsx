"use client";

import { useEffect, type ReactNode } from "react";
import { motion, useAnimationControls } from "framer-motion";

import { CommandPalette } from "@/components/command-palette/CommandPalette";
import { Toast } from "@/components/shared/Toast";
import { Sidebar } from "@/components/sidebar";
import { useWorkspace } from "@/hooks/useWorkspace";

interface MainLayoutProps {
  children: ReactNode;
}

function MainLayoutContent({ children }: MainLayoutProps) {
  const { switchSequence, toastMessage, clearToast } = useWorkspace();
  const controls = useAnimationControls();

  useEffect(() => {
    if (switchSequence === 0) return;
    void controls.start({
      opacity: [1, 0.75, 1],
      scale: [1, 0.985, 1],
      filter: ["blur(0px)", "blur(2px)", "blur(0px)"],
      transition: {
        duration: 0.62,
        times: [0, 0.5, 1],
        ease: "easeInOut",
      },
    });
  }, [controls, switchSequence]);

  return (
    <div className="flex h-screen overflow-hidden bg-(--page-bg)">
      <Sidebar />
      <motion.div
        className="workspace-content-frame"
        initial={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
        animate={controls}
        style={{ transformOrigin: "top center" }}
      >
        {children}
      </motion.div>
      <CommandPalette />
      <Toast message={toastMessage} onDismiss={clearToast} />
    </div>
  );
}

export default function MainLayout({ children }: MainLayoutProps) {
  return <MainLayoutContent>{children}</MainLayoutContent>;
}
