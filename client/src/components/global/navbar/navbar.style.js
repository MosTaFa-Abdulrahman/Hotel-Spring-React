import styled, { keyframes, css } from "styled-components";

// ============================================
// ANIMATIONS
// ============================================
const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const slideInRight = keyframes`
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(0);
  }
`;

const slideInLeft = keyframes`
  from {
    transform: translateX(-100%);
  }
  to {
    transform: translateX(0);
  }
`;

const slideDown = keyframes`
  from {
    opacity: 0;
    max-height: 0;
  }
  to {
    opacity: 1;
    max-height: 500px;
  }
`;

const dropdownSlide = keyframes`
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

// ============================================
// RESPONSIVE BREAKPOINTS
// ============================================
const breakpoints = {
  sm: "640px",
  md: "768px",
  lg: "1024px",
  xl: "1280px",
};

const respond = {
  sm: (styles) => css`
    @media (max-width: ${breakpoints.sm}) {
      ${styles}
    }
  `,
  md: (styles) => css`
    @media (max-width: ${breakpoints.md}) {
      ${styles}
    }
  `,
  lg: (styles) => css`
    @media (max-width: ${breakpoints.lg}) {
      ${styles}
    }
  `,
  xl: (styles) => css`
    @media (max-width: ${breakpoints.xl}) {
      ${styles}
    }
  `,
};

// ============================================
// HEADER COMPONENT
// ============================================
export const Header = styled.header`
  height: 70px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 30px;
  border-bottom: 1px solid #e5e7eb;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  background: linear-gradient(135deg, #ffffff 0%, #f9fafb 100%);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);

  ${respond.lg(css`
    padding: 0 25px;
    height: 65px;
  `)}

  ${respond.md(css`
    padding: 0 20px;
    height: 60px;
  `)}

  ${respond.sm(css`
    padding: 0 15px;
    height: 55px;
  `)}
`;

// ============================================
// LOGO SECTION
// ============================================
export const LogoSection = styled.div`
  display: flex;
  align-items: center;
  z-index: 10;
`;

export const LogoLink = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  text-decoration: none;
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;

  &:hover {
    transform: scale(1.05);
  }
`;

export const LogoIcon = styled.div`
  width: 45px;
  height: 45px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
  transition: box-shadow 0.3s ease;
  color: #f093fb;

  ${respond.md(css`
    width: 35px;
    height: 35px;
  `)}

  ${respond.sm(css`
    width: 30px;
    height: 30px;
  `)}

  svg {
    width: 100%;
    height: 100%;
  }
`;

export const LogoText = styled.span`
  font-size: 24px;
  font-weight: 700;
  letter-spacing: 0.5px;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  color: #1f2937;

  ${respond.lg(css`
    font-size: 20px;
  `)}

  ${respond.md(css`
    font-size: 18px;
  `)}

  ${respond.sm(css`
    display: none;
  `)}
`;

// ============================================
// DESKTOP NAVIGATION
// ============================================
export const DesktopNav = styled.nav`
  display: flex;
  align-items: center;
  gap: 8px;
  flex: 1;
  justify-content: center;

  ${respond.lg(css`
    display: none;
  `)}
`;

export const Submenu = styled.div`
  position: absolute;
  top: calc(100% + 10px);
  left: 50%;
  border-radius: 12px;
  border: 1px solid #e5e7eb;
  min-width: 200px;
  opacity: 0;
  visibility: hidden;
  transform: translateX(-50%) translateY(-10px);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: 1000;
  background: #ffffff;
  backdrop-filter: blur(20px);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);

  &::before {
    content: "";
    position: absolute;
    top: -8px;
    left: 50%;
    width: 16px;
    height: 16px;
    background: #ffffff;
    border: 1px solid #e5e7eb;
    border-bottom: none;
    border-right: none;
    transform: translateX(-50%) rotate(45deg);
  }

  &.active {
    opacity: 1;
    visibility: visible;
    transform: translateX(-50%) translateY(0);
  }
`;

export const SubmenuItem = styled.div`
  display: block;
  padding: 12px 20px;
  text-decoration: none;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.3s ease;
  border-radius: 8px;
  margin: 4px 8px;
  color: #1f2937;
  cursor: pointer;

  &:hover {
    background: #f3f4f6;
    transform: translateX(4px);
  }

  &.active {
    background: #e868f7ff;
    color: #ffffff;
  }

  &:first-child {
    margin-top: 8px;
  }

  &:last-child {
    margin-bottom: 8px;
  }
`;

export const NavItemWrapper = styled.div`
  position: relative;

  &:hover ${Submenu} {
    opacity: 1;
    visibility: visible;
    transform: translateX(-50%) translateY(0);
  }
`;

export const NavItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 20px;
  text-decoration: none;
  font-weight: 500;
  font-size: 14px;
  border-radius: 25px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
  color: #6b7280;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid #e5e7eb;
  backdrop-filter: blur(10px);
  cursor: pointer;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.2),
      transparent
    );
    transition: left 0.5s ease;
  }

  &:hover {
    background: #f3f4f6;
    color: #1f2937;
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);

    &::before {
      left: 100%;
    }
  }

  &.active {
    background: #a94fb3ff;
    color: #ffffff;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  }

  svg {
    width: 18px;
    height: 18px;
    flex-shrink: 0;
  }
`;

export const SubmenuArrow = styled.span`
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  margin-left: 4px;
  display: flex;
  align-items: center;

  &.rotated {
    transform: rotate(180deg);
  }

  svg {
    width: 16px;
    height: 16px;
  }
`;

// ============================================
// RIGHT SECTION
// ============================================
export const RightSection = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;

  ${respond.sm(css`
    gap: 10px;
  `)}
`;

// ============================================
// USER MENU
// ============================================
export const UserMenu = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const UserButton = styled.button`
  display: flex;
  align-items: center;
  border-radius: 25px;
  padding: 8px 16px;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  gap: 8px;
  border: 1px solid #e5e7eb;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);

  &:hover {
    background: #f3f4f6;
    transform: translateY(-1px);
  }

  ${respond.md(css`
    padding: 6px 12px;
  `)}

  ${respond.sm(css`
    display: none;
  `)}
`;

export const Username = styled.span`
  font-weight: 500;
  font-size: 14px;
  max-width: 120px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: #1f2937;

  ${respond.md(css`
    max-width: 80px;
    font-size: 13px;
  `)}
`;

export const DropdownArrow = styled.span`
  width: 16px;
  height: 16px;
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  color: #1f2937;
  display: flex;
  align-items: center;

  &.rotated {
    transform: rotate(180deg);
  }

  svg {
    width: 100%;
    height: 100%;
  }
`;

export const UserMenuDropdown = styled.div`
  position: absolute;
  top: calc(100% + 10px);
  right: 0;
  border-radius: 12px;
  border: 1px solid #e5e7eb;
  min-width: 220px;
  z-index: 1000;
  overflow: hidden;
  animation: ${dropdownSlide} 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  background: #ffffff;
  backdrop-filter: blur(20px);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);

  &::before {
    content: "";
    position: absolute;
    top: -8px;
    right: 20px;
    width: 16px;
    height: 16px;
    background: #ffffff;
    border: 1px solid #e5e7eb;
    border-bottom: none;
    border-right: none;
    transform: rotate(45deg);
  }

  ${respond.sm(css`
    right: -10px;
    min-width: 200px;
  `)}
`;

export const MenuItem = styled.button`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 16px;
  cursor: pointer;
  font-size: 14px;
  text-decoration: none;
  transition: all 0.3s ease;
  border-radius: 8px;
  margin: 4px 8px;
  background: none;
  border: none;
  width: calc(100% - 16px);
  color: #1f2937;
  text-align: left;

  &:hover {
    background: #f3f4f6;
    transform: translateX(4px);
  }

  &.profile-link {
    padding: 16px;
    border-bottom: 1px solid #e5e7eb;
    margin: 0;
    border-radius: 0;

    &:hover {
      background: #f3f4f6;
      transform: none;
    }
  }

  &.logout-item {
    color: #e53e3e;
    font-weight: 500;

    &:hover {
      background: #e53e3e;
      color: white;
    }
  }

  &.login-item {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    font-weight: 600;
    justify-content: center;
    margin: 8px;
    border-radius: 8px;

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
    }
  }
`;

export const MenuAvatar = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid #e5e7eb;
`;

export const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

export const UserName = styled.span`
  font-weight: 600;
  font-size: 15px;
  color: #1f2937;
`;

export const UserRole = styled.span`
  font-size: 12px;
  text-transform: capitalize;
  color: #6b7280;
`;

export const MenuDivider = styled.hr`
  margin: 8px 0;
  border: none;
  height: 1px;
  background: #e5e7eb;
`;

// ============================================
// MOBILE MENU
// ============================================
export const MobileMenuToggle = styled.button`
  display: none;
  border-radius: 8px;
  width: 44px;
  height: 44px;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border: 1px solid #e5e7eb;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);

  &:hover {
    background: #f3f4f6;
    transform: translateY(-2px) scale(1.05);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);

    svg {
      transform: rotate(90deg);
    }
  }

  ${respond.lg(css`
    display: flex;
  `)}

  ${respond.sm(css`
    width: 38px;
    height: 38px;
  `)}

  svg {
    width: 22px;
    height: 22px;
    transition: all 0.3s ease;
    color: #1f2937;

    ${respond.sm(css`
      width: 20px;
      height: 20px;
    `)}
  }
`;

export const MobileMenuOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(10px);
  z-index: 999;
  animation: ${fadeIn} 0.3s ease;
`;

export const MobileMenu = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  width: 320px;
  height: 100vh;
  overflow-y: auto;
  animation: ${slideInRight} 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  background: linear-gradient(135deg, #ffffff 0%, #f9fafb 100%);
  backdrop-filter: blur(20px);
  box-shadow: -8px 0 32px rgba(0, 0, 0, 0.2);

  ${respond.sm(css`
    width: 100%;
  `)}

  [dir="rtl"] & {
    right: unset;
    left: 0;
    animation: ${slideInLeft} 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }
`;

export const MobileMenuHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  border-bottom: 1px solid #e5e7eb;
`;

export const MobileLogo = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;

  img {
    width: 35px;
    height: 35px;
    border-radius: 8px;
    object-fit: cover;
  }

  span {
    font-size: 18px;
    font-weight: 700;
    letter-spacing: 0.5px;
    color: #f093fb;
  }

  svg {
    width: 32px;
    height: 32px;
    color: #f093fb;
  }
`;

export const CloseBtn = styled.button`
  border-radius: 8px;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 1px solid #e5e7eb;
  background: rgba(255, 255, 255, 0.1);

  svg {
    color: #1f2937;
    width: 20px;
    height: 20px;
  }

  &:hover {
    background: #f3f4f6;
    transform: rotate(90deg);
  }
`;

export const MobileNav = styled.nav`
  padding: 20px 0;
`;

export const MobileNavItemWrapper = styled.div`
  margin-bottom: 8px;
`;

export const MobileNavItem = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px 20px;
  text-decoration: none;
  font-size: 16px;
  font-weight: 500;
  transition: all 0.3s ease;
  border-left: 3px solid transparent;
  color: #6b7280;
  cursor: pointer;

  &:hover {
    background: #f3f4f6;
    border-left-color: #1f2937;
    color: #1f2937;
  }

  &.active {
    background: #eb60fbff;
    border-left-color: #1f2937;
    color: #ffffff;
  }

  svg {
    width: 20px;
    height: 20px;
    flex-shrink: 0;
  }
`;

export const MobileSubmenu = styled.div`
  animation: ${slideDown} 0.3s ease;
  background: #f9fafb;
`;

export const MobileSubmenuItem = styled.div`
  display: block;
  padding: 12px 20px 12px 50px;
  text-decoration: none;
  font-size: 14px;
  font-weight: 400;
  transition: all 0.3s ease;
  border-left: 3px solid transparent;
  color: #6b7280;
  cursor: pointer;

  &:hover {
    background: #f3f4f6;
    border-left-color: #6b7280;
    color: #1f2937;
    padding-left: 52px;
  }

  &.active {
    background: #667eea;
    border-left-color: #1f2937;
    color: #ffffff;
  }
`;

export const MobileUserSection = styled.div`
  padding: 20px;
  border-top: 1px solid #e5e7eb;
  margin-top: auto;
`;

export const MobileProfileLink = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  border-radius: 12px;
  text-decoration: none;
  margin-bottom: 12px;
  transition: all 0.3s ease;
  border: 1px solid #e5e7eb;
  background: #f3f4f6;
  color: #1f2937;
  cursor: pointer;

  &:hover {
    background: #f3acfaff;
    transform: translateY(-2px);
  }
`;

export const MobileAvatar = styled.img`
  width: 45px;
  height: 45px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid #e5e7eb;
`;

export const MobileUserInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

export const MobileUserName = styled.span`
  font-weight: 600;
  font-size: 16px;
  color: #1f2937;
`;

export const MobileUserRole = styled.span`
  font-size: 13px;
  opacity: 0.8;
  text-transform: capitalize;
  color: #6b7280;
`;

export const MobileLogoutBtn = styled.button`
  display: block;
  width: 100%;
  padding: 12px;
  background: rgba(231, 62, 62, 0.9);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  text-align: center;
  text-decoration: none;
  transition: all 0.3s ease;

  &:hover {
    background: #e53e3e;
    transform: translateY(-2px);
    box-shadow: 0 4px 15px rgba(231, 62, 62, 0.4);
  }
`;

export const MobileLoginBtn = styled.button`
  display: block;
  width: 100%;
  padding: 12px;
  background: #f3f4f6;
  color: #1f2937;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  text-align: center;
  text-decoration: none;
  transition: all 0.3s ease;

  &:hover {
    background: #f093fb;
    color: #ffffff;
    box-shadow: 0 4px 15px rgba(255, 255, 255, 0.1);
  }
`;
