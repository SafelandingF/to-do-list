import { useEffect } from 'react';

type KeyboardKey =
  | 'F12'
  | 'F5'
  | 'CommandOrControl'
  | 'Control'
  | 'Shift'
  | 'Alt';

export interface ShorcutsBind {
  keyboardKey: KeyboardKey[];
  handler: (e: KeyboardEvent) => void;
}

// 全局快捷键 shortcuts 快捷键数组
// condition 条件函数，如果返回 false 则不执行快捷键绑定
export const useGlobalShortcuts = (
  shortcuts: ShorcutsBind[],
  condition?: (e: KeyboardEvent) => void
) => {
  useEffect(() => {
    //在_handler拦截不需要的事件
    const _handler = (e: KeyboardEvent) => {
      const target = e.target as Element;
      if (target instanceof HTMLInputElement) {
        if (
          [
            'email',
            'number',
            'range',
            'tel',
            'text',
            'time',
            'url',
            'week'
          ].includes(target.type)
        )
          return;
      }
      if (target instanceof HTMLTextAreaElement) return;
      const _condition = condition ? condition(e) : true;
      if (_condition) {
        handleKeyboardEvent(e, shortcuts);
      }
    };

    // 处理快捷键事件关键处理流程
    const handleKeyboardEvent = (
      e: KeyboardEvent,
      shortcuts: ShorcutsBind[]
    ) => {
      const _valid = (e: KeyboardEvent, keys: KeyboardKey[]) => {
        const _normalKeys = keys.filter((key) => {
          return !['CommandOrControl', 'Control', 'Shift', 'Alt'].includes(key);
        });
        if (_normalKeys.length !== 1) return;
        const _key = _normalKeys[0];
        const _isSameKey = (key: string) => {
          key = key.toLowerCase();
          const eKey = e.key.toLowerCase();
          const eCodeKey = e.code.toLowerCase().replace('key', '');
          return key && (key == eKey || key == eCodeKey);
        };

        if (!_isSameKey(_key)) return false;

        if (e.ctrlKey !== keys.includes('CommandOrControl')) return false;
        if (e.shiftKey !== keys.includes('Shift')) return false;
        if (e.altKey !== keys.includes('Alt')) return false;

        return true;
      };

      shortcuts.forEach((shortcuts) => {
        const { keyboardKey, handler } = shortcuts;
        if (keyboardKey.length && _valid(e, keyboardKey)) {
          try {
            handler?.(e);
          } catch (err) {
            console.error(err);
          }
        }
      });
    };

    window.addEventListener('keydown', _handler);

    return () => {
      window.removeEventListener('keydown', _handler);
    };
  }, [shortcuts, condition]);
};
