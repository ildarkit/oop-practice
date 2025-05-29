export interface HistoryStorageSubscriber {
  getHistory(data: { history: string[], events: string[] }): void;
}
