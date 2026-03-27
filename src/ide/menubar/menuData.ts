export interface MenuItem {
  id: string;
  label: string;
  shortcut?: string;
  disabled?: boolean;
  action?: () => void;
  divider?: boolean;
  submenu?: MenuItem[];
  checked?: boolean;
}

export interface MenuDefinition {
  label: string;
  items: MenuItem[];
}
