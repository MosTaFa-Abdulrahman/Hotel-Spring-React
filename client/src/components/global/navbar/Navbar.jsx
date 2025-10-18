// Styled Components && Icons && Navigation
import { useRef, useEffect, useContext, useState, useCallback } from "react";
import {
  Header,
  LogoSection,
  LogoLink,
  LogoIcon,
  LogoText,
  DesktopNav,
  NavItemWrapper,
  NavItem,
  SubmenuArrow,
  Submenu,
  SubmenuItem,
  RightSection,
  UserMenu,
  UserButton,
  Username,
  DropdownArrow,
  UserMenuDropdown,
  MenuItem,
  MenuAvatar,
  UserInfo,
  UserName,
  UserRole,
  MenuDivider,
  MobileMenuToggle,
  MobileMenuOverlay,
  MobileMenu,
  MobileMenuHeader,
  MobileLogo,
  CloseBtn,
  MobileNav,
  MobileNavItemWrapper,
  MobileNavItem,
  MobileSubmenu,
  MobileSubmenuItem,
  MobileUserSection,
  MobileProfileLink,
  MobileAvatar,
  MobileUserInfo,
  MobileUserName,
  MobileUserRole,
  MobileLogoutBtn,
  MobileLoginBtn,
} from "./navbar.style";
import {
  Home,
  BookOpen,
  User,
  Menu,
  X,
  ChevronDown,
  ShieldCheck,
  Hotel,
} from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";

// Context
import { AuthContext } from "../../../context/AuthContext";
import toast from "react-hot-toast";

export default function Navbar() {
  const { currentUser, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  // State management
  const [isUserMenuOpen, setUserMenuOpen] = useState(false);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState(null);

  // Refs for click outside detection
  const menuRef = useRef();
  const mobileMenuRef = useRef();

  // Memoized click outside handler
  const handleClickOutside = useCallback((event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setUserMenuOpen(false);
    }
    if (
      mobileMenuRef.current &&
      !mobileMenuRef.current.contains(event.target)
    ) {
      setMobileMenuOpen(false);
      setActiveSubmenu(null);
    }
  }, []);

  // Handle click outside to close menus
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleClickOutside]);

  // Close mobile menu on route change
  useEffect(() => {
    if (isMobileMenuOpen) {
      setMobileMenuOpen(false);
      setActiveSubmenu(null);
    }
  }, [window.location.pathname]);

  // Handle protected routes
  const handleProtectedRoute = useCallback(
    (e, path) => {
      if (!currentUser) {
        e.preventDefault();
        navigate("/login");
        return false;
      }
      return true;
    },
    [currentUser, navigate]
  );

  // User Menu
  const baseMenuItems = [
    {
      icon: <Home />,
      label: "Home",
      path: "/",
    },
    {
      icon: <User />,
      label: "User",
      requiresAuth: true,
      onClick: handleProtectedRoute,
      submenu: [{ label: "Hotels", path: "/hotels" }],
    },
  ];

  // Admin menu
  const adminMenuItem = {
    icon: <ShieldCheck />,
    label: "Admin",
    requiresAuth: true,
    requiresRole: "ADMIN" || "MANAGER",
    submenu: [
      { label: "All Hotels", path: "/admin/hotels" },
      { label: "All Apartments", path: "/admin/apartments" },
      { label: "All Rooms", path: "/admin/rooms" },
      { label: "All Users", path: "/admin/users" },
    ],
  };

  // Build menu items based on user permissions
  const buildMenuItems = useCallback(() => {
    let menuItems = [...baseMenuItems];

    if (
      (currentUser && currentUser?.role === "ADMIN") ||
      currentUser?.role === "MANAGER"
    ) {
      menuItems.push(adminMenuItem);
    }

    return menuItems;
  }, [currentUser]);

  const menuItems = buildMenuItems();

  // Event handlers
  const toggleUserMenu = () => setUserMenuOpen(!isUserMenuOpen);
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
    setActiveSubmenu(null);
  };
  const toggleSubmenu = (index) => {
    setActiveSubmenu(activeSubmenu === index ? null : index);
  };

  // Enhanced logout handler with better error handling
  const handleLogout = async () => {
    try {
      setUserMenuOpen(false);
      logout();
      toast.success("Logged out successfully");
      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Failed to logout. Please try again.");
    }
  };

  // Enhanced menu item click handler
  const handleMenuItemClick = (e, item, isMobile = false) => {
    // Handle authentication requirements
    if (item.requiresAuth && !currentUser) {
      e.preventDefault();
      navigate("/login");
      return;
    }

    // Handle role requirements
    if (item.requiresRole && currentUser?.role !== item.requiresRole) {
      e.preventDefault();
      toast.error("Access denied");
      return;
    }

    // Handle custom onClick
    if (item.onClick && !item.onClick(e, item.path)) {
      return;
    }

    // Handle submenu toggle
    if (item.submenu) {
      e.preventDefault();
      if (isMobile) {
        toggleSubmenu(menuItems.indexOf(item));
      }
      return;
    }

    // Close mobile menu on navigation
    if (isMobile) {
      setMobileMenuOpen(false);
      setActiveSubmenu(null);
    }
  };

  return (
    <Header>
      {/* Logo Section */}
      <LogoSection>
        <LogoLink as={NavLink} to="/">
          <LogoIcon>
            <Hotel size={32} />
          </LogoIcon>
          <LogoText>Elbasha Hotel</LogoText>
        </LogoLink>
      </LogoSection>

      {/* Desktop Navigation */}
      <DesktopNav>
        {menuItems.map((item, index) => (
          <NavItemWrapper key={index}>
            <NavItem
              as={NavLink}
              to={item.path || "#"}
              className={item.submenu ? "has-submenu" : ""}
              onClick={(e) => handleMenuItemClick(e, item)}
            >
              {item.icon}
              <span>{item.label}</span>
              {item.submenu && (
                <SubmenuArrow
                  className={activeSubmenu === index ? "rotated" : ""}
                >
                  <ChevronDown />
                </SubmenuArrow>
              )}
            </NavItem>

            {item.submenu && (
              <Submenu className={activeSubmenu === index ? "active" : ""}>
                {item.submenu.map((subitem, subindex) => (
                  <SubmenuItem
                    as={NavLink}
                    key={subindex}
                    to={subitem.path}
                    onClick={(e) => {
                      if (
                        subitem.onClick &&
                        !subitem.onClick(e, subitem.path)
                      ) {
                        return;
                      }
                      setActiveSubmenu(null);
                    }}
                  >
                    {subitem.label}
                  </SubmenuItem>
                ))}
              </Submenu>
            )}
          </NavItemWrapper>
        ))}
      </DesktopNav>

      {/* Right Section */}
      <RightSection>
        {/* User Menu */}
        <UserMenu ref={menuRef}>
          <UserButton
            onClick={toggleUserMenu}
            aria-label="User menu"
            aria-expanded={isUserMenuOpen}
          >
            <Username>{currentUser?.firstName || "Guest"}</Username>
            <DropdownArrow className={isUserMenuOpen ? "rotated" : ""}>
              <ChevronDown />
            </DropdownArrow>
          </UserButton>

          {isUserMenuOpen && (
            <UserMenuDropdown role="menu">
              {currentUser ? (
                <>
                  <MenuItem
                    as={NavLink}
                    to={`/users/${currentUser.id}`}
                    className="profile-link"
                    role="menuitem"
                  >
                    <MenuAvatar
                      src={
                        currentUser?.profileImageUrl ||
                        "https://img.freepik.com/premium-vector/3d-vector-icon-simple-blue-user-profile-icon-with-white-features_6011-1575.jpg"
                      }
                      alt="Profile"
                    />
                    <UserInfo>
                      <UserName>
                        {currentUser.firstName} {currentUser.lastName}
                      </UserName>
                      <UserRole>{currentUser.role}</UserRole>
                    </UserInfo>
                  </MenuItem>
                  <MenuDivider />
                  <MenuItem
                    as="button"
                    className="logout-item"
                    onClick={handleLogout}
                    role="menuitem"
                  >
                    Logout
                  </MenuItem>
                </>
              ) : (
                <MenuItem
                  as={NavLink}
                  to="/login"
                  className="login-item"
                  role="menuitem"
                >
                  Login
                </MenuItem>
              )}
            </UserMenuDropdown>
          )}
        </UserMenu>

        {/* Mobile Menu Toggle */}
        <MobileMenuToggle
          onClick={toggleMobileMenu}
          aria-label="Toggle mobile menu"
          aria-expanded={isMobileMenuOpen}
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </MobileMenuToggle>
      </RightSection>

      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <MobileMenuOverlay onClick={toggleMobileMenu}>
          <MobileMenu ref={mobileMenuRef} onClick={(e) => e.stopPropagation()}>
            <MobileMenuHeader>
              <MobileLogo>
                <BookOpen size={32} />
                <span>Elbasha Hotel</span>
              </MobileLogo>
              <CloseBtn
                onClick={toggleMobileMenu}
                aria-label="Close mobile menu"
              >
                <X />
              </CloseBtn>
            </MobileMenuHeader>

            <MobileNav>
              {menuItems.map((item, index) => (
                <MobileNavItemWrapper key={index}>
                  <MobileNavItem
                    as={NavLink}
                    to={item.path || "#"}
                    className={item.submenu ? "has-submenu" : ""}
                    onClick={(e) => handleMenuItemClick(e, item, true)}
                  >
                    {item.icon}
                    <span>{item.label}</span>
                    {item.submenu && (
                      <SubmenuArrow
                        className={activeSubmenu === index ? "rotated" : ""}
                      >
                        <ChevronDown />
                      </SubmenuArrow>
                    )}
                  </MobileNavItem>

                  {item.submenu && activeSubmenu === index && (
                    <MobileSubmenu>
                      {item.submenu.map((subitem, subindex) => (
                        <MobileSubmenuItem
                          as={NavLink}
                          key={subindex}
                          to={subitem.path}
                          onClick={(e) => {
                            if (
                              subitem.onClick &&
                              !subitem.onClick(e, subitem.path)
                            ) {
                              return;
                            }
                            setMobileMenuOpen(false);
                            setActiveSubmenu(null);
                          }}
                        >
                          {subitem.label}
                        </MobileSubmenuItem>
                      ))}
                    </MobileSubmenu>
                  )}
                </MobileNavItemWrapper>
              ))}
            </MobileNav>

            {/* Mobile User Section */}
            <MobileUserSection>
              {currentUser ? (
                <>
                  <MobileProfileLink
                    as={NavLink}
                    to={`/users/${currentUser.id}`}
                  >
                    <MobileAvatar
                      src={
                        currentUser?.profileImageUrl ||
                        "https://img.freepik.com/premium-vector/3d-vector-icon-simple-blue-user-profile-icon-with-white-features_6011-1575.jpg"
                      }
                      alt="Profile"
                    />
                    <MobileUserInfo>
                      <MobileUserName>
                        {currentUser.firstName} {currentUser.lastName}
                      </MobileUserName>
                      <MobileUserRole>{currentUser.role}</MobileUserRole>
                    </MobileUserInfo>
                  </MobileProfileLink>
                  <MobileLogoutBtn
                    onClick={() => {
                      handleLogout();
                      setMobileMenuOpen(false);
                    }}
                  >
                    Logout
                  </MobileLogoutBtn>
                </>
              ) : (
                <MobileLoginBtn as={NavLink} to="/login">
                  Login
                </MobileLoginBtn>
              )}
            </MobileUserSection>
          </MobileMenu>
        </MobileMenuOverlay>
      )}
    </Header>
  );
}
