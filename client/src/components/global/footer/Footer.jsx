import { Facebook, Instagram, Mail, Phone, Twitter } from "lucide-react";

export default function Footer() {
  return (
    <footer style={style.footer}>
      <div style={style.container}>
        <div style={style.footerGrid}>
          <div style={style.footerColumn}>
            <h3 style={style.footerTitle}>Elbasha Hotels</h3>
            <p style={style.footerText}>Your perfect home away from home</p>
            <div style={style.socialIcons}>
              <Facebook size={20} />
              <Instagram size={20} />
              <Twitter size={20} />
            </div>
          </div>

          <div style={style.footerColumn}>
            <h4 style={style.footerHeading}>Quick Links</h4>
            <ul style={style.footerList}>
              <li>About Us</li>
              <li>Rooms</li>
              <li>Amenities</li>
              <li>Contact</li>
            </ul>
          </div>

          <div style={style.footerColumn}>
            <h4 style={style.footerHeading}>Contact</h4>
            <div style={style.contactItem}>
              <Phone size={16} />
              <span>+20 1098893166</span>
            </div>
            <div style={style.contactItem}>
              <Mail size={16} />
              <span>mostafa.abdulrahman1880@gmail.com</span>
            </div>
          </div>
        </div>

        <div style={style.footerBottom}>
          <p>© 2025 Elbasha Hotels. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

const style = {
  footer: {
    background: "#1a1a1a",
    color: "white",
    padding: "60px 20px 20px",
  },
  footerGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "40px",
    marginBottom: "40px",
  },
  footerColumn: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  footerTitle: {
    fontSize: "1.5rem",
    fontWeight: "700",
    background: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  },
  footerText: {
    color: "#aaa",
    fontSize: "14px",
  },
  socialIcons: {
    display: "flex",
    gap: "15px",
    color: "white",
    cursor: "pointer",
  },
  footerHeading: {
    fontSize: "1.1rem",
    fontWeight: "600",
    marginBottom: "5px",
  },
  footerList: {
    listStyle: "none",
    padding: 0,
    margin: 0,
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    color: "#aaa",
    fontSize: "14px",
    cursor: "pointer",
  },
  contactItem: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    color: "#aaa",
    fontSize: "14px",
  },
  footerBottom: {
    borderTop: "1px solid #333",
    paddingTop: "20px",
    textAlign: "center",
    color: "#aaa",
    fontSize: "14px",
  },
};
