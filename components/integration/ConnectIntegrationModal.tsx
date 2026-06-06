"use client";

import { useMemo, useState } from "react";

import { Button, Modal } from "@/components/shared";
import { integrationConnectConfigs } from "@/data/integrations";
import type { Integration } from "@/types/integration";

interface ConnectIntegrationModalProps {
  open: boolean;
  integration: Integration | null;
  onClose: () => void;
  onSubmit: (integration: Integration) => void;
}

export function ConnectIntegrationModal({
  open,
  integration,
  onClose,
  onSubmit,
}: ConnectIntegrationModalProps) {
  const config = useMemo(
    () =>
      integration
        ? integrationConnectConfigs.find(
            (item) => item.integrationId === integration.id,
          )
        : null,
    [integration],
  );

  const [fieldValues, setFieldValues] = useState<Record<string, string>>({});

  if (!integration || !config) return null;

  const isFormValid = config.fields.every((field) =>
    (fieldValues[field.id] ?? "").trim(),
  );

  const handleSubmit = () => {
    if (!isFormValid) return;
    onSubmit(integration);
    setFieldValues({});
  };

  const handleClose = () => {
    setFieldValues({});
    onClose();
  };

  return (
    <Modal open={open} onClose={handleClose} title={config.title}>
      <div className="integration-modal-body">
        {config.fields.map((field) => (
          <label key={field.id} className="form-field" htmlFor={`field-${field.id}`}>
            <span className="form-field__label">{field.label}</span>
            <input
              id={`field-${field.id}`}
              type={field.type}
              value={fieldValues[field.id] ?? ""}
              onChange={(event) =>
                setFieldValues((previous) => ({
                  ...previous,
                  [field.id]: event.target.value,
                }))
              }
              placeholder={field.placeholder}
              className="form-field__input"
            />
          </label>
        ))}
      </div>

      <div className="new-grid-modal__footer">
        <Button variant="outline" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleSubmit} disabled={!isFormValid}>
          {config.submitLabel}
        </Button>
      </div>
    </Modal>
  );
}
