"use client";

import { useMemo, useState } from "react";

import { Button } from "@/components/shared/Button";
import { Modal } from "@/components/shared/Modal";
import { PlatformIcon } from "@/components/shared/PlatformIcon";
import { Select } from "@/components/shared/Select";
import { gridTypeOptions } from "@/data/grids";
import type { NewGridFormData } from "@/types/grids";

interface NewGridModalProps {
  open: boolean;
  onClose: () => void;
  onCreate: (data: NewGridFormData) => void;
}

const initialForm: NewGridFormData = {
  name: "",
  description: "",
  type: "linkedin",
};

export function NewGridModal({ open, onClose, onCreate }: NewGridModalProps) {
  const [form, setForm] = useState<NewGridFormData>(initialForm);

  const typeOptions = useMemo(
    () =>
      gridTypeOptions.map((option) => ({
        value: option.value,
        label: option.label,
        icon: <PlatformIcon platform={option.value} size="sm" />,
      })),
    [],
  );

  const handleClose = () => {
    setForm(initialForm);
    onClose();
  };

  const handleCreate = () => {
    if (!form.name.trim()) return;
    onCreate(form);
    setForm(initialForm);
  };

  return (
    <Modal open={open} onClose={handleClose} title="New Grid" size="md">
      <div className="new-grid-modal__body">
        <label className="form-field" htmlFor="new-grid-name">
          <span className="form-field__label">Grid Name</span>
          <input
            id="new-grid-name"
            type="text"
            value={form.name}
            onChange={(event) =>
              setForm((prev) => ({ ...prev, name: event.target.value }))
            }
            placeholder="Enter grid name"
            className="form-field__input"
          />
        </label>

        <label className="form-field" htmlFor="new-grid-description">
          <span className="form-field__label">Description</span>
          <textarea
            id="new-grid-description"
            value={form.description}
            onChange={(event) =>
              setForm((prev) => ({
                ...prev,
                description: event.target.value,
              }))
            }
            placeholder="Enter description"
            rows={3}
            className="form-field__textarea"
          />
        </label>

        <div className="form-field">
          <span className="form-field__label">Type</span>
          <Select
            value={form.type}
            onChange={(type) => setForm((prev) => ({ ...prev, type }))}
            options={typeOptions}
          />
        </div>
      </div>

      <div className="new-grid-modal__footer">
        <Button variant="outline" onClick={handleClose}>
          Cancel
        </Button>
        <Button
          variant="primary"
          onClick={handleCreate}
          disabled={!form.name.trim()}
        >
          Create Grid
        </Button>
      </div>
    </Modal>
  );
}
