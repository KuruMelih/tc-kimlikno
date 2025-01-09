# TC-KimlikNo

TC Kimlik Numarası doğrulama paketi. Bu paket ile TC Kimlik numaralarını hem algoritma ile hem de NVI (Nüfus ve Vatandaşlık İşleri) servisi üzerinden doğrulayabilirsiniz.

![npm](https://img.shields.io/npm/v/tc-kimlikno)
![license](https://img.shields.io/npm/l/tc-kimlikno)

## Özellikler

- ✨ TC Kimlik numarası algoritma kontrolü
- 🔄 NVI servisi üzerinden kimlik doğrulama
- 📦 TypeScript desteği
- ⚡ Promise tabanlı API
- 🔒 Güvenli ve güncel

## Kurulum

```bash
npm install tc-kimlikno
# veya
yarn add tc-kimlikno
# veya
pnpm add tc-kimlikno
```

## Kullanım

### Algoritma ile Doğrulama

TC Kimlik numarasının matematiksel algoritmasını kontrol eder:

```typescript
import { TCKimlikNoDogrulayici } from 'tc-kimlikno';

const sonuc = TCKimlikNoDogrulayici.algoritmaDogrula('10000000146');
console.log('Algoritma Doğrulama:', sonuc); // true veya false
```

### NVI Servisi ile Doğrulama

TC Kimlik numarasını ve kişi bilgilerini NVI servisi üzerinden doğrular:

```typescript
import { TCKimlikNoDogrulayici } from 'tc-kimlikno';

async function kimlikDogrula() {
  try {
    const sonuc = await TCKimlikNoDogrulayici.nviDogrula({
      TCKimlikNo: '10000000146',
      Ad: 'ADI',
      Soyad: 'SOYADI',
      DogumYili: 1990
    });
    console.log('NVI Doğrulama:', sonuc); // true veya false
  } catch (error) {
    console.error('Hata:', error.message);
  }
}

kimlikDogrula();
```

## API

### `TCKimlikNoDogrulayici.algoritmaDogrula(tcKimlikNo: string): boolean`

TC Kimlik numarasının matematiksel algoritmasını kontrol eder.

**Parametreler:**
- `tcKimlikNo` (string): Kontrol edilecek TC Kimlik numarası

**Dönüş:**
- `boolean`: TC Kimlik numarası geçerli ise `true`, değilse `false`

### `TCKimlikNoDogrulayici.nviDogrula(params: TCKimlikNoDogrulaParams): Promise<boolean>`

TC Kimlik numarasını ve kişi bilgilerini NVI servisi üzerinden doğrular.

**Parametreler:**
- `params` (object):
  - `TCKimlikNo` (string): TC Kimlik numarası
  - `Ad` (string): Kişinin adı
  - `Soyad` (string): Kişinin soyadı
  - `DogumYili` (number): Kişinin doğum yılı

**Dönüş:**
- `Promise<boolean>`: Bilgiler doğru ise `true`, değilse `false`

## Lisans

MIT © 2024 