import { Calendar, MapPin, Search, Users } from "lucide-react";
import { useState } from "react";

export default function SearchBox() {
  const [formData, setFormData] = useState({
    location: "",
    checkIn: "",
    checkOut: "",
    guests: "2",
  });

  const S = SearchBoxStyles;

  return (
    <S.Container>
      <S.Grid>
        <S.InputGroup>
          <S.Label>
            <MapPin size={16} />
            Location
          </S.Label>
          <S.Input
            placeholder="Where are you going?"
            value={formData.location}
            onChange={(e) =>
              setFormData({ ...formData, location: e.target.value })
            }
          />
        </S.InputGroup>

        <S.InputGroup>
          <S.Label>
            <Calendar size={16} />
            Check-in
          </S.Label>
          <S.Input
            type="date"
            value={formData.checkIn}
            onChange={(e) =>
              setFormData({ ...formData, checkIn: e.target.value })
            }
          />
        </S.InputGroup>

        <S.InputGroup>
          <S.Label>
            <Calendar size={16} />
            Check-out
          </S.Label>
          <S.Input
            type="date"
            value={formData.checkOut}
            onChange={(e) =>
              setFormData({ ...formData, checkOut: e.target.value })
            }
          />
        </S.InputGroup>

        <S.InputGroup>
          <S.Label>
            <Users size={16} />
            Guests
          </S.Label>
          <S.Select
            value={formData.guests}
            onChange={(e) =>
              setFormData({ ...formData, guests: e.target.value })
            }
          >
            <option>1 Guest</option>
            <option>2 Guests</option>
            <option>3 Guests</option>
            <option>4 Guests</option>
            <option>5+ Guests</option>
          </S.Select>
        </S.InputGroup>
      </S.Grid>

      <S.Button>
        <Search size={20} />
        Search Rooms
      </S.Button>
    </S.Container>
  );
}

const SearchBoxStyles = {
  Container: ({ children }) => (
    <div
      style={{
        background: "rgba(255, 255, 255, 0.95)",
        backdropFilter: "blur(10px)",
        borderRadius: "20px",
        padding: "30px",
        boxShadow: "0 20px 60px rgba(0, 0, 0, 0.3)",
        maxWidth: "900px",
        margin: "0 auto",
      }}
    >
      {children}
    </div>
  ),
  Grid: ({ children }) => (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
        gap: "15px",
        marginBottom: "20px",
      }}
    >
      {children}
    </div>
  ),
  InputGroup: ({ children }) => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "8px",
      }}
    >
      {children}
    </div>
  ),
  Label: ({ children }) => (
    <label
      style={{
        fontSize: "14px",
        fontWeight: "600",
        color: "#333",
        display: "flex",
        alignItems: "center",
        gap: "6px",
      }}
    >
      {children}
    </label>
  ),
  Input: ({ type = "text", placeholder, value, onChange }) => (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      style={{
        padding: "12px 15px",
        border: "2px solid #e0e0e0",
        borderRadius: "10px",
        fontSize: "15px",
        outline: "none",
        transition: "all 0.3s ease",
      }}
    />
  ),
  Select: ({ children, value, onChange }) => (
    <select
      value={value}
      onChange={onChange}
      style={{
        padding: "12px 15px",
        border: "2px solid #e0e0e0",
        borderRadius: "10px",
        fontSize: "15px",
        outline: "none",
        transition: "all 0.3s ease",
      }}
    >
      {children}
    </select>
  ),
  Button: ({ children, onClick }) => {
    const [hover, setHover] = useState(false);
    return (
      <button
        onClick={onClick}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        style={{
          background: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
          color: "white",
          border: "none",
          padding: "15px 40px",
          borderRadius: "12px",
          fontSize: "16px",
          fontWeight: "600",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "10px",
          transition: "transform 0.2s ease",
          width: "100%",
          transform: hover ? "translateY(-2px)" : "translateY(0)",
          boxShadow: hover ? "0 5px 15px rgba(245, 87, 108, 0.4)" : "none",
        }}
      >
        {children}
      </button>
    );
  },
};
