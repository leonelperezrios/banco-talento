
import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  ElementRef,
  HostListener,
  computed,
  forwardRef,
  inject,
  input,
  model,
  signal,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

export interface Option {
  value: string;
  label: string;
}

@Component({
  selector: 'app-select',
  standalone: true,
  imports: [CommonModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => Select),
      multi: true,
    },
  ],
  templateUrl: './select.html',
})
export class Select implements ControlValueAccessor {
  private readonly el = inject(ElementRef<HTMLElement>);

  options = input<Option[]>([]);
  placeholder = input('Select an option');
  className = input('');
  defaultValue = input('');
  disabled = input(false);

  enableSearch = input(true);
  searchPlaceholder = input('Buscar...');
  emptyText = input('Sin resultados');

  // CVA value
  value = model<string>('');

  valueChange = new EventEmitter<string>();

  private onChangeFn: (value: string) => void = () => {};
  onTouched: () => void = () => {};

  isOpen = signal(false);
  query = signal('');

  selectedLabel = computed(() => {
    const v = this.value();
    if (!v) return '';
    return this.options().find((o) => o.value === v)?.label ?? '';
  });

  filteredOptions = computed(() => {
    const q = this.query().trim().toLowerCase();
    const opts = this.options();
    if (!this.enableSearch() || !q) return opts;
    return opts.filter((o) => o.label.toLowerCase().includes(q));
  });

  buttonClasses = computed(() => {
    const base = this.className();
    if (this.disabled()) {
      return `relative pr-10 text-gray-500 border-gray-300 opacity-40 bg-gray-100 cursor-not-allowed dark:bg-gray-800 dark:text-gray-400 dark:border-gray-700 ${base}`;
    }
    return `relative pr-10 bg-transparent text-gray-800 border-gray-300 focus:border-brand-300 focus:ring-brand-500/20 dark:border-gray-700 dark:text-white/90 dark:focus:border-brand-800 ${base}`;
  });

  writeValue(value: string | null): void {
    const next = value ?? '';
    this.value.set(next);
    if (!next && this.defaultValue()) {
      this.value.set(this.defaultValue());
    }
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChangeFn = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {

    (this.disabled as any).set?.(isDisabled);
  }

  toggle() {
    if (this.disabled()) return;
    this.isOpen.update((v) => !v);
    if (this.isOpen()) {
      this.query.set('');
    }
  }

  close() {
    this.isOpen.set(false);
    this.query.set('');
  }

  select(nextValue: string) {
    if (this.disabled()) return;
    this.value.set(nextValue);
    this.onChangeFn(nextValue);
    this.valueChange.emit(nextValue);
    this.close();
  }

  onQueryInput(event: Event) {
    const inputEl = event.target as HTMLInputElement;
    this.query.set(inputEl.value);
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    if (!this.isOpen()) return;
    const target = event.target as Node | null;
    const root = this.el.nativeElement;
    if (root && target && !root.contains(target)) {
      this.close();
    }
  }
}