export interface NavItem {
  label: string;
  path: string;
  icon?: string;
  iconSelected?: string;
  exact?: boolean;
  queryParams?: Record<string, string>;
}
