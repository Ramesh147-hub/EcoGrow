export type TabId = 'home' | 'sensors' | 'motor' | 'weather' | 'stats' | 'settings';

export interface NavItem {
  id: TabId;
  label: string;
  icon: string;
}
