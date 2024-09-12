import { Check, Loader2Icon, Option, PlusCircleIcon } from 'lucide-react';
import { Command as CommandPrimitive } from 'cmdk';
import { useState, useRef, useCallback, type KeyboardEvent, useEffect } from 'react';

import { CommandList } from './Command';
import { cn } from '@/libs/classnames';
import Input from './Input';

export type Option = Record<'value' | 'label', string> & Record<string, string>;

type AutoCompleteProps = {
  options: Option[];
  isLoading?: boolean;
  disabled?: boolean;
  label?: string;
  onInputValueChange?: (v: string) => void;
  onCreateNewOption?: (input: string) => void;
  onSetValue: (v: string) => void;
  value?: string;
};

const AutoComplete = ({
  options,
  label,
  onSetValue,
  value,
  isLoading = false,
  onInputValueChange,
  onCreateNewOption,
}: AutoCompleteProps) => {
  const textAreaRef = useRef<HTMLInputElement>(null);

  const [isOpen, setOpen] = useState(false);
  const [selected, setSelected] = useState<Option | undefined>();
  const [inputValue, setInputValue] = useState<string>('');

  useEffect(() => {
    setSelected(options.find((opt) => opt.value === value));
  }, [value, options]);

  const onInputChange = (v: string) => {
    setInputValue(v);
    !!onInputValueChange && onInputValueChange(v);
  };

  const handleKeyDown = useCallback(
    (event: KeyboardEvent<HTMLDivElement>) => {
      const input = textAreaRef.current;
      if (!input) {
        return;
      }

      // Keep the options displayed when the user is typing
      if (!isOpen) {
        setOpen(true);
      }

      // This is not a default behaviour of the <input /> field
      if (event.key === 'Enter' && input.value !== '') {
        const optionToSelect = options.find((option) => option.label === input.value);
        if (optionToSelect) {
          setSelected(optionToSelect);
          onSetValue(optionToSelect.value);
        }
      }

      if (event.key === 'Escape') {
        input.blur();
      }
    },
    [isOpen, options, onSetValue],
  );

  const handleBlur = useCallback(() => {
    setOpen(false);
    // setInputValue(selected?.label ?? '');
  }, [selected]);

  const handleSelectOption = (selectedOption: Option) => {
    setInputValue(selectedOption.label);

    setSelected(selectedOption);
    onSetValue(selectedOption.value);

    // This is a hack to prevent the input from being focused after the user selects an option
    // We can call this hack: "The next tick"
    setTimeout(() => {
      textAreaRef?.current?.blur();
    }, 0);
  };

  return (
    <CommandPrimitive onKeyDown={handleKeyDown}>
      <div>
        <Input
          ref={textAreaRef}
          value={inputValue}
          onChange={(e) => onInputChange(e.target.value)}
          onBlur={(e) => {
            e.stopPropagation();
            e.preventDefault();
            handleBlur();
          }}
          onFocus={() => setOpen(true)}
          label={label}
          autoComplete="off"
          className="text-base"
        />
      </div>

      <div className="relative mt-1">
        <div
          className={cn(
            'animate-in fade-in-0 zoom-in-95 absolute top-0 z-10 w-full rounded-xl bg-white outline-none',
            isOpen ? 'block' : 'hidden',
          )}
        >
          <CommandList className="rounded-lg ring-1 ring-slate-200">
            {isLoading ? (
              <CommandPrimitive.Loading>
                <div className="p-1">
                  <Loader2Icon className="animate-spin" />
                </div>
              </CommandPrimitive.Loading>
            ) : null}

            {!!options.length && !isLoading && (
              <>
                {options.map((opt) => {
                  const isSelected = selected?.value === opt.value;

                  return (
                    <button
                      key={opt.value}
                      type="button"
                      onMouseDown={() => {
                        handleSelectOption(opt);
                        setOpen(false);
                      }}
                      className={cn(
                        'relative flex cursor-pointer select-none items-start text-left rounded-sm px-2 py-3 text-sm outline-none aria-selected:bg-slate-100 aria-selected:text-slate-900 data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50 w-full z-50 gap-2 hover:bg-slate-100',
                        {
                          'pl-8': !isSelected,
                        },
                      )}
                    >
                      {isSelected && <Check className="w-4" />}

                      {opt.label}
                    </button>
                  );
                })}
              </>
            )}
            {!isLoading && !options.length && (
              <>
                <button
                  type="button"
                  onMouseDown={() => {
                    onCreateNewOption && onCreateNewOption(inputValue);
                    setOpen(false);
                  }}
                  className={cn(
                    'relative flex justify-between cursor-pointer select-none items-start text-left rounded-sm px-2 py-3 text-sm outline-none aria-selected:bg-slate-100 aria-selected:text-slate-900 data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50 w-full z-50 gap-2 hover:bg-slate-100',
                  )}
                >
                  <div className="flex items-center gap-3 px-4">{inputValue}</div>

                  <PlusCircleIcon />
                </button>
              </>
            )}
          </CommandList>
        </div>
      </div>
    </CommandPrimitive>
  );
};

export default AutoComplete;
