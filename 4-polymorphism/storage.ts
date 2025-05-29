export type HistoryEvent = {
  type: 'history';
  payload: string;
} | {
  type: 'event';
  payload: string;
};

export type HistoryData = {
  history: string[];
  events: string[];
};

const initialData = {
  history: [],
  events: [],
};

export class HistoryStorage {
  private data: HistoryData = initialData;
  private storage: LocalStorage;

  constructor(private name: string) {
    this.storage = new LocalStorage();
  }

  public append(event: HistoryEvent) {
    if (event.type === 'event') {
      const events = [...this.data.events, event.payload];
      this.data.events = events;
    } else {
      const history = [...this.data.history, event.payload];
      this.data.history = history;
      this.data.events = [];
    }
    this.storage
      .save(this.name, this.data)
      .catch(e => console.error(e));
  }

  public updateAll(event: HistoryEvent) {
    this.data.events = [event.payload];
    this.storage
      .save(this.name, this.data)
      .catch(e => console.error(e));
  }

  public updateAtIndex(index: number, event: HistoryEvent) {
    if (index === this.data.events.length)
      return this.append(event);

    const events = [
      ...this.data.events.slice(0, this.data.events.length - 1),
      event.payload
    ];
    this.data.events = events;
    this.storage
      .save(this.name, this.data)
      .catch(e => console.error(e));
  }

  public async get(): Promise<HistoryData> {
    let data: HistoryData = initialData;
    try {
      data = await this.storage.load(this.name, this.data);
      this.data = data;
    } catch (error) {
      console.error(error);
    }
    return { ...this.data } as const;
  }

  public clear() {
    this.storage.clear();
    this.data = initialData;
  }
}

class LocalStorage {
  private storage: Storage = localStorage;
  
  public load<T>(name: string, defaultValue: T): Promise<T> {
    return new Promise(resolve => {
      const data = JSON.parse(
        this.storage.getItem(name) ?? 'null'
      );
      resolve(data ?? defaultValue);
    });
  }

  public save(name: string, value: unknown): Promise<void> {
    return new Promise(resolve => {
      this.storage.setItem(name, JSON.stringify(value));
      resolve();
    })
  }

  public clear() {
    this.storage.clear();
  }
}
