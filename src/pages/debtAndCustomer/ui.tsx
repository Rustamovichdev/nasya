import type { ReactNode } from "react";
import type { Tone } from "./turlar";
import { primaryBtn, secondaryBtn, TONE } from "./konstantalar";
import { Icon, type IconName } from "./ikonlar";

export function Modal({ title, onClose, children }: { title: string; onClose: () => void; children: ReactNode }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/40 p-4" onClick={onClose}>
      <div className="w-full max-w-lg rounded-xl bg-white shadow-xl" role="dialog" aria-modal="true" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between border-b border-gray-100 px-5 py-3">
          <h2 className="text-base font-semibold text-gray-900">{title}</h2>
          <button type="button" onClick={onClose} className="rounded-md p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600" aria-label="Yopish">
            <Icon name="x" />
          </button>
        </div>
        <div className="px-5 py-4">{children}</div>
      </div>
    </div>
  );
}

export function Field({ label, children, error }: { label: string; children: ReactNode; error?: string }) {
  return (
    <label className="block space-y-1">
      <span className="text-xs font-medium text-gray-600">{label}</span>
      {children}
      {error && <span className="block text-xs text-red-600">{error}</span>}
    </label>
  );
}

export function FormButtons({ onCancel, onSave, saveLabel = "Saqlash", disabled = false }: { onCancel: () => void; onSave: () => void; saveLabel?: string; disabled?: boolean }) {
  return (
    <div className="flex justify-end gap-2 pt-2">
      <button type="button" onClick={onCancel} className={secondaryBtn}>
        Bekor qilish
      </button>
      <button type="button" onClick={onSave} disabled={disabled} className={primaryBtn}>
        {saveLabel}
      </button>
    </div>
  );
}

export function StatCard({
  title,
  value,
  valueClass = "text-gray-900",
  sub,
  subTone,
  icon,
  iconClass,
}: {
  title: string;
  value: string;
  valueClass?: string;
  sub: string;
  subTone: Tone | "green";
  icon: IconName;
  iconClass: string;
}) {
  const subColor = subTone === "red" ? "text-red-500" : subTone === "green" ? "text-emerald-600" : "text-gray-500";
  return (
    <div className="flex items-start justify-between rounded-xl border border-gray-200 bg-white p-4">
      <div className="min-w-0">
        <p className="text-xs font-medium text-gray-500">{title}</p>
        <p className={`mt-1 truncate text-lg font-semibold ${valueClass}`}>{value}</p>
        <p className={`mt-1 text-xs ${subColor}`}>{sub}</p>
      </div>
      <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${iconClass}`}>
        <Icon name={icon} />
      </div>
    </div>
  );
}

export function TagChip({ label, count, active, onClick }: { label: string; count: number; active: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full px-3 py-1 text-xs font-medium ring-1 transition ${active ? "bg-blue-600 text-white ring-blue-600" : "bg-white text-gray-600 ring-gray-200 hover:bg-gray-50"}`}
    >
      {label} ({count})
    </button>
  );
}

export function ActionButton({ icon, title, onClick, href }: { icon: IconName; title: string; onClick?: () => void; href?: string }) {
  const cls = "rounded-md p-1.5 hover:bg-gray-100 hover:text-blue-600";
  if (href) {
    return (
      <a href={href} title={title} aria-label={title} className={cls}>
        <Icon name={icon} />
      </a>
    );
  }
  return (
    <button type="button" title={title} aria-label={title} onClick={onClick} className={cls}>
      <Icon name={icon} />
    </button>
  );
}

export function PageButton({
  children,
  onClick,
  active = false,
  disabled = false,
  label,
}: {
  children: ReactNode;
  onClick: () => void;
  active?: boolean;
  disabled?: boolean;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      className={`flex h-7 min-w-7 items-center justify-center rounded-md px-2 text-xs font-medium ${active ? "bg-blue-600 text-white" : "text-gray-600 hover:bg-gray-100"} disabled:cursor-not-allowed disabled:opacity-40`}
    >
      {children}
    </button>
  );
}
