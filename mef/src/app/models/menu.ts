export interface Menu {
  heading?: string;
  id?: string;
  titre?: string;
  icon?: string;
  url?: string;
  active?: boolean;
  sousMenu?: Array<Menu>;
}
