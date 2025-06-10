declare global {
  interface Window {
    Telegram: TelegramNamespace;
  }

  interface TelegramNamespace {
    WebApp: WebApp;
  }

  interface WebApp {
    initData: string;
    initDataUnsafe: {
      query_id?: string;
      user?: WebAppUser;
      receiver?: WebAppUser;
      chat?: WebAppChat;
      chat_type?: string;
      chat_instance?: string;
      start_param?: string;
    };
    version: string;
    platform: string;
    colorScheme: 'light' | 'dark';
    isExpanded: boolean;
    viewportHeight: number;
    viewportStableHeight: number;
    headerColor: string;
    backgroundColor: string;
    themeParams: {
      bg_color?: string;
      text_color?: string;
      hint_color?: string;
      link_color?: string;
      button_color?: string;
      button_text_color?: string;
    };
    isClosingConfirmationEnabled: boolean;

    expand(): void;
    close(): void;
    ready(): void;
    sendData(data: string): void;
    enableClosingConfirmation(): void;
    disableClosingConfirmation(): void;

    onEvent(eventType: string, callback: () => void): void;
    offEvent(eventType: string, callback: () => void): void;

    MainButton: WebAppMainButton;
    BackButton: WebAppBackButton;
    HapticFeedback: WebAppHapticFeedback;
  }

  interface WebAppUser {
    id: number;
    is_bot: boolean;
    first_name: string;
    last_name?: string;
    username?: string;
    language_code?: string;
    allows_write_to_pm?: boolean;
  }

  interface WebAppChat {
    id: number;
    type: string;
    title?: string;
    username?: string;
    photo_url?: string;
  }

  interface WebAppMainButton {
    text: string;
    color?: string;
    text_color?: string;
    isVisible: boolean;
    isProgressVisible: boolean;
    isActive: boolean;

    setText(text: string): this;
    onClick(callback: () => void): this;
    show(): this;
    hide(): this;
    enable(): this;
    disable(): this;
    showProgress(leaveActive?: boolean): this;
    hideProgress(): this;
    setParams(params: {
      text?: string;
      color?: string;
      text_color?: string;
      is_active?: boolean;
      is_visible?: boolean;
    }): this;
  }

  interface WebAppBackButton {
    isVisible: boolean;

    onClick(callback: () => void): void;
    show(): void;
    hide(): void;
  }

  interface WebAppHapticFeedback {
    impactOccurred(style: 'light' | 'medium' | 'heavy' | 'rigid' | 'soft'): void;
    notificationOccurred(type: 'error' | 'success' | 'warning'): void;
    selectionChanged(): void;
  }
}

export {}; // Это нужно, чтобы TypeScript признал файл модулем, но без глобального экспорта

