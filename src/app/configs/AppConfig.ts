export default {
  API_URL: `http://localhost:5016/api/lancamentos`,
  API_URL_DATA_RANGE: (abaixo: string, acima: string) => {
    return `http://localhost:5016/api/lancamentos/alcance?${abaixo != '' ? `abaixo=${abaixo}` : abaixo}&${acima != '' ? `acima=${acima}` : acima}`;
  },
  API_URL_FIND: (id: number) => `http://localhost:5016/api/lancamentos/${id}`,
};
