import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customCurrency',
  standalone: true
})
export class CustomCurrencyPipe implements PipeTransform {
  transform(value: number, currency: string = 'RUB', locale: string = 'ru-RU'): string {
    if (value == null || isNaN(value)) {
      return '';
    }

    try {
      return new Intl.NumberFormat(locale, {
        style: 'currency',
        currency: currency,
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
      }).format(value);
    } catch (error) {
      // Fallback для неподдерживаемых валют
      return `${value.toLocaleString(locale)} ₽`;
    }
  }
}
