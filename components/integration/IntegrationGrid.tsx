"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { TriangleAlert } from "lucide-react";

import {
  Button,
  EmptyState,
  Modal,
  Toast,
} from "@/components/shared";
import {
  integrationCategories,
  integrationConnectConfigs,
  integrationData,
} from "@/data/integrations";
import { useDebouncedValue } from "@/hooks/useDebouncedValue";
import type { Integration, IntegrationFilterOption } from "@/types/integration";

import { ConnectIntegrationModal } from "./ConnectIntegrationModal";
import { IntegrationCard } from "./IntegrationCard";
import { IntegrationFilters } from "./IntegrationFilters";
import { IntegrationSkeleton } from "./IntegrationSkeleton";

const storageKey = "bitscale.integrations.state";
const integrationSkeletonSeenKey = "bitscale.integrations.skeleton.seen";

type LoadState = "loading" | "ready" | "error";

const cardContainerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.06,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0 },
};

function isIntegrationArray(value: unknown): value is Integration[] {
  if (!Array.isArray(value)) return false;

  return value.every((item) => {
    if (!item || typeof item !== "object") return false;
    const candidate = item as Partial<Integration>;
    return (
      typeof candidate.id === "string" &&
      typeof candidate.name === "string" &&
      typeof candidate.category === "string" &&
      typeof candidate.icon === "string" &&
      typeof candidate.status === "string" &&
      typeof candidate.description === "string"
    );
  });
}

function getConnectedIntegration(integration: Integration): Integration {
  return {
    ...integration,
    status: "connected",
    description: "Connected successfully",
    lastSynced: new Date().toISOString(),
  };
}

export function IntegrationGrid() {
  const [loadState, setLoadState] = useState<LoadState>("loading");
  const [reloadToken, setReloadToken] = useState(0);
  const [integrations, setIntegrations] = useState<Integration[]>(integrationData);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] =
    useState<IntegrationFilterOption["value"]>("all");
  const debouncedSearch = useDebouncedValue(searchQuery, 300);
  const [selectedIntegration, setSelectedIntegration] = useState<Integration | null>(
    null,
  );
  const [disconnectTarget, setDisconnectTarget] = useState<Integration | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    const hydrateIntegrations = () => {
      try {
        const persisted = window.localStorage.getItem(storageKey);
        if (!persisted) {
          setIntegrations(integrationData);
          setLoadState("ready");
          return;
        }

        const parsed: unknown = JSON.parse(persisted);
        if (!isIntegrationArray(parsed)) {
          throw new Error("Persisted integrations must be an array");
        }

        setIntegrations(parsed);
        setLoadState("ready");
      } catch {
        setLoadState("error");
      }
    };

    try {
      const hasSeenSkeleton =
        window.sessionStorage.getItem(integrationSkeletonSeenKey) === "1";
      if (hasSeenSkeleton) {
        hydrateIntegrations();
        return;
      }

      const timer = window.setTimeout(() => {
        hydrateIntegrations();
        window.sessionStorage.setItem(integrationSkeletonSeenKey, "1");
      }, 350);

      return () => window.clearTimeout(timer);
    } catch {
      const timer = window.setTimeout(hydrateIntegrations, 350);
      return () => window.clearTimeout(timer);
    }
  }, [reloadToken]);
  const handleReload = () => {
    setLoadState("loading");
    setReloadToken((previous) => previous + 1);
  };


  useEffect(() => {
    if (loadState !== "ready") return;
    window.localStorage.setItem(storageKey, JSON.stringify(integrations));
  }, [integrations, loadState]);

  const filteredIntegrations = useMemo(() => {
    return integrations.filter((integration) => {
      const matchesFilter =
        statusFilter === "all" ? true : integration.status === statusFilter;
      const normalizedQuery = debouncedSearch.trim().toLowerCase();
      const matchesSearch = normalizedQuery
        ? integration.name.toLowerCase().includes(normalizedQuery) ||
          integration.category.toLowerCase().includes(normalizedQuery)
        : true;
      return matchesFilter && matchesSearch;
    });
  }, [integrations, statusFilter, debouncedSearch]);

  const groupedByCategory = useMemo(() => {
    return integrationCategories
      .map((category) => ({
        category,
        items: filteredIntegrations.filter(
          (integration) => integration.category === category,
        ),
      }))
      .filter((group) => group.items.length > 0);
  }, [filteredIntegrations]);

  const connectedCount = useMemo(
    () => integrations.filter((item) => item.status === "connected").length,
    [integrations],
  );

  const handleConnect = (integration: Integration) => {
    const hasConfig = integrationConnectConfigs.some(
      (item) => item.integrationId === integration.id,
    );

    if (!hasConfig) {
      handleConnectSubmit(integration);
      return;
    }

    setSelectedIntegration(integration);
  };

  const handleConnectSubmit = (integration: Integration) => {
    setIntegrations((previous) =>
      previous.map((item) =>
        item.id === integration.id ? getConnectedIntegration(item) : item,
      ),
    );
    setSelectedIntegration(null);
    setToastMessage(`${integration.name} connected successfully`);
  };

  const handleDisconnectConfirm = () => {
    if (!disconnectTarget) return;

    setIntegrations((previous) =>
      previous.map((item) =>
        item.id === disconnectTarget.id
          ? {
              ...item,
              status: "available",
              description: "Connect account",
              lastSynced: undefined,
            }
          : item,
      ),
    );
    setToastMessage(`${disconnectTarget.name} disconnected`);
    setDisconnectTarget(null);
  };

  const handleManage = (integration: Integration) => {
    setToastMessage(`Manage ${integration.name}`);
  };

  return (
    <main className="dashboard-content">
      <IntegrationFilters
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        statusFilter={statusFilter}
        onStatusFilterChange={setStatusFilter}
        connectedCount={connectedCount}
      />

      <div className="integration-content">
        {loadState === "loading" ? <IntegrationSkeleton /> : null}

        {loadState === "error" ? (
          <EmptyState
            title="Unable to load integrations"
            description="Try again"
            illustration={
              <TriangleAlert className="h-[32px] w-[32px] text-text-secondary" />
            }
            containerClassName="min-h-[360px] rounded-[var(--radius-lg)] border border-border bg-background"
          />
        ) : null}

        {loadState === "error" ? (
          <div className="integration-error-actions">
            <Button variant="outline" onClick={handleReload}>
              Try again
            </Button>
          </div>
        ) : null}

        {loadState === "ready" && groupedByCategory.length === 0 ? (
          <EmptyState
            title="No integrations found"
            description="Try a different search keyword or filter."
            illustration={
              <Image
                src="/modal-view.png"
                alt=""
                width={160}
                height={160}
                className="h-auto w-[160px]"
              />
            }
            containerClassName="min-h-[360px] rounded-[var(--radius-lg)] border border-border bg-background"
          />
        ) : null}

        {loadState === "ready" ? (
          <div className="integration-groups">
            {groupedByCategory.map((group) => (
              <section key={group.category}>
                <h2 className="integration-group-title">
                  {group.category}
                </h2>
                <motion.div
                  className="integration-grid"
                  variants={cardContainerVariants}
                  initial="hidden"
                  animate="visible"
                >
                  {group.items.map((integration) => (
                    <motion.div
                      key={integration.id}
                      variants={cardVariants}
                      transition={{ duration: 0.2 }}
                    >
                      <IntegrationCard
                        integration={integration}
                        onConnect={handleConnect}
                        onDisconnect={setDisconnectTarget}
                        onManage={handleManage}
                      />
                    </motion.div>
                  ))}
                </motion.div>
              </section>
            ))}
          </div>
        ) : null}
      </div>

      <ConnectIntegrationModal
        key={selectedIntegration?.id ?? "connect-integration-modal"}
        open={Boolean(selectedIntegration)}
        integration={selectedIntegration}
        onClose={() => setSelectedIntegration(null)}
        onSubmit={handleConnectSubmit}
      />

      <Modal
        open={Boolean(disconnectTarget)}
        onClose={() => setDisconnectTarget(null)}
        title="Disconnect Integration"
        descriptionId="disconnect-integration-description"
      >
        <div className="integration-modal-body">
          <p id="disconnect-integration-description" className="integration-disconnect-copy">
            Disconnect {disconnectTarget?.name}? You can reconnect it anytime.
          </p>
        </div>
        <div className="new-grid-modal__footer">
          <Button variant="outline" onClick={() => setDisconnectTarget(null)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleDisconnectConfirm}>
            Disconnect
          </Button>
        </div>
      </Modal>

      <Toast message={toastMessage} onDismiss={() => setToastMessage(null)} />
    </main>
  );
}
