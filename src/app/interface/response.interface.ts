export interface IResponse<T> {
  statusCode: number;
  success: boolean;
  message: string;
  data?: T;
  metadata?: {
    totalCount: number;
    pendingCount: number;
    completedCount: number;
    limit:number;
    page: number;
  };
}
