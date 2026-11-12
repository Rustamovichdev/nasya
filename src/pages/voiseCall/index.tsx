
import { useState } from "react";
import "./style.css";

const customers = [
  { id: 1, name: "Kadamov Suleyman", phone: "+998915725059", debt: 450000 },
  { id: 2, name: "Kadamov Suleyman", phone: "+998915725059", debt: 1200000 },
  { id: 3, name: "Kadamov Suleyman", phone: "+998915725059", debt: 250000 },
  { id: 4, name: "Kadamov Suleyman", phone: "+998915725059", debt: 800000 },
];

const VoiceCall = () => {
  const [search, setSearch] = useState("");
  const [history, setHistory] = useState<any[]>([]);
  const [selected, setSelected] = useState<any>(null);
  const [status, setStatus] = useState("Javob berdi");
  const [note, setNote] = useState("");

  const money = (amount: number) =>
    new Intl.NumberFormat("uz-UZ").format(amount) + " so'm";

  const filtered = customers.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.phone.includes(search)
  );

  const callCustomer = (customer: (typeof customers)[number]) => {
    setSelected(customer);
    setStatus("Javob berdi");
    setNote("");
    window.location.href = `tel:${customer.phone}`;
  };

  const saveResult = () => {
    if (!selected) return;

    setHistory((prev) => [
      {
        id: Date.now(),
        name: selected.name,
        phone: selected.phone,
        status,
        note,
        date: new Date().toLocaleString("uz-UZ"),
      },
      ...prev,
    ]);

    setSelected(null);
  };

  return (
    <div className="voice-page">
      <div className="voice-heading">
        <div>
          <h1>Ovozli qo‘ng‘iroqlar</h1>
          <p>Qarzdor mijozlar bilan bog‘lanish</p>
        </div>
      </div>

      <div className="voice-stats">
        <div className="voice-card">
          <span>👥</span>
          <p>Jami mijozlar</p>
          <h2>{customers.length}</h2>
        </div>

        <div className="voice-card">
          <span>💰</span>
          <p>Jami qarzdorlik</p>
          <h2>
            {money(customers.reduce((sum, c) => sum + c.debt, 0))}
          </h2>
        </div>

        <div className="voice-card">
          <span>📞</span>
          <p>Qo‘ng‘iroqlar</p>
          <h2>{history.length}</h2>
        </div>
      </div>

      <div className="voice-section">
        <h2>Qarzdor mijozlar</h2>

        <input
          className="voice-search"
          placeholder="Mijoz ismini yoki telefonini qidiring..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div className="voice-table-wrap">
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Mijoz</th>
                <th>Telefon</th>
                <th>Qarz</th>
                <th>Amal</th>
              </tr>
            </thead>

            <tbody>
              {filtered.map((customer, index) => (
                <tr key={customer.id}>
                  <td>{index + 1}</td>
                  <td>{customer.name}</td>
                  <td>{customer.phone}</td>
                  <td className="voice-debt">
                    {money(customer.debt)}
                  </td>
                  <td>
                    <button
                      className="voice-call-btn"
                      onClick={() => callCustomer(customer)}
                    >
                      📞 Qo‘ng‘iroq
                    </button>
                    <button
                      className="voice-result-btn"
                      onClick={() => {
                        setSelected(customer);
                        setStatus("Javob berdi");
                        setNote("");
                      }}
                    >
                      Natija
                    </button>
                  </td>
                </tr>
              ))}

              {filtered.length === 0 && (
                <tr>
                  <td colSpan={5}>Mijoz topilmadi</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="voice-section">
        <h2>Qo‘ng‘iroqlar tarixi</h2>

        <div className="voice-table-wrap">
          <table>
            <thead>
              <tr>
                <th>Mijoz</th>
                <th>Telefon</th>
                <th>Natija</th>
                <th>Izoh</th>
                <th>Sana</th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              {history.map((item) => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>{item.phone}</td>
                  <td>{item.status}</td>
                  <td>{item.note || "-"}</td>
                  <td>{item.date}</td>
                  <td>
                    <button
                      className="voice-delete"
                      onClick={() =>
                        setHistory((prev) =>
                          prev.filter((h) => h.id !== item.id)
                        )
                      }
                    >
                      🗑
                    </button>
                  </td>
                </tr>
              ))}

              {history.length === 0 && (
                <tr>
                  <td colSpan={6}>Hozircha qo‘ng‘iroqlar mavjud emas</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {selected && (
        <div className="voice-overlay">
          <div className="voice-modal">
            <h2>Qo‘ng‘iroq natijasi</h2>
            <p>{selected.name}</p>
            <p>{selected.phone}</p>

            <label>Qo‘ng‘iroq holati</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option>Javob berdi</option>
              <option>Javob bermadi</option>
              <option>Qayta qo‘ng‘iroq</option>
            </select>

            <label>Izoh</label>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Suhbat natijasini yozing..."
            />

            <div className="voice-modal-actions">
              <button onClick={() => setSelected(null)}>
                Bekor qilish
              </button>
              <button onClick={saveResult}>
                Saqlash
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VoiceCall;
