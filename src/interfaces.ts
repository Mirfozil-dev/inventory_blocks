export interface ImagesInterface {
    green: string;
    yellow: string;
    blue: string;
  }
export interface BlockInterface {
    id: number;
    count: number;
    cell_id: number;
    color: keyof ImagesInterface;
  }