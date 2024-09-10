import { Check, Info, Loader2Icon } from 'lucide-react';
import { Command as CommandPrimitive } from 'cmdk';
import { useState, useRef, useCallback, type KeyboardEvent, useEffect } from 'react';

import { CommandList } from './Command';
import { cn } from '@/libs/classnames';
import TextArea from './TextArea';

export type Option = Record<'value' | 'label', string> & Record<string, string>;

type AutoCompleteProps = {
  options: Option[];
  emptyMessage: string;
  isLoading?: boolean;
  disabled?: boolean;
  placeholder?: string;
  defaultInputValue?: string;
  onInputValueChange: (v: string) => void;
  onSetValue: (v: string) => void;
};

const AddressAutoComplete = ({
  options,
  placeholder,
  emptyMessage,
  onSetValue,
  isLoading = false,
  defaultInputValue,
  onInputValueChange,
}: AutoCompleteProps) => {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const [isOpen, setOpen] = useState(false);
  const [selected, setSelected] = useState<Option | undefined>();
  const [inputValue, setInputValue] = useState<string>('');

  useEffect(() => {
    setInputValue(defaultInputValue ?? '');
    setSelected(options.find((opt) => opt.value === defaultInputValue));
  }, [defaultInputValue]);

  const onInputChange = (v: string) => {
    setInputValue(v);
    onInputValueChange(v);
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
    setInputValue(selectedOption.value);

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
        <TextArea
          ref={textAreaRef}
          value={inputValue}
          onChange={(e) => onInputChange(e.target.value)}
          onBlur={(e) => {
            e.stopPropagation();
            e.preventDefault();
            handleBlur();
          }}
          onFocus={() => setOpen(true)}
          placeholder={placeholder}
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
                <div className="px-1 py-3 flex justify-center">
                  <Loader2Icon className="animate-spin" />
                </div>
              </CommandPrimitive.Loading>
            ) : null}

            {/* {options.length > 0 && !isLoading && (
              <CommandGroup>
                {options.map((option) => {
                  const isSelected = selected?.value === option.value;
                  return (
                    <CommandItem
                      key={option.value}
                      value={option.label}
                      disabled={false}
                      onMouseDown={(event) => {
                        event.preventDefault();
                        event.stopPropagation();
                      }}
                      onSelect={() => handleSelectOption(option)}
                      className={cn('flex w-full z-50 items-center gap-2', {
                        'pl-8': !isSelected,
                      })}
                    >
                      {isSelected && <Check className="w-4" />}

                      {option.label}
                    </CommandItem>
                  );
                })}
              </CommandGroup>
            )} */}

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
                        'relative flex cursor-pointer select-none items-start text-left rounded-sm px-2 py-1.5 text-sm outline-none aria-selected:bg-slate-100 aria-selected:text-slate-900 data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50 w-full z-50 gap-2 hover:bg-slate-100',
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
              <button
                type="button"
                onMouseDown={() => {
                  handleSelectOption({ label: inputValue, value: inputValue });
                  setOpen(false);
                }}
                className={cn(
                  'relative flex cursor-pointer select-none items-center text-left rounded-sm px-2 py-1.5 text-sm outline-none aria-selected:bg-slate-100 aria-selected:text-slate-900 data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50 w-full z-50 gap-2 hover:bg-slate-100',
                )}
              >
                <Info className="w-4" />

                {inputValue || emptyMessage}
              </button>
            )}
          </CommandList>
        </div>
      </div>
    </CommandPrimitive>
  );
};

export default AddressAutoComplete;
