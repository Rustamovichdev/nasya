import { useEffect, useMemo, useState } from "react";
import type { Customer, Entry, ModalState, SortKey, StatusKey, Store, TagKey } from "./turlar";
import { PAGE_SIZE, STORAGE_KEY, TAGS, AVATAR_COLORS, TONE, fieldClass, primaryBtn } from "./konstantalar";
import {
  todayISO,
  loadStore,
  buildViews,
  matchesStatus,
  dueInfo,
  pageNumbers,
  formatMoney,
  formatDate,
  digitsOnly,
  initials,
  telHref,
  nextId,
} from "./sana";
import { Icon } from "./ikonlar";
import { Modal, StatCard, TagChip, ActionButton, PageButton } from "./ui";
import { CustomerForm, PaymentForm, DebtForm, MessageForm, HistoryView } from "./formlar";

const DebtAndCustomer = () => {
  const [store, setStore] = useState<Store>(loadStore);
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<StatusKey>("all");
  const [sort, setSort] = useState<SortKey>("balance-desc");
  const [tag, setTag] = useState<TagKey | "all">("all");
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState<number[]>([]);
  const [modal, setModal] = useState<ModalState>(null);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
    } catch {
      /* saqlash imkoni bo'lmasa, sahifa ishlashda davom etadi */
    }
  }, [store]);

  const today = todayISO();
  const views = useMemo(() => buildViews(store.customers, store.entries, today), [store, today]);
  const viewById = useMemo(() => new Map(views.map((v) => [v.id, v])), [views]);
  const entriesOf = (customerId: number) =>
    store.entries.filter((e) => e.customerId === customerId).sort((a, b) => b.date.localeCompare(a.date) || b.id - a.id);

  /* ---------- Ma'lumotni o'zgartirish ---------- */

  const saveCustomer = (
    form: { name: string; phone: string; tags: TagKey[]; telegram: boolean },
    editId: number | undefined,
    firstDebt?: { amount: number; date: string; dueDate: string | null; items: string[] }
  ) => {
    setStore((prev) => {
      if (editId !== undefined) {
        return {
          ...prev,
          customers: prev.customers.map((c) => (c.id === editId ? { ...c, ...form } : c)),
        };
      }
      const id = nextId(prev.customers);
      const customer: Customer = { id, ...form, items: firstDebt?.items ?? [] };
      const entries = firstDebt
        ? [
            ...prev.entries,
            {
              id: nextId(prev.entries),
              customerId: id,
              kind: "debt" as const,
              amount: firstDebt.amount,
              date: firstDebt.date,
              dueDate: firstDebt.dueDate,
              note: "",
            },
          ]
        : prev.entries;
      return { customers: [...prev.customers, customer], entries };
    });
  };

  const addEntry = (customerId: number, data: Omit<Entry, "id" | "customerId">, items: string[] = []) => {
    setStore((prev) => {
      const entry: Entry = { id: nextId(prev.entries), customerId, ...data };
      const customers =
        items.length === 0
          ? prev.customers
          : prev.customers.map((c) => (c.id === customerId ? { ...c, items: [...new Set([...c.items, ...items])] } : c));
      return { customers, entries: [...prev.entries, entry] };
    });
  };

  const deleteCustomer = (id: number) => {
    setStore((prev) => ({
      customers: prev.customers.filter((c) => c.id !== id),
      entries: prev.entries.filter((e) => e.customerId !== id),
    }));
    setSelected((prev) => prev.filter((x) => x !== id));
  };

  /* ---------- Statistika ---------- */

  const stats = useMemo(() => {
    const overdue = views.filter((v) => matchesStatus(v, "overdue"));
    const telegramCount = views.filter((v) => v.telegram).length;
    const todayPayments = store.entries.filter((e) => e.kind === "payment" && e.date === today);
    return {
      totalBalance: views.reduce((s, v) => s + v.balance, 0),
      activeCount: views.filter((v) => v.balance > 0).length,
      overdueCount: overdue.length,
      overdueSum: overdue.reduce((s, v) => s + v.balance, 0),
      telegramCount,
      telegramPct: views.length ? Math.round((telegramCount / views.length) * 100) : 0,
      todayAmount: todayPayments.reduce((s, e) => s + e.amount, 0),
      todayCount: todayPayments.length,
    };
  }, [views, store.entries, today]);

  const tagCounts = useMemo(
    () => Object.fromEntries(TAGS.map((t) => [t.key, views.filter((v) => v.tags.includes(t.key)).length])) as Record<TagKey, number>,
    [views]
  );

  /* ---------- Filtr, saralash, sahifalash ---------- */

  const rows = useMemo(() => {
    const q = query.trim().toLowerCase();
    const qDigits = digitsOnly(q);
    const filtered = views.filter((v) => {
      if (tag !== "all" && !v.tags.includes(tag)) return false;
      if (!matchesStatus(v, status)) return false;
      if (!q) return true;
      return v.name.toLowerCase().includes(q) || (qDigits.length > 0 && digitsOnly(v.phone).includes(qDigits));
    });
    const dueKey = (v: typeof views[0]) => v.dueDays ?? Number.POSITIVE_INFINITY;
    return [...filtered].sort((a, b) => {
      if (sort === "balance-asc") return a.balance - b.balance;
      if (sort === "due") {
        const ka = dueKey(a);
        const kb = dueKey(b);
        return ka === kb ? 0 : ka < kb ? -1 : 1;
      }
      return b.balance - a.balance;
    });
  }, [views, query, status, sort, tag]);

  const totalPages = Math.max(1, Math.ceil(rows.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const pageRows = rows.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);
  const rowsBalance = rows.reduce((s, v) => s + v.balance, 0);
  const allOnPageChecked = pageRows.length > 0 && pageRows.every((r) => selected.includes(r.id));

  const toggleOne = (id: number) => setSelected((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));

  const toggleAll = () => {
    const ids = pageRows.map((r) => r.id);
    setSelected((prev) => (allOnPageChecked ? prev.filter((id) => !ids.includes(id)) : [...new Set([...prev, ...ids])]));
  };

  const resetFilters = () => {
    setQuery("");
    setStatus("all");
    setSort("balance-desc");
    setTag("all");
    setPage(1);
  };

  const modalView = modal && "id" in modal && modal.id !== undefined ? viewById.get(modal.id) : undefined;
  const editing = modal?.kind === "customer" && modal.id !== undefined ? store.customers.find((c) => c.id === modal.id) : undefined;

  return (
    <section className="space-y-4 text-gray-800">
      {/* Sarlavha */}
      <div className="flex flex-wrap items-center gap-3">
        <h1 className="text-xl font-semibold text-gray-900">Mijozlar & Nasiya Daftari</h1>
        <span className="rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-medium text-blue-600 ring-1 ring-blue-200">
          {stats.activeCount} ta faol mijoz
        </span>
        <div className="ml-auto">
          <button type="button" onClick={() => setModal({ kind: "customer" })} className={`${primaryBtn} flex items-center gap-1.5`}>
            <Icon name="plus" className="h-4 w-4" /> Yangi mijoz
          </button>
        </div>
        <p className="w-full text-sm text-gray-500">
          Barcha qarzdorlar ro'yxati, to'lov muddatlari va Telegram bot bilan avtomatlashtirilgan real-vaqt hisob-kitoblar
        </p>
      </div>

      {/* Statistika kartalari */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard title="Jami nasiya qoldig'i" value={formatMoney(stats.totalBalance)} sub={`${stats.activeCount} ta mijozda`} subTone="green" icon="wallet" iconClass="bg-blue-50 text-blue-600" />
        <StatCard title="Bugun qaytarilgan" value={formatMoney(stats.todayAmount)} valueClass="text-emerald-600" sub={`${stats.todayCount} ta to'lov qayd etildi`} subTone="green" icon="money" iconClass="bg-emerald-50 text-emerald-600" />
        <StatCard title="Muddati o'tgan qarzlar" value={formatMoney(stats.overdueSum)} valueClass="text-red-600" sub={`${stats.overdueCount} ta mijozda kechikmoqda`} subTone="red" icon="alarm" iconClass="bg-red-50 text-red-600" />
        <StatCard title="Telegram bot ulanishi" value={`${stats.telegramCount} / ${views.length} mijoz`} sub={`${stats.telegramPct}% avtomatik xabarnoma`} subTone="gray" icon="send" iconClass="bg-violet-50 text-violet-600" />
      </div>

      {/* Qidiruv va filtrlar */}
      <div className="flex flex-col gap-2 md:flex-row md:items-center">
        <div className="relative flex-1">
          <Icon name="search" className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setPage(1);
            }}
            placeholder="Mijoz ismi, telefon raqami (+998) yoki teg bo'yicha qidirish..."
            className={`${fieldClass} w-full pl-9`}
          />
        </div>
        <select
          value={status}
          onChange={(e) => {
            setStatus(e.target.value as StatusKey);
            setPage(1);
          }}
          className={fieldClass}
        >
          <option value="all">Barcha holatlar</option>
          <option value="active">Faol qarzlar</option>
          <option value="overdue">Kechikkanlar</option>
          <option value="soon">Muddati yaqinlar</option>
          <option value="closed">Yopilganlar</option>
        </select>
        <select
          value={sort}
          onChange={(e) => {
            setSort(e.target.value as SortKey);
            setPage(1);
          }}
          className={fieldClass}
        >
          <option value="balance-desc">Qarz miqdori: Kamayish tartibida</option>
          <option value="balance-asc">Qarz miqdori: O'sish tartibida</option>
          <option value="due">To'lov muddati bo'yicha</option>
        </select>
        <button
          type="button"
          onClick={resetFilters}
          title="Filtrlarni tozalash"
          className="flex items-center justify-center rounded-lg border border-gray-200 bg-white p-2 text-gray-500 hover:bg-gray-50 hover:text-blue-600"
        >
          <Icon name="filter" />
        </button>
      </div>

      {/* Teglar */}
      <div className="flex flex-wrap items-center gap-2 text-sm">
        <span className="text-xs font-medium uppercase tracking-wide text-gray-400">Teglar:</span>
        <TagChip
          label="Barchasi"
          count={views.length}
          active={tag === "all"}
          onClick={() => {
            setTag("all");
            setPage(1);
          }}
        />
        {TAGS.map((t) => (
          <TagChip
            key={t.key}
            label={t.label}
            count={tagCounts[t.key]}
            active={tag === t.key}
            onClick={() => {
              setTag(t.key);
              setPage(1);
            }}
          />
        ))}
      </div>

      {/* Tanlanganlar paneli */}
      {selected.length > 0 && (
        <div className="flex items-center justify-between rounded-lg bg-blue-50 px-4 py-2 text-sm text-blue-700">
          <span>{selected.length} ta mijoz tanlandi</span>
          <button type="button" onClick={() => setSelected([])} className="font-medium hover:underline">
            Tanlashni bekor qilish
          </button>
        </div>
      )}

      {/* Jadval */}
      <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white">
        <table className="w-full min-w-[960px] text-left text-sm">
          <thead className="border-b border-gray-200 bg-gray-50 text-xs uppercase tracking-wide text-gray-500">
            <tr>
              <th className="w-10 px-4 py-3">
                <input
                  type="checkbox"
                  checked={allOnPageChecked}
                  onChange={toggleAll}
                  className="h-4 w-4 accent-blue-600"
                  aria-label="Sahifadagi hammasini tanlash"
                />
              </th>
              <th className="px-4 py-3 font-medium">Mijoz ismi & telefon</th>
              <th className="px-4 py-3 font-medium">Faol qarz balansi</th>
              <th className="px-4 py-3 font-medium">Mahsulot turi / teg</th>
              <th className="px-4 py-3 font-medium">Oxirgi nasiya</th>
              <th className="px-4 py-3 font-medium">To'lov muddati</th>
              <th className="px-4 py-3 font-medium">Jami yopilgan</th>
              <th className="px-4 py-3 text-center font-medium">Tezkor amallar</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {pageRows.length === 0 && (
              <tr>
                <td colSpan={8} className="px-4 py-10 text-center text-gray-400">
                  {store.customers.length === 0 ? "Hali mijoz yo'q. «Yangi mijoz» tugmasini bosing." : "Mos mijoz topilmadi"}
                </td>
              </tr>
            )}
            {pageRows.map((v) => {
              const due = dueInfo(v);
              const isOverdue = matchesStatus(v, "overdue");
              return (
                <tr key={v.id} className="align-middle hover:bg-gray-50/70">
                  <td className="px-4 py-3">
                    <input
                      type="checkbox"
                      checked={selected.includes(v.id)}
                      onChange={() => toggleOne(v.id)}
                      className="h-4 w-4 accent-blue-600"
                      aria-label={`${v.name} ni tanlash`}
                    />
                  </td>

                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div
                        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-semibold ${AVATAR_COLORS[v.id % AVATAR_COLORS.length]}`}
                      >
                        {initials(v.name)}
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5 font-medium text-gray-900">
                          <span className="truncate">{v.name}</span>
                          {v.telegram && (
                            <span title="Telegram bot ulangan" className="text-blue-500">
                              <Icon name="send" className="h-3.5 w-3.5" />
                            </span>
                          )}
                        </div>
                        <div className="text-xs text-gray-500">{v.phone}</div>
                      </div>
                    </div>
                  </td>

                  <td className="px-4 py-3">
                    <div className={`font-semibold ${isOverdue ? "text-red-600" : v.balance === 0 ? "text-emerald-600" : "text-gray-900"}`}>
                      {formatMoney(v.balance)}
                    </div>
                    <div className="text-xs text-gray-400">{v.balance === 0 ? "To'liq to'langan" : `${v.items.length} ta mahsulot`}</div>
                  </td>

                  <td className="px-4 py-3">
                    <div className="flex flex-wrap gap-1">
                      {v.items.map((item) => (
                        <span key={item} className="rounded-md bg-gray-100 px-2 py-0.5 text-xs text-gray-600">
                          {item}
                        </span>
                      ))}
                    </div>
                  </td>

                  <td className="px-4 py-3 text-xs text-gray-600">{formatDate(v.lastDate)}</td>

                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center gap-1 whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-medium ring-1 ${TONE[due.tone]}`}>
                      {due.text}
                    </span>
                  </td>

                  <td className="px-4 py-3 font-medium text-emerald-600">{formatMoney(v.totalPaid)}</td>

                  <td className="px-4 py-3">
                    <div className="flex items-center justify-center gap-1 text-gray-500">
                      {v.balance > 0 ? (
                        <ActionButton icon="card" title="To'lov qabul qilish" onClick={() => setModal({ kind: "payment", id: v.id })} />
                      ) : (
                        <ActionButton icon="plus" title="Yangi nasiya qo'shish" onClick={() => setModal({ kind: "debt", id: v.id })} />
                      )}
                      <ActionButton icon="message" title="Xabar yozish" onClick={() => setModal({ kind: "message", id: v.id })} />
                      <ActionButton icon="phone" title="Qo'ng'iroq qilish" href={telHref(v.phone)} />
                      <ActionButton icon="history" title="Tarix" onClick={() => setModal({ kind: "history", id: v.id })} />
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Pastki qism */}
      <div className="flex flex-col gap-3 text-xs text-gray-500 sm:flex-row sm:items-center sm:justify-between">
        <span>
          Jami {views.length} ta mijozdan {rows.length === 0 ? 0 : (currentPage - 1) * PAGE_SIZE + 1}–
          {Math.min(currentPage * PAGE_SIZE, rows.length)} ko'rsatilmoqda • Umumiy qarz balansi:{" "}
          <span className="font-medium text-gray-700">{formatMoney(rowsBalance)}</span>
        </span>

        <nav className="flex items-center gap-1" aria-label="Sahifalash">
          <PageButton disabled={currentPage === 1} onClick={() => setPage(currentPage - 1)} label="Oldingi sahifa">
            <Icon name="left" className="h-3.5 w-3.5" />
          </PageButton>
          {pageNumbers(currentPage, totalPages).map((p, i) =>
            p === "..." ? (
              <span key={`dots-${i}`} className="px-2 text-gray-400">
                ...
              </span>
            ) : (
              <PageButton key={p} active={p === currentPage} onClick={() => setPage(p as number)} label={`${p}-sahifa`}>
                {p}
              </PageButton>
            )
          )}
          <PageButton disabled={currentPage === totalPages} onClick={() => setPage(currentPage + 1)} label="Keyingi sahifa">
            <Icon name="right" className="h-3.5 w-3.5" />
          </PageButton>
        </nav>
      </div>

      {/* Modallar */}
      {modal?.kind === "customer" && (
        <Modal title={editing ? `Tahrirlash — ${editing.name}` : "Yangi mijoz"} onClose={() => setModal(null)}>
          <CustomerForm
            initial={editing}
            onCancel={() => setModal(null)}
            onSave={(form, firstDebt) => {
              saveCustomer(form, editing?.id, firstDebt);
              setModal(null);
            }}
          />
        </Modal>
      )}

      {modal?.kind === "payment" && modalView && (
        <Modal title={`To'lov qabul qilish — ${modalView.name}`} onClose={() => setModal(null)}>
          <PaymentForm
            balance={modalView.balance}
            onCancel={() => setModal(null)}
            onSave={(amount, date, note) => {
              addEntry(modalView.id, { kind: "payment", amount, date, dueDate: null, note });
              setModal(null);
            }}
          />
        </Modal>
      )}

      {modal?.kind === "debt" && modalView && (
        <Modal title={`Yangi nasiya — ${modalView.name}`} onClose={() => setModal(null)}>
          <DebtForm
            onCancel={() => setModal(null)}
            onSave={(amount, date, dueDate, items) => {
              addEntry(modalView.id, { kind: "debt", amount, date, dueDate, note: "" }, items);
              setModal(null);
            }}
          />
        </Modal>
      )}

      {modal?.kind === "message" && modalView && (
        <Modal title={`Xabar — ${modalView.name}`} onClose={() => setModal(null)}>
          <MessageForm
            view={modalView}
            onCancel={() => setModal(null)}
            onSave={(text) => {
              addEntry(modalView.id, { kind: "message", amount: 0, date: todayISO(), dueDate: null, note: text });
              setModal(null);
            }}
          />
        </Modal>
      )}

      {modal?.kind === "history" && modalView && (
        <Modal title={`Tarix — ${modalView.name}`} onClose={() => setModal(null)}>
          <HistoryView
            entries={entriesOf(modalView.id)}
            onEdit={() => setModal({ kind: "customer", id: modalView.id })}
            onDelete={() => {
              if (window.confirm(`«${modalView.name}» va uning barcha yozuvlari o'chirilsinmi?`)) {
                deleteCustomer(modalView.id);
                setModal(null);
              }
            }}
          />
        </Modal>
      )}
    </section>
  );
};

export default DebtAndCustomer;
