import { createClientAsync } from 'soap';

interface TCKimlikNoDogrulaParams {
  TCKimlikNo: string;
  Ad: string;
  Soyad: string;
  DogumYili: number;
}

export class TCKimlikNoDogrulayici {
  private static readonly WSDL_URL = 'https://tckimlik.nvi.gov.tr/Service/KPSPublic.asmx?WSDL';

  /**
   * TC Kimlik numarası algoritmasını kontrol eder
   * @param tcKimlikNo - TC Kimlik numarası
   * @returns boolean
   */
  static algoritmaDogrula(tcKimlikNo: string): boolean {
    if (!/^[1-9][0-9]{10}$/.test(tcKimlikNo)) {
      return false;
    }

    const digits = tcKimlikNo.split('').map(Number);
    
    // 1, 3, 5, 7, 9. hanelerin toplamının 7 katından, 2, 4, 6, 8. hanelerin toplamı çıkartıldığında,
    // elde edilen sonucun 10'a bölümünden kalan, 10. haneyi vermelidir.
    const onuncuHane = ((digits[0] + digits[2] + digits[4] + digits[6] + digits[8]) * 7 
                        - (digits[1] + digits[3] + digits[5] + digits[7])) % 10;
    
    // 1'den 10'uncu haneye kadar olan rakamların toplamından elde edilen sonucun
    // 10'a bölümünden kalan, 11'inci haneyi vermelidir.
    const onbirinciHane = digits.slice(0, 10).reduce((acc, curr) => acc + curr, 0) % 10;

    return digits[9] === onuncuHane && digits[10] === onbirinciHane;
  }

  /**
   * TC Kimlik numarasını NVI servisi üzerinden doğrular
   * @param params - Doğrulama parametreleri
   * @returns Promise<boolean>
   */
  static async nviDogrula(params: TCKimlikNoDogrulaParams): Promise<boolean> {
    try {
      const client = await createClientAsync(this.WSDL_URL);
      
      const [result] = await client.TCKimlikNoDogrulaAsync({
        TCKimlikNo: params.TCKimlikNo,
        Ad: params.Ad.toLocaleUpperCase('tr-TR'),
        Soyad: params.Soyad.toLocaleUpperCase('tr-TR'),
        DogumYili: params.DogumYili
      });

      return result.TCKimlikNoDogrulaResult;
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Bilinmeyen bir hata oluştu';
      throw new Error('TC Kimlik doğrulama servisi ile iletişim kurulamadı: ' + errorMessage);
    }
  }
} 