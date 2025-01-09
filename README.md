# TCKN Validator

TC Kimlik Numarası doğrulama paketi. Bu paket ile TC Kimlik numaralarını hem algoritma ile hem de NVI (Nüfus ve Vatandaşlık İşleri) servisi üzerinden doğrulayabilirsiniz.

![npm](https://img.shields.io/npm/v/@tckn/validator)
![license](https://img.shields.io/npm/l/@tckn/validator)

## Özellikler

- ✨ TC Kimlik numarası algoritma kontrolü
- 🔄 NVI servisi üzerinden kimlik doğrulama
- 📦 TypeScript desteği
- ⚡ Promise tabanlı API
- 🔒 Güvenli ve güncel

## Kurulum

```bash
npm install @tckn/validator
# veya
yarn add @tckn/validator
# veya
pnpm add @tckn/validator
```

## Örnek Proje Oluşturma

### TypeScript ile Kullanım

1. Yeni bir TypeScript projesi oluşturun:
```bash
mkdir tckn-ornek
cd tckn-ornek
npm init -y
npm install typescript ts-node @types/node --save-dev
npm install @tckn/validator
```

2. `tsconfig.json` dosyası oluşturun:
```json
{
  "compilerOptions": {
    "target": "es2018",
    "module": "commonjs",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "outDir": "./dist"
  }
}
```

3. `src/index.ts` dosyası oluşturun:
```typescript
import { TCKimlikNoDogrulayici } from '@tckn/validator';

// Algoritma kontrolü
const tcNo = '10000000146';
const algoritmaKontrol = TCKimlikNoDogrulayici.algoritmaDogrula(tcNo);
console.log('Algoritma Kontrolü:', algoritmaKontrol);

// NVI servisi ile doğrulama
async function kimlikDogrula() {
  try {
    const sonuc = await TCKimlikNoDogrulayici.nviDogrula({
      TCKimlikNo: tcNo,
      Ad: 'ADI',
      Soyad: 'SOYADI',
      DogumYili: 1990
    });
    console.log('NVI Doğrulama:', sonuc);
  } catch (error) {
    console.error('Hata:', error);
  }
}

kimlikDogrula();
```

4. `package.json` dosyasına script ekleyin:
```json
{
  "scripts": {
    "start": "ts-node src/index.ts"
  }
}
```

5. Uygulamayı çalıştırın:
```bash
npm start
```

### JavaScript ile Kullanım

1. Yeni bir JavaScript projesi oluşturun:
```bash
mkdir tckn-ornek
cd tckn-ornek
npm init -y
npm install @tckn/validator
```

2. `index.js` dosyası oluşturun:
```javascript
const { TCKimlikNoDogrulayici } = require('@tckn/validator');

// Algoritma kontrolü
const tcNo = '10000000146';
const algoritmaKontrol = TCKimlikNoDogrulayici.algoritmaDogrula(tcNo);
console.log('Algoritma Kontrolü:', algoritmaKontrol);

// NVI servisi ile doğrulama
async function kimlikDogrula() {
  try {
    const sonuc = await TCKimlikNoDogrulayici.nviDogrula({
      TCKimlikNo: tcNo,
      Ad: 'ADI',
      Soyad: 'SOYADI',
      DogumYili: 1990
    });
    console.log('NVI Doğrulama:', sonuc);
  } catch (error) {
    console.error('Hata:', error);
  }
}

kimlikDogrula();
```

3. Uygulamayı çalıştırın:
```bash
node index.js
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

## Gereksinimler

- Node.js >= 14.0.0
- npm, yarn veya pnpm

## Lisans

MIT © 2024 