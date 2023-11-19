
export default class AppConfig {

  private static API_BASE_URL = 'http://localhost:5016';

  public static API_PADRAO_ENDPOINT = `${this.API_BASE_URL}/api/lancamentos`;

  public static API_ENCONTRAR_POR_DATA_ENDPOINT = `${this.API_BASE_URL}/api/lancamentos/alcance`;

}
